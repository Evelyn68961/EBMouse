import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, saveProject } from '../../storage';
import PhaseNav from '../../components/PhaseNav';
import SlidePreview from '../../components/SlidePreview';
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const p = getProject(projectId);
    if (!p) { navigate("/"); return; }
    setProject(p);
  }, [projectId, navigate]);

  const updateProject = useCallback((updater) => {
    setProject((prev) => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      next.meta.updatedAt = new Date().toISOString();
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
  const phaseComponents = { 1: PhaseAssess, 2: PhaseAsk, 3: PhaseAcquire, 4: PhaseAppraise, 5: PhaseApply };
  const PhaseComponent = phaseComponents[phase] || PhaseAssess;

  return (
    <ProjectContext.Provider value={{ project, updateProject, setPhase }}>
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display font-bold text-xl text-gray-800 truncate">{project.meta.title}</h1>
          <div className="flex items-center gap-2 text-xs">
            {saveStatus && <span className="text-teal-500 animate-pulse">{saveStatus}</span>}
            <button onClick={() => navigate("/")} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              {lang === "zh" ? "← 返回首頁" : "← Back"}
            </button>
          </div>
        </div>

        <PhaseNav currentPhase={phase} onPhaseClick={(num) => setPhase(num)} completedPhases={[]} />

        {/* Split layout */}
        <div className="mt-6 flex gap-6 items-start">
          {/* Left: form */}
          <div className="flex-1 min-w-0">
            <PhaseComponent />
            <div className="flex justify-between mt-8 pb-8">
              <button onClick={() => phase > 1 && setPhase(phase - 1)} disabled={phase <= 1}
                className={`px-5 py-2.5 rounded-xl font-medium transition-colors ${phase <= 1 ? "text-gray-300 cursor-not-allowed" : "text-teal-600 hover:bg-teal-50 border border-teal-200"}`}>
                {t("workflowPrev", lang)}
              </button>
              <button onClick={() => phase < 5 && setPhase(phase + 1)} disabled={phase >= 5}
                className={`px-5 py-2.5 rounded-xl font-semibold transition-colors ${phase >= 5 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-200"}`}>
                {phase >= 5 ? (lang === "zh" ? "完成！" : "Done!") : t("workflowNext", lang)}
              </button>
            </div>
          </div>

          {/* Right: slide preview sidebar (desktop) */}
          <div className={`hidden lg:block flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-10'}`}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center gap-1 py-1.5 mb-3 rounded-lg bg-gray-100 hover:bg-teal-50 text-gray-400 hover:text-teal-600 transition-colors text-xs font-medium">
              {sidebarOpen ? (
                <>{lang === "zh" ? "收起簡報" : "Hide slides"}<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              )}
            </button>
            {sidebarOpen && (
              <div className="sticky top-20 max-h-[calc(100vh-120px)] overflow-y-auto pr-1 pb-8">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-500">{lang === "zh" ? "簡報預覽" : "Slide Preview"}</span>
                  <span className="text-xs text-gray-300">— {lang === "zh" ? "即時更新" : "live"}</span>
                </div>
                <SlidePreview project={project} currentPhase={phase} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile: floating preview button */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <MobilePreview project={project} currentPhase={phase} lang={lang} />
        </div>
      </div>
    </ProjectContext.Provider>
  );
}

function MobilePreview({ project, currentPhase, lang }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}
        className="w-12 h-12 bg-teal-500 text-white rounded-full shadow-lg shadow-teal-200 flex items-center justify-center hover:bg-teal-600 transition-colors"
        title={lang === "zh" ? "預覽簡報" : "Preview slides"}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between z-10">
            <span className="font-display font-semibold text-teal-700">{lang === "zh" ? "簡報預覽" : "Slide Preview"}</span>
            <button onClick={() => setOpen(false)} className="px-3 py-1 text-gray-400 hover:text-gray-600 text-sm">
              {lang === "zh" ? "關閉" : "Close"} ✕
            </button>
          </div>
          <div className="px-4 py-4 max-w-sm mx-auto">
            <SlidePreview project={project} currentPhase={currentPhase} />
          </div>
        </div>
      )}
    </>
  );
}
