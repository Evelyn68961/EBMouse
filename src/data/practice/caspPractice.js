// src/data/practice/caspPractice.js
// CASP-SR Checklist — 9 practice questions (3 MC + 3 fill-blank + 3 error-spot)
// CASP questions use a different shape: snippet → score judgment
// "mc": pick correct score for a described snippet
// "fill": partial CASP table, fill blank scores via dropdown
// "error": full CASP table with 2 wrong scores, click to spot them

const caspPractice = [

  // ═══ MULTIPLE CHOICE ═══

  // MC-1: Q3a search comprehensiveness (Case 1 - Atropine)
  {
    id: "casp-mc-1", format: "mc", source: "case1",
    scenario: {
      zh: "一篇 atropine 治療近視的 SR 方法中寫到：「我們搜尋了 PubMed 和 Cochrane Library，限定英文文獻，搜尋時間 2015–2023 年。未搜尋灰色文獻或未發表研究。」",
      en: "An SR on atropine for myopia states in its methods: 'We searched PubMed and Cochrane Library, limited to English articles, 2015–2023. No grey literature or unpublished studies were searched.'",
    },
    prompt: {
      zh: "針對 CASP Q3a（文獻搜尋是否完整？），你會怎麼評分？",
      en: "For CASP Q3a (Was the literature search comprehensive?), how would you score?",
    },
    correctIndex: 1,
    options: [
      { label: { zh: "是 😀 — 搜了兩個重要資料庫", en: "Yes 😀 — Searched two major databases" }, explanation: { zh: "✗ 只搜兩個資料庫不夠——缺 Embase。英文限定+時間限制+無灰色文獻都是缺陷。", en: "✗ Two databases isn't enough — missing Embase. English-only + time limits + no grey literature are all weaknesses." } },
      { label: { zh: "否 😟 — 有多項搜尋限制", en: "No 😟 — Multiple search limitations" }, explanation: { zh: "✓ 正確！缺 Embase、英文限定（語言偏誤）、時間限制（可能漏掉早期關鍵研究）、無灰色文獻（發表偏誤風險）。", en: "✓ Correct! Missing Embase, English-only (language bias), time limits (may miss early key studies), no grey literature (publication bias risk)." } },
      { label: { zh: "不確定 😐 — 無法判斷", en: "Uncertain 😐 — Can't tell" }, explanation: { zh: "✗ 方法描述已經足夠清楚，可以明確判斷有限制。「不確定」適用於資訊不足的情況。", en: "✗ The methods are clear enough to identify limitations. 'Uncertain' is for insufficient information." } },
      { label: { zh: "是 😀 — 有搜 Cochrane 就足夠", en: "Yes 😀 — Cochrane is enough" }, explanation: { zh: "✗ Cochrane 收錄範圍有限，不能取代完整的多資料庫搜尋。", en: "✗ Cochrane has limited coverage and can't replace a comprehensive multi-database search." } },
    ],
  },

  // MC-2: Q4 risk of bias assessment (Case 3 - IV Iron)
  {
    id: "casp-mc-2", format: "mc", source: "case3",
    scenario: {
      zh: "一篇 IV iron 治療心衰竭的 SR 寫到：「使用 Cochrane Risk of Bias Tool 2.0 評估納入 RCT 的偏誤風險。僅由一位研究者完成評估，未進行獨立雙人評估。」",
      en: "An SR on IV iron for HF states: 'Risk of bias in included RCTs was assessed using the Cochrane Risk of Bias Tool 2.0. Assessment was performed by a single reviewer without independent dual assessment.'",
    },
    prompt: {
      zh: "針對 CASP Q4（是否評估初級研究的效度？），你會怎麼評分？",
      en: "For CASP Q4 (Was study validity assessed?), how would you score?",
    },
    correctIndex: 2,
    options: [
      { label: { zh: "是 😀 — 有用 RoB 2.0 工具", en: "Yes 😀 — Used RoB 2.0 tool" }, explanation: { zh: "✗ 雖然使用了正確的工具，但只有一位研究者評估——缺乏獨立雙人驗證，品質不完全。", en: "✗ Correct tool was used, but only one reviewer assessed — lacks independent verification, not fully rigorous." } },
      { label: { zh: "否 😟 — 沒有正式工具", en: "No 😟 — No formal tool used" }, explanation: { zh: "✗ 有使用 Cochrane RoB 2.0——這是正式工具。問題在於執行方式，不是工具本身。", en: "✗ They did use Cochrane RoB 2.0 — that's a formal tool. The issue is execution, not the tool itself." } },
      { label: { zh: "不確定 😐 — 工具正確但執行有缺陷", en: "Uncertain 😐 — Correct tool but flawed execution" }, explanation: { zh: "✓ 正確！工具選擇正確（RoB 2.0），但缺乏獨立雙人評估是重要缺陷。「不確定」最能反映「部分達標」的情況。", en: "✓ Correct! Tool choice is right (RoB 2.0), but lacking dual independent assessment is a significant flaw. 'Uncertain' best reflects 'partially met' criteria." } },
      { label: { zh: "是 😀 — 一人評估已足夠", en: "Yes 😀 — One reviewer is sufficient" }, explanation: { zh: "✗ CASP 期望獨立雙人評估來減少主觀偏誤。一人評估不符合最佳實踐。", en: "✗ CASP expects independent dual assessment to minimize subjective bias. Single reviewer doesn't meet best practice." } },
    ],
  },

  // MC-3: Q6 data combination / heterogeneity (New - antihypertensives)
  {
    id: "casp-mc-3", format: "mc", source: "new",
    scenario: {
      zh: "一篇比較 ACE inhibitors vs. ARBs 治療高血壓的 SR，使用隨機效應模型進行統合分析。結果顯示 I² = 78%，但作者未進行任何次族群分析或統合迴歸來探索異質性來源，僅在討論中提到「存在高度異質性」。",
      en: "An SR comparing ACE inhibitors vs. ARBs for hypertension used a random-effects model for meta-analysis. Results show I² = 78%, but the authors did not perform any subgroup analysis or meta-regression to explore heterogeneity sources — they only noted 'high heterogeneity exists' in the discussion.",
    },
    prompt: {
      zh: "針對 CASP Q6（合併分析是否適當？），你會怎麼評分？",
      en: "For CASP Q6 (Was data combination appropriate?), how would you score?",
    },
    correctIndex: 1,
    options: [
      { label: { zh: "是 😀 — 有用隨機效應模型", en: "Yes 😀 — Used random-effects model" }, explanation: { zh: "✗ 雖然模型選擇正確（I² 高時用隨機效應），但完全沒有探索異質性來源（次族群/迴歸），這是嚴重缺陷。", en: "✗ Model choice is correct (random-effects for high I²), but completely failing to explore heterogeneity sources is a serious flaw." } },
      { label: { zh: "否 😟 — 高異質性未被探索", en: "No 😟 — High heterogeneity unexplored" }, explanation: { zh: "✓ 正確！I² = 78% 是高度異質性，必須透過次族群分析或統合迴歸探索原因。僅「提到」異質性而不分析是不夠的。", en: "✓ Correct! I² = 78% is high heterogeneity — must explore with subgroup or meta-regression. Just 'mentioning' it without analysis is insufficient." } },
      { label: { zh: "不確定 😐 — I² 78% 不算太高", en: "Uncertain 😐 — I² 78% isn't that high" }, explanation: { zh: "✗ I² > 75% 通常被視為「高度異質性」。這不是邊界值——需要積極探索。", en: "✗ I² > 75% is generally considered 'high heterogeneity.' This isn't borderline — active exploration is needed." } },
      { label: { zh: "是 😀 — 討論中有提到異質性", en: "Yes 😀 — Heterogeneity was mentioned in discussion" }, explanation: { zh: "✗ 在討論中「提到」不等於「探索」。Q6 要求的是實際的統計分析，不是文字敘述。", en: "✗ 'Mentioning' in discussion ≠ 'exploring.' Q6 requires actual statistical analysis, not narrative." } },
    ],
  },

  // ═══ FILL-IN-THE-BLANK ═══
  // Show a partial CASP scoring table with some scores filled, 2 blanks

  // FILL-1: Atropine SR CASP (Case 1)
  {
    id: "casp-fill-1", format: "fill", source: "case1",
    scenario: {
      zh: "你正在評讀 Wei et al. (2023) 的 atropine 近視 SR。以下資訊來自文獻方法：\n• 研究問題明確（PICO 完整）\n• 搜尋了 PubMed、Embase、Cochrane，但限英文\n• 由兩人獨立篩選和擷取資料\n• 使用 Cochrane RoB 2.0 雙人獨立評估\n• I² = 35%，使用隨機效應模型",
      en: "You're appraising Wei et al. (2023) atropine myopia SR. From the methods:\n• Clear research question (full PICO)\n• Searched PubMed, Embase, Cochrane — English only\n• Two independent reviewers for screening and extraction\n• Cochrane RoB 2.0 with dual independent assessment\n• I² = 35%, random-effects model used",
    },
    prompt: { zh: "以下 CASP 評分有兩個空格，請選出正確答案。", en: "This CASP scoring has two blanks. Select the correct answers." },
    prefilled: {
      q1: { label: { zh: "Q1 研究問題明確？", en: "Q1 Clear question?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q4: { label: { zh: "Q4 評估初級研究效度？", en: "Q4 Validity assessed?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q5a: { label: { zh: "Q5a 資料擷取適當？", en: "Q5a Extraction appropriate?" }, score: { zh: "是 😀", en: "Yes 😀" } },
    },
    blanks: [
      {
        element: "q3a",
        label: { zh: "Q3a 文獻搜尋完整？", en: "Q3a Search comprehensive?" },
        correctIndex: 1,
        options: [
          { zh: "是 😀", en: "Yes 😀" },
          { zh: "不確定 😐", en: "Uncertain 😐" },
          { zh: "否 😟", en: "No 😟" },
        ],
        explanations: [
          { zh: "搜了 3 個資料庫但限英文——語言偏誤風險，不能算完全完整", en: "Searched 3 databases but English-only — language bias risk, not fully comprehensive" },
          { zh: "✓ 正確！3 個資料庫是好的，但英文限定是明確缺陷。「不確定」反映部分達標。", en: "✓ Correct! 3 databases is good, but English-only is a clear limitation. 'Uncertain' reflects partial compliance." },
          { zh: "搜了 3 個主要資料庫，不算完全不足", en: "Searched 3 major databases — not fully deficient" },
        ],
      },
      {
        element: "q6",
        label: { zh: "Q6 合併分析適當？", en: "Q6 Combination appropriate?" },
        correctIndex: 0,
        options: [
          { zh: "是 😀", en: "Yes 😀" },
          { zh: "不確定 😐", en: "Uncertain 😐" },
          { zh: "否 😟", en: "No 😟" },
        ],
        explanations: [
          { zh: "✓ 正確！I² = 35% 是中低度異質性，隨機效應模型選擇合理。", en: "✓ Correct! I² = 35% is low-moderate heterogeneity, random-effects model is reasonable." },
          { zh: "I² = 35% 不需要特別擔心——模型選擇合理", en: "I² = 35% isn't concerning — model choice is reasonable" },
          { zh: "I² = 35% 不算高，合併分析是合理的", en: "I² = 35% isn't high — combination is reasonable" },
        ],
      },
    ],
  },

  // FILL-2: CPM SR CASP (Case 2)
  {
    id: "casp-fill-2", format: "fill", source: "case2",
    scenario: {
      zh: "你正在評讀一篇 CPM 用於 TKA 術後的 SR。方法：\n• PICO 明確，搜尋 RCT\n• 搜尋 PubMed、Embase、CINAHL、Cochrane（無語言限制）\n• 篩選由一人完成，有爭議時諮詢第三人\n• 未使用正式的偏誤風險評估工具\n• I² = 62%，使用固定效應模型",
      en: "Appraising a CPM post-TKA SR. Methods:\n• Clear PICO, searched for RCTs\n• Searched PubMed, Embase, CINAHL, Cochrane (no language limits)\n• Screening by one person, third consulted for disputes\n• No formal risk of bias tool used\n• I² = 62%, fixed-effects model used",
    },
    prompt: { zh: "以下 CASP 評分有兩個空格，請選出正確答案。", en: "This CASP scoring has two blanks. Select the correct answers." },
    prefilled: {
      q1: { label: { zh: "Q1 研究問題明確？", en: "Q1 Clear question?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q3a: { label: { zh: "Q3a 搜尋完整？", en: "Q3a Search comprehensive?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q3b: { label: { zh: "Q3b 篩選適當？", en: "Q3b Screening appropriate?" }, score: { zh: "不確定 😐", en: "Uncertain 😐" } },
    },
    blanks: [
      {
        element: "q4",
        label: { zh: "Q4 評估初級研究效度？", en: "Q4 Validity assessed?" },
        correctIndex: 2,
        options: [
          { zh: "是 😀", en: "Yes 😀" },
          { zh: "不確定 😐", en: "Uncertain 😐" },
          { zh: "否 😟", en: "No 😟" },
        ],
        explanations: [
          { zh: "沒有使用正式工具就不能給「是」", en: "Can't give 'Yes' without a formal tool" },
          { zh: "不是資訊不足——明確寫了沒使用工具", en: "Not insufficient info — they clearly stated no tool was used" },
          { zh: "✓ 正確！未使用任何正式偏誤風險評估工具，直接給「否」。", en: "✓ Correct! No formal risk of bias tool was used — clear 'No.'" },
        ],
      },
      {
        element: "q6",
        label: { zh: "Q6 合併分析適當？", en: "Q6 Combination appropriate?" },
        correctIndex: 2,
        options: [
          { zh: "是 😀", en: "Yes 😀" },
          { zh: "不確定 😐", en: "Uncertain 😐" },
          { zh: "否 😟", en: "No 😟" },
        ],
        explanations: [
          { zh: "I² = 62% 用固定效應模型不合理", en: "Fixed-effects with I² = 62% is inappropriate" },
          { zh: "問題很明確——模型選擇有錯", en: "The issue is clear — wrong model choice" },
          { zh: "✓ 正確！I² = 62% 是中高度異質性，應用隨機效應模型而非固定效應。模型選擇錯誤。", en: "✓ Correct! I² = 62% is moderate-high — should use random-effects, not fixed-effects. Wrong model choice." },
        ],
      },
    ],
  },

  // FILL-3: Statin SR (New)
  {
    id: "casp-fill-3", format: "fill", source: "new",
    scenario: {
      zh: "一篇 statin 預防心血管事件的 SR：\n• PICO 有提但不夠具體（未限定 statin 種類）\n• 搜尋了 5 個資料庫，含灰色文獻，無語言限制\n• 雙人獨立篩選、擷取、RoB 評估\n• I² = 15%，隨機效應模型\n• 有進行事先規劃的次族群分析",
      en: "A statin CV prevention SR:\n• PICO mentioned but not specific (no statin type specified)\n• 5 databases searched including grey literature, no language limits\n• Dual independent screening, extraction, RoB assessment\n• I² = 15%, random-effects model\n• Pre-planned subgroup analyses performed",
    },
    prompt: { zh: "以下 CASP 評分有兩個空格，請選出正確答案。", en: "This CASP scoring has two blanks. Select the correct answers." },
    prefilled: {
      q3a: { label: { zh: "Q3a 搜尋完整？", en: "Q3a Search comprehensive?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q4: { label: { zh: "Q4 效度評估？", en: "Q4 Validity assessed?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q6: { label: { zh: "Q6 合併分析？", en: "Q6 Combination?" }, score: { zh: "是 😀", en: "Yes 😀" } },
    },
    blanks: [
      {
        element: "q1",
        label: { zh: "Q1 研究問題明確？", en: "Q1 Clear question?" },
        correctIndex: 1,
        options: [
          { zh: "是 😀", en: "Yes 😀" },
          { zh: "不確定 😐", en: "Uncertain 😐" },
          { zh: "否 😟", en: "No 😟" },
        ],
        explanations: [
          { zh: "PICO 不夠具體（未限定 statin 種類）不能算完全明確", en: "PICO not specific enough (no statin type) — not fully clear" },
          { zh: "✓ 正確！有 PICO 但不夠具體。「不確定」反映部分達標。", en: "✓ Correct! Has PICO but not specific enough. 'Uncertain' reflects partial compliance." },
          { zh: "有提到 PICO，不至於「否」", en: "PICO was mentioned — not a 'No'" },
        ],
      },
      {
        element: "q5a",
        label: { zh: "Q5a 資料擷取？", en: "Q5a Extraction?" },
        correctIndex: 0,
        options: [
          { zh: "是 😀", en: "Yes 😀" },
          { zh: "不確定 😐", en: "Uncertain 😐" },
          { zh: "否 😟", en: "No 😟" },
        ],
        explanations: [
          { zh: "✓ 正確！雙人獨立擷取符合 CASP 最佳實踐。", en: "✓ Correct! Dual independent extraction meets CASP best practice." },
          { zh: "描述很明確——雙人獨立，符合標準", en: "Description is clear — dual independent, meets standards" },
          { zh: "雙人獨立擷取是標準做法", en: "Dual independent extraction is standard practice" },
        ],
      },
    ],
  },

  // ═══ ERROR-SPOTTING ═══
  // Show full CASP scores for a described study, 2 are wrong

  // ERR-1: IV Iron SR (Case 3) — Q3a and Q4 scored wrong
  {
    id: "casp-err-1", format: "error", source: "case3",
    scenario: {
      zh: "你隊友評讀了一篇 IV iron for HF 的 SR，方法如下：\n• 只搜 PubMed（單一資料庫），限英文\n• 由兩人獨立篩選\n• 使用 Cochrane RoB 2.0 雙人評估\n\n隊友的評分如下：",
      en: "Your teammate appraised an IV iron for HF SR with these methods:\n• Searched PubMed only (single database), English-only\n• Two independent reviewers for screening\n• Cochrane RoB 2.0 with dual assessment\n\nTeammate's scores:",
    },
    prompt: { zh: "隊友的 CASP 評分有 2 個錯誤，請點選評錯的題目。", en: "Your teammate's CASP has 2 errors. Click the wrong scores." },
    shownScores: {
      q1: { label: { zh: "Q1 研究問題明確？", en: "Q1 Clear question?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q3a: { label: { zh: "Q3a 搜尋完整？", en: "Q3a Search comprehensive?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q3b: { label: { zh: "Q3b 篩選適當？", en: "Q3b Screening appropriate?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q4: { label: { zh: "Q4 效度評估？", en: "Q4 Validity assessed?" }, score: { zh: "不確定 😐", en: "Uncertain 😐" } },
    },
    errorElements: ["q3a", "q4"],
    errorExplanations: {
      q3a: { zh: "只搜 PubMed 一個資料庫且限英文——應為「否 😟」，搜尋明顯不完整。", en: "Only PubMed (single database) + English-only — should be 'No 😟', clearly not comprehensive." },
      q4: { zh: "有使用 Cochrane RoB 2.0 且雙人獨立評估——完全符合標準，應為「是 😀」。", en: "Used Cochrane RoB 2.0 with dual assessment — fully meets criteria, should be 'Yes 😀'." },
    },
  },

  // ERR-2: CPM SR (Case 2) — Q3b and Q6 scored wrong
  {
    id: "casp-err-2", format: "error", source: "case2",
    scenario: {
      zh: "你隊友評讀了一篇 CPM for TKA 的 SR：\n• 搜 PubMed、Embase、Cochrane（3 資料庫，無語言限制）\n• 由一人完成篩選（非雙人獨立）\n• 有使用 RoB 2.0\n• I² = 70%，使用隨機效應模型，有事先規劃的次族群分析",
      en: "Your teammate appraised a CPM for TKA SR:\n• Searched PubMed, Embase, Cochrane (3 DBs, no language limits)\n• Screening by single reviewer (not dual independent)\n• Used RoB 2.0\n• I² = 70%, random-effects model, pre-planned subgroup analyses",
    },
    prompt: { zh: "隊友的 CASP 評分有 2 個錯誤，請點選評錯的題目。", en: "Your teammate's CASP has 2 errors. Click the wrong scores." },
    shownScores: {
      q3a: { label: { zh: "Q3a 搜尋完整？", en: "Q3a Search?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q3b: { label: { zh: "Q3b 篩選適當？", en: "Q3b Screening?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q4: { label: { zh: "Q4 效度評估？", en: "Q4 Validity?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q6: { label: { zh: "Q6 合併分析？", en: "Q6 Combination?" }, score: { zh: "否 😟", en: "No 😟" } },
    },
    errorElements: ["q3b", "q6"],
    errorExplanations: {
      q3b: { zh: "只有一人篩選，不符合獨立雙人篩選標準。應為「不確定 😐」或「否 😟」。", en: "Single reviewer screening doesn't meet dual independent standard. Should be 'Uncertain 😐' or 'No 😟'." },
      q6: { zh: "I² = 70% 用隨機效應模型是正確的，且有事先規劃的次族群分析。應為「是 😀」或至少「不確定 😐」。", en: "Random-effects for I² = 70% is correct, plus pre-planned subgroups. Should be 'Yes 😀' or at least 'Uncertain 😐'." },
    },
  },

  // ERR-3: Antibiotic SR (New) — Q1 and Q5a scored wrong
  {
    id: "casp-err-3", format: "error", source: "new",
    scenario: {
      zh: "你隊友評讀了一篇比較 fluoroquinolone vs. β-lactam 治療 CAP 的 SR：\n• 研究問題只寫「比較不同抗生素治療肺炎」——PICO 不完整（缺 C、O、T）\n• 搜了 4 個資料庫含灰色文獻\n• 資料擷取由一人完成，另一人抽樣覆核 20%\n• I² = 25%，隨機效應模型",
      en: "Your teammate appraised an SR comparing fluoroquinolone vs. β-lactam for CAP:\n• Research question only says 'compare different antibiotics for pneumonia' — PICO incomplete (missing C, O, T)\n• Searched 4 databases including grey literature\n• Data extraction by one person, second verified 20% sample\n• I² = 25%, random-effects model",
    },
    prompt: { zh: "隊友的 CASP 評分有 2 個錯誤，請點選評錯的題目。", en: "Your teammate's CASP has 2 errors. Click the wrong scores." },
    shownScores: {
      q1: { label: { zh: "Q1 問題明確？", en: "Q1 Clear question?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q3a: { label: { zh: "Q3a 搜尋完整？", en: "Q3a Search?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q5a: { label: { zh: "Q5a 資料擷取？", en: "Q5a Extraction?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q6: { label: { zh: "Q6 合併分析？", en: "Q6 Combination?" }, score: { zh: "是 😀", en: "Yes 😀" } },
    },
    errorElements: ["q1", "q5a"],
    errorExplanations: {
      q1: { zh: "PICO 不完整（缺 C、O、T），研究問題不夠明確。應為「不確定 😐」或「否 😟」。", en: "Incomplete PICO (missing C, O, T) — question not clear enough. Should be 'Uncertain 😐' or 'No 😟'." },
      q5a: { zh: "非雙人獨立擷取——只有一人做、另一人抽查 20%。應為「不確定 😐」。", en: "Not dual independent extraction — one did it, other checked 20%. Should be 'Uncertain 😐'." },
    },
  },
];

export default caspPractice;
