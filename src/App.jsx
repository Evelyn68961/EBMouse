import React, { useState, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WorkflowRouter from './pages/workflow/WorkflowRouter';
import CaseLibrary from './pages/reference/CaseLibrary';
import CaseAtropine2024 from './pages/reference/CaseAtropine2024';
import CaseCPM2025 from './pages/reference/CaseCPM2025';
import CaseIVIron2025 from './pages/reference/CaseIVIron2025';
import Toolbox from './pages/reference/Toolbox';
import CoreGradeGuide from './pages/reference/CoreGradeGuide';
import CaspChecklist from './pages/reference/CaspChecklist';
import EtdFramework from './pages/reference/EtdFramework';
import MidGuide from './pages/reference/MidGuide';
import PicotWorksheet from './pages/reference/PicotWorksheet';
import PubmedSearchGuide from './pages/reference/PubmedSearchGuide';
import SraGuide from './pages/reference/SraGuide';
import LitSuggestGuide from './pages/reference/LitSuggestGuide';
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
    try { localStorage.setItem("ebmouse-lang", next); } catch {};
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workflow/:projectId/*" element={<WorkflowRouter />} />
          <Route path="/cases" element={<CaseLibrary />} />
          <Route path="/cases/atropine-2024" element={<CaseAtropine2024 />} />
          <Route path="/cases/cpm-2025" element={<CaseCPM2025 />} />
          <Route path="/cases/iv-iron-2025" element={<CaseIVIron2025 />} />
          <Route path="/toolbox" element={<Toolbox />} />
          <Route path="/toolbox/core-grade" element={<CoreGradeGuide />} />
          <Route path="/toolbox/casp-sr" element={<CaspChecklist />} />
          <Route path="/toolbox/etd" element={<EtdFramework />} />
          <Route path="/toolbox/mid" element={<MidGuide />} />
          <Route path="/toolbox/picot" element={<PicotWorksheet />} />
          <Route path="/toolbox/pubmed-search" element={<PubmedSearchGuide />} />
          <Route path="/toolbox/sra" element={<SraGuide />} />
          <Route path="/toolbox/litsuggest" element={<LitSuggestGuide />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </LangContext.Provider>
  );
}
