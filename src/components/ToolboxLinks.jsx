import React from 'react';
import { useLang } from '../App';

// Toolbox links mapped by phase number
const PHASE_TOOLS = {
  // Phase 1: Assess — no toolbox links
  1: [],
  // Phase 2: Ask
  2: [
    { path: "/toolbox/picot", zh: "PICOT 工作表", en: "PICOT Worksheet", icon: "📋" },
  ],
  // Phase 3: Acquire
  3: [
    { path: "/toolbox/pubmed-search", zh: "PubMed 搜尋策略", en: "PubMed Search", icon: "🔍" },
    { path: "/toolbox/sra", zh: "SRA 關鍵字轉換", en: "SRA Conversion", icon: "🔄" },
    { path: "/toolbox/litsuggest", zh: "LitSuggest 篩選", en: "LitSuggest Guide", icon: "🤖" },
  ],
  // Phase 4: Appraise
  4: [
    { path: "/toolbox/casp-sr", zh: "CASP-SR 清單", en: "CASP-SR Checklist", icon: "⚖️" },
    { path: "/toolbox/core-grade", zh: "Core GRADE 指引", en: "Core GRADE Guide", icon: "📊" },
    { path: "/toolbox/mid", zh: "MID 訂定指引", en: "MID Guide", icon: "🎯" },
  ],
  // Phase 5: Apply
  5: [
    { path: "/toolbox/etd", zh: "EtD 決策框架", en: "EtD Framework", icon: "📝" },
  ],
};

export default function ToolboxLinks({ phase }) {
  const { lang } = useLang();
  const tools = PHASE_TOOLS[phase] || [];

  if (tools.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-xs text-gray-400 mr-1">
        {lang === "zh" ? "🧰 參考工具：" : "🧰 Reference:"}
      </span>
      {tools.map(({ path, zh, en, icon }) => (
        <a
          key={path}
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100 hover:bg-teal-100 hover:border-teal-200 transition-colors"
        >
          <span>{icon}</span>
          <span>{lang === "zh" ? zh : en}</span>
          <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      ))}
    </div>
  );
}
