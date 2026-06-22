// One-time (re-runnable) tool: turn the real competition deck into a tokenized
// template at public/template.pptx. Run from repo root:
//   node tools/tokenizeTemplate.mjs ["path\to\source.pptx"]
//
// Pairs are grouped BY SLIDE (original 院內賽 text -> {{token}}). Token names
// MUST stay in sync with src/pptx/tokenMap.js.
import JSZip from 'jszip';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { applyPerSlide, removeOnSlides, alignOnSlides, tokenizeSeqOnSlides } from '../src/pptx/engine.js';

const SRC =
  process.argv[2] ||
  'G:\\我的雲端硬碟\\#FJUH.Pharm\\@EBM 遊樂園\\EBM_slide_ref\\EBM 院內賽_20260516.pptx';
const OUT = process.env.OUT || 'public/template.pptx';
// Diagnostic flags (isolate a feature to find what PowerPoint rejects):
//   SKIP_BADGE=1  skip S45 per-domain badge surgery
//   SKIP_SEQ=1    skip S23 emoji sequence tokenizing
//   SKIP_GRADE=1  skip S34 results table + S36-47 GRADE tokenizing
const FLAGS = { skipBadge: !!process.env.SKIP_BADGE, skipSeq: !!process.env.SKIP_SEQ, skipGrade: !!process.env.SKIP_GRADE };

