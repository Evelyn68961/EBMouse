import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { getProject, saveProject } from '../../storage';
import PhaseNav from '../../components/PhaseNav';
import PhaseAssess from './PhaseAssess';
import PhaseAsk from './PhaseAsk';
import PhaseAcquire from './PhaseAcquire';
import PhaseAppraise from './PhaseAppraise';
import PhaseApply from './PhaseApply';
import { useLang } from '../../App';
import { t } from '../../i18n';
import Hamster from '../../components/Hamster';

const ProjectContext = createContext();
export const useProject = () => useContext(ProjectContext);

export default function WorkflowRouter() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { lang } = useLang();
  const [project, setProject] = useState(null);
  const [saveStatus, setSaveStatus] = useState("");

  // Load project
  useEffect(() => {
    const p = getProject(projectId);
    if (!p) {
      navigate("/");
      return;
    }
    setProject(p);
  }, [projectId, navigate]);

  // Auto-save with debounce
  const updateProject = useCallback((updater) => {
    setProject((prev) => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      next.meta.updatedAt = new Date().toISOString();
      // Debounced save
      clearTimeout(window._ebmouseSaveTimer);
      window._ebmouseSaveTimer = setTimeout(() => {
        saveProject(next);
        setSaveStatus(t("workflowSaved", lang));
        setTimeout(() => setSaveStatus(""), 2000);
      }, 1000);
      return next;
    });
  }, [lang]);

  const setPhase = (phase) => {
    updateProject((prev) => ({ ...prev, meta: { ...prev.meta, currentPhase: phase } }));
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Hamster mood="loading" size={64} />
      </div>
    );
  }

  const phase = project.meta.currentPhase;

  const phaseComponents = {
    1: PhaseAssess,
    2: PhaseAsk,
    3: PhaseAcquire,
    4: PhaseAppraise,
    5: PhaseApply,
  };

  const PhaseComponent = phaseComponents[phase] || PhaseAssess;

  return (
    <ProjectContext.Provider value={{ project, updateProject, setPhase }}>
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Project header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display font-bold text-xl text-gray-800 truncate">
            {project.meta.title}
          </h1>
          <div className="flex items-center gap-2 text-xs">
            {saveStatus && (
              <span className="text-teal-500 animate-pulse">{saveStatus}</span>
            )}
            <button
              onClick={() => navigate("/")}
              className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {lang === "zh" ? "← 返回首頁" : "← Back"}
            </button>
          </div>
        </div>

        {/* Phase navigation */}
        <PhaseNav
          currentPhase={phase}
          onPhaseClick={(num) => setPhase(num)}
          completedPhases={[]}
        />

        {/* Phase content */}
        <div className="mt-6">
          <PhaseComponent />
        </div>

        {/* Phase navigation buttons */}
        <div className="flex justify-between mt-8 pb-8">
          <button
            onClick={() => phase > 1 && setPhase(phase - 1)}
            disabled={phase <= 1}
            className={`px-5 py-2.5 rounded-xl font-medium transition-colors ${
              phase <= 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-teal-600 hover:bg-teal-50 border border-teal-200"
            }`}
          >
            {t("workflowPrev", lang)}
          </button>

          <button
            onClick={() => phase < 5 && setPhase(phase + 1)}
            disabled={phase >= 5}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-colors ${
              phase >= 5
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-200"
            }`}
          >
            {phase >= 5 ? (lang === "zh" ? "完成！" : "Done!") : t("workflowNext", lang)}
          </button>
        </div>
      </div>
    </ProjectContext.Provider>
  );
}
