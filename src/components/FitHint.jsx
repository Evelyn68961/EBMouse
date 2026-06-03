import React from 'react';
import { useLang } from '../App';

/*
 * FitHint — live character counter + gentle overflow warning for fields that
 * get poured into the fixed-size .pptx slide boxes. Keeps font sizes consistent
 * (the deck never shrinks text), so the guidance is: keep entries within `max`
 * or they may overflow the slide box and need a quick manual nudge.
 */
export default function FitHint({ value = '', max }) {
  const { lang } = useLang();
  const len = (value || '').length;
  const over = len > max;
  return (
    <div className={`mt-1 flex items-center justify-end gap-1 text-[11px] ${over ? 'text-amber-600' : 'text-gray-400'}`}>
      <span>{len}/{max}</span>
      {over && (
        <span>{lang === 'zh' ? '· 可能超出簡報版面，建議精簡' : '· may overflow the slide — consider trimming'}</span>
      )}
    </div>
  );
}
