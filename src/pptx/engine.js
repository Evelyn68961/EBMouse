// Core text-swap engine for .pptx (OOXML) slides.
// Pure JS - runs identically in the browser (app) and Node (tooling).
// Robust to PowerPoint splitting one logical string across many <a:r> runs:
// per paragraph it joins all run texts, replaces, then writes the whole result
// into the paragraph's LONGEST original run and blanks the rest (so the text
// keeps the real body formatting, not a stray leading run's style).

const unesc = (s) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const T_RE = /(<a:t(?:\s[^>]*)?>)([\s\S]*?)(<\/a:t>)/g;
const P_RE = /<a:p\b[\s\S]*?<\/a:p>/g;
// One text box (slide shape OR table cell): <p:txBody>..</p:txBody> / <a:txBody>..</a:txBody>
const TXBODY_RE = /<(p|a):txBody>[\s\S]*?<\/\1:txBody>/g;

// Swap text inside one paragraph, joining split runs first.
function replaceInParagraph(para, pairs) {
  const texts = [];
  let m;
  T_RE.lastIndex = 0;
  while ((m = T_RE.exec(para)) !== null) texts.push(unesc(m[2]));
  if (texts.length === 0) return { para, count: 0 };

  const full = texts.join('');
  let next = full;
  let count = 0;
  for (const [find, rep] of pairs) {
    if (find && next.includes(find)) { next = next.split(find).join(rep); count++; }
  }
  if (next === full) return { para, count: 0 };

  // Keep replaced text in the originally-LONGEST run (carries the body font/colour;
  // the first run may be a stray empty/coloured run that would recolour the text).
  let keepIdx = 0, maxLen = -1;
  texts.forEach((t, idx) => { if (t.length > maxLen) { maxLen = t.length; keepIdx = idx; } });

  let i = 0;
  const out = para.replace(T_RE, (whole, open, _t, close) => {
    const val = i === keepIdx ? esc(next) : '';
    i++;
    return open + val + close;
  });
  return { para: out, count };
}

// In a box we edited, freeze its size: convert "resize shape to fit text"
// (spAutoFit) to "do not autofit" (noAutofit) so the box can't grow/shrink and
// shove the layout. Does NOT change font size (no shrink) - sizes stay consistent.
function lockBox(txBody) {
  return txBody.replace(/<a:spAutoFit\s*\/>/g, '<a:noAutofit/>');
}

// pairs: array of [find, replace] using plain (unescaped) text.
export function replaceInSlideXml(xml, pairs) {
  let count = 0;
  const out = xml.replace(TXBODY_RE, (txBody) => {
    let changed = 0;
    const swapped = txBody.replace(P_RE, (para) => {
      const r = replaceInParagraph(para, pairs);
      changed += r.count;
      return r.para;
    });
    if (changed === 0) return txBody;
    count += changed;
    return lockBox(swapped);
  });
  return { xml: out, count };
}

// Build-time helper: delete whole paragraphs whose (run-joined) text contains any
// of `texts`. Used once when making the template to remove a box's hard line-break
// so a single value fills it cleanly. Not used at fill time.
export function removeParagraphs(xml, texts) {
  let removed = 0;
  const out = xml.replace(P_RE, (para) => {
    const joined = (para.match(T_RE) || [])
      .map((r) => unesc(r.replace(/^<a:t(?:\s[^>]*)?>/, '').replace(/<\/a:t>$/, '')))
      .join('');
    if (texts.some((t) => joined.includes(t))) { removed++; return ''; }
    return para;
  });
  return { xml: out, removed };
}

function sortByFindLen(pairs) {
  // Longest find-string first, so "不接受物理約束" matches before "接受物理約束".
  return [...pairs].sort((a, b) => b[0].length - a[0].length);
}

// Apply pairs to every slide (FILL time: tokens like {{pico.P}} are globally unique).
export async function applyToZip(zip, pairs) {
  let total = 0;
  const touched = [];
  const sorted = sortByFindLen(pairs);
  for (const name of Object.keys(zip.files)) {
    if (!/^ppt\/slides\/slide\d+\.xml$/.test(name)) continue;
    const xml = await zip.file(name).async('string');
    const { xml: nx, count } = replaceInSlideXml(xml, sorted);
    if (count > 0) {
      zip.file(name, nx, { createFolders: false });
      total += count;
      touched.push(name);
    }
  }
  return { total, touched };
}

