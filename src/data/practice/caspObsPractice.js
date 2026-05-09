// src/data/practice/caspObsPractice.js
// CASP-SR (Observational) Checklist — 5 practice questions (2 MC + 2 fill-blank + 1 error-spot)
// Same shape as caspPractice.js — scenarios focused on observational-study issues:
// PECOT(S) framework, wrong RoB tools, residual confounding, language/grey-lit search.

const caspObsPractice = [

  // ═══ MULTIPLE CHOICE ═══

  // MC-1: Q4 — Cochrane RoB 2 used on cohort studies (wrong tool)
  {
    id: "casp-obs-mc-1", format: "mc", source: "new",
    scenario: {
      zh: "一篇關於加工肉類攝取與大腸癌風險的觀察性研究 SR 寫到：「納入研究的方法學品質由兩位研究者獨立使用 Cochrane Risk of Bias Tool 2.0 (RoB 2) 評估，分歧透過討論解決。」研究全為 cohort studies。",
      en: "An SR on processed meat consumption and colorectal cancer risk states: 'Methodological quality of included studies was assessed using the Cochrane Risk of Bias Tool 2.0 (RoB 2) by two independent reviewers, with disagreements resolved by discussion.' All included studies were cohort studies.",
    },
    prompt: {
      zh: "針對 CASP-Obs Q4（是否評估初級研究的方法學嚴謹度？），你會怎麼評分？",
      en: "For CASP-Obs Q4 (Did researchers assess validity of included studies?), how would you score?",
    },
    correctIndex: 1,
    options: [
      { label: { zh: "是 😀 — 有用正式工具且雙人評估", en: "Yes 😀 — Used formal tool with dual review" }, explanation: { zh: "✗ 雙人獨立評估的執行很好，但 Cochrane RoB 2 是專為 RCT 設計，無法捕捉 cohort studies 特有的偏誤（如殘餘混淆）。應使用 Newcastle-Ottawa Scale 或 ROBINS-E。", en: "✗ Dual independent review is good, but Cochrane RoB 2 is designed exclusively for RCTs and can't capture cohort-specific biases (esp. residual confounding). Should use Newcastle-Ottawa Scale or ROBINS-E." } },
      { label: { zh: "否 😟 — 工具不適用於觀察性研究", en: "No 😟 — Wrong tool for observational studies" }, explanation: { zh: "✓ 正確！Cochrane RoB 2 是 RCT 專用工具。Cohort studies 應使用 NOS 或 ROBINS-E，這些工具會評估混淆控制等觀察性研究特有問題。用錯工具 = 評估失效。", en: "✓ Correct! Cochrane RoB 2 is for RCTs only. Cohort studies need NOS or ROBINS-E, which assess observational-specific issues like confounder control. Wrong tool = invalid assessment." } },
      { label: { zh: "不確定 😐 — 需要知道是哪個版本", en: "Uncertain 😐 — Need to know the version" }, explanation: { zh: "✗ 版本不重要——整個 RoB 工具家族都是給 RCT 用。資訊已足夠明確判斷為「否」。", en: "✗ The version is irrelevant — the entire RoB tool family is for RCTs. Info is sufficient to give a definitive No." } },
      { label: { zh: "是 😀 — 兩位研究者獨立評估", en: "Yes 😀 — Two reviewers worked independently" }, explanation: { zh: "✗ 獨立雙人評估雖然是好的執行方式，但無法彌補使用錯誤的工具。工具必須適合研究設計。", en: "✗ Independent dual review is good practice but can't compensate for using the wrong tool. The tool must be appropriate for the study design." } },
    ],
  },

  // MC-2: Q1 — PECOT(S) incomplete (only PICO-style framing for an observational SR)
  {
    id: "casp-obs-mc-2", format: "mc", source: "new",
    scenario: {
      zh: "一篇 cohort studies 的 SR 提出研究問題：「PM2.5 暴露是否會增加兒童氣喘風險？」方法中將納入條件描述為「測量微粒物質暴露並報告兒童氣喘發生率的研究」。沒有提到時間窗（暴露累積？追蹤年數？）或情境（都市？特定氣候？）。",
      en: "An SR of cohort studies asks: 'Does PM2.5 exposure increase the risk of childhood asthma?' Inclusion criteria are 'studies measuring particulate matter exposure and reporting asthma incidence in children.' No mention of time window (cumulative exposure? follow-up duration?) or setting (urban? specific climates?).",
    },
    prompt: {
      zh: "針對 CASP-Obs Q1（是否以 PECOT(S) 框架明確提出研究問題？），你會怎麼評分？",
      en: "For CASP-Obs Q1 (Did the SR address a clearly formulated question using PECOT(S)?), how would you score?",
    },
    correctIndex: 1,
    options: [
      { label: { zh: "是 😀 — P、E、O 都很清楚", en: "Yes 😀 — P, E, O are all clear" }, explanation: { zh: "✗ P、E、O 確實清楚，但 PECOT(S) 還需要 C（高 vs 低暴露閾值？）、T（暴露窗口、追蹤時間）和 S（地理情境）。觀察性研究 SR 不能只用 PICO 框架。", en: "✗ P, E, O are clear, but PECOT(S) also requires C (high vs low exposure threshold?), T (exposure window, follow-up), and S (geographic setting). Observational SRs can't use PICO alone." } },
      { label: { zh: "Can't Tell 😐 — PECOT(S) 部分定義", en: "Can't Tell 😐 — PECOT(S) partially defined" }, explanation: { zh: "✓ 正確！P（兒童）、E（PM2.5）、O（氣喘）清楚，但 C（暴露對照閾值）、T（暴露時間窗）、S（地理情境）缺失。框架部分達標 → Can't Tell。", en: "✓ Correct! P (children), E (PM2.5), O (asthma) are clear, but C (exposure comparison threshold), T (exposure window), S (geographic setting) are missing. Partial framework → Can't Tell." } },
      { label: { zh: "否 😟 — 問題太模糊", en: "No 😟 — Question is too vague" }, explanation: { zh: "✗ 問題有清楚的 P、E、O——還沒模糊到該給「否」。問題在於 PECOT(S) 不完整，最適合用「Can't Tell」。", en: "✗ The question has clear P, E, and O — not vague enough to be 'No'. The issue is incomplete PECOT(S), best captured by Can't Tell." } },
      { label: { zh: "是 😀 — 風險因子問題的標準框架", en: "Yes 😀 — Standard risk-factor question framing" }, explanation: { zh: "✗ 雖然問題承認是風險因子型，但 PECOT(S) 明確要求 T 和 S，因為暴露時間與情境會深刻影響觀察性研究結果。", en: "✗ The framing acknowledges it's a risk-factor question, but PECOT(S) explicitly requires T and S because exposure timing and setting profoundly affect observational results." } },
    ],
  },

  // ═══ FILL-IN-THE-BLANK ═══

  // FILL-1: Red meat & all-cause mortality SR (mostly good, two judgement calls)
  {
    id: "casp-obs-fill-1", format: "fill", source: "new",
    scenario: {
      zh: "你正在評讀一篇紅肉攝取與全因死亡率的 cohort studies SR：\n• PECOT(S) 完整：成人、紅肉攝取（多類別）、最低攝取為對照、全因死亡率、≥5 年追蹤、西方與亞洲世代\n• 搜尋 MEDLINE、Embase、CINAHL，限英文，1990–2023\n• 雙人獨立篩選與選取，回報 Kappa = 0.82\n• 使用 Newcastle-Ottawa Scale，雙人獨立評估\n• I² = 68%，使用隨機效應模型\n• 各研究調整的混淆因子有列在補充表",
      en: "You're appraising an SR of cohort studies on red meat consumption and all-cause mortality:\n• PECOT(S) complete: adults, red meat (multiple categories), lowest intake as comparator, all-cause mortality, ≥5 yr follow-up, Western and Asian cohorts\n• Searched MEDLINE, Embase, CINAHL — English only, 1990–2023\n• Dual independent screening and selection, Kappa = 0.82 reported\n• Used Newcastle-Ottawa Scale with dual independent assessment\n• I² = 68%, random-effects model\n• Confounder adjustment per study reported in supplementary table",
    },
    prompt: { zh: "以下 CASP-Obs 評分有兩個空格，請選出正確答案。", en: "This CASP-Obs scoring has two blanks. Select the correct answers." },
    prefilled: {
      q1: { label: { zh: "Q1 PECOT(S) 明確？", en: "Q1 PECOT(S) clear?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q3c: { label: { zh: "Q3c 選取流程嚴謹？", en: "Q3c Selection robust?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q5b: { label: { zh: "Q5b 資料呈現適當？", en: "Q5b Data presentation?" }, score: { zh: "是 😀", en: "Yes 😀" } },
    },
    blanks: [
      {
        element: "q3a",
        label: { zh: "Q3a 文獻搜尋完整？", en: "Q3a Search comprehensive?" },
        correctIndex: 1,
        options: [
          { zh: "是 😀", en: "Yes 😀" },
          { zh: "Can't Tell 😐", en: "Can't Tell 😐" },
          { zh: "否 😟", en: "No 😟" },
        ],
        explanations: [
          { zh: "搜了 3 個資料庫但限英文——對觀察性研究而言，許多重要的職業／環境暴露研究發表在非英語期刊", en: "3 databases is good but English-only is a clear limitation — many important occupational/environmental exposure studies are published in non-English journals" },
          { zh: "✓ 正確！3 個資料庫是好的，但英文限定是明確缺陷。「Can't Tell」反映部分達標。", en: "✓ Correct! 3 databases is good, but English-only is a clear limitation. 'Can't Tell' reflects partial compliance." },
          { zh: "搜了 3 個主要資料庫，不至於「否」", en: "Searched 3 major databases — not severe enough for 'No'" },
        ],
      },
      {
        element: "q4",
        label: { zh: "Q4 評估方法學嚴謹度？", en: "Q4 Validity assessed?" },
        correctIndex: 0,
        options: [
          { zh: "是 😀", en: "Yes 😀" },
          { zh: "Can't Tell 😐", en: "Can't Tell 😐" },
          { zh: "否 😟", en: "No 😟" },
        ],
        explanations: [
          { zh: "✓ 正確！NOS 是 cohort studies 的適當工具 + 雙人獨立評估——完全達標。", en: "✓ Correct! NOS is the appropriate tool for cohort studies + dual independent assessment — fully meets criteria." },
          { zh: "工具與流程都明確且符合標準，不需要「Can't Tell」", en: "Tool and process are both clear and meet standards — no need for 'Can't Tell'" },
          { zh: "工具選對了（NOS）且流程嚴謹，「否」太嚴苛", en: "Right tool (NOS) + rigorous process — 'No' is too harsh" },
        ],
      },
    ],
  },

  // FILL-2: Occupational benzene & leukemia SR (multiple flaws)
  {
    id: "casp-obs-fill-2", format: "fill", source: "new",
    scenario: {
      zh: "你正在評讀一篇職業苯暴露與白血病的 cohort + case-control SR：\n• 研究問題：「職業苯暴露是否增加白血病風險？」（無對照、無時間、無情境）\n• 只搜 PubMed\n• 雙人獨立篩選\n• 使用 Newcastle-Ottawa Scale，雙人評估\n• I² = 84%，使用「固定效應模型」\n• 未討論初級研究調整的混淆因子",
      en: "You're appraising an SR of cohort + case-control studies on occupational benzene and leukemia:\n• Research question: 'Does occupational benzene exposure increase leukemia risk?' (no comparator, time, or setting)\n• Searched only PubMed\n• Dual independent screening\n• Used Newcastle-Ottawa Scale with dual review\n• I² = 84%, used fixed-effects model\n• No discussion of confounders adjusted in primary studies",
    },
    prompt: { zh: "以下 CASP-Obs 評分有兩個空格，請選出正確答案。", en: "This CASP-Obs scoring has two blanks. Select the correct answers." },
    prefilled: {
      q3b: { label: { zh: "Q3b 篩選流程？", en: "Q3b Screening?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q4: { label: { zh: "Q4 評估方法學？（用了 NOS）", en: "Q4 Validity assessed? (used NOS)" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q5a: { label: { zh: "Q5a 資料擷取？", en: "Q5a Extraction?" }, score: { zh: "Can't Tell 😐", en: "Can't Tell 😐" } },
    },
    blanks: [
      {
        element: "q1",
        label: { zh: "Q1 PECOT(S) 明確？", en: "Q1 PECOT(S) clear?" },
        correctIndex: 2,
        options: [
          { zh: "是 😀", en: "Yes 😀" },
          { zh: "Can't Tell 😐", en: "Can't Tell 😐" },
          { zh: "否 😟", en: "No 😟" },
        ],
        explanations: [
          { zh: "PECOT(S) 7 個要素中只有 P、E、O 清楚——這不算「明確」", en: "Only P, E, O of the 7 PECOT(S) elements are clear — that's not 'clearly formulated'" },
          { zh: "缺了一兩個要素時用「Can't Tell」，但這裡缺了 C、T、S 三個——已嚴重到該給「否」", en: "'Can't Tell' fits when 1–2 elements are missing, but here C, T, and S are all missing — serious enough for 'No'" },
          { zh: "✓ 正確！PECOT(S) 中只有 P、E、O 有，缺 C（無暴露對照閾值）、T（無暴露時間窗）、S（無情境）。研究問題不夠明確。", en: "✓ Correct! Only P, E, O are present — C (no exposure threshold), T (no exposure window), S (no setting) are all missing. Question not clearly formulated." },
        ],
      },
      {
        element: "q6",
        label: { zh: "Q6 合併分析適當？", en: "Q6 Pooled analysis appropriate?" },
        correctIndex: 2,
        options: [
          { zh: "是 😀", en: "Yes 😀" },
          { zh: "Can't Tell 😐", en: "Can't Tell 😐" },
          { zh: "否 😟", en: "No 😟" },
        ],
        explanations: [
          { zh: "I² = 84% 用固定效應模型完全錯誤——觀察性研究的高異質性必須用隨機效應", en: "Fixed-effects with I² = 84% is plain wrong — high heterogeneity in observational studies requires random-effects" },
          { zh: "錯誤很明確（模型選錯 + 未討論混淆），不是資訊不足", en: "Errors are clear (wrong model + no confounder discussion), not insufficient info" },
          { zh: "✓ 正確！I² = 84% 是極高異質性，用固定效應模型不合理。再加上完全沒討論混淆因子調整——對觀察性研究 SR 來說是雙重缺陷。", en: "✓ Correct! I² = 84% is extreme heterogeneity, fixed-effects is inappropriate. Compounded by no discussion of confounder adjustment — a double flaw for an observational SR." },
        ],
      },
    ],
  },

  // ═══ ERROR-SPOTTING ═══

  // ERR-1: Coffee & breast cancer SR — teammate scored Q1 and Q4 wrong
  {
    id: "casp-obs-err-1", format: "error", source: "new",
    scenario: {
      zh: "你的隊友評讀了一篇咖啡攝取與乳癌的 case-control SR：\n• 研究問題用 PICO 框架（缺 T 和 S）\n• 搜尋 MEDLINE、Embase + 中文資料庫（CNKI、Wanfang），無語言限制，含灰色文獻\n• 雙人獨立篩選，Kappa = 0.78\n• 使用 Cochrane RoB 2.0（團隊習慣的工具）\n• I² = 45%，隨機效應模型\n• 提到混淆因子調整，但只有 60% 的研究有調整吸菸\n\n隊友的評分如下：",
      en: "Your teammate appraised an SR of case-control studies on coffee consumption and breast cancer:\n• Question framed with PICO (missing T and S)\n• Searched MEDLINE, Embase + Chinese DBs (CNKI, Wanfang); no language limits; grey literature included\n• Dual independent screening, Kappa = 0.78\n• Used Cochrane RoB 2.0 (their team's standard tool)\n• I² = 45%, random-effects model\n• Confounder adjustment noted, but only 60% of studies adjusted for smoking\n\nTeammate's scores:",
    },
    prompt: { zh: "隊友的 CASP-Obs 評分有 2 個錯誤，請點選評錯的題目。", en: "Your teammate's CASP-Obs has 2 errors. Click the wrong scores." },
    shownScores: {
      q1: { label: { zh: "Q1 PECOT(S) 明確？", en: "Q1 PECOT(S) clear?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q3a: { label: { zh: "Q3a 搜尋完整？", en: "Q3a Search comprehensive?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q3b: { label: { zh: "Q3b 篩選嚴謹？", en: "Q3b Screening robust?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q4: { label: { zh: "Q4 評估方法學？", en: "Q4 Validity assessed?" }, score: { zh: "是 😀", en: "Yes 😀" } },
    },
    errorElements: ["q1", "q4"],
    errorExplanations: {
      q1: { zh: "用 PICO 而非 PECOT(S) 已是缺陷（觀察性研究 SR 必須用 PECOT(S)），且缺 T 和 S 兩個要素。應為「Can't Tell 😐」。", en: "Using PICO instead of PECOT(S) is itself a flaw (observational SRs require PECOT(S)), plus T and S are missing. Should be 'Can't Tell 😐'." },
      q4: { zh: "Cochrane RoB 2 是 RCT 專用工具，不適用於 case-control studies。應使用 Newcastle-Ottawa Scale 或 ROBINS-E。應為「否 😟」。", en: "Cochrane RoB 2 is for RCTs only, not case-control studies. Should use Newcastle-Ottawa Scale or ROBINS-E. Should be 'No 😟'." },
    },
  },

  // ═══════════════════════════════════════════════
  // SECTION C–E PRACTICE (Q7 / Q7-1 / Q7-2 / Q8 / Q9 / Q10)
  // ═══════════════════════════════════════════════

  // MC-3: Q7 — limitations discussion missing residual confounding
  {
    id: "casp-obs-mc-3", format: "mc", source: "new",
    scenario: {
      zh: "一篇 cohort studies SR 評估膳食纖維攝取與大腸癌風險。「限制」段落討論：(1) 異質性 I² = 68%，(2) 因納入 < 10 篇而未做 funnel plot，(3) 研究多來自西方族群。作者寫到「所有納入研究皆有調整年齡、性別、BMI」，但沒有討論未測量的混淆因子（如身體活動、總熱量攝取）是否可能影響合併估計值。",
      en: "An SR of cohort studies on dietary fiber intake and colorectal cancer risk. The Limitations section discusses: (1) heterogeneity I² = 68%, (2) no funnel plot due to <10 studies, (3) studies mostly from Western populations. Authors note 'all included studies adjusted for age, sex, and BMI' but do not discuss whether unmeasured confounders (e.g., physical activity, total caloric intake) could bias the pooled estimate.",
    },
    prompt: {
      zh: "針對 CASP-Obs Q7（是否充分討論研究限制？），你會怎麼評分？",
      en: "For CASP-Obs Q7 (Did researchers report limitations?), how would you score?",
    },
    correctIndex: 1,
    options: [
      { label: { zh: "是 😀 — 已討論多項限制", en: "Yes 😀 — Multiple limitations discussed" }, explanation: { zh: "✗ 確實有討論異質性、發表偏誤、地理代表性。但對觀察性研究 SR 而言，最關鍵的限制是「殘餘混淆」(residual confounding)——這完全沒被討論。提到「個別研究有調整」不等於討論殘餘混淆。", en: "✗ Heterogeneity, pub bias, and geographic representativeness were discussed. But for observational SRs, the most critical limit is residual confounding — completely missing. Noting 'individual studies adjusted' is NOT a discussion of residual confounding." } },
      { label: { zh: "Can't Tell 😐 — 部分限制有討論，但缺殘餘混淆", en: "Can't Tell 😐 — Some discussed but residual confounding missing" }, explanation: { zh: "✓ 正確！對觀察性研究 SR 而言，討論「殘餘混淆」是必要的。即使每篇研究都調整了某些因子，未測量或未調整的因子仍可能扭曲合併估計值。其他限制有討論但這個關鍵點缺失 → Can't Tell。", en: "✓ Correct! Residual confounding discussion is essential for observational SRs. Even when individual studies adjust for some factors, unmeasured/unadjusted confounders may distort the pooled estimate. Other limits discussed but this key point missing → Can't Tell." } },
      { label: { zh: "否 😟 — 完全沒討論限制", en: "No 😟 — No limitations discussed" }, explanation: { zh: "✗ 確實有討論一些限制（異質性、發表偏誤等）——不是完全沒討論。「否」太嚴苛。", en: "✗ Several limitations were discussed (heterogeneity, pub bias, etc.) — not 'none discussed'. 'No' is too harsh." } },
      { label: { zh: "是 😀 — 有提到混淆因子調整", en: "Yes 😀 — Confounder adjustment was mentioned" }, explanation: { zh: "✗ 「個別研究有調整某些因子」 ≠ 「合併分析的殘餘混淆評估」。前者是描述研究方法，後者是討論回顧本身的限制。", en: "✗ 'Individual studies adjusted for some factors' ≠ 'discussion of residual confounding in the pooled estimate'. The first describes study methods; the second discusses the review's own limitations." } },
    ],
  },

  // MC-4: Q8 — only benefits discussed, no harms or resources
  {
    id: "casp-obs-mc-4", format: "mc", source: "new",
    scenario: {
      zh: "一篇 cohort studies SR 評估地中海飲食依從性與心血管死亡率。結論寫到：「依循地中海飲食與 25% 較低的心血管死亡率相關 (HR 0.75, 95% CI 0.68-0.83)。公衛政策應鼓勵推廣地中海飲食。」討論段落沒有提到潛在缺點（如：飲食改變的困難、不同地區食材取得性、成本）或實施所需資源。",
      en: "An SR of cohort studies on Mediterranean diet adherence and CVD mortality concludes: 'Mediterranean diet adherence is associated with 25% lower CVD mortality (HR 0.75, 95% CI 0.68-0.83). Public health policy should encourage Mediterranean diet adoption.' Discussion does not mention potential disadvantages (dietary change challenges, ingredient availability/cost across regions) or implementation resources.",
    },
    prompt: {
      zh: "針對 CASP-Obs Q8（行動的好處是否大於潛在傷害與資源負擔？），你會怎麼評分？",
      en: "For CASP-Obs Q8 (Would benefits of action outweigh disadvantages, harms, and resource demands?), how would you score?",
    },
    correctIndex: 2,
    options: [
      { label: { zh: "是 😀 — 25% 死亡率降低很顯著", en: "Yes 😀 — 25% mortality reduction is substantial" }, explanation: { zh: "✗ Q8 評估的不是「效果是否大」，而是「作者是否權衡了好處 vs 壞處 vs 資源需求」。本例只報告好處，沒做權衡。", en: "✗ Q8 doesn't evaluate 'is the effect large' but 'did authors weigh benefits vs harms vs resources'. Here only benefits are reported — no balancing." } },
      { label: { zh: "Can't Tell 😐 — 需要更多資訊", en: "Can't Tell 😐 — Need more info" }, explanation: { zh: "✗ 資訊很明確——作者完全沒有討論缺點或資源。不是「資訊不足」的情況。", en: "✗ The info is clear — authors completely omitted disadvantages and resources. Not a case of 'insufficient info'." } },
      { label: { zh: "否 😟 — 只討論好處，未討論壞處或資源", en: "No 😟 — Only benefits discussed, no harms or resources" }, explanation: { zh: "✓ 正確！Q8 要求作者明確權衡好處、潛在缺點/傷害、和所需資源。本例只描述好處並做政策建議，沒有任何權衡。應為「否」。", en: "✓ Correct! Q8 requires explicit weighing of benefits, potential disadvantages/harms, and resource demands. This SR only describes benefits and gives a policy recommendation — no balancing at all. Score 'No'." } },
      { label: { zh: "是 😀 — 結論清楚且有政策意涵", en: "Yes 😀 — Clear conclusion with policy implications" }, explanation: { zh: "✗ 給出政策建議不等於做了利弊權衡。Q8 的核心是「balance」——只有單側論述不算達標。", en: "✗ Giving a policy recommendation isn't the same as balancing pros and cons. The core of Q8 is 'balance' — one-sided argument doesn't meet criteria." } },
    ],
  },

  // MC-5: Q9 — exposure prevalence dramatically different from local setting
  {
    id: "casp-obs-mc-5", format: "mc", source: "new",
    scenario: {
      zh: "你是台北的公衛官員，評讀一篇 cohort studies SR 探討室內氡氣暴露與肺癌風險。SR 結論：「氡氣可解釋 10% 的肺癌死亡。」納入研究皆在北歐、北美高氡地質區（典型住宅濃度 100–400 Bq/m³）。台灣大部分地區的天然氡氣濃度 < 50 Bq/m³。",
      en: "You're a public health official in Taipei appraising an SR of cohort studies on indoor radon exposure and lung cancer risk. The SR concludes 'radon explains 10% of lung cancer deaths'. All included studies were from high-radon geology regions in Northern Europe and North America (typical home concentration 100–400 Bq/m³). Most of Taiwan has natural radon levels <50 Bq/m³.",
    },
    prompt: {
      zh: "針對 CASP-Obs Q9（結果能應用到你的在地族群嗎？），你會怎麼評分？",
      en: "For CASP-Obs Q9 (Can results be applied to your local population?), how would you score?",
    },
    correctIndex: 2,
    options: [
      { label: { zh: "是 😀 — 肺癌生物學在不同族群間相似", en: "Yes 😀 — Lung cancer biology is similar across populations" }, explanation: { zh: "✗ 雖然「相對風險」可能在不同濃度下相似，但「絕對風險」會因為基準暴露程度差異而大不相同。低暴露族群中歸因於氡氣的肺癌比例會遠低於 10%。", en: "✗ While 'relative risk' may be similar across exposure levels, 'absolute risk' differs dramatically due to baseline exposure differences. The attributable fraction in a low-exposure population would be far below 10%." } },
      { label: { zh: "Can't Tell 😐 — 需要在地數據", en: "Can't Tell 😐 — Need local data" }, explanation: { zh: "✗ 已有明確證據顯示在地暴露程度遠低於研究族群（< 50 vs 100-400 Bq/m³）——足以判斷結果不適用。", en: "✗ Clear evidence shows local exposure is dramatically lower than studied populations (<50 vs 100-400 Bq/m³) — sufficient to judge non-applicability." } },
      { label: { zh: "否 😟 — 暴露程度差異太大", en: "No 😟 — Exposure prevalence too different" }, explanation: { zh: "✓ 正確！「氡氣解釋 10% 肺癌」這個結論只在高暴露族群有效。低暴露族群中歸因於氡氣的比例會極低。對觀察性研究 SR，「暴露盛行率」差異是判斷在地適用性的關鍵考量。", en: "✓ Correct! 'Radon explains 10% of lung cancer' only holds in high-exposure populations. The attributable fraction in low-exposure populations would be minimal. For observational SRs, 'exposure prevalence differences' are critical for local applicability." } },
      { label: { zh: "是 😀 — 都是已開發國家的高品質研究", en: "Yes 😀 — All are high-quality studies from developed countries" }, explanation: { zh: "✗ 研究品質好不代表結果就能應用。Q9 看的是在地族群與研究族群的「重要差異」，而非研究本身的品質。", en: "✗ Study quality doesn't mean results apply. Q9 examines 'important differences' between local and study populations, not study quality itself." } },
    ],
  },

  // MC-6: Q10 — value calculation when budget is constrained
  {
    id: "casp-obs-mc-6", format: "mc", source: "new",
    scenario: {
      zh: "你是醫院行政主管，評讀一篇 cohort studies SR 探討初級照護中的戒菸計畫。SR 顯示計畫可在 5 年內減少吸菸率 8%（RR 0.92）。實施成本：每位病人 200 美元。你的醫院每年服務 10,000 名病人（= 200 萬美元/年）。你年度預防計畫總預算只有 50 萬美元。你已對 Q9 答「是」（結果可應用）。",
      en: "You're a hospital administrator appraising an SR of cohort studies on smoking cessation programs in primary care. The SR shows programs reduce smoking by 8% over 5 years (RR 0.92). Implementation cost: $200/patient. Your hospital serves 10,000 patients/year (= $2M/yr). Your annual prevention budget is $500K total. You answered 'Yes' to Q9 (results applicable).",
    },
    prompt: {
      zh: "針對 CASP-Obs Q10（行動是否能為你負責的族群帶來更大價值？），你會怎麼評分？",
      en: "For CASP-Obs Q10 (Would acting represent greater value for your population?), how would you score?",
    },
    correctIndex: 1,
    options: [
      { label: { zh: "是 😀 — 戒菸計畫已被證實有效", en: "Yes 😀 — Smoking cessation programs are proven effective" }, explanation: { zh: "✗ Q10 評的不是「介入是否有效」（那是 Q9 之前的判斷），而是「在你的資源條件下是否值得實施」。價值 = 結果 ÷ 資源。", en: "✗ Q10 doesn't evaluate 'is the intervention effective' (that's prior to Q9) — it asks 'is it worth implementing given your resources'. Value = Outcomes ÷ Resources." } },
      { label: { zh: "否 😟 — 成本遠超過預算", en: "No 😟 — Cost far exceeds budget" }, explanation: { zh: "✓ 正確！200 萬 vs 50 萬 = 需要的資源是預算的 4 倍。即使效果是真的，實施會排擠其他更具成本效益的預防計畫。「價值」必須考慮機會成本。", en: "✓ Correct! $2M vs $500K = required resources are 4× the budget. Even if effects are real, implementation would crowd out other more cost-effective prevention programs. 'Value' must account for opportunity cost." } },
      { label: { zh: "Can't Tell 😐 — 需要做正式成本效益分析", en: "Can't Tell 😐 — Need formal cost-effectiveness analysis" }, explanation: { zh: "✗ 不需要正式 CEA 也能判斷——資源缺口是 4 倍。Q10 只需要評讀者根據可得資訊做判斷。", en: "✗ A formal CEA isn't needed — the resource gap is 4×. Q10 just requires the appraiser to judge based on available info." } },
      { label: { zh: "是 😀 — 預防計畫長期會省錢", en: "Yes 😀 — Prevention saves money long-term" }, explanation: { zh: "✗ 這是假設而非證據。Q10 應根據實際資源限制與當下決策做判斷，而非對未來節省的猜測。", en: "✗ This is speculation, not evidence. Q10 should be judged based on actual resource constraints and the current decision, not guesses about future savings." } },
    ],
  },

  // FILL-3: Q7-1 + Q7-2 — subgroup and meta-regression limitations
  {
    id: "casp-obs-fill-3", format: "fill", source: "new",
    scenario: {
      zh: "你正在評讀一篇 cohort studies SR 探討膳食鈣攝取與骨折風險。研究進行了次族群分析（依性別）和統合迴歸（鈣劑量）。「限制」段落寫到：\n\n• 次族群分析：「依性別事先指定，含預期方向。交互作用檢定 p = 0.12。我們使用 within-study 比較（每篇研究內部分性別分析）並有調整多重比較。」\n• 統合迴歸：「使用固定效應模型對 6 個共變數做迴歸，未調整多重比較。」",
      en: "You're appraising an SR of cohort studies on dietary calcium and fracture risk. The SR performed subgroup analyses (by sex) and meta-regression (on calcium dose). The Limitations section states:\n\n• Subgroup analyses: 'Pre-specified by sex with hypothesized direction. Test for interaction p = 0.12. We used within-study comparisons (sex-stratified analysis within each study) and adjusted for multiple testing.'\n• Meta-regression: 'Fixed-effects regression on 6 covariates without adjustment for multiple testing.'",
    },
    prompt: { zh: "以下兩個 CASP-Obs 評分有兩個空格，請選出正確答案。", en: "This CASP-Obs scoring has two blanks. Select the correct answers." },
    prefilled: {
      q4: { label: { zh: "Q4 評估方法學？", en: "Q4 Validity assessed?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q6_1: { label: { zh: "Q6-1 次族群分析適當？", en: "Q6-1 Subgroup analysis?" }, score: { zh: "是 😀", en: "Yes 😀" } },
      q6_2: { label: { zh: "Q6-2 統合迴歸適當？", en: "Q6-2 Meta-regression?" }, score: { zh: "Can't Tell 😐", en: "Can't Tell 😐" } },
    },
    blanks: [
      {
        element: "q7_1",
        label: { zh: "Q7-1 次族群限制充分討論？", en: "Q7-1 Subgroup limitations discussed?" },
        correctIndex: 0,
        options: [
          { zh: "是 😀", en: "Yes 😀" },
          { zh: "Can't Tell 😐", en: "Can't Tell 😐" },
          { zh: "否 😟", en: "No 😟" },
        ],
        explanations: [
          { zh: "✓ 正確！全面討論：事先指定、預期方向、交互作用檢定、within-study 比較、多重比較調整。Q7-1 的所有重點都涵蓋了。", en: "✓ Correct! Comprehensive discussion: pre-specification, direction, interaction test, within-study comparison, multiple testing adjustment. All Q7-1 key points are covered." },
          { zh: "討論很完整——不需要「Can't Tell」", en: "Discussion is comprehensive — no need for 'Can't Tell'" },
          { zh: "討論完整不該給「否」", en: "Discussion is comprehensive — shouldn't be 'No'" },
        ],
      },
      {
        element: "q7_2",
        label: { zh: "Q7-2 統合迴歸限制充分討論？", en: "Q7-2 Meta-regression limitations discussed?" },
        correctIndex: 2,
        options: [
          { zh: "是 😀", en: "Yes 😀" },
          { zh: "Can't Tell 😐", en: "Can't Tell 😐" },
          { zh: "否 😟", en: "No 😟" },
        ],
        explanations: [
          { zh: "用了固定效應（觀察性研究不合理）+ 6 個共變數沒調整多重比較——這些是嚴重缺陷，不算「充分討論」", en: "Used fixed-effects (inappropriate for obs studies) + 6 covariates without multiple-testing adjustment — these are serious flaws, not 'comprehensive discussion'" },
          { zh: "問題很明確——多項缺陷未被適當討論", en: "The issues are clear — multiple flaws not adequately discussed" },
          { zh: "✓ 正確！描述了使用了什麼方法但沒「討論限制」。固定效應模型用於觀察性資料的合理性、6 個共變數的多重比較問題，都未被檢討。應為「否」。", en: "✓ Correct! Describes what was done but doesn't 'discuss limitations'. Neither the inappropriateness of fixed-effects on observational data, nor the multiple-testing problem with 6 covariates was reflected on. Score 'No'." },
        ],
      },
    ],
  },

];

export default caspObsPractice;
