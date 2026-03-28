// src/pages/reference/EtdFramework.jsx
// Evidence-to-Decision (EtD) Framework interactive guide
// Based on Core GRADE Paper 7 (BMJ 2025;389:e083867) + Supplementary Appendix 1

import React, { useState } from 'react';
import { useLang } from '../../App';
import { HamsterThinking, HamsterCelebrating, HamsterConcerned } from '../../components/Hamster';

// ─── Accordion ───
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

// ─── Step flow ───
function StepFlow({ steps, lang }) {
  return (
    <div className="flex flex-col gap-2 my-4">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: '#0E7C86' }}>
              {i + 1}
            </div>
            {i < steps.length - 1 && <div className="w-0.5 h-6 bg-teal-200 mt-1" />}
          </div>
          <div className="pt-1">
            <p className="text-sm text-gray-700 leading-relaxed">{lang === 'zh' ? step.zh : step.en}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Factor card for EtD ───
function FactorCard({ icon, titleZh, titleEn, isPrimary, questionsZh, questionsEn, impactZh, impactEn, lang }) {
  const [open, setOpen] = useState(false);
  const borderColor = isPrimary ? '#0E7C86' : '#8E44AD';
  const bgColor = isPrimary ? '#E8F6F7' : '#F5EFF8';
  const badge = isPrimary
    ? { zh: '主要考量', en: 'Primary', bg: '#0E7C86' }
    : { zh: '次要考量', en: 'Secondary', bg: '#8E44AD' };

  return (
    <div className="rounded-xl border overflow-hidden mb-3" style={{ borderColor: borderColor + '30' }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-gray-50/30 transition-colors">
        <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-800 text-sm">{lang === 'zh' ? titleZh : titleEn}</span>
            <span className="px-2 py-0.5 rounded-full text-xs text-white font-bold" style={{ background: badge.bg }}>
              {lang === 'zh' ? badge.zh : badge.en}
            </span>
          </div>
        </div>
        <svg className={`w-4 h-4 text-gray-300 flex-shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t space-y-3" style={{ borderColor: borderColor + '15' }}>
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 mb-1.5">{lang === 'zh' ? '要考量的問題' : 'Questions to Consider'}</p>
            <ul className="space-y-1">
              {(lang === 'zh' ? questionsZh : questionsEn).map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                  <span className="text-gray-300 mt-0.5 flex-shrink-0">•</span>{q}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg p-3" style={{ background: bgColor }}>
            <p className="text-xs font-semibold mb-1" style={{ color: borderColor }}>
              {lang === 'zh' ? '↗ 對推薦方向和強度的影響' : '↗ Impact on Direction & Strength'}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{lang === 'zh' ? impactZh : impactEn}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════
export default function EtdFramework() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', zh: '總覽', en: 'Overview', icon: '🗺️' },
    { id: 'factors', zh: '七大考量', en: '7 Factors', icon: '⚖️' },
    { id: 'strength', zh: '推薦強度', en: 'Strength', icon: '💪' },
    { id: 'mid', zh: 'MID 與價值偏好', en: 'MID & Values', icon: '🎯' },
    { id: 'presentation', zh: '推薦呈現', en: 'Presentation', icon: '📝' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <HamsterCelebrating size={48} />
        <div>
          <h1 className="font-bold text-3xl" style={{ color: '#0E7C86' }}>
            {lang === 'zh' ? '證據到建議框架' : 'Evidence-to-Decision Framework'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {lang === 'zh'
              ? '根據 Core GRADE Paper 7（BMJ 2025;389:e083867）整理'
              : 'Based on Core GRADE Paper 7 (BMJ 2025;389:e083867)'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map(({ id, zh, en, icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
              activeTab === id
                ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-200'
                : 'bg-white text-gray-500 border-gray-200 hover:border-teal-300 hover:text-teal-600'
            }`}>
            <span className="mr-1">{icon}</span>{lang === 'zh' ? zh : en}
          </button>
        ))}
      </div>

      {/* ═══ TAB: Overview ═══ */}
      {activeTab === 'overview' && (
        <div>
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-base text-teal-800 mb-2">
              {lang === 'zh' ? '從證據到建議：最後一哩路' : 'From Evidence to Recommendations: The Final Mile'}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {lang === 'zh'
                ? '完成系統性回顧和 GRADE 證據確定性評估後，指引制定小組需要做最終決策：推薦還是不推薦這個治療？推薦力度是「強烈」還是「有條件」？EtD 框架提供了一個系統化的流程來做出這個決定。'
                : 'After completing the systematic review and GRADE certainty assessment, the guideline panel must make the final call: recommend or not? Strong or conditional? The EtD framework provides a systematic process for this decision.'}
            </p>
          </div>

          {/* Four categories */}
          <h3 className="font-bold text-gray-800 mb-3">
            {lang === 'zh' ? '四種推薦類型' : 'Four Recommendation Categories'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { zh: '強烈反對', en: 'Strong Against', color: '#E74C3C', descZh: '幾乎所有知情病人都會選擇不接受治療', descEn: 'Almost all informed patients would decline' },
              { zh: '有條件反對', en: 'Conditional Against', color: '#E67E22', descZh: '多數知情病人會選擇不接受，但有些會選擇接受', descEn: 'Most would decline, but many would accept' },
              { zh: '有條件贊成', en: 'Conditional For', color: '#F39C12', descZh: '多數知情病人會選擇接受，但有些會選擇不接受', descEn: 'Most would accept, but many would decline' },
              { zh: '強烈贊成', en: 'Strong For', color: '#27AE60', descZh: '幾乎所有知情病人都會選擇接受治療', descEn: 'Almost all informed patients would accept' },
            ].map(({ zh, en, color, descZh, descEn }) => (
              <div key={en} className="rounded-xl p-3 text-center border" style={{ borderColor: color + '40' }}>
                <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: color }}>
                  <span className="text-white text-xs font-bold">{en.includes('Strong') ? '!' : '?'}</span>
                </div>
                <p className="text-xs font-bold mb-1" style={{ color }}>{lang === 'zh' ? zh : en}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{lang === 'zh' ? descZh : descEn}</p>
              </div>
            ))}
          </div>

          {/* Decision flow */}
          <Accordion title={lang === 'zh' ? '決策流程圖' : 'Decision Flow'} icon="🔄" defaultOpen>
            <div className="mt-3">
              <StepFlow lang={lang} steps={[
                { zh: '決定觀點：個人病人觀點（必要）+ 族群觀點（選擇性）', en: 'Decide perspective: individual patient (always) + population (optionally)' },
                { zh: '回顧 MID 相關證據，為每個重要結果指標設定 MID', en: 'Review MID evidence, set MIDs for each critical and important outcome' },
                { zh: '權衡利益、傷害與負擔：哪一方更大？', en: 'Balance benefits, harms, and burdens: which side is larger?' },
                { zh: '考慮證據確定性：高/中等 → 可以強烈推薦；低/很低 → 通常有條件推薦', en: 'Consider certainty: High/Moderate → can be strong; Low/Very low → usually conditional' },
                { zh: '考慮病人價值偏好：變異大嗎？偏好明確嗎？', en: 'Consider patient values: is there variability? Are preferences clear?' },
                { zh: '如果需要族群觀點：額外考慮成本、可行性、可接受度、公平性', en: 'If population perspective needed: additionally consider cost, feasibility, acceptability, equity' },
                { zh: '決定推薦方向（贊成/反對）和強度（強烈/有條件）', en: 'Decide recommendation direction (for/against) and strength (strong/conditional)' },
              ]} />
            </div>
          </Accordion>

          {/* Key principle */}
          <Accordion title={lang === 'zh' ? '核心原則' : 'Core Principle'} icon="💡">
            <div className="mt-3 space-y-3">
              <div className="flex items-start gap-3 bg-teal-50/50 rounded-lg p-3">
                <span className="text-lg mt-0.5">🔑</span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {lang === 'zh'
                    ? '想像一大群「完全知情」的病人。如果幾乎所有人都會做同樣的選擇 → 強烈推薦。如果多數人會選擇但仍有相當比例的人選擇另一個方案 → 有條件推薦（需要共同決策 shared decision making）。'
                    : 'Imagine a large group of "fully informed" individuals. If almost all would make the same choice → strong recommendation. If most would choose it but an appreciable minority would choose otherwise → conditional recommendation (requires shared decision making).'}
                </p>
              </div>
            </div>
          </Accordion>
        </div>
      )}

      {/* ═══ TAB: 7 Factors ═══ */}
      {activeTab === 'factors' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            ⚖️ {lang === 'zh' ? '七大考量因素' : 'Seven Considerations'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '前三個是主要考量（任何推薦都要考慮），後四個是次要考量（族群觀點時特別重要）。'
              : 'The first three are primary (always considered); the last four are secondary (especially relevant from a population perspective).'}
          </p>

          {/* Primary */}
          <p className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-2 mt-4">
            {lang === 'zh' ? '── 主要考量（必要）──' : '── Primary Factors (Always) ──'}
          </p>

          <FactorCard icon="⚖️" isPrimary lang={lang}
            titleZh="利益、傷害與負擔" titleEn="Benefits, Harms, and Burdens"
            questionsZh={['利益有多大？', '傷害和負擔有多大？', '淨效益明顯偏向哪一方？']}
            questionsEn={['How large are the benefits?', 'How large are the harms and burdens?', 'Which side does the net benefit clearly favor?']}
            impactZh="利益越大 → 越可能推薦、越可能是強烈推薦。傷害和負擔越大 → 越可能反對。淨效益明顯偏向一方 → 強烈推薦。"
            impactEn="Larger benefits → more likely to recommend, more likely strong. Larger harms/burdens → more likely against. Clear net benefit → strong recommendation."
          />

          <FactorCard icon="📊" isPrimary lang={lang}
            titleZh="證據確定性" titleEn="Certainty of Evidence"
            questionsZh={['每個重要結果指標的 GRADE 確定性等級是什麼？', '整體確定性（取最低的重要結果指標）是多少？']}
            questionsEn={['What is the GRADE certainty for each critical outcome?', 'What is the overall certainty (lowest among critical outcomes)?']}
            impactZh="確定性越高 → 越可能做出強烈推薦。高/中等確定性通常支持強烈推薦。低/很低確定性在幾乎所有情況下只能做有條件推薦。"
            impactEn="Higher certainty → more likely strong recommendation. High/moderate often justifies strong. Low/very low mandates conditional in almost all situations."
          />

          <FactorCard icon="❤️" isPrimary lang={lang}
            titleZh="價值觀與偏好" titleEn="Values and Preferences"
            questionsZh={[
              '典型病人的價值觀和偏好是什麼？',
              '病人如何看待各個利益和傷害結果指標的重要性？',
              '病人之間的價值觀變異程度有多大？',
              '小組對病人價值偏好的判斷有多確定？',
            ]}
            questionsEn={[
              'What are typical patients\' values and preferences?',
              'How do patients judge the importance of each benefit/harm outcome?',
              'How much do patients vary in their values?',
              'How certain is the panel about patients\' values and preferences?',
            ]}
            impactZh="病人越重視利益 → 越傾向推薦。病人越重視避免傷害 → 越傾向反對。價值觀變異越小、確定性越高 → 越可能強烈推薦。"
            impactEn="More patients value benefits → more likely to recommend. More patients value avoiding harms → more likely against. Less variability and more certainty → more likely strong."
          />

          {/* Secondary */}
          <p className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-2 mt-6">
            {lang === 'zh' ? '── 次要考量（族群觀點）──' : '── Secondary Factors (Population) ──'}
          </p>

          <FactorCard icon="💰" isPrimary={false} lang={lang}
            titleZh="資源與成本效益" titleEn="Resources and Cost-Effectiveness"
            questionsZh={['需要什麼資源？', '介入措施相比對照組是否有重要的成本或節省？', '成本和節省與利益和傷害的關係是什麼？']}
            questionsEn={['What resources are required?', 'Would implementation lead to important costs or savings?', 'How do costs/savings relate to benefits and harms?']}
            impactZh="成本越低、成本效益越好 → 越可能推薦且為強烈推薦。"
            impactEn="Lower costs and greater cost-effectiveness → more likely to recommend, and more likely strong."
          />

          <FactorCard icon="🔧" isPrimary={false} lang={lang}
            titleZh="可行性" titleEn="Feasibility"
            questionsZh={['在臨床現場執行這個介入措施是否可行？', '介入措施和對照組的相對可行性如何？']}
            questionsEn={['Is it feasible to implement the intervention?', 'What is the relative feasibility of intervention vs. comparator?']}
            impactZh="越可行 → 越可能推薦。可行性考量也可以影響實施建議（如何推動）。"
            impactEn="More feasible → more likely to recommend. Feasibility also shapes implementation guidance."
          />

          <FactorCard icon="👥" isPrimary={false} lang={lang}
            titleZh="可接受度" titleEn="Acceptability"
            questionsZh={['病人、臨床醫師和其他利益關係者是否能接受？', '介入措施和對照組的相對可接受度如何？']}
            questionsEn={['Is it acceptable to patients, clinicians, and stakeholders?', 'What is the relative acceptability of intervention vs. comparator?']}
            impactZh="越多利益關係者接受 → 越可能推薦。"
            impactEn="More acceptable → more likely to recommend."
          />

          <FactorCard icon="🌍" isPrimary={false} lang={lang}
            titleZh="公平性" titleEn="Equity"
            questionsZh={['實施介入措施相比對照組，對健康公平性會有什麼影響？']}
            questionsEn={['What would be the impact on health equity?']}
            impactZh="越能增進公平性 → 越可能推薦。公平性考量也可以影響實施建議。"
            impactEn="More equity-promoting → more likely to recommend. Equity also shapes implementation guidance."
          />
        </div>
      )}

      {/* ═══ TAB: Strength ═══ */}
      {activeTab === 'strength' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            💪 {lang === 'zh' ? '推薦強度的判定' : 'Determining Recommendation Strength'}
          </h2>

          {/* Certainty × Strength matrix */}
          <Accordion title={lang === 'zh' ? '證據確定性 × 推薦強度的對應關係' : 'Certainty × Strength Mapping'} icon="📐" defaultOpen>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ background: '#E8F6F7' }}>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '證據確定性' : 'Certainty'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '淨效益明顯' : 'Clear Net Benefit'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '淨效益接近平衡' : 'Closely Balanced'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border border-gray-200 font-medium">
                      {lang === 'zh' ? '高 / 中等' : 'High / Moderate'}
                    </td>
                    <td className="px-3 py-2 border border-gray-200">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: '#27AE60' }}>
                        {lang === 'zh' ? '→ 強烈推薦' : '→ Strong'}
                      </span>
                    </td>
                    <td className="px-3 py-2 border border-gray-200">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: '#F39C12' }}>
                        {lang === 'zh' ? '→ 有條件推薦' : '→ Conditional'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-gray-200 font-medium">
                      {lang === 'zh' ? '低 / 很低' : 'Low / Very Low'}
                    </td>
                    <td className="px-3 py-2 border border-gray-200" colSpan={2}>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: '#F39C12' }}>
                        {lang === 'zh' ? '→ 有條件推薦（幾乎所有情況）' : '→ Conditional (almost always)'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {lang === 'zh' ? '例外：極端情境才可能強烈推薦' : 'Exception: strong only in exceptional circumstances'}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Accordion>

          {/* Strong vs Conditional implications */}
          <Accordion title={lang === 'zh' ? '強烈 vs 有條件推薦的實務意義' : 'Practical Implications: Strong vs Conditional'} icon="🏥" defaultOpen>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl p-4 border-2" style={{ borderColor: '#27AE6040', background: '#27AE6008' }}>
                <p className="font-bold text-sm mb-2" style={{ color: '#27AE60' }}>
                  {lang === 'zh' ? '強烈推薦 (We recommend)' : 'Strong (We recommend)'}
                </p>
                <ul className="space-y-1.5 text-xs text-gray-600 leading-relaxed">
                  {(lang === 'zh' ? [
                    '對臨床醫師：大多數病人應接受此治療',
                    '對病人：幾乎所有知情病人都會選擇這個',
                    '對政策制定者：可以作為品質指標或績效評量',
                    '不需要做共同決策（偏好一致）',
                  ] : [
                    'For clinicians: most patients should receive this treatment',
                    'For patients: almost all informed patients would choose this',
                    'For policymakers: can be adopted as quality indicator',
                    'Shared decision making not required (preferences uniform)',
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5"><span className="text-green-400">✓</span>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-4 border-2" style={{ borderColor: '#F39C1240', background: '#F39C1208' }}>
                <p className="font-bold text-sm mb-2" style={{ color: '#F39C12' }}>
                  {lang === 'zh' ? '有條件推薦 (We suggest)' : 'Conditional (We suggest)'}
                </p>
                <ul className="space-y-1.5 text-xs text-gray-600 leading-relaxed">
                  {(lang === 'zh' ? [
                    '對臨床醫師：多數病人偏好此選擇，但需確認個人偏好',
                    '對病人：大部分人會選擇，但你的選擇取決於個人價值觀',
                    '對政策制定者：需要納入利益關係者討論',
                    '需要進行共同決策（偏好因人而異）',
                  ] : [
                    'For clinicians: most patients prefer this, but verify individual preferences',
                    'For patients: most would choose this, but your choice depends on your values',
                    'For policymakers: needs stakeholder discussion',
                    'Shared decision making required (preferences vary)',
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5"><span className="text-amber-400">~</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Accordion>

          {/* Exceptional circumstances */}
          <Accordion title={lang === 'zh' ? '低確定性證據也能強烈推薦的例外情境' : 'When Low Certainty Can Still Be Strong'} icon="⚡">
            <div className="mt-3 space-y-2">
              {(lang === 'zh' ? [
                '不確定是否有效但不治療就會死亡（如：心臟驟停的急救）',
                '治療效果可能很大且風險很低（如：糖尿病酮酸中毒的胰島素治療）',
                '等價治療但其中一個成本高很多（如：處方保濕劑 vs. 一般保濕劑）',
                '族群健康考量壓倒個人不確定性（如：限制抗生素使用以避免抗藥性）',
              ] : [
                'Uncertain efficacy but certain death without treatment (e.g., CPR for cardiac arrest)',
                'Potentially large effect with very low risk (e.g., insulin for DKA)',
                'Equivalent treatments but one costs much more (e.g., prescription vs. OTC moisturizer)',
                'Population health overrides individual uncertainty (e.g., restricting antibiotics for resistance)',
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-amber-50/50 rounded-lg px-3 py-2">
                  <span className="text-amber-500 mt-0.5 flex-shrink-0">⚡</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      )}

      {/* ═══ TAB: MID & Values ═══ */}
      {activeTab === 'mid' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            🎯 {lang === 'zh' ? 'MID 與價值偏好' : 'MID and Values & Preferences'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? 'MID 不只用於不精確性評估——它是連結「證據」和「推薦」的橋樑。MID 反映了病人對不同結果指標的重視程度。'
              : 'MID isn\'t just for imprecision assessment — it bridges "evidence" and "recommendations." MIDs reflect how patients value different outcomes.'}
          </p>

          <Accordion title={lang === 'zh' ? 'MID 為什麼對 EtD 這麼重要？' : 'Why is MID Critical for EtD?'} icon="🔑" defaultOpen>
            <div className="mt-3 space-y-3">
              <div className="bg-teal-50/50 rounded-lg p-3">
                <p className="text-xs font-semibold text-teal-700 mb-1">{lang === 'zh' ? '原因 1：決定確定性評級' : 'Reason 1: Determines Certainty Ratings'}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {lang === 'zh'
                    ? 'MID 是 GRADE 不精確性和不一致性評估的閾值。點估計值和 CI 與 MID 的關係決定了是否需要扣分。'
                    : 'MID is the threshold for GRADE imprecision and inconsistency. The relationship between the point estimate, CI, and MID determines downgrading.'}
                </p>
              </div>
              <div className="bg-teal-50/50 rounded-lg p-3">
                <p className="text-xs font-semibold text-teal-700 mb-1">{lang === 'zh' ? '原因 2：反映價值偏好的梯度' : 'Reason 2: Reflects Value Gradient'}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {lang === 'zh'
                    ? '例如：死亡率 MID = 1%、中風 MID = 2%、心梗 MID = 3%、出血 MID = 5%。這意味著死亡的重要性是出血的 5 倍——這就是價值偏好的量化表現。'
                    : 'Example: mortality MID = 1%, stroke MID = 2%, MI MID = 3%, bleeding MID = 5%. This means mortality is 5× more important than bleeding — a quantified expression of values.'}
                </p>
              </div>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? 'MID 怎麼訂？四種方法' : 'How to Set MID: Four Methods'} icon="📏" defaultOpen>
            <div className="mt-3 space-y-2">
              {[
                { numZh: '1. 文獻系統性搜尋', numEn: '1. Systematic Literature Survey',
                  descZh: '最理想。找已發表的 MID 研究。最常見於病人自評結果（PRO），如疼痛量表、功能量表。',
                  descEn: 'Ideal. Find published MID studies. Most common for patient-reported outcomes (PROs) like pain and function scales.' },
                { numZh: '2. 臨床專家經驗', numEn: '2. Clinician Experience',
                  descZh: '有共同決策經驗的臨床醫師，能從病人反應中推估什麼程度的差異對病人有意義。',
                  descEn: 'Clinicians with shared decision-making experience can infer meaningful thresholds from patient responses.' },
                { numZh: '3. 病人焦點團體', numEn: '3. Patient Focus Groups',
                  descZh: '資源許可時，直接問一小組病人。比專家推估更直接，但樣本小。',
                  descEn: 'When resources allow, ask a small group of patients directly. More direct than expert inference, but small sample.' },
                { numZh: '4. 小組結構化問卷', numEn: '4. Structured Panel Survey',
                  descZh: '提供極高和極低的 MID 選項，逐步收斂到一半小組認為重要、一半認為不重要的閾值。',
                  descEn: 'Present extreme MID options, converge to the threshold where half the panel considers it important and half does not.' },
              ].map(({ numZh, numEn, descZh, descEn }, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-100 p-3">
                  <p className="text-sm font-semibold text-teal-700">{lang === 'zh' ? numZh : numEn}</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{lang === 'zh' ? descZh : descEn}</p>
                </div>
              ))}
            </div>
          </Accordion>

          {/* Value statements */}
          <Accordion title={lang === 'zh' ? '價值偏好聲明範例' : 'Value & Preference Statement Examples'} icon="📋">
            <div className="mt-3 space-y-3">
              <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100">
                <p className="text-xs font-semibold text-blue-700 mb-1">{lang === 'zh' ? '範例 1：COVID-19 俯臥位通氣' : 'Example 1: Awake Prone Positioning in COVID-19'}</p>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  {lang === 'zh'
                    ? '「小組認為：對於插管風險的適度降低給予較高的價值，而對病人使用俯臥位的不適感給予較低的價值。」→ 有條件推薦'
                    : '"The panel placed a relatively high value on a modest reduction in mechanical ventilation and a lower value on the discomfort patients experience." → Conditional recommendation'}
                </p>
              </div>
              <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100">
                <p className="text-xs font-semibold text-blue-700 mb-1">{lang === 'zh' ? '範例 2：COVID-19 藥物治療（早期低確定性）' : 'Example 2: COVID-19 Drugs (Early, Low Certainty)'}</p>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  {lang === 'zh'
                    ? '「多數病人不願意使用效果高度不確定的治療，特別是當證據顯示效果可能很小且有重要傷害的可能性時。」→ 有條件反對'
                    : '"Most patients would be reluctant to use a treatment for which the evidence left high uncertainty, particularly when effects, if they exist, are small and the possibility of important harm remains." → Conditional against'}
                </p>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 mt-2">
                <p className="text-xs text-amber-800">
                  <strong>{lang === 'zh' ? '💡 關鍵：' : '💡 Key:'}</strong>{' '}
                  {lang === 'zh'
                    ? '每個推薦都必須附帶明確的價值偏好聲明。這讓讀者理解「為什麼」做出這個推薦，並能判斷在不同的價值觀下推薦是否會改變。'
                    : 'Every recommendation must include an explicit value statement. This lets readers understand "why" and judge whether the recommendation would change under different values.'}
                </p>
              </div>
            </div>
          </Accordion>
        </div>
      )}

      {/* ═══ TAB: Presentation ═══ */}
      {activeTab === 'presentation' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            📝 {lang === 'zh' ? '推薦的呈現方式' : 'Presenting Recommendations'}
          </h2>

          <Accordion title={lang === 'zh' ? '推薦用語規範' : 'Recommendation Wording'} icon="💬" defaultOpen>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ background: '#E8F6F7' }}>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '強度' : 'Strength'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '用語' : 'Wording'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '範例' : 'Example'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border border-gray-200 font-medium">{lang === 'zh' ? '強烈' : 'Strong'}</td>
                    <td className="px-3 py-2 border border-gray-200">
                      <span className="font-bold text-green-700">{lang === 'zh' ? '我們推薦 (We recommend)' : 'We recommend'}</span>
                    </td>
                    <td className="px-3 py-2 border border-gray-200 text-gray-600 text-xs">
                      {lang === 'zh' ? '我們推薦使用 IL-6 受體阻斷劑治療重症 COVID-19 病人' : 'We recommend using IL-6 receptor blockers for severe COVID-19'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-gray-200 font-medium">{lang === 'zh' ? '有條件' : 'Conditional'}</td>
                    <td className="px-3 py-2 border border-gray-200">
                      <span className="font-bold text-amber-700">{lang === 'zh' ? '我們建議 (We suggest)' : 'We suggest'}</span>
                    </td>
                    <td className="px-3 py-2 border border-gray-200 text-gray-600 text-xs">
                      {lang === 'zh' ? '我們建議使用 0.05% atropine 眼藥水控制近視' : 'We suggest using 0.05% atropine eye drops for myopia control'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex items-start gap-2 bg-red-50/50 rounded-lg p-3">
              <HamsterConcerned size={24} className="flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 leading-relaxed">
                {lang === 'zh'
                  ? '⚠️ 避免使用模糊的用語，如「可以考慮 (may consider)」——這無法傳達明確的方向和強度。'
                  : '⚠️ Avoid ambiguous wording like "may consider" — this fails to convey clear direction and strength.'}
              </p>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '推薦的完整結構' : 'Complete Recommendation Structure'} icon="🏗️" defaultOpen>
            <div className="mt-3 space-y-2">
              {[
                { zh: '明確的族群 (Population)', en: 'Explicit Population', exZh: '住院的重症 COVID-19 成人病人', exEn: 'Adults hospitalized with severe COVID-19' },
                { zh: '明確的介入措施 (Intervention)', en: 'Explicit Intervention', exZh: 'IL-6 受體阻斷劑（tocilizumab 或 sarilumab）', exEn: 'IL-6 receptor blockers (tocilizumab or sarilumab)' },
                { zh: '明確的對照 (Comparison)', en: 'Explicit Comparison', exZh: '標準照護', exEn: 'Standard care' },
                { zh: '推薦強度', en: 'Recommendation Strength', exZh: '強烈推薦', exEn: 'Strong recommendation' },
                { zh: '證據確定性（選擇性）', en: 'Certainty Level (optional)', exZh: '基於高確定性證據', exEn: 'Based on high certainty evidence' },
              ].map(({ zh, en, exZh, exEn }, i) => (
                <div key={i} className="flex items-center gap-3 bg-teal-50/40 rounded-lg px-3 py-2">
                  <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                  <div>
                    <span className="text-sm font-medium text-gray-700">{lang === 'zh' ? zh : en}</span>
                    <span className="text-xs text-gray-400 ml-2">→ {lang === 'zh' ? exZh : exEn}</span>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '多層次呈現格式' : 'Multilayered Presentation'} icon="📊">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? 'Core GRADE 建議使用多層次格式呈現推薦，讓使用者可以依需要深入了解：'
                  : 'Core GRADE recommends multilayered presentation so users can drill down as needed:'}
              </p>
              <div className="space-y-2">
                {[
                  { layerZh: '第 1 層：推薦 + 備註', layerEn: 'Layer 1: Recommendation + Remarks', descZh: '一句話推薦 + 簡短的附帶說明', descEn: 'One-line recommendation + brief accompanying notes' },
                  { layerZh: '第 2 層：理由說明', layerEn: 'Layer 2: Justification', descZh: '為什麼做出這個推薦（連結到 EtD 考量）', descEn: 'Why this recommendation was made (linking to EtD factors)' },
                  { layerZh: '第 3 層：SoF 表格 + EtD 框架', layerEn: 'Layer 3: SoF Table + EtD Framework', descZh: '完整的證據摘要和決策框架', descEn: 'Full evidence summary and decision framework' },
                  { layerZh: '第 4 層：共同決策工具', layerEn: 'Layer 4: Decision Aids', descZh: '給病人和臨床醫師的視覺化決策輔助工具', descEn: 'Visual decision support tools for patients and clinicians' },
                ].map(({ layerZh, layerEn, descZh, descEn }, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-100 p-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: `hsl(${175 - i * 15}, 70%, ${35 + i * 8}%)` }}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{lang === 'zh' ? layerZh : layerEn}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{lang === 'zh' ? descZh : descEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Accordion>

          {/* For vs Against tip */}
          <Accordion title={lang === 'zh' ? '推薦「贊成」還是「反對」？' : 'Recommend "For" or "Against"?'} icon="↔️">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? '一般來說，優先用「推薦某個治療方式」而非「反對另一個」。但如果一個無效或有害的治療正在被廣泛使用，明確「反對」是適當的。'
                  : 'Generally, prefer "recommend X" over "recommend against Y." But if an ineffective or harmful treatment is widely used, an explicit "against" is appropriate.'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg p-3 bg-green-50">
                  <p className="text-xs font-bold text-green-800">✅ {lang === 'zh' ? '較好的寫法' : 'Better'}</p>
                  <p className="text-xs text-green-700 mt-1 italic">
                    {lang === 'zh' ? '我們建議使用一般保濕劑而非處方保濕劑' : 'We suggest using OTC moisturizer over prescription moisturizer'}
                  </p>
                </div>
                <div className="rounded-lg p-3 bg-red-50">
                  <p className="text-xs font-bold text-red-800">⚠️ {lang === 'zh' ? '適合「反對」的情境' : 'When "against" fits'}</p>
                  <p className="text-xs text-red-700 mt-1 italic">
                    {lang === 'zh' ? '我們建議不要在輕度異位性皮膚炎中使用漂白浴' : 'We recommend against dilute bleach baths in mild atopic dermatitis'}
                  </p>
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      )}

      {/* Reference */}
      <div className="mt-8 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Source:</strong> Guyatt et al. Core GRADE 7: principles for moving from evidence to recommendations and decisions. <em>BMJ</em> 2025;389:e083867. doi:10.1136/bmj-2024-083867.
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
