import React from 'react';
import { useProject } from './WorkflowRouter';
import { useLang } from '../../App';
import { t } from '../../i18n';
import HintCard from '../../components/HintCard';
import FitHint from '../../components/FitHint';
import Hamster from '../../components/Hamster';
import teachingContent from '../../data/teachingContent';
import { TeachingBlocksForSection, PhaseIntro } from '../../components/TeachingBlock';
import ToolboxLinks from '../../components/ToolboxLinks';

const phase = teachingContent.apply;

// Coerce string (old data) or array -> array of items (>=1 for an empty input).
const toArr = (v) => (Array.isArray(v) ? (v.length ? v : [""]) : (typeof v === "string" && v.trim() ? v.split("\n") : [""]));

// Editable list of bullet items (matches the slide's bullet points).
function ListField({ items, onChange, placeholder, addLabel }) {
  return (
    <div className="space-y-1">
      {items.map((it, i) => (
        <div key={i} className="flex gap-1">
          <input
            value={it}
            onChange={(e) => { const a = items.slice(); a[i] = e.target.value; onChange(a); }}
            placeholder={placeholder}
            className="flex-1 px-2 py-1 rounded border border-gray-200 focus:border-teal-300 focus:outline-none text-xs"
          />
          <button onClick={() => { const a = items.slice(); a.splice(i, 1); onChange(a.length ? a : [""]); }}
            className="px-1 text-gray-300 hover:text-red-400 text-xs" title="remove">✕</button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ""])} className="text-xs text-teal-500 hover:text-teal-600">+ {addLabel}</button>
    </div>
  );
}

const etdFactors = [
  { key: "benefitRisk", zh: "利益風險", en: "Benefit vs. Risk" },
  { key: "evidenceQuality", zh: "證據品質", en: "Evidence Quality" },
  { key: "valuesPreferences", zh: "價值偏好", en: "Values & Preferences" },
  { key: "costEffectiveness", zh: "成本效益", en: "Cost-Effectiveness" },
  { key: "feasibility", zh: "可行性", en: "Feasibility" },
  { key: "acceptability", zh: "接受度", en: "Acceptability" },
];

const directionLabels = {
  "-2": { zh: "強烈反對", en: "Strongly against" },
  "-1": { zh: "反對", en: "Against" },
  "0": { zh: "中立", en: "Neutral" },
  "1": { zh: "贊成", en: "For" },
  "2": { zh: "強烈贊成", en: "Strongly for" },
};

