import React from 'react';
import { useLang } from '../App';

/*
 * SlidePreview — miniature slide thumbnails matching the actual
 * competition slide template from EBM_四練_20250811_統整_已報_.pdf
 *
 * Design characteristics from the real slides:
 * - White background
 * - Teal (#0E7C86) for headings, badges, section dividers
 * - Light teal (#E8F6F7) info boxes with rounded corners
 * - PICOT: colored square badges (P/I/C/O/T) on left, text on right
 * - Section dividers: large teal bold text top-left, English bottom-right
 * - CASP: emoji scoring (😀😟😐) in table rows
 * - GRADE: domain cards with 不扣分/扣1分 badges
 * - Tables: teal header row, alternating white/light rows
 * - Page number bottom-right
 */

const C = {
  teal: '#0E7C86',
  tealDark: '#0A5C63',
  tealLight: '#E8F6F7',
  tealMid: '#B5DFE3',
  white: '#FFFFFF',
  dark: '#1B2838',
  gray: '#6B7A8D',
  lightGray: '#F4F4F2',
  green: '#27AE60',
  red: '#E74C3C',
  amber: '#F39C12',
  greenBg: '#D5F5E3',
  redBg: '#FADBD8',
  amberBg: '#FEF9E7',
};

// Base slide wrapper — 16:9 with page number
function S({ children, active, num, label }) {
  return (
    <div className={`mb-2.5 transition-all duration-200 ${active ? 'scale-[1.03]' : 'opacity-50 scale-[0.97]'}`}>
      <div className={`relative w-full bg-white rounded-lg overflow-hidden border-2 transition-colors ${
        active ? 'border-teal-400 shadow-lg shadow-teal-100' : 'border-gray-200'
      }`} style={{ aspectRatio: '4/3' }}>
        <div className="absolute inset-0 p-[6px] flex flex-col overflow-hidden" style={{ fontSize: '5.5px', lineHeight: 1.3, fontFamily: 'sans-serif' }}>
          {children}
        </div>
        <div className={`absolute bottom-[2px] right-[4px] ${active ? 'text-teal-500' : 'text-gray-300'}`}
          style={{ fontSize: '4.5px' }}>{num}</div>
      </div>
      {label && <p className={`text-center mt-0.5 truncate ${active ? 'text-teal-600 font-medium' : 'text-gray-400'}`}
        style={{ fontSize: '8px' }}>{label}</p>}
    </div>
  );
}

// Section divider — matches the real slides: large teal heading top-left, English bottom-right
function Divider({ zh, en, active, num }) {
  return (
    <S active={active} num={num} label={zh}>
      <div className="flex-1 flex flex-col justify-between p-1" style={{ background: `linear-gradient(135deg, ${C.tealLight} 0%, ${C.white} 100%)` }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: C.teal, lineHeight: 1.2 }}>{zh}</div>
        </div>
        <div className="text-right">
          <div style={{ fontSize: '8px', fontWeight: 700, color: C.teal, opacity: 0.7 }}>{en}</div>
        </div>
      </div>
    </S>
  );
}

// Teal heading bar — used on most content slides
function TealHeading({ text }) {
  return (
    <div style={{ fontSize: '7px', fontWeight: 700, color: C.teal, marginBottom: 3, borderBottom: `1.5px solid ${C.tealMid}`, paddingBottom: 2 }}>
      {text}
    </div>
  );
}

// Light teal info box — matches the rounded boxes in the real slides
function InfoBox({ label, children, color }) {
  return (
    <div className="rounded mb-1 px-1.5 py-1" style={{ background: C.tealLight }}>
      {label && <div style={{ fontSize: '4.5px', fontWeight: 700, color: color || C.tealDark, background: C.tealMid, display: 'inline-block', padding: '0 3px', borderRadius: 2, marginBottom: 1 }}>{label}</div>}
      <div style={{ fontSize: '4.5px', color: C.dark }} className="line-clamp-2">{children}</div>
    </div>
  );
}

