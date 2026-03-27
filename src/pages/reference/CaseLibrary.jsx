import React from 'react';
import { useLang } from '../../App';
import Hamster from '../../components/Hamster';

export default function CaseLibrary() {
  const { lang } = useLang();

  const cases = [
    {
      id: "atropine-myopia-2024",
      title: { zh: "Atropine 治療兒童近視 (2024)", en: "Atropine for Childhood Myopia (2024)" },
      team: { zh: "輔大附醫藥劑部", en: "FJUH Pharmacy" },
      summary: {
        zh: "12歲女童患有軸性近視，比較 0.01% 和 0.05% atropine 眼藥水的療效。使用 CASP-SR 評讀 + Core GRADE 評估，最終建議使用 0.05% atropine。",
        en: "12-year-old girl with axial myopia, comparing 0.01% vs 0.05% atropine eye drops. Appraised with CASP-SR + Core GRADE, recommended 0.05% atropine."
      },
      article: "Wei XL et al. (2023) PMID: 37602338",
      grade: { "0.01%": "Low", "0.05%": "Moderate" },
      tags: ["SR/MA", "RCT", "Pediatrics", "Ophthalmology"],
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
            {lang === "zh" ? "歷屆競賽案例的完整評析" : "Fully annotated past competition cases"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {cases.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-6 card-hover">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="font-display font-bold text-xl text-gray-800">{c.title[lang]}</h2>
                <p className="text-sm text-gray-400 mt-1">{c.team[lang]}</p>
              </div>
              <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-medium">2024</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{c.summary[lang]}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {c.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>📄 {c.article}</span>
              <span>GRADE: {Object.entries(c.grade).map(([k, v]) => `${k} = ${v}`).join(", ")}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50">
              <p className="text-sm text-teal-500 font-medium">
                {lang === "zh" ? "🚧 完整案例評析即將上線" : "🚧 Full annotated walkthrough coming soon"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