const SLIDES = {
  // S1 title — team members (institution lines are constant for FJUH, left as-is)
  1: [['張芷榕 藥師 | 曾亞莛 醫檢師 | 金楚晴 營養師', '{{team.members}}']],

  // S4 背景知識搜尋 — the topic/subject of the background search
  4: [['物理約束', '{{bg.topic}}']],

  // S6 物理約束處置 — two treatment arms: name + 療程 (course) + 議題 (issue)
  6: [
    ['常規物理約束', '{{arm0.name}}'],
    ['指引導向減少約束策略', '{{arm1.name}}'],
    ['療程: 依護理人員經驗決定約束時機，多採全約束直至病情穩定。', '{{arm0.course}}'],
    ['議題: 雖意圖預防自拔，但可能增加譫妄、神經血管併發症與心理創傷等。', '{{arm0.issue}}'],
    ['療程: 多專科團隊評估；無約束 q24h、選擇性約束 q8h、全約束 q2h；結合 ABCDEF bundle。', '{{arm1.course}}'],
    ['議題: 對 ICU 機械通氣脫離期的躁動病人，是否能降低非計劃性拔管率而不增加譫妄風險?', '{{arm1.issue}}'],
  ],

  // S3 個案簡介 — background box + 情境 bullets (list) + 臨床問題 (list, auto-numbered).
  // First bullet of each list becomes the {{*token}}; extra original bullets removed.
  3: [
    ['65 歲男性，因嚴重肺炎引發敗血性休克與急性呼吸衰竭入住 ICU。經升壓劑與插管後血壓穩定，目前處於呼吸器脫離階段。', '{{case.background}}'],
    ['隨鎮靜藥物減量，病人開始躁動，試圖拉扯導管與呼吸器管路', '{{*situation}}'],
    ['減少物理約束是否會增加非計劃性拔管?', '{{*clinicalQuestions}}'],
  ],

  // S5 背景知識 — disease overview / risk factors / treatment.
  // Risk-factors box has a hard line break (two <a:p>): put the value in the
  // first line; the leftover second line is deleted via REMOVE below.
  5: [
    ['利用限制帶、床欄等器具固定病人身體，以限制其自由活動，通常用於預防非計劃性拔管或跌倒等。', '{{bg.definition}}'],
    ['機械通氣、多管路、躁動、譫妄、高自拔風險、', '{{bg.riskFactors}}'],
    ['常規約束（依循過往經驗或主觀判定）vs. 指引導向減少約束策略（CPG / ABCDEF bundle / 最佳證據）', '{{bg.treatment}}'],
  ],

  // S8 PICOT-1 (secondary PICO)
  8: [
    ['加護病房內的成年患者', '{{pico2.P}}'],
    ['不接受物理約束', '{{pico2.C}}'],
    ['接受物理約束', '{{pico2.I}}'],
    ['譫妄發生率', '{{pico2.O}}'],
    ['ICU 住院期間', '{{pico2.T}}'],
  ],

  // S9 PICOT-2 (primary / selected PICO) — incl. "原因: …" selection rationale
  9: [
    ['加護病房內使用呼吸器且有躁動情形的成年患者', '{{pico.P}}'],
    ['減少物理約束策略（Minimal Restraint）', '{{pico.I}}'],
    ['常規物理約束（Routine physical restraint）', '{{pico.C}}'],
    ['非計畫性拔管率', '{{pico.O}}'],
    ['ICU 住院 / 機械通氣脫離期', '{{pico.T}}'],
    ['正面回應家屬對自拔風險疑慮', '{{pico.reason}}'],
  ],

  // S12 關鍵字表 — free text + MeSH per P/I/C/O (arrays joined with ", ")
  12: [
    ['ICU, intensive care unit, critical care, mechanical ventilation', '{{kw.free.P}}'],
    ['physical restraint reduction, restraint minimization, ABCDEF bundle', '{{kw.free.I}}'],
    ['routine restraint, ', '{{kw.free.C}}'],
    ['unplanned extubation, ', '{{kw.free.O}}'],
    ['"Intensive Care Units"[MeSH], "Critical Care"[MeSH]', '{{kw.mesh.P}}'],
    ['"Restraint, Physical"[MeSH]', '{{kw.mesh.I}}'],
    ['"Airway Extubation"[MeSH], "Delirium"[MeSH]', '{{kw.mesh.O}}'],
  ],

  // S34 結果綜覽 — results table, up to 6 outcome rows. Each row: name, "N 人",
  // "(R RCT)", "RR [95% CI]". Some name cells span 2 paragraphs (2nd removed below).
  34: [
    ['物理約束率', '{{o0.name}}'], ['3847 人', '{{o0.n}}'], ['(11 RCT)', '{{o0.rct}}'], ['0.72 [0.60 ~ 0.86]', '{{o0.rr}}'],
    ['非計劃性', '{{o1.name}}'], ['1700 人', '{{o1.n}}'], ['(10 RCT)', '{{o1.rct}}'], ['0.36 [0.23 ~ 0.56]', '{{o1.rr}}'],
    ['譫妄發生率', '{{o2.name}}'], ['1062 人', '{{o2.n}}'], ['(6 RCT)', '{{o2.rct}}'], ['0.53 [0.41 ~ 0.68]', '{{o2.rr}}'],
    ['其他併發症', '{{o3.name}}'], ['1608 人', '{{o3.n}}'], ['(9 RCT)', '{{o3.rct}}'], ['0.36 [0.26 ~ 0.50]', '{{o3.rr}}'],
    ['躁動/焦慮率', '{{o4.name}}'], ['463 人', '{{o4.n}}'], ['(4 RCT)', '{{o4.rct}}'], ['0.68 [0.09 ~ 5.22]', '{{o4.rr}}'],
    ['病人滿意度', '{{o5.name}}'], ['553 人', '{{o5.n}}'], ['(3 RCT)', '{{o5.rct}}'], ['1.16 [1.10 ~ 1.24]', '{{o5.rr}}'],
  ],

  // S20 PICO 比較 — full case/study: 年齡(age)/種族(eth)/疾病(setting) + I/C/O
  20: [
    ['成年 ICU 病人 (≥18 歲)', '{{pc.age.study}}'],
    ['65 歲 ICU 病人 ', '{{pc.age.case}}'],
    ['中國 13 篇、哥倫比亞 1 篇', '{{pc.eth.study}}'],
    ['台灣', '{{pc.eth.case}}'],
    ['機械通氣/置管/意識障礙', '{{pc.setting.study}}'],
    ['呼吸器脫離 + 躁動', '{{pc.setting.case}}'],
    ['指引導向減少約束', '{{pc.i.study}}'],
    ['常規護理', '{{pc.c.study}}'],
    ['常規物理約束', '{{pc.c.case}}'],
    ['物理約束率&時間、譫妄、非計劃性拔管率', '{{pc.o.study}}'],
    ['非計劃性拔管率 + 譫妄、安全性', '{{pc.o.case}}'],
  ],

  // S49 案例適用性 table — case vs study for age/eth/setting + I/C/O. Cells with
  // identical text in both columns (setting, I) are handled by SEQ below; 2-line
  // study cells (eth, O) keep line 1 and drop line 2 via REMOVE.
  49: [
    ['65歲男性', '{{pc.age.case}}'],
    ['成人 (≥18 歲)', '{{pc.age.study}}'],
    ['台灣', '{{pc.eth.case}}'],
    ['中國、', '{{pc.eth.study}}'],
    ['常規物理約束', '{{pc.c.case}}'],
    ['常規護理', '{{pc.c.study}}'],
    ['降低非計劃性拔管', '{{pc.o.case}}'],
    ['物理約束率', '{{pc.o.study}}'],
    ['相似程度高，應用上可行', '{{apply.applicability}}'],
  ],

  // S43 PICO 不直接性 table — study vs case for P/I/C/O (cells present in template)
  43: [
    ['成年 ICU 病人 (≥18 歲)', '{{pc.p.study}}'],
    ['65 歲 ICU 病人 ', '{{pc.p.case}}'],
    ['依指引減少物理約束', '{{pc.i.study}}'],
    ['常規護理', '{{pc.c.study}}'],
    ['常規物理約束', '{{pc.c.case}}'],
    ['物理約束率、非計劃性拔管、譫妄等', '{{pc.o.study}}'],
    ['不扣分', '{{g.ind.dec}}'],
  ],

  // S36 誤差風險 (body-level RoB) — decision word only (篇數 counts need new fields)
  36: [['不扣分', '{{g.rob.dec}}']],

  // --- GRADE detail MASTERS (generic {{gi.*}} tokens). At FILL time each is
  // cloned once per outcome and the gi tokens are swapped per outcome; the masters
  // (and the now-unused sibling slides 38/39/42/46/47) are then hidden. See
  // src/pptx/fillProject.js. Slides 38/39/42/46/47 are intentionally NOT tokenized.

  // S37 不精確性 (imprecision) MASTER. RR line + CI-ratio + crosses-null are
  // rebuilt from results data; magnitude is a per-outcome field.
  37: [
    ['物理約束率: RR 0.72 [0.60, 0.86]', '{{gi.imp.line}}'],
    ['CI ratio = 0.86/0.6 = 1.43', '{{gi.imp.ratio}}'],
    ['屬於 Moderate effect', '{{gi.imp.mag}}'],
    ['無跨越 null', '{{gi.imp.cross}}'],
    ['不扣分', '{{gi.imp.dec}}'],
  ],

  // S40 不一致性 MASTER — "HAS ISSUES" layout (extra I² + subgroup rows).
  40: [
    ['物理約束率', '{{gi.inc.name}}'],
    ['部分重疊不足', '{{gi.inc.overlap}}'],
    ['有些跨越 null', '{{gi.inc.dist}}'],
    ['I² = 95%', '{{gi.inc.i2}}'],
    ['扣1分', '{{gi.inc.dec}}'],
  ],
  // S41 不一致性 MASTER — "NO ISSUES" layout (simpler, no I² row).
  41: [
    ['非計劃性拔管', '{{gi.inc.name}}'],
    ['信賴區間重疊比例高', '{{gi.inc.overlap}}'],
    ['多數點估計值落在同側 ', '{{gi.inc.dist}}'],
    ['不扣分', '{{gi.inc.dec}}'],
  ],

  // (S43 PICO 不直接性 table is wired above, near S20.)

  // S44 發表偏誤 (body) — decision word
  44: [['不扣分', '{{g.pub.dec}}']],

  // S45 Core GRADE 綜合評估 MASTER (per-outcome summary): name + auto conclusion.
  // The single inconsistency '-1' badge is replaced below (badgeSurgery) with one
  // badge per GRADE domain so any downgrade pattern shows on the correct box.
  45: [
    ['物理約束率', '{{gi.sum.name}}'],
    ['整體扣 1 分 → 證據品質: 中', '{{gi.sum.concl}}'],
  ],

  // S13 PubMed 初步檢索 — main search terms (reuse free-text P/I)
  13: [
    ['Intensive Care Units', '{{s13.p1}}'],
    ['Mechanical ventilation', '{{s13.p2}}'],
    ['Physical restraint', '{{s13.i1}}'],
  ],

  // S14 文獻篩選 (LitSuggest) — total + positive/negative counts
  14: [
    ['87 篇', '{{s14.total}}'],
    ['Positive: 16 篇', '{{s14.pos}}'],
    ['Negative: 71 篇', '{{s14.neg}}'],
  ],

  // S15/S16 關鍵字轉換 — verbatim per-DB converted queries. The whole example
  // query box collapses to one token (first paragraph keeps formatting; the
  // remaining example lines are dropped via the run-collapse in tokenize_conv).
  // NOTE: these two boxes were tokenized by tools/tokenize_conv.py against the
  // already-built template (the example text spans many runs/paragraphs, which
  // the exact-string SLIDES map can't match). Listed here for documentation /
  // future regeneration; see that script if rebuilding from the source deck.
  // 15: Cochrane query box -> {{conv.cochrane}}
  // 16: Embase  query box -> {{conv.embase}}

  // S18 文獻選擇 — selected vs alternative article (counts + brief)
  18: [
    ['研究數量: 37 篇', '{{s18.alt.count}}'],
    ['2895 人', '{{s18.alt.n}}'],
    ['RCT 數量: 14 篇', '{{s18.sel.rct}}'],
    ['受試者數量: 4338 人', '{{s18.sel.n}}'],
    ['探討 ICU 物理約束暴露與 PTSD、譫妄、機械通氣時長之關聯。', '{{s18.alt.brief}}'],
    ['評估指引導向介入對 ICU 物理約束、譫妄、非計劃性拔管率的效益。', '{{s18.sel.brief}}'],
  ],

  // (S49 案例適用性 is wired above, near S20.)

  // S50 利益風險比較 — two arms; benefit/risk cells are repeating bullets.
  // First bullet of each cell becomes a list token; extra bullets removed below.
  50: [
    ['依指引減少物理約束', '{{br0.name}}'],
    ['常規物理約束', '{{br1.name}}'],
    ['自拔率 ↓ 64% ( RR 0.36，NNT=18 )', '{{*br0.benefits}}'],
    ['短期執行門檻低', '{{*br1.benefits}}'],
    ['護理人員訓練與評估時間提升：疼痛、鎮靜及譫妄評估', '{{*br0.risks}}'],
    ['自拔率較高 ( 多達 50-70% 的自拔管發生在約束中 )', '{{*br1.risks}}'],
  ],

  // S55 證據到建議 (EtD) — 6 factor assessments + recommendation.
  // Cells with extra lines have those lines removed via REMOVE below.
  55: [
    ['利益: 拔管 ↓64%、譫妄 ↓47%', '{{etd.benefitRisk}}'],
    ['物理約束率: 中證據品質', '{{etd.evidenceQuality}}'],
    ['家屬擔憂拔管', '{{etd.valuesPreferences}}'],
    ['減少物理約束相對可省下約25萬元', '{{etd.costEffectiveness}}'],
    ['工具為國際公版', '{{etd.feasibility}}'],
    ['家屬與護理長支持', '{{etd.acceptability}}'],
    ['部分推薦', '{{apply.recommendation}}'],
  ],

  // S51 成本計算: 減少約束 — direct/indirect cost bullet lists (first bullet = list token)
  51: [
    ['ICU 床位及基本診察費: NT$ 5~7萬 (住 3~4 天)', '{{*cost0.direct}}'],
    ['醫護職業傷害、離職成本: NT$ 0~5000 (團隊成就感提升)', '{{*cost0.indirect}}'],
  ],

  // S52 成本計算: 常規約束
  52: [
    ['ICU 床位及基本診察費: NT$ 10~13萬 (住 6~8 天)', '{{*cost1.direct}}'],
    ['醫護職業傷害、離職成本: NT $ 1~2萬 (醫療暴力)', '{{*cost1.indirect}}'],
  ],

  // S53 成本表 — arm names + totals (per-row category values left as template for now)
  53: [
    ['減少約束', '{{cost0.name}}'],
    ['常規約束', '{{cost1.name}}'],
    ['6.3萬 – 11萬', '{{cost0.total}}'],
    ['20 萬 – 36萬', '{{cost1.total}}'],
  ],

  // S54 效益分析 summary — sample + RR cells (numeric strings, collision-safe).
  // Names + quality + clinical use the SEQ map (exact match) because 拔管/高/有效
  // also appear in the footer sentence — see SEQ[54] below.
  54: [
    ['3847人', '{{o0.s54n}}'], ['(11 RCT)', '{{o0.s54rct}}'], ['0.72 ', '{{o0.s54rr1}}'], ['[0.60 ~ 0.86]', '{{o0.s54rr2}}'],
    ['1700人', '{{o1.s54n}}'], ['(10 RCT)', '{{o1.s54rct}}'], ['0.36 ', '{{o1.s54rr1}}'], ['[0.23 ~ 0.56]', '{{o1.s54rr2}}'],
    ['1062 人', '{{o2.s54n}}'], ['(6 RCT)', '{{o2.s54rct}}'], ['0.53 ', '{{o2.s54rr1}}'], ['[0.41 ~ 0.68]', '{{o2.s54rr2}}'],
  ],

  // S56 去學術化回應 — plain-language reply
  56: [['依標準流程減少約束，反而可降低自拔風險 64 %，還能減少譫妄、縮短脫離呼吸器的時間，更能樽節各項醫療及照護成本。護理團隊會定時評估，需要時仍會進行保護，不會放任不管。對於擔心爸爸自拔或受傷的您們來說，是更安全、舒適，甚至是更經濟的選擇，所以推薦採用減少物理約束的照護方式。', '{{plain_response}}']],
};

