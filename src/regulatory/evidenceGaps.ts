import type { VerifiedResearchResult } from "./verifiedResearch";

export type EvidenceGap = {
  query: string;
  reason: string;
  suggestedSearchTerms: string[];
};

export function findEvidenceGap(
  result: VerifiedResearchResult,
): EvidenceGap | null {
  if (result.sufficient) {
    return null;
  }

  if (result.evidence.length === 0) {
    return {
      query: result.query,
      reason:
        "No retrieved evidence was strong enough to answer this research question.",
      suggestedSearchTerms: [
        result.query,
      ],
    };
  }

  return {
    query: result.query,
    reason:
      "Retrieved evidence exists, but it is not sufficiently relevant and specific to support a material claim.",
    suggestedSearchTerms: [
      result.query,
    ],
  };
}