export default function PhaseApply() {
  const { project, updateProject } = useProject();
  const { lang } = useLang();
  const data = project.apply;

  const updateApply = (updater) => {
    updateProject((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      updater(next.apply);
      return next;
    });
  };

  const updateMeta = (updater) => {
    updateProject((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.meta.recommendation) next.meta.recommendation = { strength: "", direction: "", label: "", certaintyLevel: "" };
      updater(next.meta);
      return next;
    });
  };

  const applicRows = data.applicability?.rows || [];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Hamster mood="celebrating" size={40} />
        <div>
          <h2 className="font-display font-bold text-2xl text-teal-700">{t("phase5", lang)}</h2>
          <p className="text-sm text-gray-400">{t("phase5Sub", lang)}</p>
        </div>
      </div>

      {/* Phase intro */}
      <PhaseIntro intro={phase.intro} />
      <ToolboxLinks phase={5} />

      <div className="bg-warm-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
        <Hamster mood="neutral" size={24} />
        <p className="text-sm text-amber-800">{t("hamsterPhase5Start", lang)}</p>
      </div>

      {/* Applicability */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "🎯 案例適用性 (CASP Q9)" : "🎯 Case Applicability (CASP Q9)"}</h3>
        <TeachingBlocksForSection blocks={phase.blocks} section="applicability" />

        {/* Applicability comparison table (case JSON apply.applicability.rows) */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
          <div className="grid grid-cols-[1fr_1fr_1fr_5rem_1.5rem] gap-2 items-center text-xs text-gray-400 mb-1">
            <span>{lang === "zh" ? "項目" : "Item"}</span>
            <span>{lang === "zh" ? "文獻" : "Study"}</span>
            <span>{lang === "zh" ? "案例" : "Case"}</span>
            <span>{lang === "zh" ? "相似度" : "Similarity"}</span>
            <span></span>
          </div>
          {applicRows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_5rem_1.5rem] gap-2 items-center mb-1.5">
              {["item", "study", "case_"].map((f) => (
                <input key={f} type="text" value={r[f] || ""}
                  onChange={(e) => updateApply((app) => { app.applicability.rows[i][f] = e.target.value; })}
                  className="px-2 py-1.5 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs" />
              ))}
              <select value={r.similarity || ""}
                onChange={(e) => updateApply((app) => { app.applicability.rows[i].similarity = e.target.value; })}
                className="px-1 py-1.5 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs">
                <option value="">—</option>
                <option value="match">match</option>
                <option value="partial">partial</option>
                <option value="mismatch">mismatch</option>
              </select>
              <button onClick={() => updateApply((app) => { app.applicability.rows.splice(i, 1); })}
                className="text-gray-300 hover:text-red-400" title="remove">✕</button>
            </div>
          ))}
          <button onClick={() => updateApply((app) => { if (!app.applicability.rows) app.applicability.rows = []; app.applicability.rows.push({ item: "", study: "", case_: "", similarity: "" }); })}
            className="text-xs text-teal-500 hover:text-teal-600 font-medium mt-1">
            + {lang === "zh" ? "新增比較列" : "Add row"}
          </button>
        </div>

        <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "適用性結論" : "Applicability conclusion"}</label>
        <textarea
          value={data.applicability.conclusion || data.applicability.rationale || ""}
          onChange={(e) => updateApply((app) => { app.applicability.conclusion = e.target.value; })}
          placeholder={lang === "zh" ? "描述文獻與案例的相似程度，以及是否適用..." : "Describe similarity between evidence and case, and applicability..."}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-300 focus:outline-none resize-y text-sm"
        />
      </section>

      {/* Efficacy summary (case JSON apply.efficacySummary) */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "📈 效益摘要" : "📈 Efficacy Summary"}</h3>
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          {[
            { key: "effect", label: lang === "zh" ? "效益" : "Effect", rows: 2 },
            { key: "midComparison", label: lang === "zh" ? "與 MID 比較" : "vs MID", rows: 2 },
            { key: "certainty", label: lang === "zh" ? "確定性" : "Certainty", rows: 1 },
            { key: "nnt", label: "NNT", rows: 1 },
          ].map(({ key, label, rows }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
              <textarea value={data.efficacySummary?.[key] || ""}
                onChange={(e) => updateApply((app) => { if (!app.efficacySummary) app.efficacySummary = {}; app.efficacySummary[key] = e.target.value; })}
                rows={rows} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs resize-y" />
            </div>
          ))}
        </div>
      </section>

      {/* Benefit-Risk */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "⚖️ 利益風險比較" : "⚖️ Benefit-Risk Comparison"}</h3>
        <TeachingBlocksForSection blocks={phase.blocks} section="benefitRisk" />
        {data.benefitRisk.options.map((opt, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
            <input type="text" value={opt.name} onChange={(e) => updateApply((app) => { app.benefitRisk.options[idx].name = e.target.value; })}
              placeholder={lang === "zh" ? "治療選項名稱" : "Treatment option name"}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm font-medium mb-2" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-green-600 mb-1">{lang === "zh" ? "利益（每項一條，對應投影片項目符號）" : "Benefits (one per line = one bullet)"}</label>
                <ListField items={toArr(opt.benefits)} placeholder={lang === "zh" ? "一項利益" : "a benefit"} addLabel={lang === "zh" ? "新增利益" : "add benefit"}
                  onChange={(arr) => updateApply((app) => { app.benefitRisk.options[idx].benefits = arr; })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-red-500 mb-1">{lang === "zh" ? "風險（每項一條）" : "Risks (one per line)"}</label>
                <ListField items={toArr(opt.risks)} placeholder={lang === "zh" ? "一項風險" : "a risk"} addLabel={lang === "zh" ? "新增風險" : "add risk"}
                  onChange={(arr) => updateApply((app) => { app.benefitRisk.options[idx].risks = arr; })} />
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => updateApply((app) => { app.benefitRisk.options.push({ name: "", benefits: [""], risks: [""] }); })}
          className="text-sm text-teal-500 hover:text-teal-600 font-medium">
          + {lang === "zh" ? "新增治療選項" : "Add treatment option"}
        </button>
      </section>

      {/* Cost Analysis */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "💰 成本分析" : "💰 Cost Analysis"}</h3>
        <TeachingBlocksForSection blocks={phase.blocks} section="costAnalysis" />
        {data.costAnalysis.options.map((opt, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
            <input type="text" value={opt.name} onChange={(e) => updateApply((app) => { app.costAnalysis.options[idx].name = e.target.value; })}
              placeholder={lang === "zh" ? "治療選項" : "Treatment option"}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm font-medium mb-2" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "直接成本（每項一條）" : "Direct cost (one per line)"}</label>
                <ListField items={toArr(opt.directCost)} placeholder={lang === "zh" ? "一項直接成本" : "a direct cost"} addLabel={lang === "zh" ? "新增" : "add"}
                  onChange={(arr) => updateApply((app) => { app.costAnalysis.options[idx].directCost = arr; })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "間接成本（每項一條）" : "Indirect cost (one per line)"}</label>
                <ListField items={toArr(opt.indirectCost)} placeholder={lang === "zh" ? "一項間接成本" : "an indirect cost"} addLabel={lang === "zh" ? "新增" : "add"}
                  onChange={(arr) => updateApply((app) => { app.costAnalysis.options[idx].indirectCost = arr; })} />
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "總額" : "Total"}</label>
              <input type="text" value={opt.totalCost} onChange={(e) => updateApply((app) => { app.costAnalysis.options[idx].totalCost = e.target.value; })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
            </div>
          </div>
        ))}
        <button onClick={() => updateApply((app) => { app.costAnalysis.options.push({ name: "", directCost: [""], indirectCost: [""], totalCost: "" }); })}
          className="text-sm text-teal-500 hover:text-teal-600 font-medium">
          + {lang === "zh" ? "新增選項" : "Add option"}
        </button>
      </section>

      {/* Evidence to Decision */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "📋 證據到建議 (EtD)" : "📋 Evidence to Decision (EtD)"}</h3>
        <TeachingBlocksForSection blocks={phase.blocks} section="evidenceToDecision" />

        <div className="mt-3">
          <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "EtD 參考架構" : "EtD reference"}</label>
          <input type="text" value={data.evidenceToDecision.reference || ""}
            onChange={(e) => updateApply((app) => { app.evidenceToDecision.reference = e.target.value; })}
            placeholder="e.g., BMJ 2025;389:e083867"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
        </div>

        <div className="space-y-3 mt-4">
          {etdFactors.map(({ key, zh, en }) => (
            <div key={key} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700 text-sm">{lang === "zh" ? zh : en}</span>
              </div>
              <textarea
                value={data.evidenceToDecision[key].assessment}
                onChange={(e) => updateApply((app) => { app.evidenceToDecision[key].assessment = e.target.value; })}
                placeholder={lang === "zh" ? "評估內容..." : "Assessment..."}
                rows={1}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs resize-y mb-2"
              />
              <div className="flex gap-1">
                {[-2, -1, 0, 1, 2].map((val) => (
                  <button
                    key={val}
                    onClick={() => updateApply((app) => { app.evidenceToDecision[key].direction = val; })}
                    className={`flex-1 py-1.5 rounded text-xs font-medium transition-all border ${
                      data.evidenceToDecision[key].direction === val
                        ? val < 0
                          ? "bg-red-100 text-red-700 border-red-300"
                          : val > 0
                          ? "bg-green-100 text-green-700 border-green-300"
                          : "bg-gray-200 text-gray-600 border-gray-300"
                        : "bg-gray-50 text-gray-400 border-gray-200"
                    }`}
                  >
                    {directionLabels[String(val)][lang]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendation (case JSON meta.recommendation + EtD label/reason) */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "💊 最終建議" : "💊 Recommendation"}</h3>

        <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "推薦強度" : "Strength"}</label>
        <div className="flex gap-3 mb-4">
          {[
            { value: "strong", label: lang === "zh" ? "強烈推薦" : "Strong", color: "border-green-300 bg-green-50 text-green-700" },
            { value: "conditional", label: lang === "zh" ? "部分推薦" : "Conditional", color: "border-yellow-300 bg-yellow-50 text-yellow-700" },
          ].map(({ value, label, color }) => (
            <button
              key={value}
              onClick={() => { updateApply((app) => { app.recommendationStrength = value; }); updateMeta((m) => { m.recommendation.strength = value; }); }}
              className={`flex-1 py-3 rounded-xl font-medium border-2 transition-all ${
                data.recommendationStrength === value ? `${color} scale-[1.02]` : "border-gray-200 text-gray-400 bg-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "方向" : "Direction"}</label>
        <div className="flex gap-3 mb-4">
          {[
            { value: "for", label: lang === "zh" ? "支持 (for)" : "For" },
            { value: "against", label: lang === "zh" ? "反對 (against)" : "Against" },
          ].map(({ value, label }) => (
            <button key={value}
              onClick={() => updateMeta((m) => { m.recommendation.direction = m.recommendation.direction === value ? "" : value; })}
              className={`flex-1 py-2.5 rounded-xl font-medium border-2 transition-all ${
                project.meta?.recommendation?.direction === value ? "border-teal-300 bg-teal-50 text-teal-700" : "border-gray-200 text-gray-400 bg-white"}`}>
              {label}
            </button>
          ))}
        </div>

        <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "建議標籤（一句話）" : "Recommendation label"}</label>
        <textarea
          value={project.meta?.recommendation?.label || ""}
          onChange={(e) => { updateMeta((m) => { m.recommendation.label = e.target.value; }); updateApply((app) => { app.evidenceToDecision.recommendationLabel = e.target.value; }); }}
          placeholder={lang === "zh" ? "例：不建議常規自費 LDCT（共享決策）..." : "e.g., one-line recommendation"}
          rows={2}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-300 focus:outline-none resize-y text-sm mb-4"
        />

        <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "建議確定性" : "Certainty"}</label>
        <select value={project.meta?.recommendation?.certaintyLevel || ""}
          onChange={(e) => updateMeta((m) => { m.recommendation.certaintyLevel = e.target.value; })}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm mb-4">
          <option value="">{lang === "zh" ? "選擇等級" : "Select level"}</option>
          <option value="high">{lang === "zh" ? "高 (High)" : "High"}</option>
          <option value="moderate">{lang === "zh" ? "中 (Moderate)" : "Moderate"}</option>
          <option value="low">{lang === "zh" ? "低 (Low)" : "Low"}</option>
          <option value="very-low">{lang === "zh" ? "很低 (Very Low)" : "Very Low"}</option>
        </select>

        <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "為何為部分推薦 / 補充理由" : "Reason for conditional"}</label>
        <textarea
          value={data.evidenceToDecision.reasonForConditional || ""}
          onChange={(e) => updateApply((app) => { app.evidenceToDecision.reasonForConditional = e.target.value; })}
          rows={2}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-300 focus:outline-none resize-y text-sm"
        />
      </section>

      {/* Patient summary */}
      <section className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "🗣️ 去學術化回應（給病人/家屬）" : "🗣️ Patient-Facing Summary"}</h3>
        <TeachingBlocksForSection blocks={phase.blocks} section="patientSummary" />
        <textarea
          value={data.patientSummary}
          onChange={(e) => updateApply((app) => { app.patientSummary = e.target.value; })}
          placeholder={lang === "zh" ? "媽媽和小朋友您好，經過我們的研究後..." : "Dear patient, based on our review of the evidence..."}
          rows={5}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-300 focus:outline-none resize-y text-sm"
        />
        <FitHint value={data.patientSummary} max={160} />
      </section>
    </div>
  );
}
