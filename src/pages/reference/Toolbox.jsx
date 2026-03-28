import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../App';
import Hamster from '../../components/Hamster';

export default function Toolbox() {
  const { lang } = useLang();

  const tools = [
    {
      icon: "📊",
      title: { zh: "Core GRADE 快速指南", en: "Core GRADE Quick Guide" },
      desc: { zh: "五面向評估流程圖解 + 互動數線圖 + 白話語言對照表（BMJ 2025）", en: "5-domain assessment with visual guides, interactive number lines & plain language tables (BMJ 2025)" },
      status: "ready",
      to: "/toolbox/core-grade",
    },
    {
      icon: "⚖️",
      title: { zh: "CASP-SR 評讀清單", en: "CASP-SR Checklist" },
      desc: { zh: "13 題逐題指導 + 評分標準 + 常見錯誤 + Kappa 判讀", en: "13-question guide with scoring criteria, pitfalls & Kappa interpretation" },
      status: "ready",
      to: "/toolbox/casp-sr",
    },
    { icon: "📋", title: { zh: "PICOT 工作表", en: "PICOT Worksheet" }, desc: { zh: "結構化表單，引導你建立完整的 PICOT", en: "Structured form to guide complete PICOT formulation" }, status: "soon" },
    { icon: "🔍", title: { zh: "PubMed 搜尋策略模板", en: "PubMed Search Template" }, desc: { zh: "填空式 Boolean 搜尋建立器", en: "Fill-in-the-blank Boolean search builder" }, status: "soon" },
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
        {tools.map(({ icon, title, desc, status, to }) => {
          const content = (
            <>
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{title[lang]}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{desc[lang]}</p>
              {status === "soon" && (
                <span className="inline-block mt-3 px-2 py-0.5 bg-amber-50 text-amber-500 rounded text-xs font-medium">
                  {lang === "zh" ? "即將上線" : "Coming soon"}
                </span>
              )}
              {status === "ready" && (
                <span className="inline-block mt-3 px-2 py-0.5 bg-teal-50 text-teal-600 rounded text-xs font-medium">
                  {lang === "zh" ? "✅ 已上線" : "✅ Available"}
                </span>
              )}
            </>
          );

          if (to) {
            return (
              <Link
                key={title.en}
                to={to}
                className="block bg-white rounded-xl border border-gray-100 p-5 card-hover hover:border-teal-200 transition-colors"
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={title.en} className="bg-white rounded-xl border border-gray-100 p-5 card-hover">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
