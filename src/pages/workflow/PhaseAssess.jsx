import React from 'react';
import { useProject } from './WorkflowRouter';
import { useLang } from '../../App';
import { t } from '../../i18n';
import HintCard from '../../components/HintCard';
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
      <div className="bg-warm-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
        <span className="text-lg mt-0.5">🐹</span>
        <p className="text-sm text-amber-800">{t("hamsterPhase1Start", lang)}</p>
      </div>

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

      {/* Section 4: Background Knowledge */}
      <section className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">
          {lang === "zh" ? "📖 背景知識" : "📖 Background Knowledge"}
        </h3>
        {/* Teaching blocks for background knowledge */}
        <TeachingBlocksForSection blocks={phase.blocks} section="backgroundKnowledge" />

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
