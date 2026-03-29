// src/data/practice/gradePubBiasPractice.js
// GRADE Publication Bias domain — 9 practice questions (3 MC + 3 fill + 3 error)
// Questions about funnel plot symmetry, Egger's test, study count, industry funding.

const gradePubBiasPractice = [

  // ═══ MC ═══

  // MC-1: Case 1 — Atropine, funnel asymmetric + Egger's significant
  {
    id: "grade-pub-mc-1", format: "mc", source: "case1",
    scenario: {
      zh: "Atropine 近視 SR（0.01% 次群組）：12 篇 RCT。漏斗圖明顯不對稱（左下角缺少效應小的小型研究）。Egger's test p = 0.02。部分研究由眼藥水廠商贊助。",
      en: "Atropine myopia SR (0.01% subgroup): 12 RCTs. Funnel plot clearly asymmetric (missing small studies with small effects in lower left). Egger's p = 0.02. Some studies industry-sponsored.",
    },
    prompt: { zh: "GRADE 發表偏誤域，你會怎麼判斷？", en: "For GRADE Publication Bias, what's your judgment?" },
    correctIndex: 2,
    options: [
      { label: { zh: "不降級 — 12 篇研究數量足夠", en: "No downgrade — 12 studies is sufficient" }, explanation: { zh: "✗ 研究數量足夠進行漏斗圖評估（≥ 10），但漏斗圖不對稱且 Egger's 顯著。研究夠多反而讓我們能偵測到偏誤。", en: "✗ Study count is sufficient for funnel assessment (≥ 10), but funnel is asymmetric and Egger's significant. Having enough studies means we can detect bias." } },
      { label: { zh: "不降級 — Egger's p = 0.02 接近不顯著", en: "No downgrade — Egger's p = 0.02 is borderline" }, explanation: { zh: "✗ p = 0.02 < 0.05，是統計顯著的。加上漏斗圖視覺上不對稱，證據充分。", en: "✗ p = 0.02 < 0.05 is statistically significant. Combined with visual funnel asymmetry, evidence is sufficient." } },
      { label: { zh: "降 1 級 — 漏斗圖不對稱 + Egger's 顯著", en: "Downgrade 1 — funnel asymmetry + Egger's significant" }, explanation: { zh: "✓ 正確！漏斗圖不對稱 + Egger's p = 0.02 達顯著 + 部分廠商贊助。三項證據一致指向發表偏誤。降 1 級。", en: "✓ Correct! Funnel asymmetry + Egger's p = 0.02 significant + some industry funding. Three lines of evidence point to publication bias. Downgrade 1." } },
      { label: { zh: "降 2 級 — 嚴重發表偏誤", en: "Downgrade 2 — severe publication bias" }, explanation: { zh: "✗ 發表偏誤通常最多降 1 級。降 2 級極罕見，除非幾乎確定大量研究被隱匿。", en: "✗ Publication bias typically warrants at most 1 downgrade. Downgrade 2 is extremely rare unless near-certain that many studies are suppressed." } },
    ],
  },

  // MC-2: New — < 10 studies, can't assess
  {
    id: "grade-pub-mc-2", format: "mc", source: "new",
    scenario: {
      zh: "一篇新型降壓藥 SR：僅納入 6 篇 RCT。漏斗圖看起來對稱，但研究者在討論中指出：「因研究數量不足，無法可靠評估漏斗圖對稱性。」Egger's test 未執行。所有研究均由藥廠贊助。",
      en: "A novel antihypertensive SR: Only 6 RCTs. Funnel plot appears symmetric, but authors note: 'Insufficient studies to reliably assess funnel symmetry.' Egger's not performed. All studies industry-sponsored.",
    },
    prompt: { zh: "GRADE 發表偏誤域，你會怎麼判斷？", en: "For GRADE Publication Bias, what's your judgment?" },
    correctIndex: 1,
    options: [
      { label: { zh: "不降級 — 漏斗圖看起來對稱", en: "No downgrade — funnel looks symmetric" }, explanation: { zh: "✗ < 10 篇研究時，漏斗圖評估不可靠。「看起來對稱」不代表沒有偏誤——統計檢定力不足。", en: "✗ With < 10 studies, funnel assessment is unreliable. 'Looks symmetric' doesn't mean no bias — insufficient power." } },
      { label: { zh: "無法評估，但標註疑慮 — 全部廠商贊助", en: "Can't assess, but note concern — all industry-funded" }, explanation: { zh: "✓ 正確！< 10 篇研究無法可靠使用漏斗圖或 Egger's test 評估發表偏誤。但全部廠商贊助是危險信號，應在 SoF 表標註疑慮。不正式降級但保持警覺。", en: "✓ Correct! < 10 studies means funnel plot and Egger's are unreliable. But all-industry funding is a red flag — note concern in SoF table. Don't formally downgrade but stay alert." } },
      { label: { zh: "降 1 級 — 全部廠商贊助一定有偏誤", en: "Downgrade 1 — all industry-funded must have bias" }, explanation: { zh: "✗ 廠商贊助是危險信號但不等於一定有發表偏誤。沒有客觀證據（漏斗圖不可靠）時，不宜正式降級。", en: "✗ Industry funding is a red flag but doesn't prove publication bias. Without objective evidence (funnel unreliable), don't formally downgrade." } },
      { label: { zh: "降 1 級 — 未執行 Egger's test 是缺失", en: "Downgrade 1 — not doing Egger's is a flaw" }, explanation: { zh: "✗ < 10 篇研究時 Egger's test 本來就不建議執行（檢定力不足）。這不是缺失而是正確做法。", en: "✗ Egger's test is not recommended with < 10 studies (insufficient power). Not performing it is correct, not a flaw." } },
    ],
  },

  // MC-3: Case 3 — IV iron, funnel asymmetric in large MA
  {
    id: "grade-pub-mc-3", format: "mc", source: "case3",
    scenario: {
      zh: "IV iron for HF SR：14 篇 RCT。漏斗圖明顯不對稱，小型研究偏向正面結果（小型研究效應）。Egger's p = 0.03。大型 RCT（如 FAIR-HF2）結果效果較小。5 篇由鐵劑廠商贊助。",
      en: "IV iron for HF SR: 14 RCTs. Funnel clearly asymmetric — small studies favor positive results (small-study effects). Egger's p = 0.03. Large RCTs (e.g., FAIR-HF2) show smaller effects. 5 industry-funded.",
    },
    prompt: { zh: "GRADE 發表偏誤域，你會怎麼判斷？", en: "For GRADE Publication Bias, what's your judgment?" },
    correctIndex: 0,
    options: [
      { label: { zh: "降 1 級 — 漏斗圖不對稱 + 小型研究效應 + Egger's 顯著", en: "Downgrade 1 — funnel asymmetry + small-study effects + Egger's significant" }, explanation: { zh: "✓ 正確！三項證據：(1) 漏斗圖明顯不對稱，(2) 小型研究偏向正面結果（大型 RCT 效果較小），(3) Egger's p = 0.03 顯著。加上部分廠商贊助。降 1 級。", en: "✓ Correct! Three lines of evidence: (1) clear funnel asymmetry, (2) small-study effects (large RCTs show smaller effects), (3) Egger's p = 0.03 significant. Plus some industry funding. Downgrade 1." } },
      { label: { zh: "不降級 — 大型 RCT 可彌補小型研究偏誤", en: "No downgrade — large RCTs compensate for small-study bias" }, explanation: { zh: "✗ 大型 RCT 顯示效果較小，反而確認了小型研究效應的存在。這是支持發表偏誤的證據。", en: "✗ Large RCTs showing smaller effects actually confirms small-study effects — this supports publication bias." } },
      { label: { zh: "降 2 級 — 多項嚴重證據", en: "Downgrade 2 — multiple serious evidence" }, explanation: { zh: "✗ 發表偏誤通常最多降 1 級。", en: "✗ Publication bias typically warrants at most 1 downgrade." } },
      { label: { zh: "不降級 — 14 篇中只有 5 篇廠商贊助", en: "No downgrade — only 5/14 industry-funded" }, explanation: { zh: "✗ 廠商贊助只是輔助證據。主要依據是漏斗圖 + Egger's，兩者都指向偏誤。", en: "✗ Industry funding is supplementary. Main evidence is funnel + Egger's — both point to bias." } },
    ],
  },

  // ═══ FILL ═══

  // FILL-1: Case 1 — Atropine 0.05%, pubBias + imprecision
  {
    id: "grade-pub-fill-1", format: "fill", source: "case1",
    scenario: {
      zh: "Atropine 近視 SR（0.05% 次群組）：12 篇 RCT。WMD = 0.54 [0.43, 0.65]，MID = 0.25。漏斗圖不對稱，Egger's p = 0.02。9 篇低風險。I² = 22%，方向一致。PICO 匹配。",
      en: "Atropine SR (0.05% subgroup): 12 RCTs. WMD = 0.54 [0.43, 0.65], MID = 0.25. Funnel asymmetric, Egger's p = 0.02. 9 low risk. I² = 22%, consistent. PICO matches.",
    },
    prompt: { zh: "以下 GRADE 評估有兩個空格，請選出正確判斷。", en: "This GRADE assessment has two blanks. Select the correct judgments." },
    prefilled: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    blanks: [
      {
        element: "imprecision",
        label: { zh: "不精確性", en: "Imprecision" },
        correctIndex: 0,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "✓ 正確！點估計 0.54 > MID 0.25，CI 下限 0.43 > MID，不跨越 MID 或 null。精確度充足。", en: "✓ Correct! Point estimate 0.54 > MID 0.25, CI lower 0.43 > MID — doesn't cross MID or null. Adequate precision." },
          { zh: "CI 完全在 MID 以上，不需降級", en: "CI entirely above MID — no downgrade" },
          { zh: "不合理", en: "Unjustified" },
        ],
      },
      {
        element: "pubBias",
        label: { zh: "發表偏誤", en: "Publication bias" },
        correctIndex: 1,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "漏斗圖不對稱 + Egger's 顯著，不能忽視", en: "Funnel asymmetry + significant Egger's — can't ignore" },
          { zh: "✓ 正確！漏斗圖不對稱 + Egger's p = 0.02 達顯著。發表偏誤證據充分。降 1 級。", en: "✓ Correct! Funnel asymmetric + Egger's p = 0.02 significant. Publication bias evidence sufficient. Downgrade 1." },
          { zh: "發表偏誤通常最多降 1 級", en: "Publication bias usually at most 1 downgrade" },
        ],
      },
    ],
  },

  // FILL-2: New — Symmetric funnel, large MA
  {
    id: "grade-pub-fill-2", format: "fill", source: "new",
    scenario: {
      zh: "Statin 預防心血管事件 SR：25 篇 RCT。漏斗圖對稱。Egger's p = 0.45。混合廠商/學術贊助。10 篇低風險，12 篇部分疑慮，3 篇高風險。\n\n同時：I² = 40%，但效應方向全部一致（全部顯示 statin 有效）。",
      en: "Statin CVD prevention SR: 25 RCTs. Funnel symmetric. Egger's p = 0.45. Mixed industry/academic funding. 10 low risk, 12 some concerns, 3 high risk.\n\nAlso: I² = 40%, but all consistent direction (all favor statin).",
    },
    prompt: { zh: "以下 GRADE 評估有兩個空格，請選出正確判斷。", en: "This GRADE assessment has two blanks. Select the correct judgments." },
    prefilled: {
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    blanks: [
      {
        element: "pubBias",
        label: { zh: "發表偏誤", en: "Publication bias" },
        correctIndex: 0,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "✓ 正確！漏斗圖對稱 + Egger's p = 0.45 不顯著 + 25 篇研究數量充足。無發表偏誤證據。", en: "✓ Correct! Symmetric funnel + Egger's p = 0.45 nonsignificant + 25 studies adequate. No evidence of publication bias." },
          { zh: "漏斗圖對稱 + Egger's 不顯著 = 無偏誤證據", en: "Symmetric funnel + Egger's nonsignificant = no bias evidence" },
          { zh: "不合理", en: "Unjustified" },
        ],
      },
      {
        element: "inconsistency",
        label: { zh: "不一致性", en: "Inconsistency" },
        correctIndex: 0,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "✓ 正確！I² = 40% 中度，但所有研究效應方向一致。方向一致時，I² 中度通常不需降級。", en: "✓ Correct! I² = 40% moderate, but all studies show consistent direction. With consistent direction, moderate I² usually doesn't need downgrade." },
          { zh: "效應方向全部一致，I² = 40% 不算嚴重", en: "All consistent direction; I² = 40% not serious" },
          { zh: "不合理", en: "Unjustified" },
        ],
      },
    ],
  },

  // FILL-3: Case 3 — IV iron, pubBias + rob
  {
    id: "grade-pub-fill-3", format: "fill", source: "case3",
    scenario: {
      zh: "IV iron for HF SR：14 篇 RCT，10 篇開放標籤但結果客觀（住院、死亡）。4 篇雙盲結果一致。漏斗圖明顯不對稱，Egger's p = 0.03。\n\n同時：I² = 20%，方向一致。CI 排除 null。",
      en: "IV iron for HF SR: 14 RCTs, 10 open-label but objective outcomes (hospitalization, mortality). 4 double-blind consistent. Funnel clearly asymmetric, Egger's p = 0.03.\n\nAlso: I² = 20%, consistent. CI excludes null.",
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
        correctIndex: 0,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "✓ 正確！結果為客觀指標（住院、死亡），開放標籤影響小。4 篇雙盲結果一致。", en: "✓ Correct! Objective outcomes — open-label minimal impact. 4 double-blind consistent." },
          { zh: "客觀結果不易受盲化影響", en: "Objective outcomes minimally affected by blinding" },
          { zh: "不合理", en: "Unjustified" },
        ],
      },
      {
        element: "pubBias",
        label: { zh: "發表偏誤", en: "Publication bias" },
        correctIndex: 1,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "漏斗圖明顯不對稱 + Egger's 顯著，不能忽視", en: "Clearly asymmetric funnel + significant Egger's — can't ignore" },
          { zh: "✓ 正確！漏斗圖明顯不對稱 + Egger's p = 0.03 顯著。降 1 級。", en: "✓ Correct! Funnel clearly asymmetric + Egger's p = 0.03 significant. Downgrade 1." },
          { zh: "發表偏誤通常最多降 1 級", en: "Publication bias usually at most 1 downgrade" },
        ],
      },
    ],
  },

  // ═══ ERROR ═══

  // ERR-1: New — Teammate downgraded despite symmetric funnel
  {
    id: "grade-pub-err-1", format: "error", source: "new",
    scenario: {
      zh: "PPI 治療 GERD SR：18 篇 RCT。漏斗圖對稱，Egger's p = 0.62。混合贊助。5 篇高偏誤風險（未盲化 + 主觀症狀結果）。I² = 15%。CI 排除 null。PICO 匹配。",
      en: "PPI for GERD SR: 18 RCTs. Funnel symmetric, Egger's p = 0.62. Mixed funding. 5 high risk (no blinding + subjective symptom outcomes). I² = 15%. CI excludes null. PICO matches.",
    },
    prompt: { zh: "隊友的 GRADE 評估有 2 個錯誤，請點選。", en: "Teammate's GRADE has 2 errors. Click them." },
    shownGrade: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "降 1 級", en: "Downgrade 1" } },
    },
    errorElements: ["rob", "pubBias"],
    errorExplanations: {
      rob: { zh: "5/18 高偏誤風險（未盲化 + 主觀結果），佔相當比例。應「降 1 級」。", en: "5/18 high risk (no blinding + subjective outcomes) — significant proportion. Should be 'Downgrade 1.'" },
      pubBias: { zh: "漏斗圖對稱 + Egger's p = 0.62 不顯著。無發表偏誤證據。應為「未降級」。", en: "Symmetric funnel + Egger's p = 0.62 nonsignificant. No publication bias evidence. Should be 'No downgrade.'" },
    },
  },

  // ERR-2: Case 1 — Teammate missed pub bias, wrong on inconsistency
  {
    id: "grade-pub-err-2", format: "error", source: "case1",
    scenario: {
      zh: "隊友對 atropine 0.01% SR GRADE 評估：12 篇 RCT，9 篇低風險。I² = 35%，方向一致。WMD 0.23 [0.13, 0.34]，MID = 0.25。漏斗圖不對稱，Egger's p = 0.02。PICO 匹配。",
      en: "Teammate's GRADE for 0.01% atropine SR: 12 RCTs, 9 low risk. I² = 35%, consistent direction. WMD 0.23 [0.13, 0.34], MID = 0.25. Funnel asymmetric, Egger's p = 0.02. PICO matches.",
    },
    prompt: { zh: "隊友的 GRADE 評估有 2 個錯誤，請點選。", en: "Teammate's GRADE has 2 errors. Click them." },
    shownGrade: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "降 1 級", en: "Downgrade 1" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "降 1 級", en: "Downgrade 1" } },
      pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    errorElements: ["inconsistency", "pubBias"],
    errorExplanations: {
      inconsistency: { zh: "I² = 35% 中低度，且效應方向全部一致。不需降級。應為「未降級」。", en: "I² = 35% low-moderate, all consistent direction. Should be 'No downgrade.'" },
      pubBias: { zh: "漏斗圖不對稱 + Egger's p = 0.02 顯著。應「降 1 級」。", en: "Funnel asymmetric + Egger's p = 0.02 significant. Should be 'Downgrade 1.'" },
    },
  },

  // ERR-3: New — Teammate confused < 10 studies situation
  {
    id: "grade-pub-err-3", format: "error", source: "new",
    scenario: {
      zh: "Dapagliflozin CKD SR：7 篇 RCT，3 篇由 AstraZeneca 贊助。漏斗圖「看起來對稱」（但只有 7 點，分佈稀疏）。未執行 Egger's test。5/7 低風險。I² = 50%，效應方向不一致（4 篇正向，3 篇負向）。CI [-0.5, 2.1] 跨越 null。",
      en: "Dapagliflozin CKD SR: 7 RCTs, 3 AstraZeneca-funded. Funnel 'looks symmetric' (but only 7 points, sparse). Egger's not done. 5/7 low risk. I² = 50%, direction inconsistent (4 positive, 3 negative). CI [-0.5, 2.1] crosses null.",
    },
    prompt: { zh: "隊友的 GRADE 評估有 2 個錯誤，請點選。", en: "Teammate's GRADE has 2 errors. Click them." },
    shownGrade: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    errorElements: ["inconsistency", "imprecision"],
    errorExplanations: {
      inconsistency: { zh: "I² = 50% 且效應方向不一致（4 正 3 負），點估計散佈在 null 兩側。應「降 1 級」。", en: "I² = 50% with inconsistent direction (4 positive, 3 negative), estimates on both sides of null. Should be 'Downgrade 1.'" },
      imprecision: { zh: "CI [-0.5, 2.1] 跨越 null，無法確定治療方向。應「降 1 級」。", en: "CI [-0.5, 2.1] crosses null — can't determine treatment direction. Should be 'Downgrade 1.'" },
    },
  },
];

export default gradePubBiasPractice;
