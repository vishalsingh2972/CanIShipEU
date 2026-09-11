import type {
  ResearchQuery,
  StartupProfile,
} from "../types/regulatory";

import {
  researchStartup,
  type ResearchPack,
} from "../research/research";

import {
  gradeEvidence,
  type EvidenceGrade,
} from "./evidenceGrader";

export type VerifiedEvidence = {
  evidenceId: string;
  title: string;
  url: string;
  grade: EvidenceGrade;
};

export type VerifiedResearchResult = {
  query: string;
  focus: ResearchQuery["focus"];
  evidence: VerifiedEvidence[];
  sufficient: boolean;
};

export type VerifiedResearchPack = {
  profile: StartupProfile;
  results: VerifiedResearchResult[];
};

export function verifyResearch(
  profile: StartupProfile,
): VerifiedResearchPack {
  const researchPack: ResearchPack =
    researchStartup(profile);

  const results = researchPack.results.map(
    (result) => {
      const evidence = result.evidence.map(
        (retrieved) => {
          const grade = gradeEvidence(
            retrieved.chunk,
            result.query,
          );

          return {
            evidenceId: retrieved.chunk.id,
            title: retrieved.chunk.title,
            url: retrieved.chunk.url,
            grade,
          };
        },
      );

      const sufficient = evidence.some(
        (item) => item.grade.sufficient,
      );

      return {
        query: result.query.original,
        focus: result.query.focus,
        evidence,
        sufficient,
      };
    },
  );

  return {
    profile,
    results,
  };
}