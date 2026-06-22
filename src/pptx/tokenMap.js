// Maps a project (projectSchema shape) -> [token, value] pairs.
// Token names must match those baked into public/template.pptx
// (see tools/tokenizeTemplate.mjs). Field access mirrors SlidePreview.jsx
// so the downloaded deck stays in sync with the live preview.

export function buildPairs(project) {
  const assess = project?.assess || {};
  const ask = project?.ask || {};
  const apply = project?.apply || {};
  const bg = assess.backgroundKnowledge || {};

  const acquire = project?.acquire || {};
  const kw = acquire.keywords || {};
  const joinKw = (v) => (Array.isArray(v) ? v.filter((s) => String(s).trim()).join(', ') : (v || ''));
  const sel = acquire.selectedArticle || {};
  const alt = acquire.alternativeArticles?.[0] || {};
  // Per-database verbatim queries (S15 Cochrane / S16 Embase conversion slides).
  // Match by database name; fall back to the master Boolean strategy for PubMed.
  const findQuery = (re) =>
    (acquire.searchQueries || []).find((q) => q && re.test(String(q.database || '')))?.queryString || '';
  const flowNum = (n, suffix) => (n ? `${n}${suffix}` : '');
  // sampleSize may be a bare number (append unit) or a descriptive string (use as-is).
  const sampleText = (s, unit = ' 人') => {
    if (s == null || s === '' || s === 0) return '';
    return /^\s*\d[\d,]*\s*$/.test(String(s)) ? `${s}${unit}` : String(s);
  };

  const picots = ask.picots || [];
  const primary = picots.find((p) => p.isPrimary) || picots[0] || {};
  const secondary = picots.find((p) => p !== primary) || {};

  // Appraise — results table (S34): up to 6 outcome rows.
  const outcomes = project?.appraise?.results?.outcomes || [];
  const outcomePairs = [];
  for (let i = 0; i < 6; i++) {
    const o = outcomes[i] || {};
    const rr = `${o.effectSize || ''} ${o.ci95 || ''}`.trim();
    outcomePairs.push(
      [`{{o${i}.name}}`, o.name || ''],
      [`{{o${i}.n}}`, sampleText(o.sampleSize)],
      [`{{o${i}.rct}}`, o.rctCount ? `(${o.rctCount} RCT)` : ''],
      [`{{o${i}.rr}}`, rr],
    );
  }

  // Appraise — CASP grid (S23): emoji per question. The form captures only the
  // human verdict (yes/no/uncertain); the AI column mirrors it (no separate AI
  // input yet). Both columns -> same emoji.
  const caspScores = project?.appraise?.casp?.scores || {};
  const caspKeys = ['q1','q2','q3a','q3b','q3c','q3d','q4','q5a','q5b','q6','q6_1','q6_2','q7'];
  const caspPairs = [];
  for (const q of caspKeys) {
    const e = caspEmoji(caspScores[q]?.human);
    caspPairs.push([`{{casp.${q}.ai}}`, e], [`{{casp.${q}.h}}`, e]);
  }

  // Appraise — GRADE body-level decisions (assessed once across all studies):
  // risk-of-bias S36, indirectness S43, publication-bias S44. The per-outcome
  // imprecision/inconsistency/summary slides (S37-47) are generated dynamically
  // at fill time (see fillProject.js + outcomeGradeFill below), one per outcome.
  const b = gradeBodyDecisions(project);
  const gradePairs = [
    ['{{g.rob.dec}}', gradeDec(b.rob)],
    ['{{g.ind.dec}}', gradeDec(b.ind)],
    ['{{g.pub.dec}}', gradeDec(b.pub)],
  ];

  // Appraise — PICO comparison (study vs case) on S43 + S20's I/C/O rows.
  const pc = project?.appraise?.grade?.domains?.indirectness?.picoComparison || {};
  const pcPairs = [];
  for (const k of ['p', 'i', 'c', 'o', 'age', 'eth', 'setting']) {
    pcPairs.push([`{{pc.${k}.study}}`, pc[k]?.study || '']);
    pcPairs.push([`{{pc.${k}.case}}`, pc[k]?.case_ || '']);
  }

  // Appraise — S54 效益分析 summary table (3 outcomes). Reuses results data;
  // quality = computed per-outcome certainty; clinical meaning derived from it.
  const s54cert = (o) => {
    const total = outcomeTotalDowngrade(o);
    return total >= 0 ? '高' : total === -1 ? '中' : total === -2 ? '低' : '很低';
  };
  const s54clin = (q) => (q === '高' ? '有效' : q === '中' ? '可能有效' : q ? '證據不足' : '');
  const s54Pairs = [];
  for (let i = 0; i < 3; i++) {
    const o = outcomes[i] || {};
    const q = o.name ? s54cert(o) : '';
    s54Pairs.push(
      [`{{o${i}.s54name}}`, o.name || ''],
      [`{{o${i}.s54name2}}`, ''],
      [`{{o${i}.s54n}}`, sampleText(o.sampleSize, '人')],
      [`{{o${i}.s54rct}}`, o.rctCount ? `(${o.rctCount} RCT)` : ''],
      [`{{o${i}.s54rr1}}`, o.effectSize ? `${o.effectSize} ` : ''],
      [`{{o${i}.s54rr2}}`, o.ci95 || ''],
      [`{{o${i}.s54q}}`, q],
      [`{{o${i}.s54c}}`, s54clin(q)],
    );
  }

  const members = project?.meta?.members || [];
  const arms = assess.treatmentArms || [];
  const armText = (s, prefix) => (s ? `${prefix}${s}` : '');

  return [
    ...outcomePairs,
    ...caspPairs,
    ...gradePairs,
    ...pcPairs,
    ...s54Pairs,
    // Assess
    ['{{team.members}}', members.filter((m) => String(m).trim()).join(' | ')],
    ['{{bg.topic}}', assess.topic || ''],
    ['{{case.background}}', assess.scenario || ''],
    ['{{bg.definition}}', bg.diseaseOverview || ''],
    ['{{bg.riskFactors}}', bg.riskFactors || ''],
    ['{{bg.treatment}}', bg.treatmentOptions || ''],
    // S6 two treatment arms (name + 療程/議題)
    ['{{arm0.name}}', arms[0]?.name || ''],
    ['{{arm0.course}}', armText(arms[0]?.course, '療程: ')],
    ['{{arm0.issue}}', armText(arms[0]?.issue, '議題: ')],
    ['{{arm1.name}}', arms[1]?.name || ''],
    ['{{arm1.course}}', armText(arms[1]?.course, '療程: ')],
    ['{{arm1.issue}}', armText(arms[1]?.issue, '議題: ')],

    // Ask — primary PICO (slide 9) + the other PICO (slide 8)
    ['{{pico.P}}', primary.p || ''],
    ['{{pico.I}}', primary.i || ''],
    ['{{pico.C}}', primary.c || ''],
    ['{{pico.O}}', primary.o || ''],
    ['{{pico.T}}', primary.t || ''],
    ['{{pico.reason}}', primary.justification || ''],
    ['{{pico2.P}}', secondary.p || ''],
    ['{{pico2.I}}', secondary.i || ''],
    ['{{pico2.C}}', secondary.c || ''],
    ['{{pico2.O}}', secondary.o || ''],
    ['{{pico2.T}}', secondary.t || ''],

    // Acquire — keyword table (S12)
    ['{{kw.free.P}}', joinKw(kw.freeText?.p)],
    ['{{kw.free.I}}', joinKw(kw.freeText?.i)],
    ['{{kw.free.C}}', joinKw(kw.freeText?.c)],
    ['{{kw.free.O}}', joinKw(kw.freeText?.o)],
    ['{{kw.mesh.P}}', joinKw(kw.meshTerms?.p)],
    ['{{kw.mesh.I}}', joinKw(kw.meshTerms?.i)],
    ['{{kw.mesh.O}}', joinKw(kw.meshTerms?.o)],

    // Acquire — S13 PubMed initial search (reuses the free-text P/I terms)
    ['{{s13.p1}}', (kw.freeText?.p?.[0]) || ''],
    ['{{s13.p2}}', (kw.freeText?.p?.[1]) || ''],
    ['{{s13.i1}}', (kw.freeText?.i?.[0]) || ''],
    // Acquire — S15/S16 keyword-conversion slides (verbatim per-DB queries)
    ['{{conv.cochrane}}', findQuery(/cochrane/i)],
    ['{{conv.embase}}', findQuery(/embase/i)],
    // Acquire — S14 LitSuggest screen counts
    ['{{s14.total}}', flowNum(acquire.screeningFlow?.pubmedInitial, ' 篇')],
    ['{{s14.pos}}', acquire.screeningFlow?.litPositive ? `Positive: ${acquire.screeningFlow.litPositive} 篇` : ''],
    ['{{s14.neg}}', acquire.screeningFlow?.litNegative ? `Negative: ${acquire.screeningFlow.litNegative} 篇` : ''],
    // Acquire — S18 study selection (selected vs alternative article)
    ['{{s18.sel.rct}}', sel.rctCount ? `RCT 數量: ${sel.rctCount} 篇` : ''],
    ['{{s18.sel.n}}', sel.totalParticipants ? `受試者數量: ${sel.totalParticipants} 人` : ''],
    ['{{s18.sel.brief}}', sel.brief || ''],
    ['{{s18.alt.count}}', alt.studyCount ? `研究數量: ${alt.studyCount} 篇` : ''],
    ['{{s18.alt.n}}', alt.participants ? `${alt.participants} 人` : ''],
    ['{{s18.alt.brief}}', alt.brief || ''],

    // Apply
    ['{{br0.name}}', (apply.benefitRisk?.options?.[0]?.name) || ''],
    ['{{br1.name}}', (apply.benefitRisk?.options?.[1]?.name) || ''],
    ['{{cost0.name}}', (apply.costAnalysis?.options?.[0]?.name) || ''],
    ['{{cost1.name}}', (apply.costAnalysis?.options?.[1]?.name) || ''],
    ['{{cost0.total}}', (apply.costAnalysis?.options?.[0]?.totalCost) || ''],
    ['{{cost1.total}}', (apply.costAnalysis?.options?.[1]?.totalCost) || ''],
    ['{{apply.applicability}}', apply.applicability?.rationale || ''],
    ['{{etd.benefitRisk}}', apply.evidenceToDecision?.benefitRisk?.assessment || ''],
    ['{{etd.evidenceQuality}}', apply.evidenceToDecision?.evidenceQuality?.assessment || ''],
    ['{{etd.valuesPreferences}}', apply.evidenceToDecision?.valuesPreferences?.assessment || ''],
    ['{{etd.costEffectiveness}}', apply.evidenceToDecision?.costEffectiveness?.assessment || ''],
    ['{{etd.feasibility}}', apply.evidenceToDecision?.feasibility?.assessment || ''],
    ['{{etd.acceptability}}', apply.evidenceToDecision?.acceptability?.assessment || ''],
    ['{{apply.recommendation}}', recommendationLabel(apply.recommendationStrength)],
    ['{{plain_response}}', apply.patientSummary || ''],
  ];
}

