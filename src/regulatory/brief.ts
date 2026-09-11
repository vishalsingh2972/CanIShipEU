import type {
  Assessment,
  StartupProfile,
} from "../types/regulatory";

import type {
  EvidencePack,
} from "./evidencePack";

export type FounderRegulatoryBrief = {
  title: string;
  product: string;
  geography: string[];
  plannedLaunch?: string;
  status: Assessment["status"];
  confidence: Assessment["confidence"];
  asOfDate: string;
  summary: string;
  why: string[];
  relevantRegulations: string[];
  requirements: string[];
  importantDates: Assessment["importantDates"];
  uncertainties: string[];
  whatWouldChange: string[];
  euVsUs: Assessment["euVsUs"];
  evidence: {
    id: string;
    title: string;
    url: string;
    score: number;
  }[];
  disclaimer: string;
};

function collectEvidence(
  evidencePack: EvidencePack,
): FounderRegulatoryBrief["evidence"] {
  const evidence = evidencePack.results.flatMap(
    (result) =>
      result.evidence.map((item) => ({
        id: item.evidenceId,
        title: item.title,
        url: item.url,
        score: item.score,
      })),
  );

  const uniqueEvidence = new Map<
    string,
    FounderRegulatoryBrief["evidence"][number]
  >();

  for (const item of evidence) {
    const existing =
      uniqueEvidence.get(item.id);

    if (
      !existing ||
      item.score > existing.score
    ) {
      uniqueEvidence.set(
        item.id,
        item,
      );
    }
  }

  return Array.from(
    uniqueEvidence.values(),
  ).sort(
    (a, b) => b.score - a.score,
  );
}

export function buildFounderRegulatoryBrief(
  profile: StartupProfile,
  assessment: Assessment,
  evidencePack: EvidencePack,
): FounderRegulatoryBrief {
  return {
    title:
      "🇪🇺 CANISHIPEU — REGULATORY LAUNCH BRIEF",

    product: profile.product,

    geography:
      profile.geography ?? [],

    plannedLaunch:
      profile.plannedLaunch,

    status:
      assessment.status,

    confidence:
      assessment.confidence,

    asOfDate:
      assessment.asOfDate,

    summary:
      assessment.summary,

    why: [
      ...assessment.why,
    ],

    relevantRegulations: [
      ...assessment.relevantRegulations,
    ],

    requirements: [
      ...assessment.requirements,
    ],

    importantDates: [
      ...assessment.importantDates,
    ],

    uncertainties: [
      ...assessment.uncertainties,
    ],

    whatWouldChange: [
      ...assessment.whatWouldChangeAssessment,
    ],

    euVsUs:
      assessment.euVsUs,

    evidence:
      collectEvidence(evidencePack),

    disclaimer:
      "Informational regulatory research only. This brief is not legal advice and should not be treated as a definitive legal determination.",
  };
}