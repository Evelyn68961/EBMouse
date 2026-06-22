// src/pages/reference/SraGuide.jsx
// SRA Keyword Conversion Guide — Polyglot Search Translator
// Based on Clark et al. (JMLA 2020;108:195–207), SRA/TERA documentation

import React, { useState } from 'react';
import { useLang } from '../../App';
import { HamsterCelebrating } from '../../components/Hamster';

function Accordion({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-3 rounded-xl border overflow-hidden" style={{ borderColor: open ? '#0E7C8640' : '#E5E7EB' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50/50 transition-colors">
        {icon && <span className="text-lg flex-shrink-0">{icon}</span>}
        <span className="flex-1 font-semibold text-gray-800 text-sm">{title}</span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && <div className="px-4 pb-4 border-t border-gray-100">{children}</div>}
    </div>
  );
}

// ── Mechanical syntax converter ──────────────────────────────────────────
// Deterministic field-tag / phrase-syntax swaps ONLY. Does NOT map controlled
// vocabulary (MeSH ↔ Emtree term equivalence) — that still needs Polyglot.
const FIELD_MAP = {
  embase:   { 'tiab': ':ti,ab', 'title/abstract': ':ti,ab', 'tw': ':ti,ab', 'ti': ':ti', 'title': ':ti', 'ab': ':ab', 'au': ':au', 'all fields': '', 'all': '' },
  cochrane: { 'tiab': ':ti,ab', 'title/abstract': ':ti,ab', 'tw': ':ti,ab,kw', 'ti': ':ti', 'title': ':ti', 'ab': ':ab', 'au': ':au', 'all fields': '', 'all': '' },
};

function convertQuery(src, target) {
  if (!src) return '';
  let s = src;
  // 1) Subject headings: "Term"[MeSH] / Term[Mesh Terms] / Term[mh]
  const meshRe = /"?([^"[\]]+?)"?\s*\[(?:mesh(?:\s*terms)?|mh)\]/gi;
  s = target === 'embase'
    ? s.replace(meshRe, (_, term) => `'${term.trim()}'/exp`)
    : s.replace(meshRe, (_, term) => `[mh "${term.trim()}"]`);
  // 2) Remaining field tags
  const fm = FIELD_MAP[target];
  s = s.replace(/\[([^\][]+)\]/g, (m, tag) => {
    const key = tag.trim().toLowerCase();
    return key in fm ? fm[key] : m; // leave unknown tags untouched
  });
  // 3) Embase uses single quotes for phrases
  if (target === 'embase') s = s.replace(/"([^"]+)"/g, (_, p) => `'${p}'`);
  return s;
}

