// src/pages/reference/MidGuide.jsx
// MID (Minimal Important Difference) Determination Guide
// Based on: Core GRADE Paper 2 (BMJ 2025;389:e081904), Core GRADE Paper 7 (BMJ 2025;389:e083867),
// Carrasco-Labra et al. (J Clin Epidemiol 2021;133:61–71), Devji et al. (BMJ 2020;369:m1714)

import React, { useState } from 'react';
import { useLang } from '../../App';
import { HamsterThinking, HamsterConcerned, HamsterCelebrating } from '../../components/Hamster';

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
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 px-4 py-3.5 text-left">
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

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════
export default function MidGuide() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('what');

  const tabs = [
    { id: 'what', zh: 'MID 是什麼', en: 'What is MID', icon: '❓' },
    { id: 'methods', zh: '四種訂定方法', en: '4 Methods', icon: '🔧' },
    { id: 'credibility', zh: '可信度評估', en: 'Credibility', icon: '🔍' },
    { id: 'use', zh: '在 GRADE 中的應用', en: 'Use in GRADE', icon: '📊' },
    { id: 'practice', zh: '實戰指引', en: 'Practical Guide', icon: '🎯' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <HamsterThinking size={48} />
        <div>
          <h1 className="font-bold text-3xl" style={{ color: '#0E7C86' }}>
            MID {lang === 'zh' ? '訂定指引' : 'Determination Guide'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {lang === 'zh'
              ? '最小重要差異值 — 連結證據與臨床決策的關鍵閾值'
              : 'Minimal Important Difference — the key threshold linking evidence to clinical decisions'}
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

      {/* ═══ TAB: What is MID ═══ */}
      {activeTab === 'what' && (
        <div>
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-base text-teal-800 mb-2">
              {lang === 'zh' ? 'MID = 病人認為有意義的最小差異' : 'MID = Smallest Change Patients Perceive as Important'}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {lang === 'zh'
                ? 'MID（Minimal Important Difference）是「病人認為有意義的最小改變量」。它回答一個核心問題：治療效果要多大，才算對病人真的有幫助？這個概念由 Jaeschke、Singer 和 Guyatt 在 1989 年首次提出。'
                : 'MID (Minimal Important Difference) is "the smallest change in an outcome that patients perceive as important." It answers: How large must an effect be to truly matter to patients? First proposed by Jaeschke, Singer & Guyatt in 1989.'}
            </p>
          </div>

          <Accordion title={lang === 'zh' ? '為什麼需要 MID？' : 'Why Do We Need MID?'} icon="🤔" defaultOpen>
            <div className="mt-3 space-y-3">
              {[
                { zh: '統計顯著 ≠ 臨床顯著。RR 0.99 (CI 0.98–1.00) 可以統計顯著，但效果微乎其微。', en: 'Statistical significance ≠ clinical significance. RR 0.99 (CI 0.98–1.00) can be statistically significant but clinically trivial.' },
                { zh: '相同的相對效果在不同 baseline risk 下，絕對效果天差地遠。50% RRR 可以是 1% → 0.5%（微小），也可以是 40% → 20%（巨大）。', en: 'Same relative effect yields vastly different absolute effects at different baseline risks. 50% RRR can be 1%→0.5% (trivial) or 40%→20% (huge).' },
                { zh: 'MID 是 GRADE 不精確性評估的閾值：CI 是否跨越 MID 決定了是否需要扣分。', en: 'MID is the threshold for GRADE imprecision: whether the CI crosses the MID determines downgrading.' },
                { zh: 'MID 是 EtD 框架中權衡利弊的基礎：效果是否達到 MID 決定了推薦方向。', en: 'MID is the foundation for benefit-harm trade-offs in EtD: whether the effect reaches MID shapes the recommendation.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-teal-50/40 rounded-lg px-3 py-2">
                  <span className="text-teal-500 mt-0.5 flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{lang === 'zh' ? item.zh : item.en}</p>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? 'MID 反映的是價值偏好' : 'MID Reflects Values & Preferences'} icon="❤️">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? '不同結果指標的 MID 不同，這個差異本身就反映了病人的價值偏好梯度。例如：'
                  : 'Different outcomes have different MIDs, and these differences reflect the gradient of patient values. For example:'}
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
                  ? '↑ 死亡率的 MID (1%) 是出血 MID (5%) 的 1/5 → 死亡的重要性是出血的 5 倍。MID 的梯度就是價值偏好的量化。（引自 Core GRADE Paper 7）'
                  : '↑ Mortality MID (1%) is 1/5 of bleeding MID (5%) → mortality is 5× more important than bleeding. The MID gradient quantifies value preferences. (From Core GRADE Paper 7)'}
              </p>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? 'Anchor-based vs Distribution-based' : 'Anchor-based vs Distribution-based'} icon="⚖️">
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl p-4 border-2 border-teal-300 bg-teal-50/30">
                <p className="font-bold text-sm text-teal-800 mb-2">Anchor-based ⭐</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  {lang === 'zh'
                    ? '以外部「錨」（如病人自評的整體改善程度）作為參照，將量表分數的變化與病人感受連結。'
                    : 'Uses an external "anchor" (e.g., patient-rated global improvement) to link score changes to patient perception.'}
                </p>
                <p className="text-xs text-teal-700 font-medium">
                  {lang === 'zh' ? '✅ 納入病人觀點 → GRADE 推薦使用' : '✅ Incorporates patient perspective → recommended by GRADE'}
                </p>
              </div>
              <div className="rounded-xl p-4 border border-gray-200">
                <p className="font-bold text-sm text-gray-700 mb-2">Distribution-based</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  {lang === 'zh'
                    ? '根據資料的統計特性（如 0.5 SD、SEM、effect size）來推估。不涉及病人觀點。'
                    : 'Based on statistical properties (0.5 SD, SEM, effect size). Does not involve patient perspective.'}
                </p>
                <p className="text-xs text-red-600 font-medium">
                  {lang === 'zh' ? '⚠️ 不反映病人感受 → 單獨使用時可信度有限' : '⚠️ Doesn\'t reflect patient perception → limited credibility when used alone'}
                </p>
              </div>
            </div>
          </Accordion>
        </div>
      )}

      {/* ═══ TAB: 4 Methods ═══ */}
      {activeTab === 'methods' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            🔧 {lang === 'zh' ? '四種 MID 訂定方法' : 'Four Methods to Determine MID'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '從最理想到最務實排列。實務上常需要結合多種方法。'
              : 'Ordered from ideal to pragmatic. In practice, methods are often combined.'}
          </p>

          <MethodCard number="1" icon="📚" lang={lang}
            titleZh="文獻系統性搜尋" titleEn="Systematic Literature Search"
            descZh="搜尋已發表的 anchor-based MID 研究。可使用 PROMID 資料庫（promid.org）查詢 526 種量表的 5,324 個 MID 估計值。"
            descEn="Search for published anchor-based MID studies. The PROMID database (promid.org) contains 5,324 MID estimates for 526 PROMs."
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
            prosEn="Fast, requires no additional resources. Combines practical clinical context."
            consZh="主觀性高，容易受到個人偏見影響。不同專家可能給出非常不同的估計。"
            consEn="Highly subjective, prone to personal bias. Different experts may give very different estimates."
            exampleZh="一位有豐富經驗的抗凝治療醫師觀察到：孕婦幾乎都選擇注射型肝素而非口服 warfarin，即使注射更不方便——顯示她們認為即使極小的胎兒異常風險也非常重要（MID 很小）。"
            exampleEn="An experienced anticoagulation clinician observed: pregnant women almost always choose heparin injections over warfarin despite inconvenience — indicating even tiny fetal abnormality risk is very important to them (very small MID)."
          />

          <MethodCard number="3" icon="👥" lang={lang}
            titleZh="病人焦點團體" titleEn="Patient Focus Group"
            descZh="直接詢問一小群目標族群的病人：「多大的改善對你來說有意義？」"
            descEn="Directly ask a small group of target patients: 'How much improvement would be meaningful to you?'"
            prosZh="最直接反映病人觀點。美國風濕病學會（ACR）已在所有指引中採用此方法。"
            prosEn="Most directly reflects patient perspective. The American College of Rheumatology (ACR) uses this for all guidelines."
            consZh="需要時間和資源召集病人。樣本小、代表性有限。病人可能不熟悉量表的單位。"
            consEn="Requires time and resources to convene patients. Small sample, limited representativeness. Patients may not understand scale units."
            exampleZh={null} exampleEn={null}
          />

          <MethodCard number="4" icon="📋" lang={lang}
            titleZh="小組結構化問卷（Panel Survey）" titleEn="Structured Panel Survey"
            descZh="透過反覆問卷，從指引小組成員中收斂出 MID 共識。由 Core GRADE Paper 7 推薦的系統化方法。"
            descEn="Converge on MID consensus through iterative surveys among guideline panel members. Systematic method recommended by Core GRADE Paper 7."
            prosZh="有結構、可重複。能讓小組成員充分思考。結果透明可追溯。"
            prosEn="Structured, reproducible. Gives panel members time to think. Results are transparent and traceable."
            consZh="需要方法學支援來設計問卷。不同小組可能得出不同 MID（這是正常的——反映了不同族群的價值觀）。"
            consEn="Requires methodological support for survey design. Different panels may reach different MIDs (this is normal — reflects different population values)."
            exampleZh="問卷流程：先提供極低和極高的 MID 選項，請小組成員判斷多數病人會不會認為這個差異重要。逐步收斂，直到一半認為重要、一半認為不重要的閾值 = MID。"
            exampleEn="Survey process: present extremely low and high MID options, ask panelists if most patients would consider the difference important. Converge until half consider it important and half do not = MID."
          />

          {/* Decision helper */}
          <div className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="text-sm font-semibold text-amber-800 mb-2">
              {lang === 'zh' ? '🧭 選哪種方法？' : '🧭 Which Method to Choose?'}
            </p>
            <StepFlow lang={lang} steps={[
              { zh: '先搜尋文獻：目標量表是否有已發表的 anchor-based MID？→ 去 promid.org 查詢', en: 'Search literature first: does the target instrument have published anchor-based MIDs? → Check promid.org' },
              { zh: '有 → 評估可信度（見下一頁），選擇最可信且最適用的 MID', en: 'Yes → assess credibility (see next tab), choose the most credible and applicable MID' },
              { zh: '沒有 → 諮詢臨床專家 + 考慮病人焦點團體', en: 'No → consult clinical experts + consider patient focus group' },
              { zh: '如果是指引小組 → 使用結構化問卷讓成員收斂共識', en: 'If guideline panel → use structured survey to converge on consensus' },
              { zh: '任何情況都要在報告中明確說明 MID 的訂定依據', en: 'In all cases, explicitly state MID rationale in your report' },
            ]} />
          </div>
        </div>
      )}

      {/* ═══ TAB: Credibility ═══ */}
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
                {
                  numZh: '1. 病人或必要的代理人是否同時回答了量表和錨？',
                  numEn: '1. Did the patient (or necessary proxy) respond to both the PROM and the anchor?',
                  whyZh: 'MID 應反映病人觀點。如果是臨床醫師代替回答，可信度降低。',
                  whyEn: 'MID should reflect patient perspective. If clinicians answered instead, credibility drops.',
                  statZh: '84% 的 MID 估計值符合此標準',
                  statEn: '84% of MID estimates met this criterion',
                },
                {
                  numZh: '2. 錨是否容易理解且與病人相關？',
                  numEn: '2. Was the anchor easily understandable and relevant to patients?',
                  whyZh: '錨應該直接測量健康狀態的改變（功能、症狀、疾病嚴重度）。',
                  whyEn: 'Anchor should directly measure change in health status (function, symptoms, severity).',
                  statZh: '89% 符合',
                  statEn: '89% met this',
                },
                {
                  numZh: '3. 錨與量表之間是否有良好的相關性？',
                  numEn: '3. Has the anchor shown good correlation with the PROM?',
                  whyZh: '錨和量表應該測量相同或相似的構念。弱相關的錨會給出誤導性的 MID。',
                  whyEn: 'Anchor and PROM should measure the same construct. Weakly correlated anchors produce misleading MIDs.',
                  statZh: '⚠️ 66% 未報告相關性 — 最常見的可信度缺陷',
                  statEn: '⚠️ 66% did NOT report correlation — the most common credibility flaw',
                },
                {
                  numZh: '4. MID 估計值是否精確？（有 95% CI 嗎？）',
                  numEn: '4. Is the MID estimate precise? (Is a 95% CI provided?)',
                  whyZh: '和任何估計值一樣，MID 也需要精確度指標。樣本太小 → CI 太寬 → MID 不可信。',
                  whyEn: 'Like any estimate, MID needs a precision measure. Too small a sample → wide CI → unreliable MID.',
                  statZh: '⚠️ 47% 樣本不足以確保精確估計',
                  statEn: '⚠️ 47% had insufficient sample for precise estimation',
                },
                {
                  numZh: '5. 錨上用來估計 MID 的閾值或組間差異，是否確實反映了「小但重要」的差異？',
                  numEn: '5. Does the threshold on the anchor reflect a "small but important" difference (not moderate/large)?',
                  whyZh: '有些研究聲稱估計 MID，但實際上選用的閾值反映了中等或大的差異。',
                  whyEn: 'Some studies claim to estimate MID but actually use thresholds reflecting moderate or large differences.',
                  statZh: '24% 的錨閾值不反映「小但重要」的差異',
                  statEn: '24% of anchor thresholds did not reflect a "small but important" difference',
                },
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
                  ? '59% 的 MID 使用全球變化評分（Global Rating of Change）作為錨。針對這類錨，還有四項額外的可信度準則：'
                  : '59% of MIDs used a Global Rating of Change anchor. For these, four additional credibility criteria apply:'}
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
        </div>
      )}

      {/* ═══ TAB: Use in GRADE ═══ */}
      {activeTab === 'use' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            📊 {lang === 'zh' ? 'MID 在 GRADE 中的三個角色' : 'Three Roles of MID in GRADE'}
          </h2>

          <Accordion title={lang === 'zh' ? '角色 1：不精確性評估的閾值' : 'Role 1: Threshold for Imprecision'} icon="🎯" defaultOpen>
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? '在 Core GRADE Paper 2 中，MID 用來判斷 CI 是否「夠窄」：'
                  : 'In Core GRADE Paper 2, MID determines if the CI is "narrow enough":'}
              </p>
              <div className="space-y-2">
                {[
                  { zh: '點估計值 > MID 且 CI 下限 > MID → 確定有重要效益 → 不扣分', en: 'Point estimate > MID and CI lower bound > MID → confident in important effect → no downgrade' },
                  { zh: '點估計值 > MID 但 CI 跨越 MID → 不確定效果是否重要 → 扣 1 分', en: 'Point estimate > MID but CI crosses MID → uncertain if effect is important → downgrade 1' },
                  { zh: 'CI 同時跨越 MID for benefit 和 MID for harm → 扣 2 分', en: 'CI crosses both MID for benefit and MID for harm → downgrade 2' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 bg-teal-50/40 rounded-lg px-3 py-2">
                    <span className="text-teal-500 mt-0.5 flex-shrink-0">→</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{lang === 'zh' ? item.zh : item.en}</p>
                  </div>
                ))}
              </div>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '角色 2：不一致性評估的參照' : 'Role 2: Reference for Inconsistency'} icon="📊">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {lang === 'zh'
                  ? '在 Core GRADE Paper 3 中，判斷不一致性時的第三個視覺標準是：各研究的點估計值是否落在 MID 的同一側？如果大部分研究都在 MID 同一側，即使 I² 高，也不一定需要扣分。'
                  : 'In Core GRADE Paper 3, the third visual criterion for inconsistency is: are study point estimates mostly on the same side of the MID? If most are on the same side, even high I² may not warrant downgrading.'}
              </p>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '角色 3：EtD 框架中的決策依據' : 'Role 3: Decision Basis in EtD Framework'} icon="⚖️">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? '在 Core GRADE Paper 7 中，MID 有兩個關鍵功能：'
                  : 'In Core GRADE Paper 7, MID serves two key functions:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg p-3 bg-blue-50">
                  <p className="text-xs font-bold text-blue-800 mb-1">{lang === 'zh' ? '決定確定性等級' : 'Determines Certainty Level'}</p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    {lang === 'zh'
                      ? 'MID 必須在確定性評級之前設定。先有 MID，才能判斷不精確性和不一致性。'
                      : 'MID must be set BEFORE certainty rating. MID comes first, then imprecision and inconsistency can be judged.'}
                  </p>
                </div>
                <div className="rounded-lg p-3 bg-purple-50">
                  <p className="text-xs font-bold text-purple-800 mb-1">{lang === 'zh' ? '量化價值偏好梯度' : 'Quantifies Value Gradient'}</p>
                  <p className="text-xs text-purple-700 leading-relaxed">
                    {lang === 'zh'
                      ? '各結果指標的 MID 差異反映了重要性梯度，幫助小組權衡利弊做出推薦。'
                      : 'MID differences across outcomes reflect the importance gradient, helping panels trade off benefits and harms.'}
                  </p>
                </div>
              </div>
            </div>
          </Accordion>

          {/* When MID is NOT needed */}
          <Accordion title={lang === 'zh' ? '什麼時候不需要指定 MID？' : 'When Is MID Not Needed?'} icon="💡">
            <div className="mt-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {lang === 'zh'
                  ? 'Core GRADE Paper 7 指出：不是每個結果指標都需要精確的 MID。如果效果量和 CI 都明顯遠離任何合理的 MID 閾值，就不需要指定確切數值。'
                  : 'Core GRADE Paper 7 notes: not every outcome needs a precise MID. If the effect and CI are clearly far from any reasonable MID threshold, specifying an exact value is unnecessary.'}
              </p>
              <div className="bg-teal-50/50 rounded-lg p-3">
                <p className="text-xs text-teal-800">
                  {lang === 'zh'
                    ? '例如：治療的死亡率絕對降低 5%，CI 下限 3%。無論 MID 是 2%、1% 或更小，CI 都不跨越 → 不需要指定確切的死亡率 MID。'
                    : 'Example: treatment reduces mortality by 5% absolute, CI lower bound 3%. Whether MID is 2%, 1%, or less, CI doesn\'t cross → no need to specify exact mortality MID.'}
                </p>
              </div>
            </div>
          </Accordion>
        </div>
      )}

      {/* ═══ TAB: Practical Guide ═══ */}
      {activeTab === 'practice' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            🎯 {lang === 'zh' ? '實戰指引：EBM 競賽中的 MID' : 'Practical Guide: MID in EBM Competitions'}
          </h2>

          <Accordion title={lang === 'zh' ? '步驟式操作流程' : 'Step-by-Step Workflow'} icon="🪜" defaultOpen>
            <StepFlow lang={lang} steps={[
              { zh: '列出你的主要結果指標（從 PICOT 的 O 而來）', en: 'List your primary outcomes (from PICOT\'s O)' },
              { zh: '搜尋文獻中是否有已發表的 MID（PubMed 搜 "MID" + 量表名稱，或查 promid.org）', en: 'Search for published MIDs (PubMed: "MID" + instrument name, or check promid.org)' },
              { zh: '如果找到多個 MID → 用五項可信度準則篩選最可信的', en: 'If multiple MIDs found → use 5 credibility criteria to select the most credible' },
              { zh: '如果找不到 → 查閱疾病的自然病程或標準治療效果，以此作為基準推算', en: 'If not found → review natural disease course or standard treatment effect as a benchmark' },
              { zh: '明確記錄你的 MID 值、訂定方法和依據（這會出現在簡報中！）', en: 'Explicitly document your MID value, method, and rationale (this goes in your presentation!)' },
              { zh: '用數線圖呈現點估計值和 CI 與 MID 的關係', en: 'Use a number-line diagram showing point estimate and CI relative to MID' },
            ]} />
          </Accordion>

          <Accordion title={lang === 'zh' ? '範例：2024 近視競賽的 MID 訂定' : 'Example: 2024 Myopia Competition MID'} icon="👁️" defaultOpen>
            <div className="mt-3 bg-white rounded-xl border border-gray-100 p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500">{lang === 'zh' ? '結果指標' : 'Outcome'}</p>
                  <p className="text-sm font-medium text-gray-800">{lang === 'zh' ? '球面等效屈光度 (SE)' : 'Spherical Equivalent (SE)'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">{lang === 'zh' ? '訂定方法' : 'Method'}</p>
                  <p className="text-sm text-gray-700">{lang === 'zh' ? '文獻基準（參考疾病自然進展）' : 'Literature benchmark (disease natural progression)'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">{lang === 'zh' ? '推導過程' : 'Derivation'}</p>
                  <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm text-center">
                    <p>{lang === 'zh' ? '近視年均進展' : 'Annual myopia progression'} = 0.5D</p>
                    <p className="text-gray-400">×</p>
                    <p>{lang === 'zh' ? '有意義的改善幅度' : 'Meaningful improvement'} = 50%</p>
                    <p className="text-gray-400">↓</p>
                    <p className="font-bold text-teal-700">MID = 0.5 ÷ 2 = 0.25D</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">{lang === 'zh' ? '應用' : 'Application'}</p>
                  <div className="space-y-1.5">
                    <p className="text-sm text-gray-700">• 0.01% atropine: WMD 0.23 {'<'} MID 0.25, CI [0.13, 0.34] {lang === 'zh' ? '跨越 MID → 扣 1 分' : 'crosses MID → downgrade 1'}</p>
                    <p className="text-sm text-gray-700">• 0.05% atropine: WMD 0.54 {'>'} MID 0.25, CI [0.43, 0.65] {lang === 'zh' ? '不跨越 MID → 不扣分' : 'doesn\'t cross MID → no downgrade'}</p>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '簡報中的 MID 呈現清單' : 'MID Presentation Checklist for Slides'} icon="✅">
            <div className="mt-3 space-y-2">
              {[
                { zh: '☐ 明確寫出 MID 的數值和單位', en: '☐ State MID value and units explicitly' },
                { zh: '☐ 說明訂定方法（文獻/專家/病人/問卷）', en: '☐ State determination method (literature/expert/patient/survey)' },
                { zh: '☐ 引用支持依據（參考文獻或推導過程）', en: '☐ Cite supporting evidence (references or derivation)' },
                { zh: '☐ 數線圖：標示 null、MID、點估計值、CI', en: '☐ Number-line diagram: mark null, MID, point estimate, CI' },
                { zh: '☐ 對每個結果指標分別判斷 CI 是否跨越 MID', en: '☐ Judge CI vs MID crossing for each outcome separately' },
                { zh: '☐ 連結到 GRADE 不精確性扣分決策', en: '☐ Link to GRADE imprecision downgrading decision' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-green-50/40 rounded-lg px-3 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{lang === 'zh' ? item.zh : item.en}</p>
                </div>
              ))}
            </div>
          </Accordion>

          {/* Common mistakes */}
          <Accordion title={lang === 'zh' ? '常見錯誤' : 'Common Mistakes'} icon="⚠️">
            <div className="mt-3 space-y-2">
              {[
                { zh: '只使用 distribution-based MID（如 0.5 SD），沒有 anchor-based 依據。評審會質疑：「這反映病人的感受嗎？」', en: 'Using only distribution-based MID (e.g., 0.5 SD) without anchor-based support. Judges will ask: "Does this reflect patient perception?"' },
                { zh: '沒有說明 MID 的訂定方法和依據，只寫一個數字。', en: 'Stating an MID value without explaining the determination method and rationale.' },
                { zh: '對所有結果指標使用同一個 MID。不同結果（如死亡率 vs. 副作用）的 MID 應該不同。', en: 'Using the same MID for all outcomes. Different outcomes (e.g., mortality vs. adverse events) should have different MIDs.' },
                { zh: '把效應量 < MID 直接等於「沒有效果」。MID 以下的效果不一定是零，只是可能不夠大到對病人有意義。', en: 'Equating effect < MID with "no effect." Below-MID effects aren\'t zero — they\'re just possibly not large enough to be meaningful.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-red-50/50 rounded-lg px-3 py-2">
                  <HamsterConcerned size={20} className="flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">{lang === 'zh' ? item.zh : item.en}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      )}

      {/* References */}
      <div className="mt-8 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs font-semibold text-gray-600 mb-2">References</p>
        <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
          <p>Jaeschke R, Singer J, Guyatt GH. Measurement of health status: Ascertaining the minimal clinically important difference. <em>Control Clin Trials</em> 1989;10:407–15.</p>
          <p>Guyatt G, Zeng L, et al. Core GRADE 2: choosing the target of certainty rating and assessing imprecision. <em>BMJ</em> 2025;389:e081904.</p>
          <p>Guyatt G, Vandvik PO, et al. Core GRADE 7: principles for moving from evidence to recommendations. <em>BMJ</em> 2025;389:e083867.</p>
          <p>Carrasco-Labra A, Devji T, et al. Minimal important difference estimates for patient-reported outcomes: A systematic survey. <em>J Clin Epidemiol</em> 2021;133:61–71.</p>
          <p>Devji T, Carrasco-Labra A, et al. Evaluating the credibility of anchor-based estimates of MIDs: instrument development and reliability study. <em>BMJ</em> 2020;369:m1714.</p>
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
