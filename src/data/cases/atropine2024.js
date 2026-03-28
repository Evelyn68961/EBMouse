// src/data/cases/atropine2024.js
// Fully structured case data extracted from the 2024 EBM competition slides (四練, 58 slides)
// Case: Atropine eye drops for childhood axial myopia

const atropine2024 = {
  meta: {
    id: "atropine-myopia-2024",
    year: 2024,
    title: {
      zh: "Atropine 眼藥水治療兒童軸性近視",
      en: "Atropine Eye Drops for Childhood Axial Myopia",
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
    tags: ["SR/MA", "RCT", "Pediatrics", "Ophthalmology"],
    article: {
      citation: "Wei XL et al. (2023)",
      pmid: "37602338",
      title: {
        zh: "評估不同濃度的 Atropine 眼藥水在治療亞洲兒童近視的成效與不良反應",
        en: "Efficacy and adverse effects of different concentrations of atropine eye drops for myopia control in Asian children",
      },
      studyType: "SR with MA of RCTs",
      rctCount: 15,
      totalParticipants: 2268,
    },
    gradeResults: {
      "0.01%": "low",
      "0.05%": "moderate",
    },
    recommendation: {
      zh: "部分推薦使用 0.05% atropine 眼藥水",
      en: "Conditional recommendation for 0.05% atropine eye drops",
    },
  },

  // ═══════════════════════════════════════════
  // PHASE 1: ASSESS
  // ═══════════════════════════════════════════
  assess: {
    scenario: {
      zh: "小六女童上課時看不清楚黑板的字，醫生告知罹患軸性近視，可透過點眼藥水、配戴周邊離焦鏡片或隱眼來減緩近視問題。",
      en: "A sixth-grade girl can't see the blackboard clearly in class. The doctor says she has axial myopia and can slow progression with eye drops, peripheral defocus lenses, or contact lenses.",
    },
    clinicalQuestions: {
      zh: [
        "點眼藥水可以延緩近視嗎？何種濃度效果較佳？",
        "周邊離焦鏡片與日拋隱眼哪種效果較好？",
      ],
      en: [
        "Can eye drops slow myopia progression? Which concentration works better?",
        "Which is more effective — peripheral defocus lenses or daily disposable contacts?",
      ],
    },
    patientProfile: {
      age: { zh: "小六（約 12 歲）", en: "6th grade (~12 years old)" },
      sex: { zh: "女", en: "Female" },
      condition: { zh: "軸性近視", en: "Axial myopia" },
      setting: { zh: "門診", en: "Outpatient" },
    },
    patientPreferences: {
      zh: [
        "女童沒有很想戴眼鏡，因為會影響日常穿搭。",
        "母親認為隱眼要學習如何配戴且有感染風險。",
        "均認為點眼藥水最方便，有 0.01% 和 0.05% 兩種濃度。",
      ],
      en: [
        "The girl doesn't want to wear glasses because it affects her daily outfits.",
        "The mother thinks contacts require learning to insert and carry infection risk.",
        "Both agree eye drops are most convenient — available in 0.01% and 0.05% concentrations.",
      ],
    },
    backgroundKnowledge: {
      diseaseOverview: {
        zh: "眼球前後軸長過度增長所導致的近視，光線無法正確聚焦在視網膜上而造成遠距離視物模糊。",
        en: "Myopia caused by excessive elongation of the eye's axial length, preventing light from focusing correctly on the retina, causing distant blur.",
      },
      riskFactors: {
        zh: "學齡兒童和青少年，特別是長時間近距離用眼、戶外活動不足且有近視家族史者。",
        en: "School-age children and adolescents, especially those with prolonged near-work, insufficient outdoor activity, and family history of myopia.",
      },
      treatmentOptions: {
        zh: "使用阿托品 (atropine) 眼藥水、角膜塑型片或周邊離焦鏡片控制近視進展。",
        en: "Atropine eye drops, orthokeratology lenses, or peripheral defocus lenses to control myopia progression.",
      },
    },
    treatmentIssues: [
      {
        name: { zh: "Atropine 眼藥水", en: "Atropine eye drops" },
        regimen: {
          zh: "每晚睡前點一滴 atropine 眼藥水，使用 2-4 年。",
          en: "One drop of atropine before bed each night, used for 2-4 years.",
        },
        issue: {
          zh: "若同時考量治療效果和潛在副作用，何種濃度的 atropine 眼藥水具有最佳效益？",
          en: "Considering both efficacy and side effects, which concentration of atropine has the best benefit?",
        },
      },
      {
        name: { zh: "周邊離焦鏡片", en: "Peripheral defocus lenses" },
        regimen: {
          zh: "每天配戴 12 小時以上，使用至少 1-2 年。",
          en: "Wear 12+ hours daily, for at least 1-2 years.",
        },
        issue: {
          zh: "配戴周邊離焦鏡片 3 年以上的長期成效如何？與眼藥水搭配使用是否具有加乘效果？",
          en: "Long-term efficacy beyond 3 years? Additive effect when combined with eye drops?",
        },
      },
    ],
    sources: {
      zh: "UpToDate、DynaMed、臨床指引",
      en: "UpToDate, DynaMed, clinical guidelines",
    },
    annotations: {
      zh: [
        "這個案例的情境拆解出了三類重要資訊：病人輪廓（12歲女童、軸性近視）、臨床問題（兩個治療方向的比較）、以及病人偏好（不想戴眼鏡、擔心感染）。",
        "病人偏好在後續選擇主要 PICOT 時扮演了決定性角色——女童和母親都偏好眼藥水，直接影響了 PICOT-2 被選為主要問題。",
      ],
      en: [
        "This scenario yields three categories of information: patient profile (12-year-old girl, axial myopia), clinical questions (two treatment comparisons), and patient preferences (doesn't want glasses, worried about infection).",
        "Patient preferences played a decisive role in selecting the primary PICOT — both girl and mother preferred eye drops, which directly led to PICOT-2 being chosen.",
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
          zh: "患有軸性近視且不想戴眼鏡的小六女生",
          en: "A sixth-grade girl with axial myopia who doesn't want glasses",
        },
        i: {
          zh: "每天配戴周邊離焦鏡片 12 小時以上",
          en: "Peripheral defocus lenses worn 12+ hours daily",
        },
        c: {
          zh: "每天配戴傳統單焦點眼鏡",
          en: "Traditional single-vision glasses worn daily",
        },
        o: {
          zh: "球面等效屈光度 (SE)、眼軸長度 (AL)",
          en: "Spherical equivalent (SE), axial length (AL)",
        },
        t: {
          zh: "6-12 個月",
          en: "6-12 months",
        },
      },
      {
        id: 2,
        label: "PICOT-2",
        isPrimary: true,
        questionType: "treatment",
        p: {
          zh: "患有軸性近視且不想戴眼鏡的小六女生",
          en: "A sixth-grade girl with axial myopia who doesn't want glasses",
        },
        i: {
          zh: "每晚兩眼各點一滴 atropine 眼藥水",
          en: "Nightly one drop of atropine eye drops in each eye",
        },
        c: {
          zh: "不點眼藥水",
          en: "No eye drops",
        },
        o: {
          zh: "球面等效屈光度 (SE)、眼軸長度 (AL)、不良反應",
          en: "Spherical equivalent (SE), axial length (AL), adverse events",
        },
        t: {
          zh: "12 個月",
          en: "12 months",
        },
        justification: {
          zh: "女童和母親均較偏好使用眼藥水",
          en: "Both the girl and her mother prefer eye drops",
        },
      },
    ],
    annotations: {
      zh: [
        "兩個 PICOT 都是治療/預防型，對應最佳研究設計為 RCT → SR with MA of RCTs。",
        "PICOT-2 被選為主要 PICOT，原因直接呼應 Phase 1 記錄的病人偏好（不想戴眼鏡 → 排除鏡片方案）。",
        "注意 PICOT-2 的 O 比 PICOT-1 多了「不良反應」——這是因為藥物介入需要同時評估效益和安全性。",
      ],
      en: [
        "Both PICOTs are treatment/prevention type, matching the best study design: RCT → SR with MA of RCTs.",
        "PICOT-2 was selected as primary, directly responding to patient preferences recorded in Phase 1 (doesn't want glasses → lens options eliminated).",
        "Note PICOT-2's O adds 'adverse events' compared to PICOT-1 — drug interventions require assessing both efficacy and safety.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // PHASE 3: ACQUIRE
  // ═══════════════════════════════════════════
  acquire: {
    databases: [
      {
        name: "PubMed",
        rationale: { zh: "文獻廣泛全面", en: "Comprehensive literature coverage" },
      },
      {
        name: "Embase",
        rationale: { zh: "涵蓋歐洲文獻", en: "Covers European literature" },
      },
      {
        name: "Cochrane Library",
        rationale: { zh: "證據品質高", en: "High evidence quality" },
      },
    ],
    keywords: {
      table: [
        {
          picot: "P",
          freeText: ["Axial myopia", "Myopia progression"],
          mesh: ['"Myopia"[MeSH]'],
        },
        {
          picot: "I",
          freeText: ["Atropine"],
          mesh: ['"Atropine"[MeSH]'],
        },
        {
          picot: "C",
          freeText: ["Placebo"],
          mesh: ['"Placebo"[MeSH]'],
          note: { zh: "通常不加入搜尋式", en: "Usually excluded from search" },
        },
        {
          picot: "O",
          freeText: ["Spherical equivalence", "Axial length"],
          mesh: [],
          note: { zh: "通常不加入搜尋式", en: "Usually excluded from search" },
        },
      ],
      strategy: {
        zh: "Free text 和 MeSH term 用 OR 連結同概念，再用 AND 合併不同概念。",
        en: "Free text and MeSH terms connected with OR within concepts, then AND across concepts.",
      },
      booleanFormula:
        '((Myopia) OR (Myopia progression) OR "Myopia"[MeSH]) AND ((Atropine) OR "Atropine"[MeSH])',
    },
    pubmedWorkflow: {
      zh: "使用 PubMed Advanced Search，逐步建立 #1 (P)、#2 (I)，再用 #1 AND #2 合併。系統的 Automatic Term Mapping 功能會自動將 Free Text 對應到 MeSH。",
      en: "Used PubMed Advanced Search to build #1 (P), #2 (I) separately, then combined with #1 AND #2. The system's Automatic Term Mapping auto-maps Free Text to MeSH.",
    },
    litSuggest: {
      input: { zh: "793 篇 PubMed 初步結果", en: "793 initial PubMed results" },
      positive: 391,
      negative: 402,
      description: {
        zh: "使用 LitSuggest 機器學習工具，輸入 Positive 和 Negative PMID 範例，自動對所有搜尋結果進行評分篩選。",
        en: "Used LitSuggest ML tool with positive and negative PMID examples to auto-score and screen all search results.",
      },
    },
    sraConversion: {
      zh: "使用 Systematic Review Accelerator (SRA) 將 PubMed 搜尋式自動轉換為 Cochrane 和 Embase 格式。",
      en: "Used Systematic Review Accelerator (SRA) to auto-convert PubMed search to Cochrane and Embase formats.",
    },
    screeningFlow: {
      // per-database initial results
      initial: { pubmed: 793, embase: 1445, cochrane: 6 },
      // after LitSuggest (PubMed only)
      afterLitSuggest: { pubmed: 391 },
      // after filtering to SR type
      afterSRFilter: { pubmed: 2, embase: 190, cochrane: 6 },
      // after SR type
      srCount: { pubmed: 2, embase: 9, cochrane: 0 },
      // after PICO match
      picoMatch: 2,
      finalSelected: 1,
    },
    articleSelection: {
      candidates: [
        {
          selected: false,
          rctCount: 18,
          participants: 3002,
          description: {
            zh: "評估 Atropine 眼藥水治療兒童近視的安全性和有效性，並且探討 Atropine 的最佳濃度。",
            en: "Evaluating safety and efficacy of atropine eye drops for childhood myopia and exploring optimal concentration.",
          },
        },
        {
          selected: true,
          rctCount: 15,
          participants: 2268,
          description: {
            zh: "評估不同濃度的 Atropine 眼藥水在治療亞洲兒童近視的成效與不良反應。",
            en: "Evaluating efficacy and adverse effects of different atropine concentrations for myopia in Asian children.",
          },
          citation: "Wei XL et al. (2023) PMID: 37602338",
        },
      ],
      rationale: {
        zh: "選擇第二篇，因為其聚焦於亞洲兒童（與案例族群一致），且評估了不同濃度的比較。",
        en: "Selected the second article because it focuses on Asian children (matching our case population) and compares different concentrations.",
      },
    },
    annotations: {
      zh: [
        "搜尋策略只用了 P 和 I 兩個概念（不加 C 和 O），避免過度限制導致漏掉文獻。",
        "LitSuggest 是這個案例的亮點之一——從 793 篇快速篩選到 391 篇，大幅節省人工篩選時間。",
        "SRA 跨資料庫轉換確保了搜尋策略在三個資料庫的一致性。",
        "最終從兩篇候選 SR 中選出聚焦亞洲兒童的那篇，PICO 匹配度更高。",
      ],
      en: [
        "Search strategy used only P and I concepts (no C or O) to avoid over-restricting and missing articles.",
        "LitSuggest was a highlight — screening 793 down to 391, dramatically reducing manual effort.",
        "SRA cross-database conversion ensured search consistency across all three databases.",
        "Final selection chose the SR focusing on Asian children — higher PICO match with our case.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // PHASE 4: APPRAISE
  // ═══════════════════════════════════════════
  appraise: {
    picoComparison: {
      rows: [
        {
          element: "P",
          sub: { zh: "年齡", en: "Age" },
          study: { zh: "18 歲以下", en: "Under 18" },
          case_: { zh: "12 歲", en: "12 years old" },
          similarity: { zh: "高", en: "High" },
        },
        {
          element: "P",
          sub: { zh: "種族", en: "Ethnicity" },
          study: { zh: "亞洲 (台灣、中國、日本、香港)", en: "Asian (Taiwan, China, Japan, HK)" },
          case_: { zh: "台灣", en: "Taiwan" },
          similarity: { zh: "高", en: "High" },
        },
        {
          element: "P",
          sub: { zh: "疾病", en: "Condition" },
          study: { zh: "近視 (軸性/趨光性)", en: "Myopia (axial/refractive)" },
          case_: { zh: "軸性近視", en: "Axial myopia" },
          similarity: { zh: "高", en: "High" },
        },
        {
          element: "I",
          sub: null,
          study: { zh: "使用 atropine 眼藥水", en: "Atropine eye drops" },
          case_: { zh: "使用 atropine 眼藥水", en: "Atropine eye drops" },
          similarity: { zh: "完全一致", en: "Identical" },
        },
        {
          element: "C",
          sub: null,
          study: { zh: "使用安慰劑/採用其他療法", en: "Placebo / other therapy" },
          case_: { zh: "不使用 atropine 眼藥水", en: "No atropine eye drops" },
          similarity: { zh: "高", en: "High" },
        },
        {
          element: "O",
          sub: null,
          study: { zh: "SE、AL、不良反應", en: "SE, AL, adverse events" },
          case_: { zh: "SE、AL、不良反應", en: "SE, AL, adverse events" },
          similarity: { zh: "高", en: "High" },
        },
      ],
    },

    casp: {
      tool: "CASP-SR",
      toolDescription: {
        zh: "SR with MA of RCTs — 架構明確、指引清晰",
        en: "SR with MA of RCTs — clear structure, explicit guidance",
      },
      aiWorkflow: {
        zh: "人類從文獻中擷取相關資訊、依據 CASP 指引進行判斷；AI (SR 評讀機器人) 提供題目、取得資訊、依據 CASP 指引進行核實。",
        en: "Human extracts relevant information from the article and judges based on CASP guidelines; AI (SR appraisal bot) provides questions, retrieves information, and verifies based on CASP guidelines.",
      },
      kappa: 1.0,
      kappaInterpretation: { zh: "完全一致", en: "Perfect agreement" },
      scores: [
        {
          id: "Q1",
          question: { zh: "是否明確提出研究問題？", en: "Was there a clear research question?" },
          human: "yes",
          ai: "yes",
          evidence: {
            zh: "研究問題：評估不同濃度的 atropine 眼藥水治療亞洲兒童近視的療效及副作用。P：近視亞洲兒童、I：使用不同濃度的阿托品眼藥水、C：使用安慰劑或採用其他療法、O：SE、AL、瞳孔大小、調節幅度等療效指標 & 副作用。與文獻內提及的研究問題和 PICO 相符。",
            en: "Research question: evaluating efficacy and adverse effects of different atropine concentrations for myopia in Asian children. P: Asian children with myopia, I: different concentrations of atropine, C: placebo or other therapy, O: SE, AL, pupil size, accommodation & adverse effects. Matches the study's stated PICO.",
          },
        },
        {
          id: "Q2",
          question: { zh: "是否搜尋合適的研究設計？", en: "Did they search for appropriate study designs?" },
          human: "yes",
          ai: "yes",
          evidence: {
            zh: "研究問題與介入的有效性有關，最適當的研究設計為 RCT。文獻中的納入條件和搜尋策略均有提及只納入 RCT。",
            en: "The question concerns intervention efficacy; the most appropriate design is RCTs. Inclusion criteria and search strategy both specify RCTs only.",
          },
        },
        {
          id: "Q3a",
          question: { zh: "文獻搜尋是否完整？", en: "Was the literature search comprehensive?" },
          human: "no",
          ai: "no",
          evidence: {
            zh: "資料庫：PubMed、Embase、Cochrane、WoS。語言限制：限定英文文獻，可能產生語言偏誤。時間範圍：2001 年 ~ 2022 年 4 月。手動搜尋引用文獻，但沒有搜尋尚未發表的研究。",
            en: "Databases: PubMed, Embase, Cochrane, WoS. Language: English only — potential language bias. Time range: 2001 to April 2022. Handsearched references but did not search unpublished studies.",
          },
        },
        {
          id: "Q3b",
          question: { zh: "文獻篩選是否適當？", en: "Was study selection appropriate?" },
          human: "yes",
          ai: "yes",
          evidence: {
            zh: "由兩位作者獨立篩選文獻，如有分歧會進行討論 & 諮詢第三位作者。總共篩選出 15 篇文獻。",
            en: "Two authors screened independently; disagreements resolved by discussion and third author consultation. 15 articles screened in.",
          },
        },
        {
          id: "Q3c",
          question: { zh: "文獻納入標準是否合理？", en: "Were inclusion criteria reasonable?" },
          human: "yes",
          ai: "yes",
          evidence: {
            zh: "研究設計：RCT。目標族群：近視亞洲兒童。介入措施：實驗組使用不同濃度的 atropine，對照組使用安慰劑。",
            en: "Design: RCT. Population: Asian children with myopia. Intervention: different atropine concentrations vs. placebo.",
          },
        },
        {
          id: "Q3d",
          question: { zh: "檢索策略是否充分？（總結）", en: "Was the search strategy adequate overall?" },
          human: "yes",
          ai: "yes",
          evidence: {
            zh: "綜合 Q3a–Q3c，除了語言限制外，整體搜尋策略尚屬充分。",
            en: "Combining Q3a–Q3c, apart from language restriction, overall strategy was adequate.",
          },
        },
        {
          id: "Q4",
          question: { zh: "是否評估初級研究的效度？", en: "Was study validity assessed?" },
          human: "yes",
          ai: "yes",
          evidence: {
            zh: "使用 Cochrane risk of bias tool，每項風險分類為 high/low/unclear。完整列出七項評估指標，評估面向齊全。由兩位作者進行獨立評估，如有歧見則透過討論取得共識。",
            en: "Used Cochrane risk of bias tool, rating each risk as high/low/unclear. All seven assessment domains covered. Two independent assessors with discussion-based consensus.",
          },
        },
        {
          id: "Q5a",
          question: { zh: "資料擷取是否適當？", en: "Was data extraction appropriate?" },
          human: "yes",
          ai: "yes",
          evidence: {
            zh: "由兩位作者獨立擷取資料，如有分歧由第三位作者裁決。擷取項目包含患者特徵（年齡、介入措施、追蹤時間）、試驗特徵（作者、年分、國家）、結果指標（SE、AL、瞳孔大小、調節幅度、不良反應）。",
            en: "Two authors extracted independently; third author adjudicated disagreements. Items: patient characteristics (age, intervention, follow-up), trial characteristics (author, year, country), outcomes (SE, AL, pupil size, accommodation, adverse events).",
          },
        },
        {
          id: "Q5b",
          question: { zh: "資料呈現是否適當？", en: "Was data presentation appropriate?" },
          human: "yes",
          ai: "yes",
          evidence: {
            zh: "表格呈現個別研究的關鍵特徵（樣本數、年齡、性別、治療細節、評估時間點）。森林圖呈現個別研究的統合分析（樣本數、MD、95% CI、權重、I²、p 值）。",
            en: "Characteristics table with sample size, age, sex, treatment details, time points. Forest plot showing each study's MD, 95% CI, weight, I², and p-value.",
          },
        },
        {
          id: "Q6",
          question: { zh: "合併分析是否適當？", en: "Was data combination appropriate?" },
          human: "yes",
          ai: "yes",
          evidence: {
            zh: "使用 STATA 進行分析。提供了 WMD、95% CI 與 p 值。有評估 I² 並根據結果選擇隨機效應或固定效應模型。進行敏感性分析與次族群分析。使用 funnel plot 與 Egger's test 檢測發表偏誤。",
            en: "Analyzed with STATA. Reported WMD, 95% CI, p-values. Assessed I² and chose random/fixed effects accordingly. Conducted sensitivity and subgroup analyses. Used funnel plot and Egger's test for publication bias.",
          },
        },
        {
          id: "Q6-1",
          question: { zh: "次族群分析是否適當？", en: "Was subgroup analysis appropriate?" },
          human: "uncertain",
          ai: "uncertain",
          evidence: {
            zh: "次族群已事先規劃，但交互作用檢驗與多重檢定並未在文中提及。未提及是否有交互作用檢驗（test for interaction）以判定各次族群的組間差異是否具有統計顯著性。未描述是否進行多重檢定的調整。",
            en: "Subgroups were pre-planned, but test for interaction and multiple testing adjustments were not mentioned. Cannot determine if between-group differences are statistically significant.",
          },
        },
        {
          id: "Q6-2",
          question: { zh: "統合迴歸分析是否適當？", en: "Was meta-regression appropriate?" },
          human: "uncertain",
          ai: "uncertain",
          evidence: {
            zh: "同 Q6-1，未提及交互作用檢驗和多重檢定調整。",
            en: "Same as Q6-1 — test for interaction and multiple testing adjustments not mentioned.",
          },
        },
        {
          id: "Q7",
          question: { zh: "是否提及研究限制？", en: "Were limitations discussed?" },
          human: "uncertain",
          ai: "uncertain",
          evidence: {
            zh: "優點：提到語言偏誤（僅納入英文文獻）、異質性高與部分重要變項（如劑量與療程）未被研究說明、測量方法不一致的潛在影響。限制：沒有提到統合分析的檢定力（power）、效應量衡量方式是否合適，沒有反思次族群分析或統合迴歸的可信度與限制。",
            en: "Strengths: mentioned language bias (English only), high heterogeneity, some variables not reported. Limitations: didn't discuss power, appropriateness of effect measures, or credibility of subgroup/meta-regression analyses.",
          },
        },
      ],
    },

    results: {
      overviewTitle: { zh: "結果綜覽", en: "Results Overview" },
      outcomes: [
        { category: "benefit", name: { zh: "球面等效屈光度 (SE)", en: "Spherical Equivalent (SE)" }, sampleSize: "2577 人 (16 RCT)", effectSize: "WMD", value: "0.39", ci: "[0.23 ~ 0.54]" },
        { category: "benefit", name: { zh: "眼軸長度 (AL)", en: "Axial Length (AL)" }, sampleSize: "2577 人 (16 RCT)", effectSize: "WMD", value: "-0.15", ci: "[-0.19 ~ -0.1]" },
        { category: "benefit", name: { zh: "光明環境下瞳孔大小", en: "Pupil Size (Photopic)" }, sampleSize: "602 人 (5 RCT)", effectSize: "WMD", value: "0.70", ci: "[0.33 ~ 1.06]" },
        { category: "benefit", name: { zh: "昏暗環境下瞳孔大小", en: "Pupil Size (Mesopic)" }, sampleSize: "602 人 (5 RCT)", effectSize: "WMD", value: "0.38", ci: "[0.22 ~ 0.54]" },
        { category: "benefit", name: { zh: "調節幅度", en: "Accommodation Amplitude" }, sampleSize: "602 人 (5 RCT)", effectSize: "WMD", value: "-0.62", ci: "[-1.39 ~ 0.16]" },
        { category: "risk", name: { zh: "副作用", en: "Adverse Events" }, sampleSize: "1035 人 (8 RCT)", effectSize: "OR", value: "1.37", ci: "[1.09 ~ 1.74]" },
      ],
      keyOutcome: {
        title: { zh: "重要結果：球面等效屈光度 (按 Atropine 濃度)", en: "Key Outcome: SE by Atropine Concentration" },
        subgroups: [
          { concentration: "0.01%", sampleSize: "624 人 (10 RCT)", wmd: "0.23", ci: "[0.13 ~ 0.34]" },
          { concentration: "0.025%", sampleSize: "403 人 (2 RCT)", wmd: "0.35", ci: "[0.25 ~ 0.45]" },
          { concentration: "0.05%", sampleSize: "411 人 (2 RCT)", wmd: "0.54", ci: "[0.43 ~ 0.65]" },
          { concentration: "0.5%", sampleSize: "253 人 (2 RCT)", wmd: "1.01", ci: "[0.54 ~ 1.48]" },
          { concentration: { zh: "整體", en: "Overall" }, sampleSize: "624 人 (16 RCT)", wmd: "0.39", ci: "[0.23 ~ 0.54]" },
        ],
      },
    },

    mid: {
      outcome: { zh: "球面等效屈光度 (SE)", en: "Spherical Equivalent (SE)" },
      method: {
        zh: "參考相關研究的指標性結果（文獻基準）",
        en: "Literature benchmark (reference key study results)",
      },
      derivation: {
        zh: "近視平均進程：一年 SE 下降 0.5D。評斷療效的指標：SE 改善幅度達 50% 以上。MID = 0.5 ÷ 2 = 0.25D。",
        en: "Average myopia progression: 0.5D SE decline per year. Efficacy criterion: SE improvement ≥ 50%. MID = 0.5 ÷ 2 = 0.25D.",
      },
      value: 0.25,
      unit: "D",
      reference: "Smith MJ, Walline JJ. Adolesc Health Med Ther. 2015;6:133-140.",
    },

    grade: {
      startingLevel: { zh: "高（SR of RCTs）", en: "High (SR of RCTs)" },
      assessments: {
        "0.01%": {
          domains: [
            {
              name: { zh: "誤差風險", en: "Risk of Bias" },
              ref: "BMJ 2025;389:e083864",
              decision: 0,
              rationale: {
                zh: "高誤差風險 2 篇、中 4 篇、低 9 篇。排除高誤差風險研究重新分析，得到的結果雷同。",
                en: "High risk: 2, some concerns: 4, low: 9. Re-analysis excluding high-risk studies yielded similar results.",
              },
            },
            {
              name: { zh: "不精確性", en: "Imprecision" },
              ref: "BMJ 2025;389:e081904",
              decision: -1,
              rationale: {
                zh: "點估計值 0.23 < MID 0.25（落在「效果甚微或無效」區間）。CI 上限 0.34 > MID → CI 跨越 MID。",
                en: "Point estimate 0.23 < MID 0.25 (falls in 'trivial/no effect' zone). CI upper bound 0.34 > MID → CI crosses MID.",
              },
              numberLine: { pointEst: 0.23, ciLow: 0.13, ciHigh: 0.34, mid: 0.25 },
            },
            {
              name: { zh: "不一致性", en: "Inconsistency" },
              ref: "BMJ 2025;389:e081905",
              decision: 0,
              rationale: {
                zh: "各研究信賴區間重疊比例高，點估計值落在同側（以 MID 為基準）。",
                en: "High CI overlap across studies. Point estimates fall on the same side of MID.",
              },
            },
            {
              name: { zh: "PICO 不直接性", en: "Indirectness" },
              ref: "BMJ 2025;389:e083865",
              decision: 0,
              rationale: {
                zh: "文獻與臨床案例的 PICO 相似度高。",
                en: "High similarity between study PICO and clinical case.",
              },
            },
            {
              name: { zh: "發表偏誤", en: "Publication Bias" },
              ref: "BMJ 2025;389:e083864",
              decision: -1,
              rationale: {
                zh: "均屬於小型研究，非由企業贊助。執行統合分析，研究數量 > 10 篇。漏斗圖不對稱，Egger's test 顯示具發表偏誤。",
                en: "All small studies, not industry-sponsored. MA performed with > 10 studies. Funnel plot asymmetric, Egger's test indicates publication bias.",
              },
            },
          ],
          totalDowngrade: -2,
          certaintyLevel: "low",
          summary: {
            zh: "整體扣 2 分 → 證據品質：低",
            en: "Total -2 → Certainty: Low",
          },
        },
        "0.05%": {
          domains: [
            {
              name: { zh: "誤差風險", en: "Risk of Bias" },
              ref: "BMJ 2025;389:e083864",
              decision: 0,
              rationale: { zh: "同 0.01%，結果雷同。", en: "Same as 0.01%, similar results." },
            },
            {
              name: { zh: "不精確性", en: "Imprecision" },
              ref: "BMJ 2025;389:e081904",
              decision: 0,
              rationale: {
                zh: "點估計值 0.54 > MID 0.25（落在「顯著效益」區間）。CI 下限 0.43 > MID → CI 不跨越 MID。CI 上限 0.65 < 3 倍 MID (0.75) → moderate effect。",
                en: "Point estimate 0.54 > MID 0.25 (in 'significant benefit' zone). CI lower bound 0.43 > MID → CI does not cross MID. CI upper bound 0.65 < 3× MID (0.75) → moderate effect.",
              },
              numberLine: { pointEst: 0.54, ciLow: 0.43, ciHigh: 0.65, mid: 0.25 },
            },
            {
              name: { zh: "不一致性", en: "Inconsistency" },
              ref: "BMJ 2025;389:e081905",
              decision: 0,
              rationale: {
                zh: "各研究信賴區間重疊比例高，點估計值落在同側。",
                en: "High CI overlap, point estimates on the same side.",
              },
            },
            {
              name: { zh: "PICO 不直接性", en: "Indirectness" },
              ref: "BMJ 2025;389:e083865",
              decision: 0,
              rationale: { zh: "PICO 相似度高。", en: "High PICO similarity." },
            },
            {
              name: { zh: "發表偏誤", en: "Publication Bias" },
              ref: "BMJ 2025;389:e083864",
              decision: -1,
              rationale: {
                zh: "漏斗圖不對稱，Egger's test 顯示具發表偏誤。",
                en: "Funnel plot asymmetric, Egger's test indicates publication bias.",
              },
            },
          ],
          totalDowngrade: -1,
          certaintyLevel: "moderate",
          summary: {
            zh: "整體扣 1 分 → 證據品質：中",
            en: "Total -1 → Certainty: Moderate",
          },
        },
      },
    },

    supportingRCT: {
      title: { zh: "新文獻佐證：RCT 簡介", en: "Supporting Evidence: RCT Summary" },
      purpose: {
        zh: "比較不同濃度 atropine 眼藥水的治療效益",
        en: "Compare efficacy of different atropine concentrations",
      },
      population: { zh: "10-14 歲近視兒童", en: "10-14 year old myopic children" },
      intervention: {
        zh: "使用 0.01%、0.025%、0.05% atropine 眼藥水",
        en: "0.01%, 0.025%, 0.05% atropine eye drops",
      },
      outcomes: { zh: "SE、AL、瞳孔大小、視力、不良反應", en: "SE, AL, pupil size, visual acuity, adverse events" },
      conclusion: {
        zh: "0.05% atropine 眼藥水治療效果最佳。",
        en: "0.05% atropine eye drops had the best treatment effect.",
      },
      reference: "LAMP Study Phase 4",
    },

    annotations: {
      zh: [
        "PICO 比較表是 Appraise 階段的第一步——確認文獻與案例的匹配度，這裡相似度高，為後續評讀建立基礎。",
        "CASP 評讀中，Q3a（文獻搜尋完整性）是唯一給「否」的題目，原因是語言限制（只搜英文）。這是最常被扣分的項目。",
        "Q6-1 和 Q6-2 的「不確定」判斷很重要——不要看到有做次族群分析就給「是」，必須確認有交互作用檢驗。",
        "同一篇 SR 的兩個濃度得到不同的 GRADE 評等（0.01% = Low, 0.05% = Moderate），關鍵差異在不精確性：0.01% 的 CI 跨越 MID 但 0.05% 不跨越。",
        "數線圖是理解不精確性判斷的核心工具——將點估計值和 CI 與 MID 的相對位置視覺化。",
      ],
      en: [
        "PICO comparison table is the first step in Appraise — confirming study-case match. High similarity here establishes the foundation for appraisal.",
        "In CASP scoring, Q3a (search comprehensiveness) was the only 'No' — due to English-only language restriction. This is the most commonly penalized item.",
        "The 'Uncertain' judgments for Q6-1 and Q6-2 are important — don't mark 'Yes' just because subgroup analysis was done; must confirm test for interaction exists.",
        "Same SR, two concentrations → different GRADE ratings (0.01% = Low, 0.05% = Moderate). Key difference is imprecision: 0.01% CI crosses MID, 0.05% doesn't.",
        "The number line is the core tool for understanding imprecision — visualizing the point estimate and CI relative to MID.",
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
        { item: { zh: "年齡/性別", en: "Age/Sex" }, study: { zh: "18 歲以下兒少", en: "Under 18" }, case_: { zh: "12 歲女童", en: "12-year-old girl" }, similarity: { zh: "高", en: "High" } },
        { item: { zh: "國家/種族", en: "Ethnicity" }, study: { zh: "亞洲 (中、港、台、日)", en: "Asian (China, HK, Taiwan, Japan)" }, case_: { zh: "台灣", en: "Taiwan" }, similarity: { zh: "高", en: "High" } },
        { item: { zh: "目標疾病", en: "Condition" }, study: { zh: "近視", en: "Myopia" }, case_: { zh: "軸性近視", en: "Axial myopia" }, similarity: { zh: "高", en: "High" } },
        { item: { zh: "介入治療", en: "Intervention" }, study: { zh: "Atropine 眼藥水", en: "Atropine eye drops" }, case_: { zh: "Atropine 眼藥水", en: "Atropine eye drops" }, similarity: { zh: "完全一致", en: "Identical" } },
        { item: { zh: "對照治療", en: "Comparator" }, study: { zh: "安慰劑/其他", en: "Placebo/other" }, case_: { zh: "不點眼藥水", en: "No eye drops" }, similarity: { zh: "高", en: "High" } },
        { item: { zh: "預期目標", en: "Outcome goal" }, study: { zh: "SE, AL 等指標惡化速度↓", en: "Slow SE, AL progression" }, case_: { zh: "SE, AL 等指標惡化速度↓", en: "Slow SE, AL progression" }, similarity: { zh: "高", en: "High" } },
      ],
    },
    benefitRisk: {
      options: [
        {
          name: { zh: "Atropine 眼藥水", en: "Atropine eye drops" },
          benefits: {
            zh: ["控制效果穩定且持久，停藥後反彈效應相對較小", "使用方法簡單"],
            en: ["Stable, lasting control with relatively small rebound after stopping", "Simple to use"],
          },
          risks: {
            zh: ["瞳孔放大可能畏光", "調節功能受影響，看近物可能模糊"],
            en: ["Pupil dilation may cause photophobia", "Accommodation affected, near objects may blur"],
          },
        },
        {
          name: { zh: "周邊離焦鏡片", en: "Peripheral defocus lenses" },
          benefits: {
            zh: ["配戴方法與一般眼鏡相同"],
            en: ["Same wearing method as regular glasses"],
          },
          risks: {
            zh: ["鏡片較厚重，攜帶不便", "需要全天配戴才能維持控制效果"],
            en: ["Heavier lenses, less portable", "Must wear all day to maintain control"],
          },
        },
        {
          name: { zh: "隱形眼鏡", en: "Contact lenses" },
          benefits: {
            zh: ["適合運動和戶外活動"],
            en: ["Good for sports and outdoor activities"],
          },
          risks: {
            zh: ["可能有乾眼症狀"],
            en: ["May cause dry eye symptoms"],
          },
        },
      ],
    },
    costAnalysis: {
      options: [
        {
          name: { zh: "Atropine 眼藥水", en: "Atropine eye drops" },
          directCost: {
            zh: "0.01%: 一盒約 300 元/月，一年約 3,600 元。0.05%: 一盒約 500-800 元/月，一年 6,000-9,600 元。",
            en: "0.01%: ~300 TWD/month, ~3,600/year. 0.05%: ~500-800 TWD/month, 6,000-9,600/year.",
          },
          visitCost: { zh: "800-2,000 元/年", en: "800-2,000 TWD/year" },
          indirectCost: { zh: "收入損失 3,000-6,000 元 + 交通 400-800 元", en: "Income loss 3,000-6,000 + transport 400-800 TWD" },
          totalAnnual: { zh: "7,800-18,400 元", en: "7,800-18,400 TWD" },
        },
        {
          name: { zh: "周邊離焦鏡片", en: "Peripheral defocus lenses" },
          directCost: { zh: "一副約 30,000 元", en: "~30,000 TWD per pair" },
          visitCost: { zh: "800-2,000 元/年", en: "800-2,000 TWD/year" },
          indirectCost: { zh: "收入損失 3,000-6,000 元 + 交通 400-800 元", en: "Income loss 3,000-6,000 + transport 400-800 TWD" },
          totalAnnual: { zh: "34,200-38,800 元", en: "34,200-38,800 TWD" },
        },
        {
          name: { zh: "隱形眼鏡", en: "Contact lenses" },
          directCost: { zh: "每月 2,500-6,000 元，一年約 30,000-72,000 元", en: "2,500-6,000 TWD/month, ~30,000-72,000/year" },
          visitCost: { zh: "800-2,000 元/年", en: "800-2,000 TWD/year" },
          indirectCost: { zh: "收入損失 3,000-6,000 元 + 交通 400-800 元", en: "Income loss 3,000-6,000 + transport 400-800 TWD" },
          totalAnnual: { zh: "34,200-80,800 元", en: "34,200-80,800 TWD" },
        },
      ],
    },
    efficacySummary: {
      title: { zh: "效益分析結論", en: "Efficacy Analysis Summary" },
      rows: [
        {
          group: "0.01% atropine",
          sampleSize: "624 人 (10 RCT)",
          md: "0.23",
          ci: "[0.13 ~ 0.34]",
          clinicalMeaning: { zh: "< MID (0.25)，不具顯著效益", en: "< MID (0.25), no significant benefit" },
          certainty: "low",
        },
        {
          group: "0.05% atropine",
          sampleSize: "411 人 (2 RCT)",
          md: "0.54",
          ci: "[0.43 ~ 0.65]",
          clinicalMeaning: { zh: "> MID (0.25)，具顯著效益", en: "> MID (0.25), significant benefit" },
          certainty: "moderate",
        },
      ],
      conclusion: {
        zh: "0.05% atropine 眼藥水具顯著治療效益。",
        en: "0.05% atropine eye drops demonstrate significant clinical benefit.",
      },
    },
    evidenceToDecision: {
      reference: "BMJ 2025;389:e083867",
      factors: [
        {
          key: "benefitRisk",
          label: { zh: "利益風險", en: "Benefit vs. Risk" },
          assessment: { zh: "利益：控制效果穩定持久。風險：瞳孔放大導致畏光。", en: "Benefits: stable lasting control. Risks: pupil dilation causing photophobia." },
          direction: 1,
        },
        {
          key: "evidenceQuality",
          label: { zh: "證據品質", en: "Evidence Quality" },
          assessment: { zh: "0.01%: 低證據品質。0.05%: 中證據品質。", en: "0.01%: low certainty. 0.05%: moderate certainty." },
          direction: 1,
        },
        {
          key: "valuesPreferences",
          label: { zh: "價值偏好", en: "Values & Preferences" },
          assessment: { zh: "不想影響穿搭且不用擔心感染。", en: "Doesn't want to affect appearance; no infection concerns." },
          direction: 2,
        },
        {
          key: "costEffectiveness",
          label: { zh: "成本效益", en: "Cost-Effectiveness" },
          assessment: { zh: "成本較其他方案低廉，較易負擔。效益：停藥後反彈較小，使用簡單。", en: "Lower cost than alternatives. Benefit: low rebound after stopping, simple use." },
          direction: 1,
        },
        {
          key: "feasibility",
          label: { zh: "可行性", en: "Feasibility" },
          assessment: { zh: "每天晚上點眼藥水即可。", en: "Just apply eye drops each night." },
          direction: 2,
        },
        {
          key: "acceptability",
          label: { zh: "接受度", en: "Acceptability" },
          assessment: { zh: "女童和母親都比較想要使用眼藥水。", en: "Both the girl and her mother prefer eye drops." },
          direction: 2,
        },
      ],
      recommendationStrength: "conditional",
      recommendationLabel: {
        zh: "部分推薦",
        en: "Conditional recommendation",
      },
      reasonForConditional: {
        zh: "六個面向均偏向贊成，但證據品質僅為中等（0.05%），因此為部分推薦而非強烈推薦。",
        en: "All six factors favor recommendation, but evidence certainty is only moderate (0.05%), so conditional rather than strong.",
      },
    },
    patientSummary: {
      zh: "媽媽和小朋友您好，經過團隊的縝密搜尋後，找到最有幫助的研究顯示：每天睡前使用阿托品眼藥水，幫助避免近視加深，且副作用不多，不會過分影響生活，且價格也相對划算。對於擔心影響外觀或對隱形眼鏡有疑慮的您們來說，是很方便安全的選擇。只要定期回診追蹤，檢查近視控制效果即可，所以推薦使用 0.05% 阿托品眼藥水來控制近視。",
      en: "Dear mom and child, after our team's thorough search, the most helpful research shows: using atropine eye drops before bed each night helps prevent myopia from worsening, with few side effects that won't significantly affect daily life, and at a relatively affordable price. For those worried about appearance or concerned about contact lenses, this is a convenient and safe choice. Just come for regular follow-ups to check myopia control, so we recommend 0.05% atropine eye drops for myopia control.",
    },
    annotations: {
      zh: [
        "案例適用性表直接延伸 Phase 4 的 PICO 比較，但從「評讀角度」轉為「應用角度」——確認證據可以帶回臨床。",
        "利益風險比較要連結病人偏好：女童不想戴眼鏡 → 隱形眼鏡和離焦鏡片都不理想 → 眼藥水的淨效益更大。",
        "成本分析不是簡報主角，但 atropine 年費用最低（7,800-18,400 元 vs. 其他方案 34,200+ 元）是一個重要加分項。",
        "EtD 框架的六個面向全部偏向贊成，但因為證據品質為「中」而非「高」，最終只能給「部分推薦」而非「強烈推薦」——這正是 Core GRADE Paper 7 的核心邏輯。",
        "去學術化回應是整個流程的最後一步——用日常語言把專業評估結果翻譯給病人。注意語氣溫暖親切，直接用「您」稱呼。",
      ],
      en: [
        "Applicability table extends Phase 4's PICO comparison from 'appraisal angle' to 'application angle' — confirming evidence can be brought back to clinic.",
        "Benefit-risk comparison links to patient preferences: girl doesn't want glasses → contacts and defocus lenses are suboptimal → eye drops have greater net benefit.",
        "Cost analysis isn't the star, but atropine's lowest annual cost (7,800-18,400 TWD vs. 34,200+ for alternatives) is a significant plus.",
        "All six EtD factors favor recommendation, but evidence certainty is 'moderate' not 'high', so only 'conditional' — this is Core GRADE Paper 7's core logic.",
        "Patient summary is the final step — translating the professional assessment into everyday language. Note the warm, direct tone using 'you'.",
      ],
    },
  },
};

export default atropine2024;
