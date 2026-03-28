import React, { useState } from 'react';
import { useProject } from './WorkflowRouter';
import { useLang } from '../../App';
import { t } from '../../i18n';
import HintCard from '../../components/HintCard';
import Hamster from '../../components/Hamster';
import teachingContent from '../../data/teachingContent';
import { TeachingBlocksForSection, PhaseIntro } from '../../components/TeachingBlock';
import ToolboxLinks from '../../components/ToolboxLinks';

const phase = teachingContent.appraise;

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

  const tabs = [
    { id: "casp", label: lang === "zh" ? "CASP 評讀" : "CASP Appraisal" },
    { id: "results", label: lang === "zh" ? "結果摘要" : "Results Summary" },
    { id: "grade", label: lang === "zh" ? "GRADE 評估" : "GRADE Assessment" },
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

      <div className="bg-warm-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
        <span className="text-lg mt-0.5">🐹</span>
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
                {[
                  { key: "sampleSize", label: lang === "zh" ? "樣本數" : "Sample size", type: "number" },
                  { key: "rctCount", label: lang === "zh" ? "RCT 數量" : "RCT count", type: "number" },
                  { key: "effectSize", label: lang === "zh" ? "效應量 (WMD/OR/RR)" : "Effect size (WMD/OR/RR)" },
                  { key: "ci95", label: "95% CI", placeholder: "e.g., [0.23, 0.54]" },
                  { key: "pValue", label: "p-value" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
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
          <button onClick={() => updateAppraise((app) => { app.results.outcomes.push({ name: "", sampleSize: 0, rctCount: 0, effectSize: "", ci95: "", pValue: "", subgroups: [] }); })}
            className="text-sm text-teal-500 hover:text-teal-600 font-medium">
            + {lang === "zh" ? "新增結果指標" : "Add outcome"}
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
                <input type="number" step="0.01" value={data.grade.mid.value || ""}
                  onChange={(e) => updateAppraise((app) => { app.grade.mid.value = parseFloat(e.target.value) || 0; })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "訂定方法" : "Method"}</label>
                <select value={data.grade.mid.method} onChange={(e) => updateAppraise((app) => { app.grade.mid.method = e.target.value; })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm">
                  <option value="">{lang === "zh" ? "選擇方法" : "Select method"}</option>
                  <option value="literature">{lang === "zh" ? "文獻基準" : "Literature benchmark"}</option>
                  <option value="expert">{lang === "zh" ? "專家意見" : "Expert opinion"}</option>
                  <option value="patient">{lang === "zh" ? "病人回饋" : "Patient feedback"}</option>
                  <option value="benchmark">{lang === "zh" ? "指標性研究" : "Benchmark study"}</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">{lang === "zh" ? "MID 訂定理由" : "MID justification"}</label>
                <textarea value={data.grade.mid.justification} onChange={(e) => updateAppraise((app) => { app.grade.mid.justification = e.target.value; })}
                  placeholder={lang === "zh" ? "例：根據 Smith & Walline 2015，近視平均年進展 0.5D，50% 改善 = MID 0.25D" : "e.g., Based on Smith & Walline 2015, average annual progression 0.5D, 50% improvement = MID 0.25D"}
                  rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs resize-y" />
              </div>
            </div>
          </div>

          {/* GRADE domains */}
          {Object.entries(gradeLabels).map(([domain, labels]) => (
            <div key={domain} className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-700 text-sm">{labels[lang]}</h4>
                <div className="flex gap-1">
                  {[0, -1, -2].map((val) => (
                    <button
                      key={val}
                      onClick={() => updateAppraise((app) => { app.grade.domains[domain].decision = val; })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                        data.grade.domains[domain].decision === val
                          ? val === 0
                            ? "bg-green-100 text-green-700 border-green-300"
                            : "bg-red-100 text-red-700 border-red-300"
                          : "bg-gray-50 text-gray-400 border-gray-200"
                      }`}
                    >
                      {val === 0 ? (lang === "zh" ? "不扣分" : "No downgrade") : `${val}`}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={data.grade.domains[domain].rationale}
                onChange={(e) => updateAppraise((app) => { app.grade.domains[domain].rationale = e.target.value; })}
                placeholder={lang === "zh" ? "判斷理由..." : "Rationale..."}
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-xs resize-y"
              />
            </div>
          ))}

          {/* GRADE summary */}
          <div className="mt-4 p-4 rounded-xl bg-teal-50 border border-teal-200">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-teal-700">
                {lang === "zh" ? "總降級分數" : "Total downgrade"}
              </span>
              <span className="font-bold text-lg text-teal-800">
                {Object.values(data.grade.domains).reduce((sum, d) => sum + d.decision, 0)}
              </span>
            </div>
            <div className="mt-2">
              <label className="block text-xs font-medium text-teal-600 mb-1">
                {lang === "zh" ? "證據確定性等級" : "Certainty of Evidence"}
              </label>
              <select value={data.grade.certaintyLevel} onChange={(e) => updateAppraise((app) => { app.grade.certaintyLevel = e.target.value; })}
                className="w-full px-3 py-2 rounded-lg border border-teal-300 focus:outline-none text-sm font-semibold bg-white">
                <option value="">{lang === "zh" ? "選擇等級" : "Select level"}</option>
                <option value="high">{lang === "zh" ? "高 (High)" : "High"}</option>
                <option value="moderate">{lang === "zh" ? "中 (Moderate)" : "Moderate"}</option>
                <option value="low">{lang === "zh" ? "低 (Low)" : "Low"}</option>
                <option value="very_low">{lang === "zh" ? "很低 (Very Low)" : "Very Low"}</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
