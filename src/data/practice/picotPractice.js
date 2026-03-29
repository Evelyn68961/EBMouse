// src/data/practice/picotPractice.js
// PICOT Worksheet — 9 practice questions (3 MC + 3 fill-blank + 3 error-spot)

const picotPractice = [

    // ─── MC-1: Atropine for Myopia (Case 1) ───
    {
      id: "picot-mc-1",
      format: "mc",
      source: "case1",
      scenario: {
        zh: "小六女童（12歲）因上課看不清楚黑板就診，醫師診斷為軸性近視（約 -3.00D）。女童不太想戴眼鏡，因為會影響日常穿搭。母親擔心度數加深，希望了解配鏡以外的治療方式。醫師提到可考慮低濃度 atropine 眼藥水延緩近視進展。",
        en: "A 12-year-old girl (6th grade) can't see the blackboard clearly. Diagnosed with axial myopia (~-3.00D). She prefers not to wear glasses as they affect her outfits. Her mother worries about progression and asks about alternatives to corrective lenses. The doctor mentions low-dose atropine eye drops to slow myopia progression.",
      },
      prompt: {
        zh: "以下哪組 PICOT 最適合此情境？",
        en: "Which PICOT best fits this scenario?",
      },
      correctIndex: 0,
      options: [
        {
          picot: {
            p: { zh: "患有軸性近視（~-3.00D）且不想戴眼鏡的 12 歲女童", en: "12-year-old girl with axial myopia (~-3.00D) who prefers not to wear glasses" },
            i: { zh: "每晚兩眼各點一滴低濃度 atropine 眼藥水", en: "Nightly one drop of low-dose atropine eye drops in each eye" },
            c: { zh: "不使用 atropine（安慰劑或不治療）", en: "No atropine (placebo or no treatment)" },
            o: { zh: "SE 變化、AL 變化、不良反應", en: "Change in SE, change in AL, adverse events" },
            t: { zh: "12 個月", en: "12 months" },
          },
          explanation: {
            zh: "✓ P 包含偏好限制，I 有完整用法，O 同時有效益和安全指標",
            en: "✓ P includes preference constraint, I has full regimen, O covers both efficacy and safety",
          },
        },
        {
          picot: {
            p: { zh: "近視病人", en: "Myopia patients" },
            i: { zh: "Atropine", en: "Atropine" },
            c: { zh: "安慰劑", en: "Placebo" },
            o: { zh: "SE 變化、AL 變化、不良反應", en: "Change in SE, AL, adverse events" },
            t: { zh: "12 個月", en: "12 months" },
          },
          explanation: {
            zh: "✗ P 太模糊（「近視病人」缺少年齡、嚴重度、偏好），I 缺少劑量途徑頻率",
            en: "✗ P too vague (missing age, severity, preferences), I lacks dose/route/frequency",
          },
        },
        {
          picot: {
            p: { zh: "患有軸性近視的 12 歲女童", en: "12-year-old girl with axial myopia" },
            i: { zh: "低濃度 atropine 眼藥水", en: "Low-dose atropine eye drops" },
            c: { zh: "配戴一般眼鏡", en: "Wearing regular glasses" },
            o: { zh: "SE 變化", en: "Change in SE" },
            t: { zh: "12 個月", en: "12 months" },
          },
          explanation: {
            zh: "✗ C 用「配戴眼鏡」——情境問的是眼藥水的效果，不是眼藥水 vs. 眼鏡",
            en: "✗ C is 'wearing glasses' — the scenario asks about eye drop efficacy, not drops vs. glasses",
          },
        },
        {
          picot: {
            p: { zh: "患有軸性近視且不想戴眼鏡的 12 歲女童", en: "12-year-old girl with axial myopia who prefers not to wear glasses" },
            i: { zh: "每晚點一滴 atropine", en: "Nightly one drop of atropine" },
            c: { zh: "不使用 atropine", en: "No atropine" },
            o: { zh: "瞳孔直徑變化", en: "Change in pupil diameter" },
            t: { zh: "6 個月", en: "6 months" },
          },
          explanation: {
            zh: "✗ O 用「瞳孔直徑」——這是副作用指標，不是評估近視進展的主要結果",
            en: "✗ O is 'pupil diameter' — a side-effect marker, not the primary outcome for myopia progression",
          },
        },
      ],
    },

    // ─── MC-2: SGLT-2i for DKD (New) ───
    {
      id: "picot-mc-2",
      format: "mc",
      source: "new",
      scenario: {
        zh: "62 歲男性，第二型糖尿病 15 年，目前使用 metformin + glimepiride（HbA1c 7.8%）。最近發現 eGFR 42 mL/min/1.73m²，UACR 350 mg/g，診斷為糖尿病腎病變第三期。腎臟科醫師建議加上 SGLT-2 抑制劑保護腎功能。病人擔心多加一種藥的副作用。",
        en: "A 62-year-old man with 15-year T2DM history, on metformin + glimepiride (HbA1c 7.8%). Labs show eGFR 42, UACR 350 — diagnosed as stage 3 DKD. The nephrologist recommends adding an SGLT-2 inhibitor for renal protection. The patient worries about side effects from adding another drug.",
      },
      prompt: {
        zh: "以下哪組 PICOT 最適合此情境？",
        en: "Which PICOT best fits this scenario?",
      },
      correctIndex: 1,
      options: [
        {
          picot: {
            p: { zh: "T2DM 合併 DKD 第三期的 62 歲男性", en: "62-year-old man with T2DM and stage 3 DKD" },
            i: { zh: "SGLT-2 抑制劑", en: "SGLT-2 inhibitor" },
            c: { zh: "Metformin", en: "Metformin" },
            o: { zh: "eGFR 下降速率", en: "Rate of eGFR decline" },
            t: { zh: "24 個月", en: "24 months" },
          },
          explanation: {
            zh: "✗ C 用 metformin——metformin 是兩組共同的基礎治療，不是對照",
            en: "✗ C is metformin — that's baseline therapy for both groups, not the comparator",
          },
        },
        {
          picot: {
            p: { zh: "T2DM 合併第三期腎病變（eGFR 42, UACR 350）、已接受降血糖治療的 62 歲男性", en: "62-year-old man with T2DM and stage 3 DKD (eGFR 42, UACR 350), on glucose-lowering therapy" },
            i: { zh: "標準治療 + SGLT-2 抑制劑", en: "Standard therapy + SGLT-2 inhibitor" },
            c: { zh: "標準治療 + 安慰劑", en: "Standard therapy + placebo" },
            o: { zh: "eGFR 下降速率、進展至 ESKD、心血管事件、不良反應（UTI、DKA）", en: "Rate of eGFR decline, progression to ESKD, CV events, AEs (UTI, DKA)" },
            t: { zh: "24–36 個月", en: "24–36 months" },
          },
          explanation: {
            zh: "✓ P 有完整分期資訊，I/C 是 add-on 設計，O 涵蓋腎臟 + 心血管 + 安全性，T 夠長",
            en: "✓ P includes full staging, I/C is add-on design, O covers renal + CV + safety, T is adequate",
          },
        },
        {
          picot: {
            p: { zh: "T2DM 合併 DKD 的 62 歲男性", en: "62-year-old man with T2DM and DKD" },
            i: { zh: "標準治療 + SGLT-2 抑制劑", en: "Standard therapy + SGLT-2 inhibitor" },
            c: { zh: "標準治療 + 安慰劑", en: "Standard therapy + placebo" },
            o: { zh: "HbA1c 變化", en: "Change in HbA1c" },
            t: { zh: "3 個月", en: "3 months" },
          },
          explanation: {
            zh: "✗ O 只有 HbA1c——臨床問題是腎臟保護，不是血糖控制；T 只有 3 個月太短",
            en: "✗ O is only HbA1c — the question is renal protection, not glycemic control; T of 3 months is too short",
          },
        },
        {
          picot: {
            p: { zh: "糖尿病病人", en: "Diabetic patients" },
            i: { zh: "標準治療 + SGLT-2 抑制劑", en: "Standard therapy + SGLT-2 inhibitor" },
            c: { zh: "標準治療 + 安慰劑", en: "Standard therapy + placebo" },
            o: { zh: "eGFR 下降速率、ESKD", en: "Rate of eGFR decline, ESKD" },
            t: { zh: "6 個月", en: "6 months" },
          },
          explanation: {
            zh: "✗ P 只寫「糖尿病病人」缺少 CKD 分期；T 6 個月不足以觀察腎功能保護效果",
            en: "✗ P is just 'diabetic patients' without CKD staging; T of 6 months can't capture renal protection",
          },
        },
      ],
    },

    // ─── MC-3: DOAC vs. Warfarin for AF (New) ───
    {
      id: "picot-mc-3",
      format: "mc",
      source: "new",
      scenario: {
        zh: "72 歲女性，非瓣膜性心房顫動，CHA₂DS₂-VASc 5 分。目前用 warfarin 但 INR 控制差（TTR 48%），已有兩次因 INR 過高跑急診。病人覺得每月抽血監測 INR 很不方便，想知道有沒有不需要頻繁監測的替代藥物。",
        en: "A 72-year-old woman with nonvalvular AF, CHA₂DS₂-VASc score of 5. On warfarin but INR poorly controlled (TTR 48%), two ER visits for supratherapeutic INR. She finds monthly INR monitoring inconvenient and asks about alternatives that don't require frequent monitoring.",
      },
      prompt: {
        zh: "以下哪組 PICOT 最適合此情境？",
        en: "Which PICOT best fits this scenario?",
      },
      correctIndex: 2,
      options: [
        {
          picot: {
            p: { zh: "非瓣膜性 AF、CHA₂DS₂-VASc ≥ 2 的 72 歲女性", en: "72-year-old woman with nonvalvular AF, CHA₂DS₂-VASc ≥ 2" },
            i: { zh: "DOAC", en: "DOAC" },
            c: { zh: "安慰劑", en: "Placebo" },
            o: { zh: "缺血性中風、大出血", en: "Ischemic stroke, major bleeding" },
            t: { zh: "12 個月", en: "12 months" },
          },
          explanation: {
            zh: "✗ C 用安慰劑——CHA₂DS₂-VASc 5 分不能不抗凝，不合倫理",
            en: "✗ C is placebo — unethical for CHA₂DS₂-VASc 5; patient must be anticoagulated",
          },
        },
        {
          picot: {
            p: { zh: "心房顫動的 72 歲女性", en: "72-year-old woman with AF" },
            i: { zh: "DOAC", en: "DOAC" },
            c: { zh: "Warfarin (INR 2.0–3.0)", en: "Warfarin (INR 2.0–3.0)" },
            o: { zh: "INR 穩定性、TTR 改善", en: "INR stability, TTR improvement" },
            t: { zh: "12 個月", en: "12 months" },
          },
          explanation: {
            zh: "✗ O 用 INR 穩定性——這是過程指標，不是臨床結果；P 缺少「非瓣膜性」限定",
            en: "✗ O is INR stability — a process measure, not clinical outcome; P missing 'nonvalvular'",
          },
        },
        {
          picot: {
            p: { zh: "非瓣膜性 AF、CHA₂DS₂-VASc ≥ 2、warfarin 控制不佳的 72 歲高中風風險女性", en: "72-year-old high-stroke-risk woman with nonvalvular AF (CHA₂DS₂-VASc ≥ 2), poorly controlled on warfarin" },
            i: { zh: "DOAC（如 dabigatran、rivaroxaban、apixaban、edoxaban）", en: "DOAC (e.g., dabigatran, rivaroxaban, apixaban, edoxaban)" },
            c: { zh: "Warfarin（劑量調整至 INR 2.0–3.0）", en: "Warfarin (dose-adjusted to INR 2.0–3.0)" },
            o: { zh: "缺血性中風/全身性栓塞、大出血、全因死亡率", en: "Ischemic stroke/systemic embolism, major bleeding, all-cause mortality" },
            t: { zh: "12–24 個月", en: "12–24 months" },
          },
          explanation: {
            zh: "✓ P 含「非瓣膜性」和風險分層，C 是活性對照（高風險 AF 不能不抗凝），O 涵蓋效益 + 安全",
            en: "✓ P includes 'nonvalvular' and risk stratification, C is active comparator, O covers efficacy + safety",
          },
        },
        {
          picot: {
            p: { zh: "非瓣膜性 AF 的 72 歲女性", en: "72-year-old woman with nonvalvular AF" },
            i: { zh: "DOAC", en: "DOAC" },
            c: { zh: "Warfarin", en: "Warfarin" },
            o: { zh: "大出血發生率", en: "Major bleeding incidence" },
            t: { zh: "12 個月", en: "12 months" },
          },
          explanation: {
            zh: "✗ O 只有出血沒有效益指標（中風預防）；問題類型應為治療型而非傷害型",
            en: "✗ O only has bleeding without efficacy (stroke prevention); question type should be Treatment, not Harm",
          },
        },
      ],
    },

    // ─── FILL-1: IV Iron for HF + IDA (Case 3) — blank C and T ───
    {
      id: "picot-fill-1",
      format: "fill",
      source: "case3",
      scenario: {
        zh: "55 歲女性，HFrEF (LVEF 30%) 合併缺鐵性貧血 (Hb 9.8, ferritin 45, TSAT 15%)。已接受標準心衰竭藥物治療但仍疲倦、運動耐受力差。心臟科醫師考慮加上 IV iron。",
        en: "A 55-year-old woman with HFrEF (LVEF 30%) and IDA (Hb 9.8, ferritin 45, TSAT 15%). On standard HF therapy but still fatigued with poor exercise tolerance. Cardiologist considers adding IV iron.",
      },
      prompt: {
        zh: "以下 PICOT 有兩個空格，請選出正確答案。",
        en: "This PICOT has two blanks. Select the correct answers.",
      },
      prefilled: {
        p: { zh: "HFrEF 合併 IDA、已接受標準心衰竭治療的 55 歲女性", en: "55-year-old woman with HFrEF and IDA, on standard HF therapy" },
        i: { zh: "標準心衰竭治療 + IV iron", en: "Standard HF therapy + IV iron" },
        o: { zh: "心衰竭住院率、全因死亡率、6 分鐘步行距離", en: "HF hospitalization, all-cause mortality, 6-min walk distance" },
      },
      blanks: [
        {
          element: "c",
          correctIndex: 1,
          options: [
            { zh: "口服鐵劑 (oral iron)", en: "Oral iron" },
            { zh: "標準治療 + 安慰劑", en: "Standard therapy + placebo" },
            { zh: "不治療 (no treatment)", en: "No treatment" },
            { zh: "標準治療 + 紅血球生成素 (EPO)", en: "Standard therapy + EPO" },
          ],
          explanations: [
            { zh: "合理的替代 PICOT，但本情境問的是「要不要加 IV iron」，對照應是安慰劑", en: "A valid alternative PICOT, but this scenario asks 'should we add IV iron?' — comparator is placebo" },
            { zh: "✓ 正確！add-on 設計，差別只在 IV iron vs. 安慰劑", en: "✓ Correct! Add-on design — the only difference is IV iron vs. placebo" },
            { zh: "不合倫理——病人已在接受標準心衰竭治療", en: "Unethical — patient is already on standard HF therapy" },
            { zh: "EPO 機轉不同，不是此情境的比較", en: "EPO has a different mechanism; not the comparison in this scenario" },
          ],
        },
        {
          element: "t",
          correctIndex: 2,
          options: [
            { zh: "4 週", en: "4 weeks" },
            { zh: "3 個月", en: "3 months" },
            { zh: "12 個月", en: "12 months" },
            { zh: "5 年", en: "5 years" },
          ],
          explanations: [
            { zh: "太短，無法觀察住院和死亡率差異", en: "Too short to observe hospitalization and mortality differences" },
            { zh: "仍太短，主要 IV iron 試驗追蹤至少 6–12 個月", en: "Still too short; major IV iron trials follow up ≥ 6–12 months" },
            { zh: "✓ 正確！12 個月是心衰竭 RCT 最常見的追蹤期", en: "✓ Correct! 12 months is the most common follow-up in HF RCTs" },
            { zh: "超出多數 IV iron RCT 追蹤範圍", en: "Exceeds follow-up duration of most IV iron RCTs" },
          ],
        },
      ],
    },

    // ─── FILL-2: CPM for Post-TKA (Case 2) — blank P and O ───
    {
      id: "picot-fill-2",
      format: "fill",
      source: "case2",
      scenario: {
        zh: "68 歲男性，嚴重退化性膝關節炎，接受 TKA。術後擔心膝關節僵硬。復健科醫師考慮在標準物理治療外加上 CPM。",
        en: "A 68-year-old man with severe degenerative OA undergoes TKA. Post-op, he worries about knee stiffness. The rehab physician considers adding CPM to standard physiotherapy.",
      },
      prompt: {
        zh: "以下 PICOT 有兩個空格，請選出正確答案。",
        en: "This PICOT has two blanks. Select the correct answers.",
      },
      prefilled: {
        i: { zh: "標準物理治療 + CPM", en: "Standard physiotherapy + CPM" },
        c: { zh: "僅標準物理治療", en: "Standard physiotherapy alone" },
        t: { zh: "6 週", en: "6 weeks" },
      },
      blanks: [
        {
          element: "p",
          correctIndex: 0,
          options: [
            { zh: "接受 TKA 術後的 68 歲退化性膝關節炎男性", en: "68-year-old man with degenerative OA, post-TKA" },
            { zh: "膝關節疼痛的老年病人", en: "Elderly patients with knee pain" },
            { zh: "接受膝關節手術的病人", en: "Patients who underwent knee surgery" },
            { zh: "68 歲男性", en: "68-year-old man" },
          ],
          explanations: [
            { zh: "✓ 正確！包含年齡、疾病名、手術類型", en: "✓ Correct! Includes age, disease name, surgery type" },
            { zh: "太模糊，缺少具體手術類型和疾病名", en: "Too vague, missing specific surgery and diagnosis" },
            { zh: "「膝關節手術」太籠統（TKA ≠ 關節鏡），缺少年齡、疾病名", en: "'Knee surgery' too broad (TKA ≠ arthroscopy), missing age, diagnosis" },
            { zh: "完全沒有疾病和手術資訊", en: "No disease or surgery information at all" },
          ],
        },
        {
          element: "o",
          correctIndex: 2,
          options: [
            { zh: "關節置換成功率、手術併發症", en: "Joint replacement success rate, surgical complications" },
            { zh: "住院天數", en: "Length of hospital stay" },
            { zh: "膝關節活動度 (ROM)、疼痛評分、功能恢復", en: "Knee ROM, pain scores, functional recovery" },
            { zh: "X 光下關節間隙寬度", en: "Radiological joint space width" },
          ],
          explanations: [
            { zh: "CPM 不影響手術本身的成功率，CPM 是術後復健介入", en: "CPM doesn't affect surgical success — it's a post-op rehab intervention" },
            { zh: "可能相關但不是 CPM 的主要評估目標", en: "Possibly relevant but not the primary target of CPM evaluation" },
            { zh: "✓ 正確！ROM 直接呼應病人對「僵硬」的擔憂", en: "✓ Correct! ROM directly addresses the patient's concern about stiffness" },
            { zh: "影像學指標，不是 CPM 介入的功能性結果", en: "Radiological measure, not a functional outcome for CPM" },
          ],
        },
      ],
    },

    // ─── FILL-3: PPI for GERD (New) — blank I and T ───
    {
      id: "picot-fill-3",
      format: "fill",
      source: "new",
      scenario: {
        zh: "45 歲女性，反覆胃食道逆流 (GERD) 症狀已 6 個月（胸口灼熱、逆流）。飲食調整和制酸劑效果不佳。消化內科醫師建議使用質子幫浦抑制劑 (PPI)。病人擔心長期使用 PPI 的副作用。",
        en: "A 45-year-old woman with recurrent GERD symptoms (heartburn, regurgitation) for 6 months. Dietary modifications and antacids ineffective. GI specialist recommends a PPI. Patient concerned about long-term PPI side effects.",
      },
      prompt: {
        zh: "以下 PICOT 有兩個空格，請選出正確答案。",
        en: "This PICOT has two blanks. Select the correct answers.",
      },
      prefilled: {
        p: { zh: "反覆 GERD 症狀 6 個月、飲食調整及制酸劑無效的 45 歲女性", en: "45-year-old woman with 6-month GERD symptoms, failed dietary mods and antacids" },
        c: { zh: "安慰劑或 H2 受體拮抗劑 (H2RA)", en: "Placebo or H2 receptor antagonist (H2RA)" },
        o: { zh: "GERD 症狀緩解率、逆流頻率、不良反應", en: "GERD symptom relief rate, reflux frequency, adverse events" },
      },
      blanks: [
        {
          element: "i",
          correctIndex: 1,
          options: [
            { zh: "質子幫浦抑制劑 (PPI)", en: "Proton pump inhibitor (PPI)" },
            { zh: "標準劑量 PPI（如 omeprazole 20mg 每日一次，飯前服用）", en: "Standard-dose PPI (e.g., omeprazole 20mg once daily, before meals)" },
            { zh: "Omeprazole", en: "Omeprazole" },
            { zh: "胃藥", en: "Stomach medicine" },
          ],
          explanations: [
            { zh: "缺少劑量、頻率、用法", en: "Missing dose, frequency, timing" },
            { zh: "✓ 正確！包含藥名、劑量、頻率、用法", en: "✓ Correct! Includes drug name, dose, frequency, timing" },
            { zh: "只有藥名，缺少劑量和用法", en: "Drug name only, missing dose and regimen" },
            { zh: "太模糊，「胃藥」涵蓋多種不同藥物", en: "Too vague; 'stomach medicine' covers many different drugs" },
          ],
        },
        {
          element: "t",
          correctIndex: 1,
          options: [
            { zh: "2 週", en: "2 weeks" },
            { zh: "8 週", en: "8 weeks" },
            { zh: "12 個月", en: "12 months" },
            { zh: "5 年", en: "5 years" },
          ],
          explanations: [
            { zh: "太短，PPI 治療 GERD 通常需至少 4–8 週才能評估療效", en: "Too short; PPI therapy for GERD typically requires 4–8 weeks to assess efficacy" },
            { zh: "✓ 正確！8 週是 PPI 治療 GERD 的標準初始療程", en: "✓ Correct! 8 weeks is the standard initial PPI treatment course for GERD" },
            { zh: "合理用於長期安全性，但不是評估症狀緩解的初始追蹤", en: "Reasonable for long-term safety, but not for initial symptom relief assessment" },
            { zh: "超出初始治療評估範疇", en: "Beyond the scope of initial treatment evaluation" },
          ],
        },
      ],
    },

    // ─── ERR-1: CPM for Post-TKA variation (Case 2) — errors in I and C ───
    {
      id: "picot-err-1",
      format: "error",
      source: "case2",
      scenario: {
        zh: "68 歲男性，嚴重退化性膝關節炎，接受 TKA。術後擔心膝關節僵硬、活動度恢復慢。復健科醫師考慮加上 CPM。病人希望盡快恢復走路。",
        en: "68-year-old man with severe degenerative OA, post-TKA. Worried about stiffness and slow ROM recovery. Rehab physician considers adding CPM. Patient wants to walk again soon.",
      },
      prompt: {
        zh: "這組 PICOT 有 2 個錯誤，請點選有錯的要素。",
        en: "This PICOT has 2 errors. Click the incorrect elements.",
      },
      shownPicot: {
        p: { zh: "接受 TKA 術後的 68 歲退化性膝關節炎男性", en: "68-year-old man with degenerative OA, post-TKA" },
        i: { zh: "持續被動運動機 (CPM)", en: "Continuous passive motion (CPM)" },
        c: { zh: "不做任何復健", en: "No rehabilitation at all" },
        o: { zh: "膝關節活動度 (ROM)、疼痛評分", en: "Knee ROM, pain scores" },
        t: { zh: "6 週", en: "6 weeks" },
      },
      errorElements: ["i", "c"],
      errorExplanations: {
        i: {
          zh: "只寫「CPM」暗示 CPM 組不做物理治療。應改為「標準物理治療 + CPM」，因為這是 add-on 設計。",
          en: "Writing just 'CPM' implies the CPM group skips physiotherapy. Should be 'standard PT + CPM' — add-on design.",
        },
        c: {
          zh: "「不做任何復健」不合倫理——TKA 術後一定要做基本物理治療。正確的 C 是「僅標準物理治療」。",
          en: "'No rehabilitation' is unethical — baseline PT is always provided post-TKA. Correct C is 'standard PT alone.'",
        },
      },
    },

    // ─── ERR-2: Atropine for Myopia variation (Case 1) — errors in P and O ───
    {
      id: "picot-err-2",
      format: "error",
      source: "case1",
      scenario: {
        zh: "小六女童（12歲），軸性近視（~-3.00D），不想戴眼鏡。母親希望用眼藥水延緩近視進展。",
        en: "12-year-old girl, axial myopia (~-3.00D), prefers not to wear glasses. Mother wants eye drops to slow progression.",
      },
      prompt: {
        zh: "這組 PICOT 有 2 個錯誤，請點選有錯的要素。",
        en: "This PICOT has 2 errors. Click the incorrect elements.",
      },
      shownPicot: {
        p: { zh: "患有軸性近視的 12 歲女童", en: "12-year-old girl with axial myopia" },
        i: { zh: "每晚兩眼各點一滴低濃度 atropine 眼藥水", en: "Nightly one drop of low-dose atropine eye drops in each eye" },
        c: { zh: "不使用 atropine（安慰劑）", en: "No atropine (placebo)" },
        o: { zh: "瞳孔直徑變化、畏光發生率", en: "Change in pupil diameter, photophobia incidence" },
        t: { zh: "12 個月", en: "12 months" },
      },
      errorElements: ["p", "o"],
      errorExplanations: {
        p: {
          zh: "缺少「不想戴眼鏡」的偏好限制。病人偏好直接影響了為何選擇眼藥水而非鏡片，評審會看這個邏輯連結。",
          en: "Missing 'prefers not to wear glasses.' This preference directly justifies choosing eye drops over lenses — judges check this logic.",
        },
        o: {
          zh: "「瞳孔直徑」和「畏光」是 atropine 的副作用指標，不是近視控制的主要結果。應使用 SE 變化、AL 變化等效益指標。",
          en: "'Pupil diameter' and 'photophobia' are atropine side-effect markers, not primary outcomes for myopia control. Use SE change, AL change.",
        },
      },
    },

    // ─── ERR-3: CAP Antibiotics (New) — errors in C and O ───
    {
      id: "picot-err-3",
      format: "error",
      source: "new",
      scenario: {
        zh: "58 歲男性，有糖尿病和 COPD 病史，因發燒、咳嗽、呼吸困難至急診。胸部 X 光顯示右下肺葉浸潤，診斷為社區型肺炎 (CAP)，CURB-65 分數 2 分（中度風險）。急診醫師需決定經驗性抗生素治療方案。",
        en: "A 58-year-old man with diabetes and COPD presents to the ER with fever, cough, and dyspnea. Chest X-ray shows right lower lobe infiltrate — CAP diagnosed, CURB-65 score 2 (moderate risk). The ER physician needs to decide on empiric antibiotic therapy.",
      },
      prompt: {
        zh: "這組 PICOT 有 2 個錯誤，請點選有錯的要素。",
        en: "This PICOT has 2 errors. Click the incorrect elements.",
      },
      shownPicot: {
        p: { zh: "有糖尿病和 COPD 的 58 歲中度風險 CAP 男性", en: "58-year-old man with diabetes, COPD, and moderate-risk CAP" },
        i: { zh: "Levofloxacin 750mg IV 每日一次", en: "Levofloxacin 750mg IV once daily" },
        c: { zh: "不使用抗生素", en: "No antibiotics" },
        o: { zh: "白血球計數正常化", en: "WBC count normalization" },
        t: { zh: "7–14 天", en: "7–14 days" },
      },
      errorElements: ["c", "o"],
      errorExplanations: {
        c: {
          zh: "確診 CAP 且 CURB-65 2 分的病人不能不用抗生素，不合倫理。正確的 C 應是另一種經驗性方案，如「β-lactam + macrolide」（活性對照）。",
          en: "A confirmed CAP patient with CURB-65 of 2 must receive antibiotics — no treatment is unethical. Correct C: alternative empiric regimen, e.g., 'β-lactam + macrolide' (active comparator).",
        },
        o: {
          zh: "「白血球正常化」是實驗室中間指標，不是臨床結果。應使用臨床治癒率、死亡率、住院天數等病人導向結果。",
          en: "'WBC normalization' is a lab surrogate, not a clinical outcome. Should use clinical cure rate, mortality, length of stay — patient-oriented outcomes.",
        },
      },
    },
  ];

export default picotPractice;
