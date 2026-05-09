// src/pages/reference/MidGuide.jsx
// MID (Minimal Important Difference) — comprehensive guide
// Sources:
//   Core GRADE 1–7 (BMJ 2025;389:e081903–e083867) — overview, imprecision, EtD, SoF
//   GRADE Guidance 35 (J Clin Epidemiol 2022;150:225–242) — contextualized imprecision, RIS, 7-category scale, rate down 1/2/3
//   Carrasco-Labra et al. (J Clin Epidemiol 2021;133:61–71) — MID systematic survey
//   Devji et al. (BMJ 2020;369:m1714) — credibility instrument
//   Jaeschke R, Singer J, Guyatt GH (Control Clin Trials 1989;10:407–15) — original MID concept

import React, { useState } from 'react';
import { useLang } from '../../App';
import { HamsterThinking, HamsterConcerned } from '../../components/Hamster';
import EffectScale from '../../components/EffectScale';
import { PracticeSection } from '../../components/PracticeQuestion';
import practiceQuestions from '../../data/practice';

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

// ─── Method card ───
function MethodCard({ number, icon, titleZh, titleEn, descZh, descEn, prosZh, prosEn, consZh, consEn, exampleZh, exampleEn, lang }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden mb-3 hover:shadow-sm transition-shadow bg-white">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start gap-3 px-4 py-3.5 text-left">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5" style={{ background: '#0E7C86' }}>
          {number}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800">{icon} {lang === 'zh' ? titleZh : titleEn}</p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{lang === 'zh' ? descZh : descEn}</p>
        </div>
        <svg className={`w-4 h-4 text-gray-300 flex-shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-50 space-y-3">
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-lg p-2.5 bg-green-50">
              <p className="text-xs font-semibold text-green-700 mb-1">✅ {lang === 'zh' ? '優點' : 'Strengths'}</p>
              <p className="text-xs text-green-600 leading-relaxed">{lang === 'zh' ? prosZh : prosEn}</p>
            </div>
            <div className="rounded-lg p-2.5 bg-red-50">
              <p className="text-xs font-semibold text-red-700 mb-1">⚠️ {lang === 'zh' ? '限制' : 'Limitations'}</p>
              <p className="text-xs text-red-600 leading-relaxed">{lang === 'zh' ? consZh : consEn}</p>
            </div>
          </div>
          {exampleZh && (
            <div className="rounded-lg p-3 bg-blue-50 border border-blue-100">
              <p className="text-xs font-semibold text-blue-700 mb-1">💡 {lang === 'zh' ? '範例' : 'Example'}</p>
              <p className="text-xs text-blue-600 leading-relaxed">{lang === 'zh' ? exampleZh : exampleEn}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Worked example wrapper ───
function WorkedExample({ titleZh, titleEn, contextZh, contextEn, scaleProps, lang, takeawayZh, takeawayEn }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
      <h4 className="font-bold text-sm text-teal-800 mb-1">{lang === 'zh' ? titleZh : titleEn}</h4>
      <p className="text-xs text-gray-600 leading-relaxed mb-3">{lang === 'zh' ? contextZh : contextEn}</p>
      <EffectScale {...scaleProps} lang={lang} />
      <div className="bg-teal-50/50 rounded-lg px-3 py-2 mt-2">
        <p className="text-xs font-semibold text-teal-700 mb-0.5">🎯 {lang === 'zh' ? '結論' : 'Takeaway'}</p>
        <p className="text-xs text-teal-700 leading-relaxed">{lang === 'zh' ? takeawayZh : takeawayEn}</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════
export default function MidGuide() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('what');

  const tabs = [
    { id: 'what', zh: 'MID 是什麼', en: 'What is MID', icon: '❓' },
    { id: 'thresholds', zh: '閾值與量表', en: 'Thresholds', icon: '📏' },
    { id: 'methods', zh: '訂定方法', en: 'Methods', icon: '🔧' },
    { id: 'credibility', zh: '可信度', en: 'Credibility', icon: '🔍' },
    { id: 'imprecision', zh: '不精確性', en: 'Imprecision', icon: '🎯' },
    { id: 'examples', zh: '工作範例', en: 'Worked Examples', icon: '📚' },
    { id: 'practice', zh: '練習', en: 'Practice', icon: '🏋️' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <HamsterThinking size={48} />
        <div>
          <h1 className="font-bold text-3xl" style={{ color: '#0E7C86' }}>
            MID {lang === 'zh' ? '完整指南' : 'Complete Guide'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {lang === 'zh'
              ? '最小重要差異 — 連結證據、確定性、與臨床決策的關鍵閾值'
              : 'Minimal Important Difference — the threshold linking evidence, certainty, and clinical decisions'}
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

      {/* ═══════════════════════════════════════════════ */}
      {/* TAB: What is MID */}
      {/* ═══════════════════════════════════════════════ */}
      {activeTab === 'what' && (
        <div>
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-base text-teal-800 mb-2">
              {lang === 'zh' ? 'MID = 病人認為有意義的最小差異' : 'MID = Smallest Change Patients Perceive as Important'}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {lang === 'zh'
                ? 'MID（Minimal Important Difference）是「病人認為有意義的最小改變量」。它回答一個核心問題：治療效果要多大，才算對病人真的有幫助？這個概念由 Jaeschke、Singer 和 Guyatt 於 1989 年首次提出。'
                : 'MID (Minimal Important Difference) is "the smallest change in an outcome patients perceive as important." It answers: how large must an effect be to truly matter to patients? First proposed by Jaeschke, Singer & Guyatt in 1989.'}
            </p>
          </div>

          <Accordion title={lang === 'zh' ? '為什麼需要 MID？' : 'Why Do We Need MID?'} icon="🤔" defaultOpen>
            <div className="mt-3 space-y-3">
              {[
                { zh: '統計顯著 ≠ 臨床顯著。RR 0.99 (CI 0.98–1.00) 可以統計顯著，但效果微乎其微。', en: 'Statistical significance ≠ clinical significance. RR 0.99 (CI 0.98–1.00) can be statistically significant but clinically trivial.' },
                { zh: '相同的相對效果在不同 baseline risk 下，絕對效果天差地遠。50% RRR 可以是 1%→0.5%（微小），也可以是 40%→20%（巨大）。', en: 'Same relative effect yields vastly different absolute effects at different baseline risks. 50% RRR could be 1%→0.5% (trivial) or 40%→20% (huge).' },
                { zh: 'MID 是 GRADE 不精確性評估的閾值：CI 是否跨越 MID 決定了是否扣分以及扣幾分。', en: 'MID is the threshold for GRADE imprecision: whether (and how many times) the CI crosses MID-related thresholds determines downgrading.' },
                { zh: 'MID 是 EtD 框架中權衡利弊的基礎：效果是否達到 MID 決定了推薦方向與強度。', en: 'MID is the basis for benefit-harm trade-offs in EtD: whether the effect reaches MID shapes recommendation direction and strength.' },
                { zh: 'MID 是「不一致性」第三個視覺判斷標準：研究的點估計值是否落在 MID 同一側。', en: 'MID is the third visual criterion for "inconsistency": whether study point estimates fall on the same side of MID.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-teal-50/40 rounded-lg px-3 py-2">
                  <span className="text-teal-500 mt-0.5 flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{lang === 'zh' ? item.zh : item.en}</p>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? 'MID 反映的是價值偏好梯度' : 'MID Reflects the Value-Preference Gradient'} icon="❤️">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? '不同結果指標的 MID 不同。這個差異本身就是病人價值偏好的「量化」：MID 越小 = 病人越在意（即使一點點差異都重要）。例如：'
                  : 'Different outcomes have different MIDs. The differences themselves quantify patient value preferences: smaller MID = patients care more (even tiny differences matter). For example:'}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ background: '#E8F6F7' }}>
                      <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '結果指標' : 'Outcome'}</th>
                      <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">MID</th>
                      <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '意義' : 'Implication'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { outcomeZh: '死亡率', outcomeEn: 'Mortality', mid: '1%', implZh: '極微小的差異就很重要', implEn: 'Even tiny differences matter' },
                      { outcomeZh: '中風', outcomeEn: 'Stroke', mid: '2%', implZh: '非常重要但略低於死亡', implEn: 'Very important, slightly below mortality' },
                      { outcomeZh: '心肌梗塞', outcomeEn: 'MI', mid: '3%', implZh: '重要但可恢復', implEn: 'Important but recoverable' },
                      { outcomeZh: '嚴重出血', outcomeEn: 'Major bleeding', mid: '5%', implZh: '需要較大差異才算重要', implEn: 'Requires larger difference to be important' },
                    ].map(({ outcomeZh, outcomeEn, mid, implZh, implEn }) => (
                      <tr key={mid} className="hover:bg-gray-50">
                        <td className="px-3 py-2 border border-gray-200 font-medium">{lang === 'zh' ? outcomeZh : outcomeEn}</td>
                        <td className="px-3 py-2 border border-gray-200 font-mono text-teal-700 font-bold">{mid}</td>
                        <td className="px-3 py-2 border border-gray-200 text-gray-600">{lang === 'zh' ? implZh : implEn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                {lang === 'zh'
                  ? '↑ 死亡率的 MID (1%) 是出血 MID (5%) 的 1/5 → 死亡的重要性是出血的 5 倍。MID 的梯度就是價值偏好的量化。（引自 Core GRADE 7）'
                  : '↑ Mortality MID (1%) is 1/5 of bleeding MID (5%) → mortality is 5× more important than bleeding. The MID gradient quantifies value preferences. (From Core GRADE 7)'}
              </p>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? 'Anchor-based vs Distribution-based' : 'Anchor-based vs Distribution-based'} icon="⚖️">
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl p-4 border-2 border-teal-300 bg-teal-50/30">
                <p className="font-bold text-sm text-teal-800 mb-2">Anchor-based ⭐</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  {lang === 'zh'
                    ? '以外部「錨」（如病人自評的整體改善程度，Global Rating of Change）作為參照，將量表分數的變化與病人感受連結。'
                    : 'Uses an external "anchor" (e.g., patient-rated Global Rating of Change) to link score changes to patient perception.'}
                </p>
                <p className="text-xs text-teal-700 font-medium">
                  {lang === 'zh' ? '✅ 納入病人觀點 → GRADE 推薦使用' : '✅ Incorporates patient perspective → recommended by GRADE'}
                </p>
              </div>
              <div className="rounded-xl p-4 border border-gray-200">
                <p className="font-bold text-sm text-gray-700 mb-2">Distribution-based</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  {lang === 'zh'
                    ? '根據資料的統計特性推估：0.5 SD（Norman 法則）、SEM、Cohen\'s effect size。不直接涉及病人觀點。'
                    : 'Based on statistical properties: 0.5 SD (Norman\'s rule), SEM, Cohen\'s effect size. Doesn\'t directly involve patient perspective.'}
                </p>
                <p className="text-xs text-red-600 font-medium">
                  {lang === 'zh' ? '⚠️ 不反映病人感受 → 單獨使用時可信度有限' : '⚠️ Doesn\'t reflect patient perception → limited credibility when used alone'}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              {lang === 'zh'
                ? '💡 GRADE Guidance 35 提供折衷方案：當沒有 anchor-based MID 時，可使用 Cohen 的標準化均差閾值（small SMD = 0.2，moderate = 0.5，large = 0.8），其中 SMD = 0.2 對應到「small effect」的閾值，可作為實務上的 MID。'
                : '💡 GRADE Guidance 35 offers a middle path: when no anchor-based MID exists, use Cohen\'s SMD thresholds (small = 0.2, moderate = 0.5, large = 0.8). SMD = 0.2 corresponds to the "small effect" threshold and serves as a pragmatic MID.'}
            </p>
          </Accordion>

          <Accordion title={lang === 'zh' ? 'GRADE 的三種「脈絡化」方法' : "GRADE's Three Contextualization Approaches"} icon="🧭">
            <div className="mt-3 space-y-3">
              {[
                { titleZh: '極簡脈絡化 (Minimally contextualized)', titleEn: 'Minimally contextualized',
                  descZh: '通常用於系統性回顧。使用「null」閾值，不做價值判斷。問題只是：「是否存在效果？」',
                  descEn: 'Typical for systematic reviews. Uses the "null" threshold, no value judgment. Asks only: "Does an effect exist?"' },
                { titleZh: '部分脈絡化 (Partially contextualized) ⭐', titleEn: 'Partially contextualized ⭐',
                  descZh: '使用 MID 並判斷效果為 trivial / small / moderate / large。GRADE Guidance 35 推薦的標準方法。',
                  descEn: 'Uses MID and classifies effect as trivial / small / moderate / large. The standard approach recommended by Guidance 35.' },
                { titleZh: '完全脈絡化 (Fully contextualized)', titleEn: 'Fully contextualized',
                  descZh: '同時考慮所有結果的淨平衡 + EtD 因素（成本、可行性等）。權衡「淨利益效用」與「淨傷害效用」。',
                  descEn: 'Considers net balance across all outcomes + EtD factors (cost, feasibility, etc.). Trades off "utility-weighted net benefit" against "utility-weighted net harm".' },
              ].map(({ titleZh, titleEn, descZh, descEn }, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-100 p-3">
                  <p className="text-sm font-semibold text-teal-700">{lang === 'zh' ? titleZh : titleEn}</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{lang === 'zh' ? descZh : descEn}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              {lang === 'zh'
                ? '💡 MID 的角色隨脈絡化程度而異：極簡 → 不需要；部分 → 必要；完全 → 必要 + 加上跨結果效用權衡。'
                : '💡 MID\'s role varies by contextualization: minimal → not needed; partial → required; full → required + utility-weighting across outcomes.'}
            </p>
          </Accordion>
        </div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* TAB: Thresholds & 7-Category Scale */}
      {/* ═══════════════════════════════════════════════ */}
      {activeTab === 'thresholds' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            📏 {lang === 'zh' ? '閾值框架與七類效果量表' : 'Threshold Framework & 7-Category Scale'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '每次評估確定性，第一步是選擇閾值。Core GRADE 提供兩個選項：null（是否存在效果）或 MID（效果是否重要）。Guidance 35 進一步擴展為 7 類量表。'
              : 'Every certainty rating starts with choosing a threshold. Core GRADE offers two options: null (does an effect exist?) or MID (is the effect important?). Guidance 35 extends this to a 7-category scale.'}
          </p>

          {/* Null vs MID decision */}
          <Accordion title={lang === 'zh' ? 'Step 1：null 還是 MID？' : 'Step 1: Null or MID?'} icon="🧭" defaultOpen>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border-2 border-gray-200 p-4">
                <h4 className="font-bold text-gray-800 text-sm mb-2">{lang === 'zh' ? 'Null 閾值' : 'Null Threshold'}</h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  {lang === 'zh'
                    ? '問：「是否存在真實效果？」（RD = 0 或 RR = 1）'
                    : 'Asks: "Does a true effect exist?" (RD = 0 or RR = 1)'}
                </p>
                <p className="text-xs text-gray-500">
                  <strong>{lang === 'zh' ? '何時使用：' : 'When to use:'}</strong>
                  {lang === 'zh'
                    ? ' 系統性回顧作者不想做價值判斷時；目標族群價值偏好不明時。'
                    : ' Systematic review authors who want to minimize value judgments; when target-population values are unknown.'}
                </p>
              </div>
              <div className="rounded-xl border-2 border-teal-300 p-4 bg-teal-50/30">
                <h4 className="font-bold text-teal-800 text-sm mb-2">{lang === 'zh' ? 'MID 閾值 ⭐ 推薦' : 'MID Threshold ⭐ Preferred'}</h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  {lang === 'zh'
                    ? '問：「效果夠大到對病人有意義嗎？」（point estimate vs MID）'
                    : 'Asks: "Is the effect large enough to matter to patients?" (point estimate vs MID)'}
                </p>
                <p className="text-xs text-teal-700">
                  <strong>{lang === 'zh' ? '何時使用：' : 'When to use:'}</strong>
                  {lang === 'zh'
                    ? ' 健康技術評估、指引制定；任何需要將證據連結到決策的情境。'
                    : ' Health technology assessments, guideline development; any setting connecting evidence to decisions.'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* Plain language statements */}
          <Accordion title={lang === 'zh' ? 'Step 2：白話語言反映你的選擇' : 'Step 2: Plain Language Reflects Your Choice'} icon="🗣️" defaultOpen>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ background: '#E8F6F7' }}>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '確定性' : 'Certainty'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '使用 Null 閾值' : 'Null Threshold'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '使用 MID 閾值' : 'MID Threshold'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { lvl: 'High ★★★★', nullZh: '治療有益處', nullEn: 'Treatment has a benefit', midZh: '治療有重要益處 ／ 沒有重要差異', midEn: 'Treatment has an important benefit / has little to no benefit' },
                    { lvl: 'Moderate ★★★', nullZh: '治療很可能有益處', nullEn: 'Treatment likely has a benefit', midZh: '治療很可能有重要益處 ／ 很可能沒有重要差異', midEn: 'Treatment likely has an important benefit / likely has little to no benefit' },
                    { lvl: 'Low ★★', nullZh: '治療可能有益處', nullEn: 'Treatment may have a benefit', midZh: '治療可能有重要益處 ／ 可能沒有重要差異', midEn: 'Treatment may have an important benefit / may have little to no benefit' },
                    { lvl: 'Very Low ★', nullZh: '我們非常不確定', nullEn: 'Very uncertain about the effect', midZh: '同左', midEn: 'Same' },
                  ].map(({ lvl, nullZh, nullEn, midZh, midEn }) => (
                    <tr key={lvl} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border border-gray-200 font-medium font-mono">{lvl}</td>
                      <td className="px-3 py-2 border border-gray-200 text-gray-600">{lang === 'zh' ? nullZh : nullEn}</td>
                      <td className="px-3 py-2 border border-gray-200 text-gray-600">{lang === 'zh' ? midZh : midEn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              {lang === 'zh'
                ? '💡 注意：用 MID 閾值時，「重要益處」(important benefit) 才是正確語言。「益處」(benefit) 可能涵蓋微小到不重要的效果。'
                : '💡 Note: with MID threshold, "important benefit" is the correct language. Plain "benefit" may encompass effects too small to matter.'}
            </p>
          </Accordion>

          {/* The 7-category scale */}
          <Accordion title={lang === 'zh' ? '七類效果量表（Guidance 35）' : '7-Category Effect-Size Scale (Guidance 35)'} icon="📊" defaultOpen>
            <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3">
              {lang === 'zh'
                ? 'GRADE Guidance 35 (2022) 將效果分為 7 類：每側（益處／傷害）有 small / moderate / large 三個範圍，加上中間的 trivial / no effect。MID 是「trivial」與「small」之間的閾值。'
                : 'GRADE Guidance 35 (2022) divides effects into 7 categories: each side (benefit / harm) has small / moderate / large ranges, plus a central trivial / no effect zone. MID is the boundary between "trivial" and "small".'}
            </p>
            <EffectScale
              thresholds={{ small: 10, moderate: 25, large: 50 }}
              unit={{ zh: '範例：每 1000 人事件數', en: 'Example: events per 1000' }}
              outcomeLabel={{ zh: '七類效果量表（無 CI 疊加）', en: '7-category scale (no CI overlay)' }}
              lang={lang}
              showCategoryLabels={true}
            />
            <div className="bg-teal-50/50 rounded-lg p-3 mt-3">
              <p className="text-xs text-teal-800 leading-relaxed">
                {lang === 'zh'
                  ? '⭐ 關鍵概念：「MID」其實是「trivial → small」的過渡點。換句話說，效果 < MID 不代表「沒有效果」，而是「效果太小，病人感受不到」。'
                  : '⭐ Key insight: "MID" is actually the transition from "trivial" to "small". In other words, effect < MID doesn\'t mean "no effect" — it means "effect too small for patients to perceive."'}
              </p>
            </div>
          </Accordion>

          {/* Rate down 1, 2, or 3 levels */}
          <Accordion title={lang === 'zh' ? '扣分 1、2、3 級的視覺判斷' : 'Visual Judgment: Rate Down 1, 2, or 3 Levels'} icon="📉" defaultOpen>
            <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3">
              {lang === 'zh'
                ? 'CI 跨越 1 個閾值 → 扣 1 分；跨越 2 個 → 扣 2 分；跨越 3 個 → 扣 3 分。Guidance 35 之前的版本最多扣 2 分；現在最多可扣 3 分。'
                : 'CI crosses 1 threshold → downgrade 1; 2 thresholds → downgrade 2; 3 thresholds → downgrade 3. Pre-Guidance-35 max was 2; now up to 3.'}
            </p>
            <div className="space-y-3">
              <EffectScale
                thresholds={{ small: 10, moderate: 25, large: 50 }}
                pointEst={-30} ciLow={-45} ciHigh={-15}
                unit={{ zh: '每 1000 人', en: 'per 1000' }}
                outcomeLabel={{ zh: '範例 1：CI 跨越 1 個閾值（small benefit ↔ moderate benefit）→ 扣 1 分', en: 'Example 1: CI crosses 1 threshold (small ↔ moderate benefit) → downgrade 1' }}
                lang={lang}
              />
              <EffectScale
                thresholds={{ small: 10, moderate: 25, large: 50 }}
                pointEst={-20} ciLow={-40} ciHigh={5}
                unit={{ zh: '每 1000 人', en: 'per 1000' }}
                outcomeLabel={{ zh: '範例 2：CI 跨越 2 個閾值（moderate benefit → small benefit → trivial）→ 扣 2 分', en: 'Example 2: CI crosses 2 thresholds (moderate → small benefit → trivial) → downgrade 2' }}
                lang={lang}
              />
              <EffectScale
                thresholds={{ small: 10, moderate: 25, large: 50 }}
                pointEst={-15} ciLow={-50} ciHigh={20}
                unit={{ zh: '每 1000 人', en: 'per 1000' }}
                outcomeLabel={{ zh: '範例 3：CI 跨越 3 個閾值（CI 包含大益、小益、無效果、小害）→ 扣 3 分', en: 'Example 3: CI crosses 3 thresholds (large benefit → small → trivial → small harm) → downgrade 3' }}
                lang={lang}
              />
            </div>
          </Accordion>

          {/* MID for benefit + MID for harm */}
          <Accordion title={lang === 'zh' ? 'MID for benefit ＋ MID for harm（雙閾值）' : 'MID for Benefit AND MID for Harm (Dual Thresholds)'} icon="↔️">
            <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3">
              {lang === 'zh'
                ? '當 CI 同時跨越「重要益處」和「重要傷害」的 MID → 至少扣 2 分。Core GRADE 2 範例：vasculitis 試驗的死亡率 RD = -21/1000 (CI: -60 to +36)，CI 兩端都跨越 MID = ±10/1000 → 扣 2 分。'
                : 'When the CI crosses both the MID for benefit AND the MID for harm → downgrade at least 2 levels. Core GRADE 2 example: vasculitis trial mortality RD = -21/1000 (CI: -60 to +36); CI crosses MID = ±10/1000 on both sides → downgrade 2.'}
            </p>
            <EffectScale
              thresholds={{ small: 10, moderate: 25, large: 50 }}
              pointEst={-21} ciLow={-60} ciHigh={36}
              unit={{ zh: '每 1000 人', en: 'per 1000' }}
              outcomeLabel={{ zh: 'Vasculitis 範例：CI 包含「重要益處」與「重要傷害」', en: 'Vasculitis example: CI includes important benefit AND important harm' }}
              lang={lang}
            />
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              {lang === 'zh'
                ? '💡 白話語言判斷：應該說「降低劑量類固醇可能 (may) 減少死亡」（扣 2 分）還是「很可能 (likely) 減少死亡」（扣 1 分）？此處 CI 包含明顯的傷害，「may」更合適 → 扣 2 分。'
                : '💡 Plain-language judgment: should we say "lower-dose steroids may reduce mortality" (downgrade 2) or "likely reduces mortality" (downgrade 1)? Here CI includes important harm, so "may" is more appropriate → downgrade 2.'}
            </p>
          </Accordion>
        </div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* TAB: Methods to determine MID */}
      {/* ═══════════════════════════════════════════════ */}
      {activeTab === 'methods' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            🔧 {lang === 'zh' ? '四種 MID 訂定方法' : 'Four Methods to Determine MID'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '從最理想到最務實排列。實務上常結合多種方法。'
              : 'Ordered from ideal to pragmatic. In practice, methods are often combined.'}
          </p>

          <MethodCard number="1" icon="📚" lang={lang}
            titleZh="文獻系統性搜尋" titleEn="Systematic Literature Search"
            descZh="搜尋已發表的 anchor-based MID 研究。可使用 PROMID 資料庫（promid.org）查詢 526 種量表的 5,324 個 MID 估計值。"
            descEn="Search for published anchor-based MID studies. The PROMID database (promid.org) holds 5,324 MID estimates for 526 PROMs."
            prosZh="最客觀、可重複驗證。有現成的可信度評估工具（Devji et al. 2020）可判斷品質。"
            prosEn="Most objective and reproducible. A credibility instrument (Devji et al. 2020) is available for quality assessment."
            consZh="很多結果指標沒有已發表的 MID。同一量表可能有多個不同的 MID 值，需要判斷選用。"
            consEn="Many outcomes lack published MIDs. Same instrument may have multiple different MID values requiring selection judgment."
            exampleZh="2024 競賽：搜尋到近視領域已知的年進展率（SE 下降 0.5D），以 50% 改善為基準，計算 MID = 0.5 ÷ 2 = 0.25D。"
            exampleEn="2024 competition: Found known annual myopia progression (0.5D SE decline), used 50% improvement benchmark, MID = 0.5 ÷ 2 = 0.25D."
          />

          <MethodCard number="2" icon="🩺" lang={lang}
            titleZh="臨床專家經驗" titleEn="Clinician Experience"
            descZh="有共同決策經驗的臨床醫師，從與病人互動的經驗中推估什麼程度的差異對病人有意義。"
            descEn="Clinicians with shared decision-making experience infer meaningful thresholds from their interactions with patients."
            prosZh="快速、不需要額外資源。結合臨床脈絡的實務判斷。"
            prosEn="Fast, no additional resources. Combines practical clinical context."
            consZh="主觀性高，容易受到個人偏見影響。不同專家可能給出非常不同的估計。"
            consEn="Highly subjective, prone to bias. Different experts may give very different estimates."
            exampleZh="一位有豐富抗凝治療經驗的醫師觀察到：孕婦幾乎都選擇注射型肝素而非口服 warfarin，即使注射更不方便——顯示她們認為即使極小的胎兒異常風險也非常重要（MID 很小）。"
            exampleEn="An experienced anticoagulation clinician observed: pregnant women almost always choose heparin injections over warfarin despite inconvenience — indicating even tiny fetal abnormality risk is very important to them (very small MID)."
          />

          <MethodCard number="3" icon="👥" lang={lang}
            titleZh="病人焦點團體" titleEn="Patient Focus Group"
            descZh="直接詢問一小群目標族群的病人：「多大的改善對你來說有意義？」"
            descEn="Directly ask a small group of target patients: 'How much improvement would be meaningful to you?'"
            prosZh="最直接反映病人觀點。美國風濕病學會（ACR）已在所有指引中採用此方法。"
            prosEn="Most directly reflects patient perspective. American College of Rheumatology (ACR) uses this for all guidelines."
            consZh="需要時間和資源召集病人。樣本小、代表性有限。病人可能不熟悉量表的單位。"
            consEn="Requires time and resources. Small sample, limited representativeness. Patients may not understand scale units."
            exampleZh={null} exampleEn={null}
          />

          <MethodCard number="4" icon="📋" lang={lang}
            titleZh="小組結構化問卷（Panel Survey）" titleEn="Structured Panel Survey"
            descZh="透過反覆問卷，從指引小組成員中收斂出 MID 共識。Core GRADE 7 推薦的系統化方法。"
            descEn="Iterative surveys converge on MID consensus among guideline panel members. Recommended by Core GRADE 7."
            prosZh="有結構、可重複。能讓小組成員充分思考。結果透明可追溯。"
            prosEn="Structured, reproducible. Gives panelists time to think. Results transparent and traceable."
            consZh="需要方法學支援。不同小組可能得出不同 MID（這是正常的——反映不同族群的價值觀）。"
            consEn="Requires methodological support. Different panels may reach different MIDs (this is normal — reflects different population values)."
            exampleZh="先提供極低和極高的 MID 選項，請小組成員判斷多數病人會不會認為這個差異重要。逐步收斂，直到一半認為重要、一半認為不重要的閾值 = MID。"
            exampleEn="Present extremely low and high MID options, ask panelists if most patients would consider the difference important. Converge until half consider it important and half do not = MID."
          />

          {/* Reference table for common instruments */}
          <Accordion title={lang === 'zh' ? '常用量表的 MID 參考值' : 'Reference MID Values for Common Instruments'} icon="📋" defaultOpen>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ background: '#E8F6F7' }}>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '量表 / 指標' : 'Instrument / Outcome'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '範圍' : 'Range'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">MID</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '備註' : 'Notes'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { instr: 'Pain VAS', range: '0–10 cm', mid: '1.5 cm', notes: { zh: '常用於急慢性疼痛', en: 'Common for acute/chronic pain' } },
                    { instr: 'Pain VAS', range: '0–100 mm', mid: '15 mm', notes: { zh: '對應 1.5 cm', en: 'Equivalent to 1.5 cm' } },
                    { instr: 'KOOS (knee)', range: '0–100', mid: '12', notes: { zh: 'Mills 2016', en: 'Mills 2016' } },
                    { instr: 'WOMAC (knee/hip)', range: '0–96 (or 0–100)', mid: '~10–12 (~10%)', notes: { zh: 'OARSI/OMERACT 標準', en: 'OARSI/OMERACT standard' } },
                    { instr: 'Oswestry Disability Index', range: '0–100', mid: '10', notes: { zh: 'Copay 2008', en: 'Copay 2008' } },
                    { instr: 'SF-36 PCS / MCS', range: '0–100', mid: '3–5', notes: { zh: 'Norman 0.5 SD 法則', en: 'Norman 0.5 SD rule' } },
                    { instr: 'CRQ (7-point)', range: '1–7', mid: { zh: '0.5 (small) / 1.0 / 1.5', en: '0.5 (small) / 1.0 / 1.5' }, notes: { zh: 'small / moderate / large；Jaeschke 1989', en: 'small / moderate / large; Jaeschke 1989' } },
                    { instr: 'Generic VAS (0–100)', range: '0–100', mid: { zh: '6 / 10 / 14', en: '6 / 10 / 14' }, notes: { zh: 'small / moderate / large；Schunemann 2003', en: 'small / moderate / large; Schunemann 2003' } },
                    { instr: { zh: '死亡率（一般族群）', en: 'Mortality (general)' }, range: '%', mid: '1–2%', notes: { zh: '依基準風險而定', en: 'Varies by baseline risk' } },
                    { instr: { zh: '住院率', en: 'Hospitalization' }, range: '%', mid: '2–5%', notes: { zh: '依疾病嚴重度而定', en: 'Varies by disease severity' } },
                    { instr: { zh: '無 anchor 時 (SMD)', en: 'No anchor (SMD)' }, range: { zh: '無單位', en: 'unitless' }, mid: { zh: '0.2 (small) / 0.5 / 0.8', en: '0.2 (small) / 0.5 / 0.8' }, notes: { zh: 'Cohen 標準效果量', en: 'Cohen\'s standardized effect sizes' } },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border border-gray-200 font-medium">{typeof row.instr === 'object' ? row.instr[lang] : row.instr}</td>
                      <td className="px-3 py-2 border border-gray-200 text-gray-600 font-mono">{typeof row.range === 'object' ? row.range[lang] : row.range}</td>
                      <td className="px-3 py-2 border border-gray-200 font-mono text-teal-700 font-bold">{typeof row.mid === 'object' ? row.mid[lang] : row.mid}</td>
                      <td className="px-3 py-2 border border-gray-200 text-gray-600 text-xs">{row.notes[lang]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              {lang === 'zh'
                ? '⚠️ 這些是「常用參考值」，實際應用時應該：(1) 確認你研究的族群與 MID 來源族群是否相似；(2) 引用具體文獻來源；(3) 用 Devji 五項準則評估可信度。'
                : '⚠️ These are "common references". In practice: (1) check that your population matches the MID-source population; (2) cite specific source; (3) use Devji\'s 5 criteria to assess credibility.'}
            </p>
          </Accordion>

          {/* Decision helper */}
          <div className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="text-sm font-semibold text-amber-800 mb-2">
              {lang === 'zh' ? '🧭 選哪種方法？' : '🧭 Which Method to Choose?'}
            </p>
            <StepFlow lang={lang} steps={[
              { zh: '先搜尋文獻：目標量表是否有已發表的 anchor-based MID？→ 去 promid.org 查詢', en: 'Search literature first: does the target instrument have published anchor-based MIDs? → Check promid.org' },
              { zh: '有 → 評估可信度（見下一頁），選擇最可信且最適用的 MID', en: 'Yes → assess credibility (next tab), choose the most credible and applicable MID' },
              { zh: '沒有 → 諮詢臨床專家 + 考慮病人焦點團體', en: 'No → consult clinical experts + consider patient focus group' },
              { zh: '指引小組 → 使用結構化問卷讓成員收斂共識', en: 'Guideline panel → use structured survey to converge on consensus' },
              { zh: '若連 anchor-based 估計都沒有，連續結果可暫用 SMD 0.2 作為 MID 的 proxy', en: 'If no anchor-based estimate exists, continuous outcomes can use SMD 0.2 as a pragmatic MID proxy' },
              { zh: '任何情況都要在報告中明確說明 MID 的訂定依據', en: 'In all cases, explicitly state MID rationale in your report' },
            ]} />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* TAB: Credibility */}
      {/* ═══════════════════════════════════════════════ */}
      {activeTab === 'credibility' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            🔍 {lang === 'zh' ? 'MID 可信度評估' : 'MID Credibility Assessment'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '當你找到多個 MID 估計值時，如何選擇最可信的？使用 Devji et al.（BMJ 2020）開發的可信度評估工具。'
              : 'When you find multiple MID estimates, how do you choose the most credible? Use the credibility instrument developed by Devji et al. (BMJ 2020).'}
          </p>

          <Accordion title={lang === 'zh' ? '五項核心可信度準則' : 'Five Core Credibility Criteria'} icon="⭐" defaultOpen>
            <div className="mt-3 space-y-3">
              {[
                { numZh: '1. 病人或必要的代理人是否同時回答了量表和錨？',
                  numEn: '1. Did the patient (or necessary proxy) respond to both the PROM and the anchor?',
                  whyZh: 'MID 應反映病人觀點。如果是臨床醫師代替回答，可信度降低。',
                  whyEn: 'MID should reflect patient perspective. If clinicians answered instead, credibility drops.',
                  statZh: '84% 的 MID 估計值符合此標準', statEn: '84% of MID estimates met this criterion' },
                { numZh: '2. 錨是否容易理解且與病人相關？',
                  numEn: '2. Was the anchor easily understandable and relevant to patients?',
                  whyZh: '錨應該直接測量健康狀態的改變（功能、症狀、疾病嚴重度）。',
                  whyEn: 'Anchor should directly measure change in health status (function, symptoms, severity).',
                  statZh: '89% 符合', statEn: '89% met this' },
                { numZh: '3. 錨與量表之間是否有良好的相關性？',
                  numEn: '3. Has the anchor shown good correlation with the PROM?',
                  whyZh: '錨和量表應該測量相同或相似的構念。弱相關的錨會給出誤導性的 MID。',
                  whyEn: 'Anchor and PROM should measure the same construct. Weakly correlated anchors produce misleading MIDs.',
                  statZh: '⚠️ 66% 未報告相關性 — 最常見的可信度缺陷',
                  statEn: '⚠️ 66% did NOT report correlation — most common credibility flaw' },
                { numZh: '4. MID 估計值是否精確？（有 95% CI 嗎？）',
                  numEn: '4. Is the MID estimate precise? (Is a 95% CI provided?)',
                  whyZh: '和任何估計值一樣，MID 也需要精確度指標。樣本太小 → CI 太寬 → MID 不可信。',
                  whyEn: 'Like any estimate, MID needs a precision measure. Too small a sample → wide CI → unreliable MID.',
                  statZh: '⚠️ 47% 樣本不足以確保精確估計',
                  statEn: '⚠️ 47% had insufficient sample for precise estimation' },
                { numZh: '5. 錨上用來估計 MID 的閾值是否確實反映「小但重要」的差異？',
                  numEn: '5. Does the anchor threshold reflect a "small but important" difference (not moderate/large)?',
                  whyZh: '有些研究聲稱估計 MID，但實際上選用的閾值反映了中等或大的差異。',
                  whyEn: 'Some studies claim to estimate MID but actually use thresholds reflecting moderate or large differences.',
                  statZh: '24% 的錨閾值不反映「小但重要」', statEn: '24% of anchor thresholds did not reflect "small but important"' },
              ].map(({ numZh, numEn, whyZh, whyEn, statZh, statEn }, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="text-sm font-semibold text-gray-800 mb-1">{lang === 'zh' ? numZh : numEn}</p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">{lang === 'zh' ? whyZh : whyEn}</p>
                  <p className="text-xs font-medium" style={{ color: (statZh || '').includes('⚠️') ? '#E67E22' : '#27AE60' }}>
                    {lang === 'zh' ? statZh : statEn}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              {lang === 'zh'
                ? '統計數據來自 Carrasco-Labra et al.（J Clin Epidemiol 2021;133:61–71），基於 5,324 個 MID 估計值的系統性調查。'
                : 'Statistics from Carrasco-Labra et al. (J Clin Epidemiol 2021;133:61–71), based on a systematic survey of 5,324 MID estimates.'}
            </p>
          </Accordion>

          <Accordion title={lang === 'zh' ? '全球變化評分（GRC）的額外四項準則' : 'Four Additional Criteria for Global Rating of Change Anchors'} icon="📝">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? '59% 的 MID 使用全球變化評分作為錨。針對這類錨，還有四項額外的可信度準則：'
                  : '59% of MIDs use a Global Rating of Change anchor. Four additional credibility criteria apply:'}
              </p>
              <div className="space-y-2">
                {[
                  { zh: '基線到追蹤之間的時間是否合適？（太長 > 3 個月 → 回憶偏差）', en: 'Was time between baseline and follow-up appropriate? (> 3 months → recall bias)', statZh: '50% 時間過長', statEn: '50% had excessively long intervals' },
                  { zh: '全球變化評分與追蹤時量表分數是否正相關？', en: 'Does the transition item correlate positively with follow-up PROM score?', statZh: '97% 未報告', statEn: '97% not reported' },
                  { zh: '全球變化評分與基線量表分數是否負相關或極弱正相關？', en: 'Does the transition item correlate negatively/very weakly with baseline score?', statZh: '98% 未報告', statEn: '98% not reported' },
                  { zh: '全球變化評分與變化分數的相關性是否明顯大於與追蹤分數的相關性？', en: 'Is correlation with change score appreciably greater than with follow-up score?', statZh: '97% 未報告', statEn: '97% not reported' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-gray-400 mt-0.5 flex-shrink-0 text-xs">{i + 1}.</span>
                    <div>
                      <p className="text-sm text-gray-700 leading-relaxed">{lang === 'zh' ? item.zh : item.en}</p>
                      <p className="text-xs text-amber-600 mt-0.5">{lang === 'zh' ? item.statZh : item.statEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Accordion>

          {/* How to choose between multiple MIDs */}
          <Accordion title={lang === 'zh' ? '當有多個 MID 候選值時如何選擇' : 'Choosing Between Multiple MID Estimates'} icon="🎯">
            <StepFlow lang={lang} steps={[
              { zh: '對每個 MID 估計值套用 Devji 五項核心準則 + GRC 額外四項（若用 GRC）', en: 'Apply Devji 5 core criteria + 4 GRC criteria (if applicable) to each MID estimate' },
              { zh: '優先選擇可信度最高的（5 項全達標 = 高可信度）', en: 'Prioritize the most credible (all 5 met = high credibility)' },
              { zh: '若可信度相同 → 選擇族群與你的 PICOT 最相符的', en: 'If equally credible → choose the one whose study population best matches your PICOT' },
              { zh: '若仍有多個 → 報告中說明選擇依據；考慮做敏感度分析（用第二可信的 MID 重新評估）', en: 'If still multiple → state your rationale; consider sensitivity analysis with the second-best MID' },
              { zh: '不要選擇符合自己預期結論的 MID（confirmation bias）', en: 'Do NOT cherry-pick the MID that matches your preferred conclusion (confirmation bias)' },
            ]} />
          </Accordion>
        </div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* TAB: Imprecision deep-dive */}
      {/* ═══════════════════════════════════════════════ */}
      {activeTab === 'imprecision' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            🎯 {lang === 'zh' ? 'MID 在不精確性評估中的應用' : 'MID in Imprecision Assessment'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '本頁深入探討 MID 如何決定不精確性的扣分：包括 OIS / RIS、不同 baseline risk 的差異、以及實際的決策流程。'
              : 'Deep-dive into how MID drives imprecision downgrading: OIS / RIS, baseline-risk variation, and practical decision flow.'}
          </p>

          {/* MID and OIS / RIS */}
          <Accordion title={lang === 'zh' ? 'OIS（最佳資訊量）vs RIS（回顧資訊量）' : 'OIS (Optimal Information Size) vs RIS (Review Information Size)'} icon="🔢" defaultOpen>
            <div className="mt-3 space-y-3">
              <div className="bg-white rounded-lg border border-gray-100 p-3">
                <p className="text-sm font-semibold text-teal-700 mb-1">OIS （傳統概念）</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {lang === 'zh'
                    ? '依據單一研究的樣本數計算公式：α = 0.05、β = 0.20、控制組事件率（依情境）、預期 RRR（通常 20–25%）。當合併樣本數 < OIS 且效果量很大 → 考慮扣分。'
                    : 'Standard sample-size formula: α = 0.05, β = 0.20, control event rate (context-specific), expected RRR (typically 20–25%). When pooled sample < OIS and effect is implausibly large → consider downgrading.'}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-100 p-3">
                <p className="text-sm font-semibold text-teal-700 mb-1">RIS （Guidance 35 新概念）</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  {lang === 'zh'
                    ? '與 OIS 數學相同，但概念上不依賴「值得偵測的效果」。可分別計算「small effect」、「moderate effect」、「large effect」三個閾值的所需樣本數。'
                    : 'Mathematically identical to OIS but conceptually doesn\'t depend on a single "worthwhile effect". You can compute RIS separately for small / moderate / large effect thresholds.'}
                </p>
                <p className="text-xs text-teal-600">
                  {lang === 'zh' ? '線上計算機：' : 'Online calculator: '}
                  <a href="https://www.gradepro.org/calc/reviewinformationsize" target="_blank" rel="noopener noreferrer" className="underline font-mono">gradepro.org/calc/reviewinformationsize</a>
                </p>
              </div>
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-xs text-amber-800 leading-relaxed">
                  {lang === 'zh'
                    ? '💡 連續型結果的經驗法則：總樣本數 < 800（每組 400）時，應考慮是否需要扣分。對應 SMD 0.2 的 power 要求。'
                    : '💡 Rule of thumb for continuous outcomes: consider downgrading if total sample < 800 (400/group). This corresponds to power for detecting SMD = 0.2.'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* Implausibly large effect */}
          <Accordion title={lang === 'zh' ? '效果太大時的 RIS 檢查' : 'RIS Check for Implausibly Large Effects'} icon="⚠️">
            <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3">
              {lang === 'zh'
                ? 'CI 沒跨越任何閾值，但效果量很大（RRR > 30–40%）→ 啟動 RIS 檢查。Guidance 35 範例：100 人總樣本、絕對死亡率降低 10%（從 20% → 10%）。'
                : 'CI doesn\'t cross any threshold but effect is large (RRR > 30–40%) → invoke RIS. Guidance 35 example: 100 total participants, absolute mortality reduction 10% (20% → 10%).'}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ background: '#E8F6F7' }}>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '所需樣本（RIS）' : 'Required sample (RIS)'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '對應閾值' : 'Threshold'}</th>
                    <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '扣分' : 'Downgrade'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="px-3 py-2 border border-gray-200 font-mono">N ≥ 10,044</td><td className="px-3 py-2 border border-gray-200">large (9%)</td><td className="px-3 py-2 border border-gray-200 text-green-700">{lang === 'zh' ? '不扣' : 'No'}</td></tr>
                  <tr><td className="px-3 py-2 border border-gray-200 font-mono">10,044 &gt; N ≥ 1,116</td><td className="px-3 py-2 border border-gray-200">moderate (5%)</td><td className="px-3 py-2 border border-gray-200 text-amber-700">{lang === 'zh' ? '扣 1' : '1 level'}</td></tr>
                  <tr><td className="px-3 py-2 border border-gray-200 font-mono">1,116 &gt; N ≥ 496</td><td className="px-3 py-2 border border-gray-200">small (2%)</td><td className="px-3 py-2 border border-gray-200 text-orange-700">{lang === 'zh' ? '扣 2' : '2 levels'}</td></tr>
                  <tr><td className="px-3 py-2 border border-gray-200 font-mono">N &lt; 496</td><td className="px-3 py-2 border border-gray-200">{lang === 'zh' ? '低於 small' : 'below small'}</td><td className="px-3 py-2 border border-gray-200 text-red-700">{lang === 'zh' ? '扣 3' : '3 levels'}</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {lang === 'zh'
                ? '範例中總樣本只有 100 → 連 small effect RIS (496) 都不到 → 扣 3 分。'
                : 'In the example, total sample = 100 → falls below even small-effect RIS (496) → downgrade 3 levels.'}
            </p>
          </Accordion>

          {/* Different baseline risks */}
          <Accordion title={lang === 'zh' ? '不同基準風險 → 不同的不精確性扣分' : 'Different Baseline Risks → Different Imprecision Ratings'} icon="📊" defaultOpen>
            <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3">
              {lang === 'zh'
                ? 'Guidance 35 的關鍵新觀念：同一個相對效果在不同基準風險的族群中產生不同的絕對效果，因此不精確性扣分也會不同。'
                : 'Key new concept from Guidance 35: the same relative effect produces different absolute effects at different baseline risks → different imprecision ratings.'}
            </p>
            <div className="bg-white rounded-lg border border-gray-100 p-3 mb-3">
              <p className="text-xs font-semibold text-gray-700 mb-1">
                {lang === 'zh' ? 'Tocilizumab 治療 COVID-19 死亡率 RR = 0.84 (95% CI 0.75–0.94)' : 'Tocilizumab for COVID-19 mortality RR = 0.84 (95% CI 0.75–0.94)'}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                {lang === 'zh' ? '智利 COVID 指引設定的閾值：small = 10/1000、moderate = 25/1000、large = 50/1000' : 'Chilean COVID guideline thresholds: small = 10/1000, moderate = 25/1000, large = 50/1000'}
              </p>
              <EffectScale
                thresholds={{ small: 10, moderate: 25, large: 50 }}
                pointEst={-8} ciLow={-13} ciHigh={-3}
                unit={{ zh: '每 1000 人', en: 'per 1000' }}
                outcomeLabel={{ zh: '5% 基準風險（輕症）：RD = -8/1000 (CI: -13 to -3)；CI 跨越 1 個閾值 → 扣 1 分', en: '5% baseline (mild): RD = -8/1000 (CI: -13 to -3); crosses 1 threshold → downgrade 1' }}
                lang={lang}
              />
              <EffectScale
                thresholds={{ small: 10, moderate: 25, large: 50 }}
                pointEst={-24} ciLow={-38} ciHigh={-9}
                unit={{ zh: '每 1000 人', en: 'per 1000' }}
                outcomeLabel={{ zh: '15% 基準風險（中症）：RD = -24/1000 (CI: -38 to -9)；CI 跨越 2 個閾值 → 扣 2 分', en: '15% baseline (moderate): RD = -24/1000 (CI: -38 to -9); crosses 2 thresholds → downgrade 2' }}
                lang={lang}
              />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {lang === 'zh'
                ? '💡 結論：對輕症族群，certainty 為「中」（扣 1）→ 「Tocilizumab 很可能對死亡率影響微小」；對中症族群，certainty 為「低」（扣 2）→ 「Tocilizumab 可能減少死亡，但效果不確定是小或中」。同一個 SR，兩個不同推薦。'
                : '💡 Bottom line: for mild patients, certainty is "Moderate" (downgrade 1) → "Tocilizumab probably has trivial effect on mortality"; for moderate patients, certainty is "Low" (downgrade 2) → "Tocilizumab may reduce mortality, magnitude uncertain". Same SR, different recommendations.'}
            </p>
          </Accordion>

          {/* When MID is not needed */}
          <Accordion title={lang === 'zh' ? '什麼時候不需要指定確切 MID？' : 'When Is a Precise MID NOT Needed?'} icon="💡">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? 'Core GRADE 7：不是每個結果都需要精確的 MID。如果效果量和 CI 都明顯遠離任何合理的 MID 閾值，就不需要指定確切數值。'
                  : 'Core GRADE 7: not every outcome needs a precise MID. If the effect and CI are clearly far from any reasonable MID threshold, an exact value isn\'t needed.'}
              </p>
              <div className="bg-teal-50/50 rounded-lg p-3">
                <p className="text-xs text-teal-800">
                  {lang === 'zh'
                    ? '例如：治療死亡率絕對降低 5%，CI 下限 3%。無論 MID 是 2%、1% 或更小，CI 下限都仍然 > MID → 不需要指定確切的 MID。'
                    : 'Example: treatment reduces mortality 5% absolute, CI lower bound 3%. Whether MID is 2%, 1%, or less, CI lower bound > MID → no need for exact MID.'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* Quick decision flow */}
          <Accordion title={lang === 'zh' ? 'MID 不精確性快速決策流程' : 'Quick Decision Flow: MID-Driven Imprecision'} icon="🗺️">
            <StepFlow lang={lang} steps={[
              { zh: '選擇閾值（null 還是 MID？）', en: 'Choose threshold (null or MID?)' },
              { zh: '計算絕對效果與 CI', en: 'Calculate absolute effect and CI' },
              { zh: 'CI 跨越閾值嗎？沒有 → 不扣分（除非效果太大需要 RIS 檢查）', en: 'Does CI cross threshold? No → no downgrade (unless effect is large; then RIS check)' },
              { zh: 'CI 跨越 1 個閾值 → 扣 1 分；2 個 → 扣 2 分；3 個 → 扣 3 分', en: 'CI crosses 1 threshold → downgrade 1; 2 → downgrade 2; 3 → downgrade 3' },
              { zh: '對不同基準風險族群分別重複此流程', en: 'Repeat for each baseline-risk subgroup separately' },
            ]} />
          </Accordion>
        </div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* TAB: Worked Examples */}
      {/* ═══════════════════════════════════════════════ */}
      {activeTab === 'examples' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            📚 {lang === 'zh' ? '工作範例' : 'Worked Examples'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '四個對比範例展示 MID 如何在不同情境中決定確定性等級。'
              : 'Four contrasting examples showing how MID drives the certainty rating in different scenarios.'}
          </p>

          {/* Example 1: Myopia */}
          <WorkedExample lang={lang}
            titleZh="範例 1：低劑量 atropine 對近視（連續型結果）"
            titleEn="Example 1: Low-dose atropine for myopia (continuous outcome)"
            contextZh="近視 SE 進展，年均 0.5D。設定 MID = 0.25D（50% 改善）。0.01% atropine WMD = 0.23D (CI 0.13–0.34)。"
            contextEn="Myopia SE progression averages 0.5D/year. MID set at 0.25D (50% improvement). 0.01% atropine WMD = 0.23D (CI 0.13–0.34)."
            scaleProps={{
              thresholds: { small: 0.25, moderate: 0.5, large: 1.0 },
              pointEst: -0.23, ciLow: -0.34, ciHigh: -0.13,
              unit: { zh: 'D（屈光度）', en: 'D (diopters)' },
            }}
            takeawayZh="點估計值 (0.23) 與 CI 上限 (0.34) 都跨過 MID = 0.25 → CI 跨越 1 個閾值 → 扣 1 分。即使統計顯著，效果是否「重要」仍不確定。"
            takeawayEn="Point estimate (0.23) and CI upper bound (0.34) cross MID = 0.25 → CI crosses 1 threshold → downgrade 1. Even though statistically significant, whether the effect is 'important' remains uncertain."
          />

          {/* Example 2: Corticosteroids in CAP */}
          <WorkedExample lang={lang}
            titleZh="範例 2：類固醇治療肺炎（MID 選擇影響評分）"
            titleEn="Example 2: Corticosteroids for CAP (MID choice changes rating)"
            contextZh="社區型肺炎 RCT MA：類固醇減少 29 死/1000 (CI: 6–52 fewer)。如果 MID = 10/1000 → 點估計值 > MID 但 CI 跨越；如果 MID = 5/1000 → CI 不跨越。"
            contextEn="CAP RCT MA: steroids reduce 29 deaths/1000 (CI: 6–52 fewer). If MID = 10/1000 → point estimate > MID but CI crosses; if MID = 5/1000 → CI doesn't cross."
            scaleProps={{
              thresholds: { small: 10, moderate: 30, large: 60 },
              pointEst: -29, ciLow: -52, ciHigh: -6,
              unit: { zh: '每 1000 人', en: 'per 1000' },
            }}
            takeawayZh="同一份證據，MID 選擇不同 → 評分不同。MID = 10/1000：CI 跨越 1 個閾值 → 扣 1 分；MID = 5/1000：CI 不跨任何 MID → 不扣分。突顯 MID 選擇的決定性。"
            takeawayEn="Same evidence, different MID → different rating. MID = 10/1000: CI crosses 1 threshold → downgrade 1; MID = 5/1000: CI crosses no MID → no downgrade. Highlights how decisive MID choice is."
          />

          {/* Example 3: Vasculitis double-threshold */}
          <WorkedExample lang={lang}
            titleZh="範例 3：vasculitis 低劑量類固醇（雙閾值，扣 2 分）"
            titleEn="Example 3: Lower-dose steroids in vasculitis (dual thresholds, downgrade 2)"
            contextZh="低劑量 vs 標準劑量類固醇的死亡率：RD = -21/1000 (CI: -60 to +36)。MID for benefit = -10/1000；MID for harm = +10/1000。"
            contextEn="Lower-dose vs standard-dose steroids on mortality: RD = -21/1000 (CI: -60 to +36). MID for benefit = -10/1000; MID for harm = +10/1000."
            scaleProps={{
              thresholds: { small: 10, moderate: 30, large: 60 },
              pointEst: -21, ciLow: -60, ciHigh: 36,
              unit: { zh: '每 1000 人', en: 'per 1000' },
            }}
            takeawayZh="CI 同時包含「重要益處」(−60) 和「重要傷害」(+36) → 跨越 2 個 MID 閾值 → 扣 2 分。白話：「低劑量類固醇可能 (may) 減少死亡」而非「很可能 (likely) 減少」。"
            takeawayEn="CI includes both 'important benefit' (−60) and 'important harm' (+36) → crosses 2 MID thresholds → downgrade 2. Plain language: 'lower-dose steroids may reduce mortality' (not 'likely reduces')."
          />

          {/* Example 4: SGLT-2 different risk groups */}
          <WorkedExample lang={lang}
            titleZh="範例 4：SGLT-2 在不同風險族群（同一 MID，不同推薦）"
            titleEn="Example 4: SGLT-2 across risk groups (same MID, different recommendations)"
            contextZh="SGLT-2 inhibitor 死亡率 OR = 0.77 (CI 0.71–0.83)。MID = 10/1000。低風險族群（baseline 20/1000）：RD = -5 (CI: -6 to -3)。高風險族群（baseline 265/1000）：RD = -48 (CI: -61 to -35)。"
            contextEn="SGLT-2 inhibitor mortality OR = 0.77 (CI 0.71–0.83). MID = 10/1000. Low-risk (baseline 20/1000): RD = -5 (CI: -6 to -3). High-risk (baseline 265/1000): RD = -48 (CI: -61 to -35)."
            scaleProps={{
              thresholds: { small: 10, moderate: 30, large: 60 },
              pointEst: -5, ciLow: -6, ciHigh: -3,
              unit: { zh: '每 1000 人', en: 'per 1000' },
              outcomeLabel: { zh: '低風險族群（baseline 20/1000）', en: 'Low-risk group (baseline 20/1000)' },
            }}
            takeawayZh="低風險族群 → 整個 CI 在 trivial 範圍 → 高確定性「無重要差異」→ 弱不推薦。"
            takeawayEn="Low-risk group → entire CI in trivial range → high certainty of 'no important difference' → weak recommendation against."
          />
          <div className="mb-4">
            <EffectScale
              thresholds={{ small: 10, moderate: 30, large: 60 }}
              pointEst={-48} ciLow={-61} ciHigh={-35}
              unit={{ zh: '每 1000 人', en: 'per 1000' }}
              outcomeLabel={{ zh: '高風險族群（baseline 265/1000）', en: 'High-risk group (baseline 265/1000)' }}
              lang={lang}
            />
            <div className="bg-teal-50/50 rounded-lg px-3 py-2 mt-2">
              <p className="text-xs font-semibold text-teal-700 mb-0.5">🎯 {lang === 'zh' ? '結論' : 'Takeaway'}</p>
              <p className="text-xs text-teal-700 leading-relaxed">
                {lang === 'zh'
                  ? '高風險族群 → 整個 CI 在 moderate~large benefit 範圍 → 高確定性「重要益處」→ 強推薦。同一 SR、同一 MID，但兩個族群得到相反的推薦。這就是為什麼「絕對效果」與「baseline risk」如此重要。'
                  : 'High-risk group → entire CI in moderate-to-large benefit range → high certainty of important benefit → strong recommendation. Same SR, same MID, but opposite recommendations for two groups. This is why "absolute effect" and "baseline risk" matter so much.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* TAB: Practice */}
      {/* ═══════════════════════════════════════════════ */}
      {activeTab === 'practice' && (
        <PracticeSection
          questions={practiceQuestions.mid}
          title={{ zh: 'MID 應用練習', en: 'MID Application Practice' }}
        />
      )}

      {/* References */}
      <div className="mt-8 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs font-semibold text-gray-600 mb-2">References</p>
        <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
          <p>Jaeschke R, Singer J, Guyatt GH. Measurement of health status: Ascertaining the minimal clinically important difference. <em>Control Clin Trials</em> 1989;10:407–15.</p>
          <p>Guyatt G, Zeng L, et al. Core GRADE 2: choosing the target of certainty rating and assessing imprecision. <em>BMJ</em> 2025;389:e081904.</p>
          <p>Guyatt G, Yao L, et al. Core GRADE 6: presenting the evidence in summary of findings tables. <em>BMJ</em> 2025;389:e083866.</p>
          <p>Guyatt G, Vandvik PO, et al. Core GRADE 7: principles for moving from evidence to recommendations. <em>BMJ</em> 2025;389:e083867.</p>
          <p>Schünemann HJ, Neumann I, et al. <strong>GRADE Guidance 35: update on rating imprecision for assessing contextualized certainty of evidence and making decisions.</strong> <em>J Clin Epidemiol</em> 2022;150:225–242.</p>
          <p>Carrasco-Labra A, Devji T, et al. Minimal important difference estimates for patient-reported outcomes: A systematic survey. <em>J Clin Epidemiol</em> 2021;133:61–71.</p>
          <p>Devji T, Carrasco-Labra A, et al. Evaluating the credibility of anchor-based estimates of MIDs: instrument development and reliability study. <em>BMJ</em> 2020;369:m1714.</p>
          <p>RIS calculator: <a href="https://www.gradepro.org/calc/reviewinformationsize" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">gradepro.org/calc/reviewinformationsize</a></p>
          <p>PROMID database: <a href="https://promid.org" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">promid.org</a></p>
        </div>
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
