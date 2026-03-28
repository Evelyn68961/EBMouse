// src/pages/reference/CaseDetail.jsx
// Shared renderer for fully annotated competition case walkthroughs.
// Receives a case data object and renders a long-scroll 5A walkthrough.

import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../../App';
import Hamster, { HamsterThinking, HamsterCelebrating, HamsterConcerned } from '../../components/Hamster';

// ─── Color constants ───
const C = {
  teal: '#0E7C86',
  tealDark: '#0A5C63',
  tealLight: '#E8F6F7',
  tealMid: '#B5DFE3',
  green: '#27AE60',
  red: '#E74C3C',
  amber: '#F39C12',
  orange: '#E67E22',
  blue: '#2980B9',
  purple: '#8E44AD',
};

const phaseConfig = [
  { id: 'assess', num: 1, icon: '🔍', zh: '評估案例', en: 'Assess', color: C.teal },
  { id: 'ask', num: 2, icon: '❓', zh: '形成問題', en: 'Ask', color: C.blue },
  { id: 'acquire', num: 3, icon: '📚', zh: '文獻檢索', en: 'Acquire', color: C.amber },
  { id: 'appraise', num: 4, icon: '⚖️', zh: '文獻評讀', en: 'Appraise', color: C.purple },
  { id: 'apply', num: 5, icon: '💊', zh: '臨床應用', en: 'Apply', color: C.green },
];

// ─── Helpers ───
function L({ data, lang }) {
  if (!data) return null;
  return typeof data === 'string' ? data : (data[lang] || data.zh || '');
}

