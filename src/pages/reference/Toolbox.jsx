import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../App';
import Hamster from '../../components/Hamster';

export default function Toolbox() {
  const { lang } = useLang();

  const tools = [
    { icon: "📊", to: "/toolbox/core-grade", title: { zh: "Core GRADE 快速指南", en: "Core GRADE Quick Guide" }, desc: { zh: "五面向評估流程圖解 + 互動數線圖 + 白話語言對照表", en: "5-domain assessment with visual guides, interactive number lines & plain language tables" } },
    { icon: "⚖️", to: "/toolbox/casp-sr", title: { zh: "CASP-SR 評讀清單", en: "CASP-SR Checklist" }, desc: { zh: "13 題逐題指導 + 評分標準 + 常見錯誤 + Kappa 判讀", en: "13-question guide with scoring criteria, pitfalls & Kappa interpretation" } },
    { icon: "📝", to: "/toolbox/etd", title: { zh: "證據到建議框架", en: "Evidence-to-Decision Framework" }, desc: { zh: "七大考量因素 + 推薦強度判定 + MID 與價值偏好 + 推薦呈現方式", en: "7 factors + strength determination + MID & values + presentation format" } },
    { icon: "🎯", to: "/toolbox/mid", title: { zh: "MID 訂定指引", en: "MID Determination Guide" }, desc: { zh: "四種訂定方法 + 可信度評估五準則 + 在 GRADE 中的三個角色 + 實戰範例", en: "4 methods + 5 credibility criteria + 3 roles in GRADE + worked example" } },
    { icon: "📋", to: "/toolbox/picot", title: { zh: "PICOT 工作表", en: "PICOT Worksheet" }, desc: { zh: "五要素深度解析 + 四種問題類型 + 選擇策略 + 品質檢核清單", en: "5-element deep dive + 4 question types + selection strategy + quality checklist" } },
    { icon: "🔍", to: "/toolbox/pubmed-search", title: { zh: "PubMed 搜尋策略模板", en: "PubMed Search Template" }, desc: { zh: "從 PICOT 到 Boolean 三步驟 + 三大資料庫 + Boolean 運算符速查", en: "PICOT to Boolean in 3 steps + 3 databases + Boolean operators quick reference" } },
    { icon: "🔄", to: "/toolbox/sra", title: { zh: "SRA 關鍵字轉換指引", en: "SRA Keyword Conversion Guide" }, desc: { zh: "Polyglot Search Translator 操作流程 + 跨資料庫語法對照表", en: "Polyglot Search Translator workflow + cross-database syntax map" } },
    { icon: "🤖", to: "/toolbox/litsuggest", title: { zh: "LitSuggest 篩選指引", en: "LitSuggest Screening Guide" }, desc: { zh: "NCBI 機器學習文獻篩選 + 操作流程 + 競賽應用範例（793→391篇）", en: "NCBI ML screening + workflow + competition example (793→391 articles)" } },
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
        {tools.map(({ icon, title, desc, to }) => (
          <Link key={title.en} to={to}
            className="block bg-white rounded-xl border border-gray-100 p-5 card-hover hover:border-teal-200 transition-colors">
            <div className="text-2xl mb-2">{icon}</div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">{title[lang]}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{desc[lang]}</p>
            <span className="inline-block mt-3 px-2 py-0.5 bg-teal-50 text-teal-600 rounded text-xs font-medium">
              {lang === "zh" ? "✅ 已上線" : "✅ Available"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
