import React from 'react';

const baseColors = {
  body: '#8B6914',
  belly: '#D4A843',
  dark: '#5C4510',
  nose: '#E8A0B0',
  ear: '#D4956A',
  eye: '#1B2838',
  cheek: '#F0C090',
  white: '#FFFFFF',
};

// Neutral / Welcome — standing, friendly smile
export function HamsterNeutral({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Body */}
      <ellipse cx="32" cy="38" rx="18" ry="20" fill={baseColors.body} />
      <ellipse cx="32" cy="42" rx="12" ry="14" fill={baseColors.belly} />
      {/* Ears */}
      <ellipse cx="20" cy="16" rx="7" ry="8" fill={baseColors.ear} />
      <ellipse cx="20" cy="16" rx="4" ry="5" fill={baseColors.nose} />
      <ellipse cx="44" cy="16" rx="7" ry="8" fill={baseColors.ear} />
      <ellipse cx="44" cy="16" rx="4" ry="5" fill={baseColors.nose} />
      {/* Head */}
      <ellipse cx="32" cy="26" rx="16" ry="14" fill={baseColors.body} />
      {/* Eyes */}
      <circle cx="26" cy="24" r="3" fill={baseColors.eye} />
      <circle cx="38" cy="24" r="3" fill={baseColors.eye} />
      <circle cx="27" cy="23" r="1" fill={baseColors.white} />
      <circle cx="39" cy="23" r="1" fill={baseColors.white} />
      {/* Cheeks */}
      <ellipse cx="21" cy="29" rx="4" ry="3" fill={baseColors.cheek} opacity="0.6" />
      <ellipse cx="43" cy="29" rx="4" ry="3" fill={baseColors.cheek} opacity="0.6" />
      {/* Nose */}
      <ellipse cx="32" cy="28" rx="2" ry="1.5" fill={baseColors.nose} />
      {/* Smile */}
      <path d="M28 31 Q32 35 36 31" stroke={baseColors.dark} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Paws */}
      <ellipse cx="22" cy="52" rx="4" ry="3" fill={baseColors.body} />
      <ellipse cx="42" cy="52" rx="4" ry="3" fill={baseColors.body} />
    </svg>
  );
}

// Thinking — paw on chin, one eyebrow raised
export function HamsterThinking({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="32" cy="38" rx="18" ry="20" fill={baseColors.body} />
      <ellipse cx="32" cy="42" rx="12" ry="14" fill={baseColors.belly} />
      <ellipse cx="20" cy="16" rx="7" ry="8" fill={baseColors.ear} />
      <ellipse cx="20" cy="16" rx="4" ry="5" fill={baseColors.nose} />
      <ellipse cx="44" cy="16" rx="7" ry="8" fill={baseColors.ear} />
      <ellipse cx="44" cy="16" rx="4" ry="5" fill={baseColors.nose} />
      <ellipse cx="32" cy="26" rx="16" ry="14" fill={baseColors.body} />
      {/* Eyes — one looking up */}
      <circle cx="26" cy="24" r="3" fill={baseColors.eye} />
      <circle cx="38" cy="23" r="3" fill={baseColors.eye} />
      <circle cx="27" cy="23" r="1" fill={baseColors.white} />
      <circle cx="39" cy="21.5" r="1" fill={baseColors.white} />
      {/* Raised eyebrow */}
      <path d="M35 18 Q38 16 41 18" stroke={baseColors.dark} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="21" cy="29" rx="4" ry="3" fill={baseColors.cheek} opacity="0.6" />
      <ellipse cx="43" cy="29" rx="4" ry="3" fill={baseColors.cheek} opacity="0.6" />
      <ellipse cx="32" cy="28" rx="2" ry="1.5" fill={baseColors.nose} />
      {/* Thinking mouth — small "hmm" */}
      <path d="M29 31 Q32 32 35 31" stroke={baseColors.dark} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Paw on chin */}
      <ellipse cx="36" cy="33" rx="3.5" ry="2.5" fill={baseColors.body} />
      <ellipse cx="22" cy="52" rx="4" ry="3" fill={baseColors.body} />
      <ellipse cx="42" cy="52" rx="4" ry="3" fill={baseColors.body} />
      {/* Thought dots */}
      <circle cx="50" cy="14" r="1.5" fill={baseColors.dark} opacity="0.3" />
      <circle cx="54" cy="9" r="2" fill={baseColors.dark} opacity="0.3" />
      <circle cx="56" cy="4" r="2.5" fill={baseColors.dark} opacity="0.2" />
    </svg>
  );
}