function Annotation({ items, lang }) {
  if (!items) return null;
  const list = lang === 'zh' ? items.zh : items.en;
  if (!list || list.length === 0) return null;
  return (
    <div className="mt-6 rounded-xl border-l-4 bg-teal-50/40 p-4" style={{ borderColor: C.teal }}>
      <div className="flex items-center gap-2 mb-2">
        <HamsterThinking size={24} />
        <span className="text-sm font-semibold text-teal-700">{lang === 'zh' ? '💡 案例解析' : '💡 Case Commentary'}</span>
      </div>
      <ul className="space-y-2">
        {list.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-teal-800 leading-relaxed">
            <span className="text-teal-400 mt-0.5 flex-shrink-0">→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionHeading({ children, icon }) {
  return (
    <h3 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
      {icon && <span>{icon}</span>}
      {children}
    </h3>
  );
}

function DataTable({ headers, rows, headerBg = C.tealLight, headerColor = C.tealDark }) {
  return (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: headerBg }}>
            {headers.map((h, i) => (
              <th key={i} className="text-left px-3 py-2 font-semibold border border-gray-200" style={{ color: headerColor }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 border border-gray-200 text-gray-700">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InfoCard({ label, children, color = C.teal }) {
  return (
    <div className="rounded-lg p-3 mb-2" style={{ background: color + '08', border: `1px solid ${color}20` }}>
      {label && <p className="text-xs font-bold mb-1" style={{ color }}>{label}</p>}
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

function ScoreBadge({ score }) {
  const map = {
    yes: { emoji: '😀', bg: '#D5F5E3', color: '#27AE60', label: 'Yes' },
    no: { emoji: '😟', bg: '#FADBD8', color: '#E74C3C', label: 'No' },
    uncertain: { emoji: '😐', bg: '#FEF9E7', color: '#F39C12', label: '?' },
  };
  const c = map[score];
  if (!c) return <span className="text-gray-300">·</span>;
  return (
    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: c.bg, color: c.color }}>
      {c.emoji}
    </span>
  );
}

function GradeBadge({ decision }) {
  if (decision === 0) return <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: '#D5F5E3', color: C.green }}>不扣分 / 0</span>;
  return <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: '#FADBD8', color: C.red }}>{decision}</span>;
}

function CertaintyBadge({ level, lang }) {
  const map = {
    high: { zh: '高 High', en: 'High', color: C.green, stars: 4 },
    moderate: { zh: '中 Moderate', en: 'Moderate', color: C.amber, stars: 3 },
    low: { zh: '低 Low', en: 'Low', color: C.orange, stars: 2 },
    very_low: { zh: '很低 Very Low', en: 'Very Low', color: C.red, stars: 1 },
  };
  const c = map[level];
  if (!c) return null;
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-bold" style={{ background: c.color }}>
      {'★'.repeat(c.stars)}{'☆'.repeat(4 - c.stars)} {lang === 'zh' ? c.zh : c.en}
    </span>
  );
}

// ─── Number line SVG (reused from CoreGradeGuide) ───
function NumberLine({ pointEst, ciLow, ciHigh, mid, lang }) {
  const min = Math.min(ciLow, 0) - 0.1;
  const max = Math.max(ciHigh, mid * 1.5) + 0.1;
  const range = max - min;
  const toX = (v) => ((v - min) / range) * 100;
  const nullX = toX(0);
  const midX = toX(mid);
  const peX = toX(pointEst);
  const ciLX = toX(ciLow);
  const ciHX = toX(ciHigh);
  const crossesMid = ciLow < mid && ciHigh > mid;

  return (
    <div className="my-3">
      <svg viewBox="0 0 400 80" className="w-full" style={{ maxWidth: 500 }}>
        <line x1="20" y1="45" x2="380" y2="45" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1={20 + nullX * 3.6} y1="25" x2={20 + nullX * 3.6} y2="65" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,3" />
        <text x={20 + nullX * 3.6} y="75" textAnchor="middle" fontSize="9" fill="#94A3B8">null (0)</text>
        <line x1={20 + midX * 3.6} y1="25" x2={20 + midX * 3.6} y2="65" stroke={C.amber} strokeWidth="1.5" strokeDasharray="4,3" />
        <text x={20 + midX * 3.6} y="75" textAnchor="middle" fontSize="9" fill={C.amber} fontWeight="600">MID ({mid})</text>
        <line x1={20 + ciLX * 3.6} y1="45" x2={20 + ciHX * 3.6} y2="45" stroke={crossesMid ? C.red : C.green} strokeWidth="4" strokeLinecap="round" />
        <line x1={20 + ciLX * 3.6} y1="38" x2={20 + ciLX * 3.6} y2="52" stroke={crossesMid ? C.red : C.green} strokeWidth="2" />
        <line x1={20 + ciHX * 3.6} y1="38" x2={20 + ciHX * 3.6} y2="52" stroke={crossesMid ? C.red : C.green} strokeWidth="2" />
        <circle cx={20 + peX * 3.6} cy="45" r="5" fill={C.teal} />
        <text x={20 + peX * 3.6} y="20" textAnchor="middle" fontSize="9" fill={C.teal} fontWeight="700">{pointEst}</text>
        <text x={20 + ciLX * 3.6} y="20" textAnchor="middle" fontSize="8" fill="#6B7280">{ciLow}</text>
        <text x={20 + ciHX * 3.6} y="20" textAnchor="middle" fontSize="8" fill="#6B7280">{ciHigh}</text>
      </svg>
      <p className="text-xs text-center mt-1" style={{ color: crossesMid ? C.red : C.green }}>
        {crossesMid
          ? (lang === 'zh' ? '⚠️ CI 跨越 MID → 扣分' : '⚠️ CI crosses MID → downgrade')
          : (lang === 'zh' ? '✅ CI 未跨越 MID → 不扣分' : '✅ CI does not cross MID → no downgrade')}
      </p>
    </div>
  );
}

// ─── EtD direction bar ───
function EtdBar({ direction }) {
  return (
    <div className="flex gap-0.5">
      {[-2, -1, 0, 1, 2].map(v => (
        <div key={v} style={{
          flex: 1, height: 8, borderRadius: 2,
          background: direction === v
            ? v < 0 ? C.red : v > 0 ? C.green : '#94A3B8'
            : '#E8E8E8',
        }} />
      ))}
    </div>
  );
}

// ─── Sticky phase nav ───
function PhaseNavBar({ activePhase, onPhaseClick, lang }) {
  return (
    <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 -mx-4 px-4 py-2 mb-6">
      <div className="flex gap-1 overflow-x-auto">
        {phaseConfig.map(({ id, num, icon, zh, en, color }) => (
          <button
            key={id}
            onClick={() => onPhaseClick(id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              activePhase === id
                ? 'text-white shadow-sm'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
            style={activePhase === id ? { background: color, borderColor: color } : {}}
          >
            <span>{icon}</span>
            <span>{lang === 'zh' ? zh : en}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Phase divider ───
function PhaseDivider({ phase, lang }) {
  return (
    <div id={`phase-${phase.id}`} className="scroll-mt-28 pt-8 pb-4 first:pt-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold" style={{ background: phase.color }}>
          {phase.icon}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: phase.color }}>Phase {phase.num}</p>
          <h2 className="font-bold text-xl text-gray-800">{lang === 'zh' ? phase.zh : phase.en}</h2>
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
export default function CaseDetail({ caseData }) {
  const { lang } = useLang();
  const [activePhase, setActivePhase] = useState('assess');
  const sectionRefs = useRef({});

  // Intersection observer for active phase tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('phase-', '');
            setActivePhase(id);
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px' }
    );
    phaseConfig.forEach(({ id }) => {
      const el = document.getElementById(`phase-${id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToPhase = (id) => {
    const el = document.getElementById(`phase-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const d = caseData;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* ─── Header ─── */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <HamsterCelebrating size={56} className="flex-shrink-0 mt-1" />
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="font-bold text-2xl text-gray-800">
                <L data={d.meta.title} lang={lang} />
              </h1>
              <span className="px-2.5 py-0.5 bg-teal-50 text-teal-600 rounded-full text-xs font-medium">
                {d.meta.year}
              </span>
            </div>
            <p className="text-sm text-gray-400"><L data={d.meta.team} lang={lang} /></p>
          </div>
        </div>

        {/* Quick summary card */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs font-semibold text-teal-600 mb-1">{lang === 'zh' ? '評讀文獻' : 'Appraised Article'}</p>
              <p className="text-gray-700 font-medium"><L data={d.meta.article.citation} lang={lang} /></p>
              <p className="text-xs text-gray-400">PMID: {d.meta.article.pmid} · {d.meta.article.studyType}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-teal-600 mb-1">GRADE</p>
              {Object.entries(d.meta.gradeResults).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500">{k}:</span>
                  <CertaintyBadge level={v} lang={lang} />
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-teal-600 mb-1">{lang === 'zh' ? '最終推薦' : 'Recommendation'}</p>
              <p className="text-gray-700 font-medium"><L data={d.meta.recommendation} lang={lang} /></p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Sticky Phase Nav ─── */}
      <PhaseNavBar activePhase={activePhase} onPhaseClick={scrollToPhase} lang={lang} />

      {/* ═══════════════════════════════════════ */}
      {/* PHASE 1: ASSESS */}
      {/* ═══════════════════════════════════════ */}
      <PhaseDivider phase={phaseConfig[0]} lang={lang} />

      <SectionHeading icon="📋">{lang === 'zh' ? '個案簡介' : 'Case Introduction'}</SectionHeading>
      <InfoCard label={lang === 'zh' ? '情境' : 'Scenario'}>
        <L data={d.assess.scenario} lang={lang} />
      </InfoCard>
      <InfoCard label={lang === 'zh' ? '臨床問題' : 'Clinical Questions'}>
        <ul className="space-y-1">
          {(lang === 'zh' ? d.assess.clinicalQuestions.zh : d.assess.clinicalQuestions.en).map((q, i) => (
            <li key={i} className="flex items-start gap-2"><span className="text-teal-400">{i + 1}.</span> {q}</li>
          ))}
        </ul>
      </InfoCard>
      <InfoCard label={lang === 'zh' ? '病人/家屬偏好' : 'Patient/Family Preferences'} color={C.amber}>
        <ul className="space-y-1">
          {(lang === 'zh' ? d.assess.patientPreferences.zh : d.assess.patientPreferences.en).map((p, i) => (
            <li key={i} className="flex items-start gap-2"><span className="text-amber-400">•</span> {p}</li>
          ))}
        </ul>
      </InfoCard>

      <SectionHeading icon="👤">{lang === 'zh' ? '病人基本資料' : 'Patient Profile'}</SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { label: lang === 'zh' ? '年齡' : 'Age', value: d.assess.patientProfile.age },
          { label: lang === 'zh' ? '性別' : 'Sex', value: d.assess.patientProfile.sex },
          { label: lang === 'zh' ? '疾病' : 'Condition', value: d.assess.patientProfile.condition },
          { label: lang === 'zh' ? '場域' : 'Setting', value: d.assess.patientProfile.setting },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
            <p className="text-sm font-medium text-gray-700"><L data={value} lang={lang} /></p>
          </div>
        ))}
      </div>

      <SectionHeading icon="📖">{lang === 'zh' ? '背景知識' : 'Background Knowledge'}</SectionHeading>
      {[
        { label: lang === 'zh' ? '疾病簡介' : 'Disease Overview', data: d.assess.backgroundKnowledge.diseaseOverview },
        { label: lang === 'zh' ? '風險族群' : 'Risk Factors', data: d.assess.backgroundKnowledge.riskFactors },
        { label: lang === 'zh' ? '治療方式' : 'Treatment Options', data: d.assess.backgroundKnowledge.treatmentOptions },
      ].map(({ label, data }) => (
        <InfoCard key={label} label={label}><L data={data} lang={lang} /></InfoCard>
      ))}

      <SectionHeading icon="💊">{lang === 'zh' ? '治療方式與臨床議題' : 'Treatment Options & Clinical Issues'}</SectionHeading>
      {d.assess.treatmentIssues.map((ti, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 mb-3">
          <p className="font-semibold text-gray-800 text-sm mb-2"><L data={ti.name} lang={lang} /></p>
          <p className="text-xs text-gray-500 mb-1"><strong>{lang === 'zh' ? '療程：' : 'Regimen: '}</strong><L data={ti.regimen} lang={lang} /></p>
          <p className="text-xs text-teal-700"><strong>{lang === 'zh' ? '議題：' : 'Issue: '}</strong><L data={ti.issue} lang={lang} /></p>
        </div>
      ))}

      <Annotation items={d.assess.annotations} lang={lang} />

      {/* ═══════════════════════════════════════ */}
      {/* PHASE 2: ASK */}
      {/* ═══════════════════════════════════════ */}
      <PhaseDivider phase={phaseConfig[1]} lang={lang} />

      <SectionHeading icon="📋">{lang === 'zh' ? 'PICOT 問題' : 'PICOT Questions'}</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {d.ask.picots.map((picot) => (
          <div
            key={picot.id}
            className={`rounded-xl border-2 p-4 ${picot.isPrimary ? 'border-teal-300 bg-teal-50/30' : 'border-gray-200 bg-white'}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-teal-500 text-white text-xs font-bold px-2 py-0.5 rounded">{picot.label}</span>
              {picot.isPrimary && (
                <span className="text-xs font-medium text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">
                  ⭐ {lang === 'zh' ? '主要' : 'Primary'}
                </span>
              )}
              <span className="text-xs text-gray-400 ml-auto">{lang === 'zh' ? '治療/預防型' : 'Treatment'}</span>
            </div>
            {['p', 'i', 'c', 'o', 't'].map((key) => (
              <div key={key} className="flex items-start gap-2 mb-1.5">
                <span className="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5" style={{ background: C.teal }}>
                  {key.toUpperCase()}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed"><L data={picot[key]} lang={lang} /></p>
              </div>
            ))}
            {picot.isPrimary && picot.justification && (
              <div className="mt-3 pt-3 border-t border-teal-100">
                <p className="text-xs text-teal-700 font-medium">
                  {lang === 'zh' ? '選此 PICOT 原因：' : 'Selection rationale: '}
                  <L data={picot.justification} lang={lang} />
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Annotation items={d.ask.annotations} lang={lang} />

      {/* ═══════════════════════════════════════ */}
      {/* PHASE 3: ACQUIRE */}
      {/* ═══════════════════════════════════════ */}
      <PhaseDivider phase={phaseConfig[2]} lang={lang} />

      <SectionHeading icon="🗄️">{lang === 'zh' ? '資料庫選擇' : 'Database Selection'}</SectionHeading>
      <div className="flex gap-3 mb-4 flex-wrap">
        {d.acquire.databases.map((db, i) => (
          <div key={i} className="rounded-xl border border-gray-200 px-4 py-3 bg-white">
            <p className="font-semibold text-gray-800 text-sm">{db.name}</p>
            <p className="text-xs text-gray-400"><L data={db.rationale} lang={lang} /></p>
          </div>
        ))}
      </div>

      <SectionHeading icon="🔗">{lang === 'zh' ? '關鍵字與搜尋策略' : 'Keywords & Search Strategy'}</SectionHeading>
      <DataTable
        headers={['PICOT', 'Free Text', 'MeSH Term']}
        rows={d.acquire.keywords.table.map(row => [
          row.picot,
          row.freeText.join(', ') || '—',
          row.mesh.join(', ') || (row.note ? <span className="text-gray-400 text-xs italic"><L data={row.note} lang={lang} /></span> : '—'),
        ])}
      />
      <div className="bg-gray-50 rounded-lg p-3 mb-4 font-mono text-xs text-gray-700 overflow-x-auto">
        <p className="text-gray-400 text-xs mb-1 font-sans">{lang === 'zh' ? 'Boolean 搜尋式：' : 'Boolean formula:'}</p>
        {d.acquire.keywords.booleanFormula}
      </div>

      <SectionHeading icon="🤖">{lang === 'zh' ? 'LitSuggest 機器學習篩選' : 'LitSuggest ML Screening'}</SectionHeading>
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-4">
        <div className="grid grid-cols-3 gap-3 text-center mb-3">
          <div>
            <p className="text-2xl font-bold text-blue-700">{d.acquire.screeningFlow.initial.pubmed}</p>
            <p className="text-xs text-blue-500">{lang === 'zh' ? 'PubMed 初步結果' : 'Initial PubMed'}</p>
          </div>
          <div className="flex items-center justify-center"><span className="text-xl text-blue-300">→</span></div>
          <div>
            <p className="text-2xl font-bold text-teal-700">{d.acquire.litSuggest.positive}</p>
            <p className="text-xs text-teal-500">LitSuggest Positive</p>
          </div>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed"><L data={d.acquire.litSuggest.description} lang={lang} /></p>
      </div>

      <SectionHeading icon="📊">{lang === 'zh' ? '檢索歷程 (PRISMA)' : 'Search Flow (PRISMA)'}</SectionHeading>
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
        {/* Database row */}
        <div className="flex gap-3 justify-center mb-3">
          {[
            { name: 'PubMed', n: d.acquire.screeningFlow.initial.pubmed },
            { name: 'Embase', n: d.acquire.screeningFlow.initial.embase },
            { name: 'Cochrane', n: d.acquire.screeningFlow.initial.cochrane },
          ].map(db => (
            <div key={db.name} className="text-center rounded-lg px-4 py-2 border" style={{ background: C.tealLight, borderColor: C.tealMid }}>
              <p className="text-xs text-gray-500">{db.name}</p>
              <p className="text-lg font-bold" style={{ color: C.teal }}>n = {db.n}</p>
            </div>
          ))}
        </div>
        {/* Flow steps */}
        <div className="flex flex-col items-center gap-2 text-sm">
          {d.acquire.litSuggest && (
            <>
              <span className="text-gray-400">↓ LitSuggest</span>
              <div className="rounded-lg px-4 py-1.5 text-center" style={{ background: C.teal, color: 'white' }}>
                PubMed Positive: n = {d.acquire.litSuggest.positive}
              </div>
            </>
          )}
          <span className="text-gray-400">↓ {lang === 'zh' ? '屬於 SR' : 'SR filter'}</span>
          <div className="flex gap-3">
            {Object.entries(d.acquire.screeningFlow.srCount).map(([db, n]) => (
              <div key={db} className="rounded px-3 py-1 text-center bg-gray-100 text-xs">
                <span className="text-gray-500">{db}: </span><span className="font-bold">{n}</span>
              </div>
            ))}
          </div>
          <span className="text-gray-400">↓ {lang === 'zh' ? '符合 PICO' : 'Match PICO'}</span>
          <div className="rounded-lg px-4 py-1.5 text-center font-bold" style={{ background: C.teal, color: 'white' }}>
            n = {d.acquire.screeningFlow.picoMatch}
          </div>
        </div>
      </div>

      <SectionHeading icon="📄">{lang === 'zh' ? '文獻選擇' : 'Article Selection'}</SectionHeading>
      <div className="space-y-3 mb-4">
        {d.acquire.articleSelection.candidates.map((c, i) => (
          <div key={i} className={`rounded-xl border-2 p-4 ${c.selected ? 'border-teal-300 bg-teal-50/20' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center gap-2 mb-2">
              {c.selected && <span className="px-2 py-0.5 bg-teal-500 text-white text-xs font-bold rounded">{lang === 'zh' ? '選擇此篇' : 'Selected'}</span>}
              <span className="text-xs text-gray-400">RCT: {c.rctCount} · N = {c.participants}</span>
            </div>
            <p className="text-sm text-gray-700"><L data={c.description} lang={lang} /></p>
            {c.citation && <p className="text-xs text-teal-600 mt-1">{c.citation}</p>}
          </div>
        ))}
      </div>

      <Annotation items={d.acquire.annotations} lang={lang} />

      {/* ═══════════════════════════════════════ */}
      {/* PHASE 4: APPRAISE */}
      {/* ═══════════════════════════════════════ */}
      <PhaseDivider phase={phaseConfig[3]} lang={lang} />

      {/* PICO Comparison */}
      <SectionHeading icon="🔎">{lang === 'zh' ? 'PICO 比較' : 'PICO Comparison'}</SectionHeading>
      <DataTable
        headers={['PICO', lang === 'zh' ? '面向' : 'Aspect', lang === 'zh' ? '評讀文獻' : 'Study', lang === 'zh' ? '案例' : 'Case', lang === 'zh' ? '相似程度' : 'Similarity']}
        rows={d.appraise.picoComparison.rows.map(r => [
          r.element,
          r.sub ? <L data={r.sub} lang={lang} /> : '',
          <L data={r.study} lang={lang} />,
          <L data={r.case_} lang={lang} />,
          <span className="font-medium" style={{ color: C.green }}><L data={r.similarity} lang={lang} /></span>,
        ])}
      />

      {/* CASP */}
      <SectionHeading icon="📋">{lang === 'zh' ? 'CASP-SR 文獻評讀結果' : 'CASP-SR Appraisal Results'}</SectionHeading>
      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
        <L data={d.appraise.casp.aiWorkflow} lang={lang} />
      </p>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-4">
        <div className="grid grid-cols-[1fr,auto,auto] gap-0">
          {/* Header */}
          <div className="px-3 py-2 font-semibold text-xs text-teal-800" style={{ background: C.tealLight }}>
            {lang === 'zh' ? 'CASP 量表' : 'CASP Item'}
          </div>
          <div className="px-3 py-2 font-semibold text-xs text-teal-800 text-center" style={{ background: C.tealLight }}>AI</div>
          <div className="px-3 py-2 font-semibold text-xs text-teal-800 text-center" style={{ background: C.tealLight }}>
            {lang === 'zh' ? '人類' : 'Human'}
          </div>
          {/* Rows */}
          {d.appraise.casp.scores.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={`px-3 py-2.5 text-sm text-gray-700 border-t border-gray-100 ${i % 2 ? 'bg-gray-50/50' : ''}`}>
                <span className="font-medium text-gray-500 mr-1.5">{s.id}</span>
                <L data={s.question} lang={lang} />
              </div>
              <div className={`px-3 py-2.5 text-center border-t border-gray-100 ${i % 2 ? 'bg-gray-50/50' : ''}`}>
                <ScoreBadge score={s.ai} />
              </div>
              <div className={`px-3 py-2.5 text-center border-t border-gray-100 ${i % 2 ? 'bg-gray-50/50' : ''}`}>
                <ScoreBadge score={s.human} />
              </div>
            </React.Fragment>
          ))}
        </div>
        {/* Kappa */}
        <div className="px-4 py-3 text-center border-t" style={{ background: C.tealLight }}>
          <span className="text-sm font-semibold" style={{ color: C.teal }}>
            Kappa = {d.appraise.casp.kappa} ({lang === 'zh' ? '意義：' : ''}<L data={d.appraise.casp.kappaInterpretation} lang={lang} />)
          </span>
        </div>
      </div>

      {/* CASP evidence details — collapsible */}
      <details className="mb-6">
        <summary className="cursor-pointer text-sm font-medium text-teal-600 hover:text-teal-700 mb-2">
          {lang === 'zh' ? '📝 展開各題評讀證據' : '📝 Expand per-question evidence'}
        </summary>
        <div className="space-y-3 mt-3">
          {d.appraise.casp.scores.map(s => (
            <div key={s.id} className="bg-white rounded-lg border border-gray-100 p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-bold text-gray-600 text-xs">{s.id}</span>
                <ScoreBadge score={s.human} />
                <span className="text-xs text-gray-400"><L data={s.question} lang={lang} /></span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed"><L data={s.evidence} lang={lang} /></p>
            </div>
          ))}
        </div>
      </details>

      {/* Results */}
      <SectionHeading icon="📊">{lang === 'zh' ? '結果綜覽' : 'Results Overview'}</SectionHeading>
      <DataTable
        headers={[
          lang === 'zh' ? '類別' : 'Type',
          lang === 'zh' ? '評估指標' : 'Outcome',
          lang === 'zh' ? '樣本數' : 'Sample',
          lang === 'zh' ? '效應量' : 'Effect',
          '95% CI',
        ]}
        rows={d.appraise.results.outcomes.map(o => [
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${o.category === 'benefit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {o.category === 'benefit' ? (lang === 'zh' ? '效益' : 'Benefit') : (lang === 'zh' ? '風險' : 'Risk')}
          </span>,
          <L data={o.name} lang={lang} />,
          o.sampleSize,
          `${o.effectSize} ${o.value}`,
          o.ci,
        ])}
      />

      {/* Key outcome by concentration — optional, some cases don't have subgroups */}
      {d.appraise.results.keyOutcome && (
        <>
          <SectionHeading icon="🔬"><L data={d.appraise.results.keyOutcome.title} lang={lang} /></SectionHeading>
          <DataTable
            headers={[d.appraise.results.keyOutcome.headerLabel ? <L data={d.appraise.results.keyOutcome.headerLabel} lang={lang} /> : (lang === 'zh' ? '分組' : 'Group'), lang === 'zh' ? '樣本數' : 'Sample', 'WMD', '95% CI']}
            rows={d.appraise.results.keyOutcome.subgroups.map(s => [
              typeof s.concentration === 'string' ? s.concentration : <L data={s.concentration} lang={lang} />,
              s.sampleSize,
              <span className="font-bold">{s.wmd}</span>,
              s.ci,
            ])}
          />
        </>
      )}

      {/* MID / Threshold */}
      <SectionHeading icon="🎯">
        {d.appraise.mid.isNullThreshold
          ? (lang === 'zh' ? '不精確性閾值訂定' : 'Imprecision Threshold')
          : (lang === 'zh' ? 'MID 訂定' : 'MID Determination')}
      </SectionHeading>
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-0.5">{lang === 'zh' ? '結果指標' : 'Outcome'}</p>
            <p className="text-sm font-medium text-gray-800"><L data={d.appraise.mid.outcome} lang={lang} /></p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-0.5">{lang === 'zh' ? '訂定方法' : 'Method'}</p>
            <p className="text-sm text-gray-700"><L data={d.appraise.mid.method} lang={lang} /></p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 mb-3">
          <p className="text-sm text-gray-700 leading-relaxed"><L data={d.appraise.mid.derivation} lang={lang} /></p>
        </div>
        <div className="text-center">
          <span className="inline-block px-4 py-2 rounded-xl text-lg font-bold" style={{ background: C.tealLight, color: C.teal }}>
            {d.appraise.mid.isNullThreshold
              ? `${lang === 'zh' ? '閾值' : 'Threshold'} = ${d.appraise.mid.value} ${d.appraise.mid.unit}`
              : `MID = ${d.appraise.mid.value} ${d.appraise.mid.unit}`}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">{d.appraise.mid.reference}</p>
        {d.appraise.mid.teamOriginalNote && (
          <div className="mt-3 flex items-start gap-2 bg-amber-50 rounded-lg p-3 border border-amber-200">
            <HamsterConcerned size={24} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-amber-800 leading-relaxed">
                <L data={d.appraise.mid.teamOriginalNote} lang={lang} />
              </p>
              {d.appraise.mid.teamOriginalValue && (
                <p className="text-xs text-amber-600 mt-1">
                  {lang === 'zh' ? '團隊原始值：' : 'Team original value: '}MID = {d.appraise.mid.teamOriginalValue}{d.appraise.mid.unit}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* GRADE assessments */}
      {Object.entries(d.appraise.grade.assessments).map(([concentration, assessment]) => (
        <div key={concentration} className="mb-6">
          <SectionHeading icon="📊">
            Core GRADE — {assessment.label ? <L data={assessment.label} lang={lang} /> : concentration}
          </SectionHeading>
          <div className="space-y-2 mb-3">
            {assessment.domains.map((domain, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold text-gray-800 text-sm"><L data={domain.name} lang={lang} /></span>
                    <span className="text-xs text-gray-400 ml-2">{domain.ref}</span>
                  </div>
                  <GradeBadge decision={domain.decision} />
                </div>
                <p className="text-xs text-gray-600 leading-relaxed"><L data={domain.rationale} lang={lang} /></p>
                {domain.numberLine && (
                  <NumberLine {...domain.numberLine} lang={lang} />
                )}
              </div>
            ))}
          </div>
          {/* Summary */}
          <div className="rounded-xl p-4 text-center" style={{ background: C.teal }}>
            <p className="text-sm text-teal-100 mb-1"><L data={assessment.summary} lang={lang} /></p>
            <CertaintyBadge level={assessment.certaintyLevel} lang={lang} />
          </div>
        </div>
      ))}

      {/* Supporting RCT */}
      {d.appraise.supportingRCT && (
        <>
          <SectionHeading icon="📄"><L data={d.appraise.supportingRCT.title} lang={lang} /></SectionHeading>
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
            <div className="space-y-2 text-sm">
              {[
                { label: lang === 'zh' ? '目的' : 'Purpose', value: d.appraise.supportingRCT.purpose },
                { label: lang === 'zh' ? '族群' : 'Population', value: d.appraise.supportingRCT.population },
                { label: lang === 'zh' ? '治療' : 'Intervention', value: d.appraise.supportingRCT.intervention },
                { label: lang === 'zh' ? '指標' : 'Outcomes', value: d.appraise.supportingRCT.outcomes },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-gray-400 w-16 flex-shrink-0 text-right">{label}</span>
                  <span className="text-gray-700"><L data={value} lang={lang} /></span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm font-semibold text-green-800">
                {lang === 'zh' ? '結論：' : 'Conclusion: '}<L data={d.appraise.supportingRCT.conclusion} lang={lang} />
              </p>
            </div>
          </div>
        </>
      )}

      <Annotation items={d.appraise.annotations} lang={lang} />

      {/* ═══════════════════════════════════════ */}
      {/* PHASE 5: APPLY */}
      {/* ═══════════════════════════════════════ */}
      <PhaseDivider phase={phaseConfig[4]} lang={lang} />

      {/* Applicability */}
      <SectionHeading icon="🎯">{lang === 'zh' ? '案例適用性 (CASP Q9)' : 'Case Applicability (CASP Q9)'}</SectionHeading>
      <DataTable
        headers={[
          lang === 'zh' ? '項目' : 'Item',
          lang === 'zh' ? '評讀文獻' : 'Study',
          lang === 'zh' ? '情境案例' : 'Case',
          lang === 'zh' ? '相似程度' : 'Similarity',
        ]}
        rows={d.apply.applicability.rows.map(r => [
          <L data={r.item} lang={lang} />,
          <L data={r.study} lang={lang} />,
          <L data={r.case_} lang={lang} />,
          <span className="font-medium" style={{ color: C.green }}><L data={r.similarity} lang={lang} /></span>,
        ])}
      />
      <InfoCard label={lang === 'zh' ? '結論' : 'Conclusion'} color={C.green}>
        <L data={d.apply.applicability.conclusion} lang={lang} />
      </InfoCard>

      {/* Benefit-Risk */}
      <SectionHeading icon="⚖️">{lang === 'zh' ? '利益風險比較 (CASP Q8)' : 'Benefit-Risk Comparison (CASP Q8)'}</SectionHeading>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ background: C.tealLight }}>
              <th className="px-3 py-2 border border-gray-200" style={{ color: C.tealDark }}></th>
              {d.apply.benefitRisk.options.map((opt, i) => (
                <th key={i} className="px-3 py-2 border border-gray-200 font-semibold text-sm" style={{ color: C.tealDark }}>
                  <L data={opt.name} lang={lang} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.apply.benefitRisk.options[0].regimen && (
              <tr className="bg-gray-50/30">
                <td className="px-3 py-2 border border-gray-200 font-semibold text-gray-600">{lang === 'zh' ? '療程' : 'Regimen'}</td>
                {d.apply.benefitRisk.options.map((opt, i) => (
                  <td key={i} className="px-3 py-2 border border-gray-200 text-xs text-gray-700">
                    <L data={opt.regimen} lang={lang} />
                  </td>
                ))}
              </tr>
            )}
            <tr>
              <td className="px-3 py-2 border border-gray-200 font-semibold text-green-700">{lang === 'zh' ? '利益' : 'Benefits'}</td>
              {d.apply.benefitRisk.options.map((opt, i) => (
                <td key={i} className="px-3 py-2 border border-gray-200 text-xs text-gray-700">
                  <ul className="space-y-1">
                    {(lang === 'zh' ? opt.benefits.zh : opt.benefits.en).map((b, j) => (
                      <li key={j} className="flex items-start gap-1"><span className="text-green-400">•</span>{b}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-3 py-2 border border-gray-200 font-semibold text-red-600">{lang === 'zh' ? '風險' : 'Risks'}</td>
              {d.apply.benefitRisk.options.map((opt, i) => (
                <td key={i} className="px-3 py-2 border border-gray-200 text-xs text-gray-700">
                  <ul className="space-y-1">
                    {(lang === 'zh' ? opt.risks.zh : opt.risks.en).map((r, j) => (
                      <li key={j} className="flex items-start gap-1"><span className="text-red-400">•</span>{r}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cost Analysis */}
      <SectionHeading icon="💰">{lang === 'zh' ? '成本分析' : 'Cost Analysis'}</SectionHeading>
      <DataTable
        headers={[
          '',
          ...d.apply.costAnalysis.options.map(o => <L data={o.name} lang={lang} />),
        ]}
        rows={[
          [
            <span className="font-medium">{lang === 'zh' ? '直接成本' : 'Direct'}</span>,
            ...d.apply.costAnalysis.options.map(o => <span className="text-xs"><L data={o.directCost} lang={lang} /></span>),
          ],
          ...(d.apply.costAnalysis.options[0].visitCost ? [[
            <span className="font-medium">{lang === 'zh' ? '掛號費' : 'Visit cost'}</span>,
            ...d.apply.costAnalysis.options.map(o => <span className="text-xs"><L data={o.visitCost} lang={lang} /></span>),
          ]] : []),
          [
            <span className="font-medium">{lang === 'zh' ? '間接成本' : 'Indirect'}</span>,
            ...d.apply.costAnalysis.options.map(o => <span className="text-xs"><L data={o.indirectCost} lang={lang} /></span>),
          ],
          [
            <span className="font-bold">{lang === 'zh' ? '總額' : 'Total'}</span>,
            ...d.apply.costAnalysis.options.map(o => <span className="text-xs font-bold"><L data={o.totalAnnual} lang={lang} /></span>),
          ],
        ]}
      />

      {/* Efficacy Summary */}
      <SectionHeading icon="📋"><L data={d.apply.efficacySummary.title} lang={lang} /></SectionHeading>
      <DataTable
        headers={[
          lang === 'zh' ? '組別' : 'Group',
          lang === 'zh' ? '樣本數' : 'Sample',
          'MD [95% CI]',
          lang === 'zh' ? '臨床意義' : 'Clinical Meaning',
          lang === 'zh' ? '證據品質' : 'Certainty',
        ]}
        rows={d.apply.efficacySummary.rows.map(r => [
          typeof r.group === 'string' ? r.group : <L data={r.group} lang={lang} />,
          r.sampleSize,
          `${r.md} ${r.ci}`,
          <L data={r.clinicalMeaning} lang={lang} />,
          <CertaintyBadge level={r.certainty} lang={lang} />,
        ])}
      />
      {/* NNT — optional */}
      {d.apply.efficacySummary.nnt && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
          <div className="text-center mb-2">
            <span className="inline-block px-5 py-2.5 rounded-xl text-xl font-bold" style={{ background: C.tealLight, color: C.teal }}>
              NNT = {d.apply.efficacySummary.nnt.value}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed text-center mb-2">
            <L data={d.apply.efficacySummary.nnt.interpretation} lang={lang} />
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-xs font-medium text-teal-600 hover:text-teal-700">
              {lang === 'zh' ? '📐 展開計算過程' : '📐 Show calculation'}
            </summary>
            <div className="bg-gray-50 rounded-lg p-3 mt-2">
              <p className="text-xs text-gray-600 leading-relaxed font-mono">
                <L data={d.apply.efficacySummary.nnt.derivation} lang={lang} />
              </p>
            </div>
          </details>
        </div>
      )}
      <InfoCard label={lang === 'zh' ? '結論' : 'Conclusion'} color={C.green}>
        <L data={d.apply.efficacySummary.conclusion} lang={lang} />
      </InfoCard>

      {/* Evidence to Decision */}
      <SectionHeading icon="📋">{lang === 'zh' ? '證據到建議 (EtD)' : 'Evidence to Decision (EtD)'}</SectionHeading>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-4">
        <div className="grid grid-cols-[1fr,auto,1fr] gap-0">
          {/* Header */}
          <div className="px-3 py-2 font-semibold text-xs" style={{ background: C.tealLight, color: C.tealDark }}>{lang === 'zh' ? '要素' : 'Factor'}</div>
          <div className="px-3 py-2 font-semibold text-xs text-center" style={{ background: C.tealLight, color: C.tealDark }}>{lang === 'zh' ? '方向' : 'Direction'}</div>
          <div className="px-3 py-2 font-semibold text-xs" style={{ background: C.tealLight, color: C.tealDark }}>{lang === 'zh' ? '評估' : 'Assessment'}</div>
          {/* Rows */}
          {d.apply.evidenceToDecision.factors.map((f, i) => (
            <React.Fragment key={f.key}>
              <div className={`px-3 py-2.5 text-sm font-medium text-gray-700 border-t border-gray-100 ${i % 2 ? 'bg-gray-50/50' : ''}`}>
                <L data={f.label} lang={lang} />
              </div>
              <div className={`px-3 py-2.5 border-t border-gray-100 ${i % 2 ? 'bg-gray-50/50' : ''}`}>
                <EtdBar direction={f.direction} />
              </div>
              <div className={`px-3 py-2.5 text-xs text-gray-600 border-t border-gray-100 ${i % 2 ? 'bg-gray-50/50' : ''}`}>
                <L data={f.assessment} lang={lang} />
              </div>
            </React.Fragment>
          ))}
        </div>
        {/* Recommendation */}
        <div className="px-4 py-3 text-center border-t" style={{ background: C.teal }}>
          <span className="text-sm font-bold text-white">
            <L data={d.apply.evidenceToDecision.recommendationLabel} lang={lang} />
          </span>
        </div>
      </div>
      <InfoCard label={lang === 'zh' ? '為什麼是部分推薦？' : 'Why conditional?'} color={C.amber}>
        <L data={d.apply.evidenceToDecision.reasonForConditional} lang={lang} />
      </InfoCard>

      {/* Patient summary */}
      <SectionHeading icon="🗣️">{lang === 'zh' ? '去學術化回應' : 'Patient-Facing Summary'}</SectionHeading>
      <div className="rounded-xl p-5 mb-4" style={{ background: C.tealLight, border: `2px solid ${C.tealMid}` }}>
        <p className="text-sm text-gray-800 leading-loose">
          <L data={d.apply.patientSummary} lang={lang} />
        </p>
      </div>

      <Annotation items={d.apply.annotations} lang={lang} />

      {/* ─── Footer ─── */}
      <div className="mt-12 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <HamsterCelebrating size={32} />
          <p className="text-sm text-gray-500">
            {lang === 'zh' ? '以上就是這個案例的完整 5A 流程！' : 'That\'s the complete 5A workflow for this case!'}
          </p>
        </div>
        <a href="/cases" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
          ← {lang === 'zh' ? '返回案例庫' : 'Back to Case Library'}
        </a>
      </div>
    </div>
  );
}