// List expansion (FILL time). A template bullet paragraph containing a list
// token like {{*apply.br0.benefits}} is cloned once per array item (token ->
// item). Empty array removes the bullet. listPairs: [[token, [item, ...]], ...]
export function expandListsInXml(xml, listPairs) {
  let count = 0;
  for (const [token, itemsRaw] of listPairs) {
    if (!xml.includes(token)) continue;
    const items = (itemsRaw || []).map((s) => String(s)).filter((s) => s.trim() !== '');
    xml = xml.replace(P_RE, (para) => {
      if (!para.includes(token)) return para;
      count++;
      if (items.length === 0) return '';
      return items.map((it) => para.split(token).join(esc(it))).join('');
    });
  }
  return { xml, count };
}

// FILL time: per slide, expand list bullets first, then swap scalar tokens.
export async function applyAll(zip, scalarPairs, listPairs) {
  let total = 0;
  const touched = [];
  const sorted = sortByFindLen(scalarPairs);
  for (const name of Object.keys(zip.files)) {
    if (!/^ppt\/slides\/slide\d+\.xml$/.test(name)) continue;
    let xml = await zip.file(name).async('string');
    let changed = 0;
    const e = expandListsInXml(xml, listPairs); xml = e.xml; changed += e.count;
    const r = replaceInSlideXml(xml, sorted); xml = r.xml; changed += r.count;
    if (changed > 0) { zip.file(name, xml, { createFolders: false }); total += changed; touched.push(name); }
  }
  return { total, touched };
}

// Apply pairs PER SLIDE (TOKENIZE time: scopes short/repeated Chinese strings to
// one slide). slideMap: { 5: [[find, rep], ...], 8: [...] }
export async function applyPerSlide(zip, slideMap) {
  let total = 0;
  const touched = [];
  const missing = [];
  for (const [num, pairs] of Object.entries(slideMap)) {
    const name = `ppt/slides/slide${num}.xml`;
    const file = zip.file(name);
    if (!file) { missing.push(name); continue; }
    const { xml: nx, count } = replaceInSlideXml(await file.async('string'), sortByFindLen(pairs));
    zip.file(name, nx, { createFolders: false });
    total += count;
    touched.push(`slide${num}(${count}/${pairs.length})`);
  }
  return { total, touched, missing };
}

// Build-time: tokenize REPEATED identical cells positionally. Some table grids
// reuse the exact same cell text (e.g. every CASP cell is "😀"), so a plain
// find/replace can't tell them apart. This walks paragraphs in document order and
// gives the k-th paragraph whose run-joined text EQUALS `find` the k-th token.
// Exact-equality match means legend cells like "是😀" are skipped (only bare "😀").
// seqPairs: [[find, [tok1, tok2, ...]], ...]
export function tokenizeSeqInXml(xml, seqPairs) {
  let count = 0;
  for (const [find, tokens] of seqPairs) {
    let k = 0;
    xml = xml.replace(P_RE, (para) => {
      if (k >= tokens.length) return para;
      const joined = (para.match(T_RE) || [])
        .map((r) => unesc(r.replace(/^<a:t(?:\s[^>]*)?>/, '').replace(/<\/a:t>$/, '')))
        .join('');
      if (joined !== find) return para;
      const r = replaceInParagraph(para, [[find, tokens[k]]]);
      k++; count++;
      return r.para;
    });
  }
  return { xml, count };
}

export async function tokenizeSeqOnSlides(zip, slideSeqMap) {
  let total = 0;
  const touched = [];
  for (const [num, seqPairs] of Object.entries(slideSeqMap)) {
    const name = `ppt/slides/slide${num}.xml`;
    const file = zip.file(name);
    if (!file) continue;
    const { xml, count } = tokenizeSeqInXml(await file.async('string'), seqPairs);
    const want = seqPairs.reduce((n, [, toks]) => n + toks.length, 0);
    zip.file(name, xml, { createFolders: false });
    total += count;
    touched.push(`slide${num}(${count}/${want})`);
  }
  return { total, touched };
}

// --- Dynamic slide cloning (FILL time) -------------------------------------
// To make a section scale with the data (e.g. one GRADE detail slide per outcome,
// in one of two layouts), we copy a MASTER slide once per item, fill each copy,
// place them in the deck, then hide the masters. A .pptx tracks slides by sldId/
// r:id (not file number), so adding/hiding never renumbers other slides.
const SLIDE_CT = 'application/vnd.openxmlformats-officedocument.presentationml.slide+xml';

function maxId(str, re) { let m, max = 0; while ((m = re.exec(str)) !== null) max = Math.max(max, parseInt(m[1], 10)); return max; }

