// src/components/EffectScale.jsx
// Visualization of the 7-category effect-size scale from GRADE Guidance 35.
// Shows: Large benefit | Moderate | Small | Trivial/None | Small | Moderate | Large harm
// Optionally overlays a point estimate + CI bar for assessing imprecision.

import React from 'react';

// Default colors (matched to existing palette)
const C = {
  benefitLarge: '#0E7C86',
  benefitModerate: '#2980B9',
  benefitSmall: '#5DADE2',
  trivial: '#F4F6F7',
  harmSmall: '#F5B041',
  harmModerate: '#E67E22',
  harmLarge: '#C0392B',
  threshold: '#7F8C8D',
  midThreshold: '#0E7C86',
  null: '#34495E',
  ci: '#1A1A1A',
  pointEst: '#0E7C86',
  ciCrosses: '#E74C3C',
};

/**
 * EffectScale — 7-category effect size scale per Guidance 35.
 *
 * Props:
 * - thresholds: { small, moderate, large } — symmetric absolute values around 0
 *   e.g. { small: 10, moderate: 25, large: 50 } means
 *   small benefit threshold at -10, moderate at -25, large at -50,
 *   small harm threshold at +10, moderate at +25, large at +50.
 * - pointEst, ciLow, ciHigh: optional. If provided, draws a CI bar overlay.
 *   In same units as thresholds. Negative = benefit, positive = harm.
 * - unit: { zh, en } — display unit string (e.g. "per 1000")
 * - outcomeLabel: { zh, en } — outcome name shown above the scale
 * - lang: 'zh' | 'en'
 * - convention: 'lower-better' (default) — negative = benefit, positive = harm.
 *   Set to 'higher-better' to flip the meaning of left/right.
 * - showCategoryLabels: boolean (default true) — show "Large benefit" etc. labels below
 * - showThresholdValues: boolean (default true) — show numeric values at threshold lines
 * - height: pixel height of the scale (default 80)
 */
