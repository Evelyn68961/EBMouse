// src/data/cases/cpm2025.js
// Fully structured case data extracted from the 2025 EBM competition slides (三練, 55 slides)
// Case: Continuous Passive Motion (CPM) for post-TKA rehabilitation in osteoarthritis
//
// CORRECTIONS APPLIED (original slides had copy-paste errors from the atropine case):
// 1. Slides 48-49: Cost data was atropine case — replaced with correct CPM vs PT costs from slides 50-51
// 2. Slide 52 conclusion: Said "0.05% atropine 眼藥水具顯著治療效益" — corrected to CPM conclusion
// 3. Slide 52 MID values: Listed "~10" and "5~10" inconsistent with derivation slide (MID=2°) — using MID=2° from slide 35

const cpm2025 = {
  meta: {
    id: "cpm-tka-2025",
    year: 2025,
    title: {
      zh: "連續被動性運動 (CPM) 對全膝關節置換術後復健的效益",
      en: "Continuous Passive Motion (CPM) for Post-TKA Rehabilitation",
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
    tags: ["SR/MA", "RCT", "Geriatrics", "Orthopedics", "Rehabilitation"],
    article: {
      citation: {
        zh: "CPM 對 TKA 術後骨關節炎患者的療效 SR/MA",
        en: "CPM efficacy for post-TKA osteoarthritis patients — SR/MA",
      },
      pmid: "",
      title: {
        zh: "探討 CPM 相較於物理治療，對於改善關節功能與降低相關併發症的效益",
        en: "Evaluating CPM vs. physical therapy for improving joint function and reducing complications",
      },
      studyType: "SR with MA of RCTs",
      rctCount: 16,
      totalParticipants: 1224,
    },
    gradeResults: {
      "CPM": "low",
    },
    recommendation: {
      zh: "部分不推薦使用 CPM 進行復健",
      en: "Conditional recommendation against CPM for rehabilitation",
    },
  },

  // ═══════════════════════════════════════════
  // PHASE 1: ASSESS
  // ═══════════════════════════════════════════
  assess: {
    scenario: {
      zh: "72 歲盧媽媽喜好戶外活動，近幾年感到關節不適，經診斷為骨關節炎，決定接受左側全膝關節置換術 (TKA)。",
      en: "72-year-old Mrs. Lu enjoys outdoor activities. After years of joint discomfort, she was diagnosed with osteoarthritis and decided to undergo left total knee arthroplasty (TKA).",
    },
    clinicalQuestions: {
      zh: [
        "電針或生理回饋的止痛效果是否比止痛藥好？",
        "連續被動性運動對於關節活動度的改善效果？",
      ],
      en: [
        "Is electroacupuncture or biofeedback better than analgesics for pain?",
        "How effective is continuous passive motion for improving range of motion?",
      ],
    },
    patientProfile: {
      age: { zh: "72 歲", en: "72 years old" },
      sex: { zh: "女", en: "Female" },
      condition: { zh: "骨關節炎（已接受左側 TKA）", en: "Osteoarthritis (post left TKA)" },
      setting: { zh: "住院/術後復健", en: "Inpatient / post-surgical rehab" },
    },
    patientPreferences: {
      zh: [
        "平常有吃維骨力、打過玻尿酸跟血小板濃縮製劑 (PRP)。",
        "不想吃止痛藥，想嘗試用電針或生理回饋的方式止痛。",
        "考慮透過連續被動性運動 (CPM) 加速關節恢復。",
      ],
      en: [
        "Has been taking glucosamine, had hyaluronic acid and PRP injections.",
        "Doesn't want analgesics — wants to try electroacupuncture or biofeedback for pain.",
        "Considering continuous passive motion (CPM) to accelerate joint recovery.",
      ],
    },
    backgroundKnowledge: {
      diseaseOverview: {
        zh: "骨關節炎是關節軟骨逐漸磨損退化，導致關節疼痛、僵硬和活動受限的慢性疾病。",
        en: "Osteoarthritis is a chronic condition where joint cartilage gradually wears down, causing pain, stiffness, and limited mobility.",
      },
      riskFactors: {
        zh: "高齡者、肥胖者、關節曾受傷者、從事重複性關節使用工作者以及有家族遺傳史的人群風險較高。",
        en: "Higher risk in elderly, obese, those with prior joint injuries, repetitive joint use occupations, and family history.",
      },
      treatmentOptions: {
        zh: "藥物止痛消炎、物理治療、適度運動、體重控制，嚴重時可考慮關節置換手術。",
        en: "Analgesics/anti-inflammatories, physical therapy, moderate exercise, weight control; joint replacement for severe cases.",
      },
    },
    treatmentIssues: [
      {
        name: { zh: "電針止痛", en: "Electroacupuncture" },
        regimen: {
          zh: "每週 2-3 次，每次 20-30 分鐘，持續 4-8 週。",
          en: "2-3 times per week, 20-30 minutes each, for 4-8 weeks.",
        },
        issue: {
          zh: "對骨關節炎患者是否具真實療效？與其他止痛方法相比，是否具絕對優勢？",
          en: "Does it have real efficacy for osteoarthritis? Does it have absolute advantage over other pain methods?",
        },
      },
      {
        name: { zh: "連續被動性運動 (CPM)", en: "Continuous Passive Motion (CPM)" },
        regimen: {
          zh: "每日 1-2 次，每次 10-15 分鐘，持續數週至數月。",
          en: "1-2 times daily, 10-15 minutes each, for weeks to months.",
        },
        issue: {
          zh: "對骨關節炎患者是否能提供足夠的治療效益？相較於主動運動的療效差異？",
          en: "Can it provide sufficient benefit? How does it compare to active exercise?",
        },
      },
    ],
    sources: {
      zh: "UpToDate、DynaMed、臨床指引",
      en: "UpToDate, DynaMed, clinical guidelines",
    },
    annotations: {
      zh: [
        "這個案例的病人偏好很明確：不想吃止痛藥、喜好戶外活動（意味著關節活動度恢復對她很重要）。",
        "兩個臨床問題分別對應兩種非藥物介入——電針（止痛）和 CPM（關節恢復）。最終選擇 CPM 作為主要 PICOT，因為關節活動度恢復與病人的生活品質更直接相關。",
        "注意這個案例的結論是「部分不推薦」。這展示了 EBM 流程不一定導向正面推薦，忠實呈現證據更重要。",
      ],
      en: [
        "Patient preferences are clear: doesn't want analgesics, enjoys outdoor activities (meaning ROM recovery is crucial for her quality of life).",
        "Two clinical questions map to two non-pharmacological interventions — electroacupuncture (pain) and CPM (joint recovery). CPM was chosen as primary PICOT because ROM recovery directly impacts the patient's lifestyle.",
        "This case ends with 'conditional against'. This demonstrates that EBM doesn't always lead to positive recommendations; faithfully presenting evidence matters more.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // PHASE 2: ASK
  // ═══════════════════════════════════════════
  ask: {
    picots: [
      {
        id: 1,
        label: "PICOT-1",
        isPrimary: false,
        questionType: "treatment",
        p: {
          zh: "接受全膝關節置換手術 (TKA) 的骨關節炎高齡患者，不想吃止痛藥，希望加速關節修復",
          en: "Elderly osteoarthritis patients post-TKA, not wanting analgesics, hoping to accelerate joint recovery",
        },
        i: {
          zh: "電針止痛（每週 2-3 次）",
          en: "Electroacupuncture (2-3 times/week)",
        },
        c: {
          zh: "口服止痛藥止痛（一天 3 次）",
          en: "Oral analgesics (3 times/day)",
        },
        o: {
          zh: "疼痛改善 (VAS, WOMAC)",
          en: "Pain improvement (VAS, WOMAC)",
        },
        t: {
          zh: "6-12 週",
          en: "6-12 weeks",
        },
      },
      {
        id: 2,
        label: "PICOT-2",
        isPrimary: true,
        questionType: "treatment",
        p: {
          zh: "接受全膝關節置換手術 (TKA) 的骨關節炎高齡患者，不想吃止痛藥，希望加速關節修復",
          en: "Elderly osteoarthritis patients post-TKA, not wanting analgesics, hoping to accelerate joint recovery",
        },
        i: {
          zh: "以連續被動性運動 (CPM) 進行復健（每日 1-2 次）",
          en: "Rehabilitation with continuous passive motion (CPM) (1-2 times/day)",
        },
        c: {
          zh: "以傳統物理治療進行復健（每週 2-3 次）",
          en: "Rehabilitation with conventional physical therapy (2-3 times/week)",
        },
        o: {
          zh: "膝關節活動度 (ROM) 改善",
          en: "Knee range of motion (ROM) improvement",
        },
        t: {
          zh: "12 個月",
          en: "12 months",
        },
        justification: {
          zh: "患者喜愛戶外運動，關節復原程度高度影響生活品質",
          en: "Patient enjoys outdoor activities; joint recovery degree highly impacts quality of life",
        },
      },
    ],
    annotations: {
      zh: [
        "PICOT-2 選擇理由直接連結病人偏好：盧媽媽喜歡戶外活動 → 關節活動度恢復是首要關注。",
        "對照組選擇「傳統物理治療」而非「不治療」——因為術後不做任何復健不現實，所以比較的是兩種復健方法。",
        "追蹤 12 個月比 PICOT-1 的 6-12 週長，因為關節活動度的恢復需要更長的觀察期。",
      ],
      en: [
        "PICOT-2 rationale directly links to patient preferences: Mrs. Lu enjoys outdoor activities → ROM recovery is the top priority.",
        "Comparator is 'conventional PT' rather than 'no treatment' — because doing nothing post-surgery is unrealistic, so we compare two rehab methods.",
        "12-month follow-up is longer than PICOT-1's 6-12 weeks, because ROM recovery requires a longer observation period.",
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
        { picot: "P", freeText: ["Osteoarthritis", "Total knee arthroplasty"], mesh: ['"Osteoarthritis, Knee"[MeSH]', '"Arthroplasty, Replacement, Knee"[MeSH]'] },
        { picot: "I", freeText: ["Continuous passive motion"], mesh: ['"Motion Therapy, Continuous Passive"[MeSH]'] },
        { picot: "C", freeText: ["Physical therapy"], mesh: ['"Physical Therapy Modalities"[MeSH]'], note: { zh: "通常不加入搜尋式", en: "Usually excluded from search" } },
        { picot: "O", freeText: ["Range of Motion"], mesh: ['"Range of Motion, Articular"[MeSH]'], note: { zh: "通常不加入搜尋式", en: "Usually excluded from search" } },
      ],
      strategy: {
        zh: "Free text 和 MeSH term 用 OR 連結同概念，再用 AND 合併不同概念。",
        en: "Free text and MeSH terms connected with OR within concepts, then AND across concepts.",
      },
      booleanFormula:
        '((Osteoarthritis) OR (Total knee arthroplasty) OR "Osteoarthritis, Knee"[MeSH] OR "Arthroplasty, Replacement, Knee"[MeSH]) AND ((Continuous passive motion) OR "Motion Therapy, Continuous Passive"[MeSH])',
    },
    pubmedWorkflow: {
      zh: "使用 PubMed Advanced Search，逐步建立 #1 (P)、#2 (I)，再用 #1 AND #2 合併。Automatic Term Mapping 自動將 Free Text 對應到 MeSH。",
      en: "Used PubMed Advanced Search to build #1 (P) and #2 (I), combined with AND. Automatic Term Mapping handled Free Text to MeSH mapping.",
    },
    litSuggest: {
      input: { zh: "224 篇 PubMed 初步結果", en: "224 initial PubMed results" },
      positive: 38,
      negative: 186,
      description: {
        zh: "使用 LitSuggest 將 224 篇 PubMed 結果篩選為 38 篇 Positive。",
        en: "LitSuggest screened 224 PubMed results down to 38 Positive.",
      },
    },
    sraConversion: {
      zh: "使用 SRA 將 PubMed 搜尋式轉換為 Cochrane 和 Embase 格式。",
      en: "Used SRA to convert PubMed search to Cochrane and Embase formats.",
    },
    screeningFlow: {
      initial: { pubmed: 224, embase: 126, cochrane: 1 },
      afterLitSuggest: { pubmed: 38 },
      afterSRFilter: { pubmed: 38, embase: 10, cochrane: 1 },
      srCount: { pubmed: 2, embase: 7, cochrane: 1 },
      picoMatch: 3,
      finalSelected: 1,
    },
    articleSelection: {
      candidates: [
        {
          selected: false,
          rctCount: 10,
          participants: 841,
          description: {
            zh: "探討 CPM 相較於物理治療，在改善關節功能與止痛層面的效益。",
            en: "Evaluating CPM vs. physical therapy for joint function improvement and pain management.",
          },
        },
        {
          selected: true,
          rctCount: 16,
          participants: 1224,
          description: {
            zh: "探討 CPM 相較於物理治療，對於改善關節功能與降低相關併發症的效益。",
            en: "Evaluating CPM vs. physical therapy for improving joint function and reducing complications.",
          },
        },
      ],
      rationale: {
        zh: "選擇第二篇，納入更多 RCT（16 vs 10）和更多受試者（1224 vs 841），且涵蓋併發症指標。",
        en: "Selected the second article: more RCTs (16 vs 10), more participants (1224 vs 841), and includes complication outcomes.",
      },
    },
    annotations: {
      zh: [
        "PubMed 搜尋結果為 224 篇，反映了 CPM + TKA 是一個較專精的研究領域。",
        "LitSuggest 從 224 篇篩到 38 篇，篩選效率依然很高。",
        "文獻選擇時，兩篇候選 SR 的差別在於納入研究數量和結果指標範圍——選擇更全面的那篇。",
      ],
      en: [
        "PubMed returned 224 results, reflecting a more specialized research field for CPM + TKA.",
        "LitSuggest still performed well, screening 224 down to 38.",
        "Article selection: the two candidates differed in study count and outcome scope — the more comprehensive one was chosen.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // PHASE 4: APPRAISE
  // ═══════════════════════════════════════════
  appraise: {
    picoComparison: {
      rows: [
        { element: "P", sub: { zh: "年齡", en: "Age" }, study: { zh: "65-79 歲", en: "65-79 years" }, case_: { zh: "72 歲", en: "72 years old" }, similarity: { zh: "高", en: "High" } },
        { element: "P", sub: { zh: "種族", en: "Ethnicity" }, study: { zh: "歐美澳 + 亞洲", en: "Western + Asian" }, case_: { zh: "台灣", en: "Taiwan" }, similarity: { zh: "中", en: "Moderate" } },
        { element: "P", sub: { zh: "疾病", en: "Condition" }, study: { zh: "骨關節炎（已接受 TKA）", en: "OA (post-TKA)" }, case_: { zh: "骨關節炎（已接受 TKA）", en: "OA (post-TKA)" }, similarity: { zh: "完全一致", en: "Identical" } },
        { element: "I", sub: null, study: { zh: "連續被動性運動 (CPM)", en: "CPM" }, case_: { zh: "連續被動性運動 (CPM)", en: "CPM" }, similarity: { zh: "完全一致", en: "Identical" } },
        { element: "C", sub: null, study: { zh: "傳統物理治療 (PT)", en: "Conventional PT" }, case_: { zh: "傳統物理治療 (PT)", en: "Conventional PT" }, similarity: { zh: "完全一致", en: "Identical" } },
        { element: "O", sub: null, study: { zh: "關節活動度 ROM、住院天數、不良反應", en: "ROM, hospital stay, adverse events" }, case_: { zh: "關節活動度 ROM", en: "ROM" }, similarity: { zh: "高", en: "High" } },
      ],
    },

    casp: {
      tool: "CASP-SR",
      toolDescription: { zh: "SR with MA of RCTs — 架構明確、指引清晰", en: "SR with MA of RCTs — clear structure, explicit guidance" },
      aiWorkflow: {
        zh: "人類從文獻中擷取相關資訊、依據 CASP 指引進行判斷；AI (SR 評讀機器人) 提供題目、取得資訊、依據 CASP 指引進行核實。",
        en: "Human extracts information and judges based on CASP; AI (SR appraisal bot) provides questions, retrieves info, verifies based on CASP guidelines.",
      },
      kappa: 1.0,
      kappaInterpretation: { zh: "完全一致", en: "Perfect agreement" },
      scores: [
        {
          id: "Q1", question: { zh: "是否明確提出研究問題？", en: "Was there a clear research question?" }, human: "yes", ai: "yes",
          evidence: { zh: "研究問題：探討 CPM 對於接受 TKA 的骨關節炎患者有哪些療效與相關併發症。P：接受 TKA 手術的骨關節炎患者、I：術後使用 CPM 裝置、C：未使用 CPM（但有接受其他標準物理治療）、O：膝關節功能、併發症、住院天數。", en: "Research question: evaluating CPM's efficacy and complications in post-TKA OA patients. P: OA patients post-TKA, I: post-op CPM device, C: no CPM (standard PT), O: knee function, complications, hospital stay." },
        },
        {
          id: "Q2", question: { zh: "是否搜尋合適的研究設計？", en: "Did they search for appropriate study designs?" }, human: "yes", ai: "yes",
          evidence: { zh: "文獻中的納入條件和搜尋策略均有提及只納入 RCT。搜尋策略明確提及使用關鍵字 'RCTs'。", en: "Inclusion criteria and search strategy both specify RCTs only. Search explicitly used 'RCTs' keyword." },
        },
        {
          id: "Q3a", question: { zh: "文獻搜尋是否完整？", en: "Was the literature search comprehensive?" }, human: "yes", ai: "yes",
          evidence: { zh: "資料庫：PubMed、Embase、Cochrane、WoS。語言限制：限定英文文獻。時間範圍：2000 年 1 月 ~ 2018 年 5 月。手動搜尋引用文獻。", en: "Databases: PubMed, Embase, Cochrane, WoS. Language: English only. Time: Jan 2000 to May 2018. Handsearched references." },
        },
        {
          id: "Q3b", question: { zh: "文獻篩選是否適當？", en: "Was study selection appropriate?" }, human: "yes", ai: "yes",
          evidence: { zh: "由兩位作者獨立篩選文獻，如有分歧會進行討論 & 諮詢第三位作者。總共篩選出 16 篇文獻。", en: "Two independent reviewers; disagreements resolved by discussion + third author. 16 articles included." },
        },
        {
          id: "Q3c", question: { zh: "文獻納入標準是否合理？", en: "Were inclusion criteria reasonable?" }, human: "yes", ai: "yes",
          evidence: { zh: "研究設計：RCT。目標族群：接受 TKA 的骨關節炎患者。介入措施：實驗組使用 CPM，對照組不使用 CPM。", en: "Design: RCT. Population: OA patients post-TKA. Intervention: CPM vs. no CPM." },
        },
        {
          id: "Q3d", question: { zh: "檢索策略是否充分？（總結）", en: "Was the search strategy adequate overall?" }, human: "yes", ai: "yes",
          evidence: { zh: "綜合 Q3a–Q3c，整體搜尋策略充分。", en: "Combining Q3a–Q3c, overall strategy was adequate." },
        },
        {
          id: "Q4", question: { zh: "是否評估初級研究的效度？", en: "Was study validity assessed?" }, human: "yes", ai: "yes",
          evidence: { zh: "使用 Cochrane risk of bias tool，每項風險分類為 high/low/unclear。完整列出七項評估指標。由兩位作者進行獨立評估，如有歧見則透過討論取得共識。", en: "Used Cochrane RoB tool with high/low/unclear ratings. All seven domains assessed. Two independent assessors with discussion consensus." },
        },
        {
          id: "Q5a", question: { zh: "資料擷取是否適當？", en: "Was data extraction appropriate?" }, human: "yes", ai: "yes",
          evidence: { zh: "由兩位作者獨立擷取資料，如有分歧由第三位作者裁決。擷取項目：年齡、介入措施、追蹤時間、作者、年分、國家、主動/被動膝蓋屈曲/伸直 ROM、疼痛/功能指標、住院天數。", en: "Two independent extractors; third author adjudicated. Items: age, intervention, follow-up, author, year, country, active/passive knee flexion/extension ROM, pain/function, hospital stay." },
        },
        {
          id: "Q5b", question: { zh: "資料呈現是否適當？", en: "Was data presentation appropriate?" }, human: "yes", ai: "yes",
          evidence: { zh: "表格呈現個別研究的關鍵特徵。森林圖呈現個別研究的統合分析（樣本數、MD、95% CI、權重、I²、p 值）。", en: "Characteristics table with key study features. Forest plot showing MD, 95% CI, weight, I², p-value per study." },
        },
        {
          id: "Q6", question: { zh: "合併分析是否適當？", en: "Was data combination appropriate?" }, human: "yes", ai: "yes",
          evidence: { zh: "使用 RevMan 5.3 進行分析。提供了 WMD、95% CI 與 p 值。有評估 I²，根據異質性程度選擇隨機效應或固定效應模型。異質性過大時採用描述性分析，並將顯著性水準設定為 P ≤ 0.05。", en: "Analyzed with RevMan 5.3. Reported WMD, 95% CI, p-values. Assessed I², chose models by heterogeneity level. Used descriptive analysis for excessive heterogeneity, significance at P ≤ 0.05." },
        },
        {
          id: "Q7", question: { zh: "是否提及研究限制？", en: "Were limitations discussed?" }, human: "yes", ai: "yes",
          evidence: { zh: "研究限制：(1) CPM 介入方案與隨訪時間在不同研究間不一致，可能引入偏倚；(2) 納入研究間存在固有異質性，可能影響統合分析結果；(3) 缺乏長期追蹤結果。", en: "Limitations: (1) CPM protocols and follow-up varied across studies, may introduce bias; (2) inherent heterogeneity may affect MA results; (3) lack of long-term follow-up." },
        },
      ],
    },

    results: {
      overviewTitle: { zh: "結果綜覽", en: "Results Overview" },
      outcomes: [
        { category: "benefit", name: { zh: "主動膝蓋屈曲", en: "Active Knee Flexion" }, sampleSize: "624 人 (8 RCT)", effectSize: "MD", value: "0.48", ci: "[-1.73 ~ 2.70]" },
        { category: "benefit", name: { zh: "主動膝蓋伸直", en: "Active Knee Extension" }, sampleSize: "584 人 (7 RCT)", effectSize: "MD", value: "0.62", ci: "[0.05 ~ 1.19]" },
        { category: "benefit", name: { zh: "被動膝蓋屈曲", en: "Passive Knee Flexion" }, sampleSize: "290 人 (4 RCT)", effectSize: "MD", value: "-0.79", ci: "[-3.40 ~ 1.81]" },
        { category: "benefit", name: { zh: "被動膝蓋伸直", en: "Passive Knee Extension" }, sampleSize: "218 人 (4 RCT)", effectSize: "MD", value: "0.65", ci: "[-0.80 ~ 2.10]" },
        { category: "benefit", name: { zh: "住院天數", en: "Hospital Stay" }, sampleSize: "396 人 (5 RCT)", effectSize: "MD", value: "-1.05", ci: "[-2.22 ~ 0.12]" },
      ],
      keyOutcome: {
        title: { zh: "主要結果：主動膝蓋屈曲 ROM", en: "Key Outcome: Active Knee Flexion ROM" },
        subgroups: [],
      },
    },

    mid: {
      outcome: { zh: "主動膝蓋屈曲 (ROM)", en: "Active Knee Flexion (ROM)" },
      method: {
        zh: "文獻系統性搜尋（anchor-based MID 研究）",
        en: "Systematic literature search (anchor-based MID studies)",
      },
      derivation: {
        zh: "根據 Silva et al. (Systematic Reviews, 2024) 以統合分析方法估算骨關節炎患者非手術介入後膝關節屈曲的 MCIC，點估計值範圍為 3.8°–6.4°，取中位值約 5°。此外，膝關節角度量測本身的最小可偵測差異約為 6°–10°（取決於測量工具），進一步支持 MID 應在此範圍。",
        en: "Per Silva et al. (Systematic Reviews, 2024), MCIC of knee flexion in OA patients after non-surgical interventions was estimated at 3.8°–6.4° using meta-analytical methods; midpoint ~5°. Additionally, the minimum detectable difference for knee goniometry is ~6°–10° depending on the device, further supporting MID in this range.",
      },
      value: 5,
      unit: "°",
      reference: "Silva MDC et al. Minimal clinically important change of knee flexion in people with knee osteoarthritis after non-surgical interventions using a meta-analytical approach. Syst Rev. 2024;13(1):50.",
    },

    grade: {
      startingLevel: { zh: "高（SR of RCTs）", en: "High (SR of RCTs)" },
      assessments: {
        "CPM": {
          domains: [
            {
              name: { zh: "誤差風險", en: "Risk of Bias" },
              ref: "BMJ 2025;389:e083864",
              decision: 0,
              rationale: {
                zh: "高誤差風險 6 篇、中 6 篇、低 4 篇。但誤差方向會使作用增強，而結果顯示無顯著作用 → 推論原始作用不顯著，偏差方向不影響結論。",
                en: "High risk: 6, some concerns: 6, low: 4. But bias direction would inflate effects, and results show no significant effect → original effect truly non-significant. Bias direction doesn't affect conclusion.",
              },
            },
            {
              name: { zh: "不精確性", en: "Imprecision" },
              ref: "BMJ 2025;389:e081904",
              decision: -1,
              rationale: {
                zh: "點估計值 0.48° 遠低於 MID 5°（落在「效果甚微或無效」區間）。CI [-1.73, 2.70] 跨越 MID → 無法確定效果是否有意義。",
                en: "Point estimate 0.48° far below MID 5° (in 'trivial/no effect' zone). CI [-1.73, 2.70] crosses MID → cannot confirm meaningful effect.",
              },
              numberLine: { pointEst: 0.48, ciLow: -1.73, ciHigh: 2.70, mid: 5.0 },
            },
            {
              name: { zh: "不一致性", en: "Inconsistency" },
              ref: "BMJ 2025;389:e081905",
              decision: -1,
              rationale: {
                zh: "各研究信賴區間重疊比例低。點估計值落在 MID 不同側。沒有透過次族群分析解釋異質性。",
                en: "Low CI overlap across studies. Point estimates fall on different sides of MID. No subgroup analysis to explain heterogeneity.",
              },
            },
            {
              name: { zh: "PICO 不直接性", en: "Indirectness" },
              ref: "BMJ 2025;389:e083865",
              decision: 0,
              rationale: {
                zh: "文獻與臨床案例的 PICO 相似度高：P（接受 TKA 的 65-79 歲骨關節炎患者 vs. 72 歲）、I（CPM）、C（傳統 PT）、O（ROM）均匹配。",
                en: "High PICO similarity: P (65-79y OA post-TKA vs 72y), I (CPM), C (conventional PT), O (ROM) all match.",
              },
            },
            {
              name: { zh: "發表偏誤", en: "Publication Bias" },
              ref: "BMJ 2025;389:e083864",
              decision: 0,
              rationale: {
                zh: "均屬於小型研究，非由企業贊助。研究數量 < 10 篇，無法做漏斗圖。不包含未發表的研究。因為無法評估，標記為未偵測到。",
                en: "All small studies, not industry-sponsored. < 10 studies, cannot do funnel plot. No unpublished studies. Marked as undetected due to inability to assess.",
              },
            },
          ],
          totalDowngrade: -2,
          certaintyLevel: "low",
          summary: { zh: "整體扣 2 分 → 證據品質：低", en: "Total -2 → Certainty: Low" },
        },
      },
    },

    supportingRCT: {
      title: { zh: "新文獻佐證：RCT 簡介", en: "Supporting Evidence: RCT Summary" },
      purpose: { zh: "探討執行 CPM 對於骨關節炎患者的治療效益", en: "Evaluating CPM's therapeutic benefit for OA patients" },
      population: { zh: "55-87 歲骨關節炎（接受過 TKA 手術治療）", en: "55-87 year old OA patients (post-TKA)" },
      intervention: { zh: "執行 CPM（一天 3 次，每次 2 小時）", en: "CPM (3 times daily, 2 hours each)" },
      outcomes: { zh: "關節活動度 ROM、疼痛指標 VAS、不良反應", en: "ROM, pain (VAS), adverse events" },
      conclusion: {
        zh: "執行 CPM 對於關節活動度 (ROM) 改善不具顯著效益。",
        en: "CPM does not show significant benefit for ROM improvement.",
      },
    },

    annotations: {
      zh: [
        "這篇 SR 的 CASP 評分全部為「是」，包括 Q3a（文獻搜尋完整性）。但 CASP 全部通過不代表證據品質就高——GRADE 才是最終裁決。",
        "GRADE 的不精確性扣分是關鍵：點估計值 0.48° 遠小於 MID 2°，而且 CI 跨越了 MID，表示效果可能有意義也可能沒有。",
        "不一致性也扣分——各研究的結果分散在 MID 兩側，意味著有些研究顯示 CPM 有效、有些顯示無效，且沒有次族群分析來解釋為什麼。",
        "誤差風險不扣分的邏輯很精彩：雖然高誤差風險研究占比高（6/16），但偏差方向會讓效果看起來更好。結果已經顯示沒有效果了——代表真實效果只會更差。偏差方向「加強」了結論而非削弱它。",
        "佐證 RCT 的結論也一致——CPM 對 ROM 改善不具顯著效益，進一步支持 SR 的結論。",
      ],
      en: [
        "This SR scored all 'Yes' on CASP, including Q3a (search comprehensiveness). But all-pass CASP doesn't mean high-quality evidence — GRADE is the final judge.",
        "GRADE imprecision downgrade is key: point estimate 0.48° is far below MID 2°, and CI crosses MID — effect could be meaningful or not.",
        "Inconsistency also downgraded — results scatter on both sides of MID, meaning some studies show CPM works, some don't, with no subgroup analysis to explain.",
        "The risk of bias logic is elegant: despite high-risk studies dominating (6/16), bias direction would inflate effects. Results already show no effect → true effect is only worse. Bias direction 'reinforces' the conclusion rather than weakening it.",
        "Supporting RCT conclusion is consistent — CPM shows no significant ROM improvement, further supporting the SR's conclusion.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // PHASE 5: APPLY
  // ═══════════════════════════════════════════
  apply: {
    applicability: {
      conclusion: { zh: "相似程度高，應用上可行。", en: "High similarity, applicable." },
      rows: [
        { item: { zh: "年齡/性別", en: "Age/Sex" }, study: { zh: "60-75 歲男女", en: "60-75y, both sexes" }, case_: { zh: "72 歲女性", en: "72-year-old female" }, similarity: { zh: "高", en: "High" } },
        { item: { zh: "國家/種族", en: "Ethnicity" }, study: { zh: "歐美澳 + 亞洲", en: "Western + Asian" }, case_: { zh: "台灣", en: "Taiwan" }, similarity: { zh: "中", en: "Moderate" } },
        { item: { zh: "目標疾病", en: "Condition" }, study: { zh: "骨關節炎 + TKA", en: "OA + TKA" }, case_: { zh: "骨關節炎 + TKA", en: "OA + TKA" }, similarity: { zh: "完全一致", en: "Identical" } },
        { item: { zh: "介入治療", en: "Intervention" }, study: { zh: "連續被動性運動 (CPM)", en: "CPM" }, case_: { zh: "連續被動性運動 (CPM)", en: "CPM" }, similarity: { zh: "完全一致", en: "Identical" } },
        { item: { zh: "對照治療", en: "Comparator" }, study: { zh: "傳統物理治療", en: "Conventional PT" }, case_: { zh: "傳統物理治療", en: "Conventional PT" }, similarity: { zh: "完全一致", en: "Identical" } },
        { item: { zh: "預期目標", en: "Outcome goal" }, study: { zh: "關節活動度 ROM 改善", en: "ROM improvement" }, case_: { zh: "關節活動度 ROM 改善", en: "ROM improvement" }, similarity: { zh: "完全一致", en: "Identical" } },
      ],
    },
    benefitRisk: {
      options: [
        {
          name: { zh: "連續被動性運動 (CPM)", en: "CPM" },
          benefits: {
            zh: ["不需主動用力，接受度較高", "減輕疼痛", "減少術後腫脹"],
            en: ["No active effort needed, higher acceptance", "Reduces pain", "Reduces post-surgical swelling"],
          },
          risks: {
            zh: ["主要針對單一關節，無法提供全面性功能訓練", "設定不當可能導致關節過度伸展或肌腱拉傷"],
            en: ["Targets single joint only, no comprehensive function training", "Improper settings may cause joint overextension or tendon strain"],
          },
        },
        {
          name: { zh: "傳統物理治療", en: "Conventional PT" },
          benefits: {
            zh: ["全面性功能改善（肌力、平衡、功能性活動）", "個人化調整", "長期功能恢復"],
            en: ["Comprehensive function improvement (strength, balance, functional activities)", "Individualized adjustment", "Long-term function recovery"],
          },
          risks: {
            zh: ["療效可能因治療師經驗值不同而有差異", "治療過程可能產生不適"],
            en: ["Efficacy may vary by therapist experience", "Treatment process may cause discomfort"],
          },
        },
      ],
    },
    // CORRECTED: Using actual CPM vs PT cost data from slides 50-51 (not the atropine copy-paste from slides 48-49)
    costAnalysis: {
      options: [
        {
          name: { zh: "連續被動性運動 (CPM)", en: "CPM" },
          directCost: {
            zh: "CPM 機器購買約 5-20 萬元，租賃約 4.5-9 萬元/三個月。耗材（襯墊）約 800-2,000 元。",
            en: "CPM machine: purchase 50,000-200,000 TWD, rental 45,000-90,000 TWD/3 months. Consumables ~800-2,000 TWD.",
          },
          visitCost: {
            zh: "掛號費 100-300 元，每週一次 × 12 週 = 1,200-3,600 元",
            en: "Registration 100-300 TWD, weekly × 12 weeks = 1,200-3,600 TWD",
          },
          indirectCost: {
            zh: "家屬收入損失：每週一次 × 12 週 × 2 小時，約 9,576-10,608 元。交通費：600-6,000 元。",
            en: "Family income loss: weekly × 12 weeks × 2 hours, ~9,576-10,608 TWD. Transport: 600-6,000 TWD.",
          },
          totalAnnual: { zh: "三個月總花費：57,176-222,208 元", en: "3-month total: 57,176-222,208 TWD" },
        },
        {
          name: { zh: "傳統物理治療", en: "Conventional PT" },
          directCost: {
            zh: "治療成本：健保 50-400 元，自費 800-2,500 元，每週一次 × 12 週 = 600-30,000 元。輔具（彈力帶、啞鈴、冰敷袋）50-500 元。",
            en: "Treatment: NHI 50-400 TWD, self-pay 800-2,500 TWD, weekly × 12 weeks = 600-30,000 TWD. Equipment (bands, dumbbells, ice packs) 50-500 TWD.",
          },
          visitCost: {
            zh: "掛號費 100-300 元，每週一次 × 12 週 = 1,200-3,600 元",
            en: "Registration 100-300 TWD, weekly × 12 weeks = 1,200-3,600 TWD",
          },
          indirectCost: {
            zh: "家屬收入損失：每週一次 × 12 週 × 2 小時，約 9,576-10,608 元。交通費：600-6,000 元。",
            en: "Family income loss: weekly × 12 weeks × 2 hours, ~9,576-10,608 TWD. Transport: 600-6,000 TWD.",
          },
          totalAnnual: { zh: "三個月總花費：12,026-50,708 元", en: "3-month total: 12,026-50,708 TWD" },
        },
      ],
    },
    // CORRECTED: Conclusion fixed from atropine copy-paste to correct CPM conclusion
    efficacySummary: {
      title: { zh: "效益分析結論", en: "Efficacy Analysis Summary" },
      rows: [
        {
          group: { zh: "主動膝蓋屈曲", en: "Active Knee Flexion" },
          sampleSize: "624 人 (8 RCT)",
          md: "0.48",
          ci: "[-1.73 ~ 2.70]",
          clinicalMeaning: { zh: "< MID (5°)，不具顯著效益", en: "< MID (5°), no significant benefit" },
          certainty: "low",
        },
        {
          group: { zh: "主動膝蓋伸直", en: "Active Knee Extension" },
          sampleSize: "584 人 (7 RCT)",
          md: "0.62",
          ci: "[0.05 ~ 1.19]",
          clinicalMeaning: { zh: "< MID (5°)，不具顯著效益", en: "< MID (5°), no significant benefit" },
          certainty: "low",
        },
      ],
      conclusion: {
        zh: "CPM 對於主動膝蓋屈曲和伸直的改善均不具顯著治療效益。",
        en: "CPM shows no significant therapeutic benefit for either active knee flexion or extension.",
      },
    },
    evidenceToDecision: {
      reference: "BMJ 2025;389:e083867",
      factors: [
        {
          key: "benefitRisk",
          label: { zh: "利益風險", en: "Benefit vs. Risk" },
          assessment: { zh: "利益：減輕疼痛、減少術後腫脹。風險：設定不當可能導致關節過度伸展或肌腱拉傷。", en: "Benefits: pain relief, reduced swelling. Risks: improper settings may cause overextension or tendon strain." },
          direction: 0,
        },
        {
          key: "evidenceQuality",
          label: { zh: "證據品質", en: "Evidence Quality" },
          assessment: { zh: "低證據品質（不精確性 + 不一致性各扣 1 分）。", en: "Low certainty (imprecision + inconsistency each downgraded 1)." },
          direction: -1,
        },
        {
          key: "valuesPreferences",
          label: { zh: "價值偏好", en: "Values & Preferences" },
          assessment: { zh: "希望加快關節恢復速度。", en: "Wants to accelerate joint recovery." },
          direction: 1,
        },
        {
          key: "costEffectiveness",
          label: { zh: "成本效益", en: "Cost-Effectiveness" },
          assessment: { zh: "成本：CPM 總花費（57,176-222,208 元）遠高於傳統物理治療（12,026-50,708 元）。效益：對於改善關節活動度成效有限。", en: "Cost: CPM total (57,176-222,208 TWD) far exceeds conventional PT (12,026-50,708 TWD). Benefit: limited ROM improvement." },
          direction: -2,
        },
        {
          key: "feasibility",
          label: { zh: "可行性", en: "Feasibility" },
          assessment: { zh: "購買或租借機器便可接受治療。", en: "Can access treatment by purchasing or renting the machine." },
          direction: 1,
        },
        {
          key: "acceptability",
          label: { zh: "接受度", en: "Acceptability" },
          assessment: { zh: "不需主動用力，接受度高。", en: "No active effort required, high acceptance." },
          direction: 1,
        },
      ],
      recommendationStrength: "conditional_against",
      recommendationLabel: { zh: "部分不推薦", en: "Conditional recommendation against" },
      reasonForConditional: {
        zh: "雖然病人偏好、可行性和接受度偏向使用 CPM，但證據品質低、成本遠高於物理治療、且效益有限，整體評估不支持使用 CPM。",
        en: "Although patient preferences, feasibility, and acceptability favor CPM, evidence certainty is low, costs far exceed PT, and benefits are limited — overall assessment does not support CPM.",
      },
    },
    patientSummary: {
      zh: "盧媽媽您好，經過團隊的縝密搜尋後，找到對你最有幫助的研究顯示：被動性運動雖然可以減輕疼痛和幫助術後腫脹，但對於改善膝蓋活動度的成效有限。而且這種作法的總花費比物理治療高，若設定不當可能導致關節過度伸展或肌腱拉傷，因此較不推薦您透過此方式進行復健。",
      en: "Dear Mrs. Lu, after our team's thorough search, the most helpful research shows: although passive motion can reduce pain and post-surgical swelling, its effectiveness for improving knee mobility is limited. Moreover, the total cost is higher than physical therapy, and improper settings could cause joint overextension or tendon strain. Therefore, we do not recommend this approach for your rehabilitation.",
    },
    annotations: {
      zh: [
        "這個案例展示了「部分不推薦」的結論——EBM 流程不一定得出正面推薦，忠實呈現證據才是關鍵。",
        "成本效益是決定性因素之一：CPM 三個月花費 57,176-222,208 元，物理治療只要 12,026-50,708 元，而效果沒有顯著差異。",
        "EtD 六個面向不是全部朝同一方向——價值偏好、可行性、接受度偏向贊成，但證據品質和成本效益偏向反對。最終「反對」的因素勝出。",
        "去學術化回應的語氣雖然是「不推薦」，但仍然溫和且尊重病人：先肯定 CPM 有一些好處（減輕疼痛、減少腫脹），再解釋為什麼整體不推薦。",
        "這個案例展示了「部分不推薦」的結論——EBM 流程不一定得出正面推薦，忠實呈現證據才是關鍵。",
      ],
      en: [
        "This case demonstrates a 'conditional against' conclusion — EBM doesn't always end with a positive recommendation. Faithfully presenting evidence is what matters.",
        "Cost-effectiveness was decisive: CPM costs 57,176-222,208 TWD for 3 months vs. 12,026-50,708 for PT, with no significant difference in outcomes.",
        "EtD factors don't all point the same way — preferences, feasibility, and acceptability favor CPM, but evidence quality and cost-effectiveness are against. The 'against' factors prevailed.",
        "The patient summary is still warm and respectful despite being a 'against' recommendation: first acknowledges CPM's benefits (pain relief, swelling reduction), then explains why it's not recommended overall.",
        "This case demonstrates a 'conditional against' conclusion — EBM doesn't always end with a positive recommendation; faithfully presenting evidence is what matters.",
      ],
    },
  },
};

export default cpm2025;
