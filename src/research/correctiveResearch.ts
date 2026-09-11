import type {
  ResearchQuery,
  StartupProfile,
} from "../types/regulatory";

import { retrieveWithFusion } from "./fusion";
import { gradeEvidence } from "../regulatory/evidenceGrader";

export type CorrectiveResearchResult = {
  query: string;
  round: number;
  evidence: ReturnType<typeof retrieveWithFusion>;
  sufficient: boolean;
};

function buildCorrectiveQuery(
  query: ResearchQuery,
): ResearchQuery {
  return {
    ...query,
    original: `${query.original} EU AI Act Article provider obligations requirements`,
    keywords: [
      ...(query.keywords ?? []),
      "provider",
      "obligations",
      "requirements",
      "Article",
      "AI Act",
    ],
  };
}

export function correctiveResearch(
  profile: StartupProfile,
  query: ResearchQuery,
  maxRounds = 2,
): CorrectiveResearchResult {
  let currentQuery = query;

  let bestEvidence = retrieveWithFusion(
    currentQuery,
  );

  let bestSufficient = bestEvidence.some(
    (item) =>
      gradeEvidence(
        item.chunk,
        currentQuery,
      ).sufficient,
  );

  let bestRound = 1;

  for (
    let round = 2;
    round <= maxRounds;
    round++
  ) {
    if (bestSufficient) {
      break;
    }

    currentQuery =
      buildCorrectiveQuery(currentQuery);

    const evidence = retrieveWithFusion(
      currentQuery,
    );

    const sufficient = evidence.some(
      (item) =>
        gradeEvidence(
          item.chunk,
          currentQuery,
        ).sufficient,
    );

    if (
      sufficient &&
      !bestSufficient
    ) {
      bestEvidence = evidence;
      bestSufficient = true;
      bestRound = round;
    }
  }

  return {
    query: currentQuery.original,
    round: bestRound,
    evidence: bestEvidence,
    sufficient: bestSufficient,
  };
}