// src/pages/reference/PubmedSearchGuide.jsx
// PubMed Search Strategy Template
// Based on EBMouse teachingContent + 2024 competition slides (slides 14-15)

import React, { useState } from 'react';
import { useLang } from '../../App';
import { HamsterThinking, HamsterCelebrating } from '../../components/Hamster';

function Accordion({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-3 rounded-xl border overflow-hidden" style={{ borderColor: open ? '#0E7C8640' : '#E5E7EB' }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50/50 transition-colors">
        {icon && <span className="text-lg flex-shrink-0">{icon}</span>}
        <span className="flex-1 font-semibold text-gray-800 text-sm">{title}</span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-4 pb-4 border-t border-gray-100">{children}</div>}
    </div>
  );
}

export default function PubmedSearchGuide() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('strategy');

  const tabs = [
    { id: 'strategy', zh: '建立搜尋策略', en: 'Build Strategy', icon: '🔧' },
    { id: 'databases', zh: '三大資料庫', en: '3 Databases', icon: '🏛️' },
    { id: 'tips', zh: '搜尋技巧', en: 'Search Tips', icon: '💡' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <HamsterThinking size={48} />
        <div>
          <h1 className="font-bold text-3xl" style={{ color: '#0E7C86' }}>
            {lang === 'zh' ? 'PubMed 搜尋策略模板' : 'PubMed Search Strategy Template'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {lang === 'zh' ? '從 PICOT 到 Boolean — 三步驟建立搜尋式' : 'From PICOT to Boolean — build your search in 3 steps'}
          </p>
        </div>
      </div>

      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map(({ id, zh, en, icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
              activeTab === id ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-200' : 'bg-white text-gray-500 border-gray-200 hover:border-teal-300 hover:text-teal-600'
            }`}>
            <span className="mr-1">{icon}</span>{lang === 'zh' ? zh : en}
          </button>
        ))}
      </div>

      {/* ═══ TAB: Build Strategy ═══ */}
      {activeTab === 'strategy' && (
        <div>
          <Accordion title={lang === 'zh' ? 'Step 1：將 PICOT 轉為關鍵字' : 'Step 1: Convert PICOT to Keywords'} icon="1️⃣" defaultOpen>
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh' ? '只使用 P（族群）和 I（介入措施）來建立搜尋詞。C 和 O 通常不加入——太多限制會漏掉文獻。' : 'Use only P (Population) and I (Intervention) for search terms. C and O are usually excluded — too many constraints miss relevant studies.'}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ background: '#E8F6F7' }}>
                      <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">PICOT</th>
                      <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">Free Text</th>
                      <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">MeSH Term</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="px-3 py-2 border border-gray-200 font-bold text-teal-700">P</td><td className="px-3 py-2 border border-gray-200 font-mono text-xs">Axial myopia, Myopia progression</td><td className="px-3 py-2 border border-gray-200 font-mono text-xs">"Myopia"[MeSH]</td></tr>
                    <tr><td className="px-3 py-2 border border-gray-200 font-bold text-blue-700">I</td><td className="px-3 py-2 border border-gray-200 font-mono text-xs">Atropine</td><td className="px-3 py-2 border border-gray-200 font-mono text-xs">"Atropine"[MeSH]</td></tr>
                    <tr className="bg-gray-50"><td className="px-3 py-2 border border-gray-200 text-gray-400">C</td><td className="px-3 py-2 border border-gray-200 text-gray-400 text-xs" colSpan={2}>{lang === 'zh' ? '通常不加入搜尋' : 'Usually excluded from search'}</td></tr>
                    <tr className="bg-gray-50"><td className="px-3 py-2 border border-gray-200 text-gray-400">O</td><td className="px-3 py-2 border border-gray-200 text-gray-400 text-xs" colSpan={2}>{lang === 'zh' ? '通常不加入搜尋' : 'Usually excluded from search'}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? 'Step 2：同一概念用 OR 連結' : 'Step 2: Connect Synonyms with OR'} icon="2️⃣" defaultOpen>
            <div className="mt-3 space-y-2">
              <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
                <p className="text-gray-500 text-xs mb-1">#1 — P ({lang === 'zh' ? '族群' : 'Population'})</p>
                <p className="text-gray-800">(myopia) <span className="text-teal-600 font-bold">OR</span> (myopia progression) <span className="text-teal-600 font-bold">OR</span> "Myopia"[MeSH]</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
                <p className="text-gray-500 text-xs mb-1">#2 — I ({lang === 'zh' ? '介入措施' : 'Intervention'})</p>
                <p className="text-gray-800">(atropine) <span className="text-teal-600 font-bold">OR</span> "Atropine"[MeSH]</p>
              </div>
              <p className="text-xs text-gray-500">{lang === 'zh' ? '💡 MeSH 和 Free Text 都要列出 — MeSH 捕捉標準化索引，Free Text 捕捉尚未被索引的新文獻。' : '💡 List both MeSH and Free Text — MeSH captures indexed terms, Free Text catches newly published articles not yet indexed.'}</p>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? 'Step 3：不同概念用 AND 合併' : 'Step 3: Combine Concepts with AND'} icon="3️⃣" defaultOpen>
            <div className="mt-3">
              <div className="bg-teal-50 rounded-lg p-4 font-mono text-sm border border-teal-200">
                <p className="text-gray-500 text-xs mb-1">#3 — {lang === 'zh' ? '最終搜尋式' : 'Final Search'}</p>
                <p className="text-gray-800 leading-relaxed">#1 <span className="text-teal-600 font-bold">AND</span> #2</p>
                <p className="text-gray-500 text-xs mt-2">{lang === 'zh' ? '展開後 =' : 'Expanded ='}</p>
                <p className="text-gray-700 text-xs mt-1">((myopia) OR (myopia progression) OR "Myopia"[MeSH]) AND ((atropine) OR "Atropine"[MeSH])</p>
              </div>
              <div className="mt-3 bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>{lang === 'zh' ? '2024 案例結果：' : '2024 case result:'}</strong> {lang === 'zh' ? 'PubMed 回傳 793 篇 → 再用 LitSuggest 篩選' : 'PubMed returned 793 articles → then screened with LitSuggest'}
                </p>
              </div>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? 'PubMed Advanced Search 操作流程' : 'PubMed Advanced Search Workflow'} icon="🖥️">
            <div className="mt-3 space-y-2">
              {(lang === 'zh' ? [
                '1. 前往 PubMed → 點擊「Advanced」',
                '2. 在 Builder 中輸入 #1 的搜尋詞（選擇適當的 Field：All Fields 或 MeSH Terms）',
                '3. 點擊「Search」→ 記錄結果數量',
                '4. 回到 Advanced → 輸入 #2 的搜尋詞 → Search',
                '5. 在 History 中用 AND 合併：「#1 AND #2」',
                '6. 記錄最終結果數量 → 這就是你的初步搜尋結果',
              ] : [
                '1. Go to PubMed → click "Advanced"',
                '2. Enter #1 search terms in the Builder (select appropriate Field: All Fields or MeSH Terms)',
                '3. Click "Search" → record result count',
                '4. Return to Advanced → enter #2 terms → Search',
                '5. Combine in History with AND: "#1 AND #2"',
                '6. Record final count → this is your initial search result',
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      )}

      {/* ═══ TAB: 3 Databases ═══ */}
      {activeTab === 'databases' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-4">🏛️ {lang === 'zh' ? '三大資料庫' : 'The Big 3 Databases'}</h2>
          <p className="text-sm text-gray-500 mb-4">{lang === 'zh' ? '競賽建議至少使用 2 個以上的資料庫。使用 3 個更有說服力。' : 'Use at least 2 databases for competitions. Using 3 is more convincing.'}</p>
          {[
            { name: 'PubMed', color: '#2980B9', reqZh: '必用', reqEn: 'Must-use',
              pointsZh: ['免費、文獻量最大、涵蓋最廣', '支援 MeSH 控制詞彙搜尋', '有 Automatic Term Mapping — 自動將 Free Text 對應到 MeSH', '建議作為主要搜尋資料庫'],
              pointsEn: ['Free, largest collection, broadest coverage', 'Supports MeSH controlled vocabulary', 'Has Automatic Term Mapping — auto-maps Free Text to MeSH', 'Recommended as primary search database'] },
            { name: 'Embase', color: '#E67E22', reqZh: '建議使用', reqEn: 'Recommended',
              pointsZh: ['涵蓋更多歐洲期刊和藥物相關研究', '使用 Emtree 控制詞彙（類似 MeSH）', '擅長藥物不良反應、藥物經濟學文獻', '需要機構訂閱才能使用'],
              pointsEn: ['Better coverage of European journals and drug studies', 'Uses Emtree controlled vocabulary (similar to MeSH)', 'Strong in adverse drug reactions, pharmacoeconomics', 'Requires institutional subscription'] },
            { name: 'Cochrane Library', color: '#27AE60', reqZh: '建議使用', reqEn: 'Recommended',
              pointsZh: ['系統性回顧的金標準來源', '資料庫本身就經過品質篩選', 'Cochrane Reviews 可直接作為評讀目標', '搜尋介面簡潔，適合初學者'],
              pointsEn: ['Gold standard source for systematic reviews', 'Database itself is quality-filtered', 'Cochrane Reviews can serve directly as appraisal targets', 'Clean interface, beginner-friendly'] },
          ].map(({ name, color, reqZh, reqEn, pointsZh, pointsEn }) => (
            <div key={name} className="mb-4 rounded-xl border p-4" style={{ borderColor: color + '30' }}>
              <div className="flex items-center gap-2 mb-2">
                <p className="font-bold text-sm" style={{ color }}>{name}</p>
                <span className="px-2 py-0.5 rounded-full text-xs text-white font-bold" style={{ background: color }}>{lang === 'zh' ? reqZh : reqEn}</span>
              </div>
              <ul className="space-y-1">
                {(lang === 'zh' ? pointsZh : pointsEn).map((p, i) => (
                  <li key={i} className="text-xs text-gray-600 leading-relaxed flex items-start gap-1.5">
                    <span className="text-gray-300 mt-0.5">•</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* ═══ TAB: Tips ═══ */}
      {activeTab === 'tips' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-4">💡 {lang === 'zh' ? '搜尋技巧與常見錯誤' : 'Search Tips & Common Mistakes'}</h2>
          <Accordion title={lang === 'zh' ? 'Boolean 運算符速查' : 'Boolean Operators Quick Reference'} icon="🔗" defaultOpen>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr style={{ background: '#E8F6F7' }}><th className="text-left px-3 py-2 border border-teal-200 text-teal-800 font-semibold">{lang === 'zh' ? '運算符' : 'Operator'}</th><th className="text-left px-3 py-2 border border-teal-200 text-teal-800 font-semibold">{lang === 'zh' ? '功能' : 'Function'}</th><th className="text-left px-3 py-2 border border-teal-200 text-teal-800 font-semibold">{lang === 'zh' ? '範例' : 'Example'}</th></tr></thead>
                <tbody>
                  <tr><td className="px-3 py-2 border border-gray-200 font-mono font-bold text-teal-700">OR</td><td className="px-3 py-2 border border-gray-200">{lang === 'zh' ? '擴大搜尋 — 任一詞彙出現即可' : 'Broadens search — either term'}</td><td className="px-3 py-2 border border-gray-200 font-mono text-xs">myopia OR near-sightedness</td></tr>
                  <tr><td className="px-3 py-2 border border-gray-200 font-mono font-bold text-teal-700">AND</td><td className="px-3 py-2 border border-gray-200">{lang === 'zh' ? '縮小搜尋 — 兩個詞彙都要出現' : 'Narrows search — both terms required'}</td><td className="px-3 py-2 border border-gray-200 font-mono text-xs">myopia AND atropine</td></tr>
                  <tr><td className="px-3 py-2 border border-gray-200 font-mono font-bold text-teal-700">NOT</td><td className="px-3 py-2 border border-gray-200">{lang === 'zh' ? '排除特定詞彙（慎用！可能排除相關文獻）' : 'Excludes term (use cautiously! may exclude relevant articles)'}</td><td className="px-3 py-2 border border-gray-200 font-mono text-xs">myopia NOT animal</td></tr>
                  <tr><td className="px-3 py-2 border border-gray-200 font-mono font-bold text-teal-700">" "</td><td className="px-3 py-2 border border-gray-200">{lang === 'zh' ? '精確詞組搜尋' : 'Exact phrase search'}</td><td className="px-3 py-2 border border-gray-200 font-mono text-xs">"myopia progression"</td></tr>
                  <tr><td className="px-3 py-2 border border-gray-200 font-mono font-bold text-teal-700">*</td><td className="px-3 py-2 border border-gray-200">{lang === 'zh' ? '截斷搜尋 — 捕捉字根的所有變體' : 'Truncation — captures all variants of a root'}</td><td className="px-3 py-2 border border-gray-200 font-mono text-xs">therap* → therapy, therapies, therapeutic</td></tr>
                  <tr><td className="px-3 py-2 border border-gray-200 font-mono font-bold text-teal-700">[MeSH]</td><td className="px-3 py-2 border border-gray-200">{lang === 'zh' ? 'MeSH 控制詞彙搜尋' : 'MeSH controlled vocabulary search'}</td><td className="px-3 py-2 border border-gray-200 font-mono text-xs">"Atropine"[MeSH]</td></tr>
                </tbody>
              </table>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '常見錯誤' : 'Common Mistakes'} icon="⚠️">
            <div className="mt-3 space-y-2">
              {(lang === 'zh' ? [
                '❌ 把 C 和 O 都放入搜尋式 → 太多限制，漏掉大量文獻',
                '❌ 只用 MeSH 不用 Free Text → 漏掉尚未被索引的新文獻',
                '❌ 只用 Free Text 不用 MeSH → 漏掉用不同詞彙描述的文獻',
                '❌ 忘記用括號分組 → Boolean 優先序可能導致錯誤結果',
                '❌ 只搜尋一個資料庫 → 競賽至少要 2 個，理想 3 個',
                '❌ 沒有記錄搜尋歷程 → 簡報需要清楚的 PRISMA 流程',
              ] : [
                '❌ Including C and O in search → too restrictive, misses many articles',
                '❌ Using only MeSH without Free Text → misses newly published unindexed articles',
                '❌ Using only Free Text without MeSH → misses articles described with different vocabulary',
                '❌ Forgetting parentheses for grouping → Boolean precedence may cause wrong results',
                '❌ Searching only one database → competitions require at least 2, ideally 3',
                '❌ Not recording search history → presentation needs clear PRISMA flow',
              ]).map((item, i) => (
                <div key={i} className="bg-red-50/50 rounded-lg px-3 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? 'MeSH 詞彙怎麼找？' : 'How to Find MeSH Terms?'} icon="🔍">
            <div className="mt-3 space-y-2">
              {(lang === 'zh' ? [
                '1. 前往 MeSH Database（meshb.nlm.nih.gov）',
                '2. 輸入你的 Free Text 關鍵字（如 "myopia"）',
                '3. 找到對應的 MeSH Descriptor',
                '4. 檢查 Entry Terms（同義詞清單）— 這些也可以加入你的 OR 搜尋',
                '5. 注意 MeSH Tree 結構 — 上層詞彙會自動包含下層',
              ] : [
                '1. Go to MeSH Database (meshb.nlm.nih.gov)',
                '2. Enter your Free Text keyword (e.g., "myopia")',
                '3. Find the corresponding MeSH Descriptor',
                '4. Check Entry Terms (synonym list) — these can be added to your OR search',
                '5. Note MeSH Tree structure — broader terms automatically include narrower ones',
              ]).map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg px-3 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      )}

      <div className="mt-8 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          {lang === 'zh' ? '搜尋策略操作可參考 PubMed 官方教學：' : 'For PubMed search tutorials, see:'} <a href="https://pubmed.ncbi.nlm.nih.gov/help/" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">pubmed.ncbi.nlm.nih.gov/help</a>
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <a href="/toolbox" className="text-sm text-teal-600 hover:text-teal-700 font-medium">← {lang === 'zh' ? '返回工具箱' : 'Back to Toolbox'}</a>
      </div>
    </div>
  );
}
