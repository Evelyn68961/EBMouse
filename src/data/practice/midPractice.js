// src/data/practice/midPractice.js
// MID (Minimal Important Difference) — 5 practice questions covering:
//   threshold choice, basic CI-vs-MID, double-threshold, baseline risk variation, MID credibility.
// All MC format (no row keys required). Sources: Core GRADE 2/7 + Guidance 35 + Devji 2020.

const midPractice = [

  // ═══ MC-1: Null vs MID threshold choice ═══
  {
    id: "mid-mc-1", format: "mc", source: "new",
    scenario: {
      zh: "一個慢性疼痛指引小組要評估新型止痛藥。他們的統合分析顯示 VAS 疼痛降低 WMD = 1.2 cm（CI 0.8–1.6）。已發表的病人價值偏好研究顯示 VAS pain 的 MID = 1.5 cm。",
      en: "A guideline panel for chronic pain is evaluating a new analgesic. Their meta-analysis shows VAS pain reduction WMD = 1.2 cm (CI 0.8–1.6). A published patient values study reports VAS pain MID = 1.5 cm.",
    },
    prompt: {
      zh: "他們應該選擇哪個閾值來評估不精確性？",
      en: "Which threshold should they use to assess imprecision?",
    },
    correctIndex: 1,
    options: [
      { label: { zh: "Null 閾值（CI 是否跨越 0）", en: "Null threshold (does CI cross 0?)" }, explanation: { zh: "✗ Null 閾值適合系統性回顧或不想做價值判斷的場景。指引小組要做推薦，必須連結到病人價值偏好 → 應使用 MID。", en: "✗ Null threshold suits systematic reviews or scenarios avoiding value judgments. Guideline panels making recommendations must connect to patient values → use MID." } },
      { label: { zh: "MID 閾值 = 1.5 cm", en: "MID threshold = 1.5 cm" }, explanation: { zh: "✓ 正確！指引小組應使用 MID 閾值來判斷效果是否「重要」。Core GRADE 7 明確：HTA 與指引情境下 MID 是首選。本例 MID = 1.5 已有 anchor-based 證據支持。", en: "✓ Correct! Guideline panels should use MID to judge whether the effect is 'important'. Core GRADE 7 is explicit: in HTA / guideline contexts, MID is preferred. Here MID = 1.5 has anchor-based evidence." } },
      { label: { zh: "兩個都用，做敏感度分析", en: "Use both, run sensitivity analysis" }, explanation: { zh: "✗ 應該選擇一個主要閾值。雙閾值會讓判斷標準模糊。敏感度分析可用於 MID 內的不同數值（如 1.0 vs 1.5），但 null vs MID 應該明確選一個。", en: "✗ Choose one primary threshold. Using both blurs the judgment criteria. Sensitivity analyses can vary MID values (e.g., 1.0 vs 1.5), but the null-vs-MID choice itself should be definite." } },
      { label: { zh: "資料不足，無法評確定性", en: "Insufficient data to rate certainty" }, explanation: { zh: "✗ 已有 anchor-based MID + 完整 CI 資料，足夠進行評估。「資料不足」不是合理選項。", en: "✗ With anchor-based MID + full CI data, you have enough to rate. 'Insufficient data' isn't a reasonable answer here." } },
    ],
  },

  // ═══ MC-2: CI crossing MID — basic case ═══
  {
    id: "mid-mc-2", format: "mc", source: "new",
    scenario: {
      zh: "一份 RCT 統合分析顯示減重介入：WMD = 3.5 kg 減少（CI 2.0–5.0）。經 anchor-based 研究確認本族群的 MID = 4 kg。",
      en: "An RCT meta-analysis shows a weight loss intervention: WMD = 3.5 kg reduction (CI 2.0–5.0). An anchor-based study confirms MID = 4 kg in this population.",
    },
    prompt: {
      zh: "使用 MID 閾值，不精確性應該如何評？",
      en: "Using the MID threshold, how should imprecision be rated?",
    },
    correctIndex: 1,
    options: [
      { label: { zh: "不扣分（CI 達統計顯著）", en: "No downgrade (CI is statistically significant)" }, explanation: { zh: "✗ MID 評估和統計顯著性無關。重點是 CI 是否跨越 MID，不是是否跨越 null。本例 CI 跨越 MID = 4。", en: "✗ MID rating is unrelated to statistical significance. The key is whether CI crosses MID, not whether it crosses null. Here CI crosses MID = 4." } },
      { label: { zh: "扣 1 分（CI 跨越 MID = 4）", en: "Downgrade 1 (CI crosses MID = 4)" }, explanation: { zh: "✓ 正確！點估計值 3.5 < MID 4 → target = 「微小／不重要效果」。但 CI 上限 5.0 > MID 4 → CI 跨越 MID → 扣 1 分。我們不確定真實效果是「微小」還是「重要」。", en: "✓ Correct! Point estimate 3.5 < MID 4 → target = 'trivial / unimportant effect'. But CI upper 5.0 > MID 4 → CI crosses MID → downgrade 1. We're uncertain whether the true effect is trivial or important." } },
      { label: { zh: "扣 2 分（CI 寬度大）", en: "Downgrade 2 (CI is wide)" }, explanation: { zh: "✗ 扣 2 分需要 CI 跨越 2 個閾值（如同時跨越 MID for benefit 與 MID for harm）。本例只跨越 1 個。", en: "✗ Downgrade 2 requires crossing 2 thresholds (e.g., MID for benefit AND MID for harm). Here only 1 is crossed." } },
      { label: { zh: "不需要指定 MID（CI 排除 0）", en: "No MID needed (CI excludes 0)" }, explanation: { zh: "✗ 本例的核心問題就是「效果是否重要」（即與 MID 比較）。CI 排除 0 只回答「是否存在效果」。", en: "✗ The whole point here is 'is the effect important?' (i.e., MID comparison). CI excluding 0 only answers 'does an effect exist?'" } },
    ],
  },

  // ═══ MC-3: Double-threshold (CI crosses MID for benefit AND harm) ═══
  {
    id: "mid-mc-3", format: "mc", source: "new",
    scenario: {
      zh: "新型抗血小板藥 vs 標準照護的中風風險：RR = 0.85 (CI 0.55–1.31)。基準風險 50/1000。絕對 RD = -7/1000（CI：-22 to +14）。\n\n已建立的 MID 為 10/1000（同時用於「重要益處」MID = -10/1000 與「重要傷害」MID = +10/1000）。",
      en: "New antiplatelet vs standard care for stroke risk: RR = 0.85 (CI 0.55–1.31). Baseline risk 50/1000. Absolute RD = -7/1000 (CI: -22 to +14).\n\nEstablished MID = 10/1000 (used for both 'important benefit' MID = -10/1000 and 'important harm' MID = +10/1000).",
    },
    prompt: {
      zh: "不精確性扣幾分？",
      en: "How many levels to downgrade for imprecision?",
    },
    correctIndex: 2,
    options: [
      { label: { zh: "不扣分（點估計值偏向治療有利）", en: "No downgrade (point estimate favors treatment)" }, explanation: { zh: "✗ 點估計值方向不影響扣分判斷。重點是 CI 範圍。本例 CI 從 -22（重要益處）延伸到 +14（重要傷害）—— 兩端都超出 MID。", en: "✗ Point estimate direction doesn't drive downgrading. CI range does. Here CI spans -22 (important benefit) to +14 (important harm) — both ends past MID." } },
      { label: { zh: "扣 1 分（CI 跨越 1 個 MID）", en: "Downgrade 1 (CI crosses 1 MID)" }, explanation: { zh: "✗ CI 同時跨越 MID for benefit (-10) 和 MID for harm (+10) → 跨越 2 個閾值 → 扣 2 分。", en: "✗ CI crosses BOTH MID for benefit (-10) and MID for harm (+10) → 2 thresholds → downgrade 2." } },
      { label: { zh: "扣 2 分（CI 跨越「重要益處」與「重要傷害」MID）", en: "Downgrade 2 (CI crosses both 'important benefit' and 'important harm' MIDs)" }, explanation: { zh: "✓ 正確！CI 從 -22 延伸到 +14，同時跨越 -10（益處 MID）與 +10（傷害 MID）→ 跨 2 個閾值 → 扣 2 分。白話：「藥物可能 (may) 減少中風」，而非「很可能 (likely) 減少」。Core GRADE 2 vasculitis 範例的典型應用。", en: "✓ Correct! CI spans -22 to +14, crossing BOTH -10 (benefit MID) and +10 (harm MID) → 2 thresholds → downgrade 2. Plain language: 'drug may reduce stroke', not 'likely reduces'. Classic Core GRADE 2 vasculitis-style application." } },
      { label: { zh: "扣 3 分（CI 寬度極大）", en: "Downgrade 3 (CI is very wide)" }, explanation: { zh: "✗ 扣 3 分需要 CI 跨越 3 個閾值（如同時跨越 small / moderate / large 的邊界）。本例只跨越 2 個 MID。", en: "✗ Downgrade 3 requires crossing 3 thresholds (e.g., small / moderate / large boundaries simultaneously). Here only 2 MIDs are crossed." } },
    ],
  },

  // ═══ MC-4: Different baseline risks → different ratings (Guidance 35) ═══
  {
    id: "mid-mc-4", format: "mc", source: "new",
    scenario: {
      zh: "一份心房顫動抗凝藥的 SR：中風的 RR = 0.70（CI 0.50–0.95）。MID = 10/1000。\n\n指引小組考慮兩個族群：\n• 低風險族群（baseline = 20/1000）→ 絕對 RD = -6/1000（CI: -10 to -1）\n• 極高風險族群（baseline = 500/1000）→ 絕對 RD = -150/1000（CI: -250 to -25）",
      en: "An SR of anticoagulants for atrial fibrillation: stroke RR = 0.70 (CI 0.50–0.95). MID = 10/1000.\n\nThe panel considers two groups:\n• Low-risk (baseline = 20/1000) → absolute RD = -6/1000 (CI: -10 to -1)\n• Very-high-risk (baseline = 500/1000) → absolute RD = -150/1000 (CI: -250 to -25)",
    },
    prompt: {
      zh: "兩個族群的不精確性扣分各為多少？",
      en: "What are the imprecision downgrade levels for each group?",
    },
    correctIndex: 2,
    options: [
      { label: { zh: "兩個族群都扣 1 分", en: "Both groups: downgrade 1" }, explanation: { zh: "✗ Guidance 35 的關鍵概念：相同的 RR 在不同 baseline 下產生不同的絕對效果與不同的不精確性。不能一概而論。", en: "✗ Key concept from Guidance 35: same RR yields different absolute effects and different imprecision at different baselines. Don't generalize." } },
      { label: { zh: "兩個族群都不扣分", en: "Both groups: no downgrade" }, explanation: { zh: "✗ 低風險族群的 CI 上限 -1 接近 trivial 範圍；CI 下限剛好觸及 MID -10 → 可合理判定為跨越 → 扣 1 分。", en: "✗ Low-risk CI upper bound -1 is near trivial; lower bound touches MID -10 → reasonably counts as crossing → downgrade 1." } },
      { label: { zh: "低風險：扣 1；極高風險：不扣", en: "Low-risk: downgrade 1; Very-high-risk: no downgrade" }, explanation: { zh: "✓ 正確！低風險族群 CI = -10 to -1：跨越 MID = -10，且大部分 CI 在 trivial 範圍 → 不確定是「微小」或「重要」效果 → 扣 1 分。極高風險族群 CI = -250 to -25：整段 CI 都遠超過 MID = -10 → 高確定性「重要益處」→ 不扣分。同一 SR、同一 MID，兩個族群得出相反的推薦。", en: "✓ Correct! Low-risk CI = -10 to -1: crosses MID = -10, with most of CI in trivial range → uncertain whether 'trivial' or 'important' → downgrade 1. Very-high-risk CI = -250 to -25: entire CI far beyond MID = -10 → high certainty of 'important benefit' → no downgrade. Same SR, same MID, opposite recommendations across groups." } },
      { label: { zh: "低風險：不扣；極高風險：扣 1", en: "Low-risk: no downgrade; Very-high-risk: downgrade 1" }, explanation: { zh: "✗ 方向相反。基準風險低的族群 CI 較窄但更靠近 MID → 不確定性高；高風險族群 CI 較寬但都遠超過 MID → 確定性高。", en: "✗ Reversed. Low-baseline group has narrower CI but closer to MID → more uncertainty; high-baseline group has wider CI but well past MID → more certainty." } },
    ],
  },

  // ═══ MC-5: MID credibility — choosing between two MIDs ═══
  {
    id: "mid-mc-5", format: "mc", source: "new",
    scenario: {
      zh: "你在文獻中找到 SF-36 Physical Component Summary 在你目標族群的兩個 MID 估計值：\n\n• 選項 A：MID = 5 分。N = 42。錨：臨床醫師的整體評分。錨與量表的 ρ = 0.18。未提供 95% CI。\n• 選項 B：MID = 3 分。N = 520。錨：病人自評的整體變化。錨與量表的 ρ = 0.62。95% CI 2.5–3.5。",
      en: "You find two published MID estimates for SF-36 Physical Component Summary in your target population:\n\n• Option A: MID = 5 points. N = 42. Anchor: clinician global rating. ρ between anchor and scale = 0.18. No 95% CI given.\n• Option B: MID = 3 points. N = 520. Anchor: patient global rating of change. ρ = 0.62. 95% CI 2.5–3.5.",
    },
    prompt: {
      zh: "你應該選用哪個 MID？",
      en: "Which MID should you use?",
    },
    correctIndex: 1,
    options: [
      { label: { zh: "選項 A（較大的 MID 更保守，較不容易扣分）", en: "Option A (larger MID is more conservative — less downgrading)" }, explanation: { zh: "✗ 不應該以「對自己有利」來選 MID（confirmation bias）。應根據 Devji 五項可信度準則選擇。選項 A 在多項準則表現差。", en: "✗ Don't pick the MID that favors your conclusions (confirmation bias). Use Devji's 5 credibility criteria. Option A fails on multiple criteria." } },
      { label: { zh: "選項 B（多項可信度準則優於 A）", en: "Option B (better on multiple credibility criteria)" }, explanation: { zh: "✓ 正確！選項 B 的：(1) 病人錨而非醫師錨（病人觀點 ✓）；(2) 強相關 ρ = 0.62 > 0.18（錨與量表測量相同構念 ✓）；(3) 大樣本 N=520 → 提供 95% CI（精確度 ✓）。選項 A 在這三項都較差。", en: "✓ Correct! Option B has: (1) patient anchor not clinician (patient perspective ✓); (2) strong correlation ρ = 0.62 vs 0.18 (anchor and scale measure same construct ✓); (3) large N=520 with 95% CI provided (precision ✓). Option A is weaker on all three criteria." } },
      { label: { zh: "兩個取平均（4 分）", en: "Average them (4 points)" }, explanation: { zh: "✗ MID 的選擇是品質判斷，不是統計平均。應以 Devji 準則挑選最可信者。", en: "✗ Choosing MID is a quality judgment, not a statistical average. Apply Devji criteria to pick the most credible." } },
      { label: { zh: "都不採用，改用 distribution-based MID（如 0.5 SD）", en: "Reject both, use distribution-based MID (e.g., 0.5 SD)" }, explanation: { zh: "✗ 選項 B 是高品質的 anchor-based MID。Distribution-based 是 anchor-based 都不可得時的退路；不應在有 anchor-based 證據時還用 distribution-based。", en: "✗ Option B is a high-quality anchor-based MID. Distribution-based is the fallback when no anchor-based exists; don't fall back when good anchor-based evidence is available." } },
    ],
  },

];

export default midPractice;