// GRADE downgrade decision (int) -> Chinese word for the slide.
function gradeDec(d) {
  return Number(d) >= 0 ? '不扣分' : `扣 ${Math.abs(Number(d))} 分`;
}

// Body-level GRADE tokens on the fixed slides (risk-of-bias S36, indirectness
// S43, publication-bias S44) show a single value. GRADE is now assessed
// per-outcome, so we represent the body with the FIRST outcome's domains.
export function gradeBodyDecisions(project) {
  const g = project?.appraise?.results?.outcomes?.[0]?.grade || {};
  return {
    rob: Number(g.riskOfBias?.decision) || 0,
    ind: Number(g.indirectness?.decision) || 0,
    pub: Number(g.publicationBias?.decision) || 0,
  };
}

// Is this outcome downgraded for inconsistency? (picks the "issues" layout)
export function isDowngradedInc(o) {
  return (Number(o?.grade?.inconsistency?.decision) || 0) < 0;
}

// Sum of this outcome's five GRADE domain decisions.
export function outcomeTotalDowngrade(o) {
  const g = o?.grade || {};
  return ['riskOfBias', 'imprecision', 'inconsistency', 'indirectness', 'publicationBias']
    .reduce((s, d) => s + (Number(g[d]?.decision) || 0), 0);
}