// Celebrating — arms up, big smile, sparkles
export function HamsterCelebrating({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="32" cy="38" rx="18" ry="20" fill={baseColors.body} />
      <ellipse cx="32" cy="42" rx="12" ry="14" fill={baseColors.belly} />
      <ellipse cx="20" cy="16" rx="7" ry="8" fill={baseColors.ear} />
      <ellipse cx="20" cy="16" rx="4" ry="5" fill={baseColors.nose} />
      <ellipse cx="44" cy="16" rx="7" ry="8" fill={baseColors.ear} />
      <ellipse cx="44" cy="16" rx="4" ry="5" fill={baseColors.nose} />
      <ellipse cx="32" cy="26" rx="16" ry="14" fill={baseColors.body} />
      {/* Happy eyes — curved */}
      <path d="M23 24 Q26 21 29 24" stroke={baseColors.eye} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M35 24 Q38 21 41 24" stroke={baseColors.eye} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Big puffy cheeks */}
      <ellipse cx="20" cy="29" rx="5" ry="4" fill={baseColors.cheek} opacity="0.7" />
      <ellipse cx="44" cy="29" rx="5" ry="4" fill={baseColors.cheek} opacity="0.7" />
      <ellipse cx="32" cy="28" rx="2" ry="1.5" fill={baseColors.nose} />
      {/* Big smile */}
      <path d="M26 30 Q32 37 38 30" stroke={baseColors.dark} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Arms up! */}
      <path d="M14 32 Q10 22 14 16" stroke={baseColors.body} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M50 32 Q54 22 50 16" stroke={baseColors.body} strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Paws at top */}
      <circle cx="14" cy="15" r="3" fill={baseColors.body} />
      <circle cx="50" cy="15" r="3" fill={baseColors.body} />
      {/* Sparkles */}
      <path d="M8 8 L10 4 L12 8 L8 6 L12 6 Z" fill="#F1C40F" />
      <path d="M52 4 L54 0 L56 4 L52 2 L56 2 Z" fill="#F1C40F" />
      <path d="M4 20 L5.5 17 L7 20 L4 18.5 L7 18.5 Z" fill="#E74C3C" />
      <ellipse cx="22" cy="52" rx="4" ry="3" fill={baseColors.body} />
      <ellipse cx="42" cy="52" rx="4" ry="3" fill={baseColors.body} />
    </svg>
  );
}

