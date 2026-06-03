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
        <textarea
          value={data.applicability.rationale}
          onChange={(e) => updateApply((app) => { app.applicability.rationale = e.target.value; })}
          placeholder={lang === "zh" ? "描述文獻與案例的相似程度，以及是否適用..." : "Describe similarity between evidence and case, and applicability..."}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-300 focus:outline-none resize-y text-sm"
        />
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

      {/* Recommendation */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">{lang === "zh" ? "💊 推薦強度" : "💊 Recommendation Strength"}</h3>
        <div className="flex gap-3">
          {[
            { value: "strong", label: lang === "zh" ? "強烈推薦" : "Strong recommendation", color: "border-green-300 bg-green-50 text-green-700" },
            { value: "conditional", label: lang === "zh" ? "部分推薦" : "Conditional recommendation", color: "border-yellow-300 bg-yellow-50 text-yellow-700" },
          ].map(({ value, label, color }) => (
            <button
              key={value}
              onClick={() => updateApply((app) => { app.recommendationStrength = value; })}
              className={`flex-1 py-3 rounded-xl font-medium border-2 transition-all ${
                data.recommendationStrength === value ? `${color} scale-[1.02]` : "border-gray-200 text-gray-400 bg-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
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
