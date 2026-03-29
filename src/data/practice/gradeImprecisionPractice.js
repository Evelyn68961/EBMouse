// src/data/practice/gradeImprecisionPractice.js
// GRADE Imprecision domain — 9 practice questions (3 MC + 3 fill + 3 error)
// Questions about CI width relative to MID, null crossing, OIS.

const gradeImprecisionPractice = [

  // ═══ MC ═══

  // MC-1: Case 1 — 0.01% atropine, CI crosses MID
  {
    id: "grade-imprec-mc-1", format: "mc", source: "case1",
    scenario: {
      zh: "0.01% atropine 近視 SR：WMD = 0.23 D/year [95% CI: 0.13, 0.34]。你設定的 MID = 0.25 D/year（基於 Smith & Walline 2015）。Null threshold = 0（無效果）。",
      en: "0.01% atropine myopia SR: WMD = 0.23 D/year [95% CI: 0.13, 0.34]. Your MID = 0.25 D/year (from Smith & Walline 2015). Null threshold = 0 (no effect).",
    },
    prompt: { zh: "GRADE 不精確性域，你會怎麼判斷？", en: "For GRADE Imprecision, what's your judgment?" },
    correctIndex: 1,
    options: [
      { label: { zh: "不降級 — CI 排除 null", en: "No downgrade — CI excludes null" }, explanation: { zh: "✗ 排除 null 不夠——還要看是否跨越 MID。點估計 0.23 < MID 0.25，且 CI 上限 0.34 > MID，表示無法確定效果是否達臨床意義。", en: "✗ Excluding null isn't sufficient — must also check MID. Point estimate 0.23 < MID 0.25, CI upper 0.34 > MID — can't confirm clinically meaningful effect." } },
      { label: { zh: "降 1 級 — CI 跨越 MID", en: "Downgrade 1 — CI crosses MID" }, explanation: { zh: "✓ 正確！點估計 0.23 < MID 0.25（落在「效果甚微」區間），CI [0.13, 0.34] 跨越 MID。無法確定是否有臨床顯著效益。降 1 級。", en: "✓ Correct! Point estimate 0.23 < MID 0.25 (in 'trivial effect' zone), CI [0.13, 0.34] crosses MID. Can't confirm clinically significant benefit. Downgrade 1." } },
      { label: { zh: "降 2 級 — CI 很寬", en: "Downgrade 2 — CI very wide" }, explanation: { zh: "✗ CI 寬度 0.21（0.13–0.34）其實算窄。問題不在寬度而在位置（跨越 MID）。降 1 級即可。", en: "✗ CI width 0.21 is actually narrow. The issue is position (crossing MID), not width. Downgrade 1 is appropriate." } },
      { label: { zh: "降 1 級 — 樣本量不足", en: "Downgrade 1 — insufficient sample size" }, explanation: { zh: "✗ 判斷不精確性應看 CI 與 MID 的關係，不是直接看樣本量。樣本量影響 CI 寬度，但最終判斷以 CI 位置為準。", en: "✗ Imprecision is judged by CI relative to MID, not sample size directly. Sample size affects CI width, but the final judgment is about CI position." } },
    ],
  },

  // MC-2: Case 1 — 0.05% atropine, CI doesn't cross MID
  {
    id: "grade-imprec-mc-2", format: "mc", source: "case1",
    scenario: {
      zh: "0.05% atropine 近視 SR：WMD = 0.54 D/year [95% CI: 0.43, 0.65]。MID = 0.25 D/year。Null threshold = 0。",
      en: "0.05% atropine myopia SR: WMD = 0.54 D/year [95% CI: 0.43, 0.65]. MID = 0.25 D/year. Null threshold = 0.",
    },
    prompt: { zh: "GRADE 不精確性域，你會怎麼判斷？", en: "For GRADE Imprecision, what's your judgment?" },
    correctIndex: 0,
    options: [
      { label: { zh: "不降級 — CI 排除 null 且不跨越 MID", en: "No downgrade — CI excludes null and doesn't cross MID" }, explanation: { zh: "✓ 正確！點估計 0.54 > MID 0.25，CI 下限 0.43 > MID，CI 不跨越 MID。CI 上限 0.65 < 3×MID (0.75)，效果為 moderate。精確度足夠，不降級。", en: "✓ Correct! Point estimate 0.54 > MID 0.25, CI lower 0.43 > MID — doesn't cross MID. CI upper 0.65 < 3×MID (0.75), moderate effect. Precision adequate — no downgrade." } },
      { label: { zh: "降 1 級 — 仍有不確定性", en: "Downgrade 1 — still uncertain" }, explanation: { zh: "✗ CI 完全落在 MID 以上，效果方向和臨床意義都明確。「仍有不確定性」不是降級依據。", en: "✗ CI entirely above MID — both direction and clinical significance are clear. 'Still uncertain' is not a basis for downgrade." } },
      { label: { zh: "不降級，但需確認 OIS", en: "No downgrade, but check OIS" }, explanation: { zh: "✗ 當 CI 已明確不跨越 MID 和 null，不需額外檢查 OIS。OIS 主要用於 CI 邊界情況。", en: "✗ When CI clearly doesn't cross MID or null, OIS check isn't needed. OIS is mainly for borderline cases." } },
      { label: { zh: "降 1 級 — CI 上限接近 3×MID", en: "Downgrade 1 — CI upper near 3×MID" }, explanation: { zh: "✗ CI 上限 0.65 < 3×MID (0.75)，屬於 moderate effect，不構成降級。只有 CI 上限超過 3×MID 才需考慮「效果可能被高估」。", en: "✗ CI upper 0.65 < 3×MID (0.75), moderate effect — no downgrade. Only if CI upper exceeds 3×MID would 'overestimation' concern arise." } },
    ],
  },

  // MC-3: Case 3 — Binary outcome, OIS consideration
  {
    id: "grade-imprec-mc-3", format: "mc", source: "case3",
    scenario: {
      zh: "IV iron for HF SR：OR = 0.63 [95% CI: 0.46, 0.88]，心衰竭住院率。Null threshold OR = 1。NNT = 16。總樣本量 1,200 人（events: 介入組 85, 對照組 120）。OIS 計算需約 2,000 人。",
      en: "IV iron for HF SR: OR = 0.63 [95% CI: 0.46, 0.88], HF hospitalization. Null threshold OR = 1. NNT = 16. Total sample 1,200 (events: intervention 85, control 120). OIS requires ~2,000.",
    },
    prompt: { zh: "GRADE 不精確性域，你會怎麼判斷？", en: "For GRADE Imprecision, what's your judgment?" },
    correctIndex: 2,
    options: [
      { label: { zh: "不降級 — CI 排除 null", en: "No downgrade — CI excludes null" }, explanation: { zh: "✗ CI 排除 null，但樣本量未達 OIS（1,200 < 2,000）。對於二元結果，OIS 不足時即使 CI 看起來精確，仍可能不穩定。", en: "✗ CI excludes null, but sample size doesn't meet OIS (1,200 < 2,000). For binary outcomes, insufficient OIS means results may be unstable despite seemingly precise CI." } },
      { label: { zh: "降 2 級 — 樣本量嚴重不足", en: "Downgrade 2 — severely insufficient sample" }, explanation: { zh: "✗ 雖未達 OIS，但 CI 已排除 null，效果方向明確。降 2 級過度。", en: "✗ Below OIS but CI excludes null with clear direction. Downgrade 2 is excessive." } },
      { label: { zh: "降 1 級 — 未達 OIS", en: "Downgrade 1 — OIS not met" }, explanation: { zh: "✓ 正確！CI 排除 null（OR 0.46–0.88），方向明確。但總樣本量 1,200 < OIS 2,000，不精確性仍需考慮。降 1 級。", en: "✓ Correct! CI excludes null (OR 0.46–0.88), clear direction. But total sample 1,200 < OIS 2,000 — imprecision concern remains. Downgrade 1." } },
      { label: { zh: "不降級 — NNT = 16 算臨床有意義", en: "No downgrade — NNT 16 is clinically meaningful" }, explanation: { zh: "✗ NNT 表示效果大小，不解決精確性問題。精確性看 CI 和 OIS，不看 NNT。", en: "✗ NNT reflects effect magnitude, not precision. Precision is about CI and OIS, not NNT." } },
    ],
  },

  // ═══ FILL ═══

  // FILL-1: Case 2 — CPM, imprecision + inconsistency
  {
    id: "grade-imprec-fill-1", format: "fill", source: "case2",
    scenario: {
      zh: "CPM for TKA SR：WMD = 2.3° [95% CI: -1.2°, 5.8°]，ROM 改善。MID = 5°（膝關節角度臨床有意義變化）。Null = 0°。6 篇 RCT，全部低風險。I² = 72%，效果範圍 -2° 到 +12°。PICO 與你的問題一致。漏斗圖對稱。",
      en: "CPM for TKA SR: WMD = 2.3° [95% CI: -1.2°, 5.8°], ROM improvement. MID = 5°. Null = 0°. 6 RCTs, all low risk. I² = 72%, range -2° to +12°. PICO matches. Funnel symmetric.",
    },
    prompt: { zh: "以下 GRADE 評估有兩個空格，請選出正確判斷。", en: "This GRADE assessment has two blanks. Select the correct judgments." },
    prefilled: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Publication bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    blanks: [
      {
        element: "imprecision",
        label: { zh: "不精確性", en: "Imprecision" },
        correctIndex: 1,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "CI 跨越 null 和 MID，不能不降級", en: "CI crosses both null and MID — can't ignore" },
          { zh: "✓ 正確！點估計 2.3° < MID 5°，CI [-1.2°, 5.8°] 跨越 null 和 MID。無法確定 CPM 是否有效或有臨床意義。降 1 級。", en: "✓ Correct! Point estimate 2.3° < MID 5°, CI crosses both null and MID. Can't determine if CPM is effective or clinically meaningful. Downgrade 1." },
          { zh: "CI 雖跨越兩個閾值，但只有一個不精確性面向，通常降 1 級", en: "CI crosses both thresholds but single imprecision dimension — usually 1" },
        ],
      },
      {
        element: "inconsistency",
        label: { zh: "不一致性", en: "Inconsistency" },
        correctIndex: 1,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "I² = 72% 且效果範圍從負到正，不能不降級", en: "I² = 72% with effects ranging negative to positive — can't ignore" },
          { zh: "✓ 正確！I² = 72% 高度異質性，效果從 -2° 到 +12°（跨越 null 兩側），點估計不一致。降 1 級。", en: "✓ Correct! I² = 72% high heterogeneity, effects range -2° to +12° (crossing null), inconsistent estimates. Downgrade 1." },
          { zh: "效應方向不完全相反，不至於降 2 級", en: "Not completely opposing directions — not severe enough for 2" },
        ],
      },
    ],
  },

  // FILL-2: New — Anticoagulant, CI crosses null but not MID
  {
    id: "grade-imprec-fill-2", format: "fill", source: "new",
    scenario: {
      zh: "DOAC vs warfarin 預防中風 SR：RR = 0.88 [95% CI: 0.75, 1.03]。Null = 1.0。MID = RR 0.80（臨床有意義的額外中風預防）。10 篇 RCT，8 篇低風險，2 篇部分疑慮。I² = 25%，方向一致。漏斗圖對稱。",
      en: "DOAC vs warfarin stroke prevention SR: RR = 0.88 [95% CI: 0.75, 1.03]. Null = 1.0. MID = RR 0.80. 10 RCTs, 8 low risk, 2 some concerns. I² = 25%, consistent direction. Funnel symmetric.",
    },
    prompt: { zh: "以下 GRADE 評估有兩個空格，請選出正確判斷。", en: "This GRADE assessment has two blanks. Select the correct judgments." },
    prefilled: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Publication bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    blanks: [
      {
        element: "imprecision",
        label: { zh: "不精確性", en: "Imprecision" },
        correctIndex: 1,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "CI 上限 1.03 跨越 null（1.0），不確定 DOAC 是否真的更好", en: "CI upper 1.03 crosses null (1.0) — uncertain if DOAC is truly better" },
          { zh: "✓ 正確！CI [0.75, 1.03] 跨越 null（1.0），無法確定 DOAC 是否優於 warfarin。點估計 0.88 > MID 0.80（效果未達臨床門檻的保護側）。降 1 級。", en: "✓ Correct! CI [0.75, 1.03] crosses null (1.0) — can't confirm DOAC superiority. Point estimate 0.88 > MID 0.80 (doesn't reach clinically meaningful threshold). Downgrade 1." },
          { zh: "CI 跨越 null 但不跨越 MID，只有一個問題，通常降 1 級", en: "CI crosses null but not MID — single issue, usually 1" },
        ],
      },
      {
        element: "inconsistency",
        label: { zh: "不一致性", en: "Inconsistency" },
        correctIndex: 0,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "✓ 正確！I² = 25% 低度，且效應方向一致。不需降級。", en: "✓ Correct! I² = 25% low, consistent direction. No downgrade." },
          { zh: "I² = 25% 不算高，方向一致", en: "I² = 25% isn't high; direction consistent" },
          { zh: "不合理", en: "Unjustified" },
        ],
      },
    ],
  },

  // FILL-3: Case 3 — IV iron binary, OIS + RoB
  {
    id: "grade-imprec-fill-3", format: "fill", source: "case3",
    scenario: {
      zh: "IV iron for HF SR（住院率）：OR = 0.63 [0.46, 0.88]。Null = OR 1。總樣本量 1,200，OIS 需 2,000。14 篇 RCT，10 篇開放標籤，結果為客觀指標（住院）。4 篇雙盲結果一致。\n\n同時：I² = 20%，方向全部一致。",
      en: "IV iron for HF SR (hospitalization): OR = 0.63 [0.46, 0.88]. Null = OR 1. Total N = 1,200, OIS needs 2,000. 14 RCTs, 10 open-label, objective outcome (hospitalization). 4 double-blind consistent.\n\nAlso: I² = 20%, all consistent direction.",
    },
    prompt: { zh: "以下 GRADE 評估有兩個空格，請選出正確判斷。", en: "This GRADE assessment has two blanks. Select the correct judgments." },
    prefilled: {
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Publication bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    blanks: [
      {
        element: "rob",
        label: { zh: "誤差風險", en: "Risk of Bias" },
        correctIndex: 0,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "✓ 正確！結果為客觀指標（住院），開放標籤影響小。4 篇雙盲結果一致，進一步支持。", en: "✓ Correct! Objective outcome (hospitalization) — open-label has minimal impact. 4 double-blind RCTs consistent." },
          { zh: "客觀結果不易受盲化影響", en: "Objective outcomes minimally affected by blinding" },
          { zh: "不合理", en: "Unjustified" },
        ],
      },
      {
        element: "imprecision",
        label: { zh: "不精確性", en: "Imprecision" },
        correctIndex: 1,
        options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級（嚴重）", en: "Downgrade 1 (serious)" }, { zh: "降 2 級（非常嚴重）", en: "Downgrade 2 (very serious)" } ],
        explanations: [
          { zh: "雖然 CI 排除 null，但未達 OIS", en: "CI excludes null but OIS not met" },
          { zh: "✓ 正確！CI 排除 null，方向明確（OR 0.63）。但總樣本量 1,200 < OIS 2,000，結果可能不穩定。降 1 級。", en: "✓ Correct! CI excludes null, clear direction (OR 0.63). But total N 1,200 < OIS 2,000 — results may be unstable. Downgrade 1." },
          { zh: "CI 排除 null 且方向明確，降 2 級過度", en: "CI excludes null with clear direction — 2 is excessive" },
        ],
      },
    ],
  },

  // ═══ ERROR ═══

  // ERR-1: Case 1 — 0.01% atropine, teammate forgot MID check
  {
    id: "grade-imprec-err-1", format: "error", source: "case1",
    scenario: {
      zh: "隊友對 0.01% atropine SR 的 GRADE 評估：WMD = 0.23 [0.13, 0.34]，MID = 0.25。9/12 低風險，I² = 35%。PICO 匹配（使用 0.01% 次群組）。漏斗圖不對稱，Egger's p = 0.02。",
      en: "Teammate's GRADE for 0.01% atropine SR: WMD = 0.23 [0.13, 0.34], MID = 0.25. 9/12 low risk, I² = 35%. PICO matches (0.01% subgroup). Funnel asymmetric, Egger's p = 0.02.",
    },
    prompt: { zh: "隊友的 GRADE 評估有 2 個錯誤，請點選。", en: "Teammate's GRADE has 2 errors. Click them." },
    shownGrade: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "未降級", en: "No downgrade" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    errorElements: ["imprecision", "pubBias"],
    errorExplanations: {
      imprecision: { zh: "點估計 0.23 < MID 0.25，CI 上限 0.34 跨越 MID——無法確定效果是否達臨床意義。應「降 1 級」。", en: "Point estimate 0.23 < MID 0.25, CI upper 0.34 crosses MID — can't confirm clinical significance. Should be 'Downgrade 1.'" },
      pubBias: { zh: "漏斗圖不對稱且 Egger's p = 0.02 達顯著——有發表偏誤。應「降 1 級」。", en: "Funnel asymmetric and Egger's p = 0.02 significant — publication bias present. Should be 'Downgrade 1.'" },
    },
  },

  // ERR-2: Case 2 — CPM, teammate wrongly downgraded RoB, missed imprecision
  {
    id: "grade-imprec-err-2", format: "error", source: "case2",
    scenario: {
      zh: "隊友對 CPM SR 的 GRADE 評估：WMD = 2.3° [-1.2°, 5.8°]，MID = 5°。6 篇 RCT 全部低風險。I² = 72%。PICO 一致。漏斗圖對稱。",
      en: "Teammate's GRADE for CPM SR: WMD = 2.3° [-1.2°, 5.8°], MID = 5°. 6 RCTs all low risk. I² = 72%. PICO matches. Funnel symmetric.",
    },
    prompt: { zh: "隊友的 GRADE 評估有 2 個錯誤，請點選。", en: "Teammate's GRADE has 2 errors. Click them." },
    shownGrade: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "降 1 級", en: "Downgrade 1" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "降 1 級", en: "Downgrade 1" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } },
      pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    errorElements: ["rob", "imprecision"],
    errorExplanations: {
      rob: { zh: "6 篇全部低偏誤風險——應為「未降級」。", en: "All 6 RCTs low risk — should be 'No downgrade.'" },
      imprecision: { zh: "CI [-1.2°, 5.8°] 跨越 null（0°）和 MID（5°），點估計 2.3° 遠低於 MID。應「降 1 級」。", en: "CI [-1.2°, 5.8°] crosses both null (0°) and MID (5°), point estimate 2.3° well below MID. Should be 'Downgrade 1.'" },
    },
  },

  // ERR-3: New — DPP-4i, teammate confused OIS with CI
  {
    id: "grade-imprec-err-3", format: "error", source: "new",
    scenario: {
      zh: "DPP-4 抑制劑 vs 安慰劑治療 T2DM，HbA1c 降低 SR：WMD = -0.65% [-0.78, -0.52]。MID = -0.50%。Null = 0。15 篇 RCT，12 篇低風險，3 篇部分疑慮。I² = 18%。漏斗圖對稱。",
      en: "DPP-4i vs placebo for T2DM, HbA1c reduction SR: WMD = -0.65% [-0.78, -0.52]. MID = -0.50%. Null = 0. 15 RCTs, 12 low risk, 3 some concerns. I² = 18%. Funnel symmetric.",
    },
    prompt: { zh: "隊友的 GRADE 評估有 2 個錯誤，請點選。", en: "Teammate's GRADE has 2 errors. Click them." },
    shownGrade: {
      rob: { label: { zh: "誤差風險", en: "Risk of Bias" }, rating: { zh: "降 1 級", en: "Downgrade 1" } },
      inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } },
      indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } },
      imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "降 1 級", en: "Downgrade 1" } },
      pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } },
    },
    errorElements: ["rob", "imprecision"],
    errorExplanations: {
      rob: { zh: "12/15 低風險，3 篇部分疑慮，無高風險。不需降級。應為「未降級」。", en: "12/15 low risk, 3 some concerns, no high risk. No downgrade needed. Should be 'No downgrade.'" },
      imprecision: { zh: "WMD -0.65% 超過 MID（-0.50%），CI [-0.78, -0.52] 整段都超過 MID，不跨越 null。精確度充足。應為「未降級」。", en: "WMD -0.65% exceeds MID (-0.50%), entire CI [-0.78, -0.52] beyond MID, doesn't cross null. Precision adequate. Should be 'No downgrade.'" },
    },
  },
];

export default gradeImprecisionPractice;
