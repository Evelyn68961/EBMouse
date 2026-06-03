// Browser-side .pptx export: fetch the tokenized template, swap in the
// project's content, and download an editable PowerPoint file.
import JSZip from 'jszip';
import { fillProject } from './fillProject';

const PPTX_MIME =
  'application/vnd.openxmlformats-officedocument.presentationml.presentation';

export async function generatePptxBlob(project) {
  const url = (import.meta.env?.BASE_URL || '/') + 'template.pptx';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`template.pptx not found (HTTP ${res.status})`);
  const zip = await JSZip.loadAsync(await res.arrayBuffer());
  await fillProject(zip, project);
  return zip.generateAsync({ type: 'blob', mimeType: PPTX_MIME });
}

function safeName(s) {
  return (s || 'EBM').replace(/[\\/:*?"<>|]+/g, '_').slice(0, 80);
}

export async function downloadPptx(project) {
  const blob = await generatePptxBlob(project);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${safeName(project?.meta?.title)}.pptx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