// Paragraphs to delete outright (e.g. a box's hard line-break leftover line),
// so a single value fills the box cleanly. { slideNum: ['text in the line'] }
const REMOVE = {
  5: ['意識模糊、高齡、失智症等無法配合醫療指導的重症患者'],
  // S34: outcome name "非計劃性拔管率" wraps to 2 lines; line1 holds the token,
  // delete the leftover 2nd line so one value fills the cell.
  34: ['拔管率'],
  // S3: remove the 2nd/3rd 情境 bullets + 2nd 臨床問題 (list expansion clones line 1)
  3: ['家屬詢問是否應使用物理約束以預防拔管', '護理長提出推動「減少物理約束策略」以降低譫妄發生', '減少物理約束對譫妄發生率的影響?'],
  // S49: drop the 2nd line of the two wrapped study cells (eth + O)
  49: ['哥倫比亞', '拔管、譫妄'],
  // S12 keyword cells with a 2nd line (C / O free text)
  12: ['usual care', 'self-extubation, delirium'],
  // EtD cells whose extra lines are dropped so one assessment value fills the cell
  55: ['風險: 僅需訓練時間', '非計劃性拔管: 高證據品質', '譫妄發生率: 高證據品質'],
  // S50 extra benefit/risk bullets (first bullet kept as list token, rest removed)
  50: [
    '譫妄 ↓ 47% ( NNT=7 )', '機械通氣時間縮短 ↓ 31.87 hr', '病人滿意度 ↑ 16%',
    '不需額外訓練', '限制大範圍肢體動作',
    '團隊跨領域協調成本高',
    '譫妄、肢體紅腫、壓傷風險', '家屬目睹約束的負向情緒',
  ],
  // S51 extra cost bullets
  51: [
    '呼吸器、通氣處置費: NT$ 1.1~1.7萬 (插管 2~3 天)', '鎮靜、抗譫妄藥物費: NT$ 4000~8000 (Dexmedetomidine)',
    '併發症治療、重新插管費用: NT$ 0 ~5500 (低發生率)', '照護人力: 每班+0.5 hr，共 NT$ 2000~4000 (每班三階段科學評估)',
    '病人出院後生產力損失 (PICS) : NT$ 0~10000 (早期下床/預後良好)',
  ],
  // S52 extra cost bullets
  52: [
    '呼吸器、通氣處置費: NT$ 2.2~3.3萬 (插管 4~6 天)', '鎮靜、抗譫妄藥物費: NT$ NT$ 2000 ~ 4000 (Midazolam/Haldol)',
    '併發症治療、重新插管費用: NT$ 3.5~11萬', '照護人力: 每 2hr 處理，共 NT$ 4000~6500',
    '病人出院後生產力損失 (PICS) : NT$ 3~6萬 (譫妄導致長期認知退化)',
  ],
};