// Empty state placeholder
function Empty({ text, lang }) {
  return (
    <div className="flex-1 flex items-center justify-center" style={{ color: '#CCC', fontSize: '5.5px', fontStyle: 'italic' }}>
      {text || (lang === 'zh' ? '尚未填寫' : 'Not yet filled')}
    </div>
  );
}

// ─── SLIDE 1: Title ───
function TitleSlide({ project, active, lang }) {
  return (
    <S active={active} num={1} label={lang === 'zh' ? '封面' : 'Title'}>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div style={{ fontSize: '10px', fontWeight: 800, color: C.teal, letterSpacing: '1px' }}>
          EBM 實證醫學競賽
        </div>
        <div style={{ color: C.gray, fontSize: '5px', marginTop: 5 }}>
          {lang === 'zh' ? '團隊:' : 'Team:'}
        </div>
        <div style={{ color: C.dark, fontSize: '5.5px', fontWeight: 600, marginTop: 1 }}>
          {project.meta.title || '—'}
        </div>
      </div>
    </S>
  );
}

// ─── SLIDE 2: Case Introduction (個案簡介) ───
function CaseSlide({ data, active, lang }) {
  const has = data.scenario || data.patientProfile.condition;
  return (
    <S active={active} num={2} label={lang === 'zh' ? '個案簡介' : 'Case'}>
      <TealHeading text={lang === 'zh' ? '個案簡介' : 'Case Introduction'} />
      {has ? (
        <>
          {data.patientProfile.condition && (
            <InfoBox label={lang === 'zh' ? '情境' : 'Scenario'}>
              {data.scenario?.slice(0, 80) || `${data.patientProfile.age} ${data.patientProfile.condition}`}
            </InfoBox>
          )}
          {data.patientPreferences && (
            <InfoBox label={lang === 'zh' ? '背景' : 'Background'}>
              {data.patientPreferences.slice(0, 60)}
            </InfoBox>
          )}
        </>
      ) : <Empty lang={lang} />}
    </S>
  );
}

// ─── SLIDE 3: Background Knowledge (背景知識) ───
function BackgroundSlide({ data, active, lang }) {
  const bg = data.backgroundKnowledge;
  const has = bg.diseaseOverview || bg.riskFactors || bg.treatmentOptions;
  return (
    <S active={active} num={3} label={lang === 'zh' ? '背景知識' : 'Background'}>
      <TealHeading text={lang === 'zh' ? '背景知識' : 'Background Knowledge'} />
      {has ? (
        <>
          {bg.diseaseOverview && <InfoBox label={lang === 'zh' ? '疾病簡介' : 'Disease'}>{bg.diseaseOverview.slice(0, 50)}</InfoBox>}
          {bg.riskFactors && <InfoBox label={lang === 'zh' ? '風險族群' : 'Risk'}>{bg.riskFactors.slice(0, 50)}</InfoBox>}
          {bg.treatmentOptions && <InfoBox label={lang === 'zh' ? '治療方式' : 'Treatment'}>{bg.treatmentOptions.slice(0, 50)}</InfoBox>}
        </>
      ) : <Empty lang={lang} />}
    </S>
  );
}

