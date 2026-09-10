import evidence from "../../data/eu-evidence.json";
import type { EvidenceChunk } from "../types/regulatory";

export function loadEvidence(): EvidenceChunk[] {
  return evidence as EvidenceChunk[];
}

export function validateEvidence(
  evidenceChunks: EvidenceChunk[],
): string[] {
  const errors: string[] = [];

  for (const chunk of evidenceChunks) {
    if (!chunk.id) {
      errors.push("Evidence chunk is missing an id.");
    }

    if (!chunk.sourceId) {
      errors.push(`${chunk.id}: missing sourceId.`);
    }

    if (!chunk.title) {
      errors.push(`${chunk.id}: missing title.`);
    }

    if (!chunk.url) {
      errors.push(`${chunk.id}: missing URL.`);
    }

    if (!chunk.text) {
      errors.push(`${chunk.id}: missing text.`);
    }

    if (!chunk.authority) {
      errors.push(`${chunk.id}: missing authority.`);
    }

    if (!chunk.jurisdiction) {
      errors.push(`${chunk.id}: missing jurisdiction.`);
    }

    if (!chunk.retrievedAt) {
      errors.push(`${chunk.id}: missing retrievedAt.`);
    }
  }

  return errors;
}