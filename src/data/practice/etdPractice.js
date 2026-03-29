// src/data/practice/etdPractice.js
// Evidence-to-Decision Framework — 9 practice questions (3 MC + 3 fill + 3 error)
// Questions about recommendation strength, direction, and wording.

const etdPractice = [

  // ═══ MC ═══

  // MC-1: Case 1 — 0.05% atropine, GRADE Moderate
  {
    id: "etd-mc-1", format: "mc", source: "case1",
    scenario: {
      zh: "0.05% atropine 用於 6–12 歲近視兒童。GRADE 證據品質：中 (Moderate)（起始 High，發表偏誤 -1）。效益：延緩近視 0.54 D/year（> MID 0.25）。風險：瞳孔放大、畏光（輕微且可逆）。費用低，家長接受度高。無其他同等有效的非侵入性替代方案。",
      en: "0.05% atropine for myopic children aged 6–12. GRADE: Moderate (High -1 pub bias). Benefits: slows myopia 0.54 D/year (> MID 0.25). Harms: pupil dilation, photophobia (mild, reversible). Low cost, high parental acceptance. No equally effective noninvasive alternatives.",
    },
    prompt: { zh: "你會給出什麼建議？", en: "What recommendation would you give?" },
    correctIndex: 1,
    options: [
      { label: { zh: "強烈建議使用 (Strong for)", en: "Strong recommendation for" }, explanation: { zh: "✗ 證據品質為「中」而非「高」。GRADE 強烈建議通常需要高確定性。中等確定性通常對應條件式建議。", en: "✗ Evidence is 'Moderate' not 'High.' Strong recommendations typically require high certainty. Moderate usually maps to conditional." } },
      { label: { zh: "條件式建議使用 (Conditional for)", en: "Conditional recommendation for" }, explanation: { zh: "✓ 正確！中等證據品質 + 效益明確超過 MID + 風險輕微 → 條件式建議使用。用語：「我們建議 (suggest)」而非「我們推薦 (recommend)」。", en: "✓ Correct! Moderate certainty + benefits clearly exceed MID + minor harms → conditional for. Wording: 'We suggest' not 'We recommend.'" } },
      { label: { zh: "條件式建議不使用 (Conditional against)", en: "Conditional recommendation against" }, explanation: { zh: "✗ 效益明確（0.54 > MID 0.25），風險輕微——效益大於風險，不應建議不使用。", en: "✗ Benefits clear (0.54 > MID 0.25), harms minor — benefits outweigh harms, shouldn't recommend against." } },
      { label: { zh: "無法做出建議", en: "Unable to make recommendation" }, explanation: { zh: "✗ GRADE 框架不使用「無法建議」——即使證據不完美，仍需做出方向性建議。", en: "✗ GRADE doesn't use 'unable to recommend' — you must give a directional recommendation even with imperfect evidence." } },
    ],
  },

  // MC-2: Case 2 — CPM, GRADE Low
  {
    id: "etd-mc-2", format: "mc", source: "case2",
    scenario: {
      zh: "CPM 用於 TKA 術後復健。GRADE 證據品質：低 (Low)（起始 High，不一致性 -1，不精確性 -1）。效益：ROM 改善 WMD = 2.3°（< MID 5°）。風險：設備成本、延長住院、DVT 風險略增。替代方案：標準物理治療已有良好證據。",
      en: "CPM for post-TKA rehab. GRADE: Low (High -1 inconsistency, -1 imprecision). Benefits: ROM improvement WMD 2.3° (< MID 5°). Harms: equipment cost, longer hospital stay, slight DVT risk increase. Alternative: standard PT has good evidence.",
    },
    prompt: { zh: "你會給出什麼建議？", en: "What recommendation would you give?" },
    correctIndex: 2,
    options: [
      { label: { zh: "強烈建議使用 (Strong for)", en: "Strong recommendation for" }, explanation: { zh: "✗ 證據品質低 + 效益未達 MID + 有風險和成本。完全不符合強烈建議的條件。", en: "✗ Low certainty + benefits below MID + harms and costs. Doesn't meet criteria for strong recommendation." } },
      { label: { zh: "條件式建議使用 (Conditional for)", en: "Conditional recommendation for" }, explanation: { zh: "✗ 效益未達 MID（2.3° < 5°），且有明確替代方案。效益不大於風險。", en: "✗ Benefits below MID (2.3° < 5°), with clear alternatives. Benefits don't outweigh harms." } },
      { label: { zh: "條件式建議不使用 (Conditional against)", en: "Conditional recommendation against" }, explanation: { zh: "✓ 正確！低證據品質 + 效益未達 MID + 有替代方案 + 成本/風險 → 條件式建議不使用。用語：「我們建議不常規使用 (We suggest against routine use)」。", en: "✓ Correct! Low certainty + benefits below MID + alternatives exist + costs/harms → conditional against. Wording: 'We suggest against routine use.'" } },
      { label: { zh: "強烈建議不使用 (Strong against)", en: "Strong recommendation against" }, explanation: { zh: "✗ 「強烈建議不使用」需要高確定性證據顯示有害或無效。這裡證據品質低，不確定性高——用條件式更合適。", en: "✗ 'Strong against' requires high-certainty evidence of harm or futility. Low certainty here — conditional is more appropriate." } },
    ],
  },

  // MC-3: Case 3 — IV iron, GRADE Moderate, NNT = 16
  {
    id: "etd-mc-3", format: "mc", source: "case3",
    scenario: {
      zh: "IV iron 用於 HFrEF + IDA 病人。GRADE 證據品質：中 (Moderate)（起始 High，發表偏誤 -1）。效益：住院率降低 OR 0.63，NNT = 16。風險：過敏反應（罕見但嚴重）、靜脈注射不適。費用中等，需住院/門診給藥。病人偏好：多數願意嘗試減少住院。",
      en: "IV iron for HFrEF + IDA. GRADE: Moderate (High -1 pub bias). Benefits: hospitalization OR 0.63, NNT = 16. Harms: anaphylaxis (rare but serious), IV discomfort. Moderate cost, requires clinic visits. Patient preference: most willing to try to reduce hospitalization.",
    },
    prompt: { zh: "你會給出什麼建議？", en: "What recommendation would you give?" },
    correctIndex: 0,
    options: [
      { label: { zh: "條件式建議使用 (Conditional for)", en: "Conditional recommendation for" }, explanation: { zh: "✓ 正確！中等證據品質 + 效益明確（NNT 16）+ 風險低但嚴重性需考慮 + 費用中等 → 條件式建議使用。用語：「對 HFrEF 合併 IDA 病人，我們建議 (suggest) 考慮靜脈鐵劑補充」。", en: "✓ Correct! Moderate certainty + clear benefits (NNT 16) + low but potentially serious harms + moderate cost → conditional for. 'For patients with HFrEF and IDA, we suggest considering IV iron supplementation.'" } },
      { label: { zh: "強烈建議使用 (Strong for)", en: "Strong recommendation for" }, explanation: { zh: "✗ 中等證據品質，且過敏風險雖罕見但嚴重。不符合強烈建議的條件（通常需要高確定性）。", en: "✗ Moderate certainty, and anaphylaxis risk though rare is serious. Doesn't meet strong recommendation criteria (usually needs high certainty)." } },
      { label: { zh: "條件式建議不使用 (Conditional against)", en: "Conditional recommendation against" }, explanation: { zh: "✗ NNT = 16 是相當好的效果，且病人偏好支持。效益大於風險。", en: "✗ NNT = 16 is a meaningful benefit, and patient preferences support it. Benefits outweigh harms." } },
      { label: { zh: "強烈建議使用 — NNT 16 很好", en: "Strong for — NNT 16 is very good" }, explanation: { zh: "✗ NNT 不是決定建議強度的唯一因素。還要看證據品質（中）和風險嚴重性（過敏）。", en: "✗ NNT alone doesn't determine recommendation strength. Must also consider certainty (moderate) and harm severity (anaphylaxis)." } },
    ],
  },

  // ═══ FILL ═══

  // FILL-1: Case 1 — Fill strength and qualifier
  {
    id: "etd-fill-1", format: "fill", source: "case1",
    scenario: {
      zh: "你已完成 0.05% atropine 近視 SR 的評估。GRADE：中 (Moderate)。效益：延緩近視 > MID。風險：輕微。你正在撰寫建議聲明。\n\n部分建議已完成，請填入缺少的部分。",
      en: "You've completed the 0.05% atropine myopia SR assessment. GRADE: Moderate. Benefits: slowing > MID. Harms: minor. You're writing the recommendation statement.\n\nParts are pre-filled. Complete the missing parts.",
    },
    prompt: { zh: "請填入兩個空白欄位。", en: "Fill in the two blanks." },
    prefilled: {
      direction: { label: { zh: "建議方向", en: "Direction" }, rating: { zh: "使用 (For)", en: "For" } },
      population: { label: { zh: "適用族群", en: "Population" }, rating: { zh: "6–12 歲近視兒童", en: "Myopic children aged 6–12" } },
      intervention: { label: { zh: "介入措施", en: "Intervention" }, rating: { zh: "0.05% atropine 眼藥水", en: "0.05% atropine eye drops" } },
    },
    blanks: [
      {
        element: "strength",
        label: { zh: "建議強度", en: "Strength" },
        correctIndex: 1,
        options: [ { zh: "強烈 (Strong) — 「我們推薦」", en: "Strong — 'We recommend'" }, { zh: "條件式 (Conditional) — 「我們建議」", en: "Conditional — 'We suggest'" } ],
        explanations: [
          { zh: "中等證據品質通常不支持強烈建議", en: "Moderate certainty typically doesn't support strong recommendation" },
          { zh: "✓ 正確！GRADE 中等 → 條件式建議。用語：「我們建議 (suggest)」而非「我們推薦 (recommend)」。", en: "✓ Correct! GRADE Moderate → conditional. Wording: 'We suggest' not 'We recommend.'" },
        ],
      },
      {
        element: "qualifier",
        label: { zh: "限定條件", en: "Qualifier" },
        correctIndex: 0,
        options: [ { zh: "用於延緩近視進展（中等品質證據）", en: "to slow myopia progression (moderate-certainty evidence)" }, { zh: "無需限定條件", en: "No qualifier needed" }, { zh: "僅限臨床試驗使用", en: "Only in clinical trials" } ],
        explanations: [
          { zh: "✓ 正確！條件式建議應包含目的和證據品質等級作為限定條件。", en: "✓ Correct! Conditional recommendations should include purpose and certainty level as qualifiers." },
          { zh: "條件式建議應說明用途和證據品質", en: "Conditional should state purpose and evidence quality" },
          { zh: "中等證據不需要限制在試驗中使用", en: "Moderate evidence doesn't require limiting to trials" },
        ],
      },
    ],
  },

  // FILL-2: Case 2 — CPM, fill direction and strength
  {
    id: "etd-fill-2", format: "fill", source: "case2",
    scenario: {
      zh: "你已完成 CPM for TKA 的評估。GRADE：低 (Low)。效益：WMD 2.3°（< MID 5°）。風險：設備成本、DVT。替代方案：標準物理治療。\n\n請完成建議聲明。",
      en: "You've completed CPM for TKA assessment. GRADE: Low. Benefits: WMD 2.3° (< MID 5°). Harms: cost, DVT. Alternative: standard PT.\n\nComplete the recommendation statement.",
    },
    prompt: { zh: "請填入兩個空白欄位。", en: "Fill in the two blanks." },
    prefilled: {
      population: { label: { zh: "適用族群", en: "Population" }, rating: { zh: "TKA 術後病人", en: "Post-TKA patients" } },
      intervention: { label: { zh: "介入措施", en: "Intervention" }, rating: { zh: "CPM 合併標準物理治療", en: "CPM combined with standard PT" } },
      qualifier: { label: { zh: "限定條件", en: "Qualifier" }, rating: { zh: "（低品質證據）", en: "(low-certainty evidence)" } },
    },
    blanks: [
      {
        element: "direction",
        label: { zh: "建議方向", en: "Direction" },
        correctIndex: 1,
        options: [ { zh: "使用 (For)", en: "For" }, { zh: "不使用 (Against)", en: "Against" } ],
        explanations: [
          { zh: "效益未達 MID，有替代方案且有風險/成本", en: "Benefits below MID, alternatives exist with harms/costs" },
          { zh: "✓ 正確！效益 < MID + 低證據品質 + 有成本風險 + 有替代方案 → 方向為「不使用」。", en: "✓ Correct! Benefits < MID + low certainty + costs/harms + alternatives → direction 'Against.'" },
        ],
      },
      {
        element: "strength",
        label: { zh: "建議強度", en: "Strength" },
        correctIndex: 1,
        options: [ { zh: "強烈 (Strong) — 「我們推薦」", en: "Strong — 'We recommend'" }, { zh: "條件式 (Conditional) — 「我們建議」", en: "Conditional — 'We suggest'" } ],
        explanations: [
          { zh: "低證據品質不支持強烈建議（除非明確有害）", en: "Low certainty doesn't support strong (unless clearly harmful)" },
          { zh: "✓ 正確！低證據品質 → 條件式。「我們建議不常規使用 CPM (We suggest against routine use of CPM)」。", en: "✓ Correct! Low certainty → conditional. 'We suggest against routine use of CPM.'" },
        ],
      },
    ],
  },

  // FILL-3: Case 3 — IV iron, fill strength and qualifier
  {
    id: "etd-fill-3", format: "fill", source: "case3",
    scenario: {
      zh: "IV iron for HFrEF + IDA。GRADE：中 (Moderate)。效益：NNT 16（住院降低）。風險：過敏（罕見但嚴重）。病人偏好支持。費用中等。\n\n請完成建議聲明。",
      en: "IV iron for HFrEF + IDA. GRADE: Moderate. Benefits: NNT 16 (reduced hospitalization). Harms: anaphylaxis (rare but serious). Patient preference supports. Moderate cost.\n\nComplete the recommendation.",
    },
    prompt: { zh: "請填入兩個空白欄位。", en: "Fill in the two blanks." },
    prefilled: {
      direction: { label: { zh: "建議方向", en: "Direction" }, rating: { zh: "使用 (For)", en: "For" } },
      population: { label: { zh: "適用族群", en: "Population" }, rating: { zh: "HFrEF 合併 IDA 病人", en: "HFrEF patients with IDA" } },
      intervention: { label: { zh: "介入措施", en: "Intervention" }, rating: { zh: "靜脈鐵劑補充", en: "IV iron supplementation" } },
    },
    blanks: [
      {
        element: "strength",
        label: { zh: "建議強度", en: "Strength" },
        correctIndex: 1,
        options: [ { zh: "強烈 (Strong) — 「我們推薦」", en: "Strong — 'We recommend'" }, { zh: "條件式 (Conditional) — 「我們建議」", en: "Conditional — 'We suggest'" } ],
        explanations: [
          { zh: "中等證據品質 + 有嚴重副作用（雖罕見）→ 不符合強烈建議", en: "Moderate certainty + serious side effects (though rare) → doesn't meet strong criteria" },
          { zh: "✓ 正確！中等證據品質 → 條件式。「我們建議 (suggest) 考慮使用」。", en: "✓ Correct! Moderate certainty → conditional. 'We suggest considering.'" },
        ],
      },
      {
        element: "qualifier",
        label: { zh: "限定條件", en: "Qualifier" },
        correctIndex: 1,
        options: [ { zh: "所有心衰竭病人均適用", en: "Applicable to all HF patients" }, { zh: "需監測過敏反應（中等品質證據，NNT = 16）", en: "Monitor for anaphylaxis (moderate-certainty evidence, NNT = 16)" }, { zh: "僅限住院病人", en: "Inpatients only" } ],
        explanations: [
          { zh: "僅適用 HFrEF + IDA，不是「所有心衰竭」", en: "Only for HFrEF + IDA, not 'all HF'" },
          { zh: "✓ 正確！需提及過敏風險監測 + 證據品質 + 效果量，讓臨床醫師做知情決策。", en: "✓ Correct! Should mention anaphylaxis monitoring + certainty + effect size for informed decision-making." },
          { zh: "門診也可給予 IV iron，不限住院", en: "IV iron can be given outpatient, not inpatient only" },
        ],
      },
    ],
  },

  // ═══ ERROR ═══

  // ERR-1: Case 1 — Wrong strength + wrong wording
  {
    id: "etd-err-1", format: "error", source: "case1",
    scenario: {
      zh: "隊友的建議聲明：「針對 6–12 歲近視兒童，我們推薦 (recommend) 使用 0.05% atropine 眼藥水延緩近視進展。」\n\nGRADE 證據品質：中 (Moderate)。效益 > MID。風險輕微。",
      en: "Teammate's statement: 'For myopic children aged 6–12, we recommend 0.05% atropine eye drops to slow myopia progression.'\n\nGRADE: Moderate. Benefits > MID. Harms minor.",
    },
    prompt: { zh: "隊友的建議聲明有 2 個錯誤，請點選。", en: "Teammate's recommendation has 2 errors. Click them." },
    shownEtd: {
      strength: { label: { zh: "建議強度", en: "Strength" }, rating: { zh: "強烈 (Strong)", en: "Strong" } },
      wording: { label: { zh: "用語", en: "Wording" }, rating: { zh: "「我們推薦 (recommend)」", en: "'We recommend'" } },
      direction: { label: { zh: "方向", en: "Direction" }, rating: { zh: "使用 (For)", en: "For" } },
      population: { label: { zh: "族群", en: "Population" }, rating: { zh: "6–12 歲近視兒童", en: "Myopic children 6–12" } },
      qualifier: { label: { zh: "限定條件", en: "Qualifier" }, rating: { zh: "延緩近視進展", en: "To slow progression" } },
    },
    errorElements: ["strength", "wording"],
    errorExplanations: {
      strength: { zh: "GRADE 中等證據品質 → 條件式 (Conditional)，不是強烈 (Strong)。", en: "GRADE Moderate → Conditional, not Strong." },
      wording: { zh: "條件式建議用「我們建議 (suggest)」，不用「我們推薦 (recommend)」。「Recommend」是強烈建議的用語。", en: "Conditional uses 'We suggest,' not 'We recommend.' 'Recommend' is for strong recommendations." },
    },
  },

  // ERR-2: Case 2 — Wrong direction + missing qualifier
  {
    id: "etd-err-2", format: "error", source: "case2",
    scenario: {
      zh: "隊友的建議聲明：「針對 TKA 術後病人，我們建議 (suggest) 使用 CPM 合併標準物理治療。」\n\nGRADE：低 (Low)。效益 2.3° < MID 5°。有替代方案。",
      en: "Teammate's statement: 'For post-TKA patients, we suggest using CPM combined with standard PT.'\n\nGRADE: Low. Benefits 2.3° < MID 5°. Alternatives exist.",
    },
    prompt: { zh: "隊友的建議聲明有 2 個錯誤，請點選。", en: "Teammate's recommendation has 2 errors. Click them." },
    shownEtd: {
      strength: { label: { zh: "建議強度", en: "Strength" }, rating: { zh: "條件式 (Conditional)", en: "Conditional" } },
      wording: { label: { zh: "用語", en: "Wording" }, rating: { zh: "「我們建議 (suggest)」", en: "'We suggest'" } },
      direction: { label: { zh: "方向", en: "Direction" }, rating: { zh: "使用 (For)", en: "For" } },
      population: { label: { zh: "族群", en: "Population" }, rating: { zh: "TKA 術後病人", en: "Post-TKA patients" } },
      qualifier: { label: { zh: "限定條件", en: "Qualifier" }, rating: { zh: "（無）", en: "(None)" } },
    },
    errorElements: ["direction", "qualifier"],
    errorExplanations: {
      direction: { zh: "效益 < MID + 有替代方案 + 有成本風險 → 方向應為「不使用 (Against)」。「我們建議不常規使用」。", en: "Benefits < MID + alternatives + costs → direction should be 'Against.' 'We suggest against routine use.'" },
      qualifier: { zh: "應包含證據品質等級和限定條件，如「（低品質證據）」。五要素結構：方向 + 強度 + 族群 + 介入 + 限定條件。", en: "Should include certainty level, e.g., '(low-certainty evidence).' 5-element structure: direction + strength + population + intervention + qualifier." },
    },
  },

  // ERR-3: Case 3 — Wrong strength + wrong population scope
  {
    id: "etd-err-3", format: "error", source: "case3",
    scenario: {
      zh: "隊友的建議聲明：「針對所有心衰竭病人，我們推薦 (recommend) 使用靜脈鐵劑補充以減少住院（中等品質證據，NNT = 16）。」\n\nGRADE：中 (Moderate)。研究族群為 HFrEF + IDA。",
      en: "Teammate's statement: 'For all heart failure patients, we recommend IV iron supplementation to reduce hospitalization (moderate-certainty evidence, NNT = 16).'\n\nGRADE: Moderate. Study population was HFrEF + IDA.",
    },
    prompt: { zh: "隊友的建議聲明有 2 個錯誤，請點選。", en: "Teammate's recommendation has 2 errors. Click them." },
    shownEtd: {
      strength: { label: { zh: "建議強度", en: "Strength" }, rating: { zh: "強烈 (Strong)", en: "Strong" } },
      wording: { label: { zh: "用語", en: "Wording" }, rating: { zh: "「我們推薦 (recommend)」", en: "'We recommend'" } },
      direction: { label: { zh: "方向", en: "Direction" }, rating: { zh: "使用 (For)", en: "For" } },
      population: { label: { zh: "族群", en: "Population" }, rating: { zh: "所有心衰竭病人", en: "All heart failure patients" } },
      qualifier: { label: { zh: "限定條件", en: "Qualifier" }, rating: { zh: "中等品質證據，NNT = 16", en: "Moderate certainty, NNT = 16" } },
    },
    errorElements: ["strength", "population"],
    errorExplanations: {
      strength: { zh: "中等證據品質 → 條件式 (Conditional)，用「建議 (suggest)」不用「推薦 (recommend)」。", en: "Moderate certainty → Conditional, use 'suggest' not 'recommend.'" },
      population: { zh: "證據僅來自 HFrEF + IDA 研究，不能推廣到「所有心衰竭病人」。應限定為「HFrEF 合併 IDA 病人」。", en: "Evidence only from HFrEF + IDA studies — can't generalize to 'all HF patients.' Should specify 'HFrEF patients with IDA.'" },
    },
  },
];

export default etdPractice;
