import type { EvidencePack } from "./evidencePack";
import type { ResearchQuery } from "../types/regulatory";

export type ClaimEvidence = {
  claim: string;
  evidenceIds: string[];
  supported: boolean;
  reason: string;
};

function claimMatchesFocus(
  claim: string,
  focus: ResearchQuery["focus"],
): boolean {
  const text = claim.toLowerCase();

  switch (focus) {
    case "employment_classification":
      return (
        text.includes("high-risk") ||
        text.includes("annex iii") ||
        text.includes("recruitment") ||
        text.includes("candidate")
      );

    case "decision_influence":
      return (
        text.includes("decision") ||
        text.includes("influence") ||
        text.includes("recommend")
      );

    case "human_oversight":
      return (
        text.includes("human oversight") ||
        text.includes("override") ||
        text.includes("reverse")
      );

    case "provider_obligations":
      return (
        text.includes("provider") &&
        (
          text.includes("obligation") ||
          text.includes("requirement") ||
          text.includes("duty")
        )
      );

    case "deployer_obligations":
      return (
        text.includes("deployer") &&
        (
          text.includes("obligation") ||
          text.includes("requirement") ||
          text.includes("duty")
        )
      );

    case "sensitive_data":
      return (
        text.includes("sensitive") ||
        text.includes("personal data") ||
        text.includes("gdpr")
      );

    case "timeline":
      return (
        text.includes("date") ||
        text.includes("timeline") ||
        text.includes("apply") ||
        text.includes("applicable")
      );
  }
}

export function mapClaimToEvidence(
  claim: string,
  evidencePack: EvidencePack,
): ClaimEvidence {
  const matches: string[] = [];

  for (const result of evidencePack.results) {
    // Only consider evidence from research focused
    // on the same regulatory question as the claim.
    if (!claimMatchesFocus(claim, result.focus)) {
      continue;
    }

    for (const evidence of result.evidence) {
      const evidenceText =
        `${evidence.title} ${result.query}`
          .toLowerCase();

      const claimTerms = claim
        .toLowerCase()
        .split(/\s+/)
        .filter((term) => term.length > 4);

      const matchedTerms = claimTerms.filter(
        (term) => evidenceText.includes(term),
      );

      if (matchedTerms.length >= 2) {
        matches.push(evidence.evidenceId);
      }
    }
  }

  const evidenceIds = [
    ...new Set(matches),
  ];

  return {
    claim,
    evidenceIds,
    supported: evidenceIds.length > 0,
    reason:
      evidenceIds.length > 0
        ? "Claim has supporting evidence from a matching research focus."
        : "No verified evidence was found to support this claim.",
  };
}

export function mapClaimsToEvidence(
  claims: string[],
  evidencePack: EvidencePack,
): ClaimEvidence[] {
  return claims.map((claim) =>
    mapClaimToEvidence(
      claim,
      evidencePack,
    ),
  );
}