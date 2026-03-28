// src/data/cases/iviron2025.js
// Fully structured case data extracted from the 2025 EBM competition slides (二練, 54 slides)
// Case: IV Iron for Heart Failure + Iron Deficiency Anemia
//
// CORRECTIONS APPLIED (original slides had copy-paste errors from the atropine case):
// 1. Slide 8: Treatment issue #2 was atropine/defocus lens content — replaced with IV iron regimen & clinical issue
// 2. Slide 37: MID slide was entirely from atropine case (SE MID = 0.25D) — replaced with binary outcome
//    null threshold explanation, since the primary outcome is OR (first CV death) and the team correctly
//    used null threshold + OIS on slide 40
// 3. Slide 5: Typo "缺血性貧血" → corrected to "缺鐵性貧血"
// 4. Slide 25: Two contradictory Kappa values (1 and 0.83) — all 11 CASP items match → Kappa = 1

const iviron2025 = {
  meta: {
    id: "iv-iron-hf-2025",
    year: 2025,
    title: {
      zh: "靜脈注射補鐵對心衰竭合併缺鐵性貧血患者的心血管效益",
      en: "IV Iron for Cardiovascular Outcomes in Heart Failure with Iron Deficiency Anemia",
    },
    team: {
      zh: "輔仁大學附設醫院藥劑部",
      en: "Fu Jen Catholic University Hospital — Department of Pharmacy",
    },
    members: [
      { name: "張芷榕", role: { zh: "藥師", en: "Pharmacist" } },
      { name: "周俊佑", role: { zh: "藥師", en: "Pharmacist" } },
      { name: "曾亞莛", role: { zh: "醫檢師", en: "Medical Technologist" } },
    ],
    tags: ["SR/MA", "RCT", "Cardiology", "Hematology"],
    article: {
      citation: "Ahmed M et al. ESC Heart Fail. 2025;12(1):43.",
      pmid: "38965691",
      title: {
        zh: "靜脈注射補鐵對心衰竭合併缺鐵性貧血患者的療效：隨機臨床試驗之更新統合分析",
        en: "Intravenous iron therapy for heart failure and iron deficiency: An updated meta-analysis of randomized clinical trials",
      },
      studyType: "SR with MA of RCTs",
      rctCount: 14,
      totalParticipants: 6651,
    },
    gradeResults: {
      "IV iron": "moderate",
    },
    recommendation: {
      zh: "部分推薦使用靜脈注射補鐵",
      en: "Conditional recommendation for IV iron therapy",
    },
  },

  // ═══════════════════════════════════════════
  // PHASE 1: ASSESS
  // ═══════════════════════════════════════════
  assess: {
    scenario: {
      zh: "72 歲男性（遵醫囑性佳），心臟衰竭合併高血壓及心房顫動，因肺水腫、低血鈉，伴隨缺鐵性貧血而入院。",
      en: "72-year-old male (good adherence), with heart failure, hypertension, and atrial fibrillation, admitted for pulmonary edema, hyponatremia, and concomitant iron deficiency anemia.",
    },
    clinicalQuestions: {
      zh: [
        "血鈉矯正速度過快是否引發腦部損傷？",
        "靜脈注射補鐵能否改善心臟衰竭？",
      ],
      en: [
        "Does overly rapid sodium correction cause brain damage?",
        "Can IV iron therapy improve heart failure outcomes?",
      ],
    },
    patientProfile: {
      age: { zh: "72 歲", en: "72 years old" },
      sex: { zh: "男", en: "Male" },
      condition: {
        zh: "心臟衰竭 + 高血壓 + 心房顫動 + 缺鐵性貧血",
        en: "Heart failure + Hypertension + Atrial fibrillation + Iron deficiency anemia",
      },
      setting: { zh: "住院", en: "Inpatient" },
    },
    patientPreferences: {
      zh: [
        "遵醫囑性佳，願意配合長期治療。",
        "希望能改善心衰竭症狀，減少住院頻率。",
        "對靜脈注射的接受度尚可。",
      ],
      en: [
        "Good adherence, willing to cooperate with long-term treatment.",
        "Hopes to improve HF symptoms and reduce hospitalization frequency.",
        "Acceptable with IV injection.",
      ],
    },
    backgroundKnowledge: {
      diseaseOverview: {
        zh: "低血鈉：血液中鈉離子濃度低於正常值（135 mEq/L），可能導致細胞腫脹和神經系統功能異常。缺鐵性貧血：體內鐵質不足導致血紅蛋白合成減少，造成紅血球數量或品質下降，常表現為疲勞、蒼白和呼吸急促。",
        en: "Hyponatremia: serum sodium below 135 mEq/L, potentially causing cell swelling and neurological dysfunction. Iron deficiency anemia: insufficient iron reduces hemoglobin synthesis, leading to decreased red blood cell quantity or quality, presenting as fatigue, pallor, and dyspnea.",
      },
      riskFactors: {
        zh: "低血鈉：高齡者、心臟衰竭患者、肝硬化患者、腎臟病患者、服用利尿劑或抗憂鬱藥物者。缺鐵性貧血：育齡婦女、孕婦、嬰幼兒、青少年、素食者、消化道出血患者、慢性腎病患者。",
        en: "Hyponatremia: elderly, HF patients, cirrhosis, kidney disease, diuretic or antidepressant users. IDA: women of childbearing age, pregnant women, infants, adolescents, vegetarians, GI bleed patients, CKD patients.",
      },
      treatmentOptions: {
        zh: "低血鈉：限制水分攝取、補充鈉鹽、使用血管加壓素受體拮抗劑，嚴重急性情況下謹慎進行高張鹽水輸注，但需避免過快矯正以防腦部損傷。缺鐵性貧血：口服鐵劑補充、改善飲食增加含鐵食物攝取、治療潛在出血原因，嚴重情況下可考慮靜脈注射鐵劑或輸血治療。",
        en: "Hyponatremia: fluid restriction, sodium supplementation, vasopressin receptor antagonists; cautious hypertonic saline for severe acute cases, avoiding rapid correction to prevent brain injury. IDA: oral iron supplementation, dietary improvement, treating underlying bleeding; IV iron or transfusion for severe cases.",
      },
    },
    treatmentIssues: [
      {
        name: { zh: "矯正低血鈉", en: "Sodium correction" },
        regimen: {
          zh: "每 24 小時不超過 10-12 mEq/L。",
          en: "Correction rate ≤ 10-12 mEq/L per 24 hours.",
        },
        issue: {
          zh: "若同時考量治療效果（避免腦水腫）和潛在副作用（滲透性脫髓鞘症候群），最適當的矯正速度為何？",
          en: "Considering both efficacy (preventing cerebral edema) and risks (osmotic demyelination syndrome), what is the optimal correction rate?",
        },
      },
      {
        name: { zh: "缺鐵性貧血治療", en: "IDA treatment" },
        regimen: {
          // CORRECTED: Original slide 8 was copy-paste from atropine case (defocus lens regimen)
          zh: "靜脈注射補鐵（如 ferric carboxymaltose）：負荷劑量 1000mg 分 2 劑（第 0、6 天），維持劑量每 12、24、36 週各 500mg 1 劑（依 ferritin/TSAT 判斷是否需要追加）。口服補鐵：300mg TID。",
          en: "IV iron (e.g. ferric carboxymaltose): loading dose 1000mg in 2 doses (day 0, 6), maintenance 500mg at weeks 12, 24, 36 (based on ferritin/TSAT). Oral iron: 300mg TID.",
        },
        issue: {
          // CORRECTED: replaced defocus lens question with the actual clinical question
          zh: "對心衰竭合併缺鐵性貧血患者，靜脈注射補鐵相較於口服補鐵，是否能降低心血管死亡率及住院率？",
          en: "In HF patients with IDA, does IV iron compared to oral iron reduce cardiovascular mortality and hospitalization rates?",
        },
      },
    ],
    annotations: {
      zh: [
        "本案有兩個臨床問題（低血鈉矯正速度 + 缺鐵性貧血治療），最終選擇 PICOT-2 進行文獻搜尋。",
        "治療議題的療程描述需要具體寫出給藥方式和劑量——方便後續與文獻做 PICO 比較。",
        "背景知識搜尋階段先釐清疾病基本資訊，為後續提出正確的 PICOT 問題打基礎。",
      ],
      en: [
        "This case has two clinical questions (sodium correction rate + IDA treatment); PICOT-2 was selected for literature search.",
        "Treatment issue descriptions should specify dosing regimen — facilitating later PICO comparison with literature.",
        "Background knowledge search first clarifies basic disease information, laying the foundation for formulating correct PICOT questions.",
      ],
    },
  },
  // ═══════════════════════════════════════════
  ask: {
    picots: [
      {
        id: 1,
        label: "PICOT-1",
        isPrimary: false,
        questionType: "treatment",
        p: {
          zh: "高齡且遵醫囑性佳的心衰竭患者，合併低血鈉 (Na < 135 mEq/L)",
          en: "Elderly compliant HF patient with hyponatremia (Na < 135 mEq/L)",
        },
        i: { zh: "快速矯正低血鈉 (≥ 8-10 mEq/L/day)", en: "Rapid sodium correction (≥ 8-10 mEq/L/day)" },
        c: { zh: "慢速矯正低血鈉 (< 8 mEq/L/day)", en: "Slow sodium correction (< 8 mEq/L/day)" },
        o: { zh: "神經併發症 ODS 發生率", en: "Neurological complication (ODS) incidence" },
        t: { zh: "一個月", en: "1 month" },
      },
      {
        id: 2,
        label: "PICOT-2",
        isPrimary: true,
        questionType: "treatment",
        p: {
          zh: "高齡且遵醫囑性佳的心衰竭患者，合併缺鐵性貧血 (Hb < 12 g/dL, TSAT < 20%)",
          en: "Elderly compliant HF patient with IDA (Hb < 12 g/dL, TSAT < 20%)",
        },
        i: { zh: "靜脈注射補鐵", en: "Intravenous iron supplementation" },
        c: { zh: "口服補鐵", en: "Oral iron supplementation" },
        o: {
          zh: "療效：心衰竭死亡率。副作用：過敏反應（紅腫痛）",
          en: "Efficacy: HF mortality. Adverse events: allergic reactions (redness, swelling, pain)",
        },
        t: { zh: "一年", en: "1 year" },
        rationale: {
          zh: "解決貧血問題或許可改善心衰竭病況",
          en: "Resolving anemia may improve heart failure outcomes",
        },
      },
    ],
    picotAnnotations: {
      zh: [
        "PICOT-1 聚焦在低血鈉的矯正速度，屬於急性管理問題。",
        "PICOT-2 聚焦在缺鐵性貧血的長期治療策略，與心衰竭預後直接相關。",
        "注意 PICOT-2 同時評估療效和副作用——藥物介入需兼顧效益與安全。",
      ],
      en: [
        "PICOT-1 focuses on sodium correction rate — an acute management question.",
        "PICOT-2 focuses on long-term IDA treatment strategy, directly linked to HF prognosis.",
        "Note PICOT-2 assesses both efficacy and adverse events — drug interventions must evaluate benefit and safety.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // PHASE 3: ACQUIRE
  // ═══════════════════════════════════════════
  acquire: {
    databases: [
      { name: "PubMed", rationale: { zh: "文獻廣泛全面", en: "Comprehensive coverage" } },
      { name: "Embase", rationale: { zh: "涵蓋歐洲文獻", en: "European literature coverage" } },
      { name: "Cochrane Library", rationale: { zh: "證據品質高", en: "High evidence quality" } },
    ],
    keywords: {
      table: [
        {
          picot: "P",
          freeText: ["Heart failure", "Iron deficiency anemia", "IDA"],
          mesh: ['"Heart failure"[MeSH]', '"Anemia, Iron-Deficiency"[MeSH]'],
        },
        {
          picot: "I",
          freeText: ["Intravenous iron", "Parenteral iron", "Iron infusion"],
          mesh: ['"Iron"[MeSH] AND "Infusions, Intravenous"[MeSH]'],
        },
        {
          picot: "C",
          freeText: ["Oral iron supplementation"],
          mesh: ['"Iron/therapeutic use"[MeSH]', '"Administration, Oral"[MeSH]'],
          note: { zh: "通常不加入搜尋式", en: "Usually excluded from search" },
        },
        {
          picot: "O",
          freeText: ["Hospitalization", "Mortality"],
          mesh: ['"Hospitalization"[MeSH]', '"Mortality"[MeSH]'],
          note: { zh: "通常不加入搜尋式", en: "Usually excluded from search" },
        },
      ],
      strategy: {
        zh: "Free text 和 MeSH term 用 OR 連結同概念，再用 AND 合併不同概念。",
        en: "Free text and MeSH terms connected with OR within concepts, then AND across concepts.",
      },
      booleanFormula:
        '("Heart Failure"[MeSH] OR "CHF" OR "heart failure" OR "cardiac failure") AND ("Anemia, Iron-Deficiency"[MeSH] OR "IDA" OR "iron deficiency anemia") AND (("Iron"[MeSH] AND "Infusions, Intravenous"[MeSH]) OR "intravenous iron" OR "parenteral iron" OR "iron infusion")',
    },
    pubmedWorkflow: {
      zh: "使用 PubMed Advanced Search，利用「關鍵字/同義字」搭配 [MeSH Term] 進行初步檢索，並轉換至 Embase 和 Cochrane。",
      en: "Used PubMed Advanced Search with keywords/synonyms and MeSH Terms, then converted to Embase and Cochrane.",
    },
    litSuggest: {
      input: { zh: "252 篇 PubMed 初步結果", en: "252 initial PubMed results" },
      positive: 115,
      negative: 137,
      description: {
        zh: "使用 LitSuggest 機器學習工具，以正向和負向 PMID 範例自動評分篩選所有搜尋結果。",
        en: "Used LitSuggest ML tool with positive and negative PMID examples to auto-score and screen all search results.",
      },
    },
    sraConversion: {
      zh: "利用關鍵字轉換工具將 PubMed 搜尋式轉換為 Embase 和 Cochrane 格式。",
      en: "Used keyword conversion tool to transform PubMed search into Embase and Cochrane formats.",
    },
    screeningFlow: {
      initial: { pubmed: 252, embase: 219, cochrane: 7 },
      afterLitSuggest: { pubmed: 115 },
      afterSRFilter: { pubmed: 1, embase: 72, cochrane: 2 },
      srCount: { pubmed: 3, embase: 7, cochrane: 0 },
      picoMatch: 2,
      finalSelected: 1,
    },
    articleSelection: {
      candidates: [
        {
          selected: false,
          rctCount: 11,
          participants: 6511,
          description: {
            zh: "探討靜脈注射補鐵對心衰竭合併缺鐵性貧血患者的心血管益處與安全性。",
            en: "Evaluating cardiovascular benefits and safety of IV iron for HF + IDA patients.",
          },
        },
        {
          selected: true,
          rctCount: 14,
          participants: 6651,
          description: {
            zh: "探討靜脈注射補鐵能否改善心衰竭合併缺鐵性貧血患者的心血管問題。",
            en: "Evaluating whether IV iron improves cardiovascular outcomes in HF patients with IDA.",
          },
          citation: "Ahmed M et al. ESC Heart Fail. 2025;12(1):43. PMID: 38965691",
        },
      ],
      rationale: {
        zh: "選擇第二篇，納入更多 RCT（14 vs 11）和更多受試者（6651 vs 6511），且涵蓋 HEART-FID 試驗。",
        en: "Selected the second article: more RCTs (14 vs 11), more participants (6651 vs 6511), and includes HEART-FID trial.",
      },
    },
    annotations: {
      zh: [
        "搜尋策略依序使用 PubMed、Embase、Cochrane，三個資料庫互相補充涵蓋面。",
        "LitSuggest 作為機器學習篩選工具，可大幅減少人工篩選工作量。",
        "最終選擇 14 RCT 的版本而非 11 RCT，涵蓋範圍更廣（含 HEART-FID 試驗）。",
      ],
      en: [
        "Search strategy used PubMed, Embase, Cochrane sequentially — three databases complement each other.",
        "LitSuggest as ML screening tool significantly reduces manual screening workload.",
        "Selected 14-RCT version over 11-RCT — broader coverage including HEART-FID trial.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // PHASE 4: APPRAISE
  // ═══════════════════════════════════════════
  appraise: {
    picoComparison: {
      rows: [
        { element: "P", sub: { zh: "年齡", en: "Age" }, study: { zh: "51-75.4 歲", en: "51-75.4 y/o" }, case_: { zh: "72 歲", en: "72 y/o" }, similarity: { zh: "相似😀", en: "Similar 😀" } },
        { element: "P", sub: { zh: "種族", en: "Ethnicity" }, study: { zh: "歐美為主", en: "Mostly Western" }, case_: { zh: "台灣", en: "Taiwan" }, similarity: { zh: "接近😐", en: "Close 😐" } },
        { element: "P", sub: { zh: "疾病", en: "Condition" }, study: { zh: "心衰竭 + 缺鐵性貧血", en: "HF + IDA" }, case_: { zh: "心衰竭 + 缺鐵性貧血", en: "HF + IDA" }, similarity: { zh: "相似😀", en: "Similar 😀" } },
        { element: "I", sub: null, study: { zh: "靜脈注射補鐵", en: "IV iron" }, case_: { zh: "靜脈注射補鐵", en: "IV iron" }, similarity: { zh: "相似😀", en: "Similar 😀" } },
        { element: "C", sub: null, study: { zh: "安慰劑/標準治療", en: "Placebo/standard care" }, case_: { zh: "口服補鐵", en: "Oral iron" }, similarity: { zh: "不相似😟", en: "Dissimilar 😟" } },
        { element: "O", sub: null, study: { zh: "療效：心衰竭死亡率、整體死亡率\n副作用：過敏反應", en: "Efficacy: HF mortality, all-cause mortality\nAE: allergic reactions" }, case_: { zh: "療效：心衰竭死亡率\n副作用：過敏反應", en: "Efficacy: HF mortality\nAE: allergic reactions" }, similarity: { zh: "相似😀", en: "Similar 😀" } },
        { element: "S", sub: null, study: { zh: "RCT", en: "RCT" }, case_: { zh: "", en: "" }, similarity: { zh: "相似😀", en: "Similar 😀" } },
      ],
    },

    casp: {
      toolName: "CASP-SR",
      aiWorkflow: {
        zh: "使用 CASP-SR 評讀機器人進行 AI 與人類合作評讀，AI 先行評讀後由人類驗證。",
        en: "Used CASP-SR appraisal bot for AI-human collaborative appraisal — AI appraises first, then human validates.",
      },
      // CORRECTED: Kappa = 1 (all 11 items match). Slide 25 showed both 1 and 0.83; since all scores are 😀/😀, use 1.
      kappa: "1",
      kappaInterpretation: { zh: "完全一致", en: "Perfect agreement" },
      scores: [
        {
          id: "Q1",
          question: { zh: "是否明確提出研究問題？", en: "Was there a clear research question?" },
          ai: "yes", human: "yes",
          evidence: {
            zh: "研究問題：評估靜脈注射鐵劑治療心衰竭合併缺鐵性貧血患者的療效及副作用。與文獻內提及的研究問題和 PICO 相符。",
            en: "Research question: evaluating efficacy and AEs of IV iron for HF + IDA patients. Consistent with the study's stated PICO.",
          },
        },
        {
          id: "Q2",
          question: { zh: "是否搜尋合適的研究設計？", en: "Did they search for appropriate study designs?" },
          ai: "yes", human: "yes",
          evidence: {
            zh: "研究問題與介入的有效性有關，最適當的研究設計為 RCT。文獻中的納入條件和搜尋策略均有提及只納入 RCT。",
            en: "The question concerns intervention efficacy; most appropriate design is RCT. Inclusion criteria and search strategy both specify RCTs only.",
          },
        },
        {
          id: "Q3a",
          question: { zh: "文獻搜尋是否完整？", en: "Was the literature search comprehensive?" },
          ai: "yes", human: "yes",
          evidence: {
            zh: "使用具代表性的資料庫（PubMed, Embase, Cochrane），以結構化的策略進行檢索。與文獻內提及的資料庫選擇、語言限制等檢索策略相符。",
            en: "Used representative databases (PubMed, Embase, Cochrane) with structured search strategy. Consistent with the study's reported search approach.",
          },
        },
        {
          id: "Q3b",
          question: { zh: "文獻篩選是否適當？", en: "Was the study selection appropriate?" },
          ai: "yes", human: "yes",
          evidence: {
            zh: "由兩位作者獨立篩選文獻，如有分歧會進行討論並諮詢第三位作者。總共篩選出 14 篇文獻。",
            en: "Two authors independently screened literature; disagreements resolved by discussion and third author consultation. 14 studies ultimately included.",
          },
        },
        {
          id: "Q3c",
          question: { zh: "文獻納入是否完整？", en: "Was study inclusion complete?" },
          ai: "yes", human: "yes",
          evidence: {
            zh: "與文獻內提及的文獻篩選條件、流程、結果相符。",
            en: "Consistent with the study's screening criteria, process, and results.",
          },
        },
        {
          id: "Q3d",
          question: { zh: "檢索策略是否充分？（總結）", en: "Was the search strategy adequate overall?" },
          ai: "yes", human: "yes",
          evidence: {
            zh: "搜尋策略涵蓋多資料庫，納入標準明確，篩選流程透明。",
            en: "Search strategy covered multiple databases, inclusion criteria clear, screening process transparent.",
          },
        },
        {
          id: "Q4",
          question: { zh: "是否評估初級研究的效度？", en: "Was the quality of included studies assessed?" },
          ai: "yes", human: "yes",
          evidence: {
            zh: "使用 Cochrane RoB 2.0，每項風險分類為 high/low/unclear。完整列出七項評估指標，由兩位作者獨立評估。",
            en: "Used Cochrane RoB 2.0 with risk classified as high/low/unclear. All seven domains assessed by two independent authors.",
          },
        },
        {
          id: "Q5a",
          question: { zh: "數據擷取是否適當？", en: "Was data extraction appropriate?" },
          ai: "yes", human: "yes",
          evidence: {
            zh: "由兩位作者獨立擷取資料，如有分歧由第三位作者裁決。",
            en: "Two authors independently extracted data; disagreements adjudicated by third author.",
          },
        },
        {
          id: "Q5b",
          question: { zh: "數據呈現是否適當？", en: "Was data presentation appropriate?" },
          ai: "yes", human: "yes",
          evidence: {
            zh: "表格呈現個別研究的關鍵特徵（樣本數、年齡、性別、介入與對照組治療細節、評估時間點）。森林圖顯示異質性統計 (I²) 及效應檢定 (p 值)。",
            en: "Tables present key study characteristics (sample size, age, sex, intervention details, timepoints). Forest plots show heterogeneity (I²) and effect tests (p-values).",
          },
        },
        {
          id: "Q6",
          question: { zh: "數據合併是否適當？", en: "Was data combination appropriate?" },
          ai: "yes", human: "yes",
          evidence: {
            zh: "使用 RevMan 5.4 進行分析。提供 OR、95% CI 與 p 值。根據異質性程度選擇隨機效應或固定效應模型。進行敏感性分析與次族群分析。使用 funnel plot 與 Begg's rank test 檢測發表偏誤。",
            en: "Used RevMan 5.4. Provided OR, 95% CI, p-values. Selected random/fixed effects based on heterogeneity. Conducted sensitivity and subgroup analyses. Used funnel plot and Begg's rank test for publication bias.",
          },
        },
        {
          id: "Q7",
          question: { zh: "是否提及研究限制？", en: "Were study limitations discussed?" },
          ai: "yes", human: "yes",
          evidence: {
            zh: "文中有提及研究限制：(1) 缺乏個體層級資料，部分結果存在顯著異質性；(2) 外部因素（如 COVID-19 疫情）對入組與住院/死亡率的影響；(3) 干擾因素（對照組接受院外 IV iron 或口服 iron）。",
            en: "Limitations discussed: (1) lack of individual-level data, some results with significant heterogeneity; (2) external factors (e.g. COVID-19) affecting enrollment and outcomes; (3) confounders (control group receiving out-of-hospital IV or oral iron).",
          },
        },
      ],
    },

    results: {
      outcomes: [
        {
          category: "benefit",
          name: { zh: "初次心衰竭死亡率", en: "First CV death" },
          sampleSize: "6339 人 (10 RCT)",
          effectSize: "OR",
          value: "0.73",
          ci: "[0.58, 0.92]",
        },
        {
          category: "benefit",
          name: { zh: "整體死亡率", en: "All-cause mortality" },
          sampleSize: "6537 人 (12 RCT)",
          effectSize: "OR",
          value: "0.95",
          ci: "[0.84, 1.07]",
        },
        {
          category: "benefit",
          name: { zh: "整體心血管死亡率", en: "Overall CV mortality" },
          sampleSize: "6513 人 (11 RCT)",
          effectSize: "OR",
          value: "0.88",
          ci: "[0.76, 1.01]",
        },
        {
          category: "risk",
          name: { zh: "過敏反應", en: "Allergic reactions" },
          sampleSize: "1796 人 (5 RCT)",
          effectSize: "OR",
          value: "0.63",
          ci: "[0.36, 1.09]",
        },
      ],
      // IV iron case has no subgroup by concentration — use a single primary outcome display
      keyOutcome: null,
    },

    // CORRECTED: MID section — the original slide 37 was copy-pasted from atropine (SE MID = 0.25D).
    // This case uses OR (binary outcome). For binary outcomes, Core GRADE Paper 2 recommends
    // null threshold (OR=1) + OIS check, NOT a traditional MID. The team correctly applied this on slide 40.
    mid: {
      outcome: {
        zh: "初次心衰竭死亡率（二元變項 Odds Ratio）",
        en: "First CV death (binary outcome, Odds Ratio)",
      },
      method: {
        zh: "Null 閾值法（適用於二元結果指標）",
        en: "Null threshold approach (for binary outcomes)",
      },
      derivation: {
        zh: "本案結果指標為二元變項（初次心血管死亡：是/否），使用 Odds Ratio (OR) 表示效應量。根據 Core GRADE Paper 2 (BMJ 2025;389:e081904)，二元結果指標的不精確性評估以 null 為閾值（OR = 1），搭配 CI 比值與最佳資訊量 (OIS) 進行判斷，而非訂定傳統的 MID。",
        en: "The primary outcome is binary (first CV death: yes/no), reported as Odds Ratio (OR). Per Core GRADE Paper 2 (BMJ 2025;389:e081904), imprecision for binary outcomes is assessed using the null threshold (OR = 1), combined with CI ratio and Optimal Information Size (OIS), rather than defining a traditional MID.",
      },
      value: "null",
      unit: "(OR = 1)",
      reference: "BMJ 2025;389:e081904 (Core GRADE Paper 2: Imprecision).",
      // Flag to tell CaseDetail that this uses null threshold instead of traditional MID
      isNullThreshold: true,
    },

    grade: {
      startingLevel: { zh: "高（SR of RCTs）", en: "High (SR of RCTs)" },
      assessments: {
        "IV iron": {
          // Override the GRADE heading label (avoid "IV iron atropine" bug)
          label: { zh: "靜脈注射補鐵", en: "IV Iron" },
          domains: [
            {
              name: { zh: "誤差風險", en: "Risk of Bias" },
              ref: "BMJ 2025;389:e083864",
              decision: 0,
              rationale: {
                zh: "低誤差風險 10 篇、中誤差風險 4 篇。無納入高誤差風險的初級研究 → 不須依據誤差風險進行次族群分析。",
                en: "Low risk: 10, some concerns: 4. No high-risk studies included → no need for RoB-based subgroup analysis.",
              },
            },
            {
              name: { zh: "不精確性", en: "Imprecision" },
              ref: "BMJ 2025;389:e081904",
              decision: 0,
              rationale: {
                zh: "使用 null 閾值（OR = 1）。CI [0.58, 0.92] 不跨越閾值。CI 比值 = 0.92 / 0.58 ≈ 1.59 < 2.5 → 區間窄。試驗人數 N = 6339 > OIS = 4016 → 資訊量充足。",
                en: "Null threshold (OR = 1). CI [0.58, 0.92] does not cross null. CI ratio = 0.92/0.58 ≈ 1.59 < 2.5 → narrow interval. N = 6339 > OIS = 4016 → adequate information.",
              },
              // Number line for binary outcome: null at OR=1
              numberLine: { pointEst: 0.73, ciLow: 0.58, ciHigh: 0.92, mid: 1.0, isOR: true },
            },
            {
              name: { zh: "不一致性", en: "Inconsistency" },
              ref: "BMJ 2025;389:e081905",
              decision: 0,
              rationale: {
                zh: "各研究 CI 重疊比例高。點估計值大多落在同側。利用次族群分析可解釋不一致性。",
                en: "High CI overlap across studies. Point estimates mostly on the same side. Subgroup analysis can explain inconsistency.",
              },
            },
            {
              name: { zh: "PICO 不直接性", en: "Indirectness" },
              ref: "BMJ 2025;389:e083865",
              decision: 0,
              rationale: {
                zh: "文獻與臨床案例的 PICO 相似度高。",
                en: "High PICO similarity between study and clinical case.",
              },
            },
            {
              name: { zh: "發表偏誤", en: "Publication Bias" },
              ref: "BMJ 2025;389:e083864",
              decision: -1,
              rationale: {
                zh: "部分研究屬於小型研究，非由企業贊助。執行統合分析，研究數量共 10 篇（初次心衰竭死亡率結果指標）。漏斗圖上的研究分布不對稱。",
                en: "Some small studies, not industry-sponsored. MA performed with 10 studies (for first CV death outcome). Funnel plot distribution asymmetric.",
              },
            },
          ],
          totalDowngrade: -1,
          certaintyLevel: "moderate",
          summary: { zh: "整體扣 1 分 → 證據品質：中", en: "Total -1 → Certainty: Moderate" },
        },
      },
    },

    supportingRCT: {
      title: { zh: "較新的 RCT 佐證", en: "Supporting Evidence: Recent RCT" },
      purpose: {
        zh: "評估 ferric carboxymaltose 對心衰竭合併缺鐵性貧血患者心血管結果的療效與安全性（使用更積極的維持劑量策略）",
        en: "Evaluate efficacy and safety of ferric carboxymaltose on cardiovascular outcomes in HF + ID patients (using a more aggressive maintenance dosing strategy)",
      },
      population: {
        zh: "1105 位 HFrEF (LVEF ≤ 45%) 合併缺鐵性貧血患者，中位年齡 72 歲，67% 男性，6 個歐洲國家 70 個中心",
        en: "1105 patients with HFrEF (LVEF ≤ 45%) and iron deficiency, median age 72, 67% male, 70 sites in 6 European countries",
      },
      intervention: {
        zh: "Ferric carboxymaltose 初始劑量最高 2000mg，之後每 4 個月 500mg 維持（n=558）vs. 安慰劑（n=547）",
        en: "Ferric carboxymaltose initial dose up to 2000mg, then 500mg every 4 months maintenance (n=558) vs. placebo (n=547)",
      },
      outcomes: {
        zh: "主要指標：(1) 心血管死亡或首次心衰竭住院時間 (2) 總心衰竭住院次數 (3) TSAT < 20% 次族群之心血管死亡或首次心衰竭住院",
        en: "Primary: (1) time to CV death or first HHF, (2) total HHF, (3) CV death or first HHF in TSAT < 20% subgroup",
      },
      conclusion: {
        zh: "Ferric carboxymaltose 耐受性良好，但在主要指標上未達統計顯著差異。研究受 COVID-19 影響（34% 中斷率）。然而，綜合所有 IV iron 試驗的統合分析仍支持 IV iron 對 HFrEF 患者具臨床效益。",
        en: "Ferric carboxymaltose was well tolerated but did not significantly improve primary outcomes vs. placebo. Trial affected by COVID-19 (34% discontinuation). However, pooled meta-analysis of all IV iron trials still supports clinical benefit in HFrEF.",
      },
      citation: "Anker SD et al. JAMA. 2025;333(22):1965-1976. (FAIR-HF2)",
    },

    annotations: {
      zh: [
        "PICO 比較表是 Appraise 階段的第一步——確認文獻與案例的匹配度。本案文獻的比較組為安慰劑，而案例的比較組為口服補鐵，這是最主要的差異。",
        "CASP 評讀中，所有 11 題均為「是」(😀)，反映這篇統合分析的方法學品質優良。",
        "本案結果指標為二元變項 (OR)，不需要訂定傳統 MID。不精確性評估使用 null 閾值 (OR = 1) 搭配 CI 比值 (< 2.5) 及 OIS 檢查——這是 Core GRADE Paper 2 對二元結果指標的標準流程。",
        "唯一被扣分的領域是發表偏誤（-1），因為漏斗圖不對稱。最終 GRADE 評等為 Moderate。",
        "數線圖用於視覺化 OR 相對於 null 閾值 (1.0) 的位置——注意方向性：OR < 1 表示 IV iron 組有利。",
      ],
      en: [
        "PICO comparison is the first Appraise step — confirming study-case match. Key discrepancy: study comparator is placebo, case comparator is oral iron.",
        "All 11 CASP items scored 'Yes' (😀), reflecting excellent methodological quality of this meta-analysis.",
        "This case uses binary outcomes (OR) — no traditional MID needed. Imprecision assessed via null threshold (OR = 1) with CI ratio (< 2.5) and OIS check — standard Core GRADE Paper 2 workflow for binary outcomes.",
        "Only publication bias was downgraded (-1), due to asymmetric funnel plot. Final GRADE: Moderate.",
        "Number line visualizes OR relative to null threshold (1.0) — note directionality: OR < 1 favors IV iron.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // PHASE 5: APPLY
  // ═══════════════════════════════════════════
  apply: {
    applicability: {
      conclusion: {
        zh: "相似程度高，應用上可行。",
        en: "High similarity, applicable.",
      },
      rows: [
        { item: { zh: "年齡/性別", en: "Age/Sex" }, study: { zh: "51-75.4 歲", en: "51-75.4 y/o" }, case_: { zh: "72 歲男性", en: "72 y/o male" }, similarity: { zh: "相似😀", en: "Similar 😀" } },
        { item: { zh: "國家/種族", en: "Ethnicity" }, study: { zh: "未提及（歐美為主）", en: "Not specified (mostly Western)" }, case_: { zh: "台灣", en: "Taiwan" }, similarity: { zh: "接近😐", en: "Close 😐" } },
        { item: { zh: "目標疾病", en: "Condition" }, study: { zh: "心衰竭 + 缺鐵性貧血", en: "HF + IDA" }, case_: { zh: "心衰竭 + 缺鐵性貧血", en: "HF + IDA" }, similarity: { zh: "相似😀", en: "Similar 😀" } },
        { item: { zh: "介入治療", en: "Intervention" }, study: { zh: "靜脈注射補鐵", en: "IV iron" }, case_: { zh: "靜脈注射補鐵", en: "IV iron" }, similarity: { zh: "相似😀", en: "Similar 😀" } },
        { item: { zh: "對照治療", en: "Comparator" }, study: { zh: "安慰劑/標準治療", en: "Placebo/standard care" }, case_: { zh: "口服補鐵", en: "Oral iron" }, similarity: { zh: "不相似😟", en: "Dissimilar 😟" } },
        { item: { zh: "預期目標", en: "Outcome goal" }, study: { zh: "心衰竭死亡率↓", en: "HF mortality ↓" }, case_: { zh: "住院/死亡率↓", en: "Hospitalization/mortality ↓" }, similarity: { zh: "相似😀", en: "Similar 😀" } },
      ],
    },
    benefitRisk: {
      options: [
        {
          name: { zh: "靜脈注射補鐵", en: "IV iron" },
          regimen: {
            zh: "第 1 週：1000mg 分 2 劑 (d0, 6)。第 12、24、36 週：500mg 1 劑",
            en: "Week 1: 1000mg in 2 doses (d0, 6). Weeks 12, 24, 36: 500mg per dose",
          },
          benefits: {
            zh: ["作用迅速", "臨床證據較充分，多篇 RCT 已顯示 HF 患者靜脈注射補鐵的效益"],
            en: ["Rapid onset of action", "Stronger clinical evidence — multiple RCTs demonstrate benefit in HF patients"],
          },
          risks: {
            zh: ["較容易誘發過敏反應", "可能導致低血磷"],
            en: ["Higher risk of allergic reactions", "May cause hypophosphatemia"],
          },
        },
        {
          name: { zh: "口服補鐵", en: "Oral iron" },
          regimen: { zh: "300mg TID", en: "300mg TID" },
          benefits: {
            zh: ["服藥便利性高", "較不易產生嚴重不良反應"],
            en: ["High convenience", "Lower risk of serious adverse reactions"],
          },
          risks: {
            zh: ["口服鐵劑吸收率較差", "臨床證據不充足"],
            en: ["Poor oral iron absorption", "Insufficient clinical evidence"],
          },
        },
      ],
    },
    costAnalysis: {
      options: [
        {
          name: { zh: "靜脈注射補鐵", en: "IV iron" },
          directCost: {
            zh: "藥物成本：100mg 鐵注射液健保價 NT$64/瓶。一年花費 = 64×10 瓶×2 次 + 64×5 瓶×3 次 = NT$2,240。醫療成本：掛號費 NT$150/次，一年 150×5 次 = NT$750。",
            en: "Drug: 100mg iron injection NHI price NT$64/vial. Annual = 64×10 vials×2 sessions + 64×5 vials×3 sessions = NT$2,240. Medical: registration NT$150/visit × 5 visits = NT$750.",
          },
          indirectCost: {
            zh: "家屬收入損失：40-50 歲年薪 NT$83-92 萬 → 時薪 ≈ NT$399-442。一年 = 399-442 × 2 小時 × 5 次 = NT$3,990-4,420。",
            en: "Caregiver income loss: age 40-50 annual salary NT$830K-920K → hourly ≈ NT$399-442. Annual = 399-442 × 2h × 5 visits = NT$3,990-4,420.",
          },
          totalAnnual: { zh: "NT$6,980-7,410", en: "NT$6,980-7,410" },
        },
        {
          name: { zh: "口服補鐵", en: "Oral iron" },
          directCost: {
            zh: "藥物成本：100mg 鐵咀嚼錠健保價 NT$3/顆。一年花費 = 3×3 顆×3 次×365 天 = NT$9,855。醫療成本：掛號費 NT$150/次，一年 150×4 次 = NT$600。",
            en: "Drug: 100mg iron chewable NHI price NT$3/tablet. Annual = 3×3 tabs×3 times×365 days = NT$9,855. Medical: NT$150/visit × 4 visits = NT$600.",
          },
          indirectCost: {
            zh: "家屬收入損失：399-442 × 2 小時 × 4 次 = NT$3,192-3,536。",
            en: "Caregiver income loss: 399-442 × 2h × 4 visits = NT$3,192-3,536.",
          },
          totalAnnual: { zh: "NT$13,647-13,991", en: "NT$13,647-13,991" },
        },
      ],
    },
    efficacySummary: {
      title: { zh: "效益分析", en: "Efficacy Analysis" },
      rows: [
        {
          group: { zh: "初次心衰竭死亡率", en: "First CV death" },
          sampleSize: "6339 人 (10 RCT)",
          md: "OR 0.73",
          ci: "[0.58, 0.92]",
          clinicalMeaning: {
            zh: "CER = 0.321, RR ≈ 0.80, ARR = 0.064 → NNT ≈ 16",
            en: "CER = 0.321, RR ≈ 0.80, ARR = 0.064 → NNT ≈ 16",
          },
          certainty: "moderate",
        },
      ],
      nnt: {
        value: 16,
        derivation: {
          zh: "CER = 989/3085 = 0.321, OR = 0.73。RR = OR / [1 − CER + (CER × OR)] ≈ 0.80。ARR = CER − (CER × RR) = 0.064。NNT = 1/ARR ≈ 16。",
          en: "CER = 989/3085 = 0.321, OR = 0.73. RR = OR / [1 − CER + (CER × OR)] ≈ 0.80. ARR = CER − (CER × RR) = 0.064. NNT = 1/ARR ≈ 16.",
        },
        interpretation: {
          zh: "每治療 16 位 HF 患者可改善一例初次心血管死亡。",
          en: "Treating 16 HF patients with IV iron prevents one first CV death.",
        },
      },
      conclusion: {
        zh: "靜脈注射補鐵可降低心衰竭合併缺鐵性貧血患者的初次心血管死亡風險（NNT = 16），證據品質中等。",
        en: "IV iron reduces the risk of first CV death in HF + IDA patients (NNT = 16), with moderate certainty evidence.",
      },
    },
    evidenceToDecision: {
      reference: "BMJ 2025;389:e083867",
      factors: [
        {
          key: "benefitRisk",
          label: { zh: "利益風險", en: "Benefit vs. Risk" },
          assessment: {
            zh: "利益：降低初次心血管死亡風險 (OR 0.73)，作用迅速。風險：較容易誘發過敏反應、可能導致低血磷。",
            en: "Benefit: reduced first CV death risk (OR 0.73), rapid onset. Risk: allergic reactions, possible hypophosphatemia.",
          },
          direction: 1,
        },
        {
          key: "evidenceQuality",
          label: { zh: "證據品質", en: "Evidence Quality" },
          assessment: {
            zh: "Moderate（僅因發表偏誤扣 1 分）。",
            en: "Moderate (only publication bias downgraded -1).",
          },
          direction: 1,
        },
        {
          key: "valuesPreferences",
          label: { zh: "價值偏好", en: "Values & Preferences" },
          assessment: {
            zh: "患者遵醫囑性佳，能配合定期靜脈注射。希望減少住院頻率。",
            en: "Patient has good adherence, can comply with periodic IV infusions. Hopes to reduce hospitalization frequency.",
          },
          direction: 1,
        },
        {
          key: "costEffectiveness",
          label: { zh: "成本效益", en: "Cost-Effectiveness" },
          assessment: {
            zh: "IV 補鐵年費 NT$6,980-7,410，低於口服補鐵 NT$13,647-13,991。NNT = 16，效益分析呈正面。",
            en: "IV iron annual cost NT$6,980-7,410 vs. oral iron NT$13,647-13,991. NNT = 16, positive cost-effectiveness.",
          },
          direction: 2,
        },
        {
          key: "feasibility",
          label: { zh: "可行性", en: "Feasibility" },
          assessment: {
            zh: "需定期回院接受靜脈注射（約每 12 週一次維持劑量），對患者有一定負擔。",
            en: "Requires periodic hospital visits for IV infusion (~every 12 weeks for maintenance), some burden on patient.",
          },
          direction: 1,
        },
        {
          key: "acceptability",
          label: { zh: "接受度", en: "Acceptability" },
          assessment: {
            zh: "患者對靜脈注射接受度尚可，且不須頻繁服藥。",
            en: "Patient acceptability of IV injection is reasonable, and no frequent oral medication needed.",
          },
          direction: 1,
        },
      ],
      recommendationStrength: "conditional",
      recommendationLabel: {
        zh: "部分推薦",
        en: "Conditional recommendation",
      },
      reasonForConditional: {
        zh: "多數面向偏向贊成，但證據品質為中等（非高），且文獻比較組為安慰劑而非口服補鐵，存在間接性。因此為部分推薦而非強烈推薦。",
        en: "Most factors favor recommendation, but evidence certainty is only moderate (not high), and the study comparator was placebo rather than oral iron (indirectness). Therefore conditional, not strong.",
      },
    },
    patientSummary: {
      zh: "Peter 您好，經過團隊的縝密搜尋後，找到對你最有幫助的研究支持：靜脈注射補鐵可能會降低因心衰竭死亡的風險，與口服鐵劑相比成本更低，而且不須頻繁服藥，對您而言是更方便的選擇。",
      en: "Dear Peter, after our team's thorough search, the most helpful research supports: IV iron may reduce the risk of dying from heart failure, costs less than oral iron supplements, and doesn't require frequent medication — making it a more convenient option for you.",
    },
    annotations: {
      zh: [
        "案例適用性表直接延伸 Phase 4 的 PICO 比較。最主要的差異是比較組：文獻用安慰劑，案例用口服補鐵。",
        "利益風險比較要注意：IV 補鐵的臨床證據較充分（多篇大型 RCT），而口服補鐵的證據不充足。",
        "成本分析是本案的亮點——IV 補鐵年費反而比口服補鐵低（NT$6,980-7,410 vs. NT$13,647-13,991），因為口服鐵劑需每天服用。",
        "NNT = 16 代表每治療 16 位心衰竭患者可預防 1 例初次心血管死亡。這是將 OR 轉換為臨床可理解指標的關鍵步驟。",
        "EtD 給予「部分推薦」而非「強烈推薦」，主要因為證據品質為中等，且文獻與案例的比較組不完全一致（安慰劑 vs. 口服補鐵）。",
      ],
      en: [
        "Applicability table extends Phase 4 PICO comparison. Key discrepancy: study used placebo as comparator, case uses oral iron.",
        "Benefit-risk note: IV iron has stronger clinical evidence (multiple large RCTs), while oral iron evidence is insufficient.",
        "Cost analysis is this case's highlight — IV iron annual cost is actually lower than oral iron (NT$6,980-7,410 vs. NT$13,647-13,991), because oral iron requires daily dosing.",
        "NNT = 16 means treating 16 HF patients prevents 1 first CV death. This is the key step of converting OR into a clinically interpretable measure.",
        "EtD gives 'conditional' rather than 'strong' recommendation, mainly because evidence is moderate and study comparator (placebo) differs from case comparator (oral iron).",
      ],
    },
  },
};

export default iviron2025;