export default function EffectScale({
  thresholds = { small: 10, moderate: 25, large: 50 },
  pointEst,
  ciLow,
  ciHigh,
  unit = { zh: '', en: '' },
  outcomeLabel,
  lang = 'en',
  convention = 'lower-better',
  showCategoryLabels = true,
  showThresholdValues = true,
  height = 80,
}) {
  const { small, moderate, large } = thresholds;

  // Compute view bounds. Make sure they accommodate CI if provided.
  const baseExtent = large * 1.25;
  const viewMin = -Math.max(baseExtent, ciLow !== undefined ? Math.abs(ciLow) * 1.05 : 0, ciHigh !== undefined ? Math.abs(ciHigh) * 1.05 : 0);
  const viewMax = -viewMin; // symmetric

  // Scale from data units to SVG x (0..1000)
  const SVG_W = 1000;
  const PAD_X = 30;
  const drawW = SVG_W - 2 * PAD_X;
  const toX = (v) => PAD_X + ((v - viewMin) / (viewMax - viewMin)) * drawW;

  // Threshold positions
  const xLargeBen = toX(-large);
  const xModBen = toX(-moderate);
  const xSmallBen = toX(-small);
  const xNull = toX(0);
  const xSmallHarm = toX(small);
  const xModHarm = toX(moderate);
  const xLargeHarm = toX(large);
  const xMin = toX(viewMin);
  const xMax = toX(viewMax);

  // CI overlay
  const hasCI = pointEst !== undefined && ciLow !== undefined && ciHigh !== undefined;
  let xPoint, xCiL, xCiH, ciCrossesAny = false;
  if (hasCI) {
    xPoint = toX(pointEst);
    xCiL = toX(ciLow);
    xCiH = toX(ciHigh);
    // Count thresholds the CI crosses
    const allThresholds = [-large, -moderate, -small, small, moderate, large];
    ciCrossesAny = allThresholds.some(t => ciLow < t && ciHigh > t);
  }

  // Apply convention: lower-better means left=benefit, right=harm (default in figure)
  // higher-better flips: left=harm, right=benefit
  const benefitLabel = lang === 'zh' ? '有益效果' : 'Desirable effect';
  const harmLabel = lang === 'zh' ? '有害效果' : 'Undesirable effect';
  const leftLabel = convention === 'lower-better' ? benefitLabel : harmLabel;
  const rightLabel = convention === 'lower-better' ? harmLabel : benefitLabel;

  const cats = [
    { from: xMin, to: xLargeBen, color: C.benefitLarge, labelZh: '大益', labelEn: 'Large' },
    { from: xLargeBen, to: xModBen, color: C.benefitModerate, labelZh: '中益', labelEn: 'Moderate' },
    { from: xModBen, to: xSmallBen, color: C.benefitSmall, labelZh: '小益', labelEn: 'Small' },
    { from: xSmallBen, to: xSmallHarm, color: C.trivial, labelZh: '微小／無', labelEn: 'Trivial / none' },
    { from: xSmallHarm, to: xModHarm, color: C.harmSmall, labelZh: '小害', labelEn: 'Small' },
    { from: xModHarm, to: xLargeHarm, color: C.harmModerate, labelZh: '中害', labelEn: 'Moderate' },
    { from: xLargeHarm, to: xMax, color: C.harmLarge, labelZh: '大害', labelEn: 'Large' },
  ];
  // For higher-better, reverse colors but keep positions
  const renderCats = convention === 'lower-better' ? cats : [...cats].reverse().map((c, i) => ({ ...c, from: cats[i].from, to: cats[i].to }));

  const VIEW_H = hasCI ? height + 30 : height;
  const SCALE_TOP = 25;
  const SCALE_HEIGHT = 30;
  const CI_Y = SCALE_TOP + SCALE_HEIGHT + 18;

  return (
    <div className="my-4">
      {outcomeLabel && (
        <p className="text-xs font-semibold text-gray-700 mb-1.5">
          {lang === 'zh' ? outcomeLabel.zh : outcomeLabel.en}
        </p>
      )}
      <svg viewBox={`0 0 ${SVG_W} ${VIEW_H + (showCategoryLabels ? 25 : 0)}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Top: side labels */}
        <text x={PAD_X} y="12" fontSize="11" fill="#5D6D7E" fontWeight="600">← {leftLabel}</text>
        <text x={SVG_W - PAD_X} y="12" fontSize="11" fill="#5D6D7E" fontWeight="600" textAnchor="end">{rightLabel} →</text>

        {/* Colored bands */}
        {renderCats.map((c, i) => (
          <rect
            key={i}
            x={c.from}
            y={SCALE_TOP}
            width={Math.max(0, c.to - c.from)}
            height={SCALE_HEIGHT}
            fill={c.color}
            opacity={i === 3 ? 1 : 0.85}
            stroke="#fff"
            strokeWidth="1"
          />
        ))}

        {/* Threshold lines */}
        {[
          { x: xLargeBen, label: -large, key: 'lb' },
          { x: xModBen, label: -moderate, key: 'mb' },
          { x: xSmallBen, label: -small, key: 'sb', isMid: true },
          { x: xNull, label: 0, key: 'null', isNull: true },
          { x: xSmallHarm, label: small, key: 'sh', isMid: true },
          { x: xModHarm, label: moderate, key: 'mh' },
          { x: xLargeHarm, label: large, key: 'lh' },
        ].map(t => (
          <g key={t.key}>
            <line
              x1={t.x}
              y1={SCALE_TOP - 4}
              x2={t.x}
              y2={SCALE_TOP + SCALE_HEIGHT + 4}
              stroke={t.isNull ? C.null : t.isMid ? C.midThreshold : C.threshold}
              strokeWidth={t.isNull || t.isMid ? '1.5' : '1'}
              strokeDasharray={t.isNull ? '0' : '3,2'}
            />
            {showThresholdValues && (
              <text x={t.x} y={SCALE_TOP - 7} fontSize="9" textAnchor="middle"
                fill={t.isNull ? C.null : t.isMid ? C.midThreshold : '#7F8C8D'}
                fontWeight={t.isNull || t.isMid ? '700' : '500'}>
                {t.isNull ? (lang === 'zh' ? 'null' : 'null') : t.label > 0 ? `+${t.label}` : t.label}
                {t.isMid ? (lang === 'zh' ? ' (MID)' : ' (MID)') : ''}
              </text>
            )}
          </g>
        ))}

        {/* CI overlay */}
        {hasCI && (
          <g>
            {/* CI bar */}
            <line x1={xCiL} y1={CI_Y} x2={xCiH} y2={CI_Y}
              stroke={ciCrossesAny ? C.ciCrosses : C.ci} strokeWidth="3.5" strokeLinecap="round" />
            {/* CI ends */}
            <line x1={xCiL} y1={CI_Y - 5} x2={xCiL} y2={CI_Y + 5}
              stroke={ciCrossesAny ? C.ciCrosses : C.ci} strokeWidth="2" />
            <line x1={xCiH} y1={CI_Y - 5} x2={xCiH} y2={CI_Y + 5}
              stroke={ciCrossesAny ? C.ciCrosses : C.ci} strokeWidth="2" />
            {/* Point estimate */}
            <circle cx={xPoint} cy={CI_Y} r="5" fill={C.pointEst} stroke="#fff" strokeWidth="1.5" />
            {/* Numeric labels */}
            <text x={xPoint} y={CI_Y - 10} fontSize="10" textAnchor="middle" fill={C.pointEst} fontWeight="700">
              {pointEst}
            </text>
            <text x={xCiL} y={CI_Y + 18} fontSize="9" textAnchor="middle" fill="#7F8C8D">{ciLow}</text>
            <text x={xCiH} y={CI_Y + 18} fontSize="9" textAnchor="middle" fill="#7F8C8D">{ciHigh}</text>
          </g>
        )}

        {/* Bottom: category labels */}
        {showCategoryLabels && (
          <g>
            {renderCats.map((c, i) => {
              const cx = (c.from + c.to) / 2;
              return (
                <text key={i} x={cx} y={VIEW_H + 18} fontSize="9.5" textAnchor="middle"
                  fill={i === 3 ? '#7F8C8D' : '#fff'} fontWeight="600"
                  style={{ filter: i === 3 ? 'none' : 'drop-shadow(0 0 1px rgba(0,0,0,0.4))' }}>
                  {/* Place fill behind text via shadow trick? Just keep dark text on light cells */}
                </text>
              );
            })}
            {/* Better: render labels separately so dark cells get white text and light cells get dark text */}
            {renderCats.map((c, i) => {
              const cx = (c.from + c.to) / 2;
              const isDark = i !== 3;
              const labelText = lang === 'zh' ? c.labelZh : c.labelEn;
              return (
                <text key={`lbl-${i}`} x={cx} y={SCALE_TOP + SCALE_HEIGHT / 2 + 4}
                  fontSize="10" textAnchor="middle"
                  fill={isDark ? '#fff' : '#566573'} fontWeight="600">
                  {labelText}
                </text>
              );
            })}
          </g>
        )}

        {/* Unit footnote */}
        {(unit.zh || unit.en) && (
          <text x={SVG_W / 2} y={VIEW_H + (showCategoryLabels ? 23 : 5)} fontSize="9" textAnchor="middle" fill="#95A5A6" fontStyle="italic">
            {lang === 'zh' ? `單位：${unit.zh}` : `Units: ${unit.en}`}
          </text>
        )}
      </svg>

      {/* CI interpretation hint */}
      {hasCI && (
        <p className="text-xs text-center mt-1" style={{ color: ciCrossesAny ? C.ciCrosses : '#27AE60' }}>
          {ciCrossesAny
            ? (lang === 'zh' ? '⚠️ CI 跨越至少一個閾值 → 考慮扣分' : '⚠️ CI crosses at least one threshold → consider downgrading')
            : (lang === 'zh' ? '✅ CI 未跨越任何閾值 → 不扣分' : '✅ CI does not cross any threshold → no downgrade')}
        </p>
      )}
    </div>
  );
}
