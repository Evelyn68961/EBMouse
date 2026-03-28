// src/pages/reference/CaseLibrary.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../App';
import Hamster from '../../components/Hamster';

const certaintyColors = {
  high: { bg: 'bg-green-100', text: 'text-green-700' },
  moderate: { bg: 'bg-amber-100', text: 'text-amber-700' },
  low: { bg: 'bg-orange-100', text: 'text-orange-700' },
  very_low: { bg: 'bg-red-100', text: 'text-red-700' },
};

const certaintyLabels = {
  high: 'High', moderate: 'Moderate', low: 'Low', very_low: 'Very Low',
};

export default function CaseLibrary() {
  const { lang } = useLang();

  const cases = [
    {
      id: "atropine-2024",
      to: "/cases/atropine-2024",
      year: 2024,
      title: { zh: "Atropine 眼藥水治療兒童軸性近視", en: "Atropine Eye Drops for Childhood Axial Myopia" },
      team: { zh: "輔大附醫藥劑部", en: "FJUH Pharmacy" },
      summary: {
        zh: "12 歲女童患有軸性近視，比較 0.01% 和 0.05% atropine 眼藥水的療效。使用 CASP-SR 評讀 + Core GRADE 評估，最終部分推薦使用 0.05% atropine。",
        en: "12-year-old girl with axial myopia, comparing 0.01% vs 0.05% atropine eye drops. Appraised with CASP-SR + Core GRADE. Conditional recommendation for 0.05% atropine.",
      },
      article: "Wei XL et al. (2023) PMID: 37602338",
      grade: { "0.01%": "low", "0.05%": "moderate" },
      tags: ["SR/MA", "RCT", "Pediatrics", "Ophthalmology"],
      recommendation: { zh: "部分推薦 0.05% atropine", en: "Conditional: 0.05% atropine" },
      slideCount: 58,
      ready: true,
    },
    // Future cases can be added here
    {
      id: "cpm-2025",
      to: "/cases/cpm-2025",
      year: 2025,
      title: { zh: "CPM 對全膝關節置換術後復健的效益", en: "CPM for Post-TKA Rehabilitation" },
      team: { zh: "輔大附醫藥劑部", en: "FJUH Pharmacy" },
      summary: {
        zh: "72 歲骨關節炎患者接受 TKA 後，評估連續被動性運動 (CPM) 相較於傳統物理治療的復健效益。GRADE 評估為低品質證據，最終部分不推薦 CPM。",
        en: "72-year-old OA patient post-TKA, evaluating CPM vs. conventional PT for rehabilitation. GRADE: low certainty. Conditional recommendation against CPM.",
      },
      article: "CPM for post-TKA rehabilitation — SR/MA",
      grade: { "CPM": "low" },
      tags: ["SR/MA", "RCT", "Geriatrics", "Orthopedics", "Rehabilitation"],
      recommendation: { zh: "部分不推薦 CPM", en: "Conditional against CPM" },
      slideCount: 55,
      ready: true,
    },
    {
      id: "iv-iron-2025",
      to: "/cases/iv-iron-2025",
      year: 2025,
      title: { zh: "靜脈注射補鐵對心衰竭合併缺鐵性貧血的心血管效益", en: "IV Iron for CV Outcomes in HF with IDA" },
      team: { zh: "輔大附醫藥劑部", en: "FJUH Pharmacy" },
      summary: {
        zh: "72 歲男性心衰竭合併缺鐵性貧血，評估靜脈注射補鐵相較於口服補鐵的心血管效益。14 篇 RCT (6651 人) 統合分析顯示初次心血管死亡 OR 0.73，NNT = 16。GRADE 中等品質，部分推薦 IV 補鐵。",
        en: "72-year-old male with HF + IDA, evaluating IV vs. oral iron for CV outcomes. 14-RCT MA (6651 pts) shows first CV death OR 0.73, NNT = 16. GRADE moderate. Conditional recommendation for IV iron.",
      },
      article: "Ahmed M et al. ESC Heart Fail. 2025;12(1):43. PMID: 38965691",
      grade: { "IV iron": "moderate" },
      tags: ["SR/MA", "RCT", "Cardiology", "Hematology"],
      recommendation: { zh: "部分推薦靜脈注射補鐵", en: "Conditional: IV iron" },
      slideCount: 54,
      ready: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Hamster mood="neutral" size={48} />
        <div>
          <h1 className="font-display font-bold text-3xl text-teal-700">
            {lang === "zh" ? "📚 案例庫" : "📚 Case Library"}
          </h1>
          <p className="text-gray-400 mt-1">
            {lang === "zh"
              ? "歷屆競賽案例的完整 5A 流程評析 — 從情境到建議，每一步都有解說"
              : "Fully annotated 5A walkthroughs of past competition cases — every step explained"}
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-700 leading-relaxed">
          {lang === "zh"
            ? "每個案例都是一份完整的範例報告，展示了從「評估案例」到「臨床應用」的整個 EBM 流程。你可以把它當作模板來學習，理解每一步的決策邏輯和呈現方式。"
            : "Each case is a complete worked example showing the entire EBM workflow from Assess to Apply. Use these as templates to learn the decision logic and presentation approach at every step."}
        </p>
      </div>

      <div className="space-y-4">
        {cases.map((c) => {
          const Card = c.ready ? Link : 'div';
          const cardProps = c.ready ? { to: c.to } : {};

          return (
            <Card
              key={c.id}
              {...cardProps}
              className={`block bg-white rounded-2xl border border-gray-100 p-6 transition-all ${
                c.ready ? 'card-hover cursor-pointer hover:border-teal-200' : 'opacity-70'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h2 className="font-display font-bold text-xl text-gray-800">{c.title[lang]}</h2>
                  <p className="text-sm text-gray-400 mt-1">{c.team[lang]}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-medium">{c.year}</span>
                  {c.ready && (
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                      {lang === 'zh' ? '完整評析' : 'Full walkthrough'}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">{c.summary[lang]}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {c.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">{tag}</span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <span>📄 {c.article}</span>
                <span>{c.slideCount} {lang === 'zh' ? '張投影片' : 'slides'}</span>
              </div>

              {/* GRADE results */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs text-gray-500 font-medium">GRADE:</span>
                {Object.entries(c.grade).map(([k, v]) => {
                  const cc = certaintyColors[v] || certaintyColors.low;
                  return (
                    <span key={k} className={`px-2 py-0.5 rounded text-xs font-medium ${cc.bg} ${cc.text}`}>
                      {k} = {certaintyLabels[v]}
                    </span>
                  );
                })}
              </div>

              {/* Recommendation */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{lang === 'zh' ? '推薦：' : 'Rec:'}</span>
                <span className="text-xs font-medium text-teal-700">{c.recommendation[lang]}</span>
              </div>

              {c.ready && (
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-sm text-teal-500 font-medium">
                    {lang === "zh" ? "查看完整 5A 流程 →" : "View full 5A walkthrough →"}
                  </span>
                  <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}

              {!c.ready && (
                <div className="mt-4 pt-3 border-t border-gray-50">
                  <p className="text-sm text-gray-400">
                    🚧 {lang === "zh" ? "完整案例評析即將上線" : "Full annotated walkthrough coming soon"}
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
