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
├── 🏠 Home (首頁) — Maze trail hub
│   ├── Maze trail hero: S-curve path with 5 stops (5A phases), hamster at current progress
│   ├── Active project status bar with "Continue mission" button
│   ├── Project management: new/resume/import/export/delete
│   ├── Quick links to Cases, Toolbox, About
│   └── Language toggle
│
├── 🚀 Guided Workflow (引導式工作流程) ← THE CORE EXPERIENCE
│   ├── Phase 1: Assess — Clinical scenario input
│   ├── Phase 2: Ask — PICOT builder + AI feedback + 🧰 toolbox: PICOT Worksheet
│   ├── Phase 3: Acquire — Search documentation + 🧰 toolbox: PubMed Search, SRA, LitSuggest
│   ├── Phase 4: Appraise — CASP + Results + GRADE + 🧰 toolbox: CASP, Core GRADE, MID
│   ├── Phase 5: Apply — Evidence-to-Decision + 🧰 toolbox: EtD Framework
│   ├── Preview — Slide-by-slide preview of accumulated data
│   └── Export — Generate .pptx / 1-page summary / GRADE table
│   (Toolbox links open in new tab via ToolboxLinks component — no page navigation away from workflow)
│
├── 📋 Reference: Competition Roadmap (競賽流程指南)
│   ├── 5A Framework overview
│   ├── Phase-by-phase guide (educational content)
│   ├── Timeline & task allocation
│   └── Deliverable checklist + judge expectations
│
├── 📚 Reference: Case Library (案例庫)
│   ├── Case 1: Atropine for Myopia (2024) ✅ — fully annotated 5A walkthrough
│   ├── Case 2: CPM for Post-TKA Rehab (2025) ✅ — fully annotated 5A walkthrough
│   ├── Case 3: IV Iron for HF + IDA (2025) ✅ — fully annotated 5A walkthrough
│   └── [Future cases added yearly]
│
├── 🧰 Reference: Toolbox (工具箱) — ordered by 5A workflow with phase badges
│   ├── PICOT Worksheet ✅ [Ask] — 4-tab PICOT guide (5 elements, question types, selection strategy, quality checklist)
│   ├── PubMed Search Strategy Template ✅ [Acquire] — 3-tab guide (build strategy, 3 databases, search tips)
│   ├── SRA Keyword Conversion Guide ✅ [Acquire] — 3-tab Polyglot guide (why convert, how to, vocabulary map)
│   ├── LitSuggest Screening Guide ✅ [Acquire] — 3-tab ML screening guide (what is LitSuggest, workflow, competition use)
│   ├── CASP-SR Checklist ✅ [Appraise] — 13-question guide with scoring criteria, pitfalls, Kappa
│   ├── Core GRADE Quick Guide ✅ [Appraise] — 7-tab interactive guide (overview, 5 domains, SoF tables)
│   ├── MID Determination Guide ✅ [Appraise] — 5-tab MID guide (what is MID, 4 methods, credibility, use in GRADE, practical guide)
│   └── Evidence-to-Decision Framework ✅ [Apply] — 5-tab EtD guide (overview, 7 factors, strength, MID & values, presentation)
│
└── ℹ️ About (關於)
    └── Team info, link to MA101 (meta-analysis-101.vercel.app)
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
| Framework | React (Vite) | Fast build, modern tooling |
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
├── vercel.json                      ← SPA rewrite (all routes → index.html) + API passthrough
├── EBMOUSE_SPEC.md
├── api/
│   └── ai-feedback.js              ← Vercel serverless function (Claude proxy)
├── public/
│   └── templates/                   ← downloadable PDF/printable templates
└── src/
    ├── main.jsx
    ├── App.jsx                      ← router + layout + project context provider (includes all 8 /toolbox/* routes)
    ├── i18n.js                      ← bilingual strings
    ├── projectSchema.js             ← default project object + validation
    ├── storage.js                   ← localStorage CRUD + JSON export/import
    │
    ├── components/
    │   ├── Layout.jsx               ← nav + footer + lang toggle + progress bar
    │   ├── PhaseNav.jsx             ← 5-phase progress indicator
    │   ├── MazeTrail.jsx            ← ✅ SVG maze trail for home page (S-curve path, 5 stops, hamster marker)
    │   ├── ToolboxLinks.jsx         ← ✅ contextual toolbox quick-links (opens in new tab, per-phase mapping)
    │   ├── HintCard.jsx             ← collapsible educational hint (legacy, still used for small tips)
    │   ├── TeachingBlock.jsx        ← ✅ type-aware collapsible teaching block renderer
    │   ├── Hamster.jsx              ← SVG hamster mascot (5 moods)
    │   ├── SlidePreview.jsx         ← live preview of generated slides
    │   ├── AiFeedbackPanel.jsx      ← displays AI feedback with loading state
    │   ├── NumberLine.jsx           ← MID/CI visualization for GRADE
    │   ├── PicoComparisonTable.jsx  ← study vs. case PICO comparison
    │   ├── GradeScorecard.jsx       ← 5-domain summary with color coding
    │   └── ImageUploader.jsx        ← for forest/funnel plot images
    │
    ├── pages/
    │   ├── Home.jsx                 ← maze trail hub + project management
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
    │   │   ├── Toolbox.jsx          ← toolbox index — single-column list ordered by 5A workflow with phase badges
    │   │   ├── CoreGradeGuide.jsx   ← ✅ Core GRADE 7-tab interactive guide (BMJ 2025)
    │   │   ├── CaspChecklist.jsx    ← ✅ CASP-SR 13-question reference with scoring guidance
    │   │   ├── EtdFramework.jsx     ← ✅ Evidence-to-Decision 5-tab guide (Core GRADE Paper 7)
    │   │   ├── MidGuide.jsx         ← ✅ MID Determination 5-tab guide (Carrasco-Labra 2021 + Devji 2020)
    │   │   ├── PicotWorksheet.jsx   ← ✅ PICOT 4-tab guide (5 elements, types, selection, checklist)
    │   │   ├── PubmedSearchGuide.jsx ← ✅ PubMed search strategy 3-tab guide (build, databases, tips)
    │   │   ├── SraGuide.jsx         ← ✅ SRA Polyglot 3-tab guide (why, how, vocabulary map)
    │   │   └── LitSuggestGuide.jsx  ← ✅ LitSuggest 3-tab ML screening guide (what, workflow, competition)
    │   │
    │   └── About.jsx                ← team info + link to MA101 (neutral hamster, leading-loose text)
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
- Home page: maze trail hub with S-curve path, 5 stops for 5A phases, hamster marker at current progress, project management below (new/resume/import/export/delete), active project selector updates maze display
- `vercel.json` SPA rewrite: all client-side routes handled by React Router (fixes 404 on direct navigation to /cases, /toolbox, etc.)
- Complete guided workflow (Phase 1–5) with form inputs at each step
- Contextual toolbox quick-links (`ToolboxLinks` component): teal pill buttons at the top of each workflow phase linking to relevant toolbox reference pages (opens in new tab). Mapping: Phase 2 → PICOT Worksheet; Phase 3 → PubMed Search, SRA, LitSuggest; Phase 4 → CASP, Core GRADE, MID; Phase 5 → EtD Framework.
- localStorage persistence with JSON export/import
- Comprehensive bilingual teaching content system (27 blocks across 5 phases)
  - `src/data/teachingContent.js` — all teaching content organized by phase → section
  - `src/components/TeachingBlock.jsx` — type-aware renderer (concept/steps/example/pitfall/checklist/reference)
  - Teaching blocks replace minimal HintCard hints with full methodology instruction
  - Content covers everything needed to produce a 58-slide competition PPTX
- Slide preview sidebar (desktop) + mobile floating preview
- i18n framework with ZH/EN toggle
- SVG hamster mascot (5 moods: neutral, thinking, celebrating, loading, concerned)
- Reference: Case Library — 3 fully built cases with shared CaseDetail renderer
  - Case 1: Atropine for Childhood Myopia (2024, 四練) — 58 slides, 897-line data file. Two GRADE assessments (0.01% = Low, 0.05% = Moderate), continuous outcome MID (SE = 0.25D), conditional recommendation for 0.05% atropine.
  - Case 2: CPM for Post-TKA Rehab (2025, 三練) — 55 slides, 672-line data file. Single GRADE assessment (Low), continuous outcome MID (ROM = 5°, corrected from team's 2° using Silva et al. Syst Rev 2024;13:50 anchor-based MCIC). Conditional recommendation against CPM. Corrections applied: cost data copy-paste errors, conclusion copy-paste, MID value.
  - Case 3: IV Iron for HF + IDA (2025, 二練) — 54 slides, 782-line data file. Single GRADE assessment (Moderate), binary outcome null threshold (OR = 1) + OIS, NNT = 16. Conditional recommendation for IV iron. Corrections applied: slide 8 treatment regimen copy-paste, slide 37 MID copy-paste (atropine SE → null threshold for binary OR), slide 5 typo, slide 25 dual Kappa values. Supporting RCT: FAIR-HF2 (Anker et al. JAMA 2025).
  - Shared `CaseDetail.jsx` renderer (946 lines): sticky phase nav, PICOT comparison cards, PRISMA flow, CASP emoji table + collapsible evidence, number line SVG for imprecision, GRADE scorecards, EtD direction bars, cost/benefit-risk tables, NNT display with collapsible derivation. Handles both continuous (MID) and binary (null threshold) outcomes, optional keyOutcome subgroups, optional regimen rows, optional visitCost rows. GRADE heading uses `assessment.label` for generic case support.
- Reference: Toolbox — all 8 interactive guides built (toolbox complete)
  - Core GRADE Quick Guide (`/toolbox/core-grade`): 7-tab page covering overview, imprecision (with interactive SVG number-line diagrams), inconsistency, risk of bias, indirectness, publication bias, and SoF tables. Based on BMJ 2025 Core GRADE Papers 1–6 + GRADE Guidelines 6. Bilingual with visual decision flows, domain cards, plain language statement table.
  - CASP-SR Checklist (`/toolbox/casp-sr`): All 13 questions as expandable cards with color-coded sections (validity/results/applicability), per-question "what to look for" checklists, 3-column scoring guidance (😀/😟/😐), common pitfall callouts, section filter, and Cohen's Kappa interpretation table.
  - Evidence-to-Decision Framework (`/toolbox/etd`): 5-tab page covering overview (4 recommendation categories, 7-step decision flow), 7 EtD factors (3 primary + 4 secondary as expandable cards with questions and impact), strength determination (certainty×strength matrix, strong vs conditional implications, exceptional circumstances), MID & values (why MID matters for EtD, value gradient, 4 methods, WHO COVID-19 value statement examples), and presentation (wording rules, 5-element structure, multilayered format, for-vs-against guidance). Based on Core GRADE Paper 7 (BMJ 2025;389:e083867).
  - MID Determination Guide (`/toolbox/mid`): 5-tab page covering what MID is (definition, anchor-based vs distribution-based, value gradient table), 4 methods (literature search, clinician experience, patient focus group, panel survey with pros/cons/examples), credibility assessment (5 core criteria + 4 GRC extension criteria with statistics from Carrasco-Labra 2021's 5,324 MID estimates), 3 roles in GRADE (imprecision threshold, inconsistency reference, EtD decision basis), and practical guide (step-by-step workflow, 2024 competition worked example with SE MID = 0.25D derivation, presentation checklist, common mistakes). Based on Core GRADE Papers 2 & 7, Carrasco-Labra et al. (JCE 2021;133:61–71), Devji et al. (BMJ 2020;369:m1714).
  - PICOT Worksheet (`/toolbox/picot`): 4-tab page covering 5 elements (P/I/C/O/T as color-coded cards with tips and 2024 atropine worked example), question types (4-type × study design table with treatment-type emphasis for competitions), selection strategy (PICOT-1 vs PICOT-2 side-by-side from 2024 case, 3 selection principles: patient preference → feasibility → evidence availability), and quality checklist (per-element color-coded checklist items covering specificity, measurability, scenario alignment).
  - PubMed Search Strategy Template (`/toolbox/pubmed-search`): 3-tab page covering build strategy (3-step PICOT→Boolean with worked example and PubMed Advanced Search workflow), 3 databases (PubMed/Embase/Cochrane strengths comparison), and search tips (Boolean operators quick reference table, common mistakes, MeSH term finding guide).
  - SRA Keyword Conversion Guide (`/toolbox/sra`): 3-tab page covering why convert (different databases use different controlled vocabularies — MeSH vs Emtree vs Cochrane syntax), how to (6-step Polyglot workflow with warnings about Emtree over-indexing), and vocabulary map (cross-database syntax comparison table for subject headings, title, title+abstract, truncation, exact phrase). Based on Clark et al. (JMLA 2020;108:195–207).
  - LitSuggest Screening Guide (`/toolbox/litsuggest`): 3-tab page covering what is LitSuggest (ML-powered screening concept with positive/negative examples), workflow (7-step guide from account creation to iteration), and competition use (2024 case: 793→391 articles, presentation tips, how to pick positive examples, caveats). Based on Allot et al. (Nucleic Acids Res 2021;49:W352–W358).

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
- Toolbox: ✅ COMPLETE — all 8 interactive reference guides built

### Phase 2 — AI + Output Generation (Target: next)

**Build:**
- PPTX generation via PptxGenJS (client-side, matching 2024 58-slide format)
- AI integration: 4-5 touchpoints via `/api/ai-feedback`
- 1-page clinical evidence summary generator
- GRADE evidence profile table generator
- Reference: Roadmap guide with full 5A educational content
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

- 2024 competition slides — Case 1: Atropine (`EBM_四練_20250811_統整_已報_.pdf`)
- 2025 competition slides — Case 2: CPM (`EBM_三練_20250812_新模板.pdf`)
- 2025 competition slides — Case 3: IV Iron (`EBM_二練_20250814_新模板.pptx`)
- Wei XL et al. (2023) — PMID: 37602338 (atropine for myopia SR/MA)
- LAMP Study Phase 4 — 5-year atropine RCT
- Ahmed M et al. ESC Heart Fail. 2025;12(1):43. PMID: 38965691 (IV iron for HF, 14 RCTs, 6651 pts)
- Anker SD et al. JAMA. 2025;333(22):1965-1976 (FAIR-HF2 RCT, supporting evidence for IV iron case)

### MID References

- Smith MJ, Walline JJ. *Adolesc Health Med Ther.* 2015;6:133-140. (atropine case: SE MID = 0.25D)
- Silva MDC et al. *Syst Rev.* 2024;13(1):50. (CPM case: knee flexion MCIC = 3.8°–6.4°, used MID = 5°)

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
