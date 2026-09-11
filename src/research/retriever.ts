import type {
  EvidenceChunk,
  ResearchQuery,
} from "../types/regulatory";

import { loadEvidence } from "../sources/loadEvidence";

export type RetrievedEvidence = {
  chunk: EvidenceChunk;
  score: number;
  matchedKeywords: string[];
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreKeyword(
  keyword: string,
  searchableText: string,
): number {
  const normalizedKeyword = normalize(keyword);

  if (!normalizedKeyword) {
    return 0;
  }

  // Exact phrase match is strongest.
  if (searchableText.includes(normalizedKeyword)) {
    return normalizedKeyword.includes(" ")
      ? 4
      : 3;
  }

  // For single words, allow an exact word-level match.
  const words = normalizedKeyword.split(" ");

  if (words.length === 1) {
    const textWords = new Set(
      searchableText.split(" "),
    );

    if (textWords.has(normalizedKeyword)) {
      return 2;
    }
  }

  return 0;
}

export function retrieveEvidence(
  query: ResearchQuery,
  limit = 5,
): RetrievedEvidence[] {
  const evidence = loadEvidence();

  const keywords = query.keywords ?? [];

  const results: RetrievedEvidence[] = [];

  for (const chunk of evidence) {
    const searchableText = normalize(
      [
        chunk.title,
        chunk.text,
        chunk.location ?? "",
      ].join(" "),
    );

    const matchedKeywords: string[] = [];
    let score = 0;

    for (const keyword of keywords) {
      const keywordScore = scoreKeyword(
        keyword,
        searchableText,
      );

      if (keywordScore > 0) {
        matchedKeywords.push(keyword);
        score += keywordScore;
      }
    }

    if (score < 3) {
      continue;
    }

    results.push({
      chunk,
      score,
      matchedKeywords,
    });
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}