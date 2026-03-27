import React from 'react';
import { useLang } from '../../App';
import Hamster from '../../components/Hamster';

export default function Toolbox() {
  const { lang } = useLang();

  const tools = [
    { icon: "📋", title: { zh: "PICOT 工作表", en: "PICOT Worksheet" }, desc: { zh: "結構化表單，引導你建立完整的 PICOT", en: "Structured form to guide complete PICOT formulation" }, status: "soon" },
    { icon: "🔍", title: { zh: "PubMed 搜尋策略模板", en: "PubMed Search Template" }, desc: { zh: "填空式 Boolean 搜尋建立器", en: "Fill-in-the-blank Boolean search builder" }, status: "soon" },
    { icon: "⚖️", title: { zh: "CASP-SR 評讀清單", en: "CASP-SR Checklist" }, desc: { zh: "雙語列印版 CASP 系統性回顧評讀清單", en: "Bilingual printable CASP SR appraisal checklist" }, status: "soon" },
    { icon: "📊", title: { zh: "GRADE 評分表", en: "GRADE Scoring Sheet" }, desc: { zh: "五面向評估表含數線圖指引", en: "5-domain scoring with number-line guidance" }, status: "soon" },
    { icon: "🎯", title: { zh: "MID 訂定指引", en: "MID Determination Guide" }, desc: { zh: "四種方法：文獻、專家、病人、基準研究", en: "4 methods: literature, expert, patient, benchmark" }, status: "soon" },
    { icon: "📝", title: { zh: "證據到建議框架", en: "Evidence-to-Decision Template" }, desc: { zh: "Based on BMJ 2025 Core GRADE Paper 7", en: "Based on BMJ 2025 Core GRADE Paper 7" }, status: "soon" },
    { icon: "🔄", title: { zh: "SRA 關鍵字轉換指引", en: "SRA Keyword Conversion Guide" }, desc: { zh: "PubMed → Cochrane/Embase 關鍵字自動轉換", en: "PubMed → Cochrane/Embase keyword auto-conversion" }, status: "soon" },
    { icon: "🤖", title: { zh: "LitSuggest 篩選指引", en: "LitSuggest Screening Guide" }, desc: { zh: "機器學習輔助文獻篩選工作流程", en: "ML-assisted literature screening workflow" }, status: "soon" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Hamster mood="neutral" size={48} />
        <div>
          <h1 className="font-display font-bold text-3xl text-teal-700">
            {lang === "zh" ? "🧰 工具箱" : "🧰 Toolbox"}
          </h1>
          <p className="text-gray-400 mt-1">
            {lang === "zh" ? "模板、清單、指南 — 隨時取用" : "Templates, checklists, guides — grab and go"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map(({ icon, title, desc, status }) => (
          <div key={title.en} className="bg-white rounded-xl border border-gray-100 p-5 card-hover">
            <div className="text-2xl mb-2">{icon}</div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">{title[lang]}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{desc[lang]}</p>
            {status === "soon" && (
              <span className="inline-block mt-3 px-2 py-0.5 bg-amber-50 text-amber-500 rounded text-xs font-medium">
                {lang === "zh" ? "即將上線" : "Coming soon"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
