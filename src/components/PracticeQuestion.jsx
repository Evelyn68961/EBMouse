// src/components/PracticeQuestion.jsx
// Shared interactive practice question component for EBMouse Toolbox.
// Supports 3 formats: "mc" (multiple choice), "fill" (fill-in-the-blank), "error" (error-spotting).
// Supports 4 question types: PICOT, CASP, GRADE, EtD — auto-detected from data keys.
// All interactions are click-based — zero typing.

import React, { useState } from 'react';
import { useLang } from '../App';

// ─── Type detection helpers ───
// Detect question type from data shape. Returns 'picot' | 'casp' | 'grade' | 'etd' | 'label-only'
function detectType(q) {
  if (q.format === 'mc') {
    // MC: check if options have .picot (PICOT MC) or .label (GRADE/CASP/EtD MC)
    if (q.options?.[0]?.picot) return 'picot';
    return 'label-only'; // GRADE, CASP, EtD MC all use label+explanation
  }
  if (q.format === 'fill') {
    // Fill: check prefilled keys
    const keys = Object.keys(q.prefilled || {});
    const blankKeys = (q.blanks || []).map((b) => b.element);
    const allKeys = [...keys, ...blankKeys];
    if (allKeys.some((k) => PICOT_KEYS.includes(k))) return 'picot';
    if (allKeys.some((k) => CASP_KEYS.includes(k))) return 'casp';
    if (allKeys.some((k) => GRADE_KEYS.includes(k))) return 'grade';
    if (allKeys.some((k) => ETD_KEYS.includes(k))) return 'etd';
    return 'grade'; // default for non-PICOT fill
  }
  if (q.format === 'error') {
    if (q.shownPicot) return 'picot';
    if (q.shownScores) return 'casp';
    if (q.shownGrade) return 'grade';
    if (q.shownEtd) return 'etd';
    return 'grade';
  }
  return 'picot';
}

const PICOT_KEYS = ['p', 'i', 'c', 'o', 't'];
const CASP_KEYS = ['q1', 'q2', 'q3a', 'q3b', 'q3c', 'q3d', 'q4', 'q5a', 'q5b', 'q6', 'q6_1', 'q6_2', 'q7'];
const GRADE_KEYS = ['rob', 'inconsistency', 'indirectness', 'imprecision', 'pubBias'];
const ETD_KEYS = ['strength', 'wording', 'direction', 'population', 'intervention', 'qualifier'];

const PICOT_COLORS = { p: '#0E7C86', i: '#2980B9', c: '#8E44AD', o: '#E67E22', t: '#C0392B' };

const CASP_COLORS = {
  q1: '#0E7C86', q2: '#0E7C86', q3a: '#0E7C86', q3b: '#0E7C86', q3c: '#0E7C86', q3d: '#0E7C86', q4: '#0E7C86',
  q5a: '#2980B9', q5b: '#2980B9', q6: '#2980B9', q6_1: '#2980B9', q6_2: '#2980B9',
  q7: '#8E44AD',
};

const GRADE_COLORS = {
  rob: '#E74C3C', inconsistency: '#E67E22', indirectness: '#9B59B6',
  imprecision: '#3498DB', pubBias: '#2ECC71',
};

const ETD_COLORS = {
  strength: '#0E7C86', wording: '#2980B9', direction: '#8E44AD',
  population: '#E67E22', intervention: '#C0392B', qualifier: '#27AE60',
};

function getColor(key) {
  return PICOT_COLORS[key] || CASP_COLORS[key] || GRADE_COLORS[key] || ETD_COLORS[key] || '#666';
}