// S23 CASP grid: 26 identical "😀" cells in document order (left table Q1-Q4,
// then right table Q5a-Q7; each question = AI cell then 人類 cell). Positional
// tokenizing gives the k-th "😀" its own token. Legend cells ("是😀") are skipped
// (exact-equality match). Order MUST match tokenMap caspKeys x [ai, h].
const CASP_KEYS = ['q1','q2','q3a','q3b','q3c','q3d','q4','q5a','q5b','q6','q6_1','q6_2','q7'];
const CASP_SEQ = CASP_KEYS.flatMap((q) => [`{{casp.${q}.ai}}`, `{{casp.${q}.h}}`]);
const SEQ = {
  23: [['😀', CASP_SEQ]],
  // S49 cells whose text is identical in the case AND study columns — exact match,
  // document order = case column first, then study column.
  49: [
    ['ICU機械通氣', ['{{pc.setting.case}}', '{{pc.setting.study}}']],
    ['減少物理約束', ['{{pc.i.case}}', '{{pc.i.study}}']],
  ],
  // S54 cells that repeat / collide with the footer sentence — matched by EXACT
  // paragraph text in document order (row 0, then 1, then 2).
  54: [
    ['物理約束率', ['{{o0.s54name}}']],
    ['非計劃性', ['{{o1.s54name}}']],
    ['拔管', ['{{o1.s54name2}}']],
    ['譫妄發生率', ['{{o2.s54name}}']],
    ['中', ['{{o0.s54q}}']],
    ['高', ['{{o1.s54q}}', '{{o2.s54q}}']],
    ['可能有效', ['{{o0.s54c}}']],
    ['有效', ['{{o1.s54c}}', '{{o2.s54c}}']],
  ],
};

