// Dev test: exercise the SAME runtime modules the browser uses (engine+tokenMap)
// against public/template.pptx with a sample projectSchema object.
import JSZip from 'jszip';
import { readFile, writeFile } from 'node:fs/promises';
import { validateDeck } from '../src/pptx/engine.js';
import { fillProject } from '../src/pptx/fillProject.js';

const project = {
  meta: { title: 'CPM 測試', members: ['王小明 藥師', '李美麗 醫師', '陳大同 護理師'] },
  assess: {
    topic: '連續被動性運動',
    treatmentArms: [
      { name: '傳統物理治療', course: '每週 2-3 次，由治療師徒手操作。', issue: '療效因治療師經驗而異。' },
      { name: '連續被動性運動 (CPM)', course: '每日 1-2 次，機器輔助被動活動。', issue: '需購買或租借機器，成本較高。' },
    ],
    scenario: '72 歲盧媽媽喜好戶外活動，近幾年感到關節不適，經診斷為骨關節炎，決定接受左側全膝關節置換術 (TKA)。',
    situation: ['術後盧媽媽希望盡快恢復膝關節活動度', '家屬詢問哪種復健方式較有效', '骨科醫師建議考慮連續被動性運動 (CPM)'],
    clinicalQuestions: ['CPM 是否比傳統物理治療更能改善膝關節活動度?', 'CPM 的成本效益是否合理?'],
    backgroundKnowledge: {
      diseaseOverview: '骨關節炎是關節軟骨逐漸磨損退化，導致疼痛、僵硬和活動受限的慢性疾病。',
      riskFactors: '高齡、肥胖、關節曾受傷、重複性關節使用工作者及家族遺傳史者風險較高。',
      treatmentOptions: '藥物止痛消炎、物理治療、適度運動、體重控制，嚴重時可考慮關節置換手術。',
    },
  },
  acquire: {
    keywords: {
      freeText: { p: ['osteoarthritis', 'knee'], i: ['glucosamine'], c: ['placebo'], o: ['pain', 'WOMAC'] },
      meshTerms: { p: ['"Osteoarthritis, Knee"[MeSH]'], i: ['"Glucosamine"[MeSH]'], o: ['"Pain"[MeSH]'] },
    },
    screeningFlow: { pubmedInitial: 87, litPositive: 16, litNegative: 71 },
    searchQueries: [
      { database: 'PubMed', queryString: '(osteoarthritis OR knee) AND glucosamine', date: '2026-06-01' },
      { database: 'Embase', queryString: "('osteoarthritis'/exp OR knee) AND 'glucosamine'/exp", date: '2026-06-01' },
      { database: 'Cochrane Library', queryString: '[mh "Osteoarthritis"] AND glucosamine', date: '2026-06-01' },
    ],
    selectedArticle: { rctCount: 14, totalParticipants: 4338, brief: '評估 CPM 對 TKA 術後膝關節活動度的效益。' },
    alternativeArticles: [{ studyCount: 37, participants: 2895, brief: '探討關節腔注射對骨關節炎疼痛的效果。' }],
  },
  ask: { picots: [
    { isPrimary: false, p: '骨關節炎高齡患者', i: '接受關節腔注射', c: '不注射', o: '疼痛改善', t: '6 週' },
    { isPrimary: true,
      p: '接受全膝關節置換手術 (TKA) 的骨關節炎高齡患者',
      i: '以連續被動性運動 (CPM) 進行復健 (每日 1-2 次)',
      c: '以傳統物理治療進行復健 (每週 2-3 次)',
      o: '膝關節活動度 (ROM) 改善',
      t: '12 個月',
      justification: '病人喜愛戶外運動，關節復原程度高度影響生活品質' },
  ]},
  appraise: {
    casp: { scores: {
      q1: { human: 'yes' }, q2: { human: 'yes' }, q3a: { human: 'yes' }, q3b: { human: 'yes' },
      q3c: { human: 'yes' }, q3d: { human: 'yes' }, q4: { human: 'yes' }, q5a: { human: 'yes' },
      q5b: { human: 'yes' }, q6: { human: 'yes' }, q6_1: { human: 'uncertain' }, q6_2: { human: 'uncertain' },
      q7: { human: 'yes' },
    } },
    results: { outcomes: [
      { name: '物理約束率', sampleSize: 3847, rctCount: 11, effectSize: '0.72', ci95: '[0.60 ~ 0.86]',
        grade: { imprecision: { decision: 0, magnitude: '屬於 Moderate effect' },
                 inconsistency: { decision: -1, i2: '95%', overlap: '部分重疊不足', distribution: '有些跨越 null' } } },
      { name: '非計劃性拔管率', sampleSize: 1700, rctCount: 10, effectSize: '0.36', ci95: '[0.23 ~ 0.56]',
        grade: { imprecision: { decision: 0, magnitude: '屬於 Moderate effect' },
                 inconsistency: { decision: 0, i2: '', overlap: '信賴區間重疊比例高', distribution: '多數點估計值落在同側' } } },
      { name: '譫妄發生率', sampleSize: 1062, rctCount: 6, effectSize: '0.53', ci95: '[0.41 ~ 0.68]',
        grade: { imprecision: { decision: 0, magnitude: '屬於 Moderate effect' },
                 inconsistency: { decision: 0, i2: '', overlap: '信賴區間重疊比例高', distribution: '多數點估計值落在同側' } } },
    ] },
    grade: { domains: {
      riskOfBias: { decision: 0 }, publicationBias: { decision: 0 },
      indirectness: { decision: 0, picoComparison: {
        p: { study: 'TKA 術後成人', case_: '72 歲 TKA 病人' },
        i: { study: 'CPM 復健', case_: 'CPM 復健' },
        c: { study: '傳統物理治療', case_: '常規復健' },
        o: { study: '膝關節 ROM、疼痛', case_: 'ROM 改善' },
        age: { study: 'TKA 術後成人', case_: '72 歲女性' },
        eth: { study: '多國', case_: '台灣' },
        setting: { study: 'TKA 術後復健', case_: 'TKA 術後復健' },
      } },
    } },
  },
  apply: {
    applicability: { rationale: '相似程度高，可行' },
    benefitRisk: { options: [
      { name: '連續被動性運動 (CPM)',
        benefits: ['不需主動用力，接受度高', '減少術後腫脹', '個人化調整'],
        risks: ['無法提供全面性功能訓練', '設定不當恐關節過度伸展'] },
      { name: '傳統物理治療',
        benefits: ['全面性功能改善', '長期功能恢復'],
        risks: ['療效因治療師經驗而異', '治療過程可能不適'] },
    ] },
    evidenceToDecision: {
      benefitRisk: { assessment: '利益: 改善ROM有限；風險: 設定不當恐拉傷' },
      evidenceQuality: { assessment: 'ROM 中等證據品質' },
      valuesPreferences: { assessment: '希望加快關節恢復' },
      costEffectiveness: { assessment: '總花費高於物理治療' },
      feasibility: { assessment: '需購買或租借機器' },
      acceptability: { assessment: '不需主動用力，接受度高' },
    },
    costAnalysis: { options: [
      { name: '連續被動性運動 (CPM)', directCost: ['機器租賃 4.5~9萬', '耗材 800~2000'], indirectCost: ['家屬收入損失 9576~10608'], totalCost: 'NT$ 57,176–222,208' },
      { name: '傳統物理治療', directCost: ['治療費 600~30000', '掛號費 1200~3600'], indirectCost: ['交通費 600~6000'], totalCost: 'NT$ 12,026–50,708' },
    ] },
    recommendationStrength: 'conditional',
    patientSummary: '盧媽媽您好，被動性運動雖然可以減輕疼痛，但對於改善膝蓋活動度的成效有限，因此較不推薦。',
  },
};

