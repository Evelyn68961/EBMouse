import React, { useState } from 'react';
import { HamsterThinking } from './Hamster';
import { useLang } from '../App';
import { t } from '../i18n';

export default function HintCard({ children, title }) {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  return (
    <div className="my-3 rounded-xl border border-teal-100 bg-teal-50/40 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-teal-700 hover:bg-teal-50/60 transition-colors"
      >
        <HamsterThinking size={24} />
        <span>{title || t("hintToggle", lang)}</span>
        <svg
          className={`ml-auto w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`hint-content ${open ? "open" : ""}`}>
        <div className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