export function listSlideNums(zip) {
  return Object.keys(zip.files)
    .map((n) => (n.match(/^ppt\/slides\/slide(\d+)\.xml$/) || [])[1])
    .filter(Boolean).map(Number).sort((a, b) => a - b);
}

// The presentation-rels r:id that points at slides/slide<num>.xml.
async function relIdForSlide(zip, num) {
  const rels = await zip.file('ppt/_rels/presentation.xml.rels').async('string');
  const m = rels.match(new RegExp(`<Relationship Id="(rId\\d+)"[^>]*Target="slides/slide${num}\\.xml"`));
  return m ? m[1] : null;
}

// Copy slide <srcNum> to a brand-new slide part (+ rels minus notesSlide), and
// register it in [Content_Types].xml and presentation rels. Does NOT place it in
// the deck order. Returns { newNum, newRel }.
async function clonePart(zip, srcNum) {
  const newNum = Math.max(...listSlideNums(zip)) + 1;
  zip.file(`ppt/slides/slide${newNum}.xml`, await zip.file(`ppt/slides/slide${srcNum}.xml`).async('string'), { createFolders: false });

  const relsFile = zip.file(`ppt/slides/_rels/slide${srcNum}.xml.rels`);
  let rels = relsFile
    ? await relsFile.async('string')
    : '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>';
  rels = rels.replace(/<Relationship[^>]*\/relationships\/notesSlide[^>]*\/>/g, '');
  zip.file(`ppt/slides/_rels/slide${newNum}.xml.rels`, rels, { createFolders: false });

  let ct = await zip.file('[Content_Types].xml').async('string');
  ct = ct.replace('</Types>', `<Override PartName="/ppt/slides/slide${newNum}.xml" ContentType="${SLIDE_CT}"/></Types>`);
  zip.file('[Content_Types].xml', ct, { createFolders: false });

  let prels = await zip.file('ppt/_rels/presentation.xml.rels').async('string');
  const newRel = 'rId' + (maxId(prels, /Id="rId(\d+)"/g) + 1);
  prels = prels.replace('</Relationships>', `<Relationship Id="${newRel}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${newNum}.xml"/></Relationships>`);
  zip.file('ppt/_rels/presentation.xml.rels', prels, { createFolders: false });

  return { newNum, newRel };
}

// Place already-created clones (list of r:ids, in order) into the deck right
// after the slide currently identified by afterRel. Mutates presentation.xml.
async function placeAfter(zip, afterRel, relIds) {
  if (!relIds.length) return;
  let pres = await zip.file('ppt/presentation.xml').async('string');
  let nextId = maxId(pres, /<p:sldId id="(\d+)"/g) + 1;
  const block = relIds.map((rid) => `<p:sldId id="${nextId++}" r:id="${rid}"/>`).join('');
  const anchor = new RegExp(`(<p:sldId id="\\d+" r:id="${afterRel}"/>)`);
  pres = pres.replace(anchor, `$1${block}`);
  zip.file('ppt/presentation.xml', pres, { createFolders: false });
}

// Completely remove slides: their sldId, the presentation relationship, the
// content-type override, the slide part + its rels, and the slide's own notesSlide
// (+ rels + override). Leaving any of these behind (e.g. an orphan slide
// relationship not in sldIdLst) makes PowerPoint flag the file for repair.
async function removeSlidesCompletely(zip, nums) {
  let pres = await zip.file('ppt/presentation.xml').async('string');
  let prels = await zip.file('ppt/_rels/presentation.xml.rels').async('string');
  let ct = await zip.file('[Content_Types].xml').async('string');

  for (const num of nums) {
    const slidePart = `ppt/slides/slide${num}.xml`;
    const slideRelsPart = `ppt/slides/_rels/slide${num}.xml.rels`;

    // The slide's notesSlide (if any) — delete it too so it doesn't dangle.
    let notesPart = null;
    if (zip.file(slideRelsPart)) {
      const rx = await zip.file(slideRelsPart).async('string');
      const m = rx.match(/Target="\.\.\/(notesSlides\/notesSlide\d+\.xml)"/);
      if (m) notesPart = 'ppt/' + m[1];
    }

    // sldId + presentation relationship.
    const rel = (prels.match(new RegExp(`<Relationship Id="(rId\\d+)"[^>]*Target="slides/slide${num}\\.xml"`)) || [])[1];
    if (rel) {
      pres = pres.replace(new RegExp(`<p:sldId id="\\d+" r:id="${rel}"\\s*/>`), '');
      prels = prels.replace(new RegExp(`<Relationship Id="${rel}"[^>]*/>`), '');
    }
    // content-type override + parts.
    ct = ct.replace(new RegExp(`<Override PartName="/${slidePart}"[^>]*/>`), '');
    zip.remove(slidePart);
    zip.remove(slideRelsPart);

    if (notesPart) {
      const notesRels = notesPart.replace(/notesSlides\/(notesSlide\d+\.xml)/, 'notesSlides/_rels/$1.rels');
      ct = ct.replace(new RegExp(`<Override PartName="/${notesPart}"[^>]*/>`), '');
      zip.remove(notesPart);
      zip.remove(notesRels);
    }
  }

  zip.file('ppt/presentation.xml', pres, { createFolders: false });
  zip.file('ppt/_rels/presentation.xml.rels', prels, { createFolders: false });
  zip.file('[Content_Types].xml', ct, { createFolders: false });
}

