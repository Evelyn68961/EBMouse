const translations = {
  // App-level
  appName: { zh: "EBMouse", en: "EBMouse" },
  appSubtitle: { zh: "EBM 鼠出任務", en: "Your EBM Mission" },
  appTagline: { zh: "你的實證醫學小幫手", en: "Your EBM Learning Companion" },

  // Navigation
  navHome: { zh: "首頁", en: "Home" },
  navWorkflow: { zh: "開始任務", en: "Start Mission" },
  navRoadmap: { zh: "流程指南", en: "Roadmap" },
  navCases: { zh: "案例庫", en: "Cases" },
  navToolbox: { zh: "工具箱", en: "Toolbox" },
  navAbout: { zh: "關於", en: "About" },

  // Home page
  homeWelcome: { zh: "歡迎來到 EBMouse！", en: "Welcome to EBMouse!" },
  homeDesc: {
    zh: "跟著小倉鼠一步步學習實證醫學，從臨床情境出發，最終產出競賽簡報。",
    en: "Follow the hamster step by step to learn EBM — start from a clinical scenario, end with a competition-ready presentation."
  },
  homeNewProject: { zh: "🚀 開始新任務", en: "🚀 Start New Mission" },
  homeResumeProject: { zh: "📂 繼續任務", en: "📂 Resume Mission" },
  homeImportProject: { zh: "📥 匯入任務", en: "📥 Import Mission" },
  homeNoProjects: { zh: "還沒有任務呢！開始你的第一個任務吧！", en: "No missions yet! Start your first one!" },
  homeRecentProjects: { zh: "最近的任務", en: "Recent Missions" },

  // Project management
  projectTitle: { zh: "任務名稱", en: "Mission Title" },
  projectCreated: { zh: "建立於", en: "Created" },
  projectUpdated: { zh: "更新於", en: "Updated" },
  projectPhase: { zh: "目前階段", en: "Current Phase" },
  projectExport: { zh: "匯出", en: "Export" },
  projectDelete: { zh: "刪除", en: "Delete" },
  projectDeleteConfirm: { zh: "確定要刪除這個任務嗎？", en: "Delete this mission?" },

  // Phase names
  phase1: { zh: "評估案例", en: "Assess" },
  phase2: { zh: "形成問題", en: "Ask" },
  phase3: { zh: "文獻檢索", en: "Acquire" },
  phase4: { zh: "文獻評讀", en: "Appraise" },
  phase5: { zh: "臨床應用", en: "Apply" },

  // Phase subtitles
  phase1Sub: { zh: "分析臨床情境與背景知識", en: "Analyze clinical scenario & background" },
  phase2Sub: { zh: "建立 PICOT 臨床問題", en: "Formulate PICOT questions" },
  phase3Sub: { zh: "搜尋與篩選文獻", en: "Search & screen literature" },
  phase4Sub: { zh: "CASP 評讀 + GRADE 評估", en: "CASP appraisal + GRADE assessment" },
  phase5Sub: { zh: "從證據到臨床建議", en: "From evidence to recommendation" },

  // Workflow
  workflowPreview: { zh: "預覽簡報", en: "Preview Slides" },
  workflowExport: { zh: "匯出成果", en: "Export Results" },
  workflowNext: { zh: "下一步", en: "Next" },
  workflowPrev: { zh: "上一步", en: "Back" },
  workflowSaved: { zh: "已自動儲存", en: "Auto-saved" },

  // Phase 1: Assess
  assessScenario: { zh: "臨床情境", en: "Clinical Scenario" },
  assessScenarioHint: { zh: "貼上或輸入競賽提供的臨床情境描述。", en: "Paste or enter the clinical scenario from the competition." },
  assessPatientAge: { zh: "年齡", en: "Age" },
  assessPatientSex: { zh: "性別", en: "Sex" },
  assessPatientCondition: { zh: "疾病/狀況", en: "Condition" },
  assessPatientSetting: { zh: "場域", en: "Setting" },
  assessPreferences: { zh: "病人/家屬偏好", en: "Patient/Family Preferences" },
  assessPreferencesHint: { zh: "病人或家屬對治療方式有什麼偏好或顧慮？", en: "What preferences or concerns do the patient/family have about treatment?" },
  assessDisease: { zh: "疾病簡介", en: "Disease Overview" },
  assessRisk: { zh: "風險族群", en: "Risk Factors" },
  assessTreatment: { zh: "治療方式", en: "Treatment Options" },
  assessSources: { zh: "參考來源", en: "Sources" },
  assessSourcesHint: { zh: "例如：UpToDate、DynaMed、臨床指引等。", en: "e.g., UpToDate, DynaMed, clinical guidelines." },

  // Phase 2: Ask
  askPicotTitle: { zh: "PICOT 問題", en: "PICOT Question" },
  askP: { zh: "P — 病人/族群", en: "P — Patient/Population" },
  askI: { zh: "I — 介入措施", en: "I — Intervention" },
  askC: { zh: "C — 對照組", en: "C — Comparison" },
  askO: { zh: "O — 結果指標", en: "O — Outcome" },
  askT: { zh: "T — 時間", en: "T — Time" },
  askType: { zh: "問題類型", en: "Question Type" },
  askTypeTreatment: { zh: "治療/預防型", en: "Treatment/Prevention" },
  askTypeDiagnosis: { zh: "診斷型", en: "Diagnosis" },
  askTypePrognosis: { zh: "預後型", en: "Prognosis" },
  askTypeHarm: { zh: "傷害/病因型", en: "Harm/Etiology" },
  askPrimary: { zh: "設為主要 PICOT", en: "Set as Primary PICOT" },
  askJustification: { zh: "選擇此 PICOT 的原因", en: "Rationale for choosing this PICOT" },
  askAddPicot: { zh: "＋ 新增 PICOT", en: "＋ Add PICOT" },
  askAiFeedback: { zh: "🤖 AI 回饋", en: "🤖 AI Feedback" },

  // Hint system
  hintToggle: { zh: "💡 提示", en: "💡 Hint" },
  hintCollapse: { zh: "收起", en: "Collapse" },

  // Export
  exportPptx: { zh: "下載競賽簡報 (.pptx)", en: "Download Competition Slides (.pptx)" },
  exportSummary: { zh: "下載臨床摘要", en: "Download Clinical Summary" },
  exportGrade: { zh: "下載 GRADE 證據表", en: "Download GRADE Evidence Table" },

  // Hamster messages
  hamsterWelcome: { zh: "嗨！我是小鼠，準備好出任務了嗎？", en: "Hi! I'm EBMouse — ready for a mission?" },
  hamsterPhase1Start: { zh: "先來了解我們的病人吧！", en: "Let's get to know our patient first!" },
  hamsterPhase2Start: { zh: "好問題是好答案的一半！", en: "A good question is half the answer!" },
  hamsterPhase3Start: { zh: "來去找文獻吧～", en: "Let's go find some evidence!" },
  hamsterPhase4Start: { zh: "最關鍵的一步——仔細評讀！", en: "The crucial step — careful appraisal!" },
  hamsterPhase5Start: { zh: "把證據帶回臨床！", en: "Bring the evidence back to the clinic!" },
  hamsterComplete: { zh: "太棒了！任務完成！🎉", en: "Amazing! Mission complete! 🎉" },
  hamsterEmpty: { zh: "開始你的任務吧！", en: "Start your mission!" },
};

export function t(key, lang = "zh") {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] || entry.zh || key;
}

export default translations;
