import type { ResearchQuery } from "../types/regulatory";
import type { VerifiedResearchPack } from "./verifiedResearch";

export type EvidencePackItem = {
  evidenceId: string;
  title: string;
  url: string;
  score: number;
  text?: string;
};

export type EvidencePackResult = {
  query: string;
  focus: ResearchQuery["focus"];
  sufficient: boolean;
  evidence: EvidencePackItem[];
};

export type EvidencePack = {
  results: EvidencePackResult[];
};

export function buildEvidencePack(
  verified: VerifiedResearchPack,
): EvidencePack {
  return {
    results: verified.results.map((result) => ({
      query: result.query,
      focus: result.focus,
      sufficient: result.sufficient,
      evidence: result.evidence
        .filter((item) => item.grade.sufficient)
        .map((item) => ({
          evidenceId: item.evidenceId,
          title: item.title,
          url: item.url,
          score: item.grade.totalScore,
        })),
    })),
  };
}