function getLabel(key) {
  // Short uppercase label for row badge
  const labels = {
    p: 'P', i: 'I', c: 'C', o: 'O', t: 'T',
    q1: 'Q1', q2: 'Q2', q3a: 'Q3a', q3b: 'Q3b', q3c: 'Q3c', q3d: 'Q3d', q4: 'Q4',
    q5a: 'Q5a', q5b: 'Q5b', q6: 'Q6', q6_1: 'Q6-1', q6_2: 'Q6-2', q7: 'Q7',
    rob: 'RoB', inconsistency: 'INC', indirectness: 'IND', imprecision: 'IMP', pubBias: 'PUB',
    strength: 'STR', wording: 'WRD', direction: 'DIR', population: 'POP', intervention: 'INT', qualifier: 'QUA',
  };
  return labels[key] || key.toUpperCase().slice(0, 3);
}

// ─── Generic row display (works for PICOT, CASP, GRADE, EtD) ───
function DataRow({ rowKey, content, highlighted, onClick, clickable, isBlank }) {
  const color = getColor(rowKey);
  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={`flex items-stretch border-b last:border-b-0 transition-colors ${
        clickable ? 'cursor-pointer hover:bg-gray-50' : ''
      }`}
      style={highlighted ? { background: color + '10' } : {}}
    >
      <div
        className="w-12 flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{
          background: highlighted ? color : (isBlank ? '#F59E0B' : color + '20'),
          color: highlighted || isBlank ? '#fff' : color,
        }}
      >
        {getLabel(rowKey)}{isBlank ? '❓' : ''}
      </div>
      <div className="flex-1 px-3 py-2.5 text-sm text-gray-700 leading-relaxed min-h-[40px] flex items-center">
        {content}
      </div>
    </div>
  );
}

// ─── Helper: build ordered key list for fill/error from question data ───
function getRowKeys(q, type) {
  if (type === 'picot') return PICOT_KEYS;
  if (type === 'casp') return CASP_KEYS;
  if (type === 'grade') return GRADE_KEYS;
  if (type === 'etd') return ETD_KEYS;
  return PICOT_KEYS;
}

