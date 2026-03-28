// src/pages/reference/CaseAtropine2024.jsx
// Wrapper page for the 2024 Atropine Myopia competition case
import React from 'react';
import CaseDetail from './CaseDetail';
import atropine2024 from '../../data/cases/atropine2024';

export default function CaseAtropine2024() {
  return <CaseDetail caseData={atropine2024} />;
}
