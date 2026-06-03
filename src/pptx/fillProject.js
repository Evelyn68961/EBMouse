// Single source of truth for turning a tokenized template zip into a filled deck.
// Used by both the browser export (fillPptx.js) and the Node test (testExport.mjs)
// so they can never drift. Mutates the given JSZip in place.
import { applyAll, expandSlides, buildEntranceTiming } from './engine.js';
import {
  buildPairs, buildListPairs,
  gradeBodyDecisions, outcomeGradeFill, isDowngradedInc,
} from './tokenMap.js';

// Rebuild the GRADE-summary slide's click-reveal animation AFTER unused domain
// badges were dropped. Animate each surviving badge (document order) then the
// conclusion box, matching the original deck's badge->conclusion reveal.
function rebuildSummaryTiming(xml) {
  const sps = xml.match(/<p:sp>[\s\S]*?<\/p:sp>/g) || [];
  const spids = [];
  for (const sp of sps) {
    const m = sp.match(/<p:cNvPr id="(\d+)" name="domBadge_/);
    if (m) spids.push(m[1]);
  }
  // conclusion box = the shape that still carries the certainty sentence.
  for (const sp of sps) {
    const t = (sp.match(/<a:t[^>]*>([\s\S]*?)<\/a:t>/g) || []).map((s) => s.replace(/<[^>]+>/g, '')).join('');
    if (/證據品質/.test(t)) { spids.push((sp.match(/<p:cNvPr id="(\d+)"/) || [])[1]); break; }
  }
  const timing = buildEntranceTiming(spids.filter(Boolean));
  if (!timing) return xml;
  // Insert after <p:clrMapOvr> (schema order: cSld, clrMapOvr, transition?, timing?).
  return xml.includes('</p:clrMapOvr>')
    ? xml.replace('</p:clrMapOvr>', `</p:clrMapOvr>${timing}`)
    : xml.replace('</p:sld>', `${timing}</p:sld>`);
}

export async function fillProject(zip, project) {
  // 1) Static tokens + list bullets across all fixed slides.
  await applyAll(zip, buildPairs(project), buildListPairs(project));

  // 2) Dynamic GRADE detail: one slide PER OUTCOME, layout chosen per outcome.
  //    Masters in the template: 37 imprecision, 40 inconsistency-with-issues,
  //    41 inconsistency-no-issues, 45 summary. We clone the right master for each
  //    outcome, fill it, place it in deck order, then hide the masters.
  const outcomes = project?.appraise?.results?.outcomes || [];
  const body = gradeBodyDecisions(project);
  const fill = (o) => outcomeGradeFill(o, body);

  // Imprecision — single layout, after the body-level risk-of-bias slide (36).
  const imp = await expandSlides(zip, {
    afterSlide: 36, items: outcomes, pickMaster: () => 37, fillPairs: fill, hide: [37, 38, 39],
  });
  // Inconsistency — two layouts (issues=40 / no-issues=41), after the imprecision run.
  const incAnchor = imp.length ? imp[imp.length - 1] : 36;
  await expandSlides(zip, {
    afterSlide: incAnchor, items: outcomes,
    pickMaster: (o) => (isDowngradedInc(o) ? 40 : 41), fillPairs: fill, hide: [40, 41, 42],
  });
  // Summary — single layout, after the publication-bias slide (44). The badge
  // reveal animation is rebuilt per clone (after unused badges are dropped).
  await expandSlides(zip, {
    afterSlide: 44, items: outcomes, pickMaster: () => 45, fillPairs: fill, hide: [45, 46, 47],
    postFill: (xml) => rebuildSummaryTiming(xml),
  });

  return zip;
}