// ─── SLIDE 4+: PICOT (matches the real layout: colored badges left, content right, type checkboxes) ───
function PicotSlide({ picot, idx, active, lang }) {
  const has = picot.p || picot.i || picot.c || picot.o;
  const badges = [
    { key: 'P', val: picot.p, bg: C.teal },
    { key: 'I', val: picot.i, bg: C.teal },
    { key: 'C', val: picot.c, bg: C.teal },
    { key: 'O', val: picot.o, bg: C.teal },
    { key: 'T', val: picot.t, bg: C.teal },
  ];
  const types = [
    { val: 'treatment', zh: '治療/預防型', en: 'Treatment' },
    { val: 'diagnosis', zh: '診斷型', en: 'Diagnosis' },
    { val: 'prognosis', zh: '預後型', en: 'Prognosis' },
    { val: 'harm', zh: '傷害/病因型', en: 'Harm' },
  ];

  return (
    <S active={active} num={4 + idx} label={`PICOT-${idx + 1}`}>
      <div className="flex items-center justify-between mb-1">
        <div style={{ fontSize: '7px', fontWeight: 700, color: C.teal }}>PICOT-{idx + 1}</div>
        {picot.isPrimary && (
          <div style={{ fontSize: '4px', color: C.white, background: C.teal, borderRadius: 2, padding: '1px 3px', fontWeight: 700 }}>
            {lang === 'zh' ? '選此PICOT' : 'Primary'}
          </div>
        )}
      </div>
      {has ? (
        <div className="flex gap-1 flex-1">
          {/* Left: PICOT rows */}
          <div className="flex-1 space-y-[2px]">
            {badges.map(({ key, val }) => (
              <div key={key} className="flex items-start gap-1">
                <div style={{
                  width: 11, height: 11, borderRadius: 2, background: C.teal, color: C.white,
                  fontSize: '5.5px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>{key}</div>
                <div style={{ fontSize: '4.5px', color: C.dark }} className="line-clamp-1 pt-[1px]">
                  {val || '—'}
                </div>
              </div>
            ))}
          </div>
          {/* Right: question type checkboxes */}
          <div className="flex-shrink-0 space-y-[1px]" style={{ width: 38 }}>
            {types.map(({ val, zh, en }) => (
              <div key={val} className="flex items-center gap-[2px]">
                <div style={{
                  width: 5, height: 5, border: `0.5px solid ${C.teal}`, borderRadius: 1,
                  background: picot.questionType === val ? C.teal : C.white,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {picot.questionType === val && <span style={{ color: C.white, fontSize: '3px' }}>✓</span>}
                </div>
                <span style={{ fontSize: '3.5px', color: C.gray }}>{lang === 'zh' ? zh : en}</span>
              </div>
            ))}
          </div>
        </div>
      ) : <Empty lang={lang} />}
    </S>
  );
}

// ─── Search History (檢索歷程) — PRISMA-like flow ───
function SearchFlowSlide({ data, active, lang }) {
  const f = data.screeningFlow;
  const total = (f.initialResults.pubmed || 0) + (f.initialResults.embase || 0) + (f.initialResults.cochrane || 0);
  return (
    <S active={active} num={8} label={lang === 'zh' ? '檢索歷程' : 'Search'}>
      <TealHeading text={lang === 'zh' ? '檢索歷程' : 'Search History'} />
      {total > 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-[3px]">
          {/* DB row */}
          <div className="flex gap-2 justify-center">
            {[
              { name: 'PubMed', n: f.initialResults.pubmed },
              { name: 'Embase', n: f.initialResults.embase },
              { name: 'Cochrane', n: f.initialResults.cochrane },
            ].filter(d => d.n > 0).map(d => (
              <div key={d.name} className="text-center rounded px-1.5 py-0.5" style={{ background: C.tealLight, border: `0.5px solid ${C.tealMid}` }}>
                <div style={{ fontSize: '4px', color: C.gray }}>{d.name}</div>
                <div style={{ fontSize: '7px', fontWeight: 700, color: C.teal }}>n = {d.n}</div>
              </div>
            ))}
          </div>
          {/* Flow arrows */}
          {[
            { label: lang === 'zh' ? '最終納入' : 'Final', n: f.finalIncluded },
          ].map(({ label, n }) => (
            <React.Fragment key={label}>
              <div style={{ fontSize: '4px', color: C.gray }}>↓</div>
              <div className="rounded px-2 py-0.5 text-center" style={{ background: C.teal }}>
                <span style={{ fontSize: '5px', fontWeight: 700, color: C.white }}>{label}: n = {n || '?'}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : <Empty lang={lang} />}
    </S>
  );
}

// ─── Article Selection (文獻選擇) ───
function ArticleSlide({ data, active, lang }) {
  const art = data.selectedArticle;
  const has = art.title;
  return (
    <S active={active} num={9} label={lang === 'zh' ? '文獻選擇' : 'Article'}>
      <TealHeading text={lang === 'zh' ? '文獻選擇' : 'Article Selection'} />
      {has ? (
        <div className="rounded p-1.5" style={{ background: C.tealLight, border: `0.5px solid ${C.tealMid}` }}>
          <div style={{ fontSize: '5px', fontWeight: 600, color: C.dark }} className="line-clamp-2">{art.title}</div>
          <div style={{ fontSize: '4px', color: C.gray, marginTop: 2 }}>{art.authors?.slice(0, 40)}</div>
          <div className="flex gap-2 mt-1.5">
            <div className="rounded px-1 py-0.5" style={{ background: C.white, fontSize: '4px' }}>
              RCT: {art.rctCount || '?'} {lang === 'zh' ? '篇' : ''}
            </div>
            <div className="rounded px-1 py-0.5" style={{ background: C.white, fontSize: '4px' }}>
              N = {art.totalParticipants || '?'}
            </div>
          </div>
          {art.selectionRationale && (
            <div style={{ fontSize: '4px', color: C.tealDark, marginTop: 2, fontWeight: 600 }}>
              {lang === 'zh' ? '選擇此篇' : 'Selected'}
            </div>
          )}
        </div>
      ) : <Empty lang={lang} />}
    </S>
  );
}

// ─── CASP Results (文獻評讀結果) — two-column emoji table matching real slides ───
function CaspSlide({ data, active, lang }) {
  const scores = data.casp.scores;
  const keys = Object.keys(scores);
  const answered = keys.filter(k => scores[k].human).length;
  const emojiMap = { yes: '😀', no: '😟', uncertain: '😐' };

  // Split into two columns like the real slide
  const left = keys.slice(0, 7);
  const right = keys.slice(7);

  const labels = {
    q1: 'Q1', q2: 'Q2', q3a: 'Q3a', q3b: 'Q3b', q3c: 'Q3c', q3d: 'Q3d', q4: 'Q4',
    q5a: 'Q5a', q5b: 'Q5b', q6: 'Q6', q6_1: 'Q6-1', q6_2: 'Q6-2', q7: 'Q7',
  };

  function Col({ items }) {
    return (
      <div className="flex-1">
        {items.map(k => (
          <div key={k} className="flex items-center gap-[2px] py-[1px]" style={{ borderBottom: `0.3px solid ${C.lightGray}` }}>
            <span style={{ fontSize: '4px', color: C.gray, width: 16 }}>{labels[k]}</span>
            <span style={{ fontSize: '5px' }}>{scores[k].human ? emojiMap[scores[k].human] : '·'}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <S active={active} num={11} label={lang === 'zh' ? 'CASP 結果' : 'CASP'}>
      <TealHeading text={lang === 'zh' ? '文獻評讀結果' : 'CASP Appraisal Results'} />
      {answered > 0 ? (
        <>
          <div className="flex gap-2">
            <Col items={left} />
            <Col items={right} />
          </div>
          {data.casp.kappa !== null && (
            <div className="mt-1 text-center rounded py-0.5" style={{ background: C.tealLight }}>
              <span style={{ fontSize: '4.5px', color: C.teal, fontWeight: 600 }}>
                Kappa = {data.casp.kappa}
              </span>
            </div>
          )}
        </>
      ) : <Empty lang={lang} />}
    </S>
  );
}

// ─── GRADE Summary — domain scorecard with colored badges ───
function GradeSlide({ data, active, lang }) {
  const g = data.grade;
  const domains = [
    { key: 'riskOfBias', zh: '誤差風險', en: 'Risk of Bias' },
    { key: 'imprecision', zh: '不精確性', en: 'Imprecision' },
    { key: 'inconsistency', zh: '不一致性', en: 'Inconsistency' },
    { key: 'indirectness', zh: '不直接性', en: 'Indirectness' },
    { key: 'publicationBias', zh: '發表偏誤', en: 'Pub. Bias' },
  ];
  const total = domains.reduce((s, d) => s + g.domains[d.key].decision, 0);
  const levelMap = { high: { zh: '高', en: 'High', c: C.green }, moderate: { zh: '中', en: 'Moderate', c: C.amber }, low: { zh: '低', en: 'Low', c: '#E67E22' }, very_low: { zh: '很低', en: 'Very Low', c: C.red } };
  const level = levelMap[g.certaintyLevel];

  return (
    <S active={active} num={13} label={lang === 'zh' ? 'GRADE' : 'GRADE'}>
      <TealHeading text={lang === 'zh' ? 'Core GRADE 綜合評估' : 'Core GRADE Summary'} />
      <div className="space-y-[2px] mb-1.5">
        {domains.map(({ key, zh, en }) => {
          const dec = g.domains[key].decision;
          return (
            <div key={key} className="flex items-center justify-between rounded px-1 py-[2px]" style={{ background: C.tealLight }}>
              <span style={{ fontSize: '4.5px', color: C.dark }}>{lang === 'zh' ? zh : en}</span>
              <div className="rounded px-1.5" style={{
                fontSize: '4.5px', fontWeight: 700,
                background: dec === 0 ? C.greenBg : C.redBg,
                color: dec === 0 ? C.green : C.red,
              }}>
                {dec === 0 ? (lang === 'zh' ? '不扣分' : '0') : dec}
              </div>
            </div>
          );
        })}
      </div>
      {/* Total + certainty level */}
      {g.certaintyLevel && level && (
        <div className="rounded py-1 text-center" style={{ background: C.teal }}>
          <div style={{ fontSize: '4px', color: C.tealLight }}>
            {lang === 'zh' ? `整體扣 ${Math.abs(total)} 分 →` : `Total: ${total} →`}
          </div>
          <div style={{ fontSize: '6px', fontWeight: 700, color: C.white }}>
            {lang === 'zh' ? `證據品質: ${level.zh}` : `Certainty: ${level.en}`}
          </div>
        </div>
      )}
    </S>
  );
}

// ─── Evidence to Decision (證據到建議) ───
function EtdSlide({ data, active, lang }) {
  const etd = data.evidenceToDecision;
  const factors = [
    { key: 'benefitRisk', zh: '利益風險', en: 'Benefit/Risk' },
    { key: 'evidenceQuality', zh: '證據品質', en: 'Evidence' },
    { key: 'valuesPreferences', zh: '價值偏好', en: 'Values' },
    { key: 'costEffectiveness', zh: '成本效益', en: 'Cost' },
    { key: 'feasibility', zh: '可行性', en: 'Feasibility' },
    { key: 'acceptability', zh: '接受度', en: 'Acceptability' },
  ];
  const has = factors.some(f => etd[f.key].direction !== 0 || etd[f.key].assessment);

  return (
    <S active={active} num={15} label={lang === 'zh' ? '證據到建議' : 'EtD'}>
      <TealHeading text={lang === 'zh' ? '證據到建議' : 'Evidence to Decision'} />
      {has ? (
        <div className="space-y-[2px]">
          {/* Header row */}
          <div className="flex items-center">
            <span style={{ width: 30, fontSize: '3.5px', color: C.gray, fontWeight: 600 }}>{lang === 'zh' ? '要素' : 'Factor'}</span>
            <span className="flex-1 text-center" style={{ fontSize: '3.5px', color: C.gray }}>{lang === 'zh' ? '反對 → 建議' : 'Against → For'}</span>
          </div>
          {factors.map(({ key, zh, en }) => (
            <div key={key} className="flex items-center rounded py-[1.5px]" style={{ background: C.tealLight }}>
              <span style={{ width: 30, fontSize: '4px', color: C.dark, fontWeight: 500, paddingLeft: 2 }}>{lang === 'zh' ? zh : en}</span>
              <div className="flex-1 flex gap-[1px] px-1">
                {[-2, -1, 0, 1, 2].map(v => (
                  <div key={v} style={{
                    flex: 1, height: 4, borderRadius: 1,
                    background: etd[key].direction === v
                      ? v < 0 ? C.red : v > 0 ? C.green : C.gray
                      : '#E8E8E8',
                  }} />
                ))}
              </div>
            </div>
          ))}
          {/* Recommendation badge */}
          {data.recommendationStrength && (
            <div className="text-center mt-1 rounded py-0.5" style={{ background: C.teal }}>
              <span style={{ fontSize: '5px', fontWeight: 700, color: C.white }}>
                {data.recommendationStrength === 'strong'
                  ? (lang === 'zh' ? '強烈推薦' : 'Strong')
                  : (lang === 'zh' ? '部分推薦' : 'Conditional')}
              </span>
            </div>
          )}
        </div>
      ) : <Empty lang={lang} />}
    </S>
  );
}

// ─── Patient Summary (去學術化回應) ───
function SummarySlide({ data, active, lang }) {
  return (
    <S active={active} num={16} label={lang === 'zh' ? '回應' : 'Summary'}>
      <TealHeading text={lang === 'zh' ? '去學術化回應' : 'Patient Summary'} />
      {data.patientSummary ? (
        <div className="rounded p-1.5 flex-1" style={{ background: C.tealLight }}>
          <div style={{ fontSize: '4.5px', color: C.dark, lineHeight: 1.5 }} className="line-clamp-6">
            {data.patientSummary.slice(0, 200)}
            {data.patientSummary.length > 200 ? '...' : ''}
          </div>
        </div>
      ) : <Empty lang={lang} />}
    </S>
  );
}

// ─── Thank You ───
function ThankYouSlide({ active }) {
  return (
    <S active={active} num={17} label="End">
      <div className="flex-1 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.tealLight} 0%, ${C.white} 100%)` }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: C.teal, fontStyle: 'italic' }}>
          THANK YOU
        </div>
      </div>
    </S>
  );
}

// ─── Phase → active slide mapping ───
const phaseActiveMap = {
  1: [1, 2, 3],
  2: [4, 5, 6],
  3: [7, 8, 9],
  4: [10, 11, 12, 13],
  5: [14, 15, 16, 17],
};

export default function SlidePreview({ project, currentPhase }) {
  const { lang } = useLang();
  const a = project.assess;
  const ask = project.ask;
  const acq = project.acquire;
  const apr = project.appraise;
  const app = project.apply;

  const isA = (n) => (phaseActiveMap[currentPhase] || []).includes(n);

  let slideNum = 1;

  return (
    <div className="space-y-0.5">
      {/* Phase 1: Assess */}
      <TitleSlide project={project} active={isA(slideNum)} lang={lang} />
      {slideNum++}
      <CaseSlide data={a} active={isA(slideNum)} lang={lang} />
      {slideNum++}
      <BackgroundSlide data={a} active={isA(slideNum)} lang={lang} />
      {slideNum++}

      {/* Phase 2: Ask */}
      <Divider zh="形成問題" en="Ask" active={isA(slideNum)} num={slideNum} />
      {slideNum++}
      {ask.picots.map((picot, idx) => {
        const n = slideNum + idx;
        return <PicotSlide key={picot.id} picot={picot} idx={idx} active={isA(4)} lang={lang} />;
      })}

      {/* Phase 3: Acquire */}
      <Divider zh="文獻檢索" en="Acquire" active={isA(7)} num={7} />
      <SearchFlowSlide data={acq} active={isA(8)} lang={lang} />
      <ArticleSlide data={acq} active={isA(9)} lang={lang} />

      {/* Phase 4: Appraise */}
      <Divider zh="文獻評讀" en="Appraise" active={isA(10)} num={10} />
      <CaspSlide data={apr} active={isA(11)} lang={lang} />
      <GradeSlide data={apr} active={isA(13)} lang={lang} />

      {/* Phase 5: Apply */}
      <Divider zh="臨床應用" en="Apply" active={isA(14)} num={14} />
      <EtdSlide data={{ ...app, recommendationStrength: app.recommendationStrength }} active={isA(15)} lang={lang} />
      <SummarySlide data={app} active={isA(16)} lang={lang} />
      <ThankYouSlide active={isA(17)} />
    </div>
  );
}
