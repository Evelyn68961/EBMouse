# EBMouse — Product Spec (Final)

> **Project name:** EBMouse (EBM 鼠出任務)
>
> **Tagline:** 你的實證醫學小幫手 / Your EBM Learning Companion
>
> **Purpose:** A bilingual (Traditional Chinese / English) guided EBM learning platform that walks users through the complete evidence-based medicine workflow using a real clinical scenario. The learning process simultaneously produces competition-ready deliverables (.pptx, 1-page clinical summary, GRADE evidence profile table).
>
> **Core concept:** Learn EBM by doing EBM. Every step teaches methodology AND collects structured data. At the end, the accumulated data generates polished output documents. A friendly brown hamster mascot guides users through the process, keeping the tone approachable and fun.
>
> **Primary audience:** 輔大附醫藥劑部 pharmacy team (expandable to cross-department and public use)
>
> **Repo:** `Evelyn68961/ebmouse` (GitHub, separate from MA101 and EBM Workshop Companion)
>
> **Deploy:** Vercel (auto-deploy on push to `dev` branch) → ebmouse.vercel.app
>
> **Language:** Bilingual — Taiwan Traditional Chinese (default) + English toggle
>
> **Mascot:** Brown hamster (倉鼠) — appears as small SVG icons throughout the learning workflow

---

## 0. Mascot — The EBMouse Hamster

A small brown hamster character that appears as subtle SVG icons throughout the interface. Not a full illustration system — just a set of simple, recognizable expressions used in specific UI contexts.

### Expression Set (Phase 1: 5 core expressions)

| Expression | Usage | Description |
|------------|-------|-------------|
| 🐹 Neutral/Welcome | Home page, phase introductions | Hamster standing, friendly face |
| 🐹 Thinking | Hint cards, educational content | Hamster with paw on chin, thought bubble |
| 🐹 Celebrating | Phase completion, export success | Hamster with arms up, cheek-puffs, sparkles |
| 🐹 Loading | AI feedback loading, generation | Hamster running on wheel |
| 🐹 Concerned | Warnings, validation errors, GRADE downgrades | Hamster with tilted head, one ear down |

### Where the Hamster Appears

- **Hint cards:** Small icon next to 💡, hamster "thinking" pose
- **Phase completion banner:** Hamster celebrating when all fields in a phase are filled
- **AI feedback panel:** Hamster running on wheel while waiting, then neutral when result arrives
- **Validation messages:** Concerned hamster when required fields are missing
- **Export success:** Hamster holding a tiny document, celebrating
- **Empty states:** Hamster looking around with "開始你的任務吧！" text

### Design Specs

