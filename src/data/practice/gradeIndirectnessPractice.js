// src/data/practice/gradeIndirectnessPractice.js
// GRADE Indirectness domain — 9 practice questions (3 MC + 3 fill + 3 error)
// Questions about PICO mismatch between study evidence and clinical case.

const gradeIndirectnessPractice = [

  // ═══ MC ═══

  // MC-1: Case 1 — Atropine concentration mismatch
  {
    id: "grade-indirect-mc-1", format: "mc", source: "case1",
    scenario: {
      zh: "你的臨床問題是 0.05% atropine 用於 6–12 歲近視兒童。統合分析納入的研究涵蓋 0.01%–0.05% 不同濃度，部分研究族群為 4–16 歲。結果指標為屈光度變化（SE），與臨床問題一致。比較組皆為安慰劑。",
      en: "Your clinical question concerns 0.05% atropine for myopic children aged 6–12. The meta-analysis includes studies with 0.01%–0.05% concentrations, some with ages 4–16. Outcome is SE change, matching your question. Comparator is placebo throughout.",
    },
    prompt: { zh: "GRADE 不直接性域，你會怎麼判斷？", en: "For the GRADE Indirectness domain, what's your judgment?" },
    correctIndex: 1,
    options: [
      { label: { zh: "不降級 — PICO 大致一致", en: "No downgrade — PICO broadly matches" }, explanation: { zh: "✗ 介入濃度差異（0.01% vs 0.05%）臨床效果差異很大（WMD 0.23 vs 0.54），不算「大致一致」。", en: "✗ Concentration difference (0.01% vs 0.05%) has very different clinical effects (WMD 0.23 vs 0.54) — not a 'broad match.'" } },
      { label: { zh: "降 1 級 — 介入措施有重要差異", en: "Downgrade 1 — important intervention difference" }, explanation: { zh: "✓ 正確！主要不直接性在介入濃度：0.01% 與 0.05% 效果差異顯著。族群年齡略寬但不嚴重，結果指標與比較組一致。整體降 1 級。", en: "✓ Correct! Main indirectness is intervention concentration: 0.01% vs 0.05% have significantly different effects. Age range slightly broader but not serious; outcome and comparator match. Downgrade 1." } },
      { label: { zh: "降 2 級 — 族群和介入都不匹配", en: "Downgrade 2 — population and intervention both mismatched" }, explanation: { zh: "✗ 族群差異（4–16 vs 6–12）不夠嚴重到構成額外降級。結果和比較組一致，整體只有一項重要差異。", en: "✗ Population difference (4–16 vs 6–12) isn't serious enough for additional downgrade. Outcome and comparator match — only one important difference." } },
      { label: { zh: "降 1 級 — 結果指標不直接", en: "Downgrade 1 — outcome indirectness" }, explanation: { zh: "✗ 結果指標（SE 變化）與臨床問題一致，不是問題所在。不直接性在於介入濃度。", en: "✗ The outcome (SE change) matches your question — that's not the issue. The indirectness is in the intervention concentration." } },
    ],
  },

  // MC-2: Case 3 — HFrEF vs HFpEF population mismatch
  {
    id: "grade-indirect-mc-2", format: "mc", source: "case3",
    scenario: {
      zh: "你的病人是 HFpEF（EF > 50%）合併缺鐵性貧血。統合分析主要納入 HFrEF（EF < 40%）研究，僅少數包含 HFpEF。介入（IV iron）、比較組（安慰劑/標準治療）和結果（住院率、生活品質）皆與你的問題一致。",
      en: "Your patient has HFpEF (EF > 50%) with iron deficiency anemia. The MA primarily includes HFrEF studies (EF < 40%), few include HFpEF. Intervention (IV iron), comparator (placebo/standard care), and outcomes (hospitalization, QoL) all match your question.",
    },
    prompt: { zh: "GRADE 不直接性域，你會怎麼判斷？", en: "For GRADE Indirectness, what's your judgment?" },
    correctIndex: 2,
    options: [
      { label: { zh: "不降級 — 都是心衰竭", en: "No downgrade — both are heart failure" }, explanation: { zh: "✗ HFrEF 與 HFpEF 病理機轉不同（收縮 vs 舒張功能障礙），治療反應可能不同。不能因同屬「心衰竭」就視為一致。", en: "✗ HFrEF and HFpEF have different pathophysiology (systolic vs diastolic dysfunction) and may respond differently. Being both 'heart failure' doesn't make them equivalent." } },
      { label: { zh: "降 2 級 — 族群完全不同", en: "Downgrade 2 — completely different population" }, explanation: { zh: "✗ 雖有差異，但兩者仍為心衰竭亞型，不是完全不相關的疾病。且 I/C/O 都一致，通常降 1 級。", en: "✗ Different subtypes but not unrelated diseases. I/C/O all match — typically downgrade 1, not 2." } },
      { label: { zh: "降 1 級 — 族群有重要差異", en: "Downgrade 1 — important population difference" }, explanation: { zh: "✓ 正確！HFrEF vs HFpEF 是族群面向的重要不直接性（不同病理機轉、不同治療反應）。但 I/C/O 皆匹配，故降 1 級而非 2 級。", en: "✓ Correct! HFrEF vs HFpEF is important population indirectness (different pathophysiology, different treatment response). But I/C/O all match — downgrade 1, not 2." } },
      { label: { zh: "不降級，但標註疑慮", en: "No downgrade, but note concerns" }, explanation: { zh: "✗ HFrEF/HFpEF 差異夠重要，不能只標註而不降級。病理機轉和治療反應的差異是實質的。", en: "✗ HFrEF/HFpEF difference is significant enough to warrant downgrade, not just a note." } },
    ],
  },

  // MC-3: New — Surrogate vs clinical outcome
  {
    id: "grade-indirect-mc-3", format: "mc", source: "new",
    scenario: {
      zh: "你想知道 SGLT2 抑制劑是否降低糖尿病腎病變進展至透析。找到的統合分析以 eGFR 下降速率（mL/min/1.73m²/year）為主要結果，未直接測量透析需求。族群（T2DM + CKD）和介入（SGLT2i vs 安慰劑）與你的問題一致。",
      en: "You want to know if SGLT2 inhibitors slow progression to dialysis in diabetic nephropathy. The MA uses eGFR decline rate as primary outcome, not dialysis directly. Population (T2DM + CKD) and intervention (SGLT2i vs placebo) match.",
    },
    prompt: { zh: "GRADE 不直接性域，你會怎麼判斷？", en: "For GRADE Indirectness, what's your judgment?" },
    correctIndex: 1,
    options: [
      { label: { zh: "不降級 — eGFR 是腎功能的直接測量", en: "No downgrade — eGFR directly measures renal function" }, explanation: { zh: "✗ eGFR 下降速率是替代指標（surrogate），不等同於「是否需要透析」這個臨床終點。GRADE 將替代指標視為結果面向的不直接性。", en: "✗ eGFR decline rate is a surrogate, not equivalent to the clinical endpoint of 'needing dialysis.' GRADE considers surrogate outcomes as outcome indirectness." } },
      { label: { zh: "降 1 級 — 結果為替代指標", en: "Downgrade 1 — surrogate outcome" }, explanation: { zh: "✓ 正確！eGFR 是替代指標，你關心的是透析等硬終點。替代指標與臨床結果的關聯不完美，屬於結果面向的不直接性，降 1 級。", en: "✓ Correct! eGFR is a surrogate; you care about hard endpoints (dialysis). Imperfect correlation = outcome indirectness — downgrade 1." } },
      { label: { zh: "降 1 級 — 族群不匹配", en: "Downgrade 1 — population mismatch" }, explanation: { zh: "✗ 族群（T2DM + CKD）和介入都一致。問題在結果指標是替代指標。", en: "✗ Population (T2DM + CKD) and intervention match. The issue is the surrogate outcome." } },
      { label: { zh: "降 2 級 — 替代指標極不可靠", en: "Downgrade 2 — surrogate highly unreliable" }, explanation: { zh: "✗ eGFR 與腎病進展有公認的良好相關性，不算「極不可靠」。通常替代指標降 1 級即可。", en: "✗ eGFR has well-established correlation with renal progression — not 'highly unreliable.' Surrogates typically warrant 1 downgrade." } },
    ],
  },

  // ═══ FILL ═══

  // FILL-1: Case 2 — CPM outcome timing mismatch
  {
    id: "grade-indirect-fill-1", format: "fill", source: "case2",
    scenario: {
      zh: "CPM for TKA SR：你的病人關心術後 6 週的 ROM 恢復。統合分析大部分研究測量術後 2 週 ROM。族群（TKA 病人）和介入（CPM + PT vs PT alone）一致。6 篇 RCT，全部低偏誤風險。\n\n同時：CI [-1.2°, 5.8°] 跨越 null 和 MID（5°），點估計 2.3°。",
      en: "CPM for TKA SR: Your patient cares about ROM at 6 weeks post-op. Most MA studies measure ROM at 2 weeks. Population (TKA patients) and intervention (CPM + PT vs PT) match. 6 RCTs, all low risk.\n\nAlso: CI [-1.2°, 5.8°] crosses both null and MID (5°), point estimate 2.3°.",
    },
    prompt: { zh: "以下 GRADE 評估有兩個空格，請選出正確判斷。", en: "This GRADE assessment has two blanks. Select the correct judgments." },
    prefilled: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Publication bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    blanks: [
      {
        element: "indirectness",
        label: { zh: "不直接性", en: "Indirectness" },
        correctIndex: 1,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "結果測量時間不一致（2 週 vs 6 週），短期 ROM 改善不代表長期恢復", en: "Outcome timing mismatch (2 vs 6 weeks) — short-term gains don't predict long-term recovery" },
          { zh: "✓ 正確！結果測量時間（2 週 vs 6 週）是結果面向的不直接性。早期改善不一定代表長期恢復。", en: "✓ Correct! Outcome timing (2 vs 6 weeks) is outcome indirectness. Early gains don't necessarily mean long-term recovery." },
          { zh: "只有時間差異，其餘 PICO 一致，不至於降 2 級", en: "Only timing differs; rest of PICO matches — not severe enough for 2" },
        ],
      },
      {
        element: "imprecision",
        label: { zh: "不精確性", en: "Imprecision" },
        correctIndex: 1,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "CI 跨越 null 和 MID，不能不降級", en: "CI crosses both null and MID — can't ignore this" },
          { zh: "✓ 正確！點估計 2.3° < MID 5°，CI [-1.2°, 5.8°] 跨越 null 和 MID。降 1 級。", en: "✓ Correct! Point estimate 2.3° < MID 5°, CI crosses both null and MID. Downgrade 1." },
          { zh: "CI 跨越 null 和 MID，但只有一個面向，通常降 1 級", en: "CI crosses null and MID, but single dimension — usually downgrade 1" },
        ],
      },
    ],
  },

  // FILL-2: New — Oral vs IV route, community vs hospital
  {
    id: "grade-indirect-fill-2", format: "fill", source: "new",
    scenario: {
      zh: "你的問題：社區藥局中，口服鐵劑能否改善老年貧血病人的 Hb？找到的統合分析在住院環境下使用靜脈注射鐵劑。結果（Hb 變化 g/dL）一致。8 篇 RCT，6 篇低風險，2 篇部分疑慮。\n\n同時：I² = 15%，效應方向全部一致。",
      en: "Your question: In community pharmacy, can oral iron improve Hb in elderly anemia patients? The MA uses IV iron in hospital settings. Outcome (Hb change g/dL) matches. 8 RCTs, 6 low risk, 2 some concerns.\n\nAlso: I² = 15%, all consistent direction.",
    },
    prompt: { zh: "以下 GRADE 評估有兩個空格，請選出正確判斷。", en: "This GRADE assessment has two blanks. Select the correct judgments." },
    prefilled: {
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
          { zh: "✓ 正確！6/8 低風險，2 篇部分疑慮，無高風險。不需降級。", en: "✓ Correct! 6/8 low risk, 2 some concerns, no high risk. No downgrade." },
          { zh: "2 篇部分疑慮不足以降級", en: "2 with some concerns isn't enough to downgrade" },
          { zh: "大部分低風險，降 2 級不合理", en: "Most are low risk — downgrade 2 unreasonable" },
        ],
      },
      {
        element: "indirectness",
        label: { zh: "不直接性", en: "Indirectness" },
        correctIndex: 2,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "介入和環境都有重要差異，不能不降級", en: "Both intervention and setting differ significantly — can't skip downgrade" },
          { zh: "介入（IV vs 口服）和環境（醫院 vs 社區）雙重差異，只降 1 級不夠", en: "Double mismatch (IV vs oral + hospital vs community) — 1 isn't enough" },
          { zh: "✓ 正確！兩項重要不直接性：(1) 給藥途徑（IV vs 口服，藥動學差異大）；(2) 照護環境（住院 vs 社區）。多項嚴重差異 → 降 2 級。", en: "✓ Correct! Two major issues: (1) route (IV vs oral — very different PK); (2) setting (hospital vs community). Multiple serious differences → downgrade 2." },
        ],
      },
    ],
  },

  // FILL-3: Case 1 — Atropine 0.05% subgroup, indirectness + pubBias
  {
    id: "grade-indirect-fill-3", format: "fill", source: "case1",
    scenario: {
      zh: "Atropine 近視 SR（0.05% 次群組分析）：族群 6–15 歲（你的病人 12 歲，在範圍內）。介入 0.05% atropine（與問題一致）。比較組為安慰劑。結果為 SE 變化。12 篇 RCT，9 篇低風險。\n\n同時：漏斗圖略不對稱但 Egger's p = 0.08。",
      en: "Atropine SR (0.05% subgroup): Population 6–15yo (patient is 12). Intervention 0.05% atropine (matches). Comparator placebo. Outcome SE change. 12 RCTs, 9 low risk.\n\nAlso: Funnel slightly asymmetric but Egger's p = 0.08.",
    },
    prompt: { zh: "以下 GRADE 評估有兩個空格，請選出正確判斷。", en: "This GRADE assessment has two blanks. Select the correct judgments." },
    prefilled: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    blanks: [
      {
        element: "indirectness",
        label: { zh: "不直接性", en: "Indirectness" },
        correctIndex: 0,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "✓ 正確！使用 0.05% 次群組，PICO 各面向都與臨床問題一致（12 歲在 6–15 歲範圍內）。", en: "✓ Correct! Using 0.05% subgroup, all PICO elements match (12yo within 6–15 range)." },
          { zh: "0.05% 次群組已精確匹配介入，年齡也在範圍內", en: "0.05% subgroup precisely matches; age within range" },
          { zh: "所有 PICO 面向都匹配，不合理", en: "All PICO elements match — unjustified" },
        ],
      },
      {
        element: "pubBias",
        label: { zh: "發表偏誤", en: "Publication bias" },
        correctIndex: 0,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "✓ 正確！漏斗圖「略不對稱」但 Egger's p = 0.08 未達顯著，證據不足以判定有發表偏誤。", en: "✓ Correct! Funnel 'slightly asymmetric' but Egger's p = 0.08 not significant — insufficient evidence for publication bias." },
          { zh: "Egger's p = 0.08 未達顯著水準", en: "Egger's p = 0.08 not significant" },
          { zh: "不合理", en: "Unjustified" },
        ],
      },
    ],
  },

  // ═══ ERROR ═══

  // ERR-1: Case 1 — Teammate missed indirectness, wrong on imprecision
  {
    id: "grade-indirect-err-1", format: "error", source: "case1",
    scenario: {
      zh: "隊友對 atropine SR 的 GRADE 評估（使用全部濃度合併分析，未做次群組）：介入涵蓋 0.01%–0.05%（你的問題是 0.05%）。族群 4–16 歲（病人 12 歲）。CI 排除 null 且遠離 MID。I² = 35%，方向一致。漏斗圖對稱。",
      en: "Teammate's GRADE for atropine SR (pooled all concentrations, no subgroup): Intervention covers 0.01%–0.05% (question is 0.05%). Population 4–16 (patient 12). CI excludes null, far from MID. I² = 35%, consistent. Funnel symmetric.",
    },
    prompt: { zh: "隊友的 GRADE 評估有 2 個錯誤，請點選。", en: "Teammate's GRADE has 2 errors. Click them." },
    shownGrade: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "降 1 級", en: "Downgrade 1" } },
      pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    errorElements: ["indirectness", "imprecision"],
    errorExplanations: {
      indirectness: { zh: "合併 0.01%–0.05% 分析時，濃度差異是重要的介入不直接性（0.01% 效果遠小於 0.05%）。應「降 1 級」。", en: "Pooling 0.01%–0.05%, concentration difference is important intervention indirectness (0.01% effect much smaller than 0.05%). Should be 'Downgrade 1.'" },
      imprecision: { zh: "CI 排除 null 且遠離 MID——精確度足夠。應為「未降級」。", en: "CI excludes null and far from MID — precision adequate. Should be 'No downgrade.'" },
    },
  },

  // ERR-2: Case 3 — Teammate missed population indirectness and pub bias
  {
    id: "grade-indirect-err-2", format: "error", source: "case3",
    scenario: {
      zh: "隊友對 IV iron SR 的 GRADE 評估：你的病人是 HFpEF（EF > 50%），統合分析主要是 HFrEF 研究。14 篇 RCT，全部低偏誤風險。I² = 20%。CI 排除 null。漏斗圖明顯不對稱。",
      en: "Teammate's GRADE for IV iron SR: Your patient has HFpEF (EF > 50%), MA mainly HFrEF. 14 RCTs, all low risk. I² = 20%. CI excludes null. Funnel clearly asymmetric.",
    },
    prompt: { zh: "隊友的 GRADE 評估有 2 個錯誤，請點選。", en: "Teammate's GRADE has 2 errors. Click them." },
    shownGrade: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    errorElements: ["indirectness", "pubBias"],
    errorExplanations: {
      indirectness: { zh: "HFrEF vs HFpEF 是重要的族群不直接性（不同病理機轉、治療反應不同）。應「降 1 級」。", en: "HFrEF vs HFpEF is important population indirectness (different pathophysiology). Should be 'Downgrade 1.'" },
      pubBias: { zh: "漏斗圖明顯不對稱——有發表偏誤證據。應「降 1 級」。", en: "Funnel clearly asymmetric — publication bias evidence. Should be 'Downgrade 1.'" },
    },
  },

  // ERR-3: New — Teammate over-downgraded indirectness, missed RoB
  {
    id: "grade-indirect-err-3", format: "error", source: "new",
    scenario: {
      zh: "Metformin T2DM SR：你的病人 60 歲 T2DM 合併 CKD stage 3。統合分析排除 CKD > stage 2。結果為 HbA1c 變化。10 篇 RCT，8 篇高偏誤風險（未盲化 + 研究者報告 HbA1c）。I² = 10%。CI 排除 null。漏斗圖對稱。",
      en: "Metformin T2DM SR: Patient 60yo T2DM + CKD stage 3. MA excluded CKD > stage 2. Outcome HbA1c change. 10 RCTs, 8 high risk (no blinding + investigator-reported HbA1c). I² = 10%. CI excludes null. Funnel symmetric.",
    },
    prompt: { zh: "隊友的 GRADE 評估有 2 個錯誤，請點選。", en: "Teammate's GRADE has 2 errors. Click them." },
    shownGrade: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "降 2 級", en: "Downgrade 2" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    errorElements: ["rob", "indirectness"],
    errorExplanations: {
      rob: { zh: "8/10 高偏誤風險（未盲化 + 研究者報告 HbA1c）。應至少「降 1 級」。", en: "8/10 high risk (no blinding + investigator-reported HbA1c). Should be at least 'Downgrade 1.'" },
      indirectness: { zh: "排除 CKD > stage 2 而你的病人是 stage 3——是重要但單一的不直接性。降 1 級即可，降 2 級過度。", en: "Excluded CKD > stage 2, patient is stage 3 — important but single indirectness. Downgrade 1 appropriate, 2 excessive." },
    },
  },
];

export default gradeIndirectnessPractice;