const zip = await JSZip.loadAsync(await readFile('public/template.pptx'));
await fillProject(zip, project);
const deckProblems = await validateDeck(zip);
await writeFile('tools/_test_out.pptx', await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));

const out = await JSZip.loadAsync(await readFile('tools/_test_out.pptx'));
const re = /<a:t(?:\s[^>]*)?>([\s\S]*?)<\/a:t>/g;
async function text(n){ const x=await out.file(`ppt/slides/slide${n}.xml`).async('string'); let m,s=''; while((m=re.exec(x))) s+=m[1]; return s; }

// Visible slides only (in deck order) — hidden masters keep {{gi.*}} tokens and
// must NOT be checked. Resolve sldIdLst -> presentation rels -> slide numbers.
async function visibleSlideNums(z) {
  const pres = await z.file('ppt/presentation.xml').async('string');
  const prels = await z.file('ppt/_rels/presentation.xml.rels').async('string');
  const tgt = {}; let m;
  const RT = /<Relationship Id="(rId\d+)"[^>]*Target="slides\/slide(\d+)\.xml"/g;
  while ((m = RT.exec(prels)) !== null) tgt[m[1]] = Number(m[2]);
  const nums = []; const SI = /<p:sldId id="\d+" r:id="(rId\d+)"\/>/g;
  while ((m = SI.exec(pres)) !== null) if (tgt[m[1]]) nums.push(tgt[m[1]]);
  return nums;
}
const visNums = await visibleSlideNums(out);
let visibleText = '';
for (const n of visNums) visibleText += await text(n);
const V = visibleText; // all visible deck text (incl. dynamically cloned GRADE slides)

