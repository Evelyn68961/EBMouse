// src/data/practice/gradeRobPractice.js
// GRADE Risk of Bias domain — 9 practice questions (3 MC + 3 fill + 3 error)
// Questions present RoB assessment summaries and ask: downgrade? by how much?

const gradeRobPractice = [

  // ═══ MC ═══

  // MC-1: Atropine SR (Case 1) — most RCTs low risk
  {
    id: "grade-rob-mc-1", format: "mc", source: "case1",
    scenario: {
      zh: "Atropine 近視 SR 的偏誤風險評估：納入 12 篇 RCT，其中 9 篇為低偏誤風險，2 篇有「部分疑慮」（分配隱匿不清楚），1 篇為高風險（無盲化且失訪率 25%）。高風險那篇的權重佔整體 meta-analysis 的 8%。",
      en: "Atropine myopia SR risk of bias: 12 RCTs included — 9 low risk, 2 with 'some concerns' (unclear allocation concealment), 1 high risk (no blinding, 25% loss to follow-up). The high-risk study contributes 8% weight in the meta-analysis.",
    },
    prompt: { zh: "GRADE 誤差風險 (Risk of Bias) 域，你會怎麼判斷？", en: "For the GRADE Risk of Bias domain, what's your judgment?" },
    correctIndex: 1,
    options: [
      { label: { zh: "不降級 — 大部分研究低風險", en: "No downgrade — most studies low risk" }, explanation: { zh: "✗ 雖然大多數低風險，但有 2 篇部分疑慮和 1 篇高風險，整體不能忽視。", en: "✗ Most are low risk, but 2 with some concerns + 1 high risk can't be ignored entirely." } },
      { label: { zh: "不降級，但標註疑慮 — 高風險研究權重低", en: "No downgrade, but note concerns — high-risk study has low weight" }, explanation: { zh: "✓ 正確！9/12 低風險，高風險研究權重僅 8%，不會實質改變結果。不降級但應在 SoF 表備註。", en: "✓ Correct! 9/12 low risk, high-risk study only 8% weight — won't materially change results. No downgrade but note in SoF table." } },
      { label: { zh: "降 1 級 — 有高風險研究", en: "Downgrade 1 — high-risk study exists" }, explanation: { zh: "✗ 不是有高風險研究就一定降級。要看它的權重和對結果的影響。8% 權重影響有限。", en: "✗ Having a high-risk study doesn't automatically mean downgrade. Consider its weight and impact. 8% weight has limited influence." } },
      { label: { zh: "降 2 級 — 偏誤風險很嚴重", en: "Downgrade 2 — very serious risk of bias" }, explanation: { zh: "✗ 降 2 級是針對大部分研究都有嚴重偏誤的情況。這裡 75% 的研究是低風險。", en: "✗ Downgrade 2 is for when most studies have serious bias. Here 75% are low risk." } },
    ],
  },

  // MC-2: IV Iron SR (Case 3) — open-label RCTs
  {
    id: "grade-rob-mc-2", format: "mc", source: "case3",
    scenario: {
      zh: "IV iron for HF 的 SR：納入 14 篇 RCT，其中 10 篇為開放標籤設計（open-label），因為 IV iron 的給藥方式難以盲化。結果指標是客觀的（心衰竭住院率、死亡率）。4 篇雙盲 RCT 的結果方向與開放標籤 RCT 一致。",
      en: "IV iron for HF SR: 14 RCTs, 10 are open-label (difficult to blind IV iron administration). Outcomes are objective (HF hospitalization, mortality). 4 double-blind RCTs show consistent results with open-label ones.",
    },
    prompt: { zh: "GRADE 誤差風險域，你會怎麼判斷？", en: "For GRADE Risk of Bias, what's your judgment?" },
    correctIndex: 0,
    options: [
      { label: { zh: "不降級 — 客觀結果不受盲化影響", en: "No downgrade — objective outcomes unaffected by blinding" }, explanation: { zh: "✓ 正確！住院和死亡是客觀結果，不太受開放標籤影響。且雙盲 RCT 結果一致，進一步支持。", en: "✓ Correct! Hospitalization and mortality are objective — not susceptible to open-label bias. Double-blind RCTs showing consistent results further supports this." } },
      { label: { zh: "降 1 級 — 多數研究未盲化", en: "Downgrade 1 — most studies not blinded" }, explanation: { zh: "✗ 盲化的重要性取決於結果指標。客觀結果（死亡、住院）受盲化影響很小。", en: "✗ Blinding importance depends on the outcome. Objective outcomes (mortality, hospitalization) are minimally affected by blinding." } },
      { label: { zh: "降 1 級 — 開放標籤可能影響就醫行為", en: "Downgrade 1 — open-label may affect care-seeking" }, explanation: { zh: "✗ 這是合理顧慮，但 4 篇雙盲 RCT 結果一致，顯示開放標籤並未實質影響。", en: "✗ Reasonable concern, but 4 double-blind RCTs show consistent results — open-label didn't materially affect outcomes." } },
      { label: { zh: "降 2 級 — 71% 研究有高偏誤風險", en: "Downgrade 2 — 71% studies high bias" }, explanation: { zh: "✗ 開放標籤不等於高偏誤風險。要視結果指標而定。", en: "✗ Open-label ≠ high bias risk. Depends on the outcome measured." } },
    ],
  },

  // MC-3: Antidepressant SR (New) — industry-funded, selective reporting
  {
    id: "grade-rob-mc-3", format: "mc", source: "new",
    scenario: {
      zh: "一篇 SSRI 治療憂鬱症的 SR：納入 8 篇 RCT，6 篇由藥廠贊助。3 篇 RCT 有選擇性結果報告（只報導有利結果，未報導預先設定但結果不佳的次要結果）。結果指標是主觀的（憂鬱量表分數）。整體 RoB 評估顯示 5/8 有「部分疑慮」或「高風險」。",
      en: "An SSRI for depression SR: 8 RCTs, 6 industry-funded. 3 RCTs had selective outcome reporting (only favorable outcomes reported; pre-specified unfavorable secondary outcomes omitted). Outcome is subjective (depression scale scores). Overall RoB: 5/8 with 'some concerns' or 'high risk.'",
    },
    prompt: { zh: "GRADE 誤差風險域，你會怎麼判斷？", en: "For GRADE Risk of Bias, what's your judgment?" },
    correctIndex: 2,
    options: [
      { label: { zh: "不降級 — 多數 RCT 設計完整", en: "No downgrade — most RCTs well-designed" }, explanation: { zh: "✗ 5/8 有疑慮或高風險，加上選擇性報告和主觀結果——不能忽視。", en: "✗ 5/8 with concerns or high risk, plus selective reporting with subjective outcomes — can't ignore." } },
      { label: { zh: "降 2 級 — 非常嚴重", en: "Downgrade 2 — very serious" }, explanation: { zh: "✗ 雖然問題不少，但不是所有研究都有嚴重偏誤。降 2 級過於嚴厲。", en: "✗ Issues exist but not all studies have serious bias. Downgrade 2 is too harsh." } },
      { label: { zh: "降 1 級 — 選擇性報告 + 主觀結果 + 多數有疑慮", en: "Downgrade 1 — selective reporting + subjective outcome + majority with concerns" }, explanation: { zh: "✓ 正確！選擇性報告 + 主觀結果特別容易受偏誤影響 + 5/8 有疑慮。降 1 級合理。", en: "✓ Correct! Selective reporting + subjective outcomes are especially susceptible to bias + 5/8 with concerns. Downgrade 1 is appropriate." } },
      { label: { zh: "不確定 — 需要更多資訊", en: "Uncertain — need more info" }, explanation: { zh: "✗ GRADE 評估不用「不確定」——要根據現有資訊做判斷。", en: "✗ GRADE doesn't use 'uncertain' — you judge based on available information." } },
    ],
  },

  // ═══ FILL ═══
  // Show a partial GRADE table, blank out RoB domain rating

  // FILL-1: Case 1 Atropine — RoB and one other blank
  {
    id: "grade-rob-fill-1", format: "fill", source: "case1",
    scenario: {
      zh: "Atropine 近視 SR：12 篇 RCT，9 篇低風險，3 篇有部分疑慮。無高風險研究。結果指標為客觀測量（SE 屈光度、AL 眼軸長）。\n\n同時：I² = 35%，各研究效應方向一致（全部顯示 atropine 有效）。",
      en: "Atropine myopia SR: 12 RCTs, 9 low risk, 3 some concerns. No high-risk studies. Outcomes are objective measures (SE, AL).\n\nAlso: I² = 35%, all studies show consistent effect direction (atropine effective).",
    },
    prompt: { zh: "以下 GRADE 評估有兩個空格，請選出正確判斷。", en: "This GRADE assessment has two blanks. Select the correct judgments." },
    prefilled: {
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Publication bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    blanks: [
      {
        element: "rob",
        label: { zh: "誤差風險", en: "Risk of Bias" },
        correctIndex: 0,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "✓ 正確！9/12 低風險，無高風險研究，且結果為客觀測量。", en: "✓ Correct! 9/12 low risk, no high-risk studies, objective outcomes." },
          { zh: "沒有高風險研究，3 篇部分疑慮不足以降級", en: "No high-risk studies; 3 with some concerns isn't enough to downgrade" },
          { zh: "整體偏誤風險相當低，降 2 級不合理", en: "Overall bias risk is quite low — downgrade 2 is unreasonable" },
        ],
      },
      {
        element: "inconsistency",
        label: { zh: "不一致性", en: "Inconsistency" },
        correctIndex: 0,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "✓ 正確！I² = 35% 為中低度，且所有研究效應方向一致。", en: "✓ Correct! I² = 35% is low-moderate, all studies show consistent direction." },
          { zh: "I² = 35% 不算高，不需要降級", en: "I² = 35% isn't high — no downgrade needed" },
          { zh: "效應方向一致，不可能降 2 級", en: "Consistent effect direction — impossible to justify downgrade 2" },
        ],
      },
    ],
  },

  // FILL-2: New scenario — poorly conducted SR
  {
    id: "grade-rob-fill-2", format: "fill", source: "new",
    scenario: {
      zh: "一篇 GLP-1 RA 治療肥胖的 SR：8 篇 RCT，全部由藥廠贊助。4 篇有高偏誤風險（缺乏盲化 + 主觀結果「體重自我報告」）。其餘 4 篇低風險（雙盲、客觀測量體重）。高風險研究佔 meta-analysis 權重 55%。\n\n同時：CI 為 -4.2 kg [-5.8, -2.6]，排除 null threshold（0 kg）。",
      en: "GLP-1 RA for obesity SR: 8 RCTs, all industry-funded. 4 high risk (no blinding + subjective 'self-reported weight'). Other 4 low risk (double-blind, objective weight). High-risk studies contribute 55% of MA weight.\n\nAlso: CI is -4.2 kg [-5.8, -2.6], excludes null threshold (0 kg).",
    },
    prompt: { zh: "以下 GRADE 評估有兩個空格，請選出正確判斷。", en: "This GRADE assessment has two blanks. Select the correct judgments." },
    prefilled: {
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    blanks: [
      {
        element: "rob",
        label: { zh: "誤差風險", en: "Risk of Bias" },
        correctIndex: 1,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "4/8 高風險且佔 55% 權重，不能不降級", en: "4/8 high risk contributing 55% weight — can't ignore" },
          { zh: "✓ 正確！半數研究高風險且佔主要權重(55%)，主觀結果更易受偏誤影響。降 1 級。", en: "✓ Correct! Half the studies are high risk with 55% weight, subjective outcome susceptible to bias. Downgrade 1." },
          { zh: "另一半研究品質良好，不至於降 2 級", en: "Other half are good quality — not severe enough for downgrade 2" },
        ],
      },
      {
        element: "imprecision",
        label: { zh: "不精確性", en: "Imprecision" },
        correctIndex: 0,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "✓ 正確！CI [-5.8, -2.6] 完全排除 null threshold(0)，精確性足夠。", en: "✓ Correct! CI [-5.8, -2.6] clearly excludes null (0), precision is adequate." },
          { zh: "CI 不跨越 null，不需降級", en: "CI doesn't cross null — no downgrade needed" },
          { zh: "CI 範圍合理，降 2 級不合理", en: "CI range is reasonable — downgrade 2 unjustified" },
        ],
      },
    ],
  },

  // FILL-3: Case 2 CPM — RoB and inconsistency
  {
    id: "grade-rob-fill-3", format: "fill", source: "case2",
    scenario: {
      zh: "CPM for TKA SR：6 篇 RCT，全部為低偏誤風險（雙盲、分配隱匿良好）。結果為客觀測量（膝關節角度）。\n\n但：各研究 ROM 改善幅度差異很大（-2° 到 +12°），I² = 72%，漏斗圖對稱。",
      en: "CPM for TKA SR: 6 RCTs, all low risk of bias (double-blind, good allocation concealment). Outcome is objective (knee angle).\n\nBut: ROM improvement varies widely (-2° to +12°), I² = 72%, funnel plot symmetric.",
    },
    prompt: { zh: "以下 GRADE 評估有兩個空格，請選出正確判斷。", en: "This GRADE assessment has two blanks. Select the correct judgments." },
    prefilled: {
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Publication bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    blanks: [
      {
        element: "rob",
        label: { zh: "誤差風險", en: "Risk of Bias" },
        correctIndex: 0,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級", en: "Downgrade 1" }, { zh: "降 2 級", en: "Downgrade 2" } ],
        explanations: [
          { zh: "✓ 正確！全部低偏誤風險、客觀測量。", en: "✓ Correct! All low risk, objective measurement." },
          { zh: "全部低風險，不需降級", en: "All low risk — no downgrade" },
          { zh: "不合理", en: "Unjustified" },
        ],
      },
      {
        element: "inconsistency",
        label: { zh: "不一致性", en: "Inconsistency" },
        correctIndex: 1,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "I² = 72% 且效果方向不一致（-2° 到 +12°），不能不降級", en: "I² = 72% with inconsistent direction (-2° to +12°) — can't ignore" },
          { zh: "✓ 正確！I² = 72% 高度異質性，效果幅度差異大（有研究顯示 CPM 無效或微弱有害）。降 1 級。", en: "✓ Correct! I² = 72% high heterogeneity, effect sizes vary widely (some show CPM ineffective). Downgrade 1." },
          { zh: "效應方向不完全相反，不至於降 2 級", en: "Effect directions not completely opposite — not severe enough for 2" },
        ],
      },
    ],
  },

  // ═══ ERROR-SPOTTING ═══

  // ERR-1: Atropine (Case 1) — RoB and inconsistency rated wrong
  {
    id: "grade-rob-err-1", format: "error", source: "case1",
    scenario: {
      zh: "隊友對 atropine 近視 SR 的 GRADE 評估：12 篇 RCT，9 篇低風險、3 篇部分疑慮、無高風險。I² = 35%，效應方向全部一致。CI 窄且排除 null。研究 PICO 與案例一致。漏斗圖對稱。",
      en: "Teammate's GRADE for atropine myopia SR: 12 RCTs — 9 low, 3 some concerns, 0 high risk. I² = 35%, consistent direction. CI narrow, excludes null. Study PICO matches case. Funnel plot symmetric.",
    },
    prompt: { zh: "隊友的 GRADE 評估有 2 個錯誤，請點選。", en: "Teammate's GRADE has 2 errors. Click them." },
    shownGrade: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "降 1 級", en: "Downgrade 1" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "降 1 級", en: "Downgrade 1" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    errorElements: ["rob", "inconsistency"],
    errorExplanations: {
      rob: { zh: "9/12 低風險、無高風險、客觀結果。應為「未降級」。", en: "9/12 low risk, no high risk, objective outcomes. Should be 'No downgrade.'" },
      inconsistency: { zh: "I² = 35% 中低度且方向一致。應為「未降級」。", en: "I² = 35% low-moderate, consistent direction. Should be 'No downgrade.'" },
    },
  },

  // ERR-2: IV Iron (Case 3) — RoB and pub bias rated wrong
  {
    id: "grade-rob-err-2", format: "error", source: "case3",
    scenario: {
      zh: "隊友對 IV iron HF SR 的 GRADE 評估：14 篇 RCT，10 篇開放標籤但結果為客觀指標（住院、死亡）。I² = 20%。CI 排除 null。研究 PICO 完全匹配。漏斗圖明顯不對稱（小型研究效應）。",
      en: "Teammate's GRADE for IV iron HF SR: 14 RCTs, 10 open-label but objective outcomes (hospitalization, mortality). I² = 20%. CI excludes null. PICO matches. Funnel plot clearly asymmetric (small-study effects).",
    },
    prompt: { zh: "隊友的 GRADE 評估有 2 個錯誤，請點選。", en: "Teammate's GRADE has 2 errors. Click them." },
    shownGrade: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "降 1 級", en: "Downgrade 1" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    errorElements: ["rob", "pubBias"],
    errorExplanations: {
      rob: { zh: "結果為客觀指標（住院、死亡），開放標籤影響小。應為「未降級」。", en: "Objective outcomes (hospitalization, mortality) — open-label has minimal impact. Should be 'No downgrade.'" },
      pubBias: { zh: "漏斗圖明顯不對稱，有小型研究效應——應「降 1 級」。", en: "Funnel plot clearly asymmetric with small-study effects — should be 'Downgrade 1.'" },
    },
  },

  // ERR-3: New scenario — SSRI for anxiety
  {
    id: "grade-rob-err-3", format: "error", source: "new",
    scenario: {
      zh: "SSRI 治療焦慮症 SR：10 篇 RCT，7 篇高偏誤風險（未盲化 + 主觀結果「焦慮量表」+ 選擇性報告）。I² = 55%。CI [-3.2, -0.8] 排除 null。PICO 匹配。漏斗圖對稱。",
      en: "SSRI for anxiety SR: 10 RCTs, 7 high risk (no blinding + subjective 'anxiety scale' + selective reporting). I² = 55%. CI [-3.2, -0.8] excludes null. PICO matches. Funnel symmetric.",
    },
    prompt: { zh: "隊友的 GRADE 評估有 2 個錯誤，請點選。", en: "Teammate's GRADE has 2 errors. Click them." },
    shownGrade: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "降 1 級", en: "Downgrade 1" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    errorElements: ["rob", "inconsistency"],
    errorExplanations: {
      rob: { zh: "7/10 高風險（未盲化+主觀結果+選擇性報告）——應「降 1 級」甚至考慮降 2 級。", en: "7/10 high risk (no blinding + subjective + selective reporting) — should be 'Downgrade 1' or even consider 2." },
      inconsistency: { zh: "I² = 55% 是中度，但需看效應方向是否一致、CI 是否重疊。若方向大致一致，「未降級」或最多「降 1 級」都可能合理，但隊友已降 1 級——而 I² = 55% 在效應方向一致時通常不降。應改為「未降級」。", en: "I² = 55% is moderate. If effect directions are consistent, 'No downgrade' is more appropriate. Teammate's downgrade 1 is too aggressive for I² = 55% with consistent direction." },
    },
  },
];

export default gradeRobPractice;
