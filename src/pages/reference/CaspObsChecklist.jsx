// src/pages/reference/CaspObsChecklist.jsx
// Interactive CASP-SR checklist for systematic reviews of observational studies (2024)
// Bilingual reference guide with PECOT(S) framework, scoring guidance, and pitfalls

import React, { useState } from 'react';
import { useLang } from '../../App';
import { HamsterThinking, HamsterConcerned } from '../../components/Hamster';
import { PracticeSection } from '../../components/PracticeQuestion';
import practiceQuestions from '../../data/practice';

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
    cant_tell: { emoji: '😐', bg: '#FEF9E7', color: '#F39C12', label: "Can't Tell" },
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
      <button onClick={() => setOpen(!open)} className="w-full text-left px-4 py-3.5 flex items-start gap-3">
        <span className="flex-shrink-0 w-12 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold mt-0.5"
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
              { score: 'cant_tell', guideZh: q.guideCantTellZh, guideEn: q.guideCantTellEn },
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

// ─── Section colors (5 sections A–E) ───
const S = {
  design: '#0E7C86',        // A — design valid
  methodology: '#2980B9',   // B — methodologically sound
  trustworthy: '#8E44AD',   // C — trustworthy results
  local: '#E67E22',         // D — locally relevant
  value: '#27AE60',         // E — greater value
};

