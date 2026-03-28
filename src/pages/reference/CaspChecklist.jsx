// src/pages/reference/CaspChecklist.jsx
// Interactive CASP-SR (Systematic Review) appraisal checklist for the EBMouse Toolbox
// Bilingual reference guide with scoring guidance, evidence prompts, and common pitfalls

import React, { useState } from 'react';
import { useLang } from '../../App';
import Hamster, { HamsterThinking, HamsterConcerned, HamsterCelebrating } from '../../components/Hamster';

// ─── Accordion ───
function Accordion({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-3 rounded-xl border overflow-hidden" style={{ borderColor: open ? '#0E7C8640' : '#E5E7EB' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50/50 transition-colors"
      >
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

// ─── Score badge ───
function ScoreBadge({ score }) {
  const config = {
    yes: { emoji: '😀', bg: '#D5F5E3', color: '#27AE60', label: 'Yes' },
    no: { emoji: '😟', bg: '#FADBD8', color: '#E74C3C', label: 'No' },
    uncertain: { emoji: '😐', bg: '#FEF9E7', color: '#F39C12', label: '?' },
  };
  const c = config[score];
  if (!c) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: c.bg, color: c.color }}>
      {c.emoji} {c.label}
    </span>
  );
}

// ─── Single CASP question card ───
function CaspQuestionCard({ q, lang }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-3 hover:shadow-sm transition-shadow">
      {/* Question header */}
      <button onClick={() => setOpen(!open)} className="w-full text-left px-4 py-3.5 flex items-start gap-3">
        <span className="flex-shrink-0 w-10 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold mt-0.5"
          style={{ background: q.sectionColor }}>
          {q.id}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 leading-relaxed">
            {lang === 'zh' ? q.questionZh : q.questionEn}
          </p>
          {q.sectionLabel && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium"
              style={{ background: q.sectionColor + '15', color: q.sectionColor }}>
              {lang === 'zh' ? q.sectionLabel.zh : q.sectionLabel.en}
            </span>
          )}
        </div>
        <svg className={`w-4 h-4 text-gray-300 flex-shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="px-4 pb-4 border-t border-gray-50 space-y-3">
          {/* What to look for */}
          <div className="mt-3">
            <p className="text-xs font-semibold text-teal-700 mb-1.5">
              {lang === 'zh' ? '🔍 在文獻中找什麼？' : '🔍 What to Look For'}
            </p>
            <ul className="space-y-1.5">
              {(lang === 'zh' ? q.lookForZh : q.lookForEn).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                  <span className="text-teal-400 mt-0.5 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Scoring guidance */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { score: 'yes', guideZh: q.guideYesZh, guideEn: q.guideYesEn },
              { score: 'no', guideZh: q.guideNoZh, guideEn: q.guideNoEn },
              { score: 'uncertain', guideZh: q.guideUncertainZh, guideEn: q.guideUncertainEn },
            ].map(({ score, guideZh, guideEn }) => (
              <div key={score} className="rounded-lg p-2.5" style={{ background: score === 'yes' ? '#D5F5E310' : score === 'no' ? '#FADBD810' : '#FEF9E710', border: `1px solid ${score === 'yes' ? '#D5F5E3' : score === 'no' ? '#FADBD8' : '#FEF9E7'}` }}>
                <div className="mb-1"><ScoreBadge score={score} /></div>
                <p className="text-xs text-gray-600 leading-relaxed">{lang === 'zh' ? guideZh : guideEn}</p>
              </div>
            ))}
          </div>

          {/* Common pitfall */}
          {q.pitfallZh && (
            <div className="flex items-start gap-2 bg-red-50/50 rounded-lg p-3">
              <HamsterConcerned size={24} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-red-700 mb-0.5">
                  {lang === 'zh' ? '⚠️ 常見錯誤' : '⚠️ Common Pitfall'}
                </p>
                <p className="text-xs text-red-600 leading-relaxed">
                  {lang === 'zh' ? q.pitfallZh : q.pitfallEn}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── CASP question data ───
const S = {
  validity: '#0E7C86',
  results: '#2980B9',
  applicability: '#8E44AD',
};

const caspQuestions = [
  {
    id: 'Q1',
    sectionColor: S.validity,
    sectionLabel: { zh: '效度 A — 研究問題', en: 'Validity A — Research Question' },
    questionZh: '是否明確提出研究問題？',
    questionEn: 'Was there a clearly focused research question?',
    lookForZh: [
      '是否以 PICO 格式呈現研究問題？',
      'Population、Intervention、Comparison、Outcome 是否都有明確定義？',
      '研究問題是否具體且可回答？',
    ],
    lookForEn: [
      'Is the question presented in PICO format?',
      'Are Population, Intervention, Comparison, and Outcome clearly defined?',
      'Is the question specific and answerable?',
    ],
    guideYesZh: '有清楚的 PICO，各要素都有明確定義。',
    guideYesEn: 'Clear PICO with all elements well-defined.',
    guideNoZh: '研究問題模糊、缺少 PICO 要素。',
    guideNoEn: 'Vague question, missing PICO elements.',
    guideUncertainZh: 'PICO 部分定義但不完整。',
    guideUncertainEn: 'PICO partially defined but incomplete.',
    pitfallZh: '不要只看標題和摘要就判斷。要確認方法學段落中是否有明確的納入/排除標準來反映 PICO。',
    pitfallEn: 'Don\'t judge from title/abstract alone. Check methods section for explicit inclusion/exclusion criteria reflecting the PICO.',
  },
  {
    id: 'Q2',
    sectionColor: S.validity,
    questionZh: '是否搜尋合適的研究設計？',
    questionEn: 'Did they search for appropriate study designs?',
    lookForZh: [
      '治療型問題 → 是否以 RCT 為主要搜尋目標？',
      '是否說明了為什麼選擇這種研究設計？',
      '如果納入了觀察性研究，是否有說明理由？',
    ],
    lookForEn: [
      'Treatment question → did they primarily search for RCTs?',
      'Did they explain why they chose this study design?',
      'If observational studies were included, was a rationale given?',
    ],
    guideYesZh: '明確搜尋符合問題類型的最佳研究設計（治療型 = RCT）。',
    guideYesEn: 'Clearly searched for the best design for the question type (treatment = RCTs).',
    guideNoZh: '搜尋了不適當的研究設計，或沒有說明設計類型。',
    guideNoEn: 'Searched inappropriate designs or didn\'t specify design type.',
    guideUncertainZh: '有提及但不夠明確。',
    guideUncertainEn: 'Mentioned but not clearly specified.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q3a',
    sectionColor: S.validity,
    questionZh: '文獻搜尋是否完整？',
    questionEn: 'Was the literature search comprehensive?',
    lookForZh: [
      '搜尋了幾個資料庫？（至少 2 個，最好 3 個以上）',
      '是否有語言限制？（只搜英文 = 潛在偏誤）',
      '是否搜尋了灰色文獻（會議摘要、學位論文、試驗登錄）？',
      '搜尋時間範圍是否合理？',
      '是否使用了 MeSH 和自由文字（free text）搜尋？',
    ],
    lookForEn: [
      'How many databases searched? (At least 2, ideally 3+)',
      'Any language restrictions? (English-only = potential bias)',
      'Grey literature searched? (conference abstracts, dissertations, trial registries)',
      'Reasonable time range?',
      'Both MeSH and free text used?',
    ],
    guideYesZh: '多個資料庫 + 無語言限制 + 搜尋灰色文獻 + 合理時間範圍。',
    guideYesEn: 'Multiple databases + no language restriction + grey literature + reasonable timeframe.',
    guideNoZh: '只搜尋一個資料庫、有嚴格語言限制、或時間範圍太短。',
    guideNoEn: 'Single database, strict language limits, or too narrow timeframe.',
    guideUncertainZh: '搜尋策略描述不完整，無法確定。',
    guideUncertainEn: 'Search strategy description incomplete, can\'t determine.',
    pitfallZh: '這是最常被扣分的題目。只搜英文文獻是常見問題——即使大多數重要研究都是英文的，語言限制仍然是方法學上的缺陷。',
    pitfallEn: 'Most commonly penalized question. English-only is a common issue — even if most important studies are in English, language restriction is still a methodological flaw.',
  },
  {
    id: 'Q3b',
    sectionColor: S.validity,
    questionZh: '文獻篩選是否適當？',
    questionEn: 'Was study selection appropriate?',
    lookForZh: [
      '是否由兩位或以上的審查者獨立篩選？',
      '分歧如何解決？（討論、第三方仲裁）',
      '是否有明確的納入/排除標準？',
    ],
    lookForEn: [
      'Were two or more reviewers screening independently?',
      'How were disagreements resolved? (Discussion, third reviewer)',
      'Were inclusion/exclusion criteria explicit?',
    ],
    guideYesZh: '兩人獨立篩選 + 有分歧處理機制 + 明確的標準。',
    guideYesEn: 'Two independent reviewers + disagreement resolution + explicit criteria.',
    guideNoZh: '單人篩選或未說明篩選流程。',
    guideNoEn: 'Single reviewer or screening process not described.',
    guideUncertainZh: '有提及但細節不足。',
    guideUncertainEn: 'Mentioned but lacking detail.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q3c',
    sectionColor: S.validity,
    questionZh: '文獻納入標準是否合理？',
    questionEn: 'Were inclusion criteria reasonable?',
    lookForZh: [
      '納入標準是否與研究問題一致？',
      '排除標準是否合理且不會造成選擇性偏差？',
      '是否有遺漏重要研究的風險？',
    ],
    lookForEn: [
      'Do inclusion criteria align with the research question?',
      'Are exclusion criteria reasonable and not causing selection bias?',
      'Is there risk of missing important studies?',
    ],
    guideYesZh: '標準清楚、與 PICO 一致、排除標準合理。',
    guideYesEn: 'Clear criteria, PICO-aligned, reasonable exclusions.',
    guideNoZh: '標準不清或可能排除重要研究。',
    guideNoEn: 'Unclear criteria or may have excluded important studies.',
    guideUncertainZh: '部分合理但有疑慮。',
    guideUncertainEn: 'Partially reasonable but with concerns.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q3d',
    sectionColor: S.validity,
    questionZh: '檢索策略是否充分？（總結）',
    questionEn: 'Was the overall search strategy adequate?',
    lookForZh: [
      '綜合 Q3a–Q3c 的判斷。',
      '整體搜尋策略是否可能找到所有相關的初級研究？',
    ],
    lookForEn: [
      'Synthesize judgments from Q3a–Q3c.',
      'Is the overall strategy likely to have found all relevant primary studies?',
    ],
    guideYesZh: 'Q3a–Q3c 整體表現良好。',
    guideYesEn: 'Good performance across Q3a–Q3c.',
    guideNoZh: 'Q3a–Q3c 有多個嚴重問題。',
    guideNoEn: 'Multiple serious issues across Q3a–Q3c.',
    guideUncertainZh: '有些面向好、有些不確定。',
    guideUncertainEn: 'Some aspects good, some uncertain.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q4',
    sectionColor: S.validity,
    questionZh: '是否評估初級研究的效度？',
    questionEn: 'Was study validity (risk of bias) assessed?',
    lookForZh: [
      '使用了什麼誤差風險評估工具？（Cochrane RoB 2、ROBUST-RCT 等）',
      '是否由兩位審查者獨立評估？',
      '評估結果是否有呈現（表格或圖）？',
      '分歧如何處理？',
    ],
    lookForEn: [
      'What risk of bias tool was used? (Cochrane RoB 2, ROBUST-RCT, etc.)',
      'Were two reviewers assessing independently?',
      'Are results presented (table or figure)?',
      'How were disagreements handled?',
    ],
    guideYesZh: '使用了適當的工具 + 兩人獨立評估 + 結果有呈現。',
    guideYesEn: 'Appropriate tool used + two independent assessors + results presented.',
    guideNoZh: '未評估誤差風險或未說明使用的工具。',
    guideNoEn: 'Risk of bias not assessed or tool not specified.',
    guideUncertainZh: '有提及但細節不完整。',
    guideUncertainEn: 'Mentioned but incomplete details.',
    pitfallZh: '要具體寫出工具名稱。例如答「是」必須說明「使用 Cochrane risk of bias tool 由兩位作者獨立評估」，不能只寫「有評估品質」。',
    pitfallEn: 'Specify the tool name. "Yes" must state e.g. "Used Cochrane RoB tool with two independent assessors" — not just "quality was assessed."',
  },
  {
    id: 'Q5a',
    sectionColor: S.results,
    sectionLabel: { zh: '效度 B — 結果', en: 'Validity B — Results' },
    questionZh: '資料擷取是否適當？',
    questionEn: 'Was data extraction appropriate?',
    lookForZh: [
      '是否由兩位審查者獨立擷取資料？',
      '分歧如何解決？',
      '擷取了哪些資料項目？',
    ],
    lookForEn: [
      'Were two reviewers extracting independently?',
      'How were disagreements resolved?',
      'What data items were extracted?',
    ],
    guideYesZh: '兩人獨立擷取 + 有標準化表格 + 分歧處理機制。',
    guideYesEn: 'Two independent extractors + standardized form + disagreement resolution.',
    guideNoZh: '單人擷取或未描述流程。',
    guideNoEn: 'Single extractor or process not described.',
    guideUncertainZh: '有提及但不完整。',
    guideUncertainEn: 'Mentioned but incomplete.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q5b',
    sectionColor: S.results,
    questionZh: '資料呈現是否適當？',
    questionEn: 'Was data presentation appropriate?',
    lookForZh: [
      '是否有各研究的特性摘要表格？',
      '是否有森林圖（forest plot）？',
      '呈現的資料是否足以讓讀者驗證結果？',
    ],
    lookForEn: [
      'Is there a characteristics-of-studies table?',
      'Is there a forest plot?',
      'Is enough data presented for readers to verify results?',
    ],
    guideYesZh: '有完整的研究特性表 + 森林圖 + 數據透明。',
    guideYesEn: 'Complete characteristics table + forest plot + transparent data.',
    guideNoZh: '缺少重要圖表或數據不完整。',
    guideNoEn: 'Missing key figures/tables or incomplete data.',
    guideUncertainZh: '有部分圖表但不夠完整。',
    guideUncertainEn: 'Some figures/tables but not comprehensive.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q6',
    sectionColor: S.results,
    questionZh: '合併分析是否適當？',
    questionEn: 'Was data combination (meta-analysis) appropriate?',
    lookForZh: [
      '是否進行統合分析？如果沒有，是否說明理由？',
      '使用了哪種模型？（固定效果 vs. 隨機效果）',
      '異質性如何處理？（I² 值、Q 檢定）',
      '如果 I² 高，是否進行了敏感度分析？',
    ],
    lookForEn: [
      'Was meta-analysis performed? If not, was rationale given?',
      'Which model? (Fixed vs. random effects)',
      'How was heterogeneity handled? (I², Q test)',
      'If I² was high, was sensitivity analysis done?',
    ],
    guideYesZh: '模型選擇合理 + 異質性有處理 + 敏感度分析有做。',
    guideYesEn: 'Appropriate model + heterogeneity addressed + sensitivity analysis done.',
    guideNoZh: '不該合併的研究被合併了，或異質性被忽略。',
    guideNoEn: 'Studies that shouldn\'t be pooled were pooled, or heterogeneity ignored.',
    guideUncertainZh: '有合併但處理異質性的方法不夠充分。',
    guideUncertainEn: 'Pooled but heterogeneity handling insufficient.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q6-1',
    sectionColor: S.results,
    questionZh: '次族群分析是否適當？',
    questionEn: 'Was subgroup analysis appropriate?',
    lookForZh: [
      '是否事先規劃（a priori）？',
      '假設數量是否合理（≤ 3 個）？',
      '是否有交互作用檢定（test for interaction）？',
      '是否處理多重比較問題？',
    ],
    lookForEn: [
      'Was it planned a priori?',
      'Reasonable number of hypotheses (≤ 3)?',
      'Was there a test for interaction?',
      'Was multiple testing addressed?',
    ],
    guideYesZh: '事先規劃 + 少量假設 + 有交互作用檢定。',
    guideYesEn: 'Pre-specified + few hypotheses + interaction test done.',
    guideNoZh: '事後分析、大量假設、或沒有交互作用檢定。',
    guideNoEn: 'Post-hoc, many hypotheses, or no interaction test.',
    guideUncertainZh: '有做但無法確認是否事先規劃。',
    guideUncertainEn: 'Done but unclear if pre-specified.',
    pitfallZh: '不要看到有做次族群分析就給「是」。必須確認是 a priori 且有 test for interaction。如果文獻沒提到這些，應該答「不確定」。',
    pitfallEn: 'Don\'t mark "Yes" just because subgroup analysis was done. Must confirm it was a priori with a test for interaction. If not mentioned, answer "Uncertain."',
  },
  {
    id: 'Q6-2',
    sectionColor: S.results,
    questionZh: '統合迴歸分析是否適當？',
    questionEn: 'Was meta-regression appropriate?',
    lookForZh: [
      '是否有足夠的研究數量進行迴歸？（通常 ≥ 10 篇）',
      '共變數是否事先規劃？',
      '結果是否合理詮釋？',
    ],
    lookForEn: [
      'Enough studies for regression? (Usually ≥ 10)',
      'Were covariates pre-specified?',
      'Were results reasonably interpreted?',
    ],
    guideYesZh: '研究數量足夠 + 共變數事先規劃 + 合理詮釋。',
    guideYesEn: 'Sufficient studies + pre-specified covariates + reasonable interpretation.',
    guideNoZh: '研究太少、共變數事後選擇、或過度詮釋。',
    guideNoEn: 'Too few studies, post-hoc covariates, or overinterpretation.',
    guideUncertainZh: '有做但資訊不足以判斷品質。',
    guideUncertainEn: 'Done but insufficient info to judge quality.',
    pitfallZh: '和 Q6-1 相同的邏輯——如果文獻沒有明確提到事先規劃，不要輕率給「是」。',
    pitfallEn: 'Same logic as Q6-1 — if not explicitly stated as pre-planned, don\'t hastily mark "Yes."',
  },
  {
    id: 'Q7',
    sectionColor: S.applicability,
    sectionLabel: { zh: '臨床適用性', en: 'Clinical Applicability' },
    questionZh: '是否提及研究限制？',
    questionEn: 'Were limitations discussed?',
    lookForZh: [
      '作者是否討論了系統性回顧本身的限制？',
      '是否討論了納入研究的限制？',
      '是否坦承不確定性？',
    ],
    lookForEn: [
      'Did authors discuss limitations of the review itself?',
      'Did they discuss limitations of included studies?',
      'Did they acknowledge uncertainties?',
    ],
    guideYesZh: '有系統性地討論回顧和納入研究的限制。',
    guideYesEn: 'Systematically discussed limitations of both the review and included studies.',
    guideNoZh: '完全沒有提及限制。',
    guideNoEn: 'No limitations mentioned at all.',
    guideUncertainZh: '有提及但過於簡略。',
    guideUncertainEn: 'Mentioned but too brief.',
    pitfallZh: null, pitfallEn: null,
  },
];

// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
export default function CaspChecklist() {
  const { lang } = useLang();
  const [activeSection, setActiveSection] = useState('all');

  const sections = [
    { id: 'all', zh: '全部', en: 'All', icon: '📋' },
    { id: 'validity', zh: '效度', en: 'Validity', icon: '🔬' },
    { id: 'results', zh: '結果', en: 'Results', icon: '📊' },
    { id: 'applicability', zh: '適用性', en: 'Applicability', icon: '🎯' },
  ];

  const sectionMap = {
    validity: S.validity,
    results: S.results,
    applicability: S.applicability,
  };

  const filteredQuestions = activeSection === 'all'
    ? caspQuestions
    : caspQuestions.filter(q => q.sectionColor === sectionMap[activeSection]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <HamsterThinking size={48} />
        <div>
          <h1 className="font-bold text-3xl" style={{ color: '#0E7C86' }}>
            CASP-SR {lang === 'zh' ? '評讀清單' : 'Checklist'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {lang === 'zh'
              ? '系統性回顧的批判性評讀指引 — 逐題指導 + 評分標準 + 常見錯誤'
              : 'Critical appraisal guide for systematic reviews — question-by-question guidance + scoring criteria + pitfalls'}
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-5 mb-6">
        <h2 className="font-bold text-base text-teal-800 mb-2">
          {lang === 'zh' ? 'CASP 是什麼？' : 'What is CASP?'}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {lang === 'zh'
            ? 'CASP（Critical Appraisal Skills Programme）是最常用的文獻評讀工具。SR（Systematic Review）版本包含 13 個問題，分為三個區塊：研究效度、結果呈現、臨床適用性。每題用 😀（是）、😟（否）、😐（不確定）三種表情評分。'
            : 'CASP (Critical Appraisal Skills Programme) is the most widely used appraisal tool. The SR (Systematic Review) version has 13 questions across three sections: validity, results, and applicability. Each scored with 😀 (Yes), 😟 (No), 😐 (Uncertain).'}
        </p>
      </div>

      {/* Key principles */}
      <Accordion title={lang === 'zh' ? '評讀原則：先讀再答，附上證據' : 'Appraisal Principles: Read First, Cite Evidence'} icon="⭐" defaultOpen>
        <div className="mt-3 space-y-2">
          {[
            { zh: '每一題都要從文獻中找到具體的句子或段落作為支持證據，不能只給答案。', en: 'Every answer must be supported by specific sentences or sections from the article — don\'t just give an answer.' },
            { zh: '如果文獻沒有明確提到某項資訊，應該答「不確定」而非「是」。', en: 'If the article doesn\'t explicitly mention something, answer "Uncertain" — not "Yes."' },
            { zh: '競賽中需要展示人類評分和 AI 評分的比較，計算 Cohen\'s Kappa 一致性。', en: 'In competitions, show human vs. AI scoring comparison and calculate Cohen\'s Kappa agreement.' },
            { zh: '不同結果指標可能有不同的誤差風險（如：死亡率 vs. 生活品質），要分開考量。', en: 'Different outcomes may have different risk of bias (e.g., mortality vs. quality of life) — consider separately.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 bg-teal-50/40 rounded-lg px-3 py-2">
              <span className="text-teal-500 mt-0.5 flex-shrink-0">✦</span>
              <p className="text-sm text-gray-700 leading-relaxed">{lang === 'zh' ? item.zh : item.en}</p>
            </div>
          ))}
        </div>
      </Accordion>

      {/* Section filter */}
      <div className="flex gap-1.5 mb-5 mt-6">
        {sections.map(({ id, zh, en, icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
              activeSection === id
                ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-200'
                : 'bg-white text-gray-500 border-gray-200 hover:border-teal-300'
            }`}
          >
            {icon} {lang === 'zh' ? zh : en}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div>
        {filteredQuestions.map(q => (
          <CaspQuestionCard key={q.id} q={q} lang={lang} />
        ))}
      </div>

      {/* Kappa guide */}
      <Accordion title={lang === 'zh' ? "Cohen's Kappa 一致性判讀" : "Cohen's Kappa Interpretation"} icon="🤝">
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: '#E8F6F7' }}>
                <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">Kappa</th>
                <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '一致性程度' : 'Agreement Level'}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { range: '< 0.20', zh: '極差', en: 'Poor' },
                { range: '0.21 – 0.40', zh: '尚可', en: 'Fair' },
                { range: '0.41 – 0.60', zh: '中等', en: 'Moderate' },
                { range: '0.61 – 0.80', zh: '良好', en: 'Substantial' },
                { range: '0.81 – 1.00', zh: '幾乎完美', en: 'Almost Perfect' },
              ].map(({ range, zh, en }) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border border-gray-200 font-mono text-sm">{range}</td>
                  <td className="px-3 py-2 border border-gray-200 text-gray-600">{lang === 'zh' ? zh : en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          {lang === 'zh'
            ? '💡 競賽中 Kappa = 1.0 代表人類和 AI 評分完全一致。如果不一致，要說明為什麼你認為你的判斷更合理。'
            : '💡 In competitions, Kappa = 1.0 means perfect human-AI agreement. If disagreements exist, explain why your judgment is more appropriate.'}
        </p>
      </Accordion>

      {/* Three-section overview */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { color: S.validity, zh: '效度 (Q1–Q4)', en: 'Validity (Q1–Q4)', descZh: '研究的方法學是否嚴謹？結果值得信賴嗎？', descEn: 'Is the methodology rigorous? Can we trust the results?', qs: 'Q1, Q2, Q3a–d, Q4' },
          { color: S.results, zh: '結果 (Q5–Q6)', en: 'Results (Q5–Q6)', descZh: '資料擷取和合併分析是否正確？', descEn: 'Were data extraction and synthesis done correctly?', qs: 'Q5a, Q5b, Q6, Q6-1, Q6-2' },
          { color: S.applicability, zh: '適用性 (Q7)', en: 'Applicability (Q7)', descZh: '結果能應用到你的臨床案例嗎？', descEn: 'Can results be applied to your clinical case?', qs: 'Q7' },
        ].map(({ color, zh, en, descZh, descEn, qs }) => (
          <div key={zh} className="rounded-xl p-4 border" style={{ borderColor: color + '40', background: color + '08' }}>
            <p className="font-bold text-sm mb-1" style={{ color }}>{lang === 'zh' ? zh : en}</p>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">{lang === 'zh' ? descZh : descEn}</p>
            <p className="text-xs text-gray-400">{qs}</p>
          </div>
        ))}
      </div>

      {/* Reference */}
      <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Source:</strong> Critical Appraisal Skills Programme. CASP Systematic Review Checklist. <a href="https://casp-uk.net" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">casp-uk.net</a>
        </p>
      </div>

      {/* Back link */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <a href="/toolbox" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
          ← {lang === 'zh' ? '返回工具箱' : 'Back to Toolbox'}
        </a>
      </div>
    </div>
  );
}
