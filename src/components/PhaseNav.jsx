import React from 'react';
import { useLang } from '../App';
import { t } from '../i18n';

const phases = [
  { num: 1, key: "phase1", icon: "🔍" },
  { num: 2, key: "phase2", icon: "❓" },
  { num: 3, key: "phase3", icon: "📚" },
  { num: 4, key: "phase4", icon: "⚖️" },
  { num: 5, key: "phase5", icon: "💊" },
];

export default function PhaseNav({ currentPhase, onPhaseClick, completedPhases = [] }) {
  const { lang } = useLang();

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto py-4">
      {phases.map(({ num, key, icon }, idx) => {
        const isActive = currentPhase === num;
        const isCompleted = completedPhases.includes(num);
        const isPast = num < currentPhase;

        return (
          <React.Fragment key={num}>
            {/* Connector line */}
            {idx > 0 && (
              <div className="flex-1 h-0.5 mx-1">
                <div
                  className={`h-full rounded-full transition-colors ${
                    isPast || isCompleted ? "bg-teal-400" : "bg-gray-200"
                  }`}
                />
              </div>
            )}

            {/* Phase circle */}
            <button
              onClick={() => onPhaseClick?.(num)}
              className={`flex flex-col items-center group relative ${
                onPhaseClick ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                  isActive
                    ? "bg-teal-500 text-white shadow-lg shadow-teal-200 scale-110"
                    : isCompleted || isPast
                    ? "bg-teal-100 text-teal-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? "✓" : icon}
              </div>
              <span
                className={`text-xs mt-1 font-medium whitespace-nowrap ${
                  isActive ? "text-teal-700" : "text-gray-400"
                }`}
              >
                {t(key, lang)}
              </span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
