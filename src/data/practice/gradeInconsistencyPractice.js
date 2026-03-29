// src/data/practice/gradeInconsistencyPractice.js
// GRADE Inconsistency domain — 9 questions (3 MC + 3 fill + 3 error)

const gradeInconsistencyPractice = [
  // MC-1: Low I², consistent direction (Case 1)
  { id: "grade-incon-mc-1", format: "mc", source: "case1",
    scenario: { zh: "Atropine SR：12 篇 RCT，I² = 18%，所有研究都顯示 atropine 減緩近視進展（效應方向一致），效應量範圍 -0.15D 到 -0.45D/年。預測區間不跨越 null。", en: "Atropine SR: 12 RCTs, I² = 18%, all show atropine slows myopia (consistent direction), effect sizes -0.15D to -0.45D/year. Prediction interval doesn't cross null." },
    prompt: { zh: "GRADE 不一致性域，怎麼判斷？", en: "GRADE Inconsistency domain judgment?" },
    correctIndex: 0,
    options: [
      { label: { zh: "未降級 — I² 低且方向一致", en: "No downgrade — low I², consistent direction" }, explanation: { zh: "✓ I² = 18%（低），方向一致，預測區間不跨 null。", en: "✓ I² = 18% (low), consistent direction, prediction interval doesn't cross null." } },
      { label: { zh: "降 1 級 — 效應量範圍大 (0.15–0.45)", en: "Downgrade 1 — wide effect size range" }, explanation: { zh: "✗ 方向一致且 I² 低——效應量有變異是正常的。", en: "✗ Consistent direction with low I² — some variation in magnitude is normal." } },
      { label: { zh: "降 1 級 — 需次族群分析確認", en: "Downgrade 1 — need subgroup analysis" }, explanation: { zh: "✗ I² = 18% 時不必為了異質性去做次族群分析。", en: "✗ With I² = 18%, subgroup analysis for heterogeneity isn't needed." } },
      { label: { zh: "無法判斷 — 需要看森林圖", en: "Can't tell — need forest plot" }, explanation: { zh: "✗ I²、方向一致性、預測區間已足夠判斷。", en: "✗ I², direction consistency, and prediction interval are sufficient." } },
    ],
  },
  // MC-2: High I², inconsistent direction (Case 2)
  { id: "grade-incon-mc-2", format: "mc", source: "case2",
    scenario: { zh: "CPM for TKA SR：6 篇 RCT，I² = 78%。3 篇顯示 CPM 改善 ROM (+5° 到 +12°)，2 篇無差異，1 篇顯示 CPM 組略差 (-2°)。次族群分析顯示異質性來源可能是 CPM 使用時數（>6hr/day vs. <6hr/day）。", en: "CPM TKA SR: 6 RCTs, I² = 78%. 3 show CPM improves ROM (+5° to +12°), 2 no difference, 1 slightly worse (-2°). Subgroup suggests CPM duration (>6hr vs <6hr) explains heterogeneity." },
    prompt: { zh: "GRADE 不一致性域？", en: "GRADE Inconsistency?" },
    correctIndex: 1,
    options: [
      { label: { zh: "未降級 — 次族群分析解釋了異質性", en: "No downgrade — subgroup explains heterogeneity" }, explanation: { zh: "✗ 次族群分析能解釋原因但不能消除不一致性的事實。I² 仍然是 78%。", en: "✗ Subgroup explains why but doesn't eliminate the inconsistency. I² is still 78%." } },
      { label: { zh: "降 1 級 — I² 高且效應方向不一致", en: "Downgrade 1 — high I² with inconsistent direction" }, explanation: { zh: "✓ I² = 78% 高度異質性，效應方向不一致（有研究顯示 CPM 無效或略差）。即使有次族群解釋，整體仍需降級。", en: "✓ I² = 78% high heterogeneity with inconsistent direction. Even with subgroup explanation, overall still warrants downgrade." } },
      { label: { zh: "降 2 級 — 非常嚴重不一致", en: "Downgrade 2 — very serious" }, explanation: { zh: "✗ 有次族群分析能部分解釋，且只有 1 篇方向相反。降 1 級較合理。", en: "✗ Subgroup partially explains, only 1 study opposite direction. Downgrade 1 is more appropriate." } },
      { label: { zh: "不降級 — 只有 6 篇，I² 不可靠", en: "No downgrade — only 6 studies, I² unreliable" }, explanation: { zh: "✗ I² 在少數研究時確實不穩定，但這裡效應方向也不一致——要綜合判斷。", en: "✗ I² is unstable with few studies, but inconsistent directions confirm the concern." } },
    ],
  },
  // MC-3: Moderate I², all same direction (New)
  { id: "grade-incon-mc-3", format: "mc", source: "new",
    scenario: { zh: "一篇 DPP-4 inhibitor vs. placebo 治療 T2DM 的 SR：20 篇 RCT，I² = 52%。所有研究效應方向一致（DPP-4i 降低 HbA1c），效應量 -0.4% 到 -0.9%。預測區間不跨越 null。重疊的 CI 較多。", en: "DPP-4i vs placebo for T2DM SR: 20 RCTs, I² = 52%. All studies consistent direction (DPP-4i lowers HbA1c), effect sizes -0.4% to -0.9%. Prediction interval doesn't cross null. Good CI overlap." },
    prompt: { zh: "GRADE 不一致性域？", en: "GRADE Inconsistency?" },
    correctIndex: 0,
    options: [
      { label: { zh: "未降級 — 方向一致、預測區間不跨 null", en: "No downgrade — consistent direction, prediction interval doesn't cross null" }, explanation: { zh: "✓ 雖然 I² = 52%（中度），但方向完全一致、預測區間不跨 null。中度 I² 不自動降級——要看臨床意義。", en: "✓ I² = 52% is moderate, but fully consistent direction and prediction interval not crossing null. Moderate I² doesn't auto-downgrade — check clinical significance." } },
      { label: { zh: "降 1 級 — I² > 50% 就要降", en: "Downgrade 1 — I² > 50% = downgrade" }, explanation: { zh: "✗ I² 沒有自動降級的閾值。要看方向一致性、CI 重疊、預測區間。", en: "✗ There's no automatic I² threshold. Check direction, CI overlap, prediction interval." } },
      { label: { zh: "降 1 級 — 效應量變異大 (0.4–0.9%)", en: "Downgrade 1 — effect size variation (0.4–0.9%)" }, explanation: { zh: "✗ 0.4–0.9% 的範圍在臨床上可能不算有意義的差異。方向一致更重要。", en: "✗ 0.4–0.9% range may not be clinically meaningful variation. Consistent direction matters more." } },
      { label: { zh: "降 2 級", en: "Downgrade 2" }, explanation: { zh: "✗ 完全不合理——方向一致、中度 I²。", en: "✗ Completely unjustified — consistent direction, moderate I²." } },
    ],
  },

  // FILL-1: Case 3 IV Iron
  { id: "grade-incon-fill-1", format: "fill", source: "case3",
    scenario: { zh: "IV iron for HF SR：14 篇 RCT，I² = 22%，所有研究顯示 IV iron 減少心衰竭住院。預測區間不跨 null。\n\n另外：95% CI 為 OR 0.74 [0.62, 0.89]，MID threshold 為 OR = 1（null）。", en: "IV iron HF SR: 14 RCTs, I² = 22%, all show IV iron reduces HF hospitalization. Prediction interval doesn't cross null.\n\nAlso: 95% CI is OR 0.74 [0.62, 0.89], MID is OR = 1 (null)." },
    prompt: { zh: "以下 GRADE 有兩個空格。", en: "Two blanks in this GRADE assessment." },
    prefilled: { rob: { label: { zh: "誤差風險", en: "RoB" }, rating: { zh: "未降級", en: "No downgrade" } }, indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } }, pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } } },
    blanks: [
      { element: "inconsistency", label: { zh: "不一致性", en: "Inconsistency" }, correctIndex: 0, options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級", en: "Downgrade 1" }, { zh: "降 2 級", en: "Downgrade 2" } ], explanations: [ { zh: "✓ I² = 22% 低，方向一致，預測區間不跨 null。", en: "✓ I² = 22% low, consistent direction, prediction interval OK." }, { zh: "I² 低且一致，不需降級", en: "Low I² and consistent" }, { zh: "不合理", en: "Unjustified" } ] },
      { element: "imprecision", label: { zh: "不精確性", en: "Imprecision" }, correctIndex: 0, options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級", en: "Downgrade 1" }, { zh: "降 2 級", en: "Downgrade 2" } ], explanations: [ { zh: "✓ CI [0.62, 0.89] 完全排除 null (OR=1)。", en: "✓ CI [0.62, 0.89] clearly excludes null (OR=1)." }, { zh: "CI 排除 null 且範圍合理", en: "CI excludes null, reasonable range" }, { zh: "不合理", en: "Unjustified" } ] },
    ],
  },
  // FILL-2: New - moderate I²
  { id: "grade-incon-fill-2", format: "fill", source: "new",
    scenario: { zh: "Metformin vs. placebo 預防 T2DM 的 SR：15 篇 RCT，I² = 58%。12 篇顯示 metformin 有效，3 篇無差異（但 CI 寬）。預測區間跨越 null。\n\n另外：CI 為 RR 0.68 [0.55, 0.84]，不跨 null。但 PICO 中的 P 與案例匹配良好。", en: "Metformin T2DM prevention SR: 15 RCTs, I² = 58%. 12 show benefit, 3 no difference (wide CI). Prediction interval crosses null.\n\nAlso: CI is RR 0.68 [0.55, 0.84], excludes null. PICO matches case well." },
    prompt: { zh: "兩個空格。", en: "Two blanks." },
    prefilled: { rob: { label: { zh: "誤差風險", en: "RoB" }, rating: { zh: "未降級", en: "No downgrade" } }, imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } }, pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } } },
    blanks: [
      { element: "inconsistency", label: { zh: "不一致性", en: "Inconsistency" }, correctIndex: 1, options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級", en: "Downgrade 1" }, { zh: "降 2 級", en: "Downgrade 2" } ], explanations: [ { zh: "I² = 58% 加上預測區間跨 null——需降級", en: "I² = 58% plus prediction interval crosses null — downgrade needed" }, { zh: "✓ I² = 58% 中高度，且預測區間跨 null——表示未來研究可能出現不同結論。降 1 級。", en: "✓ I² = 58% moderate-high, prediction interval crosses null — future studies may differ. Downgrade 1." }, { zh: "不至於降 2 級", en: "Not severe enough for 2" } ] },
      { element: "indirectness", label: { zh: "不直接性", en: "Indirectness" }, correctIndex: 0, options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級", en: "Downgrade 1" }, { zh: "降 2 級", en: "Downgrade 2" } ], explanations: [ { zh: "✓ PICO 匹配良好。", en: "✓ PICO matches well." }, { zh: "PICO 匹配，不需降級", en: "PICO matches" }, { zh: "不合理", en: "Unjustified" } ] },
    ],
  },
  // FILL-3: Case 1 low heterogeneity
  { id: "grade-incon-fill-3", format: "fill", source: "case1",
    scenario: { zh: "Atropine 0.05% vs. placebo SR（次族群）：5 篇 RCT，I² = 8%，效應方向完全一致。CI 為 WMD -0.35D [-0.48, -0.22]，MID = 0.25D。\n\n另外：所有研究在亞洲兒童進行，案例也是亞洲兒童。", en: "Atropine 0.05% vs placebo SR (subgroup): 5 RCTs, I² = 8%, fully consistent direction. CI: WMD -0.35D [-0.48, -0.22], MID = 0.25D.\n\nAlso: All studies in Asian children; case is also Asian child." },
    prompt: { zh: "兩個空格。", en: "Two blanks." },
    prefilled: { rob: { label: { zh: "誤差風險", en: "RoB" }, rating: { zh: "未降級", en: "No downgrade" } }, pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } }, imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } } },
    blanks: [
      { element: "inconsistency", label: { zh: "不一致性", en: "Inconsistency" }, correctIndex: 0, options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級", en: "Downgrade 1" }, { zh: "降 2 級", en: "Downgrade 2" } ], explanations: [ { zh: "✓ I² = 8% 極低，方向完全一致。", en: "✓ I² = 8% very low, fully consistent." }, { zh: "I² 極低不需降級", en: "Very low I²" }, { zh: "不合理", en: "No" } ] },
      { element: "indirectness", label: { zh: "不直接性", en: "Indirectness" }, correctIndex: 0, options: [ { zh: "未降級", en: "No downgrade" }, { zh: "降 1 級", en: "Downgrade 1" }, { zh: "降 2 級", en: "Downgrade 2" } ], explanations: [ { zh: "✓ 研究族群（亞洲兒童）與案例完全匹配。", en: "✓ Study population (Asian children) matches case perfectly." }, { zh: "族群匹配", en: "Population matches" }, { zh: "不合理", en: "No" } ] },
    ],
  },

  // ERR-1: Case 2 CPM
  { id: "grade-incon-err-1", format: "error", source: "case2",
    scenario: { zh: "CPM SR：I² = 72%，效應方向不一致（-2° 到 +12°），預測區間跨 null。但漏斗圖對稱、PICO 匹配。6 篇 RCT 全部低偏誤風險。", en: "CPM SR: I² = 72%, inconsistent direction (-2° to +12°), prediction interval crosses null. Funnel symmetric, PICO matches. 6 RCTs all low risk." },
    prompt: { zh: "隊友 GRADE 有 2 個錯誤。", en: "Teammate's GRADE has 2 errors." },
    shownGrade: { rob: { label: { zh: "誤差風險", en: "RoB" }, rating: { zh: "未降級", en: "No downgrade" } }, inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "未降級", en: "No downgrade" } }, indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "降 1 級", en: "Downgrade 1" } }, imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } }, pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } } },
    errorElements: ["inconsistency", "indirectness"],
    errorExplanations: { inconsistency: { zh: "I² = 72% 高、方向不一致、預測區間跨 null——應「降 1 級」。", en: "I² = 72% high, inconsistent direction, prediction crosses null — should 'Downgrade 1.'" }, indirectness: { zh: "PICO 匹配——應「未降級」。", en: "PICO matches — should be 'No downgrade.'" } },
  },
  // ERR-2: Case 3 IV Iron
  { id: "grade-incon-err-2", format: "error", source: "case3",
    scenario: { zh: "IV iron HF SR：I² = 22%，方向一致。CI OR 0.74 [0.62, 0.89] 排除 null。研究為 HFrEF 案例為 HFrEF（匹配）。漏斗圖對稱。", en: "IV iron HF SR: I² = 22%, consistent direction. CI OR 0.74 [0.62, 0.89] excludes null. Studies are HFrEF, case is HFrEF (match). Funnel symmetric." },
    prompt: { zh: "隊友 GRADE 有 2 個錯誤。", en: "2 errors." },
    shownGrade: { rob: { label: { zh: "誤差風險", en: "RoB" }, rating: { zh: "未降級", en: "No downgrade" } }, inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "降 1 級", en: "Downgrade 1" } }, indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } }, imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "降 1 級", en: "Downgrade 1" } }, pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } } },
    errorElements: ["inconsistency", "imprecision"],
    errorExplanations: { inconsistency: { zh: "I² = 22% 低、方向一致——應「未降級」。", en: "I² = 22% low, consistent — 'No downgrade.'" }, imprecision: { zh: "CI [0.62, 0.89] 排除 null——應「未降級」。", en: "CI excludes null — 'No downgrade.'" } },
  },
  // ERR-3: New
  { id: "grade-incon-err-3", format: "error", source: "new",
    scenario: { zh: "Bisphosphonate 預防骨折 SR：25 篇 RCT，I² = 12%，方向一致。CI RR 0.60 [0.52, 0.69]。PICO 匹配（停經後女性骨質疏鬆）。漏斗圖輕度不對稱。", en: "Bisphosphonate fracture prevention SR: 25 RCTs, I² = 12%, consistent direction. CI RR 0.60 [0.52, 0.69]. PICO matches (postmenopausal osteoporosis). Funnel mildly asymmetric." },
    prompt: { zh: "2 個錯誤。", en: "2 errors." },
    shownGrade: { rob: { label: { zh: "誤差風險", en: "RoB" }, rating: { zh: "未降級", en: "No downgrade" } }, inconsistency: { label: { zh: "不一致性", en: "Inconsistency" }, rating: { zh: "降 1 級", en: "Downgrade 1" } }, indirectness: { label: { zh: "不直接性", en: "Indirectness" }, rating: { zh: "未降級", en: "No downgrade" } }, imprecision: { label: { zh: "不精確性", en: "Imprecision" }, rating: { zh: "未降級", en: "No downgrade" } }, pubBias: { label: { zh: "發表偏誤", en: "Pub. bias" }, rating: { zh: "未降級", en: "No downgrade" } } },
    errorElements: ["inconsistency", "pubBias"],
    errorExplanations: { inconsistency: { zh: "I² = 12% 極低且方向一致——應「未降級」。", en: "I² = 12% very low, consistent — 'No downgrade.'" }, pubBias: { zh: "漏斗圖輕度不對稱——應至少「不確定」或考慮「降 1 級」而非忽略。標記為「未降級」不夠謹慎。", en: "Mildly asymmetric funnel — should at least note concern, not ignore. 'No downgrade' is insufficiently cautious." } },
  },
];

export default gradeInconsistencyPractice;
