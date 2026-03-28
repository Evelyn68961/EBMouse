import React from 'react';
import { useLang } from '../App';

// Color constants matching the PPTX spec
const TEAL = '#0E7C86';
const DARK_TEAL = '#0A5C63';
const LIGHT_TEAL = '#E8F6F7';
const WHITE = '#FFFFFF';
const DARK = '#1B2838';
const GRAY = '#6B7A8D';
const LIGHT_GRAY = '#F4F4F2';
const TABLE_HEADER = '#0E7C86';
const TABLE_ALT = '#F7FAFA';

// Miniature slide renderer — each slide is a 16:9 div
function Slide({ children, active, slideNum, label }) {
  return (
    <div className={`mb-3 transition-all ${active ? 'scale-[1.02]' : 'opacity-60'}`}>
      <div
        className={`relative w-full bg-white rounded-lg overflow-hidden border-2 transition-colors ${
          active ? 'border-teal-400 shadow-md shadow-teal-100' : 'border-gray-200'
        }`}
        style={{ aspectRatio: '16/9' }}
      >
        <div className="absolute inset-0 p-2 flex flex-col" style={{ fontSize: '6px', lineHeight: 1.3 }}>
          {children}
        </div>
        {/* Slide number badge */}
        <div className={`absolute bottom-1 right-1 px-1 rounded text-white ${active ? 'bg-teal-500' : 'bg-gray-300'}`}
          style={{ fontSize: '5px', lineHeight: '10px' }}>
          {slideNum}
        </div>
      </div>
      {label && <p className={`text-center mt-0.5 ${active ? 'text-teal-600 font-medium' : 'text-gray-400'}`} style={{ fontSize: '9px' }}>{label}</p>}
    </div>
  );
}

// Section divider slide
function DividerSlide({ title, subtitle, active, slideNum }) {
  return (
    <Slide active={active} slideNum={slideNum}>
      <div className="flex-1 flex flex-col items-center justify-center rounded" style={{ background: TEAL }}>
        <div style={{ color: WHITE, fontWeight: 700, fontSize: '9px' }}>{title}</div>
        {subtitle && <div style={{ color: LIGHT_TEAL, fontSize: '6px', marginTop: 2 }}>{subtitle}</div>}
      </div>
    </Slide>
  );
}

// Title slide
function TitleSlide({ project, active, lang }) {
  return (
    <Slide active={active} slideNum={1} label={lang === 'zh' ? '封面' : 'Title'}>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div style={{ color: TEAL, fontWeight: 700, fontSize: '10px', textAlign: 'center' }}>
          EBM 實證醫學競賽
        </div>
        <div style={{ color: GRAY, fontSize: '6px', marginTop: 4, textAlign: 'center' }}>
          {project.meta.title || (lang === 'zh' ? '新任務' : 'New Mission')}
        </div>
      </div>
    </Slide>
  );
}

// Scenario slide
function ScenarioSlide({ data, active, lang }) {
  const hasContent = data.scenario || data.patientProfile.condition;
  return (
    <Slide active={active} slideNum={2} label={lang === 'zh' ? '個案簡介' : 'Case Intro'}>
      <div style={{ fontWeight: 700, fontSize: '7px', color: TEAL, marginBottom: 3 }}>
        {lang === 'zh' ? '個案簡介' : 'Case Introduction'}
      </div>
      {hasContent ? (
        <>
          <div style={{ fontSize: '5.5px', color: DARK, marginBottom: 3 }} className="line-clamp-3">
            {data.scenario?.slice(0, 120) || ''}
            {data.scenario?.length > 120 ? '...' : ''}
          </div>
          <div className="flex gap-1 flex-wrap">
            {data.patientProfile.age && <span className="px-1 rounded" style={{ background: LIGHT_TEAL, fontSize: '5px', color: TEAL }}>{data.patientProfile.age}</span>}
            {data.patientProfile.condition && <span className="px-1 rounded" style={{ background: LIGHT_TEAL, fontSize: '5px', color: TEAL }}>{data.patientProfile.condition}</span>}
          </div>
        </>
      ) : (
        <div style={{ color: '#CCC', fontSize: '6px', fontStyle: 'italic' }} className="flex-1 flex items-center justify-center">
          {lang === 'zh' ? '尚未填寫' : 'Not yet filled'}
        </div>
      )}
    </Slide>
  );
}