// Remove whole shapes (<p:sp>) whose text contains `marker`. Used so a badge that
// fills to "nothing to show" disappears entirely instead of leaving an empty box.
export function removeShapesWithMarker(xml, marker) {
  let removed = 0;
  const out = xml.replace(/<p:sp>[\s\S]*?<\/p:sp>/g, (sp) => {
    if (sp.includes(marker)) { removed++; return ''; }
    return sp;
  });
  return { xml: out, removed };
}

// Sentinel a fill value can use to mean "delete the shape I live in" (see above).
export const DROP_SHAPE = '{{DROP}}';

// Build a valid <p:timing> block: each spid gets its own click-triggered fade-in
// entrance (same structure PowerPoint authored on slide 45), in the given order.
// Used to REBUILD an animation after shapes were added/removed (hand-editing the
// nested timing tree is corruption-prone; regenerating it is safe).
export function buildEntranceTiming(spids) {
  if (!spids.length) return '';
  let id = 3; // 1 = tmRoot, 2 = mainSeq
  const pars = spids.map((spid) => {
    const a = id++, b = id++, c = id++, d = id++, e = id++;
    return `<p:par><p:cTn id="${a}" fill="hold"><p:stCondLst><p:cond delay="indefinite"/></p:stCondLst><p:childTnLst><p:par><p:cTn id="${b}" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst><p:par><p:cTn id="${c}" presetID="10" presetClass="entr" presetSubtype="0" fill="hold" grpId="0" nodeType="clickEffect"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst><p:set><p:cBhvr><p:cTn id="${d}" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn><p:tgtEl><p:spTgt spid="${spid}"/></p:tgtEl><p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set><p:animEffect transition="in" filter="fade"><p:cBhvr><p:cTn id="${e}" dur="500"/><p:tgtEl><p:spTgt spid="${spid}"/></p:tgtEl></p:cBhvr></p:animEffect></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par>`;
  }).join('');
  const bld = spids.map((spid) => `<p:bldP spid="${spid}" grpId="0" animBg="1"/>`).join('');
  return `<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst><p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>${pars}</p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst><p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq></p:childTnLst></p:cTn></p:par></p:tnLst><p:bldLst>${bld}</p:bldLst></p:timing>`;
}

// High-level: expand ONE master region into one filled slide per item.
//   afterSlide : deck anchor (clones are inserted right after this slide number)
//   items      : array; for each, pickMaster(item, i) -> source slide number,
//                and fillPairs(item, i) -> [[token, value], ...] to swap in the clone
//   hide       : slide numbers to remove from the deck afterwards (the masters)
// Returns the new slide numbers (deck order).
export async function expandSlides(zip, { afterSlide, items, pickMaster, fillPairs, hide = [], postFill }) {
  const relIds = [];
  const newNums = [];
  for (let i = 0; i < items.length; i++) {
    const src = pickMaster(items[i], i);
    const { newNum, newRel } = await clonePart(zip, src);
    const xml = await zip.file(`ppt/slides/slide${newNum}.xml`).async('string');
    const { xml: filled } = replaceInSlideXml(xml, sortByFindLen(fillPairs(items[i], i)));
    // Drop any shape whose fill resolved to the DROP sentinel (e.g. an unused badge).
    let { xml: cleaned } = removeShapesWithMarker(filled, DROP_SHAPE);
    // Optional per-slide post-processing (e.g. rebuild the animation after shapes
    // were dropped) — receives the cleaned xml and returns the final xml.
    if (postFill) cleaned = postFill(cleaned, items[i], i);
    zip.file(`ppt/slides/slide${newNum}.xml`, cleaned, { createFolders: false });
    relIds.push(newRel);
    newNums.push(newNum);
  }
  const afterRel = await relIdForSlide(zip, afterSlide);
  await placeAfter(zip, afterRel, relIds);
  if (hide.length) await removeSlidesCompletely(zip, hide);
  return newNums;
}