// GENERIC per-outcome GRADE fill pairs for ONE cloned detail slide. The masters
// (S37/40/41/45) carry generic {{gi.*}} tokens; this fills them for outcome `o`.
// Certainty/conclusion auto-computed: total = body 3 + this outcome's imp + inc;
// CI ratio & crosses-null derived from the CI numbers. `body` = gradeBodyDecisions().
export function outcomeGradeFill(o, body) {
  const g = o?.grade || {};
  const imp = g.imprecision || {};
  const inc = g.inconsistency || {};
  const bnd = ciBounds(o?.ci95);
  const ratioStr = bnd && bnd[0] ? `CI ratio = ${bnd[1]}/${bnd[0]} = ${(bnd[1] / bnd[0]).toFixed(2)}` : '';
  const cross = bnd ? (bnd[0] < 1 && bnd[1] > 1 ? '有跨越 null' : '無跨越 null') : '';
  // GRADE is per-outcome: use this outcome's own five domains.
  const total = outcomeTotalDowngrade(o);
  const certainty = total >= 0 ? '高' : total === -1 ? '中' : total === -2 ? '低' : '很低';
  const concl = `整體${total >= 0 ? '不扣分' : '扣 ' + Math.abs(total) + ' 分'} → 證據品質: ${certainty}`;
  return [
    // imprecision master (S37)
    ['{{gi.imp.line}}', o?.name ? `${o.name}: RR ${o.effectSize || ''} ${o.ci95 || ''}`.trim() : ''],
    ['{{gi.imp.ratio}}', ratioStr],
    ['{{gi.imp.mag}}', imp.magnitude || ''],
    ['{{gi.imp.cross}}', cross],
    ['{{gi.imp.dec}}', gradeDec(imp.decision)],
    // inconsistency masters (S40 issues / S41 no-issues)
    ['{{gi.inc.name}}', o?.name || ''],
    ['{{gi.inc.i2}}', inc.i2 ? `I² = ${inc.i2}` : ''],
    ['{{gi.inc.overlap}}', inc.overlap || ''],
    ['{{gi.inc.dist}}', inc.distribution || ''],
    ['{{gi.inc.dec}}', gradeDec(inc.decision)],
    // summary master (S45): one badge per GRADE domain. A downgraded domain shows
    // its score (-1/-2); a non-downgraded domain emits the DROP sentinel so its
    // badge shape is deleted (no empty box). imp/inc are this outcome's; rob/ind/
    // pub are body-level (same across outcomes).
    ['{{gi.sum.name}}', o?.name || ''],
    ['{{gi.sum.concl}}', o?.name ? concl : ''],
    ['{{gi.sum.d.rob}}', badgeScore(g.riskOfBias?.decision)],
    ['{{gi.sum.d.imp}}', badgeScore(imp.decision)],
    ['{{gi.sum.d.inc}}', badgeScore(inc.decision)],
    ['{{gi.sum.d.ind}}', badgeScore(g.indirectness?.decision)],
    ['{{gi.sum.d.pub}}', badgeScore(g.publicationBias?.decision)],
  ];
}