// Background knowledge slide
function BackgroundSlide({ data, active, lang }) {
  const bg = data.backgroundKnowledge;
  const hasContent = bg.diseaseOverview || bg.riskFactors || bg.treatmentOptions;
  return (
    <Slide active={active} slideNum={3} label={lang === 'zh' ? '背景知識' : 'Background'}>
      <div style={{ fontWeight: 700, fontSize: '7px', color: TEAL, marginBottom: 3 }}>
        {lang === 'zh' ? '背景知識' : 'Background Knowledge'}
      </div>
      {hasContent ? (
        <div className="space-y-1">
          {bg.diseaseOverview && (
            <div>
              <span style={{ fontSize: '5px', fontWeight: 600, color: DARK_TEAL }}>{lang === 'zh' ? '疾病簡介' : 'Disease'}: </span>
              <span style={{ fontSize: '5px', color: DARK }} className="line-clamp-1">{bg.diseaseOverview.slice(0, 60)}</span>
            </div>
          )}
          {bg.riskFactors && (
            <div>
              <span style={{ fontSize: '5px', fontWeight: 600, color: DARK_TEAL }}>{lang === 'zh' ? '風險族群' : 'Risk'}: </span>
              <span style={{ fontSize: '5px', color: DARK }} className="line-clamp-1">{bg.riskFactors.slice(0, 60)}</span>
            </div>
          )}
          {bg.treatmentOptions && (
            <div>
              <span style={{ fontSize: '5px', fontWeight: 600, color: DARK_TEAL }}>{lang === 'zh' ? '治療方式' : 'Treatment'}: </span>
              <span style={{ fontSize: '5px', color: DARK }} className="line-clamp-1">{bg.treatmentOptions.slice(0, 60)}</span>
            </div>
          )}
        </div>
      ) : (
        <div style={{ color: '#CCC', fontSize: '6px', fontStyle: 'italic' }} className="flex-1 flex items-center justify-center">
          {lang === 'zh' ? '尚未填寫' : 'Not yet filled'}
        </div>
      )}
    </Slide>
  );
}

