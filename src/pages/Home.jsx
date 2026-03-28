import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../App';
import { t } from '../i18n';
import Hamster, { HamsterCelebrating } from '../components/Hamster';
import MazeTrail from '../components/MazeTrail';
import { createNewProject } from '../projectSchema';
import { loadProjects, saveProject, deleteProject, exportProject, importProject } from '../storage';

const phaseLabels = ["", "phase1", "phase2", "phase3", "phase4", "phase5"];

export default function Home() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [activeProject, setActiveProject] = useState(null);
  const importRef = useRef();

  useEffect(() => {
    const loaded = loadProjects();
    setProjects(loaded);
    // Auto-select most recent project for maze display
    if (loaded.length > 0) {
      setActiveProject(loaded[0]);
    }
  }, []);

  const handleNew = () => {
    const project = createNewProject(newTitle, lang);
    saveProject(project);
    const loaded = loadProjects();
    setProjects(loaded);
    setShowNewDialog(false);
    setNewTitle("");
    navigate(`/workflow/${project.meta.id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(t("projectDeleteConfirm", lang))) {
      deleteProject(id);
      const loaded = loadProjects();
      setProjects(loaded);
      if (activeProject?.meta?.id === id) {
        setActiveProject(loaded[0] || null);
      }
    }
  };

  const handleExport = (project) => { exportProject(project); };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importProject(file);
      const loaded = loadProjects();
      setProjects(loaded);
      setActiveProject(loaded[0] || null);
    } catch (err) {
      alert(lang === "zh" ? "匯入失敗：檔案格式不正確" : "Import failed: invalid file format");
    }
    e.target.value = "";
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  const handleStopClick = (stopIndex) => {
    if (!activeProject) {
      setShowNewDialog(true);
      return;
    }
    // Navigate to the workflow — phase will be determined by the project state
    navigate(`/workflow/${activeProject.meta.id}`);
  };

  const currentPhase = activeProject?.meta?.currentPhase || 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* ── Maze Trail Hero ── */}
      <div className="text-center mb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-teal-700 mb-1">
          EBM 鼠出任務
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          {lang === "zh"
            ? "跟著小倉鼠闖迷宮，完成五站 EBM 學習任務"
            : "Navigate the maze with your hamster — 5 stops to EBM mastery"}
        </p>
      </div>

      {/* Maze Trail */}
      <div className="mb-2">
        <MazeTrail
          currentPhase={currentPhase}
          onStopClick={handleStopClick}
          lang={lang}
        />
      </div>

      {/* Progress status bar */}
      {activeProject ? (
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">
            {lang === "zh" ? (
              <>
                <span className="font-medium text-teal-600">{activeProject.meta.title}</span>
                {" — "}
                {currentPhase >= 5
                  ? "🎉 全部完成！"
                  : `進度 ${currentPhase - 1}/5 站 · 正在「${t(phaseLabels[currentPhase], lang)}」`}
              </>
            ) : (
              <>
                <span className="font-medium text-teal-600">{activeProject.meta.title}</span>
                {" — "}
                {currentPhase >= 5
                  ? "🎉 All complete!"
                  : `${currentPhase - 1}/5 stops · Currently at "${t(phaseLabels[currentPhase], lang)}"`}
              </>
            )}
          </p>
          <button
            onClick={() => navigate(`/workflow/${activeProject.meta.id}`)}
            className="mt-3 px-6 py-2.5 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors shadow-lg shadow-teal-200"
          >
            {lang === "zh" ? "繼續任務 →" : "Continue mission →"}
          </button>
        </div>
      ) : (
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 mb-3">
            {lang === "zh" ? "還沒有任務呢！開始你的第一個任務吧！" : "No missions yet! Start your first one!"}
          </p>
          <button
            onClick={() => setShowNewDialog(true)}
            className="px-6 py-2.5 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors shadow-lg shadow-teal-200"
          >
            {t("homeNewProject", lang)}
          </button>
        </div>
      )}

      {/* ── Divider ── */}
      <div className="border-t border-gray-100 my-6" />

      {/* ── Project Management Section ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="font-display font-semibold text-lg text-gray-700">
          {t("homeRecentProjects", lang)}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowNewDialog(true)}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors"
          >
            {t("homeNewProject", lang)}
          </button>
          <button
            onClick={() => importRef.current?.click()}
            className="px-4 py-2 text-teal-600 border border-teal-200 rounded-lg text-sm font-medium hover:bg-teal-50 transition-colors"
          >
            {t("homeImportProject", lang)}
          </button>
          <input
            ref={importRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="space-y-3">
          {projects.map((project) => {
            const isActive = activeProject?.meta?.id === project.meta.id;
            return (
              <div
                key={project.meta.id}
                className={`bg-white rounded-xl border p-4 flex items-center gap-4 cursor-pointer transition-all hover:shadow-sm ${
                  isActive
                    ? "border-teal-300 ring-1 ring-teal-100"
                    : "border-gray-100 hover:border-gray-200"
                }`}
                onClick={() => {
                  setActiveProject(project);
                  // Double click or if already active → navigate
                  if (isActive) navigate(`/workflow/${project.meta.id}`);
                }}
              >
                <Hamster
                  mood={project.meta.currentPhase >= 5 ? "celebrating" : "neutral"}
                  size={40}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {project.meta.title}
                    </h3>
                    {isActive && (
                      <span className="flex-shrink-0 text-xs px-2 py-0.5 bg-teal-50 text-teal-600 rounded-full font-medium">
                        {lang === "zh" ? "顯示中" : "Active"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {t("projectPhase", lang)}: {t(phaseLabels[project.meta.currentPhase] || "phase1", lang)}
                    <span className="mx-2">·</span>
                    {formatDate(project.meta.updatedAt)}
                  </p>
                </div>
                {/* Phase dots */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className={`w-2 h-2 rounded-full ${
                        n <= project.meta.currentPhase
                          ? "bg-teal-400" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                {/* Actions */}
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleExport(project)}
                    className="p-2 text-gray-300 hover:text-teal-500 rounded-lg hover:bg-teal-50 transition-colors"
                    title={t("projectExport", lang)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(project.meta.id)}
                    className="p-2 text-gray-300 hover:text-red-400 rounded-lg hover:bg-red-50 transition-colors"
                    title={t("projectDelete", lang)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Hamster mood="thinking" size={56} className="mx-auto mb-3" />
          <p className="text-gray-400">{t("homeNoProjects", lang)}</p>
        </div>
      )}

      {/* Quick links to reference content */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { to: "/cases", icon: "📚", title: lang === "zh" ? "案例庫" : "Case Library", desc: lang === "zh" ? "參考歷屆競賽案例" : "Browse past competition cases" },
          { to: "/toolbox", icon: "🧰", title: lang === "zh" ? "工具箱" : "Toolbox", desc: lang === "zh" ? "模板、清單、指南" : "Templates, checklists, guides" },
          { to: "/about", icon: "ℹ️", title: lang === "zh" ? "關於" : "About", desc: lang === "zh" ? "專案介紹與團隊" : "About this project" },
        ].map(({ to, icon, title, desc }) => (
          <a
            key={to}
            href={to}
            className="block p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-center"
          >
            <div className="text-2xl mb-2">{icon}</div>
            <h3 className="font-semibold text-gray-700 text-sm">{title}</h3>
            <p className="text-xs text-gray-400 mt-1">{desc}</p>
          </a>
        ))}
      </div>

      {/* New project dialog */}
      {showNewDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setShowNewDialog(false)}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <HamsterCelebrating size={40} />
              <h2 className="font-display font-bold text-xl text-teal-700">
                {t("homeNewProject", lang)}
              </h2>
            </div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={lang === "zh" ? "幫你的任務取個名字..." : "Name your mission..."}
              className="w-full px-4 py-3 rounded-xl border-2 border-teal-100 focus:border-teal-400 focus:outline-none text-lg mb-4"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleNew()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleNew}
                className="flex-1 py-2.5 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors"
              >
                {lang === "zh" ? "出發！" : "Let's go!"}
              </button>
              <button
                onClick={() => setShowNewDialog(false)}
                className="px-4 py-2.5 text-gray-400 hover:text-gray-600"
              >
                {lang === "zh" ? "取消" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
