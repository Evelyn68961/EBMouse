import React, { useState } from 'react';
import { useProject } from './WorkflowRouter';
import { useLang } from '../../App';
import { t } from '../../i18n';
import HintCard from '../../components/HintCard';
import Hamster from '../../components/Hamster';
import teachingContent from '../../data/teachingContent';
import { TeachingBlocksForSection, PhaseIntro } from '../../components/TeachingBlock';
import ToolboxLinks from '../../components/ToolboxLinks';
import { newOutcome, newOutcomeGrade } from '../../projectSchema';

const phase = teachingContent.appraise;

// The five GRADE domains, now assessed per-outcome.
const outcomeDomains = [
  { key: "riskOfBias", zh: "誤差風險", en: "Risk of Bias" },
  { key: "imprecision", zh: "不精確性", en: "Imprecision" },
  { key: "inconsistency", zh: "不一致性", en: "Inconsistency" },
  { key: "indirectness", zh: "不直接性", en: "Indirectness" },
  { key: "publicationBias", zh: "發表偏誤", en: "Publication Bias" },
];

const categoryOptions = [
  { value: "benefit", zh: "利益", en: "Benefit" },
  { value: "harm", zh: "傷害", en: "Harm" },
  { value: "neutral", zh: "中性", en: "Neutral" },
];

const caspQuestions = {
  q1: { zh: "Q1. 是否明確提出研究問題？", en: "Q1. Was there a clear research question?" },
  q2: { zh: "Q2. 是否搜尋合適的研究設計？", en: "Q2. Did they search for appropriate study designs?" },
  q3a: { zh: "Q3a. 文獻搜尋是否完整？", en: "Q3a. Was the literature search comprehensive?" },
  q3b: { zh: "Q3b. 文獻篩選是否適當？", en: "Q3b. Was study selection appropriate?" },
  q3c: { zh: "Q3c. 文獻納入標準是否合理？", en: "Q3c. Were inclusion criteria reasonable?" },
  q3d: { zh: "Q3d. 檢索策略是否充分？", en: "Q3d. Was the search strategy adequate overall?" },
  q4: { zh: "Q4. 是否評估初級研究的效度？", en: "Q4. Was study validity assessed?" },
  q5a: { zh: "Q5a. 資料擷取是否適當？", en: "Q5a. Was data extraction appropriate?" },
  q5b: { zh: "Q5b. 資料呈現是否適當？", en: "Q5b. Was data presentation appropriate?" },
  q6: { zh: "Q6. 合併分析是否適當？", en: "Q6. Was data combination appropriate?" },
  q6_1: { zh: "Q6-1. 次族群分析", en: "Q6-1. Subgroup analysis" },
  q6_2: { zh: "Q6-2. 統合迴歸分析", en: "Q6-2. Meta-regression" },
  q7: { zh: "Q7. 是否提及研究限制？", en: "Q7. Were limitations discussed?" },
};

