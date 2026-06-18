// Maps an internal project (projectSchema shape) -> the "case JSON" export shape
// (see case-q1/q3/q4.json). This is the page's PRIMARY output. It is a pure,
// monolingual (zh) restructuring of what the 5-phase form collects — no PPTX
// template involved. Keep field names in sync with the sample case files.

const num = (v) => (Number.isFinite(+v) && +v !== 0 ? +v : (v === 0 ? 0 : (+v || 0)));
const str = (v) => (v == null ? "" : String(v));
const joinArr = (v) => (Array.isArray(v) ? v.filter((s) => String(s).trim()).join(", ") : str(v));
const listArr = (v) => (Array.isArray(v) ? v.filter((s) => String(s).trim()) : (str(v).trim() ? str(v).split("\n").map((s) => s.trim()).filter(Boolean) : []));

// internal verdict -> CASP-style verdict used in the sample files
function caspVerdict(v) {
  if (v === "yes") return "Yes";
  if (v === "no") return "No";
  if (v === "uncertain") return "Can't tell";
  return v || "";
}

// GRADE total downgrade -> certainty word (matches the sample files' vocabulary).
function deriveCertainty(total) {
  if (total >= 0) return "high";
  if (total === -1) return "moderate";
  if (total === -2) return "low";
  return "very-low";
}

// CASP-SR question text (zh) as written in the sample case files.
const CASP_Q = {
  q1: "是否明確提出研究問題？",
  q2: "是否針對適當的研究設計？",
  q3a: "文獻搜尋是否完整？",
  q3b: "文獻篩選是否適當？",
  q3c: "文獻納入標準是否合理？",
  q3d: "檢索策略是否充分？（總結）",
  q4: "是否評估原始研究的效度（偏差風險）？",
  q5a: "資料擷取是否適當？",
  q5b: "資料呈現是否適當？",
  q6: "合併分析（統合）是否適當？",
  q6_1: "整體結果為何、效果量是否明確？",
  q6_2: "結果的精確度如何（信賴區間）？",
  q7: "是否討論研究限制與可應用性？",
};
const CASP_ORDER = ["q1", "q2", "q3a", "q3b", "q3c", "q3d", "q4", "q5a", "q5b", "q6", "q6_1", "q6_2", "q7"];

const ETD_LABELS = {
  benefitRisk: "利益與風險",
  evidenceQuality: "證據品質",
  valuesPreferences: "價值與偏好",
  costEffectiveness: "成本效益",
  feasibility: "可行性",
  acceptability: "可接受性",
};
const ETD_ORDER = ["benefitRisk", "evidenceQuality", "valuesPreferences", "costEffectiveness", "feasibility", "acceptability"];

function caseOutcome(o) {
  const g = o?.grade || {};
  const dec = (d) => Number(g?.[d]?.decision) || 0;
  const total = dec("riskOfBias") + dec("imprecision") + dec("inconsistency") + dec("indirectness") + dec("publicationBias");
  const incNote = g.inconsistency?.note
    || [g.inconsistency?.i2 && `I² ${g.inconsistency.i2}`, g.inconsistency?.overlap, g.inconsistency?.distribution]
        .filter(Boolean).join("；");
  return {
    name: str(o.name),
    category: str(o.category),
    sampleSize: str(o.sampleSize),
    effectSize: str(o.effectSize),
    ci95: str(o.ci95),
    pValue: str(o.pValue),
    nnt: o.nnt ? str(o.nnt) : null,
    nnh: o.nnh ? str(o.nnh) : null,
    grade: {
      riskOfBias: dec("riskOfBias"), riskOfBiasNote: str(g.riskOfBias?.note),
      imprecision: dec("imprecision"), imprecisionNote: str(g.imprecision?.note || g.imprecision?.magnitude),
      inconsistency: dec("inconsistency"), inconsistencyNote: str(incNote),
      indirectness: dec("indirectness"), indirectnessNote: str(g.indirectness?.note),
      publicationBias: dec("publicationBias"), publicationBiasNote: str(g.publicationBias?.note),
      totalDowngrade: total,
      certainty: g.certainty || deriveCertainty(total),
    },
  };
}