// PICOT slide
function PicotSlide({ picot, idx, active, lang }) {
  const hasContent = picot.p || picot.i || picot.c || picot.o;
  const fields = [
    { key: 'P', val: picot.p },
    { key: 'I', val: picot.i },
    { key: 'C', val: picot.c },
    { key: 'O', val: picot.o },
    { key: 'T', val: picot.t },
  ];
  return (
    <Slide active={active} slideNum={4 + idx} label={`PICOT-${idx + 1}`}>
      <div style={{ fontWeight: 700, fontSize: '7px', color: TEAL, marginBottom: 2 }}>
        PICOT-{idx + 1}
        {picot.isPrimary && <span style={{ fontSize: '5px', color: WHITE, background: TEAL, borderRadius: 2, padding: '0 2px', marginLeft: 3 }}>⭐</span>}
      </div>
      {hasContent ? (
        <div className="space-y-0.5">
          {fields.map(({ key, val }) => val && (
            <div key={key} className="flex gap-1">
              <span style={{ fontSize: '5px', fontWeight: 700, color: WHITE, background: TEAL, borderRadius: 2, width: 10, height: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{key}</span>
              <span style={{ fontSize: '5px', color: DARK }} className="line-clamp-1">{val.slice(0, 50)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: '#CCC', fontSize: '6px', fontStyle: 'italic' }} className="flex-1 flex items-center justify-center">
          {lang === 'zh' ? '尚未填寫' : 'Not yet filled'}
        </div>
      )}
    </Slide>
  );
}

// Search strategy slide
function SearchSlide({ data, active, lang }) {
  const flow = data.screeningFlow;
  const total = (flow.initialResults.pubmed || 0) + (flow.initialResults.embase || 0) + (flow.initialResults.cochrane || 0);
  return (
    <Slide active={active} slideNum={7} label={lang === 'zh' ? '檢索歷程' : 'Search Flow'}>
      <div style={{ fontWeight: 700, fontSize: '7px', color: TEAL, marginBottom: 3 }}>
        {lang === 'zh' ? '檢索歷程' : 'Search Flow'}
      </div>
      {total > 0 ? (
        <div className="space-y-1">
          <div className="flex gap-2 justify-center">
            {[
              { name: 'PubMed', n: flow.initialResults.pubmed },
              { name: 'Embase', n: flow.initialResults.embase },
              { name: 'Cochrane', n: flow.initialResults.cochrane },
            ].filter(d => d.n > 0).map(d => (
              <div key={d.name} className="text-center px-1 rounded" style={{ background: LIGHT_TEAL }}>
                <div style={{ fontSize: '4px', color: GRAY }}>{d.name}</div>
                <div style={{ fontSize: '7px', fontWeight: 700, color: TEAL }}>{d.n}</div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ fontSize: '5px', color: GRAY }}>↓</div>
          <div className="text-center">
            <span style={{ fontSize: '6px', fontWeight: 600, color: TEAL }}>
              {lang === 'zh' ? '最終納入' : 'Final'}: {flow.finalIncluded || '?'}
            </span>
          </div>
        </div>
      ) : (
        <div style={{ color: '#CCC', fontSize: '6px', fontStyle: 'italic' }} className="flex-1 flex items-center justify-center">
          {lang === 'zh' ? '尚未填寫' : 'Not yet filled'}
        </div>
      )}
    </Slide>
  );
}

// CASP results slide
function CaspSlide({ data, active, lang }) {
  const scores = data.casp.scores;
  const answered = Object.values(scores).filter(s => s.human).length;
  const total = Object.keys(scores).length;
  return (
    <Slide active={active} slideNum={9} label={lang === 'zh' ? 'CASP 結果' : 'CASP Results'}>
      <div style={{ fontWeight: 700, fontSize: '7px', color: TEAL, marginBottom: 3 }}>
        {lang === 'zh' ? '文獻評讀結果' : 'CASP Appraisal Results'}
      </div>
      {answered > 0 ? (
        <div>
          <div className="flex flex-wrap gap-0.5 mb-2">
            {Object.entries(scores).map(([key, val]) => (
              <div key={key} className="rounded" style={{
                width: 12, height: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5px',
                background: val.human === 'yes' ? '#D5F5E3' : val.human === 'no' ? '#FADBD8' : val.human === 'uncertain' ? '#FEF9E7' : '#F5F5F5',
                color: val.human === 'yes' ? '#27AE60' : val.human === 'no' ? '#E74C3C' : val.human === 'uncertain' ? '#F39C12' : '#CCC',
              }}>
                {val.human === 'yes' ? '😀' : val.human === 'no' ? '😟' : val.human === 'uncertain' ? '😐' : '·'}
              </div>
            ))}
          </div>
          <div style={{ fontSize: '5px', color: GRAY }}>{answered}/{total} {lang === 'zh' ? '已完成' : 'completed'}</div>
        </div>
      ) : (
        <div style={{ color: '#CCC', fontSize: '6px', fontStyle: 'italic' }} className="flex-1 flex items-center justify-center">
          {lang === 'zh' ? '尚未評讀' : 'Not yet scored'}
        </div>
      )}
    </Slide>
  );
}

// GRADE summary slide
function GradeSlide({ data, active, lang }) {
  const grade = data.grade;
  const total = Object.values(grade.domains).reduce((s, d) => s + d.decision, 0);
  const levelColors = { high: '#27AE60', moderate: '#F39C12', low: '#E67E22', very_low: '#E74C3C' };
  const levelLabels = { high: 'High', moderate: 'Moderate', low: 'Low', very_low: 'Very Low' };
  return (
    <Slide active={active} slideNum={11} label={lang === 'zh' ? 'GRADE 評估' : 'GRADE'}>
      <div style={{ fontWeight: 700, fontSize: '7px', color: TEAL, marginBottom: 3 }}>
        Core GRADE {lang === 'zh' ? '綜合評估' : 'Summary'}
      </div>
      <div className="space-y-0.5 mb-2">
        {Object.entries({ riskOfBias: 'RoB', imprecision: 'Imprec.', inconsistency: 'Incons.', indirectness: 'Indir.', publicationBias: 'Pub.Bias' }).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1">
            <span style={{ fontSize: '4.5px', color: GRAY, width: 28 }}>{label}</span>
            <span style={{
              fontSize: '5px', fontWeight: 600, borderRadius: 2, padding: '0 2px',
              background: grade.domains[key].decision === 0 ? '#D5F5E3' : '#FADBD8',
              color: grade.domains[key].decision === 0 ? '#27AE60' : '#E74C3C',
            }}>
              {grade.domains[key].decision === 0 ? '0' : grade.domains[key].decision}
            </span>
          </div>
        ))}
      </div>
      {grade.certaintyLevel && (
        <div className="text-center rounded py-0.5" style={{ background: levelColors[grade.certaintyLevel] || '#CCC' }}>
          <span style={{ fontSize: '6px', fontWeight: 700, color: WHITE }}>
            {levelLabels[grade.certaintyLevel] || grade.certaintyLevel}
          </span>
        </div>
      )}
    </Slide>
  );
}

// Evidence to Decision slide
function EtdSlide({ data, active, lang }) {
  const etd = data.evidenceToDecision;
  const factors = [
    { key: 'benefitRisk', label: lang === 'zh' ? '利益風險' : 'Benefit/Risk' },
    { key: 'evidenceQuality', label: lang === 'zh' ? '證據品質' : 'Evidence' },
    { key: 'valuesPreferences', label: lang === 'zh' ? '價值偏好' : 'Values' },
    { key: 'costEffectiveness', label: lang === 'zh' ? '成本效益' : 'Cost' },
    { key: 'feasibility', label: lang === 'zh' ? '可行性' : 'Feasible' },
    { key: 'acceptability', label: lang === 'zh' ? '接受度' : 'Accept.' },
  ];
  const hasContent = factors.some(f => etd[f.key].direction !== 0 || etd[f.key].assessment);
  return (
    <Slide active={active} slideNum={13} label={lang === 'zh' ? '證據到建議' : 'EtD'}>
      <div style={{ fontWeight: 700, fontSize: '7px', color: TEAL, marginBottom: 2 }}>
        {lang === 'zh' ? '證據到建議' : 'Evidence to Decision'}
      </div>
      {hasContent ? (
        <div className="space-y-0.5">
          {factors.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-1">
              <span style={{ fontSize: '4.5px', color: GRAY, width: 30 }}>{label}</span>
              <div className="flex gap-px flex-1">
                {[-2, -1, 0, 1, 2].map(v => (
                  <div key={v} style={{
                    flex: 1, height: 5, borderRadius: 1,
                    background: etd[key].direction === v
                      ? v < 0 ? '#E74C3C' : v > 0 ? '#27AE60' : '#95A5A6'
                      : '#F0F0F0',
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: '#CCC', fontSize: '6px', fontStyle: 'italic' }} className="flex-1 flex items-center justify-center">
          {lang === 'zh' ? '尚未填寫' : 'Not yet filled'}
        </div>
      )}
    </Slide>
  );
}

// Recommendation slide
function RecommendationSlide({ data, active, lang }) {
  return (
    <Slide active={active} slideNum={14} label={lang === 'zh' ? '建議' : 'Recommendation'}>
      <div style={{ fontWeight: 700, fontSize: '7px', color: TEAL, marginBottom: 3 }}>
        {lang === 'zh' ? '去學術化回應' : 'Patient Summary'}
      </div>
      {data.patientSummary ? (
        <div style={{ fontSize: '5px', color: DARK, lineHeight: 1.4 }} className="line-clamp-5">
          {data.patientSummary.slice(0, 200)}
          {data.patientSummary.length > 200 ? '...' : ''}
        </div>
      ) : (
        <div style={{ color: '#CCC', fontSize: '6px', fontStyle: 'italic' }} className="flex-1 flex items-center justify-center">
          {lang === 'zh' ? '尚未填寫' : 'Not yet filled'}
        </div>
      )}
      {data.recommendationStrength && (
        <div className="mt-auto text-center">
          <span className="rounded px-1 py-0.5" style={{
            fontSize: '5px', fontWeight: 700,
            background: data.recommendationStrength === 'strong' ? '#D5F5E3' : '#FEF9E7',
            color: data.recommendationStrength === 'strong' ? '#27AE60' : '#F39C12',
          }}>
            {data.recommendationStrength === 'strong'
              ? (lang === 'zh' ? '強烈推薦' : 'Strong')
              : (lang === 'zh' ? '部分推薦' : 'Conditional')}
          </span>
        </div>
      )}
    </Slide>
  );
}

// Phase to slide mapping
const phaseSlideRanges = {
  1: [1, 2, 3],       // Title, Scenario, Background
  2: [4],              // PICOT(s) — dynamic
  3: [6, 7, 8],        // Divider, Search, Article
  4: [9, 10, 11],      // CASP, Results, GRADE
  5: [12, 13, 14, 15], // Divider, EtD, Recommendation, Thank You
};

export default function SlidePreview({ project, currentPhase }) {
  const { lang } = useLang();
  const assess = project.assess;
  const ask = project.ask;
  const acquire = project.acquire;
  const appraise = project.appraise;
  const apply = project.apply;

  // Determine which slides are "active" based on current phase
  const activeSlides = phaseSlideRanges[currentPhase] || [];
  const isActive = (num) => activeSlides.includes(num);

  return (
    <div className="space-y-1">
      {/* Phase 1 slides */}
      <TitleSlide project={project} active={isActive(1)} lang={lang} />
      <ScenarioSlide data={assess} active={isActive(2)} lang={lang} />
      <BackgroundSlide data={assess} active={isActive(3)} lang={lang} />

      {/* Phase 2 divider + PICOT slides */}
      <DividerSlide title={lang === 'zh' ? '形成問題' : 'Ask'} subtitle="PICOT" active={isActive(4)} slideNum={4} />
      {ask.picots.map((picot, idx) => (
        <PicotSlide key={picot.id} picot={picot} idx={idx} active={isActive(4)} lang={lang} />
      ))}

      {/* Phase 3 divider + search */}
      <DividerSlide title={lang === 'zh' ? '文獻檢索' : 'Acquire'} subtitle="Search & Screen" active={isActive(6)} slideNum={6} />
      <SearchSlide data={acquire} active={isActive(7)} lang={lang} />

      {/* Phase 4 slides */}
      <DividerSlide title={lang === 'zh' ? '文獻評讀' : 'Appraise'} subtitle="CASP + GRADE" active={isActive(9)} slideNum={8} />
      <CaspSlide data={appraise} active={isActive(9)} lang={lang} />
      <GradeSlide data={appraise} active={isActive(11)} lang={lang} />

      {/* Phase 5 slides */}
      <DividerSlide title={lang === 'zh' ? '臨床應用' : 'Apply'} subtitle="Evidence → Decision" active={isActive(12)} slideNum={12} />
      <EtdSlide data={apply} active={isActive(13)} lang={lang} />
      <RecommendationSlide data={apply} active={isActive(14)} lang={lang} />

      {/* Thank you slide */}
      <Slide active={isActive(15)} slideNum={15} label={lang === 'zh' ? '結尾' : 'End'}>
        <div className="flex-1 flex items-center justify-center">
          <div style={{ color: TEAL, fontWeight: 700, fontSize: '10px', fontStyle: 'italic' }}>
            THANK YOU
          </div>
        </div>
      </Slide>
    </div>
  );
}
