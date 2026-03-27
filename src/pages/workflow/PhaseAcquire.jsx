import React from 'react';
import { useProject } from './WorkflowRouter';
import { useLang } from '../../App';
import { t } from '../../i18n';
import HintCard from '../../components/HintCard';
import Hamster from '../../components/Hamster';

export default function PhaseAcquire() {
  const { project, updateProject } = useProject();
  const { lang } = useLang();
  const data = project.acquire;

  const update = (updater) => {
    updateProject((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      updater(next.acquire);
      return next;
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Hamster mood="neutral" size={40} />
        <div>
          <h2 className="font-display font-bold text-2xl text-teal-700">{t("phase3", lang)}</h2>
          <p className="text-sm text-gray-400">{t("phase3Sub", lang)}</p>
        </div>
      </div>

      <div className="bg-warm-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
        <span className="text-lg mt-0.5">🐹</span>
        <p className="text-sm text-amber-800">{t("hamsterPhase3Start", lang)}</p>
      </div>

      {/* Databases */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "🗄️ 資料庫選擇" : "🗄️ Database Selection"}</h3>
        <HintCard title={lang === "zh" ? "💡 選哪些資料庫？" : "💡 Which databases?"}>
          {lang === "zh" ? (
            <div className="space-y-1">
              <p><strong>PubMed</strong> — 文獻廣泛全面，免費存取</p>
              <p><strong>Embase</strong> — 涵蓋較多歐洲文獻和藥物相關研究</p>
              <p><strong>Cochrane Library</strong> — 證據品質高，專注系統性回顧</p>
              <p className="mt-2 text-teal-600">建議至少使用兩個以上的資料庫，以確保搜尋的完整性。</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p><strong>PubMed</strong> — Comprehensive coverage, free access</p>
              <p><strong>Embase</strong> — Better European and drug-focused coverage</p>
              <p><strong>Cochrane Library</strong> — High-quality evidence, SR-focused</p>
              <p className="mt-2 text-teal-600">Use at least 2 databases for comprehensive searching.</p>
            </div>
          )}
        </HintCard>
        {data.databases.map((db, idx) => (
          <div key={idx} className="flex gap-3 mb-3">
            <input
              type="text"
              value={db.name}
              onChange={(e) => update((acq) => { acq.databases[idx].name = e.target.value; })}
              placeholder={lang === "zh" ? "資料庫名稱" : "Database name"}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm"
            />
            <input
              type="text"
              value={db.rationale}
              onChange={(e) => update((acq) => { acq.databases[idx].rationale = e.target.value; })}
              placeholder={lang === "zh" ? "選擇原因" : "Rationale"}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm"
            />
            {data.databases.length > 1 && (
              <button onClick={() => update((acq) => { acq.databases.splice(idx, 1); })} className="text-gray-300 hover:text-red-400 px-2">✕</button>
            )}
          </div>
        ))}
        <button
          onClick={() => update((acq) => { acq.databases.push({ name: "", rationale: "" }); })}
          className="text-sm text-teal-500 hover:text-teal-600 font-medium"
        >+ {lang === "zh" ? "新增資料庫" : "Add database"}</button>
      </section>

      {/* Boolean strategy */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "🔗 搜尋策略 (Boolean)" : "🔗 Search Strategy (Boolean)"}</h3>
        <HintCard title={lang === "zh" ? "💡 如何建立搜尋策略？" : "💡 How to build a search strategy?"}>
          {lang === "zh" ? (
            <div className="space-y-1">
              <p>1. 將 PICOT 各元素轉為<strong>關鍵字 (free text)</strong>和<strong>控制詞彙 (MeSH/Emtree)</strong></p>
              <p>2. 同一概念的詞彙用 <strong>OR</strong> 連結</p>
              <p>3. 不同概念用 <strong>AND</strong> 連結</p>
              <p className="mt-2">可使用 <strong>Systematic Review Accelerator</strong> 將 PubMed 詞彙自動轉為 Cochrane/Embase 格式。</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p>1. Convert each PICOT element to <strong>free text</strong> and <strong>controlled vocabulary (MeSH/Emtree)</strong></p>
              <p>2. Connect synonyms within a concept with <strong>OR</strong></p>
              <p>3. Connect different concepts with <strong>AND</strong></p>
              <p className="mt-2">Use <strong>Systematic Review Accelerator</strong> to auto-convert PubMed terms for Cochrane/Embase.</p>
            </div>
          )}
        </HintCard>
        <textarea
          value={data.keywords.booleanStrategy}
          onChange={(e) => update((acq) => { acq.keywords.booleanStrategy = e.target.value; })}
          placeholder={lang === "zh" ? '例：((myopia) OR (myopia progression)) AND (atropine)' : 'e.g., ((myopia) OR (myopia progression)) AND (atropine)'}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-300 focus:outline-none resize-y text-sm font-mono"
        />
      </section>

      {/* Screening flow */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "📊 篩選流程 (PRISMA)" : "📊 Screening Flow (PRISMA)"}</h3>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="space-y-3">
            {[
              { label: "PubMed", key: "pubmed" },
              { label: "Embase", key: "embase" },
              { label: "Cochrane", key: "cochrane" },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-24">{label}</span>
                <input
                  type="number"
                  value={data.screeningFlow.initialResults[key] || ""}
                  onChange={(e) => update((acq) => { acq.screeningFlow.initialResults[key] = parseInt(e.target.value) || 0; })}
                  placeholder="0"
                  className="w-24 px-3 py-1.5 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm text-center"
                />
                <span className="text-xs text-gray-400">{lang === "zh" ? "篇" : "articles"}</span>
              </div>
            ))}
            <hr className="border-gray-100" />
            {[
              { label: lang === "zh" ? "去重後" : "After dedup", key: "afterDedup" },
              { label: lang === "zh" ? "標題/摘要篩選後" : "After title/abstract", key: "afterTitleAbstract" },
              { label: lang === "zh" ? "全文篩選後" : "After full text", key: "afterFullText" },
              { label: lang === "zh" ? "最終納入" : "Final included", key: "finalIncluded" },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-36">{label}</span>
                <input
                  type="number"
                  value={data.screeningFlow[key] || ""}
                  onChange={(e) => update((acq) => { acq.screeningFlow[key] = parseInt(e.target.value) || 0; })}
                  placeholder="0"
                  className="w-24 px-3 py-1.5 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm text-center"
                />
                <span className="text-xs text-gray-400">{lang === "zh" ? "篇" : "articles"}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected article */}
      <section className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "📄 選擇的文獻" : "📄 Selected Article"}</h3>
        <div className="space-y-3">
          {[
            { key: "title", label: lang === "zh" ? "文獻標題" : "Article title", wide: true },
            { key: "authors", label: lang === "zh" ? "作者" : "Authors", wide: true },
            { key: "journal", label: lang === "zh" ? "期刊" : "Journal" },
            { key: "year", label: lang === "zh" ? "年份" : "Year" },
            { key: "pmid", label: "PMID" },
            { key: "studyType", label: lang === "zh" ? "研究類型" : "Study type", placeholder: "e.g., SR with MA of RCTs" },
          ].map(({ key, label, wide, placeholder }) => (
            <div key={key} className={wide ? "" : "inline-block w-1/3 pr-3"}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
              <input
                type="text"
                value={data.selectedArticle[key]}
                onChange={(e) => update((acq) => { acq.selectedArticle[key] = e.target.value; })}
                placeholder={placeholder || label}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm"
              />
            </div>
          ))}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "RCT 數量" : "RCT count"}</label>
              <input type="number" value={data.selectedArticle.rctCount || ""} onChange={(e) => update((acq) => { acq.selectedArticle.rctCount = parseInt(e.target.value) || 0; })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "受試者總數" : "Total participants"}</label>
              <input type="number" value={data.selectedArticle.totalParticipants || ""} onChange={(e) => update((acq) => { acq.selectedArticle.totalParticipants = parseInt(e.target.value) || 0; })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "選擇此文獻的原因" : "Selection rationale"}</label>
            <textarea
              value={data.selectedArticle.selectionRationale}
              onChange={(e) => update((acq) => { acq.selectedArticle.selectionRationale = e.target.value; })}
              placeholder={lang === "zh" ? "為什麼選這篇而非其他候選文獻？" : "Why this article over other candidates?"}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm resize-y"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
