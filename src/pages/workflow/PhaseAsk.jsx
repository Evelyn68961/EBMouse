import React from 'react';
import { useProject } from './WorkflowRouter';
import { useLang } from '../../App';
import { t } from '../../i18n';
import Hamster from '../../components/Hamster';
import teachingContent from '../../data/teachingContent';
import { TeachingBlocksForSection, PhaseIntro } from '../../components/TeachingBlock';
import ToolboxLinks from '../../components/ToolboxLinks';

const phase = teachingContent.ask;

export default function PhaseAsk() {
  const { project, updateProject } = useProject();
  const { lang } = useLang();
  const data = project.ask;

  const updateAsk = (updater) => {
    updateProject((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      updater(next.ask);
      return next;
    });
  };

  const updatePicot = (idx, field, value) => {
    updateAsk((ask) => { ask.picots[idx][field] = value; });
  };

  const addPicot = () => {
    updateAsk((ask) => {
      ask.picots.push({
        id: ask.picots.length + 1,
        p: "", i: "", c: "", o: "", t: "",
        questionType: "treatment",
        isPrimary: false,
        justification: "",
      });
    });
  };

  const removePicot = (idx) => {
    if (data.picots.length <= 1) return;
    updateAsk((ask) => {
      ask.picots.splice(idx, 1);
      if (!ask.picots.some((p) => p.isPrimary)) ask.picots[0].isPrimary = true;
    });
  };

  const setPrimary = (idx) => {
    updateAsk((ask) => {
      ask.picots.forEach((p, i) => { p.isPrimary = i === idx; });
    });
  };

  const questionTypes = [
    { value: "treatment", label: t("askTypeTreatment", lang) },
    { value: "diagnosis", label: t("askTypeDiagnosis", lang) },
    { value: "prognosis", label: t("askTypePrognosis", lang) },
    { value: "harm", label: t("askTypeHarm", lang) },
  ];

  const picotFields = [
    { key: "p", label: t("askP", lang), placeholder: lang === "zh" ? "例：患有軸性近視且不想戴眼鏡的小六女生" : "e.g., 12-year-old girl with axial myopia" },
    { key: "i", label: t("askI", lang), placeholder: lang === "zh" ? "例：每晚點 atropine 眼藥水" : "e.g., nightly atropine eye drops" },
    { key: "c", label: t("askC", lang), placeholder: lang === "zh" ? "例：不點眼藥水" : "e.g., no eye drops" },
    { key: "o", label: t("askO", lang), placeholder: lang === "zh" ? "例：球面等效屈光度 (SE)、眼軸長度 (AL)" : "e.g., spherical equivalent (SE), axial length (AL)" },
    { key: "t", label: t("askT", lang), placeholder: lang === "zh" ? "例：12 個月" : "e.g., 12 months" },
  ];

  return (
    <div>
      {/* Phase header */}
      <div className="flex items-center gap-3 mb-6">
        <Hamster mood="thinking" size={40} />
        <div>
          <h2 className="font-display font-bold text-2xl text-teal-700">
            {t("phase2", lang)}
          </h2>
          <p className="text-sm text-gray-400">{t("phase2Sub", lang)}</p>
        </div>
      </div>

      {/* Phase intro */}
      <PhaseIntro intro={phase.intro} />
      <ToolboxLinks phase={2} />

      <div className="bg-warm-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
        <span className="text-lg mt-0.5">🐹</span>
        <p className="text-sm text-amber-800">{t("hamsterPhase2Start", lang)}</p>
      </div>

      {/* Teaching blocks for PICOT */}
      <TeachingBlocksForSection blocks={phase.blocks} section="picot" />

      {/* PICOT cards */}
      {data.picots.map((picot, idx) => (
        <div
          key={picot.id}
          className={`mt-6 rounded-2xl border-2 p-5 transition-colors ${
            picot.isPrimary ? "border-teal-300 bg-teal-50/30" : "border-gray-100 bg-white"
          }`}
        >
          {/* Card header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="bg-teal-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                PICOT-{idx + 1}
              </span>
              {picot.isPrimary && (
                <span className="text-xs font-medium text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">
                  ⭐ {lang === "zh" ? "主要" : "Primary"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!picot.isPrimary && (
                <button
                  onClick={() => setPrimary(idx)}
                  className="text-xs text-gray-400 hover:text-teal-500 px-2 py-1 rounded hover:bg-teal-50 transition-colors"
                >
                  {t("askPrimary", lang)}
                </button>
              )}
              {data.picots.length > 1 && (
                <button
                  onClick={() => removePicot(idx)}
                  className="text-xs text-gray-300 hover:text-red-400 p-1 rounded hover:bg-red-50 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Question type selector */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              {t("askType", lang)}
            </label>
            <div className="flex flex-wrap gap-2">
              {questionTypes.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => updatePicot(idx, "questionType", value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                    picot.questionType === value
                      ? "bg-teal-500 text-white border-teal-500"
                      : "bg-white text-gray-500 border-gray-200 hover:border-teal-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* PICOT fields */}
          <div className="space-y-3">
            {picotFields.map(({ key, label, placeholder }) => (
              <div key={key} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center font-bold text-sm mt-1">
                  {key.toUpperCase()}
                </span>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                  <input
                    type="text"
                    value={picot[key]}
                    onChange={(e) => updatePicot(idx, key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Justification for primary */}
          {picot.isPrimary && (
            <div className="mt-4 pt-4 border-t border-teal-100">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {t("askJustification", lang)}
              </label>
              <textarea
                value={picot.justification}
                onChange={(e) => updatePicot(idx, "justification", e.target.value)}
                placeholder={lang === "zh" ? "為什麼選擇這個 PICOT？（例如：病人和家屬偏好使用眼藥水）" : "Why this PICOT? (e.g., patient and family prefer eye drops)"}
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-300 focus:outline-none text-sm resize-y"
              />
            </div>
          )}
        </div>
      ))}

      {/* Add PICOT button */}
      <button
        onClick={addPicot}
        className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-teal-300 hover:text-teal-500 hover:bg-teal-50/30 transition-colors text-sm font-medium"
      >
        {t("askAddPicot", lang)}
      </button>

      {/* Overall selection rationale */}
      {data.picots.length > 1 && (
        <section className="mt-6">
          <label className="block font-semibold text-gray-700 mb-2">
            {lang === "zh" ? "📝 選擇主要 PICOT 的總體理由" : "📝 Overall Rationale for Primary PICOT Selection"}
          </label>
          <textarea
            value={data.picotSelectionRationale}
            onChange={(e) => updateAsk((ask) => { ask.picotSelectionRationale = e.target.value; })}
            placeholder={lang === "zh" ? "綜合考量病人偏好、臨床可行性、證據可得性..." : "Considering patient preferences, clinical feasibility, evidence availability..."}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-teal-300 focus:outline-none resize-y text-sm"
          />
        </section>
      )}
    </div>
  );
}
