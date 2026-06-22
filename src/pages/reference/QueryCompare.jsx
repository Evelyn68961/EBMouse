// src/pages/reference/QueryCompare.jsx
// Team query-compare board — import multiple exported project JSON case-files and
// lay their search strategies side by side. No backend: everything is read
// in-memory from the files the user picks (nothing is saved to localStorage).
import React, { useState } from 'react';
import { useLang } from '../../App';
import { HamsterThinking } from '../../components/Hamster';

// Pull the search-relevant bits out of a project JSON (tolerant of older files
// that predate searchQueries).
function extractSearch(project) {
  const acq = project?.acquire || {};
  const kw = acq.keywords || {};
  const join = (v) => (Array.isArray(v) ? v.filter((s) => String(s).trim()).join(', ') : (v || ''));
  return {
    title: project?.meta?.title || project?.meta?.id || '—',
    members: Array.isArray(project?.meta?.members) ? project.meta.members.join(', ') : (project?.meta?.members || ''),
    databases: (acq.databases || []).filter((d) => d && (d.name || d.rationale)),
    booleanStrategy: kw.booleanStrategy || '',
    searchQueries: (acq.searchQueries || []).filter((q) => q && (q.database || q.queryString)),
    counts: acq.screeningFlow?.initialResults || {},
  };
}

export default function QueryCompare() {
  const { lang } = useLang();
  const [cols, setCols] = useState([]); // [{ name, data }]
  const [error, setError] = useState('');

  const addFiles = (fileList) => {
    setError('');
    const files = Array.from(fileList || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const project = JSON.parse(e.target.result);
          if (!project?.meta) throw new Error('not an EBMouse project file');
          setCols((prev) => [...prev, { name: file.name, data: extractSearch(project) }]);
        } catch (err) {
          setError((lang === 'zh' ? '無法讀取 ' : 'Could not read ') + file.name + ': ' + err.message);
        }
      };
      reader.onerror = () => setError((lang === 'zh' ? '讀取失敗：' : 'Read failed: ') + file.name);
      reader.readAsText(file);
    });
  };

  const removeCol = (i) => setCols((prev) => prev.filter((_, idx) => idx !== i));

  const rows = [
    { key: 'members', zh: '成員', en: 'Members' },
    { key: 'databases', zh: '資料庫', en: 'Databases' },
    { key: 'booleanStrategy', zh: '主搜尋式 (Boolean)', en: 'Master strategy' },
    { key: 'searchQueries', zh: '各資料庫搜尋式', en: 'Per-database queries' },
    { key: 'counts', zh: '初步結果數', en: 'Initial counts' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <HamsterThinking size={48} />
        <div>
          <h1 className="font-bold text-3xl" style={{ color: '#0E7C86' }}>
            {lang === 'zh' ? '搜尋式比較板' : 'Query Compare Board'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {lang === 'zh'
              ? '匯入多個成員匯出的專案 JSON，並排比較各自的搜尋策略'
              : 'Import several members’ exported project JSON files and compare their search strategies side by side'}
          </p>
        </div>
      </div>

      <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-4 mb-5 text-sm text-teal-800 leading-relaxed">
        {lang === 'zh'
          ? '💡 每位成員在首頁用「匯出 JSON」存下自己的專案檔，再到這裡一次選取多個檔案。所有資料僅在瀏覽器中讀取，不會被儲存或上傳。'
          : '💡 Each member exports their project as JSON from the Home page, then you select all those files here. Everything is read in-browser only — nothing is saved or uploaded.'}
      </div>

      <div className="flex items-center gap-3 mb-5">
        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 text-white text-sm font-medium cursor-pointer hover:bg-teal-600 transition-colors">
          + {lang === 'zh' ? '加入 JSON 檔案' : 'Add JSON files'}
          <input type="file" accept="application/json,.json" multiple className="hidden"
            onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
        </label>
        {cols.length > 0 && (
          <button onClick={() => setCols([])} className="text-sm text-gray-400 hover:text-red-400 font-medium">
            {lang === 'zh' ? '清除全部' : 'Clear all'}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      {cols.length === 0 ? (
        <div className="text-center text-gray-300 py-16 border-2 border-dashed border-gray-200 rounded-xl text-sm">
          {lang === 'zh' ? '尚未匯入任何專案檔' : 'No project files imported yet'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="border-collapse text-sm" style={{ minWidth: 320 + cols.length * 240 }}>
            <thead>
              <tr>
                <th className="sticky left-0 bg-white z-10 text-left px-3 py-2 border border-gray-200 w-40 text-gray-500 font-semibold align-bottom" />
                {cols.map((c, i) => (
                  <th key={i} className="text-left px-3 py-2 border border-gray-200 align-top" style={{ background: '#E8F6F7', minWidth: 220 }}>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-teal-800 break-words">{c.data.title}</span>
                      <button onClick={() => removeCol(i)} className="text-gray-300 hover:text-red-400 flex-shrink-0">✕</button>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5 break-all">{c.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ key, zh, en }) => (
                <tr key={key}>
                  <td className="sticky left-0 bg-white z-10 px-3 py-2 border border-gray-200 font-medium text-gray-600 align-top">{lang === 'zh' ? zh : en}</td>
                  {cols.map((c, i) => (
                    <td key={i} className="px-3 py-2 border border-gray-200 align-top text-gray-700">
                      <CellValue field={key} data={c.data} lang={lang} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CellValue({ field, data, lang }) {
  const empty = <span className="text-gray-300">—</span>;
  if (field === 'members') return data.members ? <span>{data.members}</span> : empty;
  if (field === 'databases')
    return data.databases.length
      ? <ul className="space-y-0.5">{data.databases.map((d, i) => <li key={i}>{d.name}{d.rationale ? <span className="text-gray-400 text-xs"> — {d.rationale}</span> : null}</li>)}</ul>
      : empty;
  if (field === 'booleanStrategy')
    return data.booleanStrategy ? <pre className="whitespace-pre-wrap break-words font-mono text-xs">{data.booleanStrategy}</pre> : empty;
  if (field === 'searchQueries')
    return data.searchQueries.length
      ? <div className="space-y-2">{data.searchQueries.map((q, i) => (
          <div key={i}>
            <div className="text-xs font-semibold text-teal-700">{q.database || '—'}{q.date ? <span className="text-gray-400 font-normal"> · {q.date}</span> : null}</div>
            <pre className="whitespace-pre-wrap break-words font-mono text-xs text-gray-600">{q.queryString || '—'}</pre>
          </div>
        ))}</div>
      : empty;
  if (field === 'counts') {
    const c = data.counts;
    const parts = ['pubmed', 'embase', 'cochrane'].filter((k) => c[k]).map((k) => `${k}: ${c[k]}`);
    return parts.length ? <span className="text-xs">{parts.join(' · ')}</span> : empty;
  }
  return empty;
}
