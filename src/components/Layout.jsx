import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../App';
import { t } from '../i18n';
import { HamsterNeutral } from './Hamster';

export default function Layout({ children }) {
  const { lang, toggleLang } = useLang();
  const location = useLocation();

  const navItems = [
    { to: "/", label: t("navHome", lang), match: "/" },
    { to: "/cases", label: t("navCases", lang), match: "/cases" },
    { to: "/toolbox", label: t("navToolbox", lang), match: "/toolbox" },
    { to: "/about", label: t("navAbout", lang), match: "/about" },
  ];

  const isWorkflow = location.pathname.startsWith("/workflow");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-teal-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <HamsterNeutral size={32} className="group-hover:scale-110 transition-transform" />
            <div className="leading-tight">
              <span className="font-display font-bold text-teal-600 text-lg">EBMouse</span>
              <span className="hidden sm:inline text-xs text-gray-400 ml-1.5">
                {t("appSubtitle", lang)}
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navItems.map(({ to, label, match }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === match
                    ? "bg-teal-50 text-teal-700"
                    : "text-gray-500 hover:text-teal-600 hover:bg-teal-50/50"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="ml-2 px-2.5 py-1 rounded-full text-xs font-bold border-2 border-teal-200 text-teal-600 hover:bg-teal-50 transition-colors"
              title={lang === "zh" ? "Switch to English" : "切換為中文"}
            >
              {lang === "zh" ? "EN" : "中"}
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer — only on non-workflow pages */}
      {!isWorkflow && (
        <footer className="border-t border-gray-100 bg-gray-50/50 py-6 text-center text-xs text-gray-400">
          <p>
            EBMouse — {t("appTagline", lang)}
          </p>
          <p className="mt-1">
            {lang === "zh" ? "輔仁大學附設醫院藥劑部" : "Fu Jen Catholic University Hospital — Department of Pharmacy"}
          </p>
        </footer>
      )}
    </div>
  );
}
