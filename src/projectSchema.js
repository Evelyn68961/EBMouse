import { v4 as uuidv4 } from 'uuid';

export function createNewProject(title = "", lang = "zh") {
  return {
    meta: {
      id: uuidv4(),
      title: title || (lang === "zh" ? "新任務" : "New Mission"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentPhase: 1,
      lang,
    },
    assess: {
      scenario: "",
      patientProfile: { age: "", sex: "", condition: "", setting: "" },
      patientPreferences: "",
      backgroundKnowledge: { diseaseOverview: "", riskFactors: "", treatmentOptions: "" },
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
        freeText: { p: [], i: [], c: [], o: [] },
        meshTerms: { p: [], i: [], c: [], o: [] },
        booleanStrategy: "",
      },
      screeningFlow: {
        initialResults: { pubmed: 0, embase: 0, cochrane: 0 },
        afterDedup: 0,
        afterTitleAbstract: 0,
        afterFullText: 0,
        finalIncluded: 0,
      },
      selectedArticle: {
        title: "", authors: "", journal: "", year: "",
        pmid: "", studyType: "",
        rctCount: 0, totalParticipants: 0,
        selectionRationale: "",
      },
      alternativeArticles: [],
    },
    appraise: {
      casp: {
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
        outcomes: [
          {
            name: "", sampleSize: 0, rctCount: 0,
            effectSize: "", ci95: "", pValue: "",
            subgroups: [],
          },
        ],
        forestPlotImage: null,
        funnelPlotImage: null,
      },
      grade: {
        mid: { value: 0, method: "", justification: "", reference: "" },
        domains: {
          riskOfBias: { highRiskCount: 0, lowRiskCount: 0, unclearCount: 0, sensitivityResult: "", decision: 0, rationale: "" },
          imprecision: { pointEstimate: 0, pointVsMid: "", ciCrossesMid: false, effectMagnitude: "", decision: 0, rationale: "" },
          inconsistency: { ciOverlap: "", pointEstimateSide: "", i2: 0, decision: 0, rationale: "" },
          indirectness: {
            picoComparison: {
              p: { study: "", case_: "", similarity: "" },
              i: { study: "", case_: "", similarity: "" },
              c: { study: "", case_: "", similarity: "" },
              o: { study: "", case_: "", similarity: "" },
            },
            decision: 0, rationale: "",
          },
          publicationBias: { smallStudyEffect: false, industryFunding: false, funnelSymmetry: "", eggersP: null, decision: 0, rationale: "" },
        },
        totalDowngrade: 0,
        certaintyLevel: "",
        aiFeedback: null,
      },
    },
    apply: {
      applicability: { overallSimilarity: "", rationale: "" },
      benefitRisk: { options: [{ name: "", benefits: "", risks: "" }] },
      costAnalysis: { options: [{ name: "", directCost: "", indirectCost: "", totalCost: "" }] },
      evidenceToDecision: {
        benefitRisk: { assessment: "", direction: 0 },
        evidenceQuality: { assessment: "", direction: 0 },
        valuesPreferences: { assessment: "", direction: 0 },
        costEffectiveness: { assessment: "", direction: 0 },
        feasibility: { assessment: "", direction: 0 },
        acceptability: { assessment: "", direction: 0 },
      },
      recommendationStrength: "",
      patientSummary: "",
    },
  };
}