const scoreOptions = [
  { value: "yes", label: { zh: "是 😀", en: "Yes 😀" }, color: "bg-green-100 text-green-700 border-green-300" },
  { value: "no", label: { zh: "否 😟", en: "No 😟" }, color: "bg-red-100 text-red-700 border-red-300" },
  { value: "uncertain", label: { zh: "不確定 😐", en: "Uncertain 😐" }, color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
];

const gradeLabels = {
  riskOfBias: { zh: "誤差風險", en: "Risk of Bias" },
  imprecision: { zh: "不精確性", en: "Imprecision" },
  inconsistency: { zh: "不一致性", en: "Inconsistency" },
  indirectness: { zh: "PICO 不直接性", en: "Indirectness" },
  publicationBias: { zh: "發表偏誤", en: "Publication Bias" },
};

export default function PhaseAppraise() {
  const { project, updateProject } = useProject();
  const { lang } = useLang();
  const [tab, setTab] = useState("casp");

  const data = project.appraise;

  const updateAppraise = (updater) => {
    updateProject((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      updater(next.appraise);
      return next;
    });
  };

  // Ensure an outcome has the full per-outcome 5-domain GRADE shape (older saved
  // projects may only have imprecision/inconsistency).
  const ensureGrade = (o) => {
    const base = newOutcomeGrade();
    if (!o.grade) o.grade = base;
    for (const k of Object.keys(base)) {
      if (k === "certainty") { if (typeof o.grade.certainty !== "string") o.grade.certainty = ""; continue; }
      if (!o.grade[k]) o.grade[k] = base[k];
      else if (typeof o.grade[k].decision !== "number") o.grade[k].decision = 0;
      if (o.grade[k] && typeof o.grade[k].note !== "string") o.grade[k].note = "";
    }
    return o.grade;
  };
  const outcomeTotal = (o) => outcomeDomains.reduce((s, d) => s + (Number(o?.grade?.[d.key]?.decision) || 0), 0);
  const certaintyWord = (total) => total >= 0 ? (lang === "zh" ? "高" : "High")
    : total === -1 ? (lang === "zh" ? "中" : "Moderate")
    : total === -2 ? (lang === "zh" ? "低" : "Low") : (lang === "zh" ? "很低" : "Very low");

  // PICO comparison (study vs case) for the indirectness slides (S20/S43).
  const pico = data.grade.domains.indirectness.picoComparison || {};
  const updatePC = (k, field, value) => updateAppraise((app) => {
    const ind = app.grade.domains.indirectness;
    if (!ind.picoComparison) ind.picoComparison = {};
    if (!ind.picoComparison[k]) ind.picoComparison[k] = { study: "", case_: "", similarity: "" };
    ind.picoComparison[k][field] = value;
  });

  const tabs = [
    { id: "casp", label: lang === "zh" ? "CASP 評讀" : "CASP Appraisal" },
    { id: "results", label: lang === "zh" ? "結果摘要" : "Results Summary" },
    { id: "grade", label: lang === "zh" ? "GRADE 評估" : "GRADE Assessment" },
    { id: "evidence", label: lang === "zh" ? "佐證與額外分析" : "Supporting & Analyses" },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Hamster mood="thinking" size={40} />
        <div>
          <h2 className="font-display font-bold text-2xl text-teal-700">{t("phase4", lang)}</h2>
          <p className="text-sm text-gray-400">{t("phase4Sub", lang)}</p>
        </div>
      </div>

      {/* Phase intro */}
      <PhaseIntro intro={phase.intro} />
      <ToolboxLinks phase={4} />

      <div className="bg-warm-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
        <Hamster mood="concerned" size={24} />
        <p className="text-sm text-amber-800">{t("hamsterPhase4Start", lang)}</p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              tab === id ? "bg-white text-teal-700 shadow-sm" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* CASP Tab */}
      {tab === "casp" && (
        <div>
          {/* Teaching blocks for CASP */}
          <TeachingBlocksForSection blocks={phase.blocks} section="casp" />

          <div className="bg-white rounded-xl border border-gray-100 p-4 mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "評讀工具" : "Tool"}</label>
              <input type="text" value={data.casp.tool || ""}
                onChange={(e) => updateAppraise((app) => { app.casp.tool = e.target.value; })}
                placeholder="CASP-SR"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Kappa</label>
              <input type="text" value={data.casp.kappa ?? ""}
                onChange={(e) => updateAppraise((app) => { app.casp.kappa = e.target.value; })}
                placeholder={lang === "zh" ? "人機一致性，例：0.8" : "e.g., 0.8"}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "評讀備註" : "Comment"}</label>
              <textarea value={data.casp.comment || ""}
                onChange={(e) => updateAppraise((app) => { app.casp.comment = e.target.value; })}
                rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs resize-y" />
            </div>
          </div>

          <div className="space-y-4 mt-4">
            {Object.entries(caspQuestions).map(([key, labels]) => (
              <div key={key} className="bg-white rounded-xl border border-gray-100 p-4">
                <p className="font-medium text-gray-700 text-sm mb-3">{labels[lang]}</p>
                <div className="flex gap-2 mb-3">
                  {scoreOptions.map(({ value, label, color }) => (
                    <button
                      key={value}
                      onClick={() => updateAppraise((app) => { app.casp.scores[key].human = value; })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        data.casp.scores[key].human === value
                          ? `${color} border-current scale-105`
                          : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {label[lang]}
                    </button>
                  ))}
                </div>
                <textarea
                  value={data.casp.scores[key].evidence}
                  onChange={(e) => updateAppraise((app) => { app.casp.scores[key].evidence = e.target.value; })}
                  placeholder={lang === "zh" ? "支持你判斷的證據..." : "Evidence supporting your judgment..."}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs resize-y"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Tab */}
      {tab === "results" && (
        <div>
          {/* Teaching blocks for results */}
          <TeachingBlocksForSection blocks={phase.blocks} section="results" />

          <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "📊 主要結果" : "📊 Key Outcomes"}</h3>
          {data.results.outcomes.map((outcome, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "結果指標名稱" : "Outcome name"}</label>
                  <input type="text" value={outcome.name} onChange={(e) => updateAppraise((app) => { app.results.outcomes[idx].name = e.target.value; })}
                    placeholder={lang === "zh" ? "例：球面等效屈光度 (SE)" : "e.g., Spherical Equivalent (SE)"}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "類別" : "Category"}</label>
                  <div className="flex gap-2">
                    {categoryOptions.map(({ value, zh, en }) => (
                      <button key={value}
                        onClick={() => updateAppraise((app) => { app.results.outcomes[idx].category = app.results.outcomes[idx].category === value ? "" : value; })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          outcome.category === value ? "bg-teal-100 text-teal-700 border-teal-300" : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"}`}>
                        {lang === "zh" ? zh : en}
                      </button>
                    ))}
                  </div>
                </div>
                {[
                  { key: "sampleSize", label: lang === "zh" ? "樣本數（可含 RCT 數，如 91,122 人 (8 RCT)）" : "Sample size", wide: true },
                  { key: "rctCount", label: lang === "zh" ? "RCT 數量（簡報用）" : "RCT count (slides)", type: "number" },
                  { key: "effectSize", label: lang === "zh" ? "效應量 (WMD/OR/RR)" : "Effect size (WMD/OR/RR)" },
                  { key: "ci95", label: "95% CI", placeholder: "e.g., [0.23, 0.54]" },
                  { key: "pValue", label: "p-value" },
                  { key: "nnt", label: "NNT" },
                  { key: "nnh", label: "NNH" },
                ].map(({ key, label, type, placeholder, wide }) => (
                  <div key={key} className={wide ? "col-span-2" : ""}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                    <input type={type || "text"} value={outcome[key] || ""}
                      onChange={(e) => updateAppraise((app) => { app.results.outcomes[idx][key] = type === "number" ? parseInt(e.target.value) || 0 : e.target.value; })}
                      placeholder={placeholder || label}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={() => updateAppraise((app) => { app.results.outcomes.push(newOutcome()); })}
            className="text-sm text-teal-500 hover:text-teal-600 font-medium">
            + {lang === "zh" ? "新增結果指標" : "Add outcome"}
          </button>
        </div>
      )}

      {/* Supporting & Additional-analyses Tab */}
      {tab === "evidence" && (
        <div>
          {/* Supporting RCT (case JSON appraise.supportingRCT) */}
          <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "🔬 直接佐證研究（Supporting RCT）" : "🔬 Supporting RCT"}</h3>
          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
            {[
              { key: "title", label: lang === "zh" ? "標題" : "Title" },
              { key: "purpose", label: lang === "zh" ? "目的" : "Purpose" },
              { key: "population", label: lang === "zh" ? "族群" : "Population" },
              { key: "intervention", label: lang === "zh" ? "介入" : "Intervention" },
              { key: "outcome", label: lang === "zh" ? "結果" : "Outcome" },
              { key: "conclusion", label: lang === "zh" ? "結論" : "Conclusion" },
              { key: "comment", label: lang === "zh" ? "備註" : "Comment" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                <textarea value={data.supportingRCT?.[key] || ""}
                  onChange={(e) => updateAppraise((app) => { if (!app.supportingRCT) app.supportingRCT = {}; app.supportingRCT[key] = e.target.value; })}
                  rows={key === "title" || key === "conclusion" || key === "comment" ? 2 : 1}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs resize-y" />
              </div>
            ))}
          </div>

          {/* Additional analyses (case JSON appraise.additionalAnalysis[]) */}
          <h3 className="font-semibold text-gray-700 mt-8 mb-3">{lang === "zh" ? "🧮 額外分析（NNT 計算、破除迷思等）" : "🧮 Additional Analyses"}</h3>
          {(data.additionalAnalysis || []).map((a, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4 mb-3 space-y-2">
              <div className="flex items-center gap-2">
                <input type="text" value={a.title || ""}
                  onChange={(e) => updateAppraise((app) => { app.additionalAnalysis[idx].title = e.target.value; })}
                  placeholder={lang === "zh" ? "標題，例：計算 1 — NNT" : "Title"}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm font-medium" />
                <button onClick={() => updateAppraise((app) => { app.additionalAnalysis.splice(idx, 1); })}
                  className="px-2 text-gray-300 hover:text-red-400" title="remove">✕</button>
              </div>
              <input type="text" value={a.method || ""}
                onChange={(e) => updateAppraise((app) => { app.additionalAnalysis[idx].method = e.target.value; })}
                placeholder={lang === "zh" ? "方法" : "Method"}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs" />
              <textarea value={a.result || ""}
                onChange={(e) => updateAppraise((app) => { app.additionalAnalysis[idx].result = e.target.value; })}
                placeholder={lang === "zh" ? "結果 / 結論" : "Result"}
                rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs resize-y" />
              <textarea value={a.comment || ""}
                onChange={(e) => updateAppraise((app) => { app.additionalAnalysis[idx].comment = e.target.value; })}
                placeholder={lang === "zh" ? "備註（選填）" : "Comment (optional)"}
                rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs resize-y" />
            </div>
          ))}
          <button onClick={() => updateAppraise((app) => { if (!app.additionalAnalysis) app.additionalAnalysis = []; app.additionalAnalysis.push({ title: "", method: "", result: "", comment: "" }); })}
            className="text-sm text-teal-500 hover:text-teal-600 font-medium">
            + {lang === "zh" ? "新增額外分析" : "Add analysis"}
          </button>
        </div>
      )}

      {/* GRADE Tab */}
      {tab === "grade" && (
        <div>
          {/* Teaching blocks for GRADE */}
          <TeachingBlocksForSection blocks={phase.blocks} section="grade" />

          {/* MID */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 mt-4 mb-4">
            <h4 className="font-semibold text-gray-700 text-sm mb-3">
              {lang === "zh" ? "🎯 MID (最小重要差異值)" : "🎯 MID (Minimal Important Difference)"}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">MID {lang === "zh" ? "數值" : "value"}</label>
                <input type="text" value={data.grade.mid.value || ""}
                  onChange={(e) => updateAppraise((app) => { app.grade.mid.value = e.target.value; })}
                  placeholder={lang === "zh" ? "例：0.25 或 null (RR=1)" : "e.g., 0.25 or null (RR=1)"}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "單位" : "Unit"}</label>
                <input type="text" value={data.grade.mid.unit || ""}
                  onChange={(e) => updateAppraise((app) => { app.grade.mid.unit = e.target.value; })}
                  placeholder={lang === "zh" ? "例：D / RR / 天" : "e.g., D / RR"}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "對應結果指標" : "Outcome"}</label>
                <input type="text" value={data.grade.mid.outcome || ""}
                  onChange={(e) => updateAppraise((app) => { app.grade.mid.outcome = e.target.value; })}
                  placeholder={lang === "zh" ? "例：肺癌死亡率" : "e.g., lung cancer mortality"}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "訂定方法" : "Method"}</label>
                <input type="text" value={data.grade.mid.method || ""}
                  onChange={(e) => updateAppraise((app) => { app.grade.mid.method = e.target.value; })}
                  placeholder={lang === "zh" ? "例：Null 閾值法（二元結果）" : "e.g., Null threshold / literature"}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "MID 訂定 / 推導理由" : "Derivation"}</label>
                <textarea value={data.grade.mid.derivation || ""} onChange={(e) => updateAppraise((app) => { app.grade.mid.derivation = e.target.value; })}
                  placeholder={lang === "zh" ? "說明 MID 如何推導..." : "How the MID was derived..."}
                  rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs resize-y" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "參考文獻" : "Reference"}</label>
                <input type="text" value={data.grade.mid.reference || ""}
                  onChange={(e) => updateAppraise((app) => { app.grade.mid.reference = e.target.value; })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
              </div>
              <label className="col-span-2 flex items-center gap-2 text-xs text-gray-600">
                <input type="checkbox" checked={!!data.grade.mid.isNullThreshold}
                  onChange={(e) => updateAppraise((app) => { app.grade.mid.isNullThreshold = e.target.checked; })} />
                {lang === "zh" ? "使用 Null 閾值（二元結果，MID = RR 1）" : "Use null threshold (binary outcome, MID = RR 1)"}
              </label>
            </div>
          </div>

          {/* PICO comparison (study vs case) — fills the indirectness slides S20/S43 */}
          <h4 className="font-semibold text-gray-600 text-sm mt-5 mb-2">
            {lang === "zh" ? "PICO 比較（文獻 vs 案例）" : "PICO comparison (study vs case)"}
          </h4>
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3 space-y-2">
            <div className="grid grid-cols-[3rem_1fr_1fr] gap-2 items-center">
              <span></span>
              <span className="text-xs text-gray-400">{lang === "zh" ? "文獻" : "Study"}</span>
              <span className="text-xs text-gray-400">{lang === "zh" ? "案例" : "Case"}</span>
              {[
                { k: "age", label: lang === "zh" ? "年齡" : "Age" },
                { k: "eth", label: lang === "zh" ? "種族" : "Ethnicity" },
                { k: "setting", label: lang === "zh" ? "情境" : "Setting" },
                { k: "p", label: "P" },
                { k: "i", label: "I" },
                { k: "c", label: "C" },
                { k: "o", label: "O" },
              ].map(({ k, label }) => (
                <React.Fragment key={k}>
                  <span className="text-xs font-bold text-teal-700">{label}</span>
                  <input type="text" value={pico[k]?.study || ""}
                    onChange={(e) => updatePC(k, "study", e.target.value)}
                    placeholder={lang === "zh" ? "文獻" : "study"}
                    className="px-2 py-1.5 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs" />
                  <input type="text" value={pico[k]?.case_ || ""}
                    onChange={(e) => updatePC(k, "case_", e.target.value)}
                    placeholder={lang === "zh" ? "案例" : "case"}
                    className="px-2 py-1.5 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs" />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* GRADE per-outcome — all five domains per outcome (case JSON shape) */}
          <h4 className="font-semibold text-gray-600 text-sm mt-5 mb-2">
            {lang === "zh" ? "各結果指標的 GRADE 評估（五大面向）" : "Per-outcome GRADE (all five domains)"}
          </h4>
          {data.results.outcomes.length === 0 && (
            <p className="text-xs text-gray-400 mb-3">
              {lang === "zh" ? "請先到「結果摘要」分頁新增結果指標。" : "Add outcomes in the Results Summary tab first."}
            </p>
          )}
          {data.results.outcomes.map((o, idx) => {
            const g = o.grade || newOutcomeGrade();
            const total = outcomeTotal(o);
            const certaintyKeys = [
              { value: "high", zh: "高", en: "High" },
              { value: "moderate", zh: "中", en: "Moderate" },
              { value: "low", zh: "低", en: "Low" },
              { value: "very-low", zh: "很低", en: "Very low" },
            ];
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-teal-700 text-sm">
                    {o.name || (lang === "zh" ? `結果 ${idx + 1}` : `Outcome ${idx + 1}`)}
                  </h5>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-1 rounded-lg">
                    {lang === "zh" ? "降級: " : "Downgrade: "}{total}
                    <span className="text-gray-400 font-normal"> → {certaintyWord(total)}</span>
                  </span>
                </div>

                {outcomeDomains.map(({ key, zh, en }) => (
                  <div key={key} className="mb-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">{lang === "zh" ? zh : en}</span>
                      <div className="flex gap-1">
                        {[0, -1, -2].map((val) => (
                          <button key={val}
                            onClick={() => updateAppraise((app) => { ensureGrade(app.results.outcomes[idx])[key].decision = val; })}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                              (g[key]?.decision || 0) === val
                                ? val === 0 ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"
                                : "bg-gray-50 text-gray-400 border-gray-200"}`}>
                            {val === 0 ? (lang === "zh" ? "不扣分" : "0") : `${val}`}
                          </button>
                        ))}
                      </div>
                    </div>
                    <input type="text" value={g[key]?.note || ""}
                      onChange={(e) => updateAppraise((app) => { ensureGrade(app.results.outcomes[idx])[key].note = e.target.value; })}
                      placeholder={lang === "zh" ? "判斷說明（會寫入 JSON 的 Note）" : "Note (→ case JSON *Note)"}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs" />
                  </div>
                ))}

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">{lang === "zh" ? "證據品質" : "Certainty"}</span>
                  <div className="flex gap-1 flex-wrap">
                    {certaintyKeys.map(({ value, zh, en }) => (
                      <button key={value}
                        onClick={() => updateAppraise((app) => { ensureGrade(app.results.outcomes[idx]).certainty = app.results.outcomes[idx].grade.certainty === value ? "" : value; })}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                          g.certainty === value ? "bg-teal-100 text-teal-700 border-teal-300" : "bg-gray-50 text-gray-400 border-gray-200"}`}>
                        {lang === "zh" ? zh : en}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-300">{lang === "zh" ? `（留空＝自動：${certaintyWord(total)}）` : `(blank = auto: ${certaintyWord(total)})`}</span>
                </div>
              </div>
            );
          })}

          {/* Overall certainty (used as fallback for the recommendation) */}
          <div className="mt-4 p-4 rounded-xl bg-teal-50 border border-teal-200">
            <label className="block text-xs font-medium text-teal-600 mb-1">
              {lang === "zh" ? "整體證據確定性（用於建議的備援值）" : "Overall certainty (recommendation fallback)"}
            </label>
            <select value={data.grade.certaintyLevel} onChange={(e) => updateAppraise((app) => { app.grade.certaintyLevel = e.target.value; })}
              className="w-full px-3 py-2 rounded-lg border border-teal-300 focus:outline-none text-sm font-semibold bg-white">
              <option value="">{lang === "zh" ? "選擇等級" : "Select level"}</option>
              <option value="high">{lang === "zh" ? "高 (High)" : "High"}</option>
              <option value="moderate">{lang === "zh" ? "中 (Moderate)" : "Moderate"}</option>
              <option value="low">{lang === "zh" ? "低 (Low)" : "Low"}</option>
              <option value="very-low">{lang === "zh" ? "很低 (Very Low)" : "Very Low"}</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
