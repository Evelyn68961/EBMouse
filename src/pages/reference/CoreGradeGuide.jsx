// src/pages/reference/CoreGradeGuide.jsx
// Interactive Core GRADE learning guide for the EBMouse Toolbox
// Based on BMJ 2025 Core GRADE series (Papers 1–6) + GRADE Guidelines 6 (JCE 2011)

import React, { useState } from 'react';
import { useLang } from '../../App';
import Hamster, { HamsterThinking, HamsterConcerned } from '../../components/Hamster';
import { PracticeSection } from '../../components/PracticeQuestion';
import practiceQuestions from '../../data/practice';

// ─── Color constants ───
const C = {
  teal: '#0E7C86',
  tealLight: '#E8F6F7',
  tealMid: '#B5DFE3',
  green: '#27AE60',
  red: '#E74C3C',
  amber: '#F39C12',
  orange: '#E67E22',
};

// ─── Accordion component ───
function Accordion({ title, icon, children, defaultOpen = false, accentColor = C.teal }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-4 rounded-xl border overflow-hidden" style={{ borderColor: open ? accentColor + '40' : '#E5E7EB' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="text-xl flex-shrink-0">{icon}</span>
        <span className="flex-1 font-semibold text-gray-800 text-[15px]">{title}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t" style={{ borderColor: accentColor + '20' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Visual: Certainty level badges ───
function CertaintyBadge({ level, lang }) {
  const config = {
    high: { zh: '高', en: 'High', color: C.green, stars: 4 },
    moderate: { zh: '中', en: 'Moderate', color: C.amber, stars: 3 },
    low: { zh: '低', en: 'Low', color: C.orange, stars: 2 },
    very_low: { zh: '很低', en: 'Very Low', color: C.red, stars: 1 },
  };
  const c = config[level];
  if (!c) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-xs font-bold" style={{ background: c.color }}>
      {'★'.repeat(c.stars)}{'☆'.repeat(4 - c.stars)} {lang === 'zh' ? c.zh : c.en}
    </span>
  );
}

// ─── Visual: Domain card for the 5 domains ───
function DomainCard({ number, icon, titleZh, titleEn, descZh, descEn, tipsZh, tipsEn, lang }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: C.teal }}>
          {number}
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
            <span>{icon}</span> {lang === 'zh' ? titleZh : titleEn}
          </h4>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{lang === 'zh' ? descZh : descEn}</p>
        </div>
      </div>
      <div className="ml-11 bg-teal-50/50 rounded-lg px-3 py-2.5">
        <p className="text-xs font-medium text-teal-700 mb-1">{lang === 'zh' ? '💡 關鍵判斷' : '💡 Key Judgment'}</p>
        <p className="text-xs text-gray-600 leading-relaxed">{lang === 'zh' ? tipsZh : tipsEn}</p>
      </div>
    </div>
  );
}

// ─── Visual: Number line for imprecision ───
function NumberLine({ pointEst, ciLow, ciHigh, mid, lang }) {
  // Normalized 0-100 scale
  const min = Math.min(ciLow, 0) - 0.1;
  const max = Math.max(ciHigh, mid * 1.5) + 0.1;
  const range = max - min;
  const toX = (v) => ((v - min) / range) * 100;

  const nullX = toX(0);
  const midX = toX(mid);
  const peX = toX(pointEst);
  const ciLX = toX(ciLow);
  const ciHX = toX(ciHigh);
  const crossesMid = ciLow < mid && ciHigh > mid;

  return (
    <div className="my-3">
      <svg viewBox="0 0 400 80" className="w-full" style={{ maxWidth: 500 }}>
        {/* Axis */}
        <line x1="20" y1="45" x2="380" y2="45" stroke="#CBD5E1" strokeWidth="1.5" />
        {/* Null line */}
        <line x1={20 + nullX * 3.6} y1="25" x2={20 + nullX * 3.6} y2="65" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,3" />
        <text x={20 + nullX * 3.6} y="75" textAnchor="middle" fontSize="9" fill="#94A3B8">null (0)</text>
        {/* MID line */}
        <line x1={20 + midX * 3.6} y1="25" x2={20 + midX * 3.6} y2="65" stroke={C.amber} strokeWidth="1.5" strokeDasharray="4,3" />
        <text x={20 + midX * 3.6} y="75" textAnchor="middle" fontSize="9" fill={C.amber} fontWeight="600">MID ({mid})</text>
        {/* CI bar */}
        <line x1={20 + ciLX * 3.6} y1="45" x2={20 + ciHX * 3.6} y2="45" stroke={crossesMid ? C.red : C.green} strokeWidth="4" strokeLinecap="round" />
        {/* CI ends */}
        <line x1={20 + ciLX * 3.6} y1="38" x2={20 + ciLX * 3.6} y2="52" stroke={crossesMid ? C.red : C.green} strokeWidth="2" />
        <line x1={20 + ciHX * 3.6} y1="38" x2={20 + ciHX * 3.6} y2="52" stroke={crossesMid ? C.red : C.green} strokeWidth="2" />
        {/* Point estimate */}
        <circle cx={20 + peX * 3.6} cy="45" r="5" fill={C.teal} />
        <text x={20 + peX * 3.6} y="20" textAnchor="middle" fontSize="9" fill={C.teal} fontWeight="700">{pointEst}</text>
        {/* Labels */}
        <text x={20 + ciLX * 3.6} y="20" textAnchor="middle" fontSize="8" fill="#6B7280">{ciLow}</text>
        <text x={20 + ciHX * 3.6} y="20" textAnchor="middle" fontSize="8" fill="#6B7280">{ciHigh}</text>
      </svg>
      <p className="text-xs text-center mt-1" style={{ color: crossesMid ? C.red : C.green }}>
        {crossesMid
          ? (lang === 'zh' ? '⚠️ CI 跨越 MID → 考慮扣分' : '⚠️ CI crosses MID → consider downgrading')
          : (lang === 'zh' ? '✅ CI 未跨越 MID → 不扣分' : '✅ CI does not cross MID → no downgrade')}
      </p>
    </div>
  );
}

