import type { ResearchQuery } from "../types/regulatory";

import {
  retrieveEvidence,
  type RetrievedEvidence,
} from "./retriever";

import {
  retrieveByTokenOverlap,
  type TokenRetrievedEvidence,
} from "./tokenRetriever";

export type FusedEvidence = {
  chunk: RetrievedEvidence["chunk"];
  keywordScore: number;
  tokenScore: number;
  fusionScore: number;
  matchedKeywords: string[];
  matchedTokens: string[];
};

export function retrieveWithFusion(
  query: ResearchQuery,
  limit = 5,
): FusedEvidence[] {
  const keywordResults = retrieveEvidence(query, 10);
  const tokenResults = retrieveByTokenOverlap(query, 10);

  const keywordRank = new Map(
    keywordResults.map((result, index) => [
      result.chunk.id,
      index + 1,
    ]),
  );

  const tokenRank = new Map(
    tokenResults.map((result, index) => [
      result.chunk.id,
      index + 1,
    ]),
  );

  const byId = new Map<
    string,
    FusedEvidence
  >();

  for (const result of keywordResults) {
    byId.set(result.chunk.id, {
      chunk: result.chunk,
      keywordScore: result.score,
      tokenScore: 0,
      fusionScore: 0,
      matchedKeywords: result.matchedKeywords,
      matchedTokens: [],
    });
  }

  for (const result of tokenResults) {
    const existing = byId.get(result.chunk.id);

    if (existing) {
      existing.tokenScore = result.score;
      existing.matchedTokens = result.matchedTokens;
    } else {
      byId.set(result.chunk.id, {
        chunk: result.chunk,
        keywordScore: 0,
        tokenScore: result.score,
        fusionScore: 0,
        matchedKeywords: [],
        matchedTokens: result.matchedTokens,
      });
    }
  }

  for (const result of byId.values()) {
    const keywordPosition =
      keywordRank.get(result.chunk.id);

    const tokenPosition =
      tokenRank.get(result.chunk.id);

    const keywordFusion = keywordPosition
      ? 1 / (60 + keywordPosition)
      : 0;

    const tokenFusion = tokenPosition
      ? 1 / (60 + tokenPosition)
      : 0;

    result.fusionScore =
      keywordFusion + tokenFusion;
  }

  return [...byId.values()]
    .sort((a, b) => b.fusionScore - a.fusionScore)
    .slice(0, limit);
}