// ─── CASP-Obs question data (10 main questions, 17 cards with sub-parts) ───
const caspObsQuestions = [
  // ════════ SECTION A: Design valid ════════
  {
    id: 'Q1',
    sectionColor: S.design,
    sectionLabel: { zh: 'A — 研究設計效度', en: 'A — Study Design Validity' },
    questionZh: '是否明確提出研究問題？（PECOT(S) 框架）',
    questionEn: 'Did the systematic review address a clearly formulated research question?',
    lookForZh: [
      '是否以 PECOT(S) 格式呈現研究問題？',
      'P (Population)、E (Exposure/暴露因子)、C (Comparator/對照組)、O (Outcome)、T (Time)、S (Setting) 是否都有明確定義？',
      'D (Detection)：是否清楚說明要偵測的是有益還是有害效果？',
      '是否說明虛無假設 (null hypothesis)？',
    ],
    lookForEn: [
      'Is the question presented in the PECOT(S) format?',
      'Are P (Population), E (Exposure/risk factor), C (Comparator), O (Outcome/Events), T (Time), S (Setting) all clearly defined?',
      'D (Detection): Is it clear whether they aim to detect a beneficial or harmful effect?',
      'Is a null hypothesis stated?',
    ],
    guideYesZh: '清楚的 PECOT(S)，各要素都有明確定義，並說明虛無假設。',
    guideYesEn: 'Clear PECOT(S) with all elements well-defined and a stated null hypothesis.',
    guideNoZh: '研究問題模糊，缺少 PECOT(S) 主要要素。',
    guideNoEn: 'Vague question, missing key PECOT(S) elements.',
    guideCantTellZh: 'PECOT(S) 部分定義但不完整。',
    guideCantTellEn: 'PECOT(S) partially defined but incomplete.',
    pitfallZh: '不要用 PICO 框架評讀觀察性研究 SR。觀察性研究關心的是「暴露因子」(Exposure) 而非「介入」(Intervention)，且必須包含「時間」(Time) 和「情境」(Setting) 兩個要素。',
    pitfallEn: 'Don\'t use PICO for observational SRs. Observational studies look at "Exposure" (not "Intervention") and must include "Time" and "Setting" elements.',
  },
  {
    id: 'Q2',
    sectionColor: S.design,
    questionZh: '是否搜尋合適的研究設計？',
    questionEn: 'Did the researchers search for appropriate study designs?',
    lookForZh: [
      '風險因子/暴露問題 → 是否搜尋觀察性研究設計？',
      '世代研究 (Cohort)：追蹤有/沒有暴露的兩組人，比較結果發生率。',
      '病例對照研究 (Case-control)：比較有/沒有疾病的兩組人，回溯過去的暴露。',
      '橫斷面研究 (Cross-sectional)：在某個時間點測量族群中暴露/結果的盛行率。',
    ],
    lookForEn: [
      'Risk factor/exposure question → did they search for observational designs?',
      'Cohort: follows people with/without an exposure over time and compares outcomes.',
      'Case-control: compares people with/without a condition (cases vs controls) and looks back at past exposures.',
      'Cross-sectional: measures the prevalence of exposure or outcome at a single time point.',
    ],
    guideYesZh: '明確搜尋符合問題類型的觀察性研究設計（cohort、case-control、cross-sectional）。',
    guideYesEn: 'Clearly searched for observational designs appropriate for the risk-factor question (cohort, case-control, cross-sectional).',
    guideNoZh: '搜尋了不適當的設計（如只搜 RCT），或沒有說明設計類型。',
    guideNoEn: 'Searched inappropriate designs (e.g., RCTs only) or didn\'t specify design types.',
    guideCantTellZh: '有提及但不夠明確。',
    guideCantTellEn: 'Mentioned but not clearly specified.',
    pitfallZh: '對於風險因子或暴露問題，RCT 通常不可行（如吸菸、空氣污染），因此觀察性研究往往是最佳可得證據——不要因為「不是 RCT」就扣分。',
    pitfallEn: 'For risk-factor or exposure questions, RCTs are often not feasible or ethical (e.g., smoking, air pollution). Observational studies are often the best available evidence — don\'t penalize for "not being an RCT."',
  },

  // ════════ SECTION B: Methodologically sound ════════
  {
    id: 'Q3a',
    sectionColor: S.methodology,
    sectionLabel: { zh: 'B — 方法學嚴謹度', en: 'B — Methodological Rigour' },
    questionZh: '文獻搜尋是否完整？',
    questionEn: 'Was the literature search comprehensive?',
    lookForZh: [
      '是否搜尋了主要書目資料庫（MEDLINE/PubMed、Embase）？',
      '是否使用 MeSH 詞彙（MEDLINE）或對應的詞彙（其他資料庫）？',
      '是否搜尋了主題特定資料庫？',
      '是否包含非英文文獻？',
      '是否進行引用搜尋（citation searching）和手動搜尋參考文獻？',
      '是否搜尋未發表研究（試驗登錄、preprint repository）？',
      '是否諮詢領域專家以找出潛在相關研究？',
    ],
    lookForEn: [
      'Were major bibliographic databases (MEDLINE/PubMed, Embase) searched?',
      'Were MeSH terms used (MEDLINE) or equivalents in other databases?',
      'Were subject-specific databases searched?',
      'Were non-English studies included?',
      'Citation searching + hand-searching of reference lists?',
      'Were unpublished studies searched (trial registries, preprint repositories)?',
      'Were experts in the field consulted?',
    ],
    guideYesZh: '多個資料庫 + MeSH + 灰色文獻 + 無語言限制 + 引用搜尋。',
    guideYesEn: 'Multiple databases + MeSH + grey literature + no language restriction + citation searching.',
    guideNoZh: '只搜尋一個資料庫、有嚴格語言限制、未搜尋灰色文獻。',
    guideNoEn: 'Single database, strict language limits, no grey literature search.',
    guideCantTellZh: '搜尋策略描述不完整，無法確定。',
    guideCantTellEn: 'Search strategy description incomplete, can\'t determine.',
    pitfallZh: '觀察性研究的發表偏誤通常比 RCT 更嚴重——未發表的研究（特別是企業贊助的）更值得懷疑。確認作者是否搜尋了 trial registries、會議摘要、灰色文獻。',
    pitfallEn: 'Publication bias is often more severe in observational studies than in RCTs. Check whether authors searched trial registries, conference abstracts, and grey literature — unpublished studies (especially industry-funded) raise concerns.',
  },
  {
    id: 'Q3b',
    sectionColor: S.methodology,
    questionZh: '初步篩選流程是否嚴謹？',
    questionEn: 'Was the screening process robust?',
    lookForZh: [
      '是否定義了適當的納入/排除條件？',
      '是否由兩位審查者獨立篩選？由第三位仲裁分歧？',
      '篩選是否基於標題和摘要？',
      '是否嚴格遵循納入條件？',
    ],
    lookForEn: [
      'Were appropriate inclusion/exclusion criteria defined?',
      'Did two reviewers screen independently with a third resolving disagreements?',
      'Was screening based on title and abstract?',
      'Did researchers adhere to the eligibility criteria?',
    ],
    guideYesZh: '兩人獨立篩選 + 有分歧處理機制 + 明確的標準。',
    guideYesEn: 'Two independent reviewers + disagreement resolution + explicit criteria.',
    guideNoZh: '單人篩選或未說明篩選流程。',
    guideNoEn: 'Single reviewer or screening process not described.',
    guideCantTellZh: '有提及但細節不足。',
    guideCantTellEn: 'Mentioned but lacking detail.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q3c',
    sectionColor: S.methodology,
    questionZh: '研究選取流程是否嚴謹？',
    questionEn: 'Was the study selection process robust?',
    lookForZh: [
      '是否兩位審查者獨立進行全文選取？',
      '是否計算並報告審查者間的一致性（如 Cohen\'s Kappa）？',
      '是否嚴格遵循納入條件？',
    ],
    lookForEn: [
      'Two reviewers independently selecting based on full-text analysis?',
      'Was inter-rater agreement calculated and reported (e.g., Cohen\'s Kappa)?',
      'Did researchers adhere to the eligibility criteria?',
    ],
    guideYesZh: '兩人獨立全文選取 + 報告 Kappa 一致性 + 嚴格遵循標準。',
    guideYesEn: 'Two independent reviewers + reported Kappa + strict adherence to criteria.',
    guideNoZh: '單人選取，或未說明流程，或未報告一致性。',
    guideNoEn: 'Single reviewer, undescribed process, or no agreement reported.',
    guideCantTellZh: '有提及但細節不足。',
    guideCantTellEn: 'Mentioned but lacking detail.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q3d',
    sectionColor: S.methodology,
    questionZh: '搜尋結果是否完整呈現？（PRISMA 流程圖）',
    questionEn: 'Were the search and outputs summarised? (PRISMA flowchart)',
    lookForZh: [
      '是否提供 PRISMA 風格的流程圖？',
      '流程圖是否包含：重複文獻數、初步排除數、全文排除數（含理由）、納入回顧的研究數、納入統合分析的研究數？',
    ],
    lookForEn: [
      'Is there a PRISMA-style flowchart?',
      'Does it include numbers of: duplicates, screened out, excluded with reasons, included in review, and included in meta-analysis?',
    ],
    guideYesZh: '完整的 PRISMA 流程圖含所有關鍵階段。',
    guideYesEn: 'Complete PRISMA flowchart with all key stages.',
    guideNoZh: '沒有流程圖或缺少關鍵資訊。',
    guideNoEn: 'No flowchart or missing key information.',
    guideCantTellZh: '部分流程圖但不完整。',
    guideCantTellEn: 'Partial flowchart but incomplete.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q4',
    sectionColor: S.methodology,
    questionZh: '是否評估初級研究的方法學嚴謹度？',
    questionEn: 'Did researchers assess validity / methodological rigour of included studies?',
    lookForZh: [
      '使用了什麼工具評估誤差風險？',
      '工具是否適合納入的研究設計？',
      '針對 cohort/case-control 研究：建議使用 Newcastle-Ottawa Scale (NOS) 或 ROBINS-E。',
      '評估結果是否充分呈現並準確詮釋？',
      '是否兩位審查者獨立評估？',
    ],
    lookForEn: [
      'What risk-of-bias tool was used?',
      'Was the tool appropriate for the included study design(s)?',
      'For cohort/case-control: Newcastle-Ottawa Scale (NOS) or ROBINS-E recommended.',
      'Were findings presented in sufficient detail and accurately interpreted?',
      'Were two reviewers assessing independently?',
    ],
    guideYesZh: '使用適合觀察性研究的工具（NOS、ROBINS-E）+ 兩人獨立評估 + 結果有呈現與詮釋。',
    guideYesEn: 'Tool appropriate for observational designs (NOS, ROBINS-E) + two independent assessors + results presented and interpreted.',
    guideNoZh: '未評估，或使用不適當的工具（如用 Cochrane RoB 2 評估觀察性研究）。',
    guideNoEn: 'Not assessed, or used an inappropriate tool (e.g., Cochrane RoB 2 for observational studies).',
    guideCantTellZh: '有提及但工具或流程不明。',
    guideCantTellEn: 'Mentioned but tool or process unclear.',
    pitfallZh: 'Cochrane RoB 2 和 ROBUST-RCT 是專為 RCT 設計的工具，不適用於觀察性研究。觀察性研究應使用 Newcastle-Ottawa Scale 或 ROBINS-E。看到作者用錯工具就要扣分。',
    pitfallEn: 'Cochrane RoB 2 and ROBUST-RCT are designed for RCTs and are not appropriate for observational studies. Use Newcastle-Ottawa Scale or ROBINS-E instead. Penalize if the wrong tool is used.',
  },
  {
    id: 'Q5a',
    sectionColor: S.methodology,
    questionZh: '資料擷取是否適當？',
    questionEn: 'Was data extraction appropriate?',
    lookForZh: [
      '是否設計並執行嚴謹的資料擷取流程？',
      '是否遵循擷取指引（如 Cochrane Handbook）？',
      '是否使用標準化表格或軟體確保完整性與準確性？',
      '是否擷取了研究層級特性與每篇研究的結果資料？',
    ],
    lookForEn: [
      'Was a robust data extraction process designed and implemented?',
      'Were extraction guidelines followed (e.g., Cochrane Handbook)?',
      'Was a standardised form or software used to ensure completeness and accuracy?',
      'Were study-level characteristics and results extracted from each study?',
    ],
    guideYesZh: '嚴謹流程 + 標準化表格 + 兩人獨立擷取。',
    guideYesEn: 'Robust process + standardised form + two independent extractors.',
    guideNoZh: '單人擷取或未描述流程。',
    guideNoEn: 'Single extractor or process not described.',
    guideCantTellZh: '有提及但不完整。',
    guideCantTellEn: 'Mentioned but incomplete.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q5b',
    sectionColor: S.methodology,
    questionZh: '資料呈現是否適當？',
    questionEn: 'Was data presentation appropriate?',
    lookForZh: [
      '是否有研究特性表格（參與者人數、年齡、性別、暴露、對照、結果、研究時間）？',
      '是否有 Forest plot 呈現各研究的效果量、CI、p 值，以及合併估計值？',
      '對觀察性研究：是否呈現各研究調整的混淆因子 (confounders)？',
    ],
    lookForEn: [
      'Is there a characteristics-of-studies table (participants, age, sex, exposure, comparator, outcomes, timeframe)?',
      'Is there a forest plot showing each study\'s effect size, CI, p value, and the pooled estimate?',
      'For observational studies: are the confounders adjusted for in each study presented?',
    ],
    guideYesZh: '完整研究特性表 + Forest plot + 混淆因子調整資訊透明呈現。',
    guideYesEn: 'Complete characteristics table + forest plot + transparent reporting of confounder adjustment.',
    guideNoZh: '缺少重要圖表或未呈現混淆因子調整資訊。',
    guideNoEn: 'Missing key figures or no information on confounder adjustment.',
    guideCantTellZh: '有部分圖表但不夠完整。',
    guideCantTellEn: 'Some figures but not comprehensive.',
    pitfallZh: '觀察性研究最關鍵的資訊之一是各研究調整了哪些混淆因子。如果作者沒有報告這個資訊，要警覺——殘餘混淆 (residual confounding) 是觀察性研究最大的偏誤來源。',
    pitfallEn: 'A critical piece of information for observational studies is which confounders each study adjusted for. If authors don\'t report this, be wary — residual confounding is the biggest source of bias in observational studies.',
  },

  // ════════ SECTION C: Trustworthy results ════════
  {
    id: 'Q6',
    sectionColor: S.trustworthy,
    sectionLabel: { zh: 'C — 結果可信度', en: 'C — Result Trustworthiness' },
    questionZh: '合併分析是否適當？',
    questionEn: 'Did researchers analyse the pooled results appropriately?',
    lookForZh: [
      '是否估計樣本數需求？實際樣本數是否足夠？',
      '是否使用適當的效果量指標（OR、RR、HR）並提供 CI？',
      '是否提供 MID（最小重要差異）？',
      '是否評估統計異質性（如 I² 統計量）？',
      '是否依異質性程度選擇適當模型（隨機效果 vs 固定效果）？',
      '觀察性研究通常異質性較高，多採用 random-effects model。',
      '是否進行敏感度分析？',
      '是否評估 small-study effect 與發表偏誤（如 funnel plot）？',
    ],
    lookForEn: [
      'Was sample size estimated? Was the actual sample sufficient?',
      'Were appropriate effect measures (OR, RR, HR) used with CIs?',
      'Was a minimal important difference (MID) provided?',
      'Was statistical heterogeneity assessed (e.g., I²)?',
      'Was the model choice (random vs fixed effects) appropriate to the heterogeneity?',
      'Observational studies usually have higher heterogeneity → random-effects model typically appropriate.',
      'Were sensitivity analyses performed?',
      'Were small-study effect and publication bias assessed (e.g., funnel plot)?',
    ],
    guideYesZh: '適當模型 + 異質性處理 + 敏感度分析 + small-study effect 評估。',
    guideYesEn: 'Appropriate model + heterogeneity addressed + sensitivity analysis + small-study effect assessed.',
    guideNoZh: '不該合併的研究被合併、異質性被忽略、模型選擇不當。',
    guideNoEn: 'Inappropriately pooled, heterogeneity ignored, or wrong model.',
    guideCantTellZh: '有合併但異質性處理或模型選擇不夠透明。',
    guideCantTellEn: 'Pooled but heterogeneity handling or model choice unclear.',
    pitfallZh: '觀察性研究的研究族群、暴露定義、混淆因子調整方式通常差異很大，異質性自然較高。若作者用 fixed-effects model 處理高異質性的觀察性研究資料，要扣分。',
    pitfallEn: 'Observational studies typically vary substantially in populations, exposure definitions, and confounder adjustment, so heterogeneity is usually high. Penalize if authors use a fixed-effects model on high-heterogeneity observational data.',
  },
  {
    id: 'Q6-1',
    sectionColor: S.trustworthy,
    questionZh: '次族群分析是否適當？',
    questionEn: 'Was subgroup analysis appropriate?',
    lookForZh: [
      '是否在研究計畫書中事前指定，包含預期方向與統計檢定方法？',
      '次族群是否清楚定義並有選擇理由？',
      '次族群之間是否相對獨立（不重疊）？',
      '是否針對主要結果進行分析？',
      '若有大量次族群，是否調整多重比較？',
      '是否進行交互作用檢定？',
      '是否基於 within-study 比較（較可信）而非 between-study 比較？',
    ],
    lookForEn: [
      'Pre-specified in the protocol, with direction and statistical tests?',
      'Subgroups clearly defined with rationale for selection?',
      'Subgroups not closely related to other characteristics (i.e., distinguishable)?',
      'Analysed in relation to the primary outcome?',
      'If many subgroups, was multiple testing addressed?',
      'Was a test for interaction performed?',
      'Was the analysis based on within-study (more credible) rather than between-study comparisons?',
    ],
    guideYesZh: '事前規劃 + 少量假設 + 交互作用檢定 + within-study 比較。',
    guideYesEn: 'Pre-specified + few hypotheses + interaction test + within-study comparison.',
    guideNoZh: '事後分析、大量假設、無交互作用檢定。',
    guideNoEn: 'Post-hoc, many hypotheses, no interaction test.',
    guideCantTellZh: '有做但無法確認是否事先規劃。',
    guideCantTellEn: 'Done but unclear if pre-specified.',
    pitfallZh: '在觀察性研究中，次族群差異也可能來自混淆因子在不同次族群分布不均，而非真正的效果調節。要謹慎詮釋。',
    pitfallEn: 'In observational studies, subgroup differences may arise from differential confounding across subgroups rather than true effect modification. Interpret cautiously.',
  },
  {
    id: 'Q6-2',
    sectionColor: S.trustworthy,
    questionZh: '統合迴歸分析是否適當？',
    questionEn: 'Was meta-regression appropriate?',
    lookForZh: [
      '共變數是否在計畫書中事前指定，含預期方向？',
      '若是連續變項分組，閾值是否事前指定且有理由？',
      '是否調整多重比較？',
      '是否進行交互作用檢定？',
      '是否使用 random-effects model（觀察性研究幾乎一定要用）？',
      '是否基於 within-study 而非 between-study 比較？',
      '研究數量是否足夠（通常 ≥10 篇）？',
    ],
    lookForEn: [
      'Were covariates pre-specified with direction?',
      'For continuous data categorised: were thresholds pre-specified with rationale?',
      'Was multiple testing addressed?',
      'Was a test for interaction performed?',
      'Was a random-effects model used (almost always required for observational studies)?',
      'Within-study rather than between-study comparison?',
      'Were there enough studies (typically ≥10)?',
    ],
    guideYesZh: '研究數量足夠 + 事前指定共變數 + random-effects + 交互作用檢定。',
    guideYesEn: 'Sufficient studies + pre-specified covariates + random-effects + interaction test.',
    guideNoZh: '研究太少、共變數事後選擇、未使用 random-effects model。',
    guideNoEn: 'Too few studies, post-hoc covariates, or no random-effects model.',
    guideCantTellZh: '有做但細節不足以判斷品質。',
    guideCantTellEn: 'Done but insufficient info to judge quality.',
    pitfallZh: '若不使用 random-effects model 處理觀察性研究的剩餘異質性，作者需要解釋這種選擇——否則應扣分。',
    pitfallEn: 'If a random-effects model is not used to account for residual heterogeneity in observational studies, authors must justify this choice — otherwise penalize.',
  },
  {
    id: 'Q7',
    sectionColor: S.trustworthy,
    questionZh: '是否充分討論研究限制？',
    questionEn: 'Did researchers report any limitations?',
    lookForZh: [
      '是否評論樣本數是否足以偵測效應？',
      '是否反思精確度（CI 範圍）？CI 是否包含「無效應線」？',
      '若結果有統計顯著差異，是否討論臨床重要性（用 MID）？',
      '是否考慮可能遺漏的相關研究？',
      '⭐ 是否討論納入研究的系統性偏誤？特別是混淆因子如何影響合併估計值？',
      '⭐ 是否提及潛在的混淆來源？',
      '是否討論異質性對結果的影響？',
      '是否討論發表偏誤的影響？',
    ],
    lookForEn: [
      'Did they comment on whether sample size was sufficient to detect an effect?',
      'Did they reflect on precision (CI range)? Did the CI include the line of no effect?',
      'If statistically significant, did they discuss clinical importance using an MID?',
      'Did they consider possibly missed relevant studies?',
      '⭐ Did they discuss systematic bias in included studies, especially how confounding might have influenced the pooled estimate?',
      '⭐ Did they mention potential sources of confounding?',
      'Did they discuss how heterogeneity affected results?',
      'Did they discuss publication bias?',
    ],
    guideYesZh: '系統性討論回顧與納入研究的限制，特別是混淆與偏誤方向。',
    guideYesEn: 'Systematic discussion of limitations of both review and included studies, especially confounding and direction of bias.',
    guideNoZh: '完全沒有討論限制，或未提及混淆。',
    guideNoEn: 'No discussion of limitations, or no mention of confounding.',
    guideCantTellZh: '有提及但過於簡略。',
    guideCantTellEn: 'Mentioned but too brief.',
    pitfallZh: '對觀察性研究 SR 而言，必須討論「殘餘混淆」(residual confounding)。即使每篇研究都有調整一些混淆因子，仍可能有未被測量或未被調整的混淆——這是觀察性研究 SR 必有的限制。',
    pitfallEn: 'For observational SRs, residual confounding must be discussed. Even when individual studies adjust for some confounders, unmeasured or unadjusted confounding may remain — this is an inherent limitation of observational SRs.',
  },
  {
    id: 'Q7-1',
    sectionColor: S.trustworthy,
    questionZh: '次族群分析的限制是否充分討論？',
    questionEn: 'Were limitations of subgroup analyses discussed?',
    lookForZh: [
      '若次族群非事前指定，是否討論可能引入的偏誤？',
      '次族群間若彼此相關（如年齡與共病），是否提及混淆可能？',
      '次族群樣本數是否足以偵測效應？',
      '若做了 >3 個次族群分析，是否調整多重比較與 Type I error？',
      '是否解釋交互作用檢定結果（量性 vs 質性）？',
      'Between-study 比較時，最小次族群的研究數量是否足夠？',
    ],
    lookForEn: [
      'If not pre-specified, did they address potential bias?',
      'If subgroups are related (e.g., age and comorbidity), was confounding mentioned?',
      'Was subgroup sample size sufficient to detect effects?',
      'If >3 subgroup analyses, was multiple testing and Type I error addressed?',
      'Were interaction test results (quantitative vs qualitative) explained?',
      'For between-study comparisons, were the smallest subgroups large enough?',
    ],
    guideYesZh: '完整討論事前規劃、混淆、樣本數、交互作用結果。',
    guideYesEn: 'Comprehensive discussion of pre-specification, confounding, sample size, and interaction results.',
    guideNoZh: '未討論次族群分析的限制。',
    guideNoEn: 'Subgroup limitations not discussed.',
    guideCantTellZh: '部分討論但不完整。',
    guideCantTellEn: 'Partial discussion but incomplete.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q7-2',
    sectionColor: S.trustworthy,
    questionZh: '統合迴歸的限制是否充分討論？',
    questionEn: 'Were limitations of meta-regression discussed?',
    lookForZh: [
      '若共變數非事前指定，是否討論潛在偏誤？',
      '若連續資料分組，是否討論閾值任意性的問題？',
      '是否討論多重比較與 Type I error？',
      '是否解釋交互作用檢定結果？',
      '若未使用 random-effects 模型，是否說明影響？',
      'Between-study 比較時，研究數量是否足夠？',
    ],
    lookForEn: [
      'If covariates not pre-specified, was potential bias discussed?',
      'If continuous data categorised, were arbitrary thresholds discussed?',
      'Was multiple testing and Type I error addressed?',
      'Were interaction test results explained?',
      'If random-effects not used, were implications discussed?',
      'For between-study comparisons, were there enough studies?',
    ],
    guideYesZh: '完整討論統合迴歸所有限制。',
    guideYesEn: 'Comprehensive discussion of meta-regression limitations.',
    guideNoZh: '未討論統合迴歸的限制。',
    guideNoEn: 'Meta-regression limitations not discussed.',
    guideCantTellZh: '部分討論但不完整。',
    guideCantTellEn: 'Partial discussion but incomplete.',
    pitfallZh: null, pitfallEn: null,
  },
  {
    id: 'Q8',
    sectionColor: S.trustworthy,
    questionZh: '採取行動的好處是否大於潛在傷害與資源負擔？',
    questionEn: 'Would benefits of acting on results outweigh disadvantages, harms, and resource demands?',
    lookForZh: [
      '是否清楚說明採取行動的可能好處（考慮研究限制後）？',
      '是否識別潛在的不利影響、不良結果或負面衝擊？',
      '若有，是否權衡好處與壞處，討論整體平衡？',
      '是否報告所需資源（成本、人力、時間、技能、訓練、IT、資料蒐集）？',
    ],
    lookForEn: [
      'Are likely benefits of action clear (considering study limitations)?',
      'Did they identify potential disadvantages, unwanted outcomes, or negative impacts?',
      'Did they assess benefits against disadvantages and discuss overall balance?',
      'Did they report potential resource demands (cost, workforce, time, skills, training, IT, data collection)?',
    ],
    guideYesZh: '清楚討論好處、壞處、整體平衡與資源需求。',
    guideYesEn: 'Clear discussion of benefits, harms, balance, and resource demands.',
    guideNoZh: '未討論利弊權衡或資源需求。',
    guideNoEn: 'No discussion of benefit-harm trade-off or resources.',
    guideCantTellZh: '部分討論但不完整。',
    guideCantTellEn: 'Partial discussion but incomplete.',
    pitfallZh: '這題是觀察性研究 SR 版本獨有的——RCT SR 版本沒有。它促使評讀者思考「即使證據可信，行動是否值得？」這對於資源有限的決策者特別重要。',
    pitfallEn: 'This question is unique to the observational SR version (not in the RCT SR version). It pushes the appraiser to ask "even if the evidence is trustworthy, is action worth it?" — especially important for resource-limited decision-makers.',
  },

  // ════════ SECTION D: Locally relevant ════════
  {
    id: 'Q9',
    sectionColor: S.local,
    sectionLabel: { zh: 'D — 在地適用性', en: 'D — Local Applicability' },
    questionZh: '結果能應用到你的在地族群或臨床情境嗎？',
    questionEn: 'Can results be applied to your local population/setting?',
    lookForZh: [
      '在地族群與納入研究的族群是否有重要差異？',
      '在地情境（醫療資源、文化、流行病學）與研究情境是否有重要差異？',
      '研究者是否遺漏了在地族群關心的結果或因子？',
    ],
    lookForEn: [
      'Are there important differences between your local population and study participants?',
      'Are there important differences in setting (healthcare resources, culture, epidemiology)?',
      'Did researchers omit outcomes or factors that matter to your local population?',
    ],
    guideYesZh: '結果能合理應用於在地族群與情境。',
    guideYesEn: 'Results can reasonably be applied to your local population/setting.',
    guideNoZh: '存在重要差異會影響應用。',
    guideNoEn: 'Important differences exist that affect applicability.',
    guideCantTellZh: '有些差異但不確定是否影響應用。',
    guideCantTellEn: 'Some differences but unclear if they affect applicability.',
    pitfallZh: '對觀察性研究而言，「暴露的盛行率」與「混淆因子的分布」可能在不同族群間差異很大。例如：某個職業暴露在已開發國家罕見，但在開發中國家普遍——這會影響絕對風險的估計。',
    pitfallEn: 'For observational studies, "exposure prevalence" and "confounder distribution" can differ greatly across populations. E.g., an occupational exposure rare in developed countries but common in developing ones — this affects absolute risk estimates.',
  },

  // ════════ SECTION E: Greater value ════════
  {
    id: 'Q10',
    sectionColor: S.value,
    sectionLabel: { zh: 'E — 更大價值', en: 'E — Greater Value' },
    questionZh: '若採取行動，能為你負責的族群帶來更大的價值嗎？',
    questionEn: 'Would acting on findings represent greater value for the population you serve?',
    lookForZh: [
      '價值 = 結果（好處 − 壞處）÷ 實施所需資源',
      '採取行動需要哪些資源？（成本、時間、技能組合、訓練需求、IT 要求、其他物資）',
      '若有需要，能否從其他活動釋出資源來投入這個行動？',
    ],
    lookForEn: [
      'Value = Outcomes (Benefit − Harm) ÷ Resources required',
      'What resources would be needed to implement? (Cost, time, skill mix, training needs, IT, other materials)',
      'If necessary, can resources be disinvested from other activities to invest here?',
    ],
    guideYesZh: '行動能為在地族群帶來明顯增值。',
    guideYesEn: 'Action would clearly add value for the local population.',
    guideNoZh: '不會帶來額外價值。',
    guideNoEn: 'Would not provide additional value.',
    guideCantTellZh: '不確定是否值得投入資源。',
    guideCantTellEn: 'Unclear if worth the resource investment.',
    pitfallZh: '這題與 Q8 一起構成觀察性研究 SR 評讀獨有的「實施可行性」評估。它提醒評讀者：可信的證據不代表必須立即行動——還要考慮機會成本。',
    pitfallEn: 'This question, together with Q8, forms the implementation feasibility assessment unique to the observational SR checklist. It reminds appraisers: trustworthy evidence doesn\'t mean immediate action — opportunity costs matter.',
  },
];

// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
export default function CaspObsChecklist() {
  const { lang } = useLang();
  const [activeSection, setActiveSection] = useState('all');

  const sections = [
    { id: 'all', zh: '全部', en: 'All', icon: '📋' },
    { id: 'design', zh: 'A 設計', en: 'A Design', icon: '🎯' },
    { id: 'methodology', zh: 'B 方法', en: 'B Method', icon: '🔬' },
    { id: 'trustworthy', zh: 'C 可信度', en: 'C Trustworthy', icon: '📊' },
    { id: 'local', zh: 'D 在地', en: 'D Local', icon: '📍' },
    { id: 'value', zh: 'E 價值', en: 'E Value', icon: '💰' },
    { id: 'practice', zh: '練習', en: 'Practice', icon: '🏋️' },
  ];

  const sectionMap = {
    design: S.design,
    methodology: S.methodology,
    trustworthy: S.trustworthy,
    local: S.local,
    value: S.value,
  };

  const filteredQuestions = activeSection === 'all'
    ? caspObsQuestions
    : activeSection === 'practice'
      ? []
      : caspObsQuestions.filter(q => q.sectionColor === sectionMap[activeSection]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <HamsterThinking size={48} />
        <div>
          <h1 className="font-bold text-3xl" style={{ color: '#0E7C86' }}>
            CASP-SR (Obs) {lang === 'zh' ? '評讀清單' : 'Checklist'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {lang === 'zh'
              ? '觀察性研究系統性回顧的批判性評讀指引 — 10 題 × 5 區塊 + PECOT(S) 框架'
              : 'Critical appraisal guide for systematic reviews of observational studies — 10 questions × 5 sections + PECOT(S)'}
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-5 mb-6">
        <h2 className="font-bold text-base text-teal-800 mb-2">
          {lang === 'zh' ? '為什麼觀察性研究 SR 需要不同的評讀清單？' : 'Why a separate checklist for observational SRs?'}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {lang === 'zh'
            ? '對於風險因子或暴露問題（如吸菸、空氣污染、飲食），RCT 通常不可行或不符合倫理。觀察性研究（cohort、case-control、cross-sectional）成為最佳可得證據。但觀察性研究的偏誤類型與 RCT 不同——殘餘混淆 (residual confounding) 是最大威脅。因此 CASP 為這類 SR 設計了專屬清單：10 題、5 區塊、使用 PECOT(S) 框架。'
            : 'For risk-factor or exposure questions (e.g., smoking, air pollution, diet), RCTs are often infeasible or unethical. Observational studies (cohort, case-control, cross-sectional) become the best available evidence. But the bias types differ from RCTs — residual confounding is the biggest threat. CASP designed a dedicated checklist for these SRs: 10 questions across 5 sections, using the PECOT(S) framework.'}
        </p>
      </div>

      {/* PECOT(S) framework */}
      <Accordion title={lang === 'zh' ? 'PECOT(S) 框架解析' : 'The PECOT(S) Framework'} icon="📐" defaultOpen>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { letter: 'P', zh: 'Population — 研究族群（年齡、疾病狀態、地理）', en: 'Population — Who is being studied (age, disease, geography)' },
            { letter: 'E', zh: 'Exposure / Risk factor — 暴露因子（取代 RCT 的 Intervention）', en: 'Exposure / Risk factor — Replaces "Intervention" from PICO' },
            { letter: '(D)', zh: 'Detection — 要偵測的是有益還是有害效果', en: 'Detection — Whether to detect a beneficial or harmful effect' },
            { letter: 'C', zh: 'Comparator / Controls — 對照組（未暴露 / 不同暴露程度）', en: 'Comparator / Controls — Unexposed or differently exposed group' },
            { letter: 'O', zh: 'Outcome / Events — 結果或事件', en: 'Outcome / Events — The outcomes or events of interest' },
            { letter: 'T', zh: 'Time — 暴露時間長度，或追蹤時間長度', en: 'Time — Length of exposure, or follow-up duration' },
            { letter: 'S', zh: 'Setting — 研究情境（醫院、社區、職場、國家）', en: 'Setting — Where the study took place (hospital, community, workplace, country)' },
          ].map(({ letter, zh, en }) => (
            <div key={letter} className="flex items-start gap-2 bg-teal-50/40 rounded-lg px-3 py-2">
              <span className="flex-shrink-0 w-7 h-7 rounded-md bg-teal-600 text-white text-xs font-bold flex items-center justify-center">{letter}</span>
              <p className="text-xs text-gray-700 leading-relaxed">{lang === 'zh' ? zh : en}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3 leading-relaxed">
          {lang === 'zh'
            ? '⭐ 與 PICO 的關鍵差異：(1) E 取代 I，因為觀察性研究關心「自然發生的暴露」而非「被指派的介入」；(2) 必須包含 T 和 S，因為觀察性研究的時間點與情境會深刻影響結果。'
            : '⭐ Key differences from PICO: (1) E replaces I, because observational studies look at "naturally-occurring exposure" rather than "assigned intervention"; (2) T and S are required, because the timing and setting profoundly affect observational results.'}
        </p>
      </Accordion>

      {/* Differences from CASP-SR (RCT) */}
      <Accordion title={lang === 'zh' ? '與 CASP-SR (RCT) 版本的關鍵差異' : 'Key differences from the CASP-SR (RCT) version'} icon="🔀">
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr style={{ background: '#E8F6F7' }}>
                <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">{lang === 'zh' ? '面向' : 'Aspect'}</th>
                <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">CASP-SR (RCT)</th>
                <th className="text-left px-3 py-2 font-semibold text-teal-800 border border-teal-200">CASP-SR (Obs)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { aspect: { zh: '題數', en: 'Questions' }, rct: '13', obs: '10' },
                { aspect: { zh: '區塊', en: 'Sections' }, rct: { zh: '3 區（效度／結果／適用性）', en: '3 (Validity / Results / Applicability)' }, obs: { zh: '5 區（A–E）', en: '5 (A–E)' } },
                { aspect: { zh: '問題框架', en: 'Question framework' }, rct: 'PICO', obs: 'PECOT(S)' },
                { aspect: { zh: '評分標籤', en: 'Score labels' }, rct: { zh: 'Yes / No / Uncertain', en: 'Yes / No / Uncertain' }, obs: { zh: 'Yes / No / Can\'t Tell', en: 'Yes / No / Can\'t Tell' } },
                { aspect: { zh: 'RoB 工具', en: 'RoB tools' }, rct: 'Cochrane RoB 2, ROBUST-RCT', obs: 'Newcastle-Ottawa, ROBINS-E' },
                { aspect: { zh: '獨有題目', en: 'Unique questions' }, rct: { zh: '無', en: 'None' }, obs: { zh: 'Q8 利弊權衡 / Q10 價值評估', en: 'Q8 benefit-harm balance / Q10 value' } },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border border-gray-200 font-medium">{typeof row.aspect === 'object' ? row.aspect[lang] : row.aspect}</td>
                  <td className="px-3 py-2 border border-gray-200 text-gray-600">{typeof row.rct === 'object' ? row.rct[lang] : row.rct}</td>
                  <td className="px-3 py-2 border border-gray-200 text-gray-600">{typeof row.obs === 'object' ? row.obs[lang] : row.obs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Accordion>

      {/* Key principles */}
      <Accordion title={lang === 'zh' ? '評讀原則：先讀再答，附上證據' : 'Appraisal Principles: Read First, Cite Evidence'} icon="⭐">
        <div className="mt-3 space-y-2">
          {[
            { zh: '每題都要從文獻中找出具體句子或段落作為支持證據。', en: 'Every answer must be supported by specific sentences or sections from the article.' },
            { zh: '若文獻沒有明確提到某項資訊，答「Can\'t Tell」而非「Yes」。', en: 'If the article doesn\'t explicitly mention something, answer "Can\'t Tell" — not "Yes".' },
            { zh: '若大量題目答「Can\'t Tell」，要重新評估文獻的可信度。', en: 'If many "Can\'t Tell" responses accumulate, reconsider whether findings are trustworthy.' },
            { zh: '對觀察性研究，特別關注「混淆因子」(confounders) 是否被識別與調整。', en: 'For observational studies, pay special attention to whether confounders are identified and adjusted for.' },
            { zh: '不同結果可能有不同的偏誤風險（如：客觀的死亡率 vs 主觀的生活品質），分開考量。', en: 'Different outcomes may have different bias risks (e.g., objective mortality vs subjective quality of life) — consider separately.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 bg-teal-50/40 rounded-lg px-3 py-2">
              <span className="text-teal-500 mt-0.5 flex-shrink-0">✦</span>
              <p className="text-sm text-gray-700 leading-relaxed">{lang === 'zh' ? item.zh : item.en}</p>
            </div>
          ))}
        </div>
      </Accordion>

      {/* Section filter */}
      <div className="flex flex-wrap gap-1.5 mb-5 mt-6">
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

      {/* Practice tab */}
      {activeSection === 'practice' ? (
        <PracticeSection
          questions={practiceQuestions.casp_obs}
          title={{ zh: 'CASP-Obs 評讀練習', en: 'CASP-Obs Appraisal Practice' }}
        />
      ) : (
        <>
      {/* Questions */}
      <div>
        {filteredQuestions.map(q => (
          <CaspQuestionCard key={q.id} q={q} lang={lang} />
        ))}
      </div>

      {/* Five-section overview */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { color: S.design, zh: 'A 研究設計效度 (Q1–Q2)', en: 'A Study Design Validity (Q1–Q2)', descZh: '研究問題清楚？選對研究設計？', descEn: 'Clear question? Right study design?' },
          { color: S.methodology, zh: 'B 方法學嚴謹度 (Q3–Q5)', en: 'B Methodological Rigour (Q3–Q5)', descZh: '搜尋完整？評估嚴謹？資料可靠？', descEn: 'Thorough search? Rigorous assessment? Reliable data?' },
          { color: S.trustworthy, zh: 'C 結果可信度 (Q6–Q8)', en: 'C Result Trustworthiness (Q6–Q8)', descZh: '統計適當？討論限制？權衡利弊？', descEn: 'Appropriate stats? Limitations discussed? Benefit-harm balanced?' },
          { color: S.local, zh: 'D 在地適用性 (Q9)', en: 'D Local Applicability (Q9)', descZh: '能用於我的族群？', descEn: 'Can it apply to my population?' },
          { color: S.value, zh: 'E 更大價值 (Q10)', en: 'E Greater Value (Q10)', descZh: '行動值得投入資源？', descEn: 'Is action worth the resources?' },
        ].map(({ color, zh, en, descZh, descEn }) => (
          <div key={zh} className="rounded-xl p-4 border" style={{ borderColor: color + '40', background: color + '08' }}>
            <p className="font-bold text-sm mb-1" style={{ color }}>{lang === 'zh' ? zh : en}</p>
            <p className="text-xs text-gray-600 leading-relaxed">{lang === 'zh' ? descZh : descEn}</p>
          </div>
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
      </Accordion>
        </>
      )}

      {/* Reference */}
      <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Source:</strong> Critical Appraisal Skills Programme (2024). CASP Checklist: Systematic Reviews with Meta-analysis of Observational Studies. <a href="https://casp-uk.net" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">casp-uk.net</a>
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
