import React, { useMemo } from 'react';
import { HamsterNeutral, HamsterCelebrating } from './Hamster';

// 5 stop positions on the S-curve trail (percentages for responsive layout)
// Trail snakes: left → right → left → right → left
const STOP_POSITIONS = [
  { xPct: 15, y: 60 },   // Stop 1: top-left
  { xPct: 75, y: 180 },  // Stop 2: right
  { xPct: 18, y: 300 },  // Stop 3: left
  { xPct: 75, y: 420 },  // Stop 4: right
  { xPct: 28, y: 540 },  // Stop 5: bottom-left
];

const SVG_WIDTH = 600;
const SVG_HEIGHT = 620;

// Convert xPct to SVG x coordinate
const toX = (pct) => (pct / 100) * SVG_WIDTH;

// Build the S-curve path through all 5 stops
function buildTrailPath() {
  const pts = STOP_POSITIONS.map((s) => ({ x: toX(s.xPct), y: s.y }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const curr = pts[i];
    const next = pts[i + 1];
    const midY = (curr.y + next.y) / 2;
    d += ` C ${curr.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
  }
  return d;
}

const TRAIL_PATH = buildTrailPath();

// Cheese icon SVG (small reward marker)
function CheeseIcon({ x, y, opacity = 0.2 }) {
  return (
    <g transform={`translate(${x - 8}, ${y - 8})`} opacity={opacity}>
      <path d="M0 12 L8 0 L16 12 Z" fill="#F1C40F" />
      <circle cx="5" cy="8" r="1.5" fill="#E67E22" opacity="0.5" />
      <circle cx="11" cy="9" r="1" fill="#E67E22" opacity="0.5" />
    </g>
  );
}

// Footprint dots between stops (completed trail)
function Footprints({ fromIdx, toIdx }) {
  const from = STOP_POSITIONS[fromIdx];
  const to = STOP_POSITIONS[toIdx];
  const count = 4;
  const dots = [];
  for (let i = 1; i <= count; i++) {
    const t = i / (count + 1);
    // Approximate position along the curve segment
    const x = toX(from.xPct) + (toX(to.xPct) - toX(from.xPct)) * t;
    const y = from.y + (to.y - from.y) * t;
    dots.push(
      <circle key={`fp-${fromIdx}-${i}`} cx={x} cy={y} r="2.5"
        fill="#8B6914" opacity="0.2" />
    );
  }
  return <>{dots}</>;
}

// Single stop node
function StopNode({ index, phase, status, lang, onClick }) {
  const pos = STOP_POSITIONS[index];
  const x = toX(pos.xPct);
  const y = pos.y;

  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isLocked = status === "locked";

  const radius = 32;

  // Colors
  const fillColor = isCompleted ? "#E1F5EE" : isCurrent ? "#FAEEDA" : "#F3F4F6";
  const strokeColor = isCompleted ? "#0F6E56" : isCurrent ? "#BA7517" : "#D1D5DB";
  const strokeWidth = isCurrent ? 3 : 2;

  return (
    <g
      className="cursor-pointer"
      onClick={() => onClick(index)}
      style={{ transition: "transform 0.3s" }}
    >
      {/* Glow ring for current */}
      {isCurrent && (
        <circle cx={x} cy={y} r={radius + 6} fill="none"
          stroke="#BA7517" strokeWidth="1" opacity="0.25">
          <animate attributeName="r" values={`${radius + 4};${radius + 8};${radius + 4}`}
            dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0.1;0.25"
            dur="2s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Circle background */}
      <circle cx={x} cy={y} r={radius} fill={fillColor}
        stroke={strokeColor} strokeWidth={strokeWidth} />

      {/* Number or lock */}
      {isLocked ? (
        <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central"
          fontSize="16" fill="#9CA3AF" fontFamily="sans-serif">
          🔒
        </text>
      ) : (
        <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central"
          fontSize="18" fontWeight="600"
          fill={isCompleted ? "#085041" : isCurrent ? "#854F0B" : "#9CA3AF"}
          fontFamily="sans-serif">
          {index + 1}
        </text>
      )}

      {/* Check badge for completed */}
      {isCompleted && (
        <g transform={`translate(${x + radius * 0.55}, ${y - radius * 0.55})`}>
          <circle cx="0" cy="0" r="10" fill="#0F6E56" />
          <path d="M-4 0 L-1 3 L4 -2" fill="none" stroke="#fff"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {/* Phase label below */}
      <text x={x} y={y + radius + 18} textAnchor="middle"
        fontSize="13" fontWeight="500"
        fill={isLocked ? "#9CA3AF" : "#374151"}
        fontFamily="sans-serif">
        {phase.zh}
      </text>
      <text x={x} y={y + radius + 34} textAnchor="middle"
        fontSize="11" fill="#9CA3AF" fontFamily="sans-serif">
        {phase.en}
      </text>
    </g>
  );
}

export default function MazeTrail({ currentPhase, onStopClick, lang }) {
  // currentPhase: 1-5 (from project.meta.currentPhase)
  // The hamster sits at the current phase stop
  const activeIndex = Math.max(0, Math.min(4, (currentPhase || 1) - 1));

  const phases = [
    { zh: "評估案例", en: "Assess" },
    { zh: "形成問題", en: "Ask" },
    { zh: "文獻檢索", en: "Acquire" },
    { zh: "文獻評讀", en: "Appraise" },
    { zh: "臨床應用", en: "Apply" },
  ];

  // Compute path progress for the green overlay
  // Each segment is ~25% of path
  const progressPct = useMemo(() => {
    return (activeIndex / 4) * 100;
  }, [activeIndex]);

  const hamsterPos = STOP_POSITIONS[activeIndex];
  const hamsterX = toX(hamsterPos.xPct);
  const hamsterY = hamsterPos.y;

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        width="100%"
        className="overflow-visible"
      >
        {/* Background trail */}
        <path d={TRAIL_PATH} fill="none"
          stroke="#E5E7EB" strokeWidth="32" strokeLinecap="round" opacity="0.5" />

        {/* Completed trail overlay */}
        <path d={TRAIL_PATH} fill="none"
          stroke="#5DCAA5" strokeWidth="32" strokeLinecap="round" opacity="0.2"
          strokeDasharray="2000"
          strokeDashoffset={2000 - (2000 * progressPct / 100)}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />

        {/* Dashed center line */}
        <path d={TRAIL_PATH} fill="none"
          stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.5" />

        {/* Decorative maze wall segments */}
        <path d="M 50 30 L 50 80 L 140 80" fill="none" stroke="#E5E7EB" strokeWidth="1" opacity="0.4" />
        <path d="M 500 140 L 530 140 L 530 220 L 470 220" fill="none" stroke="#E5E7EB" strokeWidth="1" opacity="0.4" />
        <path d="M 70 260 L 40 260 L 40 340 L 130 340" fill="none" stroke="#E5E7EB" strokeWidth="1" opacity="0.4" />
        <path d="M 500 380 L 530 380 L 530 460 L 470 460" fill="none" stroke="#E5E7EB" strokeWidth="1" opacity="0.4" />
        <path d="M 130 500 L 100 500 L 100 580 L 200 580" fill="none" stroke="#E5E7EB" strokeWidth="1" opacity="0.4" />

        {/* Cheese markers at future stops */}
        {STOP_POSITIONS.map((pos, i) => (
          i > activeIndex && (
            <CheeseIcon key={`cheese-${i}`} x={toX(pos.xPct)} y={pos.y - 40} opacity={0.15} />
          )
        ))}

        {/* Footprints on completed segments */}
        {Array.from({ length: activeIndex }, (_, i) => (
          <Footprints key={`footprints-${i}`} fromIdx={i} toIdx={i + 1} />
        ))}

        {/* Stop nodes */}
        {phases.map((phase, i) => {
          let status = "locked";
          if (i < activeIndex) status = "completed";
          else if (i === activeIndex) status = "current";
          return (
            <StopNode
              key={i}
              index={i}
              phase={phase}
              status={status}
              lang={lang}
              onClick={onStopClick}
            />
          );
        })}
      </svg>

      {/* Hamster overlay — positioned over the current stop */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${hamsterPos.xPct}%`,
          top: `${(hamsterY / SVG_HEIGHT) * 100}%`,
          transform: "translate(-50%, -120%)",
          transition: "left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {activeIndex >= 4 ? (
          <HamsterCelebrating size={44} />
        ) : (
          <HamsterNeutral size={44} />
        )}
      </div>
    </div>
  );
}
