import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../App';
import { t } from '../i18n';
import Hamster, { HamsterCelebrating } from '../components/Hamster';
import { createNewProject } from '../projectSchema';
import { loadProjects, saveProject, deleteProject, exportProject, importProject } from '../storage';

const phaseLabels = ["", "phase1", "phase2", "phase3", "phase4", "phase5"];

export default function Home() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const importRef = useRef();

  useEffect(() => { setProjects(loadProjects()); }, []);

  const handleNew = () => {
    const project = createNewProject(newTitle, lang);
    saveProject(project);
    setProjects(loadProjects());
    setShowNewDialog(false);
    setNewTitle("");
    navigate(`/workflow/${project.meta.id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(t("projectDeleteConfirm", lang))) {
      deleteProject(id);
      setProjects(loadProjects());
    }
  };

  const handleExport = (project) => { exportProject(project); };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importProject(file);
      setProjects(loadProjects());
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <Hamster mood="neutral" size={80} />
        </div>
        <h1 className="font-display text-4xl font-bold text-teal-700 mb-2">
          {t("homeWelcome", lang)}
        </h1>
        <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
          {t("homeDesc", lang)}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setShowNewDialog(true)}
          className="px-6 py-3 bg-teal-500 text-white rounded-xl font-display font-semibold text-lg hover:bg-teal-600 transition-colors shadow-lg shadow-teal-200 card-hover"
        >
          {t("homeNewProject", lang)}
        </button>
        <button
          onClick={() => importRef.current?.click()}
          className="px-5 py-3 bg-white text-teal-600 border-2 border-teal-200 rounded-xl font-medium hover:bg-teal-50 transition-colors"
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

      {/* Project list */}
      {projects.length > 0 ? (
        <div>
          <h2 className="font-display font-semibold text-xl text-gray-700 mb-4">
            {t("homeRecentProjects", lang)}
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.meta.id}
                className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 card-hover cursor-pointer"
                onClick={() => navigate(`/workflow/${project.meta.id}`)}
              >
                <Hamster
                  mood={project.meta.currentPhase >= 5 ? "celebrating" : "neutral"}
                  size={40}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {project.meta.title}
                  </h3>
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
                        n <= project.meta.currentPhase ? "bg-teal-400" : "bg-gray-200"
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
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Hamster mood="thinking" size={64} className="mx-auto mb-4" />
          <p className="text-gray-400 text-lg">{t("homeNoProjects", lang)}</p>
        </div>
      )}

      {/* Quick links to reference content */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { to: "/cases", icon: "📚", title: lang === "zh" ? "案例庫" : "Case Library", desc: lang === "zh" ? "參考歷屆競賽案例" : "Browse past competition cases" },
          { to: "/toolbox", icon: "🧰", title: lang === "zh" ? "工具箱" : "Toolbox", desc: lang === "zh" ? "模板、清單、指南" : "Templates, checklists, guides" },
          { to: "/about", icon: "ℹ️", title: lang === "zh" ? "關於" : "About", desc: lang === "zh" ? "專案介紹與團隊" : "About this project" },
        ].map(({ to, icon, title, desc }) => (
          <a
            key={to}
            href={to}
            className="block p-4 bg-white rounded-xl border border-gray-100 card-hover text-center"
          >
            <div className="text-2xl mb-2">{icon}</div>
            <h3 className="font-semibold text-gray-700 text-sm">{title}</h3>
            <p className="text-xs text-gray-400 mt-1">{desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