// Validate deck plumbing: every sldId -> a presentation rel -> an existing part,
// and content-types covers each slide part. Returns [] if OK, else problems.
export async function validateDeck(zip) {
  const problems = [];
  const pres = await zip.file('ppt/presentation.xml').async('string');
  const prels = await zip.file('ppt/_rels/presentation.xml.rels').async('string');
  const ct = await zip.file('[Content_Types].xml').async('string');
  const relTargets = {};
  let m; const RT = /<Relationship Id="(rId\d+)"[^>]*Target="(slides\/slide\d+\.xml)"/g;
  while ((m = RT.exec(prels)) !== null) relTargets[m[1]] = m[2];
  const inList = new Set();
  const SI = /<p:sldId id="\d+" r:id="(rId\d+)"\/>/g;
  while ((m = SI.exec(pres)) !== null) {
    inList.add(m[1]);
    const tgt = relTargets[m[1]];
    if (!tgt) { problems.push(`sldId ${m[1]} has no presentation rel`); continue; }
    if (!zip.file('ppt/' + tgt)) problems.push(`rel ${m[1]} -> ppt/${tgt} missing part`);
    if (!ct.includes(`/ppt/${tgt}"`)) problems.push(`part ppt/${tgt} missing content-type override`);
  }
  // Orphan slide relationships (in rels but not in sldIdLst) trigger PPT repair.
  for (const [rid, tgt] of Object.entries(relTargets)) {
    if (!inList.has(rid)) problems.push(`orphan slide rel ${rid} -> ${tgt} (not in sldIdLst)`);
    if (!zip.file('ppt/' + tgt)) problems.push(`slide rel ${rid} -> ppt/${tgt} missing part`);
  }
  // Slide parts present in the package but not referenced by any presentation rel.
  const referenced = new Set(Object.values(relTargets).map((t) => 'ppt/' + t));
  for (const name of Object.keys(zip.files)) {
    if (/^ppt\/slides\/slide\d+\.xml$/.test(name) && !referenced.has(name))
      problems.push(`unreferenced slide part ${name}`);
  }
  return problems;
}

// Build-time helper: force paragraph alignment (default left) on paragraphs that
// contain any of `markers` (e.g. a token). Fixes boxes authored centre-aligned
// whose text looks wrong once it wraps to multiple lines.
export function setParagraphAlign(xml, markers, algn = 'l') {
  let changed = 0;
  const out = xml.replace(P_RE, (para) => {
    if (!markers.some((mk) => para.includes(mk))) return para;
    changed++;
    if (/<a:pPr[^>]*\balgn="[^"]*"/.test(para))
      return para.replace(/(<a:pPr[^>]*\balgn=")[^"]*(")/, `$1${algn}$2`);
    if (/<a:pPr\b[^>]*\/>/.test(para))
      return para.replace(/<a:pPr\b([^>]*)\/>/, `<a:pPr$1 algn="${algn}"/>`);
    if (/<a:pPr\b[^>]*>/.test(para))
      return para.replace(/<a:pPr\b([^>]*)>/, `<a:pPr$1 algn="${algn}">`);
    return para.replace(/(<a:p\b[^>]*>)/, `$1<a:pPr algn="${algn}"/>`);
  });
  return { xml: out, changed };
}

export async function alignOnSlides(zip, alignMap, algn = 'l') {
  let changed = 0;
  for (const [num, markers] of Object.entries(alignMap)) {
    const name = `ppt/slides/slide${num}.xml`;
    const file = zip.file(name);
    if (!file) continue;
    const r = setParagraphAlign(await file.async('string'), markers, algn);
    if (r.changed > 0) { zip.file(name, r.xml, { createFolders: false }); changed += r.changed; }
  }
  return changed;
}

// Delete the given paragraphs on specific slides (build time).
// removeMap: { 5: ['text in the line to delete', ...] }
export async function removeOnSlides(zip, removeMap) {
  let removed = 0;
  for (const [num, texts] of Object.entries(removeMap)) {
    const name = `ppt/slides/slide${num}.xml`;
    const file = zip.file(name);
    if (!file) continue;
    const r = removeParagraphs(await file.async('string'), texts);
    if (r.removed > 0) { zip.file(name, r.xml, { createFolders: false }); removed += r.removed; }
  }
  return removed;
}