// Loading — running on wheel (simplified as motion lines)
export function HamsterLoading({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Leaning forward body */}
      <ellipse cx="30" cy="38" rx="16" ry="18" fill={baseColors.body} transform="rotate(-10 30 38)" />
      <ellipse cx="30" cy="42" rx="10" ry="12" fill={baseColors.belly} transform="rotate(-10 30 42)" />
      <ellipse cx="18" cy="16" rx="6" ry="7" fill={baseColors.ear} />
      <ellipse cx="18" cy="16" rx="3.5" ry="4.5" fill={baseColors.nose} />
      <ellipse cx="40" cy="18" rx="6" ry="7" fill={baseColors.ear} />
      <ellipse cx="40" cy="18" rx="3.5" ry="4.5" fill={baseColors.nose} />
      <ellipse cx="30" cy="26" rx="15" ry="13" fill={baseColors.body} />
      {/* Determined eyes */}
      <circle cx="24" cy="24" r="2.5" fill={baseColors.eye} />
      <circle cx="36" cy="24" r="2.5" fill={baseColors.eye} />
      <circle cx="25" cy="23" r="0.8" fill={baseColors.white} />
      <circle cx="37" cy="23" r="0.8" fill={baseColors.white} />
      <ellipse cx="19" cy="29" rx="4" ry="3" fill={baseColors.cheek} opacity="0.5" />
      <ellipse cx="41" cy="29" rx="4" ry="3" fill={baseColors.cheek} opacity="0.5" />
      <ellipse cx="30" cy="28" rx="1.8" ry="1.3" fill={baseColors.nose} />
      <path d="M27 30 Q30 32 33 30" stroke={baseColors.dark} strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Running legs */}
      <path d="M20 50 L14 56" stroke={baseColors.body} strokeWidth="3" strokeLinecap="round" />
      <path d="M38 48 L44 54" stroke={baseColors.body} strokeWidth="3" strokeLinecap="round" />
      {/* Speed lines */}
      <line x1="48" y1="28" x2="58" y2="28" stroke={baseColors.dark} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      <line x1="50" y1="34" x2="60" y2="34" stroke={baseColors.dark} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      <line x1="48" y1="40" x2="56" y2="40" stroke={baseColors.dark} strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
    </svg>
  );
}

// Concerned — tilted head, one ear down, worried mouth
export function HamsterConcerned({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="32" cy="38" rx="18" ry="20" fill={baseColors.body} />
      <ellipse cx="32" cy="42" rx="12" ry="14" fill={baseColors.belly} />
      {/* Left ear normal */}
      <ellipse cx="20" cy="16" rx="7" ry="8" fill={baseColors.ear} />
      <ellipse cx="20" cy="16" rx="4" ry="5" fill={baseColors.nose} />
      {/* Right ear droopy */}
      <ellipse cx="46" cy="20" rx="7" ry="6" fill={baseColors.ear} transform="rotate(20 46 20)" />
      <ellipse cx="46" cy="20" rx="4" ry="3.5" fill={baseColors.nose} transform="rotate(20 46 20)" />
      {/* Head slightly tilted */}
      <ellipse cx="32" cy="26" rx="16" ry="14" fill={baseColors.body} transform="rotate(5 32 26)" />
      {/* Worried eyes — slightly wider */}
      <circle cx="26" cy="24" r="3.5" fill={baseColors.eye} />
      <circle cx="38" cy="24" r="3.5" fill={baseColors.eye} />
      <circle cx="27" cy="22.5" r="1.2" fill={baseColors.white} />
      <circle cx="39" cy="22.5" r="1.2" fill={baseColors.white} />
      {/* Worried eyebrows */}
      <path d="M22 19 Q26 17.5 29 19.5" stroke={baseColors.dark} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M35 19.5 Q38 17.5 42 19" stroke={baseColors.dark} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <ellipse cx="21" cy="29" rx="4" ry="3" fill={baseColors.cheek} opacity="0.5" />
      <ellipse cx="43" cy="29" rx="4" ry="3" fill={baseColors.cheek} opacity="0.5" />
      <ellipse cx="32" cy="28" rx="2" ry="1.5" fill={baseColors.nose} />
      {/* Worried mouth — wavy */}
      <path d="M28 31 Q30 33 32 31 Q34 33 36 31" stroke={baseColors.dark} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="52" rx="4" ry="3" fill={baseColors.body} />
      <ellipse cx="42" cy="52" rx="4" ry="3" fill={baseColors.body} />
      {/* Sweat drop */}
      <path d="M48 14 Q49 10 48 8 Q50 11 48 14 Z" fill="#87CEEB" opacity="0.6" />
    </svg>
  );
}

// Convenience map
const hamsterMap = {
  neutral: HamsterNeutral,
  thinking: HamsterThinking,
  celebrating: HamsterCelebrating,
  loading: HamsterLoading,
  concerned: HamsterConcerned,
};

export default function Hamster({ mood = "neutral", size = 48, className = "" }) {
  const Component = hamsterMap[mood] || HamsterNeutral;
  return <Component size={size} className={className} />;
}
