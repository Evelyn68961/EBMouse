// src/pages/reference/CaseCPM2025.jsx
// Wrapper page for the 2025 CPM/TKA competition case
import React from 'react';
import CaseDetail from './CaseDetail';
import cpm2025 from '../../data/cases/cpm2025';

export default function CaseCPM2025() {
  return <CaseDetail caseData={cpm2025} />;
}
