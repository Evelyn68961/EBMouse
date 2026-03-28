// src/components/TeachingBlock.jsx
import React, { useState } from 'react';
import { useLang } from '../App';

const typeConfig = {
  concept: {
    icon: "📖",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50/40",
    headerColor: "text-blue-700",
    headerBg: "bg-blue-50",
    label: { zh: "核心概念", en: "Core Concept" },
  },
  steps: {
    icon: "🪜",
    borderColor: "border-teal-200",
    bgColor: "bg-teal-50/40",
    headerColor: "text-teal-700",
    headerBg: "bg-teal-50",
    label: { zh: "操作步驟", en: "Step-by-Step" },
  },
  example: {
    icon: "💡",
    borderColor: "border-amber-200",
    bgColor: "bg-amber-50/40",
    headerColor: "text-amber-700",
    headerBg: "bg-amber-50",
    label: { zh: "範例說明", en: "Example" },
  },
  pitfall: {
    icon: "⚠️",
    borderColor: "border-red-200",
    bgColor: "bg-red-50/40",
    headerColor: "text-red-700",
    headerBg: "bg-red-50",
    label: { zh: "常見錯誤", en: "Common Pitfalls" },
  },
  checklist: {
    icon: "✅",
    borderColor: "border-green-200",
    bgColor: "bg-green-50/40",
    headerColor: "text-green-700",
    headerBg: "bg-green-50",
    label: { zh: "檢核清單", en: "Checklist" },
  },
  reference: {
    icon: "📚",
    borderColor: "border-purple-200",
    bgColor: "bg-purple-50/40",
    headerColor: "text-purple-700",
    headerBg: "bg-purple-50",
    label: { zh: "參考資料", en: "Reference" },
  },
};

// Simple markdown-like renderer for bold, tables, and code blocks
function renderContent(text) {
  if (!text) return null;

  const lines = text.split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Table detection
    if (line.trim().startsWith("|") && i + 1 < lines.length && lines[i + 1]?.trim().startsWith("|")) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(renderTable(tableLines, elements.length));
      continue;
    }

    // Code block
    if (line.trim().startsWith("```")) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre key={elements.length} className="bg-gray-100 rounded-lg px-3 py-2 text-xs font-mono overflow-x-auto my-2 text-gray-700">
          {codeLines.join("\n")}
        </pre>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      elements.push(<div key={elements.length} className="h-2" />);
      i++;
      continue;
    }

    // Regular line with inline formatting
    elements.push(
      <p key={elements.length} className="text-sm text-gray-600 leading-loose">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderInline(text) {
  // Handle **bold**, `code`, and → arrows
  const parts = [];
  const regex = /(\*\*(.+?)\*\*|`(.+?)`)/g;
  let lastIdx = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={match.index} className="font-semibold text-gray-800">{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<code key={match.index} className="bg-gray-100 px-1 rounded text-xs font-mono text-gray-700">{match[3]}</code>);
    }
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }

  return parts.length > 0 ? parts : text;
}

function renderTable(tableLines, keyBase) {
  const rows = tableLines
    .filter((line) => !line.trim().match(/^\|[\s\-:|]+\|$/)) // skip separator
    .map((line) =>
      line
        .split("|")
        .filter((_, i, arr) => i > 0 && i < arr.length - 1)
        .map((cell) => cell.trim())
    );

  if (rows.length === 0) return null;
  const header = rows[0];
  const body = rows.slice(1);

  return (
    <div key={keyBase} className="overflow-x-auto my-3">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {header.map((h, i) => (
              <th key={i} className="text-left px-2 py-1.5 bg-gray-100 font-semibold text-gray-700 border border-gray-200 text-sm">
                {renderInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-2 py-1.5 border border-gray-200 text-gray-600 text-sm">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TeachingBlock({ block }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const config = typeConfig[block.type] || typeConfig.concept;

  const title = block.title?.[lang] || block.title?.zh || "";
  const content = block.content?.[lang] || block.content?.zh || "";

  return (
    <div className={`my-4 rounded-xl border ${config.borderColor} ${config.bgColor} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-2 px-4 py-3 text-left transition-colors hover:opacity-90`}
      >
        <span className="text-lg flex-shrink-0">{config.icon}</span>
        <div className="flex-1 min-w-0">
          <span className={`text-sm font-semibold ${config.headerColor}`}>{title}</span>
          <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${config.headerBg} ${config.headerColor} font-medium`}>
            {config.label[lang]}
          </span>
        </div>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform ${config.headerColor} ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`teaching-content ${open ? "open" : ""}`}>
        <div className="px-4 pb-4 space-y-1.5">
          {renderContent(content)}
        </div>
      </div>
    </div>
  );
}

// Renders all teaching blocks for a given section
export function TeachingBlocksForSection({ blocks, section }) {
  if (!blocks || blocks.length === 0) return null;
  const filtered = blocks.filter((b) => b.section === section);
  if (filtered.length === 0) return null;

  return (
    <>
      {filtered.map((block) => (
        <TeachingBlock key={block.id} block={block} />
      ))}
    </>
  );
}

// Phase intro banner
export function PhaseIntro({ intro }) {
  const { lang } = useLang();
  if (!intro) return null;
  const text = intro[lang] || intro.zh || "";

  return (
    <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl px-4 py-3 mb-6">
      <p className="text-sm text-teal-800 leading-relaxed">{text}</p>
    </div>
  );
}
