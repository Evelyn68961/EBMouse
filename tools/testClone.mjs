// Validate the dynamic slide-clone primitive against the real template.
import JSZip from 'jszip';
import { readFile } from 'node:fs/promises';
import { expandSlides, validateDeck, listSlideNums } from '../src/pptx/engine.js';

const buf = await readFile('public/template.pptx');
const zip = await JSZip.loadAsync(buf);

const countSldIds = async (z) =>
  ((await z.file('ppt/presentation.xml').async('string')).match(/<p:sldId /g) || []).length;

const before = await countSldIds(zip);
const filesBefore = listSlideNums(zip).length;
console.log('sldIds before:', before, '| slide parts before:', filesBefore);

// Pretend 3 outcomes: #0 downgraded (issues=slide40), #1 & #2 clean (slide41).
const items = [{ d: -1 }, { d: 0 }, { d: 0 }];
const newNums = await expandSlides(zip, {
  afterSlide: 36,
  items,
  pickMaster: (it) => (it.d < 0 ? 40 : 41),
  fillPairs: (it, i) => [['不扣分', `[[clone ${i} d=${it.d}]]`]],
  hide: [37, 38, 39, 40, 41, 42, 45, 46, 47],
});
console.log('new slide parts:', newNums.join(', '));

const after = await countSldIds(zip);
console.log('sldIds after:', after, '(expected', before - 9 + items.length, ')');

let problems = await validateDeck(zip);
console.log('validateDeck (in-memory):', problems.length ? problems : 'OK');

// Round-trip through a real zip generate/parse, then re-validate.
const out = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
const reloaded = await JSZip.loadAsync(out);
problems = await validateDeck(reloaded);
console.log('validateDeck (after round-trip):', problems.length ? problems : 'OK');

// Confirm well-formed-ish: every clone has rels + content-type + a fill marker.
const ct = await reloaded.file('[Content_Types].xml').async('string');
for (const n of newNums) {
  const hasPart = !!reloaded.file(`ppt/slides/slide${n}.xml`);
  const hasRels = !!reloaded.file(`ppt/slides/_rels/slide${n}.xml.rels`);
  const hasCT = ct.includes(`/ppt/slides/slide${n}.xml"`);
  const xml = await reloaded.file(`ppt/slides/slide${n}.xml`).async('string');
  const noNotes = !(await reloaded.file(`ppt/slides/_rels/slide${n}.xml.rels`).async('string')).includes('notesSlide');
  console.log(`slide${n}: part=${hasPart} rels=${hasRels} ct=${hasCT} filled=${xml.includes('[[clone')} noNotesRel=${noNotes}`);
}

console.log(problems.length === 0 && after === before - 9 + items.length ? '\nCLONE TEST PASS' : '\nCLONE TEST FAIL');
