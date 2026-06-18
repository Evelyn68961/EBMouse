import React from 'react';
import { useProject } from './WorkflowRouter';
import { useLang } from '../../App';
import { t } from '../../i18n';
import HintCard from '../../components/HintCard';
import FitHint from '../../components/FitHint';
import Hamster from '../../components/Hamster';
import teachingContent from '../../data/teachingContent';
import { TeachingBlocksForSection, PhaseIntro } from '../../components/TeachingBlock';

const phase = teachingContent.assess;

export default function PhaseAssess() {
  const { project, updateProject } = useProject();
  const { lang } = useLang();
  const data = project.assess;

  const update = (path, value) => {
    updateProject((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = next.assess;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const members = project.meta?.members || [];
  const updateMembers = (fn) => updateProject((prev) => {
    const next = JSON.parse(JSON.stringify(prev));
    if (!next.meta.members) next.meta.members = [];
    fn(next.meta.members);
    return next;
  });
  const updateMeta = (field, value) => updateProject((prev) => {
    const next = JSON.parse(JSON.stringify(prev));
    next.meta[field] = value;
    return next;
  });
  const questions = data.clinicalQuestions || [];
  const updateQuestions = (fn) => updateProject((prev) => {
    const next = JSON.parse(JSON.stringify(prev));
    if (!Array.isArray(next.assess.clinicalQuestions)) next.assess.clinicalQuestions = [];
    fn(next.assess.clinicalQuestions);
    return next;
  });
  const arms = data.treatmentArms || [];
  const updateArm = (i, field, value) => updateProject((prev) => {
    const next = JSON.parse(JSON.stringify(prev));
    if (!next.assess.treatmentArms) next.assess.treatmentArms = [];
    while (next.assess.treatmentArms.length <= i) next.assess.treatmentArms.push({ name: "", course: "", issue: "" });
    next.assess.treatmentArms[i][field] = value;
    return next;
  });

  return (
    <div>
      {/* Phase header */}
      <div className="flex items-center gap-3 mb-6">
        <Hamster mood="neutral" size={40} />
        <div>
          <h2 className="font-display font-bold text-2xl text-teal-700">
            {t("phase1", lang)}
          </h2>
          <p className="text-sm text-gray-400">{t("phase1Sub", lang)}</p>
        </div>
      </div>

      {/* Phase intro */}
      <PhaseIntro intro={phase.intro} />

      {/* Hamster message */}
      <div className="bg-warm-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
        <Hamster mood="thinking" size={24} />
        <p className="text-sm text-amber-800">{t("hamsterPhase1Start", lang)}</p>
      </div>

      {/* Section 0: Team members (title slide) */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">
          {lang === "zh" ? "👥 團隊成員（封面）" : "👥 Team Members (title slide)"}
        </h3>
        {members.map((m, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={m}
              onChange={(e) => updateMembers((arr) => { arr[i] = e.target.value; })}
              placeholder={lang === "zh" ? "例：王小明 藥師" : "e.g., Name, role"}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm"
            />
            <button onClick={() => updateMembers((arr) => { arr.splice(i, 1); })}
              className="px-2 text-gray-400 hover:text-red-500" title="remove">✕</button>
          </div>
        ))}
        <button onClick={() => updateMembers((arr) => { arr.push(""); })}
          className="text-sm text-teal-500 hover:text-teal-600 font-medium">
          + {lang === "zh" ? "新增成員" : "Add member"}
        </button>

        {/* Team identity → case JSON meta */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {[
            { key: "institution", label: lang === "zh" ? "機構" : "Institution", placeholder: lang === "zh" ? "例：輔仁大學附設醫院藥劑部" : "Institution" },
            { key: "division", label: lang === "zh" ? "分工 / 組別" : "Division", placeholder: lang === "zh" ? "例：①文獻指導 ②GRADE ③臨床應用" : "Division" },
            { key: "competition", label: lang === "zh" ? "競賽" : "Competition", placeholder: lang === "zh" ? "例：2026 NCMEA 實證臨床組" : "Competition" },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
              <input
                type="text"
                value={project.meta?.[key] || ""}
                onChange={(e) => updateMeta(key, e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Section 1: Clinical Scenario */}
      <section className="mb-8">
        <label className="block font-semibold text-gray-700 mb-2">
          {t("assessScenario", lang)}
        </label>
        {/* Teaching blocks for scenario */}
        <TeachingBlocksForSection blocks={phase.blocks} section="scenario" />
        <textarea
          value={data.scenario}
          onChange={(e) => update("scenario", e.target.value)}
          placeholder={lang === "zh" ? "貼上或輸入競賽提供的臨床情境..." : "Paste or type the clinical scenario..."}
          rows={5}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-300 focus:outline-none resize-y text-sm leading-relaxed"
        />
        <FitHint value={data.scenario} max={75} />
      </section>

      {/* Section 2: Patient Profile */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">
          {lang === "zh" ? "👤 病人基本資料" : "👤 Patient Profile"}
        </h3>
        {/* Teaching blocks for patient profile */}
        <TeachingBlocksForSection blocks={phase.blocks} section="patientProfile" />
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "age", label: t("assessPatientAge", lang), placeholder: lang === "zh" ? "例：12歲" : "e.g., 12 years old" },
            { key: "sex", label: t("assessPatientSex", lang), placeholder: lang === "zh" ? "例：女" : "e.g., Female" },
            { key: "condition", label: t("assessPatientCondition", lang), placeholder: lang === "zh" ? "例：軸性近視" : "e.g., Axial myopia" },
            { key: "setting", label: t("assessPatientSetting", lang), placeholder: lang === "zh" ? "例：門診" : "e.g., Outpatient" },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
              <input
                type="text"
                value={data.patientProfile[key]}
                onChange={(e) => update(`patientProfile.${key}`, e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Patient Preferences */}
      <section className="mb-8">
        <label className="block font-semibold text-gray-700 mb-2">
          {t("assessPreferences", lang)}
        </label>
        {/* Teaching blocks for patient preferences */}
        <TeachingBlocksForSection blocks={phase.blocks} section="patientPreferences" />
        <textarea
          value={data.patientPreferences}
          onChange={(e) => update("patientPreferences", e.target.value)}
          placeholder={lang === "zh" ? "記錄病人/家屬的偏好和顧慮..." : "Document patient/family preferences and concerns..."}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-300 focus:outline-none resize-y text-sm"
        />
      </section>

      {/* Section 3b: Clinical questions (case JSON assess.clinicalQuestions) */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">
          {lang === "zh" ? "❓ 病人的臨床問題" : "❓ Clinical Questions"}
        </h3>
        {questions.map((q, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={q}
              onChange={(e) => updateQuestions((arr) => { arr[i] = e.target.value; })}
              placeholder={lang === "zh" ? "例：該不該做 LDCT 篩檢？" : "e.g., a question the patient is asking"}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm"
            />
            <button onClick={() => updateQuestions((arr) => { arr.splice(i, 1); })}
              className="px-2 text-gray-400 hover:text-red-500" title="remove">✕</button>
          </div>
        ))}
        <button onClick={() => updateQuestions((arr) => { arr.push(""); })}
          className="text-sm text-teal-500 hover:text-teal-600 font-medium">
          + {lang === "zh" ? "新增臨床問題" : "Add question"}
        </button>
      </section>

      {/* Section 4: Background Knowledge */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">
          {lang === "zh" ? "📖 背景知識" : "📖 Background Knowledge"}
        </h3>
        {/* Teaching blocks for background knowledge */}
        <TeachingBlocksForSection blocks={phase.blocks} section="backgroundKnowledge" />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {lang === "zh" ? "主題（背景搜尋對象）" : "Topic (subject of background search)"}
          </label>
          <input
            type="text"
            value={data.topic || ""}
            onChange={(e) => update("topic", e.target.value)}
            placeholder={lang === "zh" ? "例：物理約束 / 連續被動性運動" : "e.g., the subject of the search"}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm"
          />
        </div>

        {[
          { key: "diseaseOverview", label: t("assessDisease", lang), placeholder: lang === "zh" ? "疾病定義、病生理機轉..." : "Disease definition, pathophysiology...", rows: 3 },
          { key: "riskFactors", label: t("assessRisk", lang), placeholder: lang === "zh" ? "好發族群、危險因子..." : "At-risk populations, risk factors...", rows: 2 },
          { key: "treatmentOptions", label: t("assessTreatment", lang), placeholder: lang === "zh" ? "目前可用的治療方式..." : "Currently available treatment options...", rows: 3 },
        ].map(({ key, label, placeholder, rows }) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
            <textarea
              value={data.backgroundKnowledge[key]}
              onChange={(e) => update(`backgroundKnowledge.${key}`, e.target.value)}
              placeholder={placeholder}
              rows={rows}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-300 focus:outline-none resize-y text-sm"
            />
          </div>
        ))}
      </section>

      {/* Section 4b: Two treatment approaches (background comparison, slide 6) */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">
          {lang === "zh" ? "⚖️ 兩種處置比較（背景）" : "⚖️ Two treatment approaches"}
        </h3>
        {[0, 1].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
            <input
              type="text"
              value={arms[i]?.name || ""}
              onChange={(e) => updateArm(i, "name", e.target.value)}
              placeholder={lang === "zh" ? `處置 ${i + 1} 名稱` : `Approach ${i + 1} name`}
              className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm font-medium"
            />
            <input
              type="text"
              value={arms[i]?.course || ""}
              onChange={(e) => updateArm(i, "course", e.target.value)}
              placeholder={lang === "zh" ? "療程（會自動加上「療程: 」）" : "Course"}
              className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm"
            />
            <input
              type="text"
              value={arms[i]?.issue || ""}
              onChange={(e) => updateArm(i, "issue", e.target.value)}
              placeholder={lang === "zh" ? "議題（會自動加上「議題: 」）" : "Issue"}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm"
            />
          </div>
        ))}
      </section>

      {/* Section 5: Sources */}
      <section className="mb-4">
        <label className="block font-semibold text-gray-700 mb-2">
          {t("assessSources", lang)}
        </label>
        <HintCard title={t("assessSourcesHint", lang)}>
          {lang === "zh" ? (
            <p>記錄你查閱了哪些來源。這在簡報中會呈現為「背景知識搜尋」的投影片，展示你有系統地蒐集背景資訊。</p>
          ) : (
            <p>Record which sources you consulted. This appears in your presentation as the "Background Knowledge Search" slide, showing systematic background information gathering.</p>
          )}
        </HintCard>
        <textarea
          value={data.sources}
          onChange={(e) => update("sources", e.target.value)}
          placeholder={lang === "zh" ? "例：UpToDate - Myopia in children, DynaMed - Atropine..." : "e.g., UpToDate - Myopia in children, DynaMed - Atropine..."}
          rows={2}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-300 focus:outline-none resize-y text-sm"
        />
      </section>
    </div>
  );
}
