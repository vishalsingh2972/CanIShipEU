import type {
  EvidenceChunk,
  ResearchQuery,
} from "../types/regulatory";

export type EvidenceGrade = {
  evidenceId: string;
  authorityScore: number;
  relevanceScore: number;
  specificityScore: number;
  freshnessScore: number;
  topicAlignmentScore: number;
  totalScore: number;
  sufficient: boolean;
  reason: string;
};

function scoreTopicAlignment(
  chunk: EvidenceChunk,
  query: ResearchQuery,
): number {
  const chunkText =
    `${chunk.title} ${chunk.text} ${chunk.location ?? ""}`
      .toLowerCase();

  switch (query.focus) {
    case "employment_classification":
      if (
        chunkText.includes("annex iii") &&
        (
          chunkText.includes("recruitment") ||
          chunkText.includes("candidate") ||
          chunkText.includes("employment")
        )
      ) {
        return 3;
      }

      if (
        chunkText.includes("article 6") &&
        chunkText.includes("high-risk")
      ) {
        return 3;
      }

      return 0;

    case "decision_influence":
      if (
        chunkText.includes("material influence") ||
        chunkText.includes("decision-making") ||
        chunkText.includes("decision making")
      ) {
        return 3;
      }

      if (
        chunkText.includes("article 6") &&
        chunkText.includes("significant risk")
      ) {
        return 3;
      }

      if (
        chunkText.includes("annex iii") &&
        (
          chunkText.includes("recruitment") ||
          chunkText.includes("candidate")
        )
      ) {
        return 2;
      }

      return 0;

    case "human_oversight":
      if (
        chunkText.includes("human oversight") ||
        chunkText.includes("override") ||
        chunkText.includes("reverse")
      ) {
        return 3;
      }

      return 0;

    case "provider_obligations":
      if (
        chunkText.includes("provider obligations") ||
        (
          chunkText.includes("provider") &&
          (
            chunkText.includes("obligations") ||
            chunkText.includes("high-risk")
          )
        )
      ) {
        return 3;
      }

      return 0;

    case "deployer_obligations":
      if (
        chunkText.includes("deployer obligations") ||
        (
          chunkText.includes("deployer") &&
          (
            chunkText.includes("obligations") ||
            chunkText.includes("high-risk")
          )
        )
      ) {
        return 3;
      }

      return 0;

    case "sensitive_data":
      if (
        chunkText.includes("sensitive personal data") ||
        chunkText.includes("special categories") ||
        chunkText.includes("gdpr")
      ) {
        return 3;
      }

      return 0;

    case "timeline":
      if (
        chunkText.includes("applicability") ||
        chunkText.includes("implementation") ||
        chunkText.includes("2 august 2026") ||
        chunkText.includes("2 august 2027") ||
        chunkText.includes("2 december 2027") ||
        chunkText.includes("timeline")
      ) {
        return 3;
      }

      return 0;
  }
}

export function gradeEvidence(
  chunk: EvidenceChunk,
  query: ResearchQuery,
): EvidenceGrade {
  const text =
    `${chunk.title} ${chunk.text}`.toLowerCase();

  const queryText = [
    query.original,
    query.rewrite ?? "",
    query.stepBack ?? "",
  ]
    .join(" ")
    .toLowerCase();

  let authorityScore = 0;
  let relevanceScore = 0;
  let specificityScore = 0;
  let freshnessScore = 0;

  // 1. Authority
  if (
    chunk.authority
      .toLowerCase()
      .includes("eur-lex")
  ) {
    authorityScore = 3;
  } else if (
    chunk.authority
      .toLowerCase()
      .includes("european commission")
  ) {
    authorityScore = 3;
  } else {
    authorityScore = 1;
  }

  // 2. Relevance
  const queryTerms = queryText
    .split(/\s+/)
    .filter((term) => term.length > 3);

  const uniqueQueryTerms = [
    ...new Set(queryTerms),
  ];

  const matchedTerms = uniqueQueryTerms.filter(
    (term) => text.includes(term),
  );

  relevanceScore = Math.min(
    3,
    matchedTerms.length,
  );

  // 3. Specificity
  const location =
    chunk.location?.toLowerCase() ?? "";

  const hasArticleOrAnnex =
    location.includes("article") ||
    location.includes("annex");

  const isTimelineEvidence =
    chunk.evidenceType === "timeline";

  if (hasArticleOrAnnex) {
    specificityScore = 3;
  } else if (
    query.focus === "timeline" &&
    isTimelineEvidence
  ) {
    // Timeline evidence can be highly specific
    // without pointing to an Article or Annex.
    specificityScore = 3;
  } else {
    specificityScore = 1;
  }

  // 4. Freshness
  const retrievedAt = new Date(
    chunk.retrievedAt,
  );

  if (!Number.isNaN(retrievedAt.getTime())) {
    const ageInDays =
      (Date.now() - retrievedAt.getTime()) /
      (1000 * 60 * 60 * 24);

    if (ageInDays <= 90) {
      freshnessScore = 3;
    } else if (ageInDays <= 365) {
      freshnessScore = 2;
    } else {
      freshnessScore = 1;
    }
  }

  // 5. Structured topic alignment.
  const topicAlignmentScore =
    scoreTopicAlignment(chunk, query);

  const totalScore =
    authorityScore +
    relevanceScore +
    specificityScore +
    freshnessScore +
    topicAlignmentScore;

  /*
   * Evidence must pass BOTH:
   * - a minimum overall quality threshold
   * - a strict topic-alignment requirement
   *
   * This prevents unrelated evidence such as
   * Article 50 transparency from satisfying a
   * provider-obligations or timeline query.
   */
  const sufficient =
    totalScore >= 10 &&
    relevanceScore >= 2 &&
    specificityScore >= 2 &&
    topicAlignmentScore >= 3;

  return {
    evidenceId: chunk.id,
    authorityScore,
    relevanceScore,
    specificityScore,
    freshnessScore,
    topicAlignmentScore,
    totalScore,
    sufficient,
    reason: sufficient
      ? "Evidence is sufficiently authoritative, relevant, specific, fresh, and aligned with the research focus."
      : "Evidence is not sufficiently aligned with the specific research focus to support a material claim.",
  };
}