export default function SraGuide() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('what');
  const [pmQuery, setPmQuery] = useState('');
  const [copied, setCopied] = useState('');
  const copy = (key, text) => {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 1500);
    });
  };
  const tabs = [
    { id: 'what', zh: '為什麼需要轉換', en: 'Why Convert', icon: '❓' },
    { id: 'how', zh: '操作步驟', en: 'How To', icon: '🔧' },
    { id: 'compare', zh: '詞彙對照', en: 'Vocabulary Map', icon: '🔄' },
    { id: 'convert', zh: '語法轉換器', en: 'Syntax Converter', icon: '⚡' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <HamsterCelebrating size={48} />
        <div>
          <h1 className="font-bold text-3xl" style={{ color: '#0E7C86' }}>
            {lang === 'zh' ? 'SRA 關鍵字轉換指引' : 'SRA Keyword Conversion Guide'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {lang === 'zh' ? 'Polyglot Search Translator — 一鍵轉換跨資料庫搜尋式' : 'Polyglot Search Translator — one-click cross-database conversion'}
          </p>
        </div>
      </div>

      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map(({ id, zh, en, icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${activeTab === id ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-200' : 'bg-white text-gray-500 border-gray-200 hover:border-teal-300 hover:text-teal-600'}`}>
            <span className="mr-1">{icon}</span>{lang === 'zh' ? zh : en}
          </button>
        ))}
      </div>

      {/* ═══ TAB: Why Convert ═══ */}
      {activeTab === 'what' && (
        <div>
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-base text-teal-800 mb-2">{lang === 'zh' ? '為什麼不能直接把 PubMed 搜尋式貼到其他資料庫？' : 'Why Can\'t You Just Paste PubMed Searches Into Other Databases?'}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {lang === 'zh'
                ? '不同資料庫使用不同的控制詞彙和語法。PubMed 用 MeSH，Embase 用 Emtree，Cochrane 的語法也不同。直接複製貼上會導致搜尋失敗或遺漏文獻。'
                : 'Different databases use different controlled vocabularies and syntax. PubMed uses MeSH, Embase uses Emtree, and Cochrane has its own syntax. Direct copy-paste causes search failures or missed articles.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { db: 'PubMed', vocab: 'MeSH', syntax: '"Myopia"[MeSH]', color: '#2980B9' },
              { db: 'Embase', vocab: 'Emtree', syntax: "'myopia'/exp", color: '#E67E22' },
              { db: 'Cochrane', vocab: 'MeSH (variant)', syntax: '[mh "Myopia"]', color: '#27AE60' },
            ].map(({ db, vocab, syntax, color }) => (
              <div key={db} className="rounded-xl p-3 text-center border" style={{ borderColor: color + '30' }}>
                <p className="font-bold text-sm" style={{ color }}>{db}</p>
                <p className="text-xs text-gray-500 mt-1">{lang === 'zh' ? '控制詞彙' : 'Vocabulary'}: {vocab}</p>
                <p className="font-mono text-xs text-gray-700 mt-2 bg-gray-50 rounded px-2 py-1">{syntax}</p>
              </div>
            ))}
          </div>

          <div className="bg-teal-50/50 rounded-xl p-4 border border-teal-100">
            <p className="text-sm text-teal-800">
              <strong>Polyglot Search Translator</strong> {lang === 'zh'
                ? '由 Bond University 開發（SRA / TERA 套件的一部分），可自動將 PubMed 或 Ovid MEDLINE 搜尋式轉換為 Cochrane、Embase、Web of Science、Scopus、CINAHL 等格式。研究顯示可節省時間並減少手動轉換錯誤。'
                : 'developed by Bond University (part of SRA/TERA suite), auto-converts PubMed or Ovid MEDLINE searches to Cochrane, Embase, Web of Science, Scopus, CINAHL, and more. Research shows it saves time and reduces manual conversion errors.'}
            </p>
          </div>
        </div>
      )}

      {/* ═══ TAB: How To ═══ */}
      {activeTab === 'how' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-4">🔧 {lang === 'zh' ? '操作步驟' : 'Step-by-Step'}</h2>

          <div className="space-y-4">
            {[
              { stepZh: '前往 Polyglot', stepEn: 'Go to Polyglot', descZh: '網址：polyglot.sr-accelerator.com（免費，無須註冊）。或使用升級版 TERA 工具（tera-tools.com，需免費帳號）。', descEn: 'URL: polyglot.sr-accelerator.com (free, no registration). Or use the upgraded TERA tool (tera-tools.com, free account needed).', icon: '🌐' },
              { stepZh: '選擇輸入格式', stepEn: 'Select Input Format', descZh: '選擇你的搜尋式來源：PubMed 或 Ovid MEDLINE。大部分情況選 PubMed。', descEn: 'Select your source format: PubMed or Ovid MEDLINE. Usually select PubMed.', icon: '📥' },
              { stepZh: '貼入搜尋式', stepEn: 'Paste Your Search', descZh: '把你在 PubMed 建立好的完整搜尋式貼入輸入框。可以是單行或多行（#1, #2, #1 AND #2 格式皆可）。', descEn: 'Paste your complete PubMed search strategy. Can be single-line or multi-line (#1, #2, #1 AND #2 format both work).', icon: '📋' },
              { stepZh: '選擇輸出資料庫', stepEn: 'Select Output Databases', descZh: '勾選你要轉換的目標：Cochrane Library、Embase (Elsevier)、Web of Science、Scopus、CINAHL 等。', descEn: 'Check target databases: Cochrane Library, Embase (Elsevier), Web of Science, Scopus, CINAHL, etc.', icon: '🎯' },
              { stepZh: '檢查轉換結果', stepEn: 'Review Translations', descZh: '注意藍色標記的詞彙（有警告或建議）。Polyglot 會用顏色標示 MeSH、Boolean、未識別的字元。務必人工檢查一次。', descEn: 'Note blue-highlighted terms (warnings or suggestions). Polyglot color-codes MeSH, Boolean operators, and unrecognized characters. Always review manually.', icon: '👀' },
              { stepZh: '複製並執行搜尋', stepEn: 'Copy and Execute', descZh: '複製轉換後的搜尋式，到各資料庫執行搜尋。記錄每個資料庫的結果數量 → 放入 PRISMA 流程圖。', descEn: 'Copy translated searches, execute in each database. Record result counts from each → put in PRISMA flow diagram.', icon: '🚀' },
            ].map(({ stepZh, stepEn, descZh, descEn, icon }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ background: '#E8F6F7' }}>{icon}</div>
                  {i < 5 && <div className="w-0.5 h-4 bg-teal-200 mt-1" />}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-semibold text-gray-800">{lang === 'zh' ? stepZh : stepEn}</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{lang === 'zh' ? descZh : descEn}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="text-sm text-amber-800">
              ⚠️ {lang === 'zh'
                ? 'Polyglot 的翻譯不是完美的！Embase 的 Emtree 傾向過度索引（over-indexing），可能需要額外調整精確度。複雜的搜尋式（如含頻率運算符）可能需要手動修正。'
                : 'Polyglot translations are not perfect! Embase\'s Emtree tends to over-index, which may require precision adjustments. Complex searches (e.g., with frequency operators) may need manual fixes.'}
            </p>
          </div>
        </div>
      )}

      {/* ═══ TAB: Vocabulary Map ═══ */}
      {activeTab === 'compare' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-4">🔄 {lang === 'zh' ? '跨資料庫語法對照' : 'Cross-Database Syntax Map'}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ background: '#E8F6F7' }}>
                  <th className="text-left px-3 py-2 border border-teal-200 text-teal-800 font-semibold">{lang === 'zh' ? '功能' : 'Feature'}</th>
                  <th className="text-left px-3 py-2 border border-teal-200 font-semibold text-blue-700">PubMed</th>
                  <th className="text-left px-3 py-2 border border-teal-200 font-semibold text-orange-700">Embase</th>
                  <th className="text-left px-3 py-2 border border-teal-200 font-semibold text-green-700">Cochrane</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                <tr><td className="px-3 py-2 border border-gray-200 font-sans text-sm">{lang === 'zh' ? '控制詞彙' : 'Subject heading'}</td><td className="px-3 py-2 border border-gray-200">"Term"[MeSH]</td><td className="px-3 py-2 border border-gray-200">'term'/exp</td><td className="px-3 py-2 border border-gray-200">[mh "Term"]</td></tr>
                <tr><td className="px-3 py-2 border border-gray-200 font-sans text-sm">{lang === 'zh' ? '標題搜尋' : 'Title search'}</td><td className="px-3 py-2 border border-gray-200">term[ti]</td><td className="px-3 py-2 border border-gray-200">term:ti</td><td className="px-3 py-2 border border-gray-200">term:ti</td></tr>
                <tr><td className="px-3 py-2 border border-gray-200 font-sans text-sm">{lang === 'zh' ? '標題+摘要' : 'Title+Abstract'}</td><td className="px-3 py-2 border border-gray-200">term[tiab]</td><td className="px-3 py-2 border border-gray-200">term:ti,ab</td><td className="px-3 py-2 border border-gray-200">term:ti,ab</td></tr>
                <tr><td className="px-3 py-2 border border-gray-200 font-sans text-sm">{lang === 'zh' ? '截斷' : 'Truncation'}</td><td className="px-3 py-2 border border-gray-200">therap*</td><td className="px-3 py-2 border border-gray-200">therap*</td><td className="px-3 py-2 border border-gray-200">therap*</td></tr>
                <tr><td className="px-3 py-2 border border-gray-200 font-sans text-sm">{lang === 'zh' ? '精確詞組' : 'Exact phrase'}</td><td className="px-3 py-2 border border-gray-200">"low back pain"</td><td className="px-3 py-2 border border-gray-200">'low back pain'</td><td className="px-3 py-2 border border-gray-200">"low back pain"</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">{lang === 'zh' ? '💡 這就是為什麼需要 Polyglot — 手動轉換容易出錯，特別是 Embase 的語法差異最大。' : '💡 This is why you need Polyglot — manual conversion is error-prone, especially Embase which differs most.'}</p>
        </div>
      )}

      {/* ═══ TAB: Syntax Converter ═══ */}
      {activeTab === 'convert' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">⚡ {lang === 'zh' ? '機械式語法轉換器' : 'Mechanical Syntax Converter'}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {lang === 'zh'
              ? '貼入 PubMed 搜尋式，自動轉換欄位標籤與詞組語法為 Embase / Cochrane 格式。'
              : 'Paste a PubMed search and auto-convert field tags & phrase syntax to Embase / Cochrane format.'}
          </p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
            <p className="text-sm text-red-800 leading-relaxed">
              ⚠️ <strong>{lang === 'zh' ? '重要限制：' : 'Important limit:'}</strong>{' '}
              {lang === 'zh'
                ? '本工具只做機械式語法替換（如 [tiab] → :ti,ab、"X"[MeSH] → \'X\'/exp）。它不會翻譯控制詞彙本身 — MeSH 與 Emtree 的詞彙對應必須用 Polyglot 確認。執行前請務必人工檢查。'
                : 'This only does mechanical syntax swaps (e.g. [tiab] → :ti,ab, "X"[MeSH] → \'X\'/exp). It does NOT translate the controlled-vocabulary terms — MeSH↔Emtree mapping must be verified in Polyglot. Always review before running.'}
            </p>
          </div>

          <label className="block text-xs font-medium text-gray-500 mb-1">{lang === 'zh' ? 'PubMed 搜尋式' : 'PubMed search'}</label>
          <textarea
            value={pmQuery}
            onChange={(e) => setPmQuery(e.target.value)}
            placeholder={'((myopia) OR "Myopia"[MeSH]) AND (atropine[tiab] OR "Atropine"[MeSH])'}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-300 focus:outline-none resize-y text-sm font-mono mb-5"
          />

          {[
            { key: 'embase', label: 'Embase (Emtree)', color: '#E67E22' },
            { key: 'cochrane', label: 'Cochrane Library', color: '#27AE60' },
          ].map(({ key, label, color }) => {
            const out = convertQuery(pmQuery, key);
            return (
              <div key={key} className="mb-4 rounded-xl border overflow-hidden" style={{ borderColor: color + '40' }}>
                <div className="flex items-center justify-between px-4 py-2" style={{ background: color + '12' }}>
                  <span className="font-semibold text-sm" style={{ color }}>{label}</span>
                  <button
                    onClick={() => copy(key, out)}
                    disabled={!out}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg border bg-white disabled:opacity-40 hover:bg-gray-50 transition-colors"
                    style={{ color, borderColor: color + '40' }}
                  >
                    {copied === key ? (lang === 'zh' ? '已複製 ✓' : 'Copied ✓') : (lang === 'zh' ? '複製' : 'Copy')}
                  </button>
                </div>
                <pre className="px-4 py-3 text-xs font-mono text-gray-700 whitespace-pre-wrap break-words min-h-[3rem]">{out || <span className="text-gray-300">{lang === 'zh' ? '（轉換結果會顯示在這裡）' : '(converted output appears here)'}</span>}</pre>
              </div>
            );
          })}

          <div className="mt-2 bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="text-sm text-amber-800 leading-relaxed">
              ✅ {lang === 'zh' ? '轉換後的下一步：' : 'After converting:'}{' '}
              {lang === 'zh'
                ? '到 Polyglot 確認詞彙對應 → 在各資料庫執行 → 把逐字搜尋式與結果數量記錄到 Acquire 階段的「搜尋式紀錄」。'
                : 'Verify vocabulary in Polyglot → run in each database → log the verbatim strings + result counts in the Acquire step’s “Search-strategy Log.”'}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Tools:</strong> <a href="https://polyglot.sr-accelerator.com/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">polyglot.sr-accelerator.com</a> | <a href="https://tera-tools.com/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">tera-tools.com</a> (TERA)
          <br /><strong>Reference:</strong> Clark JM et al. Improving the translation of search strategies using the Polyglot Search Translator. <em>JMLA</em> 2020;108(2):195–207.
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <a href="/toolbox" className="text-sm text-teal-600 hover:text-teal-700 font-medium">← {lang === 'zh' ? '返回工具箱' : 'Back to Toolbox'}</a>
      </div>
    </div>
  );
}