// A GRADE summary badge: show the score if the domain was downgraded, otherwise
// the DROP sentinel so the whole badge shape is removed (see engine DROP_SHAPE).
function badgeScore(d) {
  return Number(d) < 0 ? String(Number(d)) : '{{DROP}}';
}

// Pull the two numeric bounds out of a CI string like "[0.60 ~ 0.86]" -> [0.6, 0.86].
function ciBounds(ci) {
  const nums = String(ci || '').match(/-?\d+(?:\.\d+)?/g);
  if (!nums || nums.length < 2) return null;
  return [parseFloat(nums[0]), parseFloat(nums[1])];
}

function caspEmoji(score) {
  if (score === 'yes') return '😀';
  if (score === 'no') return '😟';
  if (score === 'uncertain') return '😐';
  return '';
}

function recommendationLabel(s) {
  if (s === 'strong') return '強烈推薦';
  if (s === 'conditional') return '部分推薦';
  return '';
}

// Coerce a field that may be an array (new list form) or a string (old single
// textarea, newline-separated) into an array of bullet items.
function asList(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') return v.split('\n');
  return [];
}

// List tokens -> arrays. Each template bullet repeats once per item.
export function buildListPairs(project) {
  const opts = project?.apply?.benefitRisk?.options || [];
  const cost = project?.apply?.costAnalysis?.options || [];
  const assess = project?.assess || {};
  return [
    // Assess S3 — situation bullets + clinical questions (auto-numbered)
    ['{{*situation}}', asList(assess.situation)],
    ['{{*clinicalQuestions}}', asList(assess.clinicalQuestions)],
    ['{{*br0.benefits}}', asList(opts[0]?.benefits)],
    ['{{*br0.risks}}', asList(opts[0]?.risks)],
    ['{{*br1.benefits}}', asList(opts[1]?.benefits)],
    ['{{*br1.risks}}', asList(opts[1]?.risks)],
    ['{{*cost0.direct}}', asList(cost[0]?.directCost)],
    ['{{*cost0.indirect}}', asList(cost[0]?.indirectCost)],
    ['{{*cost1.direct}}', asList(cost[1]?.directCost)],
    ['{{*cost1.indirect}}', asList(cost[1]?.indirectCost)],
  ];
}
