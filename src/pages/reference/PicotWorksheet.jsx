// src/pages/reference/PicotWorksheet.jsx
// PICOT Worksheet — interactive reference guide
// Based on EBMouse teachingContent + 2024 competition slides

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

// ─── PICOT element block ───
function PicotElement({ letter, titleZh, titleEn, tipsZh, tipsEn, exampleZh, exampleEn, color, lang }) {
  return (
    <div className="rounded-xl border overflow-hidden mb-4" style={{ borderColor: color + '30' }}>
      <div className="flex items-stretch">
        <div className="w-14 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0" style={{ background: color }}>
          {letter}
        </div>
        <div className="flex-1 p-4">
          <p className="font-bold text-gray-800 text-sm mb-2">{lang === 'zh' ? titleZh : titleEn}</p>
          <div className="space-y-1.5 mb-3">
            {(lang === 'zh' ? tipsZh : tipsEn).map((tip, i) => (
              <p key={i} className="text-xs text-gray-600 leading-relaxed flex items-start gap-1.5">
                <span className="text-gray-300 mt-0.5 flex-shrink-0">•</span>{tip}
              </p>
            ))}
          </div>
          <div className="rounded-lg p-2.5" style={{ background: color + '08', borderLeft: `3px solid ${color}` }}>
            <p className="text-xs text-gray-500 mb-0.5 font-semibold">{lang === 'zh' ? '範例' : 'Example'}</p>
            <p className="text-sm text-gray-700 leading-relaxed">{lang === 'zh' ? exampleZh : exampleEn}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════
export default function PicotWorksheet() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('elements');

  const tabs = [
    { id: 'elements', zh: '五要素', en: '5 Elements', icon: '📋' },
    { id: 'types', zh: '問題類型', en: 'Question Types', icon: '❓' },
    { id: 'selection', zh: '選擇策略', en: 'Selection', icon: '🎯' },
    { id: 'checklist', zh: '品質檢核', en: 'Quality Check', icon: '✅' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <HamsterCelebrating size={48} />
        <div>
          <h1 className="font-bold text-3xl" style={{ color: '#0E7C86' }}>
            PICOT {lang === 'zh' ? '工作表' : 'Worksheet'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {lang === 'zh'
              ? '好問題是好答案的一半 — 結構化臨床問題指南'
              : 'A good question is half the answer — structured clinical question guide'}
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

      {/* ═══ TAB: 5 Elements ═══ */}
      {activeTab === 'elements' && (
        <div>
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-base text-teal-800 mb-2">
              {lang === 'zh' ? 'PICOT = 結構化的臨床問題' : 'PICOT = A Structured Clinical Question'}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {lang === 'zh'
                ? '每個臨床問題都可以拆解為五個要素。PICOT 越具體，文獻搜尋就越精準，評讀結果也越有說服力。'
                : 'Every clinical question can be decomposed into five elements. The more specific your PICOT, the more precise your search and convincing your appraisal.'}
            </p>
          </div>

          <PicotElement letter="P" color="#0E7C86" lang={lang}
            titleZh="Patient / Population（病人/族群）" titleEn="Patient / Population"
            tipsZh={[
              '不只是疾病名稱 — 要加入年齡、性別、嚴重程度、特殊條件',
              '納入病人偏好或限制條件（如「不想戴眼鏡」）',
              '思考：我描述的族群夠具體嗎？讀者能想像出這個病人嗎？',
            ]}
            tipsEn={[
              'Go beyond disease name — add age, sex, severity, special conditions',
              'Include patient preferences or constraints (e.g., "doesn\'t want glasses")',
              'Ask yourself: Is my population specific enough? Can readers picture this patient?',
            ]}
            exampleZh="患有軸性近視且不想戴眼鏡的小六女生"
            exampleEn="A sixth-grade girl with axial myopia who doesn't want to wear glasses"
          />

          <PicotElement letter="I" color="#2980B9" lang={lang}
            titleZh="Intervention（介入措施）" titleEn="Intervention"
            tipsZh={[
              '具體到藥名、劑量、給藥途徑、頻次',
              '不要只寫藥名 — 「atropine」不夠，「每晚兩眼各點一滴 atropine 眼藥水」才具體',
              '如果有多種劑量/方式，先寫大類，後續再分次族群分析',
            ]}
            tipsEn={[
              'Be specific: drug name, dose, route, frequency',
              'Don\'t just write the drug name — "atropine" isn\'t enough, "nightly one drop of atropine eye drops in each eye" is specific',
              'If multiple doses/routes exist, start broad, then subgroup later',
            ]}
            exampleZh="每晚兩眼各點一滴 atropine 眼藥水"
            exampleEn="Nightly one drop of atropine eye drops in each eye"
          />

          <PicotElement letter="C" color="#8E44AD" lang={lang}
            titleZh="Comparison（對照組）" titleEn="Comparison"
            tipsZh={[
              '三種常見對照：安慰劑 (placebo)、不治療 (no treatment)、活性對照 (active comparator)',
              '活性對照 = 另一種治療方式或另一個劑量',
              '明確寫出對照是什麼 — 「不點眼藥水」比「標準照護」更清楚',
            ]}
            tipsEn={[
              'Three common comparators: placebo, no treatment, active comparator',
              'Active comparator = another treatment or another dose',
              'Be explicit — "no eye drops" is clearer than "standard care"',
            ]}
            exampleZh="不點眼藥水"
            exampleEn="No eye drops"
          />

          <PicotElement letter="O" color="#E67E22" lang={lang}
            titleZh="Outcome（結果指標）" titleEn="Outcome"
            tipsZh={[
              '優先選擇病人導向結果 (patient-oriented outcomes) — 症狀改善、生活品質',
              '同時列出效益指標和安全性指標（不良反應）',
              '選擇可量化的指標，後續才能做 GRADE 評估',
              '可以列出多個 — 但要區分「重要」和「關鍵」結果指標',
            ]}
            tipsEn={[
              'Prioritize patient-oriented outcomes — symptom improvement, quality of life',
              'List both efficacy AND safety outcomes (adverse events)',
              'Choose quantifiable measures for later GRADE assessment',
              'Multiple outcomes OK — but distinguish "important" from "critical"',
            ]}
            exampleZh="球面等效屈光度 (SE)、眼軸長度 (AL)、不良反應"
            exampleEn="Spherical equivalent (SE), axial length (AL), adverse events"
          />

          <PicotElement letter="T" color="#C0392B" lang={lang}
            titleZh="Time（時間）" titleEn="Time"
            tipsZh={[
              '考慮疾病的自然病程 — 追蹤時間要夠長才能看到效果',
              '考慮介入預期見效的時間 — 太短可能看不到差異',
              '參考同類研究常用的追蹤時間點',
            ]}
            tipsEn={[
              'Consider natural disease course — follow-up must be long enough to detect effects',
              'Consider expected time-to-effect — too short may miss differences',
              'Reference follow-up durations commonly used in similar studies',
            ]}
            exampleZh="12 個月"
            exampleEn="12 months"
          />
        </div>
      )}

      {/* ═══ TAB: Question Types ═══ */}
      {activeTab === 'types' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-4">
            ❓ {lang === 'zh' ? '四種問題類型與最佳研究設計' : 'Four Question Types & Best Study Designs'}
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ background: '#E8F6F7' }}>
                  <th className="text-left px-3 py-2.5 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '類型' : 'Type'}</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '你想知道什麼？' : 'What Do You Want to Know?'}</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '最佳研究設計' : 'Best Study Design'}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { typeZh: '治療/預防型', typeEn: 'Treatment/Prevention', qZh: 'A 療法比 B 療法好嗎？', qEn: 'Is therapy A better than B?', designZh: 'RCT → SR with MA', designEn: 'RCT → SR with MA', highlight: true },
                  { typeZh: '診斷型', typeEn: 'Diagnosis', qZh: '這個檢測準不準？', qEn: 'How accurate is this test?', designZh: '橫斷面研究', designEn: 'Cross-sectional study', highlight: false },
                  { typeZh: '預後型', typeEn: 'Prognosis', qZh: '疾病未來會怎樣發展？', qEn: 'How will disease progress?', designZh: '世代研究', designEn: 'Cohort study', highlight: false },
                  { typeZh: '傷害/病因型', typeEn: 'Harm/Etiology', qZh: '這個因素會不會造成傷害？', qEn: 'Does this factor cause harm?', designZh: '世代或病例對照', designEn: 'Cohort or case-control', highlight: false },
                ].map(({ typeZh, typeEn, qZh, qEn, designZh, designEn, highlight }) => (
                  <tr key={typeEn} className={highlight ? 'bg-teal-50/30' : 'hover:bg-gray-50'}>
                    <td className={`px-3 py-2.5 border border-gray-200 font-medium ${highlight ? 'text-teal-700' : ''}`}>
                      {highlight && '⭐ '}{lang === 'zh' ? typeZh : typeEn}
                    </td>
                    <td className="px-3 py-2.5 border border-gray-200 text-gray-600">{lang === 'zh' ? qZh : qEn}</td>
                    <td className="px-3 py-2.5 border border-gray-200 text-gray-600">{lang === 'zh' ? designZh : designEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-teal-50/50 rounded-xl p-4 border border-teal-100">
            <p className="text-sm text-teal-800 leading-relaxed">
              <strong>{lang === 'zh' ? '⭐ EBM 競賽最常見的是治療/預防型' : '⭐ Treatment/Prevention is most common in EBM competitions'}</strong>
              {lang === 'zh'
                ? '，因為：(1) 最高等級證據是 SR with MA of RCTs；(2) CASP-SR 評讀工具就是針對系統性回顧設計；(3) Core GRADE 評分起點是「高」（因為納入 RCT）。你的問題類型決定了後續要搜尋什麼研究設計和用什麼評讀工具。'
                : ', because: (1) highest-level evidence is SR with MA of RCTs; (2) CASP-SR is designed for systematic reviews; (3) Core GRADE starts at "High" (for RCTs). Your question type determines what study designs to search and which appraisal tool to use.'}
            </p>
          </div>

          <Accordion title={lang === 'zh' ? '問題類型決定了整個 EBM 流程' : 'Question Type Shapes the Entire EBM Workflow'} icon="🔗" defaultOpen={false}>
            <div className="mt-3 space-y-2">
              {[
                { zh: '治療型 → 搜尋 RCT / SR → 用 CASP-SR 或 RoB 2 評讀 → GRADE 從「高」開始', en: 'Treatment → search RCTs / SRs → appraise with CASP-SR or RoB 2 → GRADE starts at "High"' },
                { zh: '診斷型 → 搜尋橫斷面研究 → 用 QUADAS-2 評讀 → GRADE 從「高」開始', en: 'Diagnosis → search cross-sectional → appraise with QUADAS-2 → GRADE starts at "High"' },
                { zh: '預後型 → 搜尋世代研究 → 用 NOS 評讀 → GRADE 從「低」開始（觀察性研究）', en: 'Prognosis → search cohort studies → appraise with NOS → GRADE starts at "Low" (observational)' },
                { zh: '傷害型 → 搜尋世代或病例對照 → 用 NOS 評讀 → GRADE 從「低」開始', en: 'Harm → search cohort/case-control → appraise with NOS → GRADE starts at "Low"' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg px-3 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{lang === 'zh' ? item.zh : item.en}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      )}

      {/* ═══ TAB: Selection ═══ */}
      {activeTab === 'selection' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            🎯 {lang === 'zh' ? '多個 PICOT？怎麼選主要的？' : 'Multiple PICOTs? How to Choose the Primary?'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '一個臨床情境通常可以衍生 2–3 個 PICOT。你需要選出一個作為主要 PICOT 深入研究。'
              : 'A clinical scenario usually generates 2–3 PICOTs. You need to select one as the primary for in-depth study.'}
          </p>

          <Accordion title={lang === 'zh' ? '範例：2024 近視案例的兩個 PICOT' : 'Example: 2024 Myopia Case — Two PICOTs'} icon="👁️" defaultOpen>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl p-4 border border-gray-200">
                <p className="text-xs font-bold text-gray-400 mb-2">PICOT-1</p>
                <div className="space-y-1.5 text-sm text-gray-700">
                  <p><span className="font-bold text-teal-600">P:</span> {lang === 'zh' ? '軸性近視兒童' : 'Children with axial myopia'}</p>
                  <p><span className="font-bold text-blue-600">I:</span> {lang === 'zh' ? '周邊離焦鏡片' : 'Peripheral defocus lenses'}</p>
                  <p><span className="font-bold text-purple-600">C:</span> {lang === 'zh' ? '傳統單焦眼鏡' : 'Traditional single-vision glasses'}</p>
                  <p><span className="font-bold text-orange-600">O:</span> SE, AL</p>
                </div>
                <p className="text-xs text-gray-400 mt-2">{lang === 'zh' ? '→ 針對「鏡片療效」議題' : '→ Addresses "lens efficacy"'}</p>
              </div>
              <div className="rounded-xl p-4 border-2" style={{ borderColor: '#0E7C86', background: '#0E7C8608' }}>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs font-bold text-teal-700">PICOT-2</p>
                  <span className="px-2 py-0.5 rounded-full text-xs text-white font-bold" style={{ background: '#0E7C86' }}>
                    {lang === 'zh' ? '主要 ✓' : 'Primary ✓'}
                  </span>
                </div>
                <div className="space-y-1.5 text-sm text-gray-700">
                  <p><span className="font-bold text-teal-600">P:</span> {lang === 'zh' ? '患有軸性近視且不想戴眼鏡的小六女生' : 'Sixth-grade girl with axial myopia who doesn\'t want glasses'}</p>
                  <p><span className="font-bold text-blue-600">I:</span> {lang === 'zh' ? '每晚兩眼各點一滴 atropine 眼藥水' : 'Nightly atropine eye drops, one drop per eye'}</p>
                  <p><span className="font-bold text-purple-600">C:</span> {lang === 'zh' ? '不點眼藥水' : 'No eye drops'}</p>
                  <p><span className="font-bold text-orange-600">O:</span> SE, AL, {lang === 'zh' ? '不良反應' : 'adverse events'}</p>
                  <p><span className="font-bold text-red-600">T:</span> 12 {lang === 'zh' ? '個月' : 'months'}</p>
                </div>
                <p className="text-xs text-teal-600 mt-2 font-medium">{lang === 'zh' ? '→ 原因：女童和母親均偏好使用眼藥水' : '→ Reason: Both girl and mother prefer eye drops'}</p>
              </div>
            </div>
          </Accordion>

          <Accordion title={lang === 'zh' ? '三個選擇原則' : 'Three Selection Principles'} icon="📐" defaultOpen>
            <div className="mt-3 space-y-3">
              {[
                {
                  numZh: '1. 病人偏好優先', numEn: '1. Patient Preference First',
                  descZh: '回到 Phase 1 記錄的病人偏好。選擇最符合病人期望的 PICOT。評審會特別看你的決策是否呼應 EBM 三支柱中的「病人偏好」。',
                  descEn: 'Go back to the patient preferences documented in Phase 1. Judges specifically check whether your choice reflects the "patient preference" pillar of EBM.',
                  iconInner: '❤️',
                },
                {
                  numZh: '2. 臨床可行性', numEn: '2. Clinical Feasibility',
                  descZh: '考慮你的醫療環境：這個介入措施在你的醫院做得到嗎？藥品可取得嗎？',
                  descEn: 'Consider your clinical setting: Can this intervention be implemented at your hospital? Is the drug available?',
                  iconInner: '🏥',
                },
                {
                  numZh: '3. 證據可得性', numEn: '3. Evidence Availability',
                  descZh: '該 PICOT 是否有足夠的高品質文獻？如果搜不到 SR，可能需要重新考慮。',
                  descEn: 'Are there enough high-quality studies? If you can\'t find an SR, you may need to reconsider.',
                  iconInner: '📚',
                },
              ].map(({ numZh, numEn, descZh, descEn, iconInner }) => (
                <div key={numEn} className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="text-sm font-semibold text-gray-800 mb-1">{iconInner} {lang === 'zh' ? numZh : numEn}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{lang === 'zh' ? descZh : descEn}</p>
                </div>
              ))}
            </div>
          </Accordion>

          <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-start gap-2">
              <HamsterConcerned size={24} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">
                {lang === 'zh'
                  ? '你必須明確寫出「為什麼選這個 PICOT」。評審會看你的決策邏輯是否合理、是否呼應病人偏好。沒有理由的選擇 = 扣分。'
                  : 'You must explicitly state "why this PICOT was chosen." Judges check if your logic is sound and aligns with patient preferences. No rationale = points deducted.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB: Quality Check ═══ */}
      {activeTab === 'checklist' && (
        <div>
          <h2 className="font-bold text-xl text-gray-800 mb-2">
            ✅ {lang === 'zh' ? 'PICOT 品質檢核清單' : 'PICOT Quality Checklist'}
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {lang === 'zh'
              ? '寫完 PICOT 後，用這個清單逐項檢查。每一項都是評審可能注意的重點。'
              : 'After writing your PICOT, check each item. Every point is something judges may scrutinize.'}
          </p>

          {/* P checks */}
          <div className="mb-4">
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-2">P — Population</p>
            <div className="space-y-1.5">
              {(lang === 'zh' ? [
                '☐ 包含疾病名稱和具體診斷標準',
                '☐ 包含年齡範圍或特定年齡',
                '☐ 包含嚴重程度或分期（如果適用）',
                '☐ 包含病人偏好或限制條件（如果臨床情境中有提到）',
                '☐ 讀者能根據你的描述想像出這個病人',
              ] : [
                '☐ Includes disease name and specific diagnostic criteria',
                '☐ Includes age range or specific age',
                '☐ Includes severity or staging (if applicable)',
                '☐ Includes patient preferences or constraints (if mentioned in the scenario)',
                '☐ Reader can picture this patient from your description',
              ]).map((item, i) => (
                <p key={i} className="text-sm text-gray-700 leading-relaxed bg-teal-50/30 rounded-lg px-3 py-1.5">{item}</p>
              ))}
            </div>
          </div>

          {/* I checks */}
          <div className="mb-4">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">I — Intervention</p>
            <div className="space-y-1.5">
              {(lang === 'zh' ? [
                '☐ 具體到藥名（學名，非商品名）',
                '☐ 包含劑量（mg、%、IU 等）',
                '☐ 包含給藥途徑（口服、注射、外用等）',
                '☐ 包含使用頻次和時間（每日幾次、持續多久）',
              ] : [
                '☐ Specific drug name (generic, not brand)',
                '☐ Includes dosage (mg, %, IU, etc.)',
                '☐ Includes administration route (oral, injection, topical)',
                '☐ Includes frequency and duration (how often, how long)',
              ]).map((item, i) => (
                <p key={i} className="text-sm text-gray-700 leading-relaxed bg-blue-50/30 rounded-lg px-3 py-1.5">{item}</p>
              ))}
            </div>
          </div>

          {/* C checks */}
          <div className="mb-4">
            <p className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-2">C — Comparison</p>
            <div className="space-y-1.5">
              {(lang === 'zh' ? [
                '☐ 明確指出對照是什麼（不要寫「標準照護」而不解釋）',
                '☐ 對照類型合理（安慰劑 / 不治療 / 活性對照）',
                '☐ 如果是活性對照，同樣要寫具體的藥名和劑量',
              ] : [
                '☐ Explicitly state what the comparison is (don\'t write "standard care" without explanation)',
                '☐ Comparison type is reasonable (placebo / no treatment / active comparator)',
                '☐ If active comparator, specify drug name and dose similarly',
              ]).map((item, i) => (
                <p key={i} className="text-sm text-gray-700 leading-relaxed bg-purple-50/30 rounded-lg px-3 py-1.5">{item}</p>
              ))}
            </div>
          </div>

          {/* O checks */}
          <div className="mb-4">
            <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-2">O — Outcome</p>
            <div className="space-y-1.5">
              {(lang === 'zh' ? [
                '☐ 同時列出效益指標和安全性指標',
                '☐ 至少有一個是病人導向結果（症狀、功能、生活品質）',
                '☐ 結果指標是可量化的（能計算效應量和 CI）',
                '☐ 區分「關鍵結果」和「重要結果」（為後續 GRADE 做準備）',
              ] : [
                '☐ Lists both efficacy AND safety outcomes',
                '☐ At least one patient-oriented outcome (symptoms, function, quality of life)',
                '☐ Outcomes are quantifiable (can calculate effect size and CI)',
                '☐ Distinguish "critical" from "important" outcomes (prepares for GRADE)',
              ]).map((item, i) => (
                <p key={i} className="text-sm text-gray-700 leading-relaxed bg-orange-50/30 rounded-lg px-3 py-1.5">{item}</p>
              ))}
            </div>
          </div>

          {/* T checks */}
          <div className="mb-4">
            <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">T — Time</p>
            <div className="space-y-1.5">
              {(lang === 'zh' ? [
                '☐ 追蹤時間合理（足以觀察到效果）',
                '☐ 與疾病自然病程一致',
              ] : [
                '☐ Follow-up duration is reasonable (long enough to observe effect)',
                '☐ Consistent with natural disease course',
              ]).map((item, i) => (
                <p key={i} className="text-sm text-gray-700 leading-relaxed bg-red-50/30 rounded-lg px-3 py-1.5">{item}</p>
              ))}
            </div>
          </div>

          {/* Overall checks */}
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">{lang === 'zh' ? '整體檢核' : 'Overall'}</p>
            <div className="space-y-1.5">
              {(lang === 'zh' ? [
                '☐ 問題類型已標示（治療/診斷/預後/傷害）',
                '☐ 如果有多個 PICOT，已選出主要 PICOT 並說明理由',
                '☐ 選擇理由與 Phase 1 記錄的病人偏好一致',
                '☐ PICOT 可以直接轉換為 PubMed 搜尋關鍵字（P 和 I → 搜尋詞）',
              ] : [
                '☐ Question type labeled (treatment/diagnosis/prognosis/harm)',
                '☐ If multiple PICOTs, primary selected with rationale',
                '☐ Selection rationale aligns with patient preferences from Phase 1',
                '☐ PICOT can be directly converted to PubMed keywords (P and I → search terms)',
              ]).map((item, i) => (
                <p key={i} className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg px-3 py-1.5">{item}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reference */}
      <div className="mt-8 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          {lang === 'zh'
            ? '本指南基於 EBMouse 教學內容、2024 EBM 競賽範例及 Richardson WS et al.（JAMA 1995;273:59–65）PICO 框架。'
            : 'Based on EBMouse teaching content, 2024 EBM competition examples, and Richardson WS et al. (JAMA 1995;273:59–65) PICO framework.'}
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