const s54=await text(54), s20=await text(20), s43=await text(43), s13=await text(13), s14=await text(14), s15=await text(15), s16=await text(16), s18=await text(18), s1=await text(1), s4=await text(4), s6=await text(6), s3=await text(3), s5=await text(5), s8=await text(8), s9=await text(9), s12=await text(12), s23=await text(23), s34=await text(34), s49=await text(49), s50=await text(50), s51=await text(51), s52=await text(52), s53=await text(53), s55=await text(55), s56=await text(56);
const checks = [
  ['S1 team members', s1.includes('王小明 藥師 | 李美麗 醫師 | 陳大同 護理師')],
  ['S4 background topic', s4.includes('連續被動性運動')],
  ['S6 arm0 name', s6.includes('傳統物理治療')],
  ['S6 arm0 course (療程 prefix)', s6.includes('療程: 每週 2-3 次，由治療師徒手操作。')],
  ['S6 arm1 issue (議題 prefix)', s6.includes('議題: 需購買或租借機器，成本較高。')],
  ['S6 no leftover token', !s6.includes('{{')],
  ['S3 scenario', s3.includes('盧媽媽')],
  ['S3 situation bullet 1', s3.includes('術後盧媽媽希望盡快恢復膝關節活動度')],
  ['S3 situation bullet 3 (list expand)', s3.includes('骨科醫師建議考慮連續被動性運動')],
  ['S3 clinical question 1', s3.includes('CPM 是否比傳統物理治療更能改善膝關節活動度?')],
  ['S3 clinical question 2 (list expand)', s3.includes('CPM 的成本效益是否合理?')],
  ['S3 old situation removed', !s3.includes('家屬詢問是否應使用物理約束')],
  ['S3 no leftover token', !s3.includes('{{')],
  ['S5 disease overview', s5.includes('關節軟骨逐漸磨損')],
  ['S5 risk factors', s5.includes('家族遺傳史')],
  ['S5 treatment', s5.includes('關節置換手術')],
  ['S13 P term1 (reuse free text)', s13.includes('osteoarthritis')],
  ['S13 I term (reuse free text)', s13.includes('glucosamine')],
  ['S14 total count', s14.includes('87 篇')],
  ['S14 positive', s14.includes('Positive: 16 篇')],
  ['S14 negative', s14.includes('Negative: 71 篇')],
  ['S14 no leftover token', !s14.includes('{{')],
  ['S15 Cochrane converted query', s15.includes('[mh "Osteoarthritis"] AND glucosamine')],
  ['S15 no leftover token', !s15.includes('{{')],
  ['S16 Embase converted query', s16.includes("'glucosamine'/exp")],
  ['S16 no leftover token', !s16.includes('{{')],
  ['S18 selected RCT count', s18.includes('RCT 數量: 14 篇')],
  ['S18 selected participants', s18.includes('受試者數量: 4338 人')],
  ['S18 alt study count', s18.includes('研究數量: 37 篇')],
  ['S18 alt participants', s18.includes('2895 人')],
  ['S18 selected brief', s18.includes('評估 CPM 對 TKA')],
  ['S18 no leftover token', !s18.includes('{{')],
  ['S43 PICO P study', s43.includes('TKA 術後成人')],
  ['S43 PICO P case', s43.includes('72 歲 TKA 病人')],
  ['S43 PICO C case', s43.includes('常規復健')],
  ['S43 ind decision', s43.includes('不扣分')],
  ['S43 no leftover token', !s43.includes('{{')],
  ['S20 PICO I study (reused)', s20.includes('CPM 復健')],
  ['S20 PICO O case', s20.includes('ROM 改善')],
  ['S20 no leftover token (I/C/O cells)', !s20.includes('{{pc.')],
  ['S54 o0 name', s54.includes('物理約束率')],
  ['S54 o1 name (full, line2 blanked)', s54.includes('非計劃性拔管率')],
  ['S54 o0 sample', s54.includes('3847人')],
  ['S54 o0 RR', s54.includes('0.72 ') && s54.includes('[0.60 ~ 0.86]')],
  ['S54 o0 quality 中 (computed)', s54.includes('中')],
  ['S54 quality 高 (o1/o2)', s54.includes('高')],
  ['S54 o0 clinical 可能有效 (derived)', s54.includes('可能有效')],
  ['S54 clinical 有效 (o1/o2)', s54.includes('有效')],
  ['S54 no leftover token', !s54.includes('{{')],
  ['S12 free text P (joined)', s12.includes('osteoarthritis, knee')],
  ['S12 free text I', s12.includes('glucosamine')],
  ['S12 MeSH P', s12.includes('"Osteoarthritis, Knee"[MeSH]')],
  ['S12 old 2nd line removed', !s12.includes('self-extubation')],
  ['S12 no leftover token', !s12.includes('{{')],
  ['S8 secondary PICO (注射)', s8.includes('關節腔注射')],
  ['S9 primary PICO (CPM)', s9.includes('連續被動性運動 (CPM)')],
  ['S9 no leftover token', !s9.includes('{{')],
  ['S34 o0 name', s34.includes('物理約束率')],
  ['S34 o0 sample (N 人)', s34.includes('3847 人')],
  ['S34 o0 RR [CI]', s34.includes('0.72 [0.60 ~ 0.86]')],
  ['S34 o1 wrapped name filled', s34.includes('非計劃性拔管率')],
  ['S34 o2 RR', s34.includes('0.53 [0.41 ~ 0.68]')],
  ['S34 no leftover token', !s34.includes('{{')],
  ['S23 CASP yes -> 😀', s23.includes('😀')],
  ['S23 CASP no -> 😟', s23.includes('😟')],
  ['S23 CASP uncertain -> 😐', s23.includes('😐')],
  ['S23 no leftover token', !s23.includes('{{')],
  // --- Dynamic per-outcome GRADE (cloned slides). Checked on the VISIBLE deck. ---
  ['deck plumbing valid', deckProblems.length === 0],
  ['GRADE imprecision RR line (o0)', V.includes('物理約束率: RR 0.72')],
  ['GRADE CI ratio computed (o0)', V.includes('CI ratio = 0.86/0.6 = 1.43')],
  ['GRADE crosses-null computed', V.includes('無跨越 null')],
  ['GRADE imprecision RR line (o1)', V.includes('非計劃性拔管率: RR 0.36')],
  ['GRADE inconsistency I² (o0 issues)', V.includes('I² = 95%')],
  ['GRADE inconsistency downgrade word', V.includes('扣 1 分')],
  ['GRADE summary certainty 中 (o0)', V.includes('整體扣 1 分 → 證據品質: 中')],
  ['GRADE summary certainty 高 (o1/o2)', V.includes('整體不扣分 → 證據品質: 高')],
  ['GRADE summary per-domain badge "-1" shown', V.includes('-1')],
  ['GRADE summary DROP sentinel fully removed', !V.includes('{{DROP}}') && !V.includes('DROP')],
  ['GRADE no generic token leaked (visible)', !V.includes('{{gi.')],
  ['GRADE visible deck has no leftover token', !V.includes('{{')],
  ['S49 applicability verdict', s49.includes('相似程度高，可行')],
  ['S49 age case', s49.includes('72 歲女性')],
  ['S49 age study', s49.includes('TKA 術後成人')],
  ['S49 eth study (line1, line2 removed)', s49.includes('多國') && !s49.includes('哥倫比亞')],
  ['S49 setting case+study (seq)', s49.includes('TKA 術後復健')],
  ['S49 intervention case+study (seq)', s49.includes('CPM 復健')],
  ['S49 control case/study', s49.includes('常規復健') && s49.includes('傳統物理治療')],
  ['S49 outcome study (line2 removed)', s49.includes('膝關節 ROM、疼痛') && !s49.includes('拔管、譫妄')],
  ['S49 no leftover token', !s49.includes('{{')],
  ['S50 arm0 name', s50.includes('連續被動性運動 (CPM)')],
  ['S50 arm0 benefit 1', s50.includes('不需主動用力，接受度高')],
  ['S50 arm0 benefit 3 (list expand)', s50.includes('個人化調整')],
  ['S50 arm1 risk 2', s50.includes('治療過程可能不適')],
  ['S50 no leftover token', !s50.includes('{{')],
  ['S50 old bullet removed', !s50.includes('機械通氣時間縮短')],
  ['S51 cost0 direct list', s51.includes('機器租賃 4.5~9萬')],
  ['S51 cost0 indirect list', s51.includes('家屬收入損失 9576~10608')],
  ['S51 old cost bullet removed', !s51.includes('Dexmedetomidine')],
  ['S52 cost1 direct list', s52.includes('治療費 600~30000')],
  ['S53 cost0 name', s53.includes('連續被動性運動 (CPM)')],
  ['S53 cost0 total', s53.includes('NT$ 57,176–222,208')],
  ['S53 cost1 total', s53.includes('NT$ 12,026–50,708')],
  ['S51 no leftover token', !s51.includes('{{')],
  ['S53 no leftover token', !s53.includes('{{')],
  ['S55 EtD benefitRisk', s55.includes('設定不當恐拉傷')],
  ['S55 EtD evidenceQuality', s55.includes('ROM 中等證據品質')],
  ['S55 EtD acceptability', s55.includes('接受度高')],
  ['S55 recommendation', s55.includes('部分推薦')],
  ['S55 no leftover token', !s55.includes('{{')],
  ['S55 old line removed', !s55.includes('譫妄發生率: 高證據品質')],
  ['S56 reply', s56.includes('較不推薦')],
];
for (const [name, ok] of checks) console.log(ok ? 'PASS' : 'FAIL', '-', name);
console.log(checks.every(c=>c[1]) ? '\nALL PASS' : '\nSOME FAILED');
