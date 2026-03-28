// src/data/teachingContent.js
// Comprehensive bilingual teaching content for the EBMouse guided workflow.
// Each phase maps to an array of "lesson blocks" rendered between form sections.
// block.type: "concept" | "steps" | "example" | "pitfall" | "checklist" | "reference"

const teachingContent = {

  // ─────────────────────────────────────────────
  // PHASE 1: ASSESS — 評估案例
  // ─────────────────────────────────────────────
  assess: {
    intro: {
      zh: "在這一步，你要深入了解臨床情境，整理病人資料，並查閱背景知識。這些資訊將構成簡報的前 3 張投影片。",
      en: "In this step, you'll dissect the clinical scenario, organize patient data, and research background knowledge. This feeds the first 3 slides of your presentation.",
    },
    blocks: [
      // --- A1: Reading the Scenario ---
      {
        id: "assess-read-scenario",
        section: "scenario", // which form section this attaches to
        type: "concept",
        title: { zh: "如何拆解臨床情境？", en: "How to Dissect a Clinical Scenario?" },
        content: {
          zh: `臨床情境是競賽的起點。閱讀時，用螢光筆標記三類資訊：

**1. 病人輪廓** — 年齡、性別、疾病名稱、嚴重程度
**2. 臨床問題** — 情境中隱含了哪些需要回答的治療/診斷問題？
**3. 偏好與限制** — 病人或家屬對某些治療方式的好惡、擔憂、生活需求

以 2024 年案例為例：「小六女童上課時看不清楚黑板的字，醫生告知罹患軸性近視」——這裡包含了年齡 (12歲)、性別 (女)、疾病 (軸性近視)、場域 (門診)。

接著「女童沒有很想戴眼鏡，因為會影響日常穿搭」——這是重要的病人偏好，直接影響後續 PICOT 的選擇。`,
          en: `The clinical scenario is your starting point. While reading, highlight three categories of information:

**1. Patient profile** — age, sex, disease name, severity
**2. Clinical questions** — what treatment/diagnostic questions are embedded in the scenario?
**3. Preferences & constraints** — what does the patient or family like/dislike about certain treatments, their concerns, and lifestyle needs

In the 2024 case: "A sixth-grade girl can't see the blackboard clearly; the doctor says she has axial myopia" — this gives us age (12), sex (female), condition (axial myopia), setting (outpatient).

Then "The girl doesn't want to wear glasses because it affects her daily outfits" — this is a crucial patient preference that directly influences PICOT selection.`,
        },
      },
      // --- A2: Patient Profile ---
      {
        id: "assess-patient-profile",
        section: "patientProfile",
        type: "checklist",
        title: { zh: "病人資料清單", en: "Patient Profile Checklist" },
        content: {
          zh: `確認你已從情境中擷取以下資訊：

☐ **年齡** — 具體數字或範圍
☐ **性別** — 影響藥物選擇和副作用考量
☐ **主要疾病/狀況** — 使用正式醫學術語
☐ **場域** — 門診、住院、急診、社區
☐ **共病症** — 其他同時存在的疾病
☐ **目前治療** — 已在使用的藥物或療法
☐ **過敏史/禁忌症** — 限制某些治療選擇

這些資訊會出現在簡報第 2 張「個案簡介」投影片中。`,
          en: `Confirm you've extracted the following from the scenario:

☐ **Age** — specific number or range
☐ **Sex** — affects drug choices and side effect considerations
☐ **Primary condition** — use proper medical terminology
☐ **Setting** — outpatient, inpatient, ED, community
☐ **Comorbidities** — other coexisting conditions
☐ **Current treatment** — medications or therapies already in use
☐ **Allergies/contraindications** — limits certain treatment options

This information appears on Slide 2 "Case Introduction" of your presentation.`,
        },
      },
      // --- A3: Patient Preferences ---
      {
        id: "assess-preferences",
        section: "patientPreferences",
        type: "concept",
        title: { zh: "為什麼病人偏好是 EBM 的核心？", en: "Why Are Patient Preferences Core to EBM?" },
        content: {
          zh: `實證醫學的經典定義包含三個支柱：
1. **最佳研究證據** (best research evidence)
2. **臨床專業** (clinical expertise)
3. **病人價值觀與偏好** (patient values & preferences)

許多團隊只做到前兩個。但評審會看你是否把病人偏好融入整個決策過程——從 PICOT 的選擇理由、到最後的 Evidence-to-Decision 框架。

**常見的偏好類型：**
• 給藥途徑偏好（口服 vs. 注射 vs. 外用）
• 外觀/生活品質考量（例：不想戴眼鏡影響穿搭）
• 風險承受度（例：母親擔心隱眼感染風險）
• 費用考量
• 治療負擔（用藥頻率、回診次數）`,
          en: `The classic EBM definition rests on three pillars:
1. **Best research evidence**
2. **Clinical expertise**
3. **Patient values & preferences**

Many teams nail the first two but overlook the third. Judges assess whether you integrate patient preferences throughout — from PICOT selection rationale to the final Evidence-to-Decision framework.

**Common preference types:**
• Route of administration (oral vs. injection vs. topical)
• Appearance/QoL concerns (e.g., doesn't want glasses affecting daily style)
• Risk tolerance (e.g., parent worried about contact lens infection)
• Cost concerns
• Treatment burden (dosing frequency, clinic visit frequency)`,
        },
      },
      // --- A4: Background Knowledge ---
      {
        id: "assess-background",
        section: "backgroundKnowledge",
        type: "steps",
        title: { zh: "背景知識搜尋三步驟", en: "3-Step Background Knowledge Search" },
        content: {
          zh: `**Step 1: 疾病簡介**
用 UpToDate 或 DynaMed 查閱疾病的定義、病生理機轉。
→ 以一段話簡要描述即可。不需要深入到分子機轉。
→ 範例：「眼球前後軸長過度增長所導致的近視，光線無法正確聚焦在視網膜上而造成遠距離視物模糊。」

**Step 2: 風險族群**
誰容易得這個病？有哪些危險因子？
→ 範例：「學齡兒童和青少年，特別是長時間近距離用眼、戶外活動不足且有近視家族史者。」

**Step 3: 治療方式**
目前有哪些治療選擇？各自的優缺點？
→ 列出 2-4 種主要治療方式，簡要說明療程和議題。
→ 這些治療選項之間的比較，就是你後續建立 PICOT 的素材。

**重要：** 記錄你查閱了哪些資料來源（UpToDate、DynaMed、臨床指引名稱），這會出現在簡報的「背景知識搜尋」投影片中。`,
          en: `**Step 1: Disease Overview**
Look up the disease definition and basic pathophysiology in UpToDate or DynaMed.
→ A brief paragraph is sufficient. No need for molecular-level detail.
→ Example: "Myopia caused by excessive elongation of the eye's axial length, preventing light from focusing correctly on the retina."

**Step 2: Risk Factors / At-Risk Populations**
Who gets this disease? What are the risk factors?
→ Example: "School-age children and adolescents, especially those with prolonged near-work, insufficient outdoor activity, and family history of myopia."

**Step 3: Treatment Options**
What treatments are available? What are their pros/cons?
→ List 2-4 major options with brief descriptions of regimen and clinical issues.
→ The comparisons between these options become your PICOT building material.

**Important:** Record your sources (UpToDate, DynaMed, specific guideline names) — these appear on your "Background Knowledge Search" slide.`,
        },
      },
      // --- A5: Treatment Issues ---
      {
        id: "assess-treatment-issues",
        section: "backgroundKnowledge",
        type: "example",
        title: { zh: "範例：如何整理治療方式與臨床議題", en: "Example: Organizing Treatment Options & Clinical Issues" },
        content: {
          zh: `以軸性近視為例，2024 競賽簡報整理了兩種治療方式：

**Atropine 眼藥水：**
• 療程：每晚睡前點一滴，使用 2-4 年
• 議題：若同時考量療效和副作用，何種濃度最佳？(0.01% vs 0.05%)

**周邊離焦鏡片：**
• 療程：每天配戴 12 小時以上，至少 1-2 年
• 議題：配戴 3 年以上的長期成效？與眼藥水搭配是否有加乘效果？

注意「臨床議題」的寫法——每個治療方式都對應一個尚未解決的問題，這些問題就是你建立 PICOT 的起點。`,
          en: `Using axial myopia as an example, the 2024 competition organized two treatment options:

**Atropine eye drops:**
• Regimen: One drop before bed each night, used for 2-4 years
• Issue: Considering both efficacy and side effects, which concentration is optimal? (0.01% vs 0.05%)

**Peripheral defocus lenses:**
• Regimen: Wear 12+ hours daily, at least 1-2 years
• Issue: Long-term efficacy beyond 3 years? Additive effect when combined with eye drops?

Note how each treatment option maps to an unresolved clinical question — these questions become your PICOT starting points.`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PHASE 2: ASK — 形成問題
  // ─────────────────────────────────────────────
  ask: {
    intro: {
      zh: "好問題是好答案的一半。這一步你要把臨床議題轉化成結構化的 PICOT 問題，選擇最適合的問題類型，並決定哪個是主要 PICOT。",
      en: "A good question is half the answer. In this step, you'll convert clinical issues into structured PICOT questions, choose the right question type, and select your primary PICOT.",
    },
    blocks: [
      // --- B1: What is PICOT ---
      {
        id: "ask-picot-explained",
        section: "picot",
        type: "concept",
        title: { zh: "PICOT 五要素完整解析", en: "PICOT: The 5 Elements Explained" },
        content: {
          zh: `**P — Patient / Population (病人/族群)**
要夠具體。不只是「近視病人」，而是「患有軸性近視且不想戴眼鏡的小六女生」。
包含：年齡、性別、疾病名稱、嚴重程度、特殊條件/偏好。

**I — Intervention (介入措施)**
你想評估的治療方式。要明確到：藥名、劑量、給藥途徑、頻次。
例如：「每晚兩眼各點一滴 atropine 眼藥水」，而非只寫「atropine」。

**C — Comparison (對照組)**
介入措施要和什麼比較？三種常見對照：
• 安慰劑 (placebo)
• 不治療 (no treatment)
• 活性對照 (active comparator) — 例如另一種藥物或濃度

**O — Outcome (結果指標)**
你要測量什麼？優先選擇：
• 病人導向結果 (patient-oriented outcomes) — 如：症狀改善、生活品質
• 可量化的指標 — 如：球面等效屈光度 (SE)、眼軸長度 (AL)
• 可列出多個結果指標，包含效益指標和安全性指標（不良反應）

**T — Time (時間)**
追蹤多長時間？要合理考慮：
• 疾病的自然病程
• 介入預期見效的時間
• 常見的臨床追蹤時間點`,
          en: `**P — Patient / Population**
Be specific. Not just "myopia patients" but "a sixth-grade girl with axial myopia who doesn't want glasses."
Include: age, sex, condition, severity, special conditions/preferences.

**I — Intervention**
The treatment you're evaluating. Be precise: drug name, dose, route, frequency.
Example: "Nightly one drop of atropine eye drops in each eye" — not just "atropine."

**C — Comparison**
What are you comparing against? Three common types:
• Placebo
• No treatment
• Active comparator — e.g., another drug or concentration

**O — Outcome**
What are you measuring? Prioritize:
• Patient-oriented outcomes — symptom improvement, quality of life
• Quantifiable measures — e.g., spherical equivalent (SE), axial length (AL)
• List multiple outcomes including both efficacy and safety (adverse events)

**T — Time**
How long to follow up? Consider:
• Natural disease progression timeline
• Expected time for intervention to take effect
• Common clinical follow-up intervals`,
        },
      },
      // --- B2: Question Types ---
      {
        id: "ask-question-types",
        section: "picot",
        type: "concept",
        title: { zh: "四種問題類型與對應的研究設計", en: "4 Question Types & Matching Study Designs" },
        content: {
          zh: `| 問題類型 | 你想知道什麼？ | 最佳研究設計 |
|---------|-------------|-----------|
| **治療/預防型** | A 療法比 B 療法好嗎？ | RCT → SR with MA of RCTs |
| **診斷型** | 這個檢測準不準？ | 橫斷面研究 (cross-sectional) |
| **預後型** | 疾病未來會怎樣發展？ | 世代研究 (cohort study) |
| **傷害/病因型** | 這個因素會不會造成傷害？ | 世代研究 or 病例對照研究 |

**EBM 競賽最常見的類型是治療/預防型**，因為：
1. 對應的最高等級證據是 SR with MA of RCTs
2. CASP-SR 評讀工具正是針對系統性回顧設計的
3. Core GRADE 評分起點是「高」（因為納入的是 RCT）

你的問題類型決定了後續要搜尋什麼研究設計、用什麼評讀工具。`,
          en: `| Question Type | What do you want to know? | Best Study Design |
|--------------|-------------------------|------------------|
| **Treatment/Prevention** | Is therapy A better than B? | RCT → SR with MA of RCTs |
| **Diagnosis** | How accurate is this test? | Cross-sectional study |
| **Prognosis** | How will the disease progress? | Cohort study |
| **Harm/Etiology** | Does this factor cause harm? | Cohort or case-control |

**Treatment/prevention is the most common type in EBM competitions** because:
1. The highest-level evidence is SR with MA of RCTs
2. CASP-SR is specifically designed for appraising systematic reviews
3. Core GRADE starts at "High" (since it includes RCTs)

Your question type determines what study designs to search for and which appraisal tool to use.`,
        },
      },
      // --- B3: Multiple PICOTs ---
      {
        id: "ask-multiple-picots",
        section: "picot",
        type: "concept",
        title: { zh: "如何處理多個 PICOT？", en: "Handling Multiple PICOTs" },
        content: {
          zh: `一個臨床情境通常可以形成 2-3 個 PICOT。例如 2024 案例：
• **PICOT-1:** 周邊離焦鏡片 vs. 傳統眼鏡 → 針對「鏡片療效」議題
• **PICOT-2:** Atropine 眼藥水 vs. 不點眼藥水 → 針對「眼藥水療效」議題

**選擇主要 PICOT 的原則：**
1. **病人偏好優先** — 2024 案例中，女童和母親都偏好眼藥水 → 選 PICOT-2
2. **臨床可行性** — 考慮醫療環境是否容易執行
3. **證據可得性** — 該 PICOT 是否有足夠的高品質文獻可以搜尋到

你必須明確寫出「選此 PICOT 的原因」——評審會看你的決策邏輯是否合理，是否呼應病人偏好。`,
          en: `A single clinical scenario usually generates 2-3 PICOTs. In the 2024 case:
• **PICOT-1:** Peripheral defocus lenses vs. single-vision glasses → addresses "lens efficacy"
• **PICOT-2:** Atropine eye drops vs. no drops → addresses "eye drop efficacy"

**Principles for selecting the primary PICOT:**
1. **Patient preference first** — in 2024, both girl and mother preferred eye drops → chose PICOT-2
2. **Clinical feasibility** — is it practical in the given healthcare setting?
3. **Evidence availability** — are there enough high-quality studies to find?

You must clearly state "why this PICOT was chosen" — judges check whether your decision logic is sound and aligns with patient preferences.`,
        },
      },
      // --- B4: PICOT Example ---
      {
        id: "ask-picot-example",
        section: "picot",
        type: "example",
        title: { zh: "範例：PICOT-2 完整示範", en: "Example: Complete PICOT-2 Demo" },
        content: {
          zh: `**P:** 患有軸性近視且不想戴眼鏡的小六女生
**I:** 每晚兩眼各點一滴 atropine 眼藥水
**C:** 不點眼藥水
**O:** 球面等效屈光度 (SE)、眼軸長度 (AL)、不良反應
**T:** 12 個月

**問題類型：** 治療/預防型
**選此 PICOT 的原因：** 女童和母親均較偏好使用眼藥水

注意幾個重點：
• P 包含了「不想戴眼鏡」的偏好限制
• I 寫到了用法（每晚、兩眼各一滴）
• O 同時包含效益指標 (SE, AL) 和安全性指標 (不良反應)
• 選擇理由直接呼應 Phase 1 記錄的病人偏好`,
          en: `**P:** A sixth-grade girl with axial myopia who doesn't want to wear glasses
**I:** Nightly one drop of atropine eye drops in each eye
**C:** No eye drops
**O:** Spherical equivalent (SE), axial length (AL), adverse events
**T:** 12 months

**Question type:** Treatment/Prevention
**Selection rationale:** Both the girl and her mother prefer eye drops

Key points:
• P includes the preference constraint "doesn't want glasses"
• I specifies usage (nightly, one drop per eye)
• O includes both efficacy (SE, AL) and safety (adverse events) outcomes
• Selection rationale directly links to patient preferences documented in Phase 1`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PHASE 3: ACQUIRE — 文獻檢索
  // ─────────────────────────────────────────────
  acquire: {
    intro: {
      zh: "這一步你要學會有系統地搜尋文獻：選擇資料庫、建立搜尋策略、篩選文獻、最終選出一篇最適合的系統性回顧。",
      en: "In this step, you'll learn systematic literature searching: choose databases, build search strategies, screen results, and select the best systematic review.",
    },
    blocks: [
      // --- C1: Database Selection ---
      {
        id: "acquire-databases",
        section: "databases",
        type: "concept",
        title: { zh: "三大資料庫各自的優勢", en: "The Big 3 Databases: Strengths" },
        content: {
          zh: `**PubMed** — 必用
• 免費、文獻量最大、涵蓋最廣
• 支援 MeSH 控制詞彙搜尋
• 有 Automatic Term Mapping 功能
• 建議作為主要搜尋資料庫

**Embase** — 建議使用
• 涵蓋更多歐洲期刊和藥物相關研究
• 使用 Emtree 控制詞彙（類似 MeSH）
• 擅長藥物不良反應、藥物經濟學文獻

**Cochrane Library** — 建議使用
• 系統性回顧的金標準來源
• 資料庫本身就經過品質篩選
• Cochrane Reviews 可直接作為評讀目標

**競賽建議：至少使用 2 個以上的資料庫**。使用 3 個可以展示搜尋的完整性，在簡報中也會更有說服力。`,
          en: `**PubMed** — Must-use
• Free, largest collection, broadest coverage
• Supports MeSH controlled vocabulary searching
• Has Automatic Term Mapping
• Recommended as primary search database

**Embase** — Recommended
• Better coverage of European journals and drug-related research
• Uses Emtree controlled vocabulary (similar to MeSH)
• Strong in adverse drug reactions, pharmacoeconomics

**Cochrane Library** — Recommended
• Gold standard for systematic reviews
• The database itself is quality-filtered
• Cochrane Reviews can serve directly as appraisal targets

**Competition tip: Use at least 2 databases.** Using 3 demonstrates search comprehensiveness and is more convincing in your presentation.`,
        },
      },
      // --- C2: Keywords & Boolean ---
      {
        id: "acquire-keywords",
        section: "keywords",
        type: "steps",
        title: { zh: "從 PICOT 到 Boolean 搜尋策略", en: "From PICOT to Boolean Search Strategy" },
        content: {
          zh: `**Step 1: 將 PICOT 各元素轉為關鍵字**

| PICOT | Free Text | MeSH Term |
|-------|-----------|-----------|
| P | Axial myopia, Myopia progression | "Myopia"[MeSH] |
| I | Atropine | "Atropine"[MeSH] |
| C | Placebo | "Placebos"[MeSH] |
| O | Spherical equivalence, Axial length | — |

**Step 2: 同一概念的詞彙用 OR 連結**
(Myopia) OR (Myopia progression) OR "Myopia"[MeSH]

**Step 3: 不同概念用 AND 連結**
((Myopia) OR (Myopia progression)) AND (Atropine OR "Atropine"[MeSH])

**重要提醒：**
• C 和 O 通常不放入搜尋式——加入太多限制會漏掉相關文獻
• 先用 PubMed 的 Advanced Search 功能逐步建立搜尋式
• 每個概念先個別搜尋（#1, #2, #3），再用 AND 合併`,
          en: `**Step 1: Convert each PICOT element to keywords**

| PICOT | Free Text | MeSH Term |
|-------|-----------|-----------|
| P | Axial myopia, Myopia progression | "Myopia"[MeSH] |
| I | Atropine | "Atropine"[MeSH] |
| C | Placebo | "Placebos"[MeSH] |
| O | Spherical equivalence, Axial length | — |

**Step 2: Connect synonyms within a concept using OR**
(Myopia) OR (Myopia progression) OR "Myopia"[MeSH]

**Step 3: Connect different concepts using AND**
((Myopia) OR (Myopia progression)) AND (Atropine OR "Atropine"[MeSH])

**Key reminders:**
• C and O are usually NOT added to the search — too many constraints will miss relevant studies
• Use PubMed's Advanced Search to build the strategy step by step
• Search each concept individually (#1, #2, #3), then combine with AND`,
        },
      },
      // --- C3: Keyword Conversion ---
      {
        id: "acquire-sra",
        section: "keywords",
        type: "concept",
        title: { zh: "使用 SRA 自動轉換關鍵字", en: "Auto-Convert Keywords with SRA" },
        content: {
          zh: `在 PubMed 建立完搜尋策略後，你還需要在 Embase 和 Cochrane 執行搜尋。但不同資料庫的控制詞彙不同。

**Systematic Review Accelerator (SRA)** 可以自動將 PubMed 搜尋式轉換為 Cochrane 和 Embase 格式：
1. 前往 SRA 的 Polyglot Search 工具
2. 貼入你的 PubMed 搜尋式
3. 選擇目標資料庫
4. 自動產生轉換後的搜尋式

這個步驟在簡報中會呈現為「關鍵字轉換」投影片，展示你的搜尋策略涵蓋多個資料庫。`,
          en: `After building your search strategy in PubMed, you need to search Embase and Cochrane too. But different databases use different controlled vocabularies.

**Systematic Review Accelerator (SRA)** can auto-convert your PubMed strategy for Cochrane and Embase:
1. Go to SRA's Polyglot Search tool
2. Paste your PubMed search strategy
3. Select target databases
4. Auto-generates converted search strategies

This step appears as the "Keyword Conversion" slide in your presentation, showing that your search covered multiple databases.`,
        },
      },
      // --- C4: LitSuggest ---
      {
        id: "acquire-litsuggest",
        section: "screeningFlow",
        type: "concept",
        title: { zh: "使用 LitSuggest 輔助篩選", en: "Using LitSuggest for ML-Assisted Screening" },
        content: {
          zh: `PubMed 初步搜尋可能回傳數百篇文獻。手動逐篇閱讀標題和摘要太耗時。

**LitSuggest** 是 NCBI 提供的免費機器學習工具：
1. 輸入幾篇你確定相關的 PMID (positive examples)
2. 輸入幾篇你確定不相關的 PMID (negative examples)
3. LitSuggest 會自動對所有搜尋結果進行評分
4. 產出 Positive/Negative 分類結果和分數分布圖

**競賽中的用途：**
• 快速縮小篩選範圍（例如從 793 篇降到 391 篇）
• 分數分布圖可以放入簡報，展示你使用了系統化的篩選方法
• 配合人工閱讀確認，確保沒有遺漏重要文獻`,
          en: `A PubMed search may return hundreds of results. Manually screening all titles and abstracts is too time-consuming.

**LitSuggest** is a free ML tool from NCBI:
1. Input a few PMIDs you know are relevant (positive examples)
2. Input a few PMIDs you know are irrelevant (negative examples)
3. LitSuggest auto-scores all search results
4. Produces Positive/Negative classifications with score distribution charts

**Competition use:**
• Rapidly narrow the screening pool (e.g., from 793 to 391 articles)
• The score distribution chart can go into your slides, showing systematic screening
• Combined with manual review to ensure no important articles are missed`,
        },
      },
      // --- C5: PRISMA Flow ---
      {
        id: "acquire-prisma",
        section: "screeningFlow",
        type: "steps",
        title: { zh: "PRISMA 流程圖四步驟", en: "PRISMA Flow Diagram: 4 Steps" },
        content: {
          zh: `你的簡報需要一張清楚的檢索歷程投影片。PRISMA 流程紀錄四個階段的文獻數量：

**1. 識別 (Identification)** — 各資料庫的初步搜尋結果數量
→ PubMed: n = ?, Embase: n = ?, Cochrane: n = ?

**2. 去重 (Deduplication)** — 移除重複文獻後剩餘數量
→ 不同資料庫會搜到相同文獻

**3. 篩選 (Screening)** — 標題/摘要篩選 → 全文篩選
→ 每一步都要記錄排除了多少篇、排除原因

**4. 納入 (Included)** — 最終納入的文獻數量
→ 這些文獻就是你進行 CASP 評讀的對象

**範例 (2024 案例)：**
PubMed 793 → LitSuggest 391 (positive) → 屬於 SR: 9 篇 → 符合 PICO: 2 篇 → 選擇 1 篇`,
          en: `Your slides need a clear search flow diagram. PRISMA records article counts at four stages:

**1. Identification** — initial results from each database
→ PubMed: n = ?, Embase: n = ?, Cochrane: n = ?

**2. Deduplication** — remaining after removing duplicates
→ Different databases find the same articles

**3. Screening** — title/abstract screening → full-text screening
→ Record how many excluded at each step and why

**4. Included** — final included articles
→ These are the ones you'll appraise with CASP

**Example (2024 case):**
PubMed 793 → LitSuggest 391 (positive) → SR articles: 9 → Match PICO: 2 → Select 1`,
        },
      },
      // --- C6: Article Selection ---
      {
        id: "acquire-article-selection",
        section: "selectedArticle",
        type: "concept",
        title: { zh: "如何選擇最合適的文獻？", en: "How to Select the Best Article?" },
        content: {
          zh: `當篩選出 2-3 篇候選文獻時，你需要選擇一篇進行深度評讀。選擇時考量：

**1. PICO 匹配度** — 文獻的 PICO 和你的臨床案例越相似越好
**2. 研究品質** — 納入的 RCT 數量、受試者總數、是否有 MA
**3. 發表時間** — 較新的 SR 通常涵蓋更多研究
**4. 結果指標匹配** — 文獻是否報告了你關心的結果指標

**競賽簡報中需要包含：**
• 候選文獻的簡要比較（各自 RCT 數量、受試者數量）
• 明確說明選擇理由
• 所選文獻的完整引用資訊（作者、期刊、年份、PMID）
• 研究類型（例如：SR with MA of RCTs）`,
          en: `When you have 2-3 candidate articles, you need to pick one for in-depth appraisal. Consider:

**1. PICO match** — the closer the study's PICO matches your clinical case, the better
**2. Study quality** — number of included RCTs, total participants, presence of MA
**3. Publication date** — newer SRs typically include more studies
**4. Outcome match** — does the study report outcomes you care about?

**Your competition slides should include:**
• Brief comparison of candidates (RCT count, participant count for each)
• Clear selection rationale
• Full citation of selected article (authors, journal, year, PMID)
• Study type (e.g., SR with MA of RCTs)`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PHASE 4: APPRAISE — 文獻評讀
  // ─────────────────────────────────────────────
  appraise: {
    intro: {
      zh: "這是最核心也最技術性的階段。你將使用 CASP-SR 評讀系統性回顧的品質，整理研究結果，並用 Core GRADE 框架評估證據的確定性。",
      en: "This is the most technical and critical phase. You'll use CASP-SR to appraise the systematic review's quality, summarize results, and use Core GRADE to assess certainty of evidence.",
    },
    blocks: [
      // --- D1: CASP Overview ---
      {
        id: "appraise-casp-overview",
        section: "casp",
        type: "concept",
        title: { zh: "CASP-SR 評讀框架總覽", en: "CASP-SR Appraisal Framework Overview" },
        content: {
          zh: `**CASP (Critical Appraisal Skills Programme)** 是最常用的文獻評讀工具。SR 版本包含以下主要問題：

**第一區：研究效度 (Validity)**
• Q1. 是否明確提出研究問題？— 確認文獻有清楚的 PICO
• Q2. 是否搜尋合適的研究設計？— 治療型問題應搜尋 RCT
• Q3. 是否納入所有相關的初級研究？
  - Q3a. 文獻搜尋是否完整？（資料庫選擇、語言限制、時間範圍）
  - Q3b. 文獻篩選是否適當？（獨立篩選、分歧處理）
  - Q3c. 文獻納入標準是否合理？
  - Q3d. 檢索策略總結
• Q4. 是否評估初級研究的效度？（使用 Cochrane Risk of Bias Tool）

**第二區：結果 (Results)**
• Q5a. 資料擷取是否適當？（獨立擷取、分歧處理）
• Q5b. 資料呈現是否適當？（表格、森林圖）
• Q6. 合併分析是否適當？（異質性處理、模型選擇）
  - Q6-1. 次族群分析
  - Q6-2. 統合迴歸分析

**第三區：臨床意義 (Will the results help?)**
• Q7. 是否提及研究限制？`,
          en: `**CASP (Critical Appraisal Skills Programme)** is the most widely used appraisal tool. The SR version covers:

**Section A: Validity**
• Q1. Clear research question? — Confirm the study has a clear PICO
• Q2. Appropriate study designs searched? — Treatment questions should search for RCTs
• Q3. All relevant primary studies included?
  - Q3a. Was the search comprehensive? (databases, language limits, time range)
  - Q3b. Was screening appropriate? (independent screening, disagreement resolution)
  - Q3c. Were inclusion criteria reasonable?
  - Q3d. Overall search adequacy
• Q4. Was study validity assessed? (Cochrane Risk of Bias Tool used?)

**Section B: Results**
• Q5a. Was data extraction appropriate? (independent extraction, disagreement resolution)
• Q5b. Was data presentation appropriate? (tables, forest plots)
• Q6. Was data combination appropriate? (heterogeneity handling, model selection)
  - Q6-1. Subgroup analysis
  - Q6-2. Meta-regression

**Section C: Will the results help?**
• Q7. Were limitations discussed?`,
        },
      },
      // --- D2: CASP Scoring Tips ---
      {
        id: "appraise-casp-scoring",
        section: "casp",
        type: "pitfall",
        title: { zh: "CASP 評分常見錯誤", en: "Common CASP Scoring Mistakes" },
        content: {
          zh: `**❌ 錯誤 1：只給答案不附證據**
每一題都要從文獻中找到具體的支持證據。例如 Q4 答「是」，必須說明「文獻使用 Cochrane risk of bias tool，由兩位作者獨立評估」。

**❌ 錯誤 2：Q3a 輕率給「是」**
Q3a（文獻搜尋是否完整）是最容易被扣分的題目。常見限制：
• 只搜尋英文文獻 → 語言偏誤
• 沒有搜尋未發表研究 (grey literature)
• 時間範圍不夠長

**❌ 錯誤 3：Q6-1, Q6-2 亂給「是」**
次族群分析和統合迴歸需要檢查：
• 是否事先規劃 (a priori)？
• 是否有交互作用檢驗 (test for interaction)？
• 是否處理多重檢定問題？
如果文獻沒有提及這些，應該答「不確定」而非「是」。

**❌ 錯誤 4：忘了 Kappa 一致性**
競賽要展示人類評分和 AI 評分的比較，計算 Cohen's Kappa。完全一致 = 1.0。`,
          en: `**❌ Mistake 1: Answers without evidence**
Every question needs specific supporting evidence from the article. For Q4 "Yes," you must explain "The study used Cochrane risk of bias tool with two independent assessors."

**❌ Mistake 2: Hastily marking Q3a as "Yes"**
Q3a (comprehensive search) is the most commonly penalized item. Watch for:
• English-only literature → language bias
• No grey literature searched
• Time range too narrow

**❌ Mistake 3: Marking Q6-1, Q6-2 as "Yes" without checking**
Subgroup analysis and meta-regression require:
• Were they planned a priori?
• Was there a test for interaction?
• Was multiple testing addressed?
If the article doesn't mention these, answer "Uncertain" — not "Yes."

**❌ Mistake 4: Forgetting Kappa agreement**
The competition expects a comparison between human and AI scores, with Cohen's Kappa calculated. Perfect agreement = 1.0.`,
        },
      },
      // --- D3: Results Summary ---
      {
        id: "appraise-results",
        section: "results",
        type: "concept",
        title: { zh: "如何整理結果：效應量、CI、森林圖", en: "Summarizing Results: Effect Size, CI, Forest Plot" },
        content: {
          zh: `你的簡報需要一張「結果綜覽」表格。對每個結果指標，記錄：

**效應量 (Effect Size)**
• **WMD (Weighted Mean Difference)** — 連續型結果（例如 SE 變化量）
• **OR (Odds Ratio)** — 二元結果（例如不良反應發生率）
• **RR (Risk Ratio)** — 二元結果

**95% 信賴區間 (95% CI)**
• 表示效應量的精確程度
• CI 不包含 0（WMD）或不包含 1（OR/RR）→ 統計顯著
• 但統計顯著 ≠ 臨床顯著 → 還需要與 MID 比較

**範例 (2024 案例)：**
| 指標 | 樣本數 | WMD [95% CI] |
|-----|--------|-------------|
| SE (球面等效屈光度) | 2577人 (16 RCT) | 0.39 [0.23 ~ 0.54] |
| AL (眼軸長度) | 2577人 (16 RCT) | -0.15 [-0.19 ~ -0.1] |
| 副作用 | 1035人 (8 RCT) | OR 1.37 [1.09 ~ 1.74] |

**森林圖 (Forest Plot)** 是視覺化呈現各研究結果的標準工具，展示每個研究的效應量、CI、權重，以及合併效應量。`,
          en: `Your slides need a "Results Overview" table. For each outcome, record:

**Effect Size**
• **WMD (Weighted Mean Difference)** — continuous outcomes (e.g., SE change)
• **OR (Odds Ratio)** — binary outcomes (e.g., adverse event rate)
• **RR (Risk Ratio)** — binary outcomes

**95% Confidence Interval (95% CI)**
• Indicates precision of the effect estimate
• CI excludes 0 (WMD) or 1 (OR/RR) → statistically significant
• But statistical significance ≠ clinical significance → need to compare with MID

**Example (2024 case):**
| Outcome | Sample | WMD [95% CI] |
|---------|--------|-------------|
| SE (Spherical Equivalent) | 2577 (16 RCTs) | 0.39 [0.23 ~ 0.54] |
| AL (Axial Length) | 2577 (16 RCTs) | -0.15 [-0.19 ~ -0.1] |
| Adverse Events | 1035 (8 RCTs) | OR 1.37 [1.09 ~ 1.74] |

**Forest Plot** is the standard visual tool showing each study's effect size, CI, weight, and the pooled effect.`,
        },
      },
      // --- D4: MID ---
      {
        id: "appraise-mid",
        section: "grade",
        type: "concept",
        title: { zh: "MID：最小重要差異值", en: "MID: Minimal Important Difference" },
        content: {
          zh: `**MID (Minimal Important Difference)** 是 GRADE 不精確性評估的核心。它回答一個問題：「多大的效果才算有臨床意義？」

**四種 MID 訂定方法：**
1. **文獻基準** — 找到已發表的 MID 值（最常用）
2. **專家意見** — 臨床專家認為多大的差異有意義
3. **病人回饋** — 病人認為多大的改善值得追求
4. **指標性研究** — 參考關鍵研究的結果作為基準

**範例 (2024 案例)：**
• 參考文獻：近視平均進程為一年 SE 下降 0.5D
• 評斷指標：SE 改善幅度達 50% 以上
• MID = 0.5 ÷ 2 = **0.25D**

**MID 的作用：**
• 效應量 > MID → 具有臨床顯著效益
• 效應量 < MID → 效果甚微或無臨床意義
• 95% CI 是否跨越 MID → 決定不精確性是否扣分

這個概念貫穿整個 GRADE 評估，你必須在簡報中清楚解釋 MID 的訂定依據。`,
          en: `**MID (Minimal Important Difference)** is central to GRADE imprecision assessment. It answers: "How large an effect is clinically meaningful?"

**Four methods to determine MID:**
1. **Literature benchmark** — find published MID values (most common)
2. **Expert opinion** — what clinicians consider a meaningful difference
3. **Patient feedback** — what improvement patients consider worthwhile
4. **Benchmark study** — reference a key study's results as a benchmark

**Example (2024 case):**
• Reference: Average myopia progression is 0.5D SE decline per year
• Criterion: SE improvement ≥ 50%
• MID = 0.5 ÷ 2 = **0.25D**

**How MID is used:**
• Effect size > MID → clinically significant benefit
• Effect size < MID → trivial or no clinical significance
• Whether 95% CI crosses MID → determines imprecision downgrading

This concept threads through the entire GRADE assessment. You must clearly explain your MID rationale in your slides.`,
        },
      },
      // --- D5: Core GRADE ---
      {
        id: "appraise-grade-overview",
        section: "grade",
        type: "steps",
        title: { zh: "Core GRADE 五面向評估流程 (BMJ 2025)", en: "Core GRADE: 5-Domain Assessment (BMJ 2025)" },
        content: {
          zh: `GRADE 從「高」開始（因為納入的是 RCT），逐面向評估是否需要降級。

**面向 1: 誤差風險 (Risk of Bias)** — BMJ 2025;389:e083864
評估流程：
1. 統計初級研究的誤差風險比例（高/中/低）
2. 排除高誤差風險研究重新分析，結果是否改變？
→ 結果雷同 → 不扣分
→ 結果改變 → 扣 1 分

**面向 2: 不精確性 (Imprecision)** — BMJ 2025;389:e081904
評估流程：
1. 點估計值 vs. MID：點估計值是否達到 MID？
2. 95% CI 是否跨越 MID？
3. 若不跨越，評估作用大小（CI 上限是否超過 3 倍 MID）
→ 點估計值 < MID 且 CI 跨越 MID → 扣 1 分
→ 點估計值 > MID 且 CI 不跨越 MID → 不扣分

**面向 3: 不一致性 (Inconsistency)** — BMJ 2025;389:e081905
評估流程：
1. 各研究 CI 重疊比例（看森林圖）
2. 點估計值是否落在同側（以 MID 為基準）
→ CI 重疊高 + 同側 → 不扣分

**面向 4: PICO 不直接性 (Indirectness)** — BMJ 2025;389:e083865
評估流程：
將文獻的 PICO 和你的臨床案例逐項比較。
→ 高度相似 → 不扣分
→ 有重要差異 → 扣 1 分

**面向 5: 發表偏誤 (Publication Bias)** — BMJ 2025;389:e083864
評估流程：
1. 是否均為小型研究或企業贊助？
2. 是否有統合分析且研究數 ≥ 10 篇？
3. 漏斗圖/Egger's test 是否顯示偏誤？
→ 有發表偏誤跡象 → 扣 1 分`,
          en: `GRADE starts at "High" (for RCTs) and assesses each domain for downgrading.

**Domain 1: Risk of Bias** — BMJ 2025;389:e083864
Process:
1. Count the proportion of high/moderate/low risk studies
2. Re-analyze excluding high-risk studies — do results change?
→ Similar results → no downgrade
→ Results change → downgrade 1

**Domain 2: Imprecision** — BMJ 2025;389:e081904
Process:
1. Point estimate vs. MID: does the point estimate reach MID?
2. Does the 95% CI cross MID?
3. If not, assess effect magnitude (does CI upper bound exceed 3× MID?)
→ Point estimate < MID and CI crosses MID → downgrade 1
→ Point estimate > MID and CI doesn't cross MID → no downgrade

**Domain 3: Inconsistency** — BMJ 2025;389:e081905
Process:
1. CI overlap proportion across studies (inspect forest plot)
2. Do point estimates fall on the same side of MID?
→ High CI overlap + same side → no downgrade

**Domain 4: Indirectness** — BMJ 2025;389:e083865
Process:
Compare study PICO with your clinical case element by element.
→ High similarity → no downgrade
→ Important differences → downgrade 1

**Domain 5: Publication Bias** — BMJ 2025;389:e083864
Process:
1. Are all studies small or industry-funded?
2. Was MA performed with ≥ 10 studies?
3. Does funnel plot / Egger's test show asymmetry?
→ Evidence of publication bias → downgrade 1`,
        },
      },
      // --- D6: GRADE Number Line ---
      {
        id: "appraise-grade-numberline",
        section: "grade",
        type: "example",
        title: { zh: "不精確性：數線圖判讀法", en: "Imprecision: Number-Line Interpretation" },
        content: {
          zh: `不精確性是最需要視覺化理解的面向。想像一條數線：

\`\`\`
null ──── 效果甚微或無效 ──── MID ──── 顯著效益 ────→
0                            0.25
\`\`\`

**情境 A：0.01% atropine (WMD 0.23 [0.13 ~ 0.34])**
• 點估計值 0.23 < MID 0.25 → 落在「效果甚微」區間
• CI 上限 0.34 > MID → CI 跨越 MID
• 判定：**扣 1 分**（無法確定是否有臨床顯著效益）

**情境 B：0.05% atropine (WMD 0.54 [0.43 ~ 0.65])**
• 點估計值 0.54 > MID 0.25 → 落在「顯著效益」區間
• CI 下限 0.43 > MID → CI 不跨越 MID
• CI 上限 0.65 < 3 × MID (0.75) → moderate effect
• 判定：**不扣分**

這就是為什麼同一篇文獻的不同濃度，可以得到不同的 GRADE 評等。`,
          en: `Imprecision is the domain that benefits most from visualization. Imagine a number line:

\`\`\`
null ──── trivial/no effect ──── MID ──── significant benefit ────→
0                              0.25
\`\`\`

**Scenario A: 0.01% atropine (WMD 0.23 [0.13 ~ 0.34])**
• Point estimate 0.23 < MID 0.25 → falls in "trivial effect" zone
• CI upper bound 0.34 > MID → CI crosses MID
• Verdict: **downgrade 1** (can't confirm clinically significant benefit)

**Scenario B: 0.05% atropine (WMD 0.54 [0.43 ~ 0.65])**
• Point estimate 0.54 > MID 0.25 → falls in "significant benefit" zone
• CI lower bound 0.43 > MID → CI does NOT cross MID
• CI upper bound 0.65 < 3 × MID (0.75) → moderate effect
• Verdict: **no downgrade**

This explains why different concentrations from the same article can receive different GRADE ratings.`,
        },
      },
      // --- D7: GRADE Summary ---
      {
        id: "appraise-grade-summary",
        section: "grade",
        type: "concept",
        title: { zh: "GRADE 綜合評估與證據等級", en: "GRADE Summary & Certainty Levels" },
        content: {
          zh: `**證據等級計算：**
起點：高（因為 SR of RCTs）= 4 分
每扣 1 分降一級：高(4) → 中(3) → 低(2) → 很低(1)

**範例 (2024 案例)：**

0.01% atropine:
• 誤差風險: 不扣分 (0)
• 不精確性: 扣 1 分 (-1) ← CI 跨越 MID
• 不一致性: 不扣分 (0)
• 不直接性: 不扣分 (0)
• 發表偏誤: 扣 1 分 (-1) ← 漏斗圖不對稱
• 總計: -2 → **證據品質：低 (Low)**

0.05% atropine:
• 誤差風險~不一致性~不直接性: 均不扣分 (0)
• 發表偏誤: 扣 1 分 (-1)
• 總計: -1 → **證據品質：中 (Moderate)**

**簡報呈現方式：**
每個面向一張投影片，展示評估流程和判斷依據，最後一張彙整。`,
          en: `**Certainty level calculation:**
Starting point: High (SR of RCTs) = 4
Each -1 drops one level: High(4) → Moderate(3) → Low(2) → Very Low(1)

**Example (2024 case):**

0.01% atropine:
• Risk of bias: no downgrade (0)
• Imprecision: -1 ← CI crosses MID
• Inconsistency: no downgrade (0)
• Indirectness: no downgrade (0)
• Publication bias: -1 ← funnel plot asymmetry
• Total: -2 → **Certainty: Low**

0.05% atropine:
• Risk of bias through indirectness: all 0
• Publication bias: -1
• Total: -1 → **Certainty: Moderate**

**Slide presentation:**
One slide per domain showing the assessment process and rationale, final slide summarizing all five.`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PHASE 5: APPLY — 臨床應用
  // ─────────────────────────────────────────────
  apply: {
    intro: {
      zh: "最後一步，你要把研究證據帶回臨床。評估案例適用性、比較利益風險、分析成本、完成 Evidence-to-Decision 框架，最後用白話文向病人說明你的建議。",
      en: "The final step: bring the evidence back to the clinic. Assess applicability, compare benefits and risks, analyze costs, complete the Evidence-to-Decision framework, and explain your recommendation in plain language.",
    },
    blocks: [
      // --- E1: Applicability ---
      {
        id: "apply-applicability",
        section: "applicability",
        type: "concept",
        title: { zh: "案例適用性評估 (CASP Q9)", en: "Case Applicability (CASP Q9)" },
        content: {
          zh: `CASP Q9 問的是：「這篇文獻的結果能應用到你的病人嗎？」

**比較方法：** 將文獻的 PICO 和你的臨床案例逐項比較。

| 項目 | 評讀文獻 | 情境案例 | 相似程度 |
|------|---------|---------|---------|
| 年齡/性別 | 18歲以下兒少 | 12歲女童 | 高 |
| 國家/種族 | 亞洲（台灣、中國、日本、香港） | 台灣 | 高 |
| 疾病 | 近視（軸性/趨光性） | 軸性近視 | 高 |
| 介入 | Atropine 眼藥水 | Atropine 眼藥水 | 完全一致 |
| 對照 | 安慰劑/其他療法 | 不點眼藥水 | 高 |
| 結果指標 | SE, AL, 不良反應 | SE, AL | 高 |

**結論：** 相似程度高，應用上可行。

如果某個維度差異較大（例如文獻研究成人但你的病人是兒童），需要特別說明這個差異可能如何影響結果的外推性。`,
          en: `CASP Q9 asks: "Can these results be applied to your patient?"

**Method:** Compare the study's PICO with your clinical case element by element.

| Item | Study | Case | Similarity |
|------|-------|------|-----------|
| Age/Sex | <18 years | 12-year-old girl | High |
| Ethnicity | Asian (Taiwan, China, Japan, HK) | Taiwan | High |
| Condition | Myopia (axial/refractive) | Axial myopia | High |
| Intervention | Atropine eye drops | Atropine eye drops | Identical |
| Comparator | Placebo/other therapy | No eye drops | High |
| Outcomes | SE, AL, adverse events | SE, AL | High |

**Conclusion:** High similarity, applicable.

If there's a major discrepancy (e.g., study enrolled adults but your patient is a child), explicitly discuss how this gap might affect generalizability.`,
        },
      },
      // --- E2: Benefit-Risk ---
      {
        id: "apply-benefit-risk",
        section: "benefitRisk",
        type: "concept",
        title: { zh: "利益風險比較 (CASP Q8)", en: "Benefit-Risk Comparison (CASP Q8)" },
        content: {
          zh: `將所有治療選項的利益和風險並排比較。這對應 CASP Q8 和競賽簡報的「利益風險比較」投影片。

**比較要包含：**
• 每種治療方式的主要效益（療效、便利性）
• 每種治療方式的主要風險（副作用、使用限制）

**範例 (2024 案例)：**

| | Atropine 眼藥水 | 周邊離焦鏡片 | 隱形眼鏡 |
|---|---|---|---|
| **利益** | 控制效果穩定持久，停藥反彈小，使用簡單 | 配戴方式與一般眼鏡相同 | 適合運動和戶外 |
| **風險** | 瞳孔放大可能畏光，看近物可能模糊 | 鏡片較厚重攜帶不便，需全天配戴 | 乾眼症狀，感染風險 |

**要點：** 不只列出資料，要把利益風險連結到你的臨床案例。女童不想戴眼鏡 → 隱形眼鏡和周邊離焦鏡片都不理想 → 眼藥水的利益更大。`,
          en: `Compare all treatment options' benefits and risks side by side. This maps to CASP Q8 and the "Benefit-Risk Comparison" slide.

**Include for each option:**
• Key benefits (efficacy, convenience)
• Key risks (adverse effects, usage limitations)

**Example (2024 case):**

| | Atropine drops | Defocus lenses | Contact lenses |
|---|---|---|---|
| **Benefits** | Stable control, low rebound, easy to use | Same as regular glasses | Good for sports/outdoor |
| **Risks** | Pupil dilation may cause photophobia, near blur | Heavy lenses, must wear all day | Dry eye, infection risk |

**Key:** Don't just list data — connect benefits/risks to your clinical case. Girl doesn't want glasses → both contacts and defocus lenses are suboptimal → eye drops offer greater net benefit.`,
        },
      },
      // --- E3: Cost Analysis ---
      {
        id: "apply-cost",
        section: "costAnalysis",
        type: "concept",
        title: { zh: "成本分析方法", en: "Cost Analysis Method" },
        content: {
          zh: `將各治療方案的成本分為直接成本和間接成本：

**直接成本：**
• 藥品/器材費用（含單價、用量計算、一年總額）
• 掛號/診察費用（回診頻率 × 每次費用）

**間接成本：**
• 收入損失（回診次數 × 陪診時間 × 時薪推估）
• 交通費用

**範例 (2024 案例)：**
| | Atropine 眼藥水 | 周邊離焦鏡片 | 隱形眼鏡 |
|---|---|---|---|
| 直接成本 | 3,600-9,600/年 | 30,000 | 30,000-72,000/年 |
| 掛號費 | 800-2,000/年 | 800-2,000/年 | 800-2,000/年 |
| 間接成本 | 3,400-6,800/年 | 3,400-6,800/年 | 3,400-6,800/年 |
| **總額** | **7,800-18,400/年** | **34,200-38,800** | **34,200-80,800/年** |

成本分析不是簡報的主角，但評審會注意你是否有考量經濟面。`,
          en: `Break down costs into direct and indirect for each option:

**Direct costs:**
• Drug/device costs (unit price, quantity calculation, annual total)
• Visit/consultation fees (visit frequency × cost per visit)

**Indirect costs:**
• Income loss (number of visits × time per visit × estimated hourly wage)
• Transportation costs

Cost analysis isn't the star of your presentation, but judges notice whether you've considered the economic dimension.`,
        },
      },
      // --- E4: Evidence to Decision ---
      {
        id: "apply-etd",
        section: "evidenceToDecision",
        type: "steps",
        title: { zh: "Evidence-to-Decision 框架 (Core GRADE Paper 7)", en: "Evidence-to-Decision Framework (Core GRADE Paper 7)" },
        content: {
          zh: `EtD 框架 (BMJ 2025;389:e083867) 綜合六個面向做出最終推薦：

**1. 利益風險** — 利益是否明顯大於風險？
→ 2024: 控制效果穩定，畏光副作用相對輕微 → 偏向贊成

**2. 證據品質** — GRADE 評等是什麼？
→ 2024: 0.05% 為中等品質 → 偏向贊成

**3. 價值偏好** — 病人和家屬的偏好是什麼？
→ 2024: 不想影響穿搭、不用擔心感染 → 偏向贊成

**4. 成本效益** — 成本是否合理？效益是否值得？
→ 2024: 成本較其他方案低，效益穩定 → 偏向贊成

**5. 可行性** — 在臨床現場是否可行？
→ 2024: 每天晚上點眼藥水即可 → 偏向贊成

**6. 接受度** — 各利益關係者是否接受？
→ 2024: 女童和母親都偏好眼藥水 → 偏向贊成

**推薦強度：**
• 六個面向均偏向贊成 → **強烈推薦** (Strong)
• 有些面向不確定或中立 → **部分推薦** (Conditional)
• 2024 案例因證據品質僅為中等 → **部分推薦 0.05% atropine**`,
          en: `EtD Framework (BMJ 2025;389:e083867) synthesizes six dimensions for a final recommendation:

**1. Benefit-Risk** — Do benefits clearly outweigh risks?
**2. Evidence Quality** — What's the GRADE certainty?
**3. Values & Preferences** — What do patients/families prefer?
**4. Cost-Effectiveness** — Are costs reasonable? Is the benefit worthwhile?
**5. Feasibility** — Is it practical in the clinical setting?
**6. Acceptability** — Do all stakeholders accept this approach?

**Recommendation strength:**
• All six dimensions favor → **Strong recommendation**
• Some uncertain or neutral → **Conditional recommendation**
• 2024 case: evidence quality only moderate → **Conditional recommendation for 0.05% atropine**`,
        },
      },
      // --- E5: Patient Summary ---
      {
        id: "apply-patient-summary",
        section: "patientSummary",
        type: "concept",
        title: { zh: "去學術化回應的撰寫技巧", en: "Writing the Patient-Facing Summary" },
        content: {
          zh: `這是簡報倒數第二張投影片，也是評審最看重的部分之一。你要把整個評估過程的結論，用病人和家屬能理解的語言說出來。

**撰寫原則：**
1. **用「您」而非「病人」** — 直接對話的語氣
2. **避免專業術語** — 不說 WMD、CI、GRADE，改用日常用語
3. **說明做了什麼** — 「經過團隊的縝密搜尋」
4. **說明結果** — 「幫助避免近視加深，副作用不多」
5. **連結病人偏好** — 「對於擔心影響外觀的您們來說」
6. **給出明確建議** — 「推薦使用 0.05% 阿托品眼藥水」
7. **提供後續計畫** — 「只要定期回診追蹤」

**範例 (2024 案例)：**
「媽媽和小朋友您好，經過團隊的縝密搜尋後，找到最有幫助的研究顯示：每天睡前使用阿托品眼藥水，幫助避免近視加深，且副作用不多，不會過分影響生活，且價格也相對划算。對於擔心影響外觀或對隱形眼鏡有疑慮的您們來說，是很方便安全的選擇。只要定期回診追蹤，檢查近視控制效果即可，所以推薦使用 0.05% 阿托品眼藥水來控制近視。」`,
          en: `This is the second-to-last slide and one of the most scrutinized by judges. Translate your entire evaluation into language the patient and family can understand.

**Writing principles:**
1. **Use "you" not "the patient"** — conversational tone
2. **Avoid jargon** — no WMD, CI, GRADE; use everyday language
3. **Explain what you did** — "After our team's thorough search"
4. **Explain the findings** — "helps prevent myopia from worsening, with few side effects"
5. **Connect to preferences** — "For those concerned about appearance"
6. **Give a clear recommendation** — "We recommend 0.05% atropine eye drops"
7. **Provide follow-up plan** — "Just come for regular check-ups"`,
        },
      },
    ],
  },
};

export default teachingContent;
