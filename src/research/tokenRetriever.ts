import type {
  EvidenceChunk,
  ResearchQuery,
} from "../types/regulatory";

import { loadEvidence } from "../sources/loadEvidence";

export type TokenRetrievedEvidence = {
  chunk: EvidenceChunk;
  score: number;
  matchedTokens: string[];
};

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "for",
  "this",
  "that",
  "does",
  "do",
  "is",
  "are",
  "what",
  "which",
  "how",
  "under",
  "with",
  "by",
  "we",
  "our",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(
      (token) =>
        token.length > 2 &&
        !STOP_WORDS.has(token),
    );
}

function uniqueTokens(tokens: string[]): string[] {
  return [...new Set(tokens)];
}

export function retrieveByTokenOverlap(
  query: ResearchQuery,
  limit = 5,
): TokenRetrievedEvidence[] {
  const evidence = loadEvidence();

  const queryText = [
    query.original,
    query.rewrite ?? "",
    query.stepBack ?? "",
  ].join(" ");

  const queryTokens = uniqueTokens(tokenize(queryText));

  const results: TokenRetrievedEvidence[] = [];

  for (const chunk of evidence) {
    const evidenceText = [
      chunk.title,
      chunk.text,
      chunk.location ?? "",
    ].join(" ");

    const evidenceTokens = new Set(
      tokenize(evidenceText),
    );

    const matchedTokens = queryTokens.filter((token) =>
      evidenceTokens.has(token),
    );

    if (matchedTokens.length === 0) {
      continue;
    }

    const score =
      matchedTokens.length / queryTokens.length;

    results.push({
      chunk,
      score,
      matchedTokens,
    });
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}