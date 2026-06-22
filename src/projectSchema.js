import { v4 as uuidv4 } from 'uuid';

// Per-outcome GRADE shape: all five domains live on each outcome (the case JSON
// stores rob/indirectness/publicationBias per-outcome, not body-level, because
// they can differ across outcomes). imprecision/inconsistency keep their extra
// detail fields (used by the PPTX detail slides); every domain has a free-text
// `note` that feeds the *Note fields in the exported case JSON.
export function newOutcomeGrade() {
  return {
    riskOfBias: { decision: 0, note: "" },
    imprecision: { decision: 0, note: "", magnitude: "" },
    inconsistency: { decision: 0, note: "", i2: "", overlap: "", distribution: "" },
    indirectness: { decision: 0, note: "" },
    publicationBias: { decision: 0, note: "" },
    certainty: "", // optional override; transform derives from total when empty
  };
}

export function newOutcome() {
  return {
    name: "", category: "", sampleSize: 0, rctCount: 0,
    effectSize: "", ci95: "", pValue: "", nnt: "", nnh: "",
    subgroups: [],
    grade: newOutcomeGrade(),
  };
}

export function createNewProject(title = "", lang = "zh") {
  return {
    meta: {
      id: uuidv4(),
      title: title || (lang === "zh" ? "新任務" : "New Mission"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentPhase: 1,
      lang,
      members: [],
      // Identity block carried in the case JSON's meta.
      institution: "",
      division: "",
      competition: "",
      // Final recommendation (case JSON meta.recommendation).
      recommendation: { strength: "", direction: "", label: "", certaintyLevel: "" },
    },
    assess: {
      scenario: "",
      topic: "",
      situation: [],
      clinicalQuestions: [],
      patientProfile: { age: "", sex: "", condition: "", setting: "" },
      patientPreferences: "",
      backgroundKnowledge: { diseaseOverview: "", riskFactors: "", treatmentOptions: "" },
      treatmentArms: [
        { name: "", course: "", issue: "" },
        { name: "", course: "", issue: "" },
      ],
      sources: "",
    },
    ask: {
      picots: [
        {
          id: 1,
          p: "", i: "", c: "", o: "", t: "",
          questionType: "treatment",
          isPrimary: true,
          justification: "",
        },
      ],
      picotSelectionRationale: "",
      aiFeedback: null,
    },
    acquire: {
      databases: [{ name: "", rationale: "" }],
      keywords: {
        note: "",
        freeText: { p: [], i: [], c: [], o: [] },
        meshTerms: { p: [], i: [], c: [], o: [] },
        booleanStrategy: "",
      },
      // Verbatim search strings actually executed in each database (for
      // reproducibility — judges expect the exact strings, not just counts).
      searchQueries: [{ database: "PubMed", queryString: "", date: "" }],
      screeningFlow: {
        initialResults: { pubmed: 0, embase: 0, cochrane: 0 },
        afterDedup: 0,
        afterLitSuggest: 0,
        afterSRFilter: 0,
        afterTitleAbstract: 0,
        afterFullText: 0,
        finalIncluded: 0,
        // S14 LitSuggest machine-learning screen
        pubmedInitial: 0,
        litPositive: 0,
        litNegative: 0,
      },
      selectedArticle: {
        title: "", authors: "", journal: "", year: "",
        pmid: "", studyType: "",
        rctCount: 0, totalParticipants: 0,
        selectionRationale: "", brief: "",
      },
      alternativeArticles: [{ title: "", studyCount: 0, participants: 0, brief: "" }],
    },
    appraise: {
      casp: {
        tool: "CASP-SR",
        comment: "",
        scores: {
          q1: { human: "", aiScore: "", evidence: "" },
          q2: { human: "", aiScore: "", evidence: "" },
          q3a: { human: "", aiScore: "", evidence: "" },
          q3b: { human: "", aiScore: "", evidence: "" },
          q3c: { human: "", aiScore: "", evidence: "" },
          q3d: { human: "", aiScore: "", evidence: "" },
          q4: { human: "", aiScore: "", evidence: "" },
          q5a: { human: "", aiScore: "", evidence: "" },
          q5b: { human: "", aiScore: "", evidence: "" },
          q6: { human: "", aiScore: "", evidence: "" },
          q6_1: { human: "", aiScore: "", evidence: "" },
          q6_2: { human: "", aiScore: "", evidence: "" },
          q7: { human: "", aiScore: "", evidence: "" },
        },
        kappa: null,
      },
      results: {
        comment: "",
        outcomes: [newOutcome()],
        forestPlotImage: null,
        funnelPlotImage: null,
      },
      grade: {
        mid: { value: 0, unit: "", outcome: "", method: "", justification: "", derivation: "", reference: "", isNullThreshold: false },
        domains: {
          // Body-level holder kept only for the indirectness PICO-comparison table
          // (feeds the PPTX indirectness slide). Per-outcome decisions live on each
          // outcome's grade now; these decision fields are no longer edited.
          riskOfBias: { highRiskCount: 0, lowRiskCount: 0, unclearCount: 0, sensitivityResult: "", decision: 0, rationale: "" },
          imprecision: { pointEstimate: 0, pointVsMid: "", ciCrossesMid: false, effectMagnitude: "", decision: 0, rationale: "" },
          inconsistency: { ciOverlap: "", pointEstimateSide: "", i2: 0, decision: 0, rationale: "" },
          indirectness: {
            picoComparison: {
              p: { study: "", case_: "", similarity: "" },
              i: { study: "", case_: "", similarity: "" },
              c: { study: "", case_: "", similarity: "" },
              o: { study: "", case_: "", similarity: "" },
              age: { study: "", case_: "" },
              eth: { study: "", case_: "" },
              setting: { study: "", case_: "" },
            },
            decision: 0, rationale: "",
          },
          publicationBias: { smallStudyEffect: false, industryFunding: false, funnelSymmetry: "", eggersP: null, decision: 0, rationale: "" },
        },
        totalDowngrade: 0,
        certaintyLevel: "",
        aiFeedback: null,
      },
      // Direct low-evidence supporting study (case JSON appraise.supportingRCT).
      supportingRCT: { comment: "", title: "", purpose: "", population: "", intervention: "", outcome: "", conclusion: "" },
      // Extra analyses / NNT calcs (case JSON appraise.additionalAnalysis[]).
      additionalAnalysis: [],
    },
    apply: {
      applicability: {
        overallSimilarity: "",
        rationale: "",
        rows: [],            // [{ item, study, case_, similarity }]
        conclusion: "",
      },
      efficacySummary: { effect: "", midComparison: "", certainty: "", nnt: "" },
      benefitRisk: { options: [{ name: "", benefits: [""], risks: [""] }] },
      costAnalysis: { options: [{ name: "", directCost: [""], indirectCost: [""], totalCost: "" }] },
      evidenceToDecision: {
        reference: "",
        benefitRisk: { assessment: "", direction: 0 },
        evidenceQuality: { assessment: "", direction: 0 },
        valuesPreferences: { assessment: "", direction: 0 },
        costEffectiveness: { assessment: "", direction: 0 },
        feasibility: { assessment: "", direction: 0 },
        acceptability: { assessment: "", direction: 0 },
        recommendationLabel: "",
        reasonForConditional: "",
      },
      recommendationStrength: "",
      patientSummary: "",
    },
  };
}