export function toCaseJson(project) {
  const meta = project?.meta || {};
  const assess = project?.assess || {};
  const ask = project?.ask || {};
  const acquire = project?.acquire || {};
  const appraise = project?.appraise || {};
  const apply = project?.apply || {};

  const kw = acquire.keywords || {};
  const flow = acquire.screeningFlow || {};
  const picots = (ask.picots || []).map((p, i) => ({
    label: `PICOT-${i + 1}`,
    questionType: p.questionType || "",
    isPrimary: !!p.isPrimary,
    p: str(p.p), i: str(p.i), c: str(p.c), o: str(p.o), t: str(p.t),
    ...(p.justification ? { justification: str(p.justification) } : {}),
  }));

  const caspScores = CASP_ORDER.map((id) => {
    const s = appraise.casp?.scores?.[id] || {};
    return {
      id,
      question: CASP_Q[id] || id,
      human: caspVerdict(s.human),
      ai: caspVerdict(s.aiScore || s.human),
      evidence: str(s.evidence),
    };
  });

  const mid = appraise.grade?.mid || {};
  const rec = meta.recommendation || {};
  const etd = apply.evidenceToDecision || {};

  return {
    meta: {
      caseId: str(meta.id),
      title: str(meta.title),
      members: (meta.members || []).filter((m) => String(m).trim()),
      institution: str(meta.institution),
      division: str(meta.division),
      competition: str(meta.competition),
      recommendation: {
        strength: rec.strength || apply.recommendationStrength || "",
        direction: rec.direction || "",
        label: rec.label || etd.recommendationLabel || "",
        certaintyLevel: rec.certaintyLevel || appraise.grade?.certaintyLevel || "",
      },
    },
    assess: {
      scenario: str(assess.scenario),
      patientProfile: {
        age: str(assess.patientProfile?.age),
        sex: str(assess.patientProfile?.sex),
        condition: str(assess.patientProfile?.condition),
        setting: str(assess.patientProfile?.setting),
      },
      patientPreferences: str(assess.patientPreferences),
      clinicalQuestions: listArr(assess.clinicalQuestions),
      backgroundKnowledge: {
        diseaseOverview: str(assess.backgroundKnowledge?.diseaseOverview),
        riskFactors: str(assess.backgroundKnowledge?.riskFactors),
        treatmentOptions: str(assess.backgroundKnowledge?.treatmentOptions),
      },
      treatmentIssues: (assess.treatmentArms || [])
        .filter((a) => a && (a.name || a.course || a.issue))
        .map((a) => ({ name: str(a.name), regimen: str(a.course), issue: str(a.issue) })),
      sources: str(assess.sources),
    },
    ask: {
      picots,
      picotSelectionRationale: str(ask.picotSelectionRationale),
    },
    acquire: {
      databases: (acquire.databases || []).filter((d) => d && (d.name || d.rationale))
        .map((d) => ({ name: str(d.name), rationale: str(d.rationale) })),
      keywords: {
        note: str(kw.note),
        freeText: { p: joinArr(kw.freeText?.p), i: joinArr(kw.freeText?.i), c: joinArr(kw.freeText?.c), o: joinArr(kw.freeText?.o) },
        meshTerms: { p: joinArr(kw.meshTerms?.p), i: joinArr(kw.meshTerms?.i), c: joinArr(kw.meshTerms?.c), o: joinArr(kw.meshTerms?.o) },
        booleanStrategy: str(kw.booleanStrategy),
      },
      screeningFlow: {
        initialResults: {
          pubmed: num(flow.initialResults?.pubmed),
          embase: num(flow.initialResults?.embase),
          cochrane: num(flow.initialResults?.cochrane),
        },
        afterLitSuggest: num(flow.afterLitSuggest),
        afterSRFilter: num(flow.afterSRFilter),
        afterTitleAbstract: num(flow.afterTitleAbstract),
        afterFullText: num(flow.afterFullText),
        finalIncluded: num(flow.finalIncluded),
      },
      selectedArticle: {
        title: str(acquire.selectedArticle?.title),
        authors: str(acquire.selectedArticle?.authors),
        journal: str(acquire.selectedArticle?.journal),
        year: acquire.selectedArticle?.year || "",
        pmid: str(acquire.selectedArticle?.pmid),
        studyType: str(acquire.selectedArticle?.studyType),
        rctCount: num(acquire.selectedArticle?.rctCount),
        totalParticipants: num(acquire.selectedArticle?.totalParticipants),
        selectionRationale: str(acquire.selectedArticle?.selectionRationale),
      },
      alternativeArticles: (acquire.alternativeArticles || [])
        .filter((a) => a && (a.title || a.brief))
        .map((a) => ({ title: str(a.title), studyCount: num(a.studyCount), participants: num(a.participants), brief: str(a.brief) })),
    },
    appraise: {
      casp: {
        tool: appraise.casp?.tool || "CASP-SR",
        kappa: appraise.casp?.kappa ?? null,
        comment: str(appraise.casp?.comment),
        scores: caspScores,
      },
      results: {
        comment: str(appraise.results?.comment),
        outcomes: (appraise.results?.outcomes || []).filter((o) => o && o.name).map(caseOutcome),
        forestPlotImage: appraise.results?.forestPlotImage ?? null,
        funnelPlotImage: appraise.results?.funnelPlotImage ?? null,
      },
      mid: {
        value: mid.value ?? "",
        unit: str(mid.unit),
        outcome: str(mid.outcome),
        method: str(mid.method),
        derivation: str(mid.derivation || mid.justification),
        reference: str(mid.reference),
        isNullThreshold: !!mid.isNullThreshold,
      },
      supportingRCT: {
        comment: str(appraise.supportingRCT?.comment),
        title: str(appraise.supportingRCT?.title),
        purpose: str(appraise.supportingRCT?.purpose),
        population: str(appraise.supportingRCT?.population),
        intervention: str(appraise.supportingRCT?.intervention),
        outcome: str(appraise.supportingRCT?.outcome),
        conclusion: str(appraise.supportingRCT?.conclusion),
      },
      additionalAnalysis: (appraise.additionalAnalysis || [])
        .filter((a) => a && (a.title || a.result))
        .map((a) => ({ comment: str(a.comment), title: str(a.title), method: str(a.method), result: str(a.result) })),
    },
    apply: {
      applicability: {
        rows: (apply.applicability?.rows || [])
          .filter((r) => r && (r.item || r.study || r.case_))
          .map((r) => ({ item: str(r.item), study: str(r.study), case: str(r.case_), similarity: str(r.similarity) })),
        conclusion: str(apply.applicability?.conclusion || apply.applicability?.rationale),
      },
      efficacySummary: {
        effect: str(apply.efficacySummary?.effect),
        midComparison: str(apply.efficacySummary?.midComparison),
        certainty: str(apply.efficacySummary?.certainty),
        nnt: str(apply.efficacySummary?.nnt),
      },
      benefitRisk: {
        options: (apply.benefitRisk?.options || [])
          .filter((o) => o && o.name)
          .map((o) => ({ name: str(o.name), benefits: listArr(o.benefits), risks: listArr(o.risks) })),
      },
      costAnalysis: {
        options: (apply.costAnalysis?.options || [])
          .filter((o) => o && o.name)
          .map((o) => ({ name: str(o.name), directCost: listArr(o.directCost), indirectCost: listArr(o.indirectCost), totalAnnual: str(o.totalCost) })),
      },
      evidenceToDecision: {
        reference: str(etd.reference),
        factors: ETD_ORDER.map((key) => ({
          key,
          label: ETD_LABELS[key],
          assessment: str(etd[key]?.assessment),
          direction: Number(etd[key]?.direction) || 0,
        })),
        recommendationStrength: apply.recommendationStrength || rec.strength || "",
        recommendationLabel: str(etd.recommendationLabel || rec.label),
        reasonForConditional: str(etd.reasonForConditional),
      },
      patientSummary: str(apply.patientSummary),
    },
  };
}

function safeName(s) {
  return (s || "EBM").replace(/[\\/:*?"<>|]+/g, "_").slice(0, 80);
}

export function downloadCaseJson(project) {
  const data = toCaseJson(project);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${safeName(project?.meta?.title)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