// ─── Format: Multiple Choice ───
function McQuestion({ q, lang }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const isPicotMc = q.options?.[0]?.picot;

  return (
    <div>
      <p className="text-sm text-gray-700 mb-3 font-medium">{q.prompt[lang]}</p>
      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.correctIndex;
          const isSelected = selected === idx;
          let borderStyle = 'border-gray-200';
          let bgStyle = '';
          if (revealed && isCorrect) { borderStyle = 'border-emerald-400'; bgStyle = 'bg-emerald-50/50'; }
          else if (revealed && isSelected && !isCorrect) { borderStyle = 'border-red-300'; bgStyle = 'bg-red-50/30'; }
          else if (isSelected) { borderStyle = 'border-teal-400'; bgStyle = 'bg-teal-50/30'; }

          return (
            <div key={idx}>
              <button
                onClick={() => !revealed && setSelected(idx)}
                disabled={revealed}
                className={`w-full text-left rounded-xl border-2 overflow-hidden transition-all ${borderStyle} ${bgStyle} ${
                  !revealed ? 'hover:border-teal-300' : ''
                }`}
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isSelected ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {revealed && isCorrect && <span className="text-xs font-bold text-emerald-600">✓</span>}
                  {revealed && isSelected && !isCorrect && <span className="text-xs font-bold text-red-500">✗</span>}
                  {/* For label-only MC (GRADE/CASP/EtD), show label text inline */}
                  {!isPicotMc && (
                    <span className="text-sm text-gray-700">{opt.label[lang]}</span>
                  )}
                </div>
                {/* For PICOT MC, show the PICOT table */}
                {isPicotMc && (
                  <div className="rounded-lg overflow-hidden m-2 border border-gray-100">
                    {PICOT_KEYS.map((el) => (
                      <DataRow key={el} rowKey={el} content={opt.picot[el]?.[lang] || '—'} />
                    ))}
                  </div>
                )}
              </button>
              {revealed && (
                <p className={`text-xs mt-1 ml-2 leading-relaxed ${isCorrect ? 'text-emerald-700' : 'text-gray-500'}`}>
                  {opt.explanation[lang]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!revealed && (
        <button
          onClick={() => selected !== null && setRevealed(true)}
          disabled={selected === null}
          className={`mt-4 px-5 py-2 rounded-xl text-sm font-medium transition-all ${
            selected !== null
              ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-sm'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {lang === 'zh' ? '顯示答案' : 'Show answer'}
        </button>
      )}

      {revealed && (
        <div className={`mt-3 rounded-xl px-4 py-3 text-sm ${
          selected === q.correctIndex ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
        }`}>
          {selected === q.correctIndex
            ? (lang === 'zh' ? '🎉 正確！' : '🎉 Correct!')
            : (lang === 'zh' ? `💡 正確答案是 ${String.fromCharCode(65 + q.correctIndex)}。看看各選項的解說。` : `💡 The correct answer is ${String.fromCharCode(65 + q.correctIndex)}. Check the explanations above.`)}
        </div>
      )}
    </div>
  );
}

// ─── Format: Fill-in-the-blank ───
function FillQuestion({ q, lang }) {
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState(false);

  const type = detectType(q);
  const blankElements = q.blanks.map((b) => b.element);
  const allFilled = q.blanks.every((b) => answers[b.element] !== undefined);

  // Build ordered row list: combine prefilled + blanks
  // For GRADE/EtD/CASP: use domain order, showing only keys that appear in prefilled or blanks
  const allKeys = getRowKeys(q, type);
  const activeKeys = allKeys.filter((k) =>
    blankElements.includes(k) || (q.prefilled && q.prefilled[k])
  );

  // Helper: get display label for a row (from prefilled data or key name)
  const getRowLabel = (key) => {
    // Check if blank has a label
    const blankData = q.blanks.find((b) => b.element === key);
    if (blankData?.label) return blankData.label[lang];
    // Check prefilled
    if (q.prefilled?.[key]?.label) return q.prefilled[key].label[lang];
    return getLabel(key);
  };

  // Helper: get prefilled content for non-blank rows
  const getPrefilledContent = (key) => {
    if (type === 'picot') return q.prefilled?.[key]?.[lang];
    // GRADE/EtD: prefilled has { label, rating } — show "Label: Rating"
    // CASP: prefilled has { label, score } — show "Label: Score"
    const pf = q.prefilled?.[key];
    if (!pf) return null;
    const label = pf.label?.[lang] || '';
    const rating = pf.rating?.[lang] || pf.score?.[lang] || '';
    return `${label}：${rating}`;
  };

  return (
    <div>
      <p className="text-sm text-gray-700 mb-3 font-medium">{q.prompt[lang]}</p>

      <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
        {activeKeys.map((key) => {
          const isBlank = blankElements.includes(key);
          const blankData = q.blanks.find((b) => b.element === key);

          let content;
          if (isBlank) {
            const rowLabel = getRowLabel(key);
            if (revealed) {
              const userIdx = answers[key];
              const correctIdx = blankData.correctIndex;
              const isCorrect = userIdx === correctIdx;
              content = (
                <div className="w-full">
                  <p className="text-xs font-semibold text-gray-500 mb-1">{rowLabel}</p>
                  <div className={`rounded-lg px-3 py-1.5 text-sm ${isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {isCorrect ? '✓ ' : '✗ '}{blankData.options[correctIdx][lang]}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {blankData.explanations[userIdx !== undefined ? userIdx : correctIdx][lang]}
                  </p>
                </div>
              );
            } else {
              content = (
                <div className="w-full">
                  <p className="text-xs font-semibold text-gray-500 mb-1">{rowLabel}</p>
                  <select
                    value={answers[key] !== undefined ? answers[key] : ''}
                    onChange={(e) => setAnswers({ ...answers, [key]: e.target.value === '' ? undefined : Number(e.target.value) })}
                    className="w-full px-2 py-1.5 rounded-lg border border-amber-300 bg-amber-50/50 text-sm focus:outline-none focus:border-teal-400"
                  >
                    <option value="">{lang === 'zh' ? '— 請選擇 —' : '— Select —'}</option>
                    {blankData.options.map((opt, i) => (
                      <option key={i} value={i}>{String.fromCharCode(65 + i)}. {opt[lang]}</option>
                    ))}
                  </select>
                </div>
              );
            }
          } else {
            content = getPrefilledContent(key);
          }

          if (!isBlank && !content) return null;

          return (
            <DataRow
              key={key}
              rowKey={key}
              content={content}
              isBlank={isBlank && !revealed}
            />
          );
        })}
      </div>

      {!revealed && (
        <button
          onClick={() => allFilled && setRevealed(true)}
          disabled={!allFilled}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
            allFilled
              ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-sm'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {lang === 'zh' ? '顯示答案' : 'Show answer'}
        </button>
      )}

      {revealed && (() => {
        const score = q.blanks.filter((b) => answers[b.element] === b.correctIndex).length;
        return (
          <div className={`mt-3 rounded-xl px-4 py-3 text-sm ${
            score === q.blanks.length ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}>
            {score === q.blanks.length
              ? (lang === 'zh' ? '🎉 全部正確！' : '🎉 All correct!')
              : (lang === 'zh' ? `💡 答對 ${score}/${q.blanks.length}。看看各欄位的解說。` : `💡 ${score}/${q.blanks.length} correct. Check the explanations above.`)}
          </div>
        );
      })()}
    </div>
  );
}

// ─── Format: Error-spotting ───
function ErrorQuestion({ q, lang }) {
  const [picked, setPicked] = useState(new Set());
  const [revealed, setRevealed] = useState(false);

  const type = detectType(q);
  const errorSet = new Set(q.errorElements);

  // Get the shown data object and its keys
  const shownData = q.shownPicot || q.shownScores || q.shownGrade || q.shownEtd || {};
  const allKeys = getRowKeys(q, type);
  const activeKeys = allKeys.filter((k) => shownData[k]);

  const togglePick = (key) => {
    if (revealed) return;
    const next = new Set(picked);
    if (next.has(key)) next.delete(key); else next.add(key);
    setPicked(next);
  };

  // Helper: get display content for a row
  const getRowContent = (key) => {
    const item = shownData[key];
    if (!item) return null;
    if (type === 'picot') return item[lang]; // PICOT: direct bilingual string
    // GRADE/EtD/CASP: { label, rating } or { label, score }
    const label = item.label?.[lang] || '';
    const rating = item.rating?.[lang] || item.score?.[lang] || '';
    return `${label}：${rating}`;
  };

  return (
    <div>
      <p className="text-sm text-gray-700 mb-1 font-medium">{q.prompt[lang]}</p>
      <p className="text-xs text-gray-400 mb-3">
        {lang === 'zh' ? '點選你認為有錯的要素' : 'Click the elements you think are wrong'}
      </p>

      <div className="rounded-xl border border-gray-200 overflow-hidden mb-3">
        {activeKeys.map((key) => {
          const content = getRowContent(key);
          if (!content) return null;
          const isPicked = picked.has(key);
          const isError = errorSet.has(key);

          let bgOverride = {};
          if (revealed && isError) { bgOverride = { background: '#FEE2E2' }; }
          else if (revealed && isPicked && !isError) { bgOverride = { background: '#FEF3C7' }; }

          const color = getColor(key);

          return (
            <div key={key}>
              <div
                onClick={() => togglePick(key)}
                className={`flex items-stretch border-b last:border-b-0 transition-colors cursor-pointer ${
                  !revealed ? 'hover:bg-gray-50' : ''
                }`}
                style={bgOverride}
              >
                <div
                  className="w-12 flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: isPicked && !revealed ? color : (color + '20'),
                    color: isPicked && !revealed ? '#fff' : color,
                  }}
                >
                  {getLabel(key)}{isPicked && !revealed ? ' ✓' : ''}
                </div>
                <div className="flex-1 px-3 py-2.5 text-sm text-gray-700 leading-relaxed">
                  {content}
                </div>
                {revealed && isError && (
                  <div className="flex items-center pr-3">
                    <span className="text-xs font-bold text-red-500">❌</span>
                  </div>
                )}
                {revealed && isPicked && !isError && (
                  <div className="flex items-center pr-3">
                    <span className="text-xs text-amber-600">✓ OK</span>
                  </div>
                )}
              </div>
              {revealed && isError && q.errorExplanations[key] && (
                <div className="px-4 py-2 bg-red-50 border-b border-red-100">
                  <p className="text-xs text-red-700 leading-relaxed">{q.errorExplanations[key][lang]}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!revealed && (
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {lang === 'zh' ? `已選 ${picked.size} 個` : `${picked.size} selected`}
          </span>
          <button
            onClick={() => picked.size > 0 && setRevealed(true)}
            disabled={picked.size === 0}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              picked.size > 0
                ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-sm'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {lang === 'zh' ? '顯示答案' : 'Show answer'}
          </button>
        </div>
      )}

      {revealed && (() => {
        const correctPicks = [...picked].filter((el) => errorSet.has(el)).length;
        const wrongPicks = [...picked].filter((el) => !errorSet.has(el)).length;
        const missed = q.errorElements.filter((el) => !picked.has(el)).length;
        const perfect = correctPicks === q.errorElements.length && wrongPicks === 0;
        return (
          <div className={`mt-3 rounded-xl px-4 py-3 text-sm ${
            perfect ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}>
            {perfect
              ? (lang === 'zh' ? '🎉 完美！找到所有錯誤！' : '🎉 Perfect! Found all errors!')
              : (lang === 'zh'
                ? `💡 找到 ${correctPicks}/${q.errorElements.length} 個錯誤${wrongPicks > 0 ? `，${wrongPicks} 個誤判` : ''}${missed > 0 ? `，漏掉 ${missed} 個` : ''}。看看上方解說。`
                : `💡 Found ${correctPicks}/${q.errorElements.length} errors${wrongPicks > 0 ? `, ${wrongPicks} false alarm${wrongPicks > 1 ? 's' : ''}` : ''}${missed > 0 ? `, missed ${missed}` : ''}. Check explanations above.`)}
          </div>
        );
      })()}
    </div>
  );
}

// ─── Main export: renders any question by format ───
export default function PracticeQuestion({ question }) {
  const { lang } = useLang();
  const q = question;

  const formatLabel = {
    mc: { zh: '選擇題', en: 'Multiple Choice' },
    fill: { zh: '填空題', en: 'Fill-in-the-Blank' },
    error: { zh: '找錯題', en: 'Error Spotting' },
  };

  const formatIcon = { mc: '🔘', fill: '📝', error: '🔍' };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
      {/* Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700">
          {formatIcon[q.format]} {formatLabel[q.format]?.[lang] || q.format}
        </span>
        {q.source && q.source !== 'new' && (
          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500">
            {q.source === 'case1' ? 'Atropine' : q.source === 'case2' ? 'CPM' : q.source === 'case3' ? 'IV Iron' : q.source}
          </span>
        )}
      </div>

      {/* Scenario */}
      <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4 border border-gray-100">
        <p className="text-xs font-semibold text-gray-400 mb-1">{lang === 'zh' ? '情境' : 'Scenario'}</p>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{q.scenario[lang]}</p>
      </div>

      {/* Question by format */}
      {q.format === 'mc' && <McQuestion q={q} lang={lang} />}
      {q.format === 'fill' && <FillQuestion q={q} lang={lang} />}
      {q.format === 'error' && <ErrorQuestion q={q} lang={lang} />}
    </div>
  );
}

// ─── Convenience: render a list of questions with section header ───
export function PracticeSection({ questions, title }) {
  const { lang } = useLang();
  if (!questions || questions.length === 0) return null;

  return (
    <div>
      {title && (
        <h3 className="font-bold text-lg text-gray-800 mb-4">
          🏋️ {title[lang] || title}
        </h3>
      )}
      {questions.map((q) => (
        <PracticeQuestion key={q.id} question={q} />
      ))}
    </div>
  );
}