// Paragraphs to force left-aligned (authored centre-aligned, wrap badly).
// { slideNum: ['marker text/token in the paragraph'] }
const ALIGN_LEFT = {
  9: ['{{pico.reason}}'],
};

// S45 summary: replace the single inconsistency "-1" badge with one badge per
// GRADE domain box, each carrying a generic {{gi.sum.d.*}} token. Positions are
// each domain box's top-right corner (same relative offset the original badge had
// from the 不一致性 box: box.x + box.cx - 520957, box.y - 387602).
async function badgeSurgery(zip) {
  const name = 'ppt/slides/slide45.xml';
  let xml = await zip.file(name).async('string');
  const sps = xml.match(/<p:sp>[\s\S]*?<\/p:sp>/g) || [];
  const badge = sps.find((sp) => {
    const t = (sp.match(/<a:t(?:\s[^>]*)?>([\s\S]*?)<\/a:t>/g) || [])
      .map((s) => s.replace(/<[^>]+>/g, '')).join('').trim();
    return t === '-1';
  });
  if (!badge) { console.warn('S45 badgeSurgery: "-1" badge not found — skipped'); return 0; }

  // CRITICAL: slide 45 has a <p:timing> animation that targets the badge by shape
  // id (spid="13"). Changing/removing/cloning that shape would dangle the spid ->
  // PowerPoint "repair". The generated deck doesn't need the click-reveal anim, so
  // strip the whole timing block; then shapes can be freely added/removed/dropped.
  xml = xml.replace(/<p:timing>[\s\S]*?<\/p:timing>/, '');

  // [token-key, off x, off y] per domain box (EMU). Diagnostic: BADGE_MODE=single
  // emits only the inconsistency badge (to isolate "duplication" vs "modification").
  const ALL = [
    ['rob', 2474791, 2650845],
    ['imp', 5072225, 2650845],
    ['inc', 7991876, 2650845], // original position (不一致性)
    ['ind', 3861998, 4217543],
    ['pub', 7542694, 4217543],
  ];
  const DOMS = process.env.BADGE_MODE === 'single' ? [ALL[2]] : ALL;

  // Build clean copies: strip the creationId extLst, give each a UNIQUE id AND a
  // unique name (duplicate names inside a group can upset PowerPoint).
  let idn = 9013;
  const newBadges = DOMS.map(([k, x, y]) =>
    badge
      .replace(/<a:extLst>[\s\S]*?<\/a:extLst>/, '')
      .replace(/(<p:cNvPr id=")\d+(" name=")[^"]*(")/, `$1${idn++}$2domBadge_${k}$3`)
      .replace(/<a:off x="\d+" y="\d+"\/>/, `<a:off x="${x}" y="${y}"/>`)
      .replace(/<a:t>-1<\/a:t>/, `<a:t>{{gi.sum.d.${k}}}</a:t>`)
  ).join('');

  // Remove the original badge from the GROUP and append the new badges at the
  // TOP LEVEL of the slide (just before </p:spTree>), using slide coordinates.
  // Top-level placement avoids the group's child-coordinate space entirely.
  xml = xml.replace(badge, '');
  xml = xml.replace('</p:spTree>', `${newBadges}</p:spTree>`);
  zip.file(name, xml, { createFolders: false });
  return DOMS.length;
}

const GRADE_SLIDES = [34, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
const useSlides = FLAGS.skipGrade
  ? Object.fromEntries(Object.entries(SLIDES).filter(([k]) => !GRADE_SLIDES.includes(+k)))
  : SLIDES;
const expected = Object.values(useSlides).reduce((n, ps) => n + ps.length, 0);
const zip = await JSZip.loadAsync(await readFile(SRC));
const r = await applyPerSlide(zip, useSlides);
const seq = FLAGS.skipSeq ? { total: 0, touched: [] } : await tokenizeSeqOnSlides(zip, SEQ);
const removed = await removeOnSlides(zip, REMOVE);
const aligned = await alignOnSlides(zip, ALIGN_LEFT, 'l');
const badges = (FLAGS.skipBadge || FLAGS.skipGrade) ? 0 : await badgeSurgery(zip);
await mkdir('public', { recursive: true });
await writeFile(OUT, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
console.log(`tokenized ${r.total}/${expected} strings; seq ${seq.total}; removed ${removed} para; aligned ${aligned} para; badges ${badges} -> ${OUT}`);
console.log('slides:', r.touched.join('  '));
console.log('seq:', seq.touched.join('  '));
if (r.missing.length) console.warn('MISSING slides:', r.missing.join(', '));
if (r.total < expected) console.warn('WARNING: some originals not found — check exact text');
