import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../App';
import Hamster from '../../components/Hamster';

export default function Toolbox() {
  const { lang } = useLang();

  const tools = [
    { icon: "📋", to: "/toolbox/picot", phase: "Ask", title: { zh: "PICOT 工作表", en: "PICOT Worksheet" }, desc: { zh: "五要素深度解析 + 四種問題類型 + 選擇策略 + 品質檢核清單", en: "5-element deep dive + 4 question types + selection strategy + quality checklist" } },
    { icon: "🔍", to: "/toolbox/pubmed-search", phase: "Acquire", title: { zh: "PubMed 搜尋策略模板", en: "PubMed Search Template" }, desc: { zh: "從 PICOT 到 Boolean 三步驟 + 三大資料庫 + Boolean 運算符速查", en: "PICOT to Boolean in 3 steps + 3 databases + Boolean operators quick reference" } },
    { icon: "🔄", to: "/toolbox/sra", phase: "Acquire", title: { zh: "SRA 關鍵字轉換指引", en: "SRA Keyword Conversion Guide" }, desc: { zh: "Polyglot Search Translator 操作流程 + 跨資料庫語法對照表", en: "Polyglot Search Translator workflow + cross-database syntax map" } },
    { icon: "🤖", to: "/toolbox/litsuggest", phase: "Acquire", title: { zh: "LitSuggest 篩選指引", en: "LitSuggest Screening Guide" }, desc: { zh: "NCBI 機器學習文獻篩選 + 操作流程 + 競賽應用範例（793→391篇）", en: "NCBI ML screening + workflow + competition example (793→391 articles)" } },
    { icon: "⚖️", to: "/toolbox/casp-sr", phase: "Appraise", title: { zh: "CASP-SR 評讀清單", en: "CASP-SR Checklist" }, desc: { zh: "13 題逐題指導 + 評分標準 + 常見錯誤 + Kappa 判讀", en: "13-question guide with scoring criteria, pitfalls & Kappa interpretation" } },
    { icon: "📊", to: "/toolbox/core-grade", phase: "Appraise", title: { zh: "Core GRADE 快速指南", en: "Core GRADE Quick Guide" }, desc: { zh: "五面向評估流程圖解 + 互動數線圖 + 白話語言對照表", en: "5-domain assessment with visual guides, interactive number lines & plain language tables" } },
    { icon: "🎯", to: "/toolbox/mid", phase: "Appraise", title: { zh: "MID 訂定指引", en: "MID Determination Guide" }, desc: { zh: "四種訂定方法 + 可信度評估五準則 + 在 GRADE 中的三個角色 + 實戰範例", en: "4 methods + 5 credibility criteria + 3 roles in GRADE + worked example" } },
    { icon: "📝", to: "/toolbox/etd", phase: "Apply", title: { zh: "證據到建議框架", en: "Evidence-to-Decision Framework" }, desc: { zh: "七大考量因素 + 推薦強度判定 + MID 與價值偏好 + 推薦呈現方式", en: "7 factors + strength determination + MID & values + presentation format" } },
  ];

  const phaseColors = {
    Ask: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
    Acquire: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
    Appraise: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
    Apply: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Hamster mood="neutral" size={48} />
        <div>
          <h1 className="font-display font-bold text-3xl text-teal-700">
            {lang === "zh" ? "🧰 工具箱" : "🧰 Toolbox"}
          </h1>
          <p className="text-gray-400 mt-1">
            {lang === "zh" ? "依 5A 流程排列 — 模板、清單、指南" : "Ordered by 5A workflow — templates, checklists, guides"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {tools.map(({ icon, title, desc, to, phase }) => {
          const c = phaseColors[phase];
          return (
            <Link key={title.en} to={to}
              className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:border-teal-200 hover:shadow-sm transition-all">
              <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold text-gray-800 text-sm">{title[lang]}</h3>
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>{phase}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{desc[lang]}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
