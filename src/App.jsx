import React, { useState, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WorkflowRouter from './pages/workflow/WorkflowRouter';
import CaseLibrary from './pages/reference/CaseLibrary';
import Toolbox from './pages/reference/Toolbox';
import CoreGradeGuide from './pages/reference/CoreGradeGuide';
import CaspChecklist from './pages/reference/CaspChecklist';
import EtdFramework from './pages/reference/EtdFramework';
import MidGuide from './pages/reference/MidGuide';
import PicotWorksheet from './pages/reference/PicotWorksheet';
import About from './pages/About';

export const LangContext = createContext();
export const useLang = () => useContext(LangContext);

export default function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("ebmouse-lang") || "zh"; }
    catch { return "zh"; }
  });

  const toggleLang = () => {
    const next = lang === "zh" ? "en" : "zh";
    setLang(next);
    try { localStorage.setItem("ebmouse-lang", next); } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workflow/:projectId/*" element={<WorkflowRouter />} />
          <Route path="/cases" element={<CaseLibrary />} />
          <Route path="/toolbox" element={<Toolbox />} />
          <Route path="/toolbox/core-grade" element={<CoreGradeGuide />} />
          <Route path="/toolbox/casp-sr" element={<CaspChecklist />} />
          <Route path="/toolbox/etd" element={<EtdFramework />} />
          <Route path="/toolbox/mid" element={<MidGuide />} />
          <Route path="/toolbox/picot" element={<PicotWorksheet />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </LangContext.Provider>
  );
}