- Style: Simple line art with brown fill, minimal detail (like a favicon-sized character)
- Format: SVG for scalability
- Size: 24–48px in UI context
- Colors: Brown body (#8B6914), lighter belly (#D4A843), black eyes, pink nose/ears
- No animation in Phase 1 (static SVG); CSS animation possible in Phase 2

---

## 1. Relationship to Other Projects

| Project | Audience | Purpose | Overlap |
|---------|----------|---------|---------|
| **MA101** | Pharmacists learning MA methodology | Teach SR/MA from scratch (C0–C5 + workshops) | GRADE, PICO, forest plot concepts |
| **EBM Workshop Companion** | Monthly journal club participants | Real-time group appraisal during live workshops | CASP questions, concept explainers |
| **EBMouse** (this) | Competition team + future juniors | Guided EBM workflow producing competition deliverables | CASP, GRADE, PICO — applied to real scenarios with output generation |

**Design principle:** Standalone site. May link to MA101 for deeper methodology learning, but never depends on it. The unique value is the "learning = producing" workflow, wrapped in a friendly hamster-guided experience.

---

## 2. Core Workflow — "Learning Produces the Deliverable"

```
User enters clinical scenario
        │
        ▼
┌─── Phase 1: Assess (評估案例) ───────────────────────────────────┐
│  • Read scenario, identify patient profile & preferences          │
│  • Search background knowledge (UpToDate, DynaMed)                │
│  • Structure: disease overview, risk factors, treatment options    │
│  📖 Teaching blocks: scenario dissection, patient profile          │
│     checklist, EBM 3-pillar preferences, 3-step background        │
│     search, treatment issues organization (5 blocks)              │
│  📊 Data collected → Slide 1-6: Scenario + Background + Treatment │
└───────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─── Phase 2: Ask (形成問題) ───────────────────────────────────────┐
│  • Build PICOT(s) with guided form                                │
│  • Select question type (treatment/diagnosis/prognosis/harm)      │
│  • Choose primary PICOT with justification                        │
│  📖 Teaching blocks: PICOT 5-element deep dive, 4 question types  │
│     + study design mapping, multiple PICOT handling, worked        │
│     PICOT-2 example from 2024 competition (4 blocks)              │
│  🤖 AI feedback on PICOT quality (via /api/ai-feedback)           │
│  📊 Data collected → Slide 7-10: PICOT tables + justification     │
└───────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─── Phase 3: Acquire (文獻檢索) ──────────────────────────────────┐
│  • Select databases with rationale                                │
│  • Build search strategy: free text → MeSH → Boolean              │
│  • Document screening results (numbers at each stage)             │
│  • Select final article with justification                        │
│  📖 Teaching blocks: Big 3 database strengths, PICOT→Boolean      │
│     step-by-step, SRA keyword conversion, LitSuggest ML           │
│     screening, PRISMA 4-step flow, article selection (6 blocks)   │
│  📊 Data collected → Slide 11-18: Search strategy + PRISMA flow   │
└───────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─── Phase 4: Appraise (文獻評讀) ─────────────────────────────────┐
│  Part A: CASP-SR Scoring                                          │
│  • Score Q1-Q7 with evidence text boxes                           │
│  📖 Teaching: CASP-SR framework overview (Q1-Q7 explained),       │
│     common scoring mistakes (Q3a, Q6-1/Q6-2 pitfalls) (2 blocks) │
│  🤖 AI parallel scoring → Kappa agreement display                 │
│  📊 Data collected → Slide 20-33: CASP results + details          │
│                                                                   │
│  Part B: Results Summary                                          │
│  • Input key outcomes (WMD, 95% CI, sample sizes)                 │
│  • Upload/describe forest plot                                    │
│  📖 Teaching: effect size types, CI interpretation,                │
│     results table format (1 block)                                │
│  📊 Data collected → Slide 34-35: Results overview + forest plot  │
│                                                                   │
│  Part C: GRADE Assessment (Core GRADE 2025 framework)             │
│  • Step 1: Determine MID (4 methods, user picks + justifies)      │
│  • Step 2: Imprecision (point estimate vs. MID, CI crossing)      │
│  • Step 3: Inconsistency (CI overlap, point estimate spread)      │
│  • Step 4: Risk of bias (proportion + sensitivity analysis)       │
│  • Step 5: Publication bias (funnel plot + Egger's)               │
│  • Step 6: Indirectness (PICO matching)                           │
│  • Combine → certainty level                                     │
│  📖 Teaching: MID concept + 4 methods, Core GRADE 5-domain        │
│     flowcharts with BMJ refs, number-line imprecision worked      │
│     example, GRADE summary calculation (4 blocks)                 │
│  🤖 AI consistency check on GRADE reasoning                      │
│  📊 Data collected → Slide 36-48: MID + GRADE walkthrough         │
└───────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─── Phase 5: Apply (臨床應用) ────────────────────────────────────┐
│  • Case applicability assessment (PICO comparison table)          │
│  • Benefit-risk comparison (treatment options side by side)       │
│  • Cost analysis (direct + indirect costs)                        │
│  • Evidence-to-Decision framework (6 factors)                     │
│  • Recommendation strength (strong vs. conditional)               │
│  • Patient-facing summary (de-academicized language)              │
│  📖 Teaching blocks: CASP Q9 applicability with comparison        │
│     table, benefit-risk method, cost analysis breakdown,          │
│     EtD 6-dimension framework, patient summary writing (5 blocks) │
│  📊 Data collected → Slide 50-58: Apply section                   │
└───────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─── Output Generation ────────────────────────────────────────────┐
│  All collected data compiled into:                                │
│  📎 Competition .pptx (PptxGenJS, client-side)                   │
│  📄 1-page clinical evidence summary                             │
│  📊 GRADE evidence profile table                                 │
│  User can preview, edit data, and regenerate at any time          │
└───────────────────────────────────────────────────────────────────┘
```

---

## 3. Site Map

```
EBMouse (EBM 鼠出任務)
│
├── 🏠 Home (首頁)
│   ├── Quick intro + "Start New Project" button
│   ├── "Resume Project" (load from localStorage or JSON import)
│   ├── Navigation cards for reference modules
│   └── Language toggle
│
├── 🚀 Guided Workflow (引導式工作流程) ← THE CORE EXPERIENCE
│   ├── Phase 1: Assess — Clinical scenario input
│   ├── Phase 2: Ask — PICOT builder + AI feedback
│   ├── Phase 3: Acquire — Search documentation
│   ├── Phase 4: Appraise — CASP + Results + GRADE
│   ├── Phase 5: Apply — Evidence-to-Decision
│   ├── Preview — Slide-by-slide preview of accumulated data
│   └── Export — Generate .pptx / 1-page summary / GRADE table
│
├── 📋 Reference: Competition Roadmap (競賽流程指南)
│   ├── 5A Framework overview
│   ├── Phase-by-phase guide (educational content)
│   ├── Timeline & task allocation
│   └── Deliverable checklist + judge expectations
│
├── 📚 Reference: Case Library (案例庫)
│   ├── Case 1: Atropine for Myopia (2024) — fully annotated
│   └── [Future cases added yearly]
│
├── 🧰 Reference: Toolbox (工具箱)
│   ├── Core GRADE Quick Guide ✅ — 7-tab interactive guide (overview, 5 domains, SoF tables)
│   ├── CASP-SR Checklist ✅ — 13-question guide with scoring criteria, pitfalls, Kappa
│   ├── Evidence-to-Decision Framework ✅ — 5-tab EtD guide (overview, 7 factors, strength, MID & values, presentation)
│   ├── MID Determination Guide ✅ — 5-tab MID guide (what is MID, 4 methods, credibility, use in GRADE, practical guide)
│   ├── PICOT Worksheet ✅ — 4-tab PICOT guide (5 elements, question types, selection strategy, quality checklist)
│   ├── PubMed Search Strategy Template (planned)
│   ├── SRA Keyword Conversion Guide (planned)
│   └── LitSuggest Screening Guide (planned)
│
└── ℹ️ About (關於)
    └── Team info, how to contribute, link to MA101
```

---

## 4. Data Model — The Project Object

All user inputs across all phases are stored in a single project object. This object drives both the guided workflow state and the output generation.

```javascript
const projectSchema = {
  meta: {
    id: "uuid",
    title: "Project title",
    createdAt: "ISO date",
    updatedAt: "ISO date",
    currentPhase: 1,           // 1-5, tracks progress
    lang: "zh"                 // "zh" or "en"
  },

  // Phase 1: Assess
  assess: {
    scenario: "",              // clinical scenario text
    patientProfile: {
      age: "", sex: "", condition: "", setting: ""
    },
    patientPreferences: "",    // what the patient/family wants
    backgroundKnowledge: {
      diseaseOverview: "",
      riskFactors: "",
      treatmentOptions: ""
    },
    sources: ""                // UpToDate, DynaMed references
  },

  // Phase 2: Ask
  ask: {
    picots: [
      {
        id: 1,
        p: "", i: "", c: "", o: "", t: "",
        questionType: "",      // treatment | diagnosis | prognosis | harm
        isPrimary: false,
        justification: ""
      }
    ],
    picotSelectionRationale: "",
    aiFeedback: null           // stored AI response for reference
  },

  // Phase 3: Acquire
  acquire: {
    databases: [
      { name: "", rationale: "" }
    ],
    keywords: {
      freeText: { p: [], i: [], c: [], o: [] },
      meshTerms: { p: [], i: [], c: [], o: [] },
      booleanStrategy: ""
    },
    screeningFlow: {
      initialResults: { pubmed: 0, embase: 0, cochrane: 0 },
      afterDedup: 0,
      afterTitleAbstract: 0,
      afterFullText: 0,
      finalIncluded: 0
    },
    selectedArticle: {
      title: "", authors: "", journal: "", year: "",
      pmid: "", studyType: "",
      rctCount: 0, totalParticipants: 0,
      selectionRationale: ""
    },
    alternativeArticles: []    // other candidates considered
  },

  // Phase 4: Appraise
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
        q7: { human: "", aiScore: "", evidence: "" }
      },
      kappa: null               // computed from human vs. AI scores
    },
    results: {
      outcomes: [
        {
          name: "",             // e.g., "Spherical Equivalent (SE)"
          sampleSize: 0,
          rctCount: 0,
          effectSize: "",       // WMD, OR, RR
          ci95: "",
          pValue: "",
          subgroups: [
            { name: "", sampleSize: 0, rctCount: 0, effectSize: "", ci95: "" }
          ]
        }
      ],
      forestPlotImage: null,    // base64 or uploaded image
      funnelPlotImage: null
    },
    grade: {
      mid: {
        value: 0,
        method: "",             // literature | expert | patient | benchmark
        justification: "",
        reference: ""
      },
      domains: {
        riskOfBias: {
          highRiskCount: 0, lowRiskCount: 0, unclearCount: 0,
          sensitivityResult: "",
          decision: 0,          // 0 or -1 or -2
          rationale: ""
        },
        imprecision: {
          pointEstimate: 0,
          pointVsMid: "",       // "above" | "below"
          ciCrossesMid: false,
          effectMagnitude: "",  // "small" | "moderate" | "large"
          decision: 0,
          rationale: ""
        },
        inconsistency: {
          ciOverlap: "",        // "high" | "moderate" | "low"
          pointEstimateSide: "", // "same" | "different"
          i2: 0,
          decision: 0,
          rationale: ""
        },
        indirectness: {
          picoComparison: {
            p: { study: "", case: "", similarity: "" },
            i: { study: "", case: "", similarity: "" },
            c: { study: "", case: "", similarity: "" },
            o: { study: "", case: "", similarity: "" }
          },
          decision: 0,
          rationale: ""
        },
        publicationBias: {
          smallStudyEffect: false,
          industryFunding: false,
          funnelSymmetry: "",
          eggersP: null,
          decision: 0,
          rationale: ""
        }
      },
      totalDowngrade: 0,        // computed: sum of domain decisions
      certaintyLevel: "",       // High | Moderate | Low | Very Low
      aiFeedback: null
    }
  },

  // Phase 5: Apply
  apply: {
    applicability: {
      picoComparison: [],       // reuses indirectness comparison
      overallSimilarity: "",
      rationale: ""
    },
    benefitRisk: {
      options: [
        {
          name: "",
          benefits: "",
          risks: ""
        }
      ]
    },
    costAnalysis: {
      options: [
        {
          name: "",
          directCost: "",
          indirectCost: "",
          totalCost: ""
        }
      ]
    },
    evidenceToDecision: {
      benefitRisk: { assessment: "", direction: 0 },    // -2 to +2
      evidenceQuality: { assessment: "", direction: 0 },
      valuesPreferences: { assessment: "", direction: 0 },
      costEffectiveness: { assessment: "", direction: 0 },
      feasibility: { assessment: "", direction: 0 },
      acceptability: { assessment: "", direction: 0 }
    },
    recommendationStrength: "",  // "strong" | "conditional"
    patientSummary: ""           // de-academicized text
  }
};
```

---

## 5. Output Formats

### 5.1 Competition .pptx (Primary)

**Generated client-side using PptxGenJS.**

Slide template structure (matching 2024 competition format):

| Slide # | Content | Data Source |
|---------|---------|-------------|
| 1 | Title slide (team name, hospital) | meta |
| 2 | Team members | manual input or skip |
| 3 | Section divider: "評估案例 / Assess" | static |
| 4 | Clinical scenario + patient background | assess |
| 5 | Background knowledge summary | assess.backgroundKnowledge |
| 6 | Treatment options & clinical issues | assess |
| 7 | Section divider: "形成問題 / Ask" | static |
| 8 | PICOT-1 table | ask.picots[0] |
| 9 | PICOT-2 table (if applicable) + selection rationale | ask.picots[1] + ask.picotSelectionRationale |
| 10 | Section divider: "文獻檢索 / Acquire" | static |
| 11 | Database selection & search goals | acquire.databases |
| 12 | Keywords & Boolean strategy | acquire.keywords |
| 13 | Search flow / PRISMA-like diagram | acquire.screeningFlow |
| 14 | Article selection & rationale | acquire.selectedArticle |
| 15 | Section divider: "文獻評讀 / Appraise" | static |
| 16 | PICO comparison (study vs. case) | appraise.grade.domains.indirectness |
| 17 | CASP tool introduction | static |
| 18 | CASP results table (AI + human + Kappa) | appraise.casp |
| 19-21 | Key CASP question details (2-3 slides) | appraise.casp.scores |
| 22 | Results overview table | appraise.results |
| 23 | Key outcome: forest plot + interpretation | appraise.results.outcomes[0] |
| 24 | MID determination | appraise.grade.mid |
| 25-27 | GRADE domain assessments (2-3 slides) | appraise.grade.domains |
| 28 | GRADE summary | appraise.grade.certaintyLevel |
| 29 | Section divider: "臨床應用 / Apply" | static |
| 30 | Case applicability | apply.applicability |
| 31 | Benefit-risk comparison | apply.benefitRisk |
| 32 | Cost analysis | apply.costAnalysis |
| 33 | Evidence-to-Decision table | apply.evidenceToDecision |
| 34 | Patient-facing recommendation | apply.patientSummary |
| 35 | Thank you slide | static |

**Design specs:**
- Primary color: Teal (#0E7C86)
- Accent: Dark teal (#0A5C63)
- Background: White (#FFFFFF)
- Text: Dark gray (#1B2838)
- Section dividers: Full-width teal background with white text
- Tables: Light teal header row, alternating white/light gray rows
- Font: Calibri (universal PowerPoint compatibility)
- Slide size: 16:9 widescreen

**User can:**
- Preview slides at any time during the workflow
- Go back and edit any phase, then regenerate
- Upload images (forest plot, funnel plot) that get embedded in slides
- Choose which optional slides to include/exclude

### 5.2 One-Page Clinical Evidence Summary

Single-page document (HTML → print to PDF) containing:
- PICOT summary
- Selected article citation
- Key result (effect size, CI, sample size)
- GRADE certainty level with rationale
- Clinical recommendation
- Suitable for: bedside reference, pharmacy department bulletin board, formulary committee handout

### 5.3 GRADE Evidence Profile Table

Structured table following Core GRADE Summary of Findings format:
- One row per outcome
- Columns: # studies, # participants, certainty, relative/absolute effect, comments
- Standard GRADE format recognizable by any EBM-trained clinician

---

## 6. AI Integration

### Architecture

Same pattern as MA101: Vercel serverless proxy at `/api/ai-feedback`.

```
User browser → /api/ai-feedback → Claude API → structured response
```

Single admin-managed Claude API key. Never exposed client-side.

### AI Touchpoints (4–5 per full workflow)

| # | Trigger | What AI Does | What AI Never Does |
|---|---------|-------------|-------------------|
| 1 | User completes PICOT | Evaluates specificity, measurability, scenario alignment. Returns structured feedback per PICOT element. | Rewrite the PICOT for the user |
| 2 | User completes CASP scoring | Independently scores the same SR based on user-provided evidence text. System computes Kappa. | Do the appraisal without user input |
| 3 | User completes GRADE scoring | Checks internal consistency (e.g., "CI crosses MID but you didn't downgrade for imprecision"). | Assign the GRADE rating |
| 4 | User completes Evidence-to-Decision | Reviews overall coherence from PICO → evidence → recommendation. Highlights gaps. | Write the recommendation |
| 5 | (Optional) Full review | End-to-end consistency check across all phases. | Replace human judgment |

### AI Philosophy

Same as MA101: AI provides judgment and feedback, never does the work for the user. The user must complete each step themselves before seeing AI feedback. AI outputs are presented as "a second opinion to verify against," not as answers.

---

## 7. Data Persistence

### Phase 1: localStorage + JSON Export/Import

```
┌─────────────────────────────────────┐
│ Browser localStorage                │
│                                     │
│ Key: "ebmouse-projects"             │
│ Value: [project1, project2, ...]    │
│                                     │
│ Auto-save: debounced on every edit  │
│ Max projects: 5 (suggest export     │
│   older ones as JSON)               │
└─────────────────────────────────────┘

Export: Download project as .json file
Import: Upload .json → loads into localStorage
Share: Send .json file to teammate via email/LINE
```

**User experience:**
- "Start New Project" → creates empty project object, saves to localStorage
- "Resume Project" → lists saved projects with title + last updated
- "Export Project" → downloads .json
- "Import Project" → uploads .json, adds to localStorage
- Auto-save every 3 seconds (debounced) during active editing

### Phase 2 (future): Supabase Migration

When team collaboration or analytics are needed:
- Google OAuth login (same pattern as MA101)
- Project object stored in Supabase PostgreSQL
- Migration path: import existing .json files into Supabase
- RLS policies: each user sees only their own projects

---

## 8. Technical Architecture

### Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | React (Vite) | Fast build, same as EBM Workshop Companion |
| Styling | Tailwind CSS | Utility-first, rapid prototyping |
| i18n | Custom ZH/EN object (same pattern as MA101) | Proven approach |
| Routing | React Router | Multi-page navigation |
| PPTX generation | PptxGenJS (client-side) | No server needed, instant generation |
| AI integration | Vercel serverless `/api/ai-feedback` | Same pattern as MA101 |
| Persistence | localStorage + JSON export (Phase 1) | Zero friction |
| Hosting | Vercel | Free tier, auto-deploy on push |

### Project Structure

```
ebmouse/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── EBMOUSE_SPEC.md
├── api/
│   └── ai-feedback.js              ← Vercel serverless function (Claude proxy)
├── public/
│   └── templates/                   ← downloadable PDF/printable templates
└── src/
    ├── main.jsx
    ├── App.jsx                      ← router + layout + project context provider (includes /toolbox/core-grade, /toolbox/casp-sr, /toolbox/etd, /toolbox/mid, /toolbox/picot routes)
    ├── i18n.js                      ← bilingual strings
    ├── projectSchema.js             ← default project object + validation
    ├── storage.js                   ← localStorage CRUD + JSON export/import
    │
    ├── components/
    │   ├── Layout.jsx               ← nav + footer + lang toggle + progress bar
    │   ├── PhaseNav.jsx             ← 5-phase progress indicator
    │   ├── HintCard.jsx             ← collapsible educational hint (legacy, still used for small tips)
    │   ├── TeachingBlock.jsx        ← ✅ NEW: type-aware collapsible teaching block renderer
    │   ├── Hamster.jsx              ← SVG hamster mascot (5 moods)
    │   ├── SlidePreview.jsx         ← live preview of generated slides
    │   ├── AiFeedbackPanel.jsx      ← displays AI feedback with loading state
    │   ├── NumberLine.jsx           ← MID/CI visualization for GRADE
    │   ├── PicoComparisonTable.jsx  ← study vs. case PICO comparison
    │   ├── GradeScorecard.jsx       ← 5-domain summary with color coding
    │   └── ImageUploader.jsx        ← for forest/funnel plot images
    │
    ├── pages/
    │   ├── Home.jsx                 ← project list + start/resume/import
    │   │
    │   ├── workflow/                ← THE GUIDED WORKFLOW
    │   │   ├── PhaseAssess.jsx      ← Phase 1: scenario + background
    │   │   ├── PhaseAsk.jsx         ← Phase 2: PICOT builder + AI feedback
    │   │   ├── PhaseAcquire.jsx     ← Phase 3: search documentation
    │   │   ├── PhaseAppraise.jsx    ← Phase 4: CASP + results + GRADE
    │   │   ├── PhaseApply.jsx       ← Phase 5: evidence-to-decision
    │   │   ├── Preview.jsx          ← slide-by-slide preview
    │   │   └── Export.jsx           ← generate .pptx / summary / GRADE table
    │   │
    │   ├── reference/               ← REFERENCE CONTENT (not workflow)
    │   │   ├── Roadmap.jsx          ← 5A framework guide
    │   │   ├── CaseLibrary.jsx      ← annotated past cases
    │   │   ├── CaseAtropine.jsx     ← 2024 atropine case
    │   │   ├── Toolbox.jsx          ← toolbox index with links to active tools
    │   │   ├── CoreGradeGuide.jsx   ← ✅ Core GRADE 7-tab interactive guide (BMJ 2025)
    │   │   ├── CaspChecklist.jsx    ← ✅ CASP-SR 13-question reference with scoring guidance
    │   │   ├── EtdFramework.jsx     ← ✅ Evidence-to-Decision 5-tab guide (Core GRADE Paper 7)
    │   │   ├── MidGuide.jsx         ← ✅ MID Determination 5-tab guide (Carrasco-Labra 2021 + Devji 2020)
    │   │   └── PicotWorksheet.jsx   ← ✅ PICOT 4-tab guide (5 elements, types, selection, checklist)
    │   │
    │   └── About.jsx
    │
    ├── generators/
    │   ├── pptxGenerator.js         ← PptxGenJS slide generation logic
    │   ├── summaryGenerator.js      ← 1-page clinical summary (HTML)
    │   └── gradeTableGenerator.js   ← GRADE evidence profile (HTML)
    │
    └── data/
        ├── teachingContent.js       ← ✅ NEW: 27 bilingual teaching blocks (concept/steps/example/pitfall/checklist)
        ├── cases/                   ← annotated case data (JSON)
        ├── practiceScenarios.js     ← built-in practice clinical scenarios
        └── caspModelAnswers.js      ← model CASP answers for practice cases
```

### Design

- **Color palette:** Teal primary (#0E7C86), dark teal (#0A5C63), light teal (#E8F6F7)
- **Typography:** Noto Sans TC + Inter
- **Mobile-responsive:** Works on phone for reference, optimized for laptop for workflow input
- **Progress indicator:** Persistent 5-phase bar showing completion status
- **Teaching system:** Collapsible teaching blocks (📖/🪜/💡/⚠️/✅/📚) rendered inline between form sections. Each block has a type (concept, steps, example, pitfall, checklist, reference) with distinct color coding. Content is comprehensive bilingual prose derived from analyzing the 2024 competition PPTX (58 slides). 27 blocks total across 5 phases. Replaces the original minimal HintCard tips with full methodology instruction.
- **Hints:** Legacy HintCard (💡) still used for small contextual tips; TeachingBlock used for substantial educational content

---

## 9. Phased Delivery

### Phase 1 — Guided Workflow MVP ✅ COMPLETE

**Built:**
- Home page with project management (new/resume/import/export)
- Complete guided workflow (Phase 1–5) with form inputs at each step
- localStorage persistence with JSON export/import
- Comprehensive bilingual teaching content system (27 blocks across 5 phases)
  - `src/data/teachingContent.js` — all teaching content organized by phase → section
  - `src/components/TeachingBlock.jsx` — type-aware renderer (concept/steps/example/pitfall/checklist/reference)
  - Teaching blocks replace minimal HintCard hints with full methodology instruction
  - Content covers everything needed to produce a 58-slide competition PPTX
- Slide preview sidebar (desktop) + mobile floating preview
- i18n framework with ZH/EN toggle
- SVG hamster mascot (5 moods: neutral, thinking, celebrating, loading, concerned)
- Reference: Case Library (2024 atropine case stub)
- Reference: Toolbox — 5 interactive guides built, 3 template stubs
  - Core GRADE Quick Guide (`/toolbox/core-grade`): 7-tab page covering overview, imprecision (with interactive SVG number-line diagrams), inconsistency, risk of bias, indirectness, publication bias, and SoF tables. Based on BMJ 2025 Core GRADE Papers 1–6 + GRADE Guidelines 6. Bilingual with visual decision flows, domain cards, plain language statement table.
  - CASP-SR Checklist (`/toolbox/casp-sr`): All 13 questions as expandable cards with color-coded sections (validity/results/applicability), per-question "what to look for" checklists, 3-column scoring guidance (😀/😟/😐), common pitfall callouts, section filter, and Cohen's Kappa interpretation table.
  - Evidence-to-Decision Framework (`/toolbox/etd`): 5-tab page covering overview (4 recommendation categories, 7-step decision flow), 7 EtD factors (3 primary + 4 secondary as expandable cards with questions and impact), strength determination (certainty×strength matrix, strong vs conditional implications, exceptional circumstances), MID & values (why MID matters for EtD, value gradient, 4 methods, WHO COVID-19 value statement examples), and presentation (wording rules, 5-element structure, multilayered format, for-vs-against guidance). Based on Core GRADE Paper 7 (BMJ 2025;389:e083867).
  - MID Determination Guide (`/toolbox/mid`): 5-tab page covering what MID is (definition, anchor-based vs distribution-based, value gradient table), 4 methods (literature search, clinician experience, patient focus group, panel survey with pros/cons/examples), credibility assessment (5 core criteria + 4 GRC extension criteria with statistics from Carrasco-Labra 2021's 5,324 MID estimates), 3 roles in GRADE (imprecision threshold, inconsistency reference, EtD decision basis), and practical guide (step-by-step workflow, 2024 competition worked example with SE MID = 0.25D derivation, presentation checklist, common mistakes). Based on Core GRADE Papers 2 & 7, Carrasco-Labra et al. (JCE 2021;133:61–71), Devji et al. (BMJ 2020;369:m1714).
  - PICOT Worksheet (`/toolbox/picot`): 4-tab page covering 5 elements (P/I/C/O/T as color-coded cards with tips and 2024 atropine worked example), question types (4-type × study design table with treatment-type emphasis for competitions), selection strategy (PICOT-1 vs PICOT-2 side-by-side from 2024 case, 3 selection principles: patient preference → feasibility → evidence availability), and quality checklist (per-element color-coded checklist items covering specificity, measurability, scenario alignment).

**Teaching Content Coverage (27 blocks):**
- Phase 1 Assess (5): scenario dissection, patient profile checklist, EBM 3-pillar preferences, 3-step background search, treatment issues example
- Phase 2 Ask (4): PICOT 5-element deep dive, question types + study designs, multiple PICOT handling, worked PICOT-2 example
- Phase 3 Acquire (6): Big 3 databases, PICOT→Boolean steps, SRA conversion, LitSuggest screening, PRISMA 4-step flow, article selection criteria
- Phase 4 Appraise (7): CASP-SR Q1-Q7 overview, scoring pitfalls, results summary (WMD/CI/forest plot), MID 4-method explanation, Core GRADE 5-domain flowcharts with BMJ 2025 refs, imprecision number-line worked example, GRADE summary calculation
- Phase 5 Apply (5): CASP Q9 applicability table, benefit-risk method, cost analysis breakdown, EtD 6-dimension framework, patient summary writing

**Not yet built:**
- AI integration (users complete workflow without AI feedback)
- PPTX generation via PptxGenJS
- 1-page summary and GRADE table generators
- Reference: Roadmap guide (standalone educational content pages)
- Toolbox: remaining 3 tools (PubMed search template, SRA keyword conversion guide, LitSuggest screening guide)

### Phase 2 — AI + Output Generation (Target: next)

**Build:**
- PPTX generation via PptxGenJS (client-side, matching 2024 58-slide format)
- AI integration: 4-5 touchpoints via `/api/ai-feedback`
- 1-page clinical evidence summary generator
- GRADE evidence profile table generator
- Reference: Roadmap guide with full 5A educational content
- Reference: Case 1 (Atropine) fully annotated walkthrough
- Improved slide preview (currently basic miniatures)

### Phase 3 — Growth (Ongoing)

**Add:**
- Supabase migration for persistence + team collaboration
- New competition cases added yearly to Case Library
- Practice mode: pre-loaded scenarios with model answers for self-assessment
- Search Strategy Workshop (Module 2.2 from original spec)
- Analytics: track where users spend most time / get stuck
- Public sharing: anonymized project export for other hospital teams

---

## 10. Key Design Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Site type | Standalone (not in MA101) | Different audience, purpose, and lifecycle |
| Core concept | Learning = producing deliverables | Users learn EBM by building their actual competition output |
| Teaching system | Inline teaching blocks (27 blocks, 6 types) | Replaces minimal hints; content derived from 2024 competition PPTX analysis; teaches everything needed to produce 58-slide deliverable |
| Teaching block types | concept/steps/example/pitfall/checklist/reference | Each type has distinct color and icon; users can quickly identify what kind of content to expect |
| PPTX generation | PptxGenJS (client-side) | No server dependency, instant generation, data stays in browser |
| Data persistence | localStorage + JSON (Phase 1) → Supabase (Phase 2+) | Zero friction to start; upgrade when collaboration needed |
| AI role | Feedback + verification, never does the work | Same philosophy as MA101; teaches judgment, not dependency |
| Output formats | .pptx + 1-page summary + GRADE table | Covers competition, clinical reference, and academic needs |
| GRADE framework | BMJ 2025 Core GRADE series | Latest authoritative reference; already used in 2024 competition |
| Language | Bilingual ZH/EN | Matches MA101; supports both local use and potential international sharing |

---

## 11. Key References

### Core GRADE Series (BMJ 2025)

| Paper | DOI | Topic |
|-------|-----|-------|
| Core GRADE 1 | 10.1136/bmj-2024-081903 | Overview |
| Core GRADE 2 | 10.1136/bmj-2024-081904 | Imprecision |
| Core GRADE 3 | 10.1136/bmj-2024-081905 | Inconsistency |
| Core GRADE 4 | 10.1136/bmj-2024-083864 | Risk of bias + publication bias |
| Core GRADE 5 | 10.1136/bmj-2024-083865 | Indirectness |
| Core GRADE 6 | 10.1136/bmj-2024-083866 | Summary of Findings tables |
| Core GRADE 7 | 10.1136/bmj-2024-083867 | Evidence to Decision |

### CASP

- CASP Systematic Review Checklist (2024 version)

### Competition-Specific

- 2024 competition slides (`EBM_四練_20250811_統整_已報_.pdf`)
- Wei XL et al. (2023) — PMID: 37602338
- LAMP Study Phase 4 — 5-year atropine RCT

### MID Reference

- Smith MJ, Walline JJ. *Adolesc Health Med Ther.* 2015;6:133-140.

---

## 12. Success Metrics

**Phase 1:**
- A new team member can complete the full workflow (scenario → .pptx) in one sitting
- Generated .pptx has correct structure and is presentation-ready with minimal manual editing
- Project data survives browser sessions via localStorage

**Phase 2:**
- AI feedback is accurate and educational (not just "good job")
- Kappa calculation between user and AI CASP scores is computed and displayed correctly
- All 3 output formats generate correctly from the same project data

**Long-term:**
- New competition cases added annually
- System used beyond competition: journal clubs, formulary decisions, resident training
- Adopted by other hospital pharmacy teams