// ─── Visual: Step flow ───
function StepFlow({ steps, lang }) {
  return (
    <div className="flex flex-col gap-2 my-4">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: C.teal }}>
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


// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
export default function CoreGradeGuide() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', zh: '總覽', en: 'Overview', icon: '🗺️' },
    { id: 'imprecision', zh: '不精確性', en: 'Imprecision', icon: '🎯' },
    { id: 'inconsistency', zh: '不一致性', en: 'Inconsistency', icon: '📊' },
    { id: 'rob', zh: '誤差風險', en: 'Risk of Bias', icon: '⚖️' },
    { id: 'indirectness', zh: '不直接性', en: 'Indirectness', icon: '🔀' },
    { id: 'pubbias', zh: '發表偏誤', en: 'Pub. Bias', icon: '📰' },
    { id: 'sof', zh: 'SoF 表格', en: 'SoF Table', icon: '📋' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <HamsterThinking size={48} />
        <div>
          <h1 className="font-bold text-3xl" style={{ color: C.teal }}>
            Core GRADE {lang === 'zh' ? '快速指南' : 'Quick Guide'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {lang === 'zh'
              ? '根據 BMJ 2025 Core GRADE 系列（Paper 1–6）+ GRADE Guidelines 6 整理'
              : 'Based on BMJ 2025 Core GRADE series (Papers 1–6) + GRADE Guidelines 6'}
          </p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map(({ id, zh, en, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
              activeTab === id
                ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-200'
                : 'bg-white text-gray-500 border-gray-200 hover:border-teal-300 hover:text-teal-600'
            }`}
          >
            <span className="mr-1">{icon}</span>
            {lang === 'zh' ? zh : en}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* TAB: Overview */}
      {/* ═══════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div>
          {/* What is GRADE */}
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-lg text-teal-800 mb-2">
              {lang === 'zh' ? 'GRADE 是什麼？' : 'What is GRADE?'}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {lang === 'zh'
                ? 'GRADE（Grading of Recommendations Assessment, Development and Evaluation）是一套系統化評估「證據確定性」的方法。它幫助我們回答一個關鍵問題：我們對治療效果的估計值有多少信心？'
                : 'GRADE (Grading of Recommendations Assessment, Development and Evaluation) is a systematic approach to rating the certainty of evidence. It answers: How confident are we in the estimated treatment effect?'}
            </p>
          </div>

          {/* 4 certainty levels */}
          <h3 className="font-bold text-gray-800 mb-3">
            {lang === 'zh' ? '四個證據確定性等級' : 'Four Certainty Levels'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              {
                level: 'high', 
                descZh: '我們非常有信心，真實效果接近估計值。進一步研究不太可能改變結論。',
                descEn: 'Very confident the true effect is close to the estimate. Further research is unlikely to change our confidence.',
                langZh: '治療 X 可減少死亡率',
                langEn: 'Treatment X reduces mortality',
              },
              {
                level: 'moderate',
                descZh: '有中等信心。真實效果可能接近估計值，但仍有改變的可能。',
                descEn: 'Moderate confidence. True effect is likely close to the estimate, but may differ.',
                langZh: '治療 X 很可能減少死亡率',
                langEn: 'Treatment X probably reduces mortality',
              },
              {
                level: 'low',
                descZh: '信心有限。真實效果可能與估計值有相當差距。',
                descEn: 'Limited confidence. The true effect may differ substantially from the estimate.',
                langZh: '治療 X 可能減少死亡率',
                langEn: 'Treatment X may reduce mortality',
              },
              {
                level: 'very_low',
                descZh: '幾乎沒有信心。真實效果很可能與估計值有很大差異。',
                descEn: 'Very little confidence. The true effect is likely substantially different from the estimate.',
                langZh: '我們非常不確定治療 X 的效果',
                langEn: 'We are very uncertain about the effect',
              },
            ].map(({ level, descZh, descEn, langZh, langEn }) => (
              <div key={level} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="mb-2"><CertaintyBadge level={level} lang={lang} /></div>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">{lang === 'zh' ? descZh : descEn}</p>
                <p className="text-xs font-medium text-teal-700 italic">
                  → "{lang === 'zh' ? langZh : langEn}"
                </p>
              </div>
            ))}
          </div>

          {/* Starting point */}
          <Accordion title={lang === 'zh' ? '起點：依研究設計決定' : 'Starting Point: By Study Design'} icon="🏁" defaultOpen>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4 text-center" style={{ background: '#D5F5E3' }}>
                <p className="font-bold text-green-800 text-lg mb-1">{lang === 'zh' ? '高' : 'High'}</p>
                <p className="text-xs text-green-700">{lang === 'zh' ? '隨機對照試驗 (RCT)' : 'Randomised Controlled Trials (RCTs)'}</p>
              </div>
              <div className="rounded-xl p-4 text-center" style={{ background: '#FEF9E7' }}>
                <p className="font-bold text-orange-700 text-lg mb-1">{lang === 'zh' ? '低' : 'Low'}</p>
                <p className="text-xs text-orange-600">{lang === 'zh' ? '觀察性研究 (NRSI)' : 'Observational Studies (NRSI)'}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              {lang === 'zh'
                ? '然後依據五個面向評估是否需要降級（扣分），以及觀察性研究是否可以升級。'
                : 'Then assess 5 domains for possible downgrading, and whether observational studies can be upgraded.'}
            </p>
          </Accordion>

          {/* The 5 domains overview */}
          <h3 className="font-bold text-gray-800 mb-3 mt-6">
            {lang === 'zh' ? '五個降級面向' : 'Five Domains for Downgrading'}
          </h3>
          <div className="space-y-3 mb-6">
            <DomainCard number="1" icon="🎯" lang={lang}
              titleZh="不精確性 (Imprecision)" titleEn="Imprecision"
              descZh="信賴區間是否夠窄？結果是否精確到足以支持決策？" descEn="Is the confidence interval narrow enough to support a decision?"
              tipsZh="看 95% CI 是否跨越 MID 閾值。跨越 = 扣 1 分。跨越 MID for benefit 和 MID for harm = 考慮扣 2 分。"
              tipsEn="Check if 95% CI crosses the MID threshold. Crossing = downgrade 1. Crossing both benefit and harm MIDs = consider downgrading 2."
            />
            <DomainCard number="2" icon="📊" lang={lang}
              titleZh="不一致性 (Inconsistency)" titleEn="Inconsistency"
              descZh="各研究結果之間是否一致？是否存在無法解釋的異質性？" descEn="Are results consistent across studies? Is there unexplained heterogeneity?"
              tipsZh="看森林圖：(1) 點估計值是否相似 (2) CI 是否重疊 (3) 點估計值是否落在閾值的同一側。I² > 30% 開始留意。"
              tipsEn="Check forest plot: (1) are point estimates similar (2) do CIs overlap (3) are point estimates on the same side of the threshold. I² > 30% warrants attention."
            />
            <DomainCard number="3" icon="⚖️" lang={lang}
              titleZh="誤差風險 (Risk of Bias)" titleEn="Risk of Bias"
              descZh="研究設計和執行的缺陷是否可能扭曲結果？" descEn="Could flaws in study design and execution have distorted the results?"
              tipsZh="先逐篇評為「高」或「低」誤差風險。若高誤差風險的研究主導合併效果（權重 > 65%），且無法用方向性推論排除 → 扣分。"
              tipsEn="Rate each study as 'high' or 'low' risk. If high-risk studies dominate the pooled effect (weight > 65%) and direction of bias doesn't help → downgrade."
            />
            <DomainCard number="4" icon="🔀" lang={lang}
              titleZh="不直接性 (Indirectness)" titleEn="Indirectness"
              descZh="研究的 PICO 與我們關注的臨床問題是否匹配？" descEn="Does the study PICO match our target clinical question?"
              tipsZh="逐項比較研究和臨床案例的 P、I、C、O。差異越大越需要扣分。替代結果指標（surrogate outcomes）尤其需要注意。"
              tipsEn="Compare study vs. target PICO element by element. Greater differences warrant downgrading. Surrogate outcomes are especially concerning."
            />
            <DomainCard number="5" icon="📰" lang={lang}
              titleZh="發表偏誤 (Publication Bias)" titleEn="Publication Bias"
              descZh="是否有研究因為結果不理想而未被發表？" descEn="Were studies with unfavorable results not published?"
              tipsZh="(1) 都是小型研究且企業贊助 → 扣分。(2) ≥ 10 篇可做漏斗圖/Egger's test。(3) 不對稱 → 扣分。"
              tipsEn="(1) All small industry-funded studies → downgrade. (2) ≥ 10 studies → check funnel plot/Egger's test. (3) Asymmetry → downgrade."
            />
          </div>

          {/* Rating up */}
          <Accordion title={lang === 'zh' ? '觀察性研究的升級條件' : 'Upgrading Observational Studies'} icon="⬆️">
            <div className="mt-3 space-y-3">
              <div className="flex items-start gap-3 bg-green-50 rounded-lg p-3">
                <span className="text-lg">💪</span>
                <div>
                  <p className="text-sm font-semibold text-green-800">{lang === 'zh' ? '大效果量' : 'Large Effect'}</p>
                  <p className="text-xs text-green-700 leading-relaxed">
                    {lang === 'zh'
                      ? 'RR > 2 或 < 0.5 → 考慮升 1 級。RR > 5 或 < 0.2 → 考慮升 2 級。前提：NRSI 無其他降級因素。'
                      : 'RR > 2 or < 0.5 → consider upgrading 1 level. RR > 5 or < 0.2 → consider upgrading 2 levels. Prerequisite: no other downgrading in NRSI.'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-green-50 rounded-lg p-3">
                <span className="text-lg">📈</span>
                <div>
                  <p className="text-sm font-semibold text-green-800">{lang === 'zh' ? '劑量反應關係' : 'Dose-Response Gradient'}</p>
                  <p className="text-xs text-green-700 leading-relaxed">
                    {lang === 'zh'
                      ? '劑量越高效果越大 → 可考慮升級。但要排除混淆因子（如咖啡與胰臟癌的假性劑量反應）。'
                      : 'Incremental dose → incremental effect → consider upgrading. But rule out confounders (e.g., coffee & pancreatic cancer was actually confounded by smoking).'}
                  </p>
                </div>
              </div>
            </div>
          </Accordion>

          {/* Plain language statements */}
          <Accordion title={lang === 'zh' ? '白話語言表述對照表' : 'Plain Language Statements'} icon="🗣️">
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ background: C.tealLight }}>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '等級' : 'Level'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '用 null 閾值' : 'Null Threshold'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '用 MID 閾值' : 'MID Threshold'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { level: 'High', nullZh: 'X 治療可減少 Y', nullEn: 'Treatment X reduces Y', midZh: 'X 治療可帶來具重要意義的 Y 改善', midEn: 'Treatment X has an important benefit on Y' },
                    { level: 'Moderate', nullZh: 'X 治療很可能減少 Y', nullEn: 'Treatment X likely reduces Y', midZh: 'X 治療很可能帶來具重要意義的改善', midEn: 'Treatment X likely has an important benefit' },
                    { level: 'Low', nullZh: 'X 治療可能減少 Y', nullEn: 'Treatment X may reduce Y', midZh: 'X 治療可能帶來具重要意義的改善', midEn: 'Treatment X may have an important benefit' },
                    { level: 'Very Low', nullZh: '我們非常不確定 X 對 Y 的效果', nullEn: 'Very uncertain about the effect', midZh: '同左', midEn: 'Same' },
                  ].map(({ level, nullZh, nullEn, midZh, midEn }) => (
                    <tr key={level} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border border-gray-200 font-medium">{level}</td>
                      <td className="px-3 py-2 border border-gray-200 text-gray-600">{lang === 'zh' ? nullZh : nullEn}</td>
                      <td className="px-3 py-2 border border-gray-200 text-gray-600">{lang === 'zh' ? midZh : midEn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Accordion>

          {/* Reference */}
          <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong>Sources:</strong> Guyatt et al. Core GRADE 1–6. <em>BMJ</em> 2025;389:e081903–e083866. Guyatt et al. GRADE Guidelines 6: Imprecision. <em>J Clin Epidemiol</em> 2011;64:1283–93 (corrigendum 2021).
            </p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════ */}
      {/* TAB: Imprecision */}
      {/* ═══════════════════════════════════════ */}
      {activeTab === 'imprecision' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            🎯 {lang === 'zh' ? '不精確性 (Imprecision)' : 'Imprecision'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '不精確性評估的核心問題：效果估計值的可信範圍有多寬？我們能否確定效果是有意義的還是微不足道的？'
              : 'Core question: How wide is the plausible range of the effect estimate? Can we be sure the effect is meaningful or trivial?'}
          </p>

          {/* Step 1: Choose threshold */}
          <Accordion title={lang === 'zh' ? 'Step 1：選擇閾值（Null 或 MID）' : 'Step 1: Choose Threshold (Null or MID)'} icon="1️⃣" defaultOpen>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border-2 border-gray-200 p-4">
                <h4 className="font-bold text-gray-800 text-sm mb-2">{lang === 'zh' ? 'Null 閾值' : 'Null Threshold'}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {lang === 'zh'
                    ? '問的是：「效果是否存在？」（RD = 0 或 RR = 1）。適合系統性回顧作者不想做價值判斷的情境。'
                    : 'Asks: "Does an effect exist?" (RD = 0 or RR = 1). Suitable when review authors want to minimize value judgments.'}
                </p>
              </div>
              <div className="rounded-xl border-2 border-teal-300 p-4 bg-teal-50/30">
                <h4 className="font-bold text-teal-800 text-sm mb-2">{lang === 'zh' ? 'MID 閾值 ⭐ 推薦' : 'MID Threshold ⭐ Preferred'}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {lang === 'zh'
                    ? '問的是：「效果夠大嗎？」MID = 病人認為有意義的最小差異值。能更清楚地連結證據與臨床決策。'
                    : 'Asks: "Is the effect large enough?" MID = the smallest change patients perceive as important. Better links evidence to clinical decisions.'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* Step 2: Locate point estimate */}
          <Accordion title={lang === 'zh' ? 'Step 2：定位點估計值' : 'Step 2: Locate Point Estimate'} icon="2️⃣">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? '看點估計值落在閾值的哪一側，決定確定性評估的目標（target）：'
                  : 'Where the point estimate falls relative to the threshold determines the certainty target:'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg p-3" style={{ background: '#D5F5E3' }}>
                  <p className="text-xs font-bold text-green-800 mb-1">{lang === 'zh' ? '點估計值 > MID' : 'Point estimate > MID'}</p>
                  <p className="text-xs text-green-700">{lang === 'zh' ? '→ 確定性目標：「具重要效益」' : '→ Target: "Important effect"'}</p>
                </div>
                <div className="rounded-lg p-3" style={{ background: '#FEF9E7' }}>
                  <p className="text-xs font-bold text-amber-800 mb-1">{lang === 'zh' ? '點估計值 < MID' : 'Point estimate < MID'}</p>
                  <p className="text-xs text-amber-700">{lang === 'zh' ? '→ 確定性目標：「效果甚微或無效」' : '→ Target: "Little to no effect"'}</p>
                </div>
              </div>
            </div>
          </Accordion>

          {/* Step 3: Check CI */}
          <Accordion title={lang === 'zh' ? 'Step 3：看 CI 是否跨越閾值' : 'Step 3: Does CI Cross the Threshold?'} icon="3️⃣" defaultOpen>
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh' ? '這是最關鍵的步驟。用數線圖來判斷：' : 'This is the key step. Use a number line to judge:'}
              </p>

              {/* Example A */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
                <p className="text-xs font-bold text-gray-700 mb-1">
                  {lang === 'zh' ? '範例 A：0.01% atropine（WMD 0.23 [0.13, 0.34]，MID = 0.25）' : 'Example A: 0.01% atropine (WMD 0.23 [0.13, 0.34], MID = 0.25)'}
                </p>
                <NumberLine pointEst={0.23} ciLow={0.13} ciHigh={0.34} mid={0.25} lang={lang} />
                <p className="text-xs text-gray-500 leading-relaxed">
                  {lang === 'zh'
                    ? '點估計值 (0.23) < MID (0.25)，但 CI 上限 (0.34) > MID → CI 跨越 MID → 扣 1 分。'
                    : 'Point estimate (0.23) < MID (0.25), but CI upper bound (0.34) > MID → CI crosses MID → downgrade 1.'}
                </p>
              </div>

              {/* Example B */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <p className="text-xs font-bold text-gray-700 mb-1">
                  {lang === 'zh' ? '範例 B：0.05% atropine（WMD 0.54 [0.43, 0.65]，MID = 0.25）' : 'Example B: 0.05% atropine (WMD 0.54 [0.43, 0.65], MID = 0.25)'}
                </p>
                <NumberLine pointEst={0.54} ciLow={0.43} ciHigh={0.65} mid={0.25} lang={lang} />
                <p className="text-xs text-gray-500 leading-relaxed">
                  {lang === 'zh'
                    ? '點估計值 (0.54) 和 CI 下限 (0.43) 都 > MID → CI 不跨越 MID → 不扣分。'
                    : 'Point estimate (0.54) and CI lower bound (0.43) both > MID → CI does not cross MID → no downgrade.'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* Rating down twice */}
          <Accordion title={lang === 'zh' ? '什麼時候扣 2 分？' : 'When to Downgrade Twice?'} icon="⚠️">
            <div className="mt-3 space-y-3">
              <div className="flex items-start gap-3 bg-red-50 rounded-lg p-3">
                <HamsterConcerned size={32} />
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {lang === 'zh'
                      ? '當 CI 同時跨越 MID for benefit 和 MID for harm 時（也就是 CI 包含了「有重要效益」和「有重要傷害」的可能性），考慮扣 2 分。'
                      : 'When the CI crosses both the MID for benefit AND the MID for harm (i.e., CI includes both important benefit and important harm), consider downgrading 2 levels.'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {lang === 'zh'
                      ? '也可以用白話語言來判斷：描述成「likely」（很可能）比較適合，還是「may」（可能）比較適合？如果答案是「may」→ 扣 2 分。'
                      : 'Also consider the plain language: would "likely" or "may" be more appropriate? If "may" → downgrade 2.'}
                  </p>
                </div>
              </div>
            </div>
          </Accordion>

          {/* OIS */}
          <Accordion title={lang === 'zh' ? 'OIS：效果大但樣本小時的額外檢查' : 'OIS: Extra Check for Large Effects with Small Samples'} icon="🔢">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? '即使 CI 看起來很窄，如果效果量很大但事件數很少，結果可能是脆弱的。此時需要計算 OIS（Optimal Information Size）。'
                  : 'Even if the CI looks narrow, large effects with few events may be fragile. Calculate the OIS (Optimal Information Size) to check.'}
              </p>
              <StepFlow lang={lang} steps={[
                { zh: '設定 α = 0.05、β = 0.20', en: 'Set α = 0.05, β = 0.20' },
                { zh: '選擇對照組事件率和預期 RRR（通常 20–25%）', en: 'Choose control group event rate and expected RRR (usually 20–25%)' },
                { zh: '計算所需的最低樣本數（OIS）', en: 'Calculate the required minimum sample size (OIS)' },
                { zh: '總樣本數 < OIS → 考慮扣分。總樣本數 ≥ OIS → 不扣分。', en: 'Total sample < OIS → consider downgrading. Total sample ≥ OIS → no downgrade.' },
              ]} />
              <div className="bg-amber-50 rounded-lg p-3 mt-2">
                <p className="text-xs text-amber-800">
                  {lang === 'zh'
                    ? '💡 連續型結果的經驗法則：總樣本 < 800 人（每組 400 人）時，應考慮是否需要扣分。'
                    : '💡 Rule of thumb for continuous outcomes: consider downgrading if total sample < 800 (400 per group).'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* Quick decision flowchart */}
          <Accordion title={lang === 'zh' ? '快速決策流程' : 'Quick Decision Flow'} icon="🗺️">
            <StepFlow lang={lang} steps={[
              { zh: 'CI 是否跨越你選的閾值？', en: 'Does CI cross your chosen threshold?' },
              { zh: '是 → 扣 1 分。CI 是否跨越兩個閾值（benefit + harm）？→ 考慮扣 2 分。', en: 'Yes → downgrade 1. Does CI cross both thresholds (benefit + harm)? → consider downgrade 2.' },
              { zh: '否 → 效果量大嗎？如果 RRR > 30–40%，進入 OIS 檢查。', en: 'No → Is the effect large? If RRR > 30–40%, proceed to OIS check.' },
              { zh: 'OIS 通過 → 不扣分。OIS 未通過 → 扣 1 分。', en: 'OIS met → no downgrade. OIS not met → downgrade 1.' },
            ]} />
          </Accordion>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <PracticeSection questions={practiceQuestions.grade_imprecision} title={{ zh: '不精確性 練習題', en: 'Imprecision Practice' }} />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════ */}
      {/* TAB: Inconsistency */}
      {/* ═══════════════════════════════════════ */}
      {activeTab === 'inconsistency' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            📊 {lang === 'zh' ? '不一致性 (Inconsistency)' : 'Inconsistency'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '不一致性 = 各研究結果之間存在無法解釋的變異。我們特別關心的是：不同研究的結果差異大到可能影響臨床決策。'
              : 'Inconsistency = unexplained variability in results across studies that could lead to different clinical decisions.'}
          </p>

          <Accordion title={lang === 'zh' ? '二元結果看相對效果，連續結果看絕對效果' : 'Binary: Relative Effects; Continuous: Absolute Effects'} icon="📐" defaultOpen>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border p-3">
                <p className="text-sm font-bold text-gray-800 mb-1">{lang === 'zh' ? '二元結果' : 'Binary Outcomes'}</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {lang === 'zh'
                    ? '看 RR/OR 的一致性。因為相對效果通常在不同 baseline risk 的族群間保持一致，而絕對效果則會隨 baseline risk 不同而改變。'
                    : 'Assess consistency of RR/OR. Relative effects are typically consistent across different baseline risks, while absolute effects vary.'}
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm font-bold text-gray-800 mb-1">{lang === 'zh' ? '連續型結果' : 'Continuous Outcomes'}</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {lang === 'zh'
                    ? '直接看均差 (mean difference) 的一致性，因為連續型結果通常不換算成相對效果。'
                    : 'Assess consistency of mean differences directly, since continuous outcomes are not typically converted to relative effects.'}
                </p>
              </div>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '三個視覺判斷標準（看森林圖）' : 'Three Visual Criteria (Forest Plot)'} icon="🌲" defaultOpen>
            <div className="mt-3 space-y-3">
              {[
                { numZh: '① 點估計值差異', numEn: '① Point Estimate Differences',
                  descZh: '各研究的點估計值是否相近？差異越大 → 越需要考慮扣分。',
                  descEn: 'Are point estimates similar across studies? Larger differences → more likely to downgrade.' },
                { numZh: '② CI 重疊程度', numEn: '② CI Overlap',
                  descZh: '各研究的信賴區間是否大量重疊？完全不重疊 → 強烈考慮扣分。',
                  descEn: 'Do CIs overlap substantially? No overlap → strong case for downgrading.' },
                { numZh: '③ 相對於閾值的位置', numEn: '③ Position Relative to Threshold',
                  descZh: '各研究的點估計值是否落在閾值（null 或 MID）的同一側？如果大部分在同一側 → 即使有差異也不需要扣分。',
                  descEn: 'Are point estimates mostly on the same side of the threshold? If mostly same side → may not need downgrading despite variability.' },
              ].map(({ numZh, numEn, descZh, descEn }, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-100 p-3">
                  <p className="text-sm font-semibold text-teal-700">{lang === 'zh' ? numZh : numEn}</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{lang === 'zh' ? descZh : descEn}</p>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? 'I² 統計量：謹慎使用' : 'I² Statistic: Use with Caution'} icon="📉">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? 'I² 告訴我們效果估計值的變異中有多少比例是真正的異質性（而非隨機誤差）。但它可能具有誤導性：'
                  : 'I² tells us the proportion of variability due to true heterogeneity rather than chance. But it can be misleading:'}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">{'< 30%'}</span>
                  <span className="text-xs text-gray-600">{lang === 'zh' ? '很少有嚴重不一致性' : 'Rarely serious inconsistency'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">30–60%</span>
                  <span className="text-xs text-gray-600">{lang === 'zh' ? '需要進一步檢視' : 'Requires further inspection'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold">{'> 60%'}</span>
                  <span className="text-xs text-gray-600">{lang === 'zh' ? '可能有嚴重問題，但不能只看數字' : 'May be serious, but don\'t rely on the number alone'}</span>
                </div>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 mt-3">
                <p className="text-xs text-amber-800">
                  {lang === 'zh'
                    ? '⚠️ 如果研究精確度很高（CI 窄），即使點估計值都在閾值同一側，I² 也可能很高。此時不一定需要扣分。永遠以視覺判斷為主。'
                    : '⚠️ If studies are very precise (narrow CIs), I² can be high even when all point estimates are on the same side of the threshold. Don\'t downgrade based on I² alone.'}
                </p>
              </div>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '次族群效果的可信度判斷' : 'Credibility of Subgroup Effects'} icon="🔍">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? '如果有不一致性，先看事前假設的次族群分析能否解釋。使用 ICEMAN 工具評估可信度：'
                  : 'If inconsistency exists, check if pre-specified subgroup hypotheses explain it. Use the ICEMAN tool:'}
              </p>
              <StepFlow lang={lang} steps={[
                { zh: '事前（a priori）假設？包含方向性預測？假設數量 ≤ 3 個？', en: 'A priori hypothesis? With direction? ≤ 3 hypotheses?' },
                { zh: '交互作用檢定的 p 值低嗎？', en: 'Is the interaction test p-value low?' },
                { zh: '研究內比較還是研究間比較？（研究內更可信）', en: 'Within-study or between-study comparison? (Within-study more credible)' },
                { zh: '可信度高/中 → 分別呈現各次族群。可信度低 → 使用整體結果，按不一致性扣分。', en: 'High/moderate credibility → present subgroups separately. Low credibility → use overall result, downgrade for inconsistency.' },
              ]} />
            </div>
          </Accordion>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <PracticeSection questions={practiceQuestions.grade_inconsistency} title={{ zh: '不一致性 練習題', en: 'Inconsistency Practice' }} />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════ */}
      {/* TAB: Risk of Bias */}
      {/* ═══════════════════════════════════════ */}
      {activeTab === 'rob' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            ⚖️ {lang === 'zh' ? '誤差風險 (Risk of Bias)' : 'Risk of Bias'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '誤差風險 = 研究設計或執行的缺陷導致結果偏離真實值的可能性。'
              : 'Risk of bias = the likelihood that flaws in study design or execution have distorted results from the true effect.'}
          </p>

          <Accordion title={lang === 'zh' ? 'RCT 的主要誤差來源' : 'Key Bias Sources in RCTs'} icon="🏥" defaultOpen>
            <div className="mt-3 space-y-2">
              {[
                { zh: '隨機序列產生不當', en: 'Inadequate random sequence generation' },
                { zh: '分配隱匿不當', en: 'Inadequate allocation concealment' },
                { zh: '受試者未設盲', en: 'Participants not blinded' },
                { zh: '醫療提供者未設盲', en: 'Healthcare providers not blinded' },
                { zh: '結果評估者未設盲', en: 'Outcome assessors not blinded' },
                { zh: '結果資料遺失', en: 'Missing outcome data' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-400">{i + 1}.</span>
                  <span className="text-sm text-gray-700">{lang === 'zh' ? item.zh : item.en}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              {lang === 'zh'
                ? '推薦工具：ROBUST-RCT（簡潔嚴謹）或 RoB 2（Cochrane 標準，較複雜）。'
                : 'Recommended tools: ROBUST-RCT (simple yet rigorous) or RoB 2 (Cochrane standard, more complex).'}
            </p>
          </Accordion>

          <Accordion title={lang === 'zh' ? '從個別研究到整體判斷的流程' : 'From Individual Studies to Overall Judgment'} icon="🔄" defaultOpen>
            <StepFlow lang={lang} steps={[
              { zh: '逐篇評估為「低」或「高」誤差風險', en: 'Rate each study as "low" or "high" risk of bias' },
              { zh: '高誤差風險研究的權重 > 65%？→ 高誤差風險主導', en: 'High-risk studies carry > 65% weight? → high risk dominates' },
              { zh: '如果主導：考慮偏差方向。偏差方向不利結論 → 扣分。偏差方向強化結論 → 不扣分。', en: 'If dominates: consider bias direction. Direction against conclusion → downgrade. Direction reinforces conclusion → no downgrade.' },
              { zh: '如果低誤差風險研究有相當比例（≥ 35%）：比較高/低誤差風險研究的結果。', en: 'If low-risk studies have substantial weight (≥ 35%): compare results of high vs low risk studies.' },
              { zh: '結果相似 → 使用全部研究，不扣分。結果不同 → 只使用低誤差風險研究，不扣分。', en: 'Similar results → use all studies, no downgrade. Different results → use only low-risk studies, no downgrade.' },
            ]} />
          </Accordion>

          <Accordion title={lang === 'zh' ? '偏差方向的重要性' : 'Direction of Bias Matters'} icon="↔️">
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg p-3 bg-green-50">
                <p className="text-xs font-bold text-green-800 mb-1">{lang === 'zh' ? '不需扣分的情境' : 'No Need to Downgrade'}</p>
                <p className="text-xs text-green-700 leading-relaxed">
                  {lang === 'zh'
                    ? '研究顯示有效果，而偏差會使效果看起來更小 → 真實效果只會更大，偏差方向強化結論。'
                    : 'Study shows an effect, and bias would have decreased it → true effect is only larger, bias reinforces conclusion.'}
                </p>
              </div>
              <div className="rounded-lg p-3 bg-red-50">
                <p className="text-xs font-bold text-red-800 mb-1">{lang === 'zh' ? '需要扣分的情境' : 'Should Downgrade'}</p>
                <p className="text-xs text-red-700 leading-relaxed">
                  {lang === 'zh'
                    ? '研究顯示有效果，但偏差可能誇大了效果 → 真實效果可能更小甚至不存在。'
                    : 'Study shows an effect, but bias may have exaggerated it → true effect may be smaller or nonexistent.'}
                </p>
              </div>
            </div>
          </Accordion>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <PracticeSection questions={practiceQuestions.grade_rob} title={{ zh: '誤差風險 練習題', en: 'Risk of Bias Practice' }} />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════ */}
      {/* TAB: Indirectness */}
      {/* ═══════════════════════════════════════ */}
      {activeTab === 'indirectness' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            🔀 {lang === 'zh' ? '不直接性 (Indirectness)' : 'Indirectness'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '不直接性 = 現有最佳證據的 PICO 與我們的目標 PICO 不完全匹配。'
              : 'Indirectness = the best available evidence\'s PICO doesn\'t fully match our target PICO.'}
          </p>

          <Accordion title={lang === 'zh' ? '四個 PICO 元素逐項比較' : 'Compare Each PICO Element'} icon="🔎" defaultOpen>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ background: C.tealLight }}>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">PICO</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '常見問題' : 'Common Issues'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '扣分可能性' : 'Likelihood of Downgrading'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pico: 'P', issueZh: '年齡差異、族群隨時間改變、疾病定義不同', issueEn: 'Age differences, population changes over time, different disease definitions', likeZh: '低（相對效果通常跨族群一致）', likeEn: 'Low (relative effects usually consistent)' },
                    { pico: 'I', issueZh: '劑量/療程不同、依從性低、技術演進', issueEn: 'Dose/duration differences, non-adherence, technology evolution', likeZh: '中等（取決於生物學合理性和差異大小）', likeEn: 'Moderate (depends on biology and magnitude)' },
                    { pico: 'C', issueZh: '用安慰劑而非活性對照、次優對照組', issueEn: 'Placebo instead of active comparator, suboptimal control', likeZh: '高（企業贊助研究常選用次優對照）', likeEn: 'High (industry trials often use suboptimal comparators)' },
                    { pico: 'O', issueZh: '替代結果指標（surrogates）、追蹤時間不同', issueEn: 'Surrogate outcomes, different follow-up duration', likeZh: '高（替代指標常令人失望）', likeEn: 'High (surrogates frequently disappoint)' },
                  ].map(({ pico, issueZh, issueEn, likeZh, likeEn }) => (
                    <tr key={pico} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border border-gray-200 font-bold text-teal-700">{pico}</td>
                      <td className="px-3 py-2 border border-gray-200 text-gray-600">{lang === 'zh' ? issueZh : issueEn}</td>
                      <td className="px-3 py-2 border border-gray-200 text-gray-600">{lang === 'zh' ? likeZh : likeEn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '替代結果指標（Surrogates）：最大的陷阱' : 'Surrogate Outcomes: The Biggest Pitfall'} icon="🪤">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? '當沒有病人重要結果的資料時，可能只有替代指標（如心臟功能代替死亡率、骨密度代替骨折）。此時：'
                  : 'When patient-important outcome data is unavailable, only surrogates may exist (e.g., cardiac function instead of mortality). In this case:'}
              </p>
              <div className="space-y-2">
                <div className="bg-amber-50 rounded-lg p-3">
                  <p className="text-xs text-amber-800">
                    {lang === 'zh'
                      ? '替代指標改善不一定代表病人結果改善。根據替代指標與病人結果的關聯強度，扣 1 或 2 分。'
                      : 'Improvement in surrogate doesn\'t guarantee improvement in patient outcome. Downgrade 1 or 2 depending on strength of surrogate-outcome relationship.'}
                  </p>
                </div>
              </div>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '不要忘記間接證據的價值' : 'Don\'t Forget the Value of Indirect Evidence'} icon="💡">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {lang === 'zh'
                  ? '即使直接證據有限，間接證據仍然比「沒有證據」好。例如：成人的資料用於兒童、相關疾病的資料用於目標疾病。關鍵是要明確標示為間接證據，並適當扣分。'
                  : 'Even limited indirect evidence is better than "no evidence." For example, adult data applied to children, or data from related conditions. The key is to explicitly label it as indirect and downgrade appropriately.'}
              </p>
            </div>
          </Accordion>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <PracticeSection questions={practiceQuestions.grade_indirectness} title={{ zh: '不直接性 練習題', en: 'Indirectness Practice' }} />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════ */}
      {/* TAB: Publication Bias */}
      {/* ═══════════════════════════════════════ */}
      {activeTab === 'pubbias' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            📰 {lang === 'zh' ? '發表偏誤 (Publication Bias)' : 'Publication Bias'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '發表偏誤 = 結果不理想的研究沒有被發表，導致合併估計值被高估。'
              : 'Publication bias = studies with unfavorable results were not published, inflating the pooled estimate.'}
          </p>

          <Accordion title={lang === 'zh' ? '決策流程' : 'Decision Flow'} icon="🗺️" defaultOpen>
            <StepFlow lang={lang} steps={[
              { zh: '所有研究都是小型且企業贊助？→ 直接扣分。', en: 'All studies small and industry-sponsored? → Downgrade directly.' },
              { zh: '否 → 是否有 ≥ 10 篇研究可做統計分析？', en: 'No → Are there ≥ 10 studies for statistical analysis?' },
              { zh: '是 → 檢查漏斗圖是否對稱 + Egger\'s test。不對稱 → 扣分。', en: 'Yes → Check funnel plot symmetry + Egger\'s test. Asymmetric → downgrade.' },
              { zh: '否 → 有沒有已知但未發表的研究（如在註冊資料庫中）？有 → 扣分。', en: 'No → Are there known unpublished studies (e.g., in trial registries)? Yes → downgrade.' },
              { zh: '以上都沒有 → 標記為「未偵測到」，不扣分。', en: 'None of the above → mark as "undetected," no downgrade.' },
            ]} />
          </Accordion>

          <Accordion title={lang === 'zh' ? '漏斗圖怎麼看？' : 'How to Read a Funnel Plot'} icon="📊">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? '漏斗圖中，每個點代表一個研究。X 軸是效果量，Y 軸是精確度（或樣本大小）。'
                  : 'In a funnel plot, each dot is a study. X-axis = effect size, Y-axis = precision (or sample size).'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg p-3 bg-green-50 text-center">
                  <p className="text-2xl mb-1">🔺</p>
                  <p className="text-xs font-bold text-green-800">{lang === 'zh' ? '對稱' : 'Symmetric'}</p>
                  <p className="text-xs text-green-700">{lang === 'zh' ? '→ 不太像有發表偏誤' : '→ Less likely publication bias'}</p>
                </div>
                <div className="rounded-lg p-3 bg-red-50 text-center">
                  <p className="text-2xl mb-1">◣</p>
                  <p className="text-xs font-bold text-red-800">{lang === 'zh' ? '不對稱（缺右下角）' : 'Asymmetric (missing bottom-right)'}</p>
                  <p className="text-xs text-red-700">{lang === 'zh' ? '→ 可能有小型負面研究未發表' : '→ Small negative studies may be unpublished'}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                {lang === 'zh'
                  ? '⚠️ 不對稱不一定等於發表偏誤，也可能是小研究效應（small study effects）。'
                  : '⚠️ Asymmetry doesn\'t always mean publication bias — it could also be small study effects.'}
              </p>
            </div>
          </Accordion>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <PracticeSection questions={practiceQuestions.grade_pub_bias} title={{ zh: '發表偏誤 練習題', en: 'Publication Bias Practice' }} />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════ */}
      {/* TAB: Summary of Findings Table */}
      {/* ═══════════════════════════════════════ */}
      {activeTab === 'sof' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            📋 {lang === 'zh' ? 'Summary of Findings 表格' : 'Summary of Findings Table'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? 'SoF 表格是 GRADE 的核心產出。每一列是一個結果指標，系統化呈現效果估計值、確定性等級和白話結論。'
              : 'The SoF table is GRADE\'s core output. Each row is an outcome, systematically presenting effect estimates, certainty level, and plain-language conclusions.'}
          </p>

          <Accordion title={lang === 'zh' ? 'SoF 表格必備欄位' : 'Required SoF Table Columns'} icon="📝" defaultOpen>
            <div className="mt-3 space-y-2">
              {[
                { zh: '結果指標名稱 + 測量方式 + 追蹤時間', en: 'Outcome name + measurement + follow-up duration' },
                { zh: '研究數量 + 受試者人數', en: 'Number of studies + participants' },
                { zh: '相對效果（RR/OR/HR + 95% CI）', en: 'Relative effect (RR/OR/HR + 95% CI)' },
                { zh: '絕對效果：對照組和介入組的事件率 + 風險差（risk difference）', en: 'Absolute effect: control and intervention event rates + risk difference' },
                { zh: '證據確定性等級 + 降級原因', en: 'Certainty of evidence + reasons for downgrading' },
                { zh: '白話語言摘要', en: 'Plain language summary' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-teal-50/50 rounded-lg px-3 py-2">
                  <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                  <span className="text-sm text-gray-700">{lang === 'zh' ? item.zh : item.en}</span>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '絕對效果的計算' : 'Calculating Absolute Effects'} icon="🧮">
            <div className="mt-3">
              <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-center mb-3">
                <p className="text-gray-800">{lang === 'zh' ? '絕對風險差' : 'Absolute Risk Difference'} = baseline risk × (1 − RR)</p>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {lang === 'zh'
                  ? '例如：baseline risk = 60/1000，RR = 0.15 → 絕對風險差 = 60 × (1 − 0.15) = 51 fewer per 1000。'
                  : 'Example: baseline risk = 60/1000, RR = 0.15 → risk difference = 60 × (1 − 0.15) = 51 fewer per 1000.'}
              </p>
              <div className="bg-amber-50 rounded-lg p-3 mt-3">
                <p className="text-xs text-amber-800">
                  {lang === 'zh'
                    ? '💡 不同 baseline risk 的族群要分開計算。同一個 RR 在高風險族群中的絕對效果遠大於低風險族群。'
                    : '💡 Calculate separately for groups with different baseline risks. The same RR produces much larger absolute effects in high-risk groups.'}
                </p>
              </div>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '連續型結果的呈現方式' : 'Presenting Continuous Outcomes'} icon="📊">
            <div className="mt-3 space-y-3">
              {[
                { numZh: '方法 1：轉換為指標量表（推薦）', numEn: 'Method 1: Convert to Index Instrument (Preferred)',
                  descZh: '選一個最常見的量表作為基準，把其他量表的分數轉換過來，用均差 (MD) 呈現，並標示 MID。',
                  descEn: 'Choose one common instrument as the index, convert other scores, present as MD, and mark the MID.' },
                { numZh: '方法 2：轉換為二元結果', numEn: 'Method 2: Convert to Binary Outcome',
                  descZh: '計算達到 MID 改善的比例，用 RR 或 risk difference 呈現。臨床醫師較熟悉這種表述。',
                  descEn: 'Calculate proportion achieving MID improvement, present as RR or risk difference. More familiar to clinicians.' },
                { numZh: '方法 3：SMD（盡量避免）', numEn: 'Method 3: SMD (Avoid if Possible)',
                  descZh: '標準化均差用統計單位（SD 單位），臨床醫師不好理解。只在沒有 MID 可用時才考慮。',
                  descEn: 'Standardized mean difference uses statistical units (SD units), hard for clinicians to interpret. Only use when no MID is available.' },
              ].map(({ numZh, numEn, descZh, descEn }, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-100 p-3">
                  <p className="text-sm font-semibold text-teal-700">{lang === 'zh' ? numZh : numEn}</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{lang === 'zh' ? descZh : descEn}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      )}

      {/* Back link */}
      <div className="mt-8 pt-4 border-t border-gray-100">
        <a href="/toolbox" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
          ← {lang === 'zh' ? '返回工具箱' : 'Back to Toolbox'}
        </a>
      </div>
    </div>
  );
}
