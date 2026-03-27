const STORAGE_KEY = "ebmouse-projects";

export function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("Failed to save projects:", e);
  }
}

export function saveProject(project) {
  const projects = loadProjects();
  const idx = projects.findIndex((p) => p.meta.id === project.meta.id);
  project.meta.updatedAt = new Date().toISOString();
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.unshift(project);
  }
  // Keep max 10 projects
  if (projects.length > 10) projects.length = 10;
  saveProjects(projects);
}

export function deleteProject(projectId) {
  const projects = loadProjects().filter((p) => p.meta.id !== projectId);
  saveProjects(projects);
}

export function getProject(projectId) {
  return loadProjects().find((p) => p.meta.id === projectId) || null;
}

export function exportProject(project) {
  const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ebmouse-${project.meta.title || "project"}-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importProject(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const project = JSON.parse(e.target.result);
        if (!project?.meta?.id) throw new Error("Invalid project file");
        saveProject(project);
        resolve(project);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
