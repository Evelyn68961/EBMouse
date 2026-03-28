// src/pages/reference/LitSuggestGuide.jsx
// LitSuggest Screening Guide — ML-assisted literature screening
// Based on Allot et al. (Nucleic Acids Res 2021;49:W352–W358), 2024 competition slides (slides 17-18)

import React, { useState } from 'react';
import { useLang } from '../../App';
import { HamsterThinking, HamsterCelebrating } from '../../components/Hamster';

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

export default function LitSuggestGuide() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('what');
  const tabs = [
    { id: 'what', zh: '什麼是 LitSuggest', en: 'What is LitSuggest', icon: '🤖' },
    { id: 'how', zh: '操作流程', en: 'Workflow', icon: '🔧' },
    { id: 'tips', zh: '競賽應用', en: 'Competition Use', icon: '🏆' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <HamsterThinking size={48} />
        <div>
          <h1 className="font-bold text-3xl" style={{ color: '#0E7C86' }}>
            {lang === 'zh' ? 'LitSuggest 篩選指引' : 'LitSuggest Screening Guide'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {lang === 'zh' ? 'NCBI 免費機器學習工具 — 從數百篇文獻中快速找到相關研究' : 'Free NCBI ML tool — quickly find relevant studies from hundreds of articles'}
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

      {/* ═══ TAB: What ═══ */}
      {activeTab === 'what' && (
        <div>
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-base text-teal-800 mb-2">{lang === 'zh' ? '用機器學習篩選文獻' : 'ML-Powered Literature Screening'}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {lang === 'zh'
                ? 'PubMed 搜尋可能回傳數百甚至數千篇文獻。手動逐篇閱讀標題和摘要太耗時。LitSuggest 是 NCBI（美國國家生物技術資訊中心）開發的免費機器學習工具，可以根據你提供的正面和負面範例，自動對所有搜尋結果進行相關性評分。'
                : 'A PubMed search may return hundreds or thousands of articles. Manually screening all titles/abstracts is too time-consuming. LitSuggest is a free ML tool from NCBI that auto-scores all search results based on positive and negative examples you provide.'}
            </p>
          </div>

          <Accordion title={lang === 'zh' ? '核心概念：正面範例 + 負面範例 → 模型訓練' : 'Core Concept: Positive + Negative Examples → Model Training'} icon="🧠" defaultOpen>
            <div className="mt-3 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg p-3 bg-green-50 border border-green-200">
                  <p className="text-xs font-bold text-green-800 mb-1">✅ Positive PMIDs</p>
                  <p className="text-xs text-green-700 leading-relaxed">
                    {lang === 'zh' ? '你確定相關的文獻 PMID。例如：你已知的幾篇高品質 SR 或 RCT。' : 'PMIDs of articles you know are relevant. E.g., a few known high-quality SRs or RCTs.'}
                  </p>
                </div>
                <div className="rounded-lg p-3 bg-red-50 border border-red-200">
                  <p className="text-xs font-bold text-red-800 mb-1">❌ Negative PMIDs ({lang === 'zh' ? '選擇性' : 'optional'})</p>
                  <p className="text-xs text-red-700 leading-relaxed">
                    {lang === 'zh' ? '你確定不相關的文獻 PMID。如果不提供，LitSuggest 會自動產生。' : 'PMIDs of articles you know are irrelevant. If not provided, LitSuggest auto-generates them.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <span>↓</span>
              </div>
              <div className="rounded-lg p-3 bg-blue-50 border border-blue-200 text-center">
                <p className="text-xs font-bold text-blue-800 mb-1">🤖 {lang === 'zh' ? '模型對所有文獻評分' : 'Model Scores All Articles'}</p>
                <p className="text-xs text-blue-700">{lang === 'zh' ? '每篇文獻得到 Positive / Negative 分類和信心分數' : 'Each article gets a Positive / Negative classification with a confidence score'}</p>
              </div>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? 'LitSuggest vs 手動篩選' : 'LitSuggest vs Manual Screening'} icon="⚖️">
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg p-3 bg-gray-50">
                <p className="text-xs font-bold text-gray-700 mb-1">{lang === 'zh' ? '手動篩選' : 'Manual Screening'}</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• {lang === 'zh' ? '逐篇閱讀標題和摘要' : 'Read each title and abstract'}</li>
                  <li>• {lang === 'zh' ? '耗時：每篇 30 秒 × 793 篇 ≈ 6.6 小時' : 'Time: 30 sec × 793 = ~6.6 hours'}</li>
                  <li>• {lang === 'zh' ? '容易遺漏（疲勞導致注意力下降）' : 'Prone to misses (fatigue reduces attention)'}</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 bg-teal-50">
                <p className="text-xs font-bold text-teal-700 mb-1">LitSuggest</p>
                <ul className="text-xs text-teal-600 space-y-1">
                  <li>• {lang === 'zh' ? '提供幾篇範例即可' : 'Just provide a few examples'}</li>
                  <li>• {lang === 'zh' ? '幾分鐘內完成評分' : 'Scoring done in minutes'}</li>
                  <li>• {lang === 'zh' ? '可重複、可調整（更新範例重訓模型）' : 'Reproducible, adjustable (update examples to retrain)'}</li>
                  <li>• {lang === 'zh' ? '仍需人工確認最終結果' : 'Still requires human confirmation of final results'}</li>
                </ul>
              </div>
            </div>
          </Accordion>
        </div>
      )}

      {/* ═══ TAB: Workflow ═══ */}
      {activeTab === 'how' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-4">🔧 {lang === 'zh' ? '操作流程' : 'Step-by-Step Workflow'}</h2>
          <div className="space-y-4">
            {[
              { stepZh: '前往 LitSuggest', stepEn: 'Go to LitSuggest', descZh: '網址：ncbi.nlm.nih.gov/research/litsuggest — 免費，需要 NCBI 帳號（My NCBI）。', descEn: 'URL: ncbi.nlm.nih.gov/research/litsuggest — free, requires NCBI account (My NCBI).', icon: '🌐' },
              { stepZh: '建立新專案', stepEn: 'Create New Project', descZh: '為你的搜尋主題建立一個專案（如 "Atropine for Myopia"）。', descEn: 'Create a project for your search topic (e.g., "Atropine for Myopia").', icon: '📁' },
              { stepZh: '輸入正面範例 PMIDs', stepEn: 'Enter Positive PMIDs', descZh: '提供 5-10 篇你確定相關的文獻 PMID（用空格分隔）。三種輸入方式：直接輸入 PMID、從檔案載入、或用 PubMed 查詢擷取。', descEn: 'Provide 5-10 PMIDs of relevant articles (space-separated). Three input methods: enter PMIDs directly, load from file, or retrieve via PubMed query.', icon: '✅' },
              { stepZh: '選擇性輸入負面範例', stepEn: 'Optionally Enter Negative PMIDs', descZh: '如果不提供，LitSuggest 會自動產生負面範例。但提供會讓模型更準確。', descEn: 'If not provided, LitSuggest auto-generates negatives. But providing them improves model accuracy.', icon: '❌' },
              { stepZh: '提交訓練 + 分類', stepEn: 'Submit Training + Classification', descZh: '輸入你要篩選的文獻集合（可以直接輸入 PubMed 搜尋式，上限 10,000 篇），等待模型訓練和分類（通常幾分鐘）。', descEn: 'Input the article set to screen (can enter a PubMed query directly, max 10,000 articles), wait for model training and classification (usually a few minutes).', icon: '🚀' },
              { stepZh: '檢視結果', stepEn: 'Review Results', descZh: '查看分數分布直方圖、Positive/Negative 分類結果。下載分類結果（CSV）。對不確定的文獻進行人工確認。', descEn: 'View score distribution histogram, Positive/Negative classifications. Download results (CSV). Manually confirm uncertain articles.', icon: '📊' },
              { stepZh: '迭代優化（選擇性）', stepEn: 'Iterate (Optional)', descZh: '如果結果不滿意，可以標註一些被錯誤分類的文獻，更新範例後重訓模型。', descEn: 'If results are unsatisfactory, annotate misclassified articles, update examples, and retrain the model.', icon: '🔄' },
            ].map(({ stepZh, stepEn, descZh, descEn, icon }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ background: '#E8F6F7' }}>{icon}</div>
                  {i < 6 && <div className="w-0.5 h-4 bg-teal-200 mt-1" />}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-semibold text-gray-800">{lang === 'zh' ? stepZh : stepEn}</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{lang === 'zh' ? descZh : descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ TAB: Competition Use ═══ */}
      {activeTab === 'tips' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-4">🏆 {lang === 'zh' ? '在 EBM 競賽中的應用' : 'Application in EBM Competitions'}</h2>

          <Accordion title={lang === 'zh' ? '2024 案例：793 → 391 篇' : '2024 Case: 793 → 391 Articles'} icon="👁️" defaultOpen>
            <div className="mt-3">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div>
                    <p className="text-2xl font-bold text-blue-700">793</p>
                    <p className="text-xs text-blue-500">{lang === 'zh' ? 'PubMed 初步結果' : 'Initial PubMed results'}</p>
                  </div>
                  <div className="flex items-center justify-center"><span className="text-xl text-blue-300">→</span></div>
                  <div>
                    <p className="text-2xl font-bold text-teal-700">391</p>
                    <p className="text-xs text-teal-500">{lang === 'zh' ? 'LitSuggest Positive' : 'LitSuggest Positive'}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {lang === 'zh'
                    ? '使用 LitSuggest 將 793 篇 PubMed 結果篩選為 391 篇（Positive），再從中篩選出屬於 SR 的 9 篇，最終選出符合 PICO 的 2 篇。'
                    : 'LitSuggest screened 793 PubMed results down to 391 Positive, then filtered to 9 that were SRs, and finally 2 matching PICO.'}
                </p>
              </div>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '簡報中怎麼呈現？' : 'How to Present in Slides?'} icon="📊" defaultOpen>
            <div className="mt-3 space-y-2">
              {(lang === 'zh' ? [
                '✅ PRISMA 流程圖中標示 LitSuggest 篩選步驟和結果數量',
                '✅ 說明你提供了幾篇正面/負面範例',
                '✅ 展示分數分布直方圖（LitSuggest 自動產生）',
                '✅ 強調 LitSuggest 只是輔助工具 — 最終仍由人工確認',
                '✅ 注明這是 NCBI 提供的免費工具（增加可信度）',
              ] : [
                '✅ Show LitSuggest screening step and counts in PRISMA flow',
                '✅ State how many positive/negative examples you provided',
                '✅ Display score distribution histogram (auto-generated by LitSuggest)',
                '✅ Emphasize LitSuggest is only an aid — final confirmation is manual',
                '✅ Note it\'s a free NCBI tool (adds credibility)',
              ]).map((item, i) => (
                <div key={i} className="bg-green-50/40 rounded-lg px-3 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '正面範例怎麼挑？' : 'How to Pick Positive Examples?'} icon="💡">
            <div className="mt-3 space-y-2">
              {(lang === 'zh' ? [
                '從你已知的相關 SR/MA 中選 3-5 篇（已閱讀過的最佳）',
                '加入 2-3 篇你知道相關的高品質 RCT',
                '如果有一篇「完美符合 PICOT」的文獻，一定要加入',
                '避免只加入同一組作者的文獻 — 多樣性讓模型更穩健',
                '如果不確定，先從少量範例開始，看結果再逐步增加',
              ] : [
                'Pick 3-5 relevant SRs/MAs you\'ve already read (known high-quality ones work best)',
                'Add 2-3 relevant high-quality RCTs you know',
                'If you have a "perfect PICOT match" article, definitely include it',
                'Avoid only including articles from the same author group — diversity makes the model more robust',
                'If unsure, start with a few examples, review results, then gradually add more',
              ]).map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg px-3 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '注意事項' : 'Caveats'} icon="⚠️">
            <div className="mt-3 space-y-2">
              {(lang === 'zh' ? [
                '⚠️ LitSuggest 不能替代人工篩選 — 是輔助而非取代',
                '⚠️ 上限 10,000 篇。如果搜尋結果超過此數，需要先縮小範圍',
                '⚠️ 需要 NCBI 帳號才能儲存專案和結果',
                '⚠️ 模型品質取決於你的範例品質 — 垃圾進垃圾出',
                '⚠️ 結果可重複（使用固定隨機種子），但更新 PubMed 資料可能導致微小差異',
              ] : [
                '⚠️ LitSuggest cannot replace manual screening — it\'s an aid, not a substitute',
                '⚠️ Maximum 10,000 articles. If results exceed this, narrow your search first',
                '⚠️ Requires NCBI account to save projects and results',
                '⚠️ Model quality depends on example quality — garbage in, garbage out',
                '⚠️ Results are reproducible (fixed random seed), but PubMed data updates may cause minor differences',
              ]).map((item, i) => (
                <div key={i} className="bg-amber-50/50 rounded-lg px-3 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      )}

      <div className="mt-8 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Tool:</strong> <a href="https://www.ncbi.nlm.nih.gov/research/litsuggest" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">ncbi.nlm.nih.gov/research/litsuggest</a>
          <br /><strong>Reference:</strong> Allot A, Lee K, Chen Q, Luo L, Lu Z. LitSuggest: a web-based system for literature recommendation and curation using machine learning. <em>Nucleic Acids Res</em> 2021;49(W1):W352–W358.
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <a href="/toolbox" className="text-sm text-teal-600 hover:text-teal-700 font-medium">← {lang === 'zh' ? '返回工具箱' : 'Back to Toolbox'}</a>
      </div>
    </div>
  );
}
