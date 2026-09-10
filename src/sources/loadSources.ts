import sources from "../../data/eu-sources.json";
import type { RegulatorySource } from "../types/regulatory";

export function loadRegulatorySources(): RegulatorySource[] {
  return sources as RegulatorySource[];
}

export function validateRegulatorySources(
  sources: RegulatorySource[],
): string[] {
  const errors: string[] = [];

  for (const source of sources) {
    if (!source.id) {
      errors.push("Source is missing an id.");
    }

    if (!source.title) {
      errors.push(`${source.id}: missing title.`);
    }

    if (!source.authority) {
      errors.push(`${source.id}: missing authority.`);
    }

    if (!source.url) {
      errors.push(`${source.id}: missing URL.`);
    }

    if (!source.jurisdiction) {
      errors.push(`${source.id}: missing jurisdiction.`);
    }

    if (!source.version) {
      errors.push(`${source.id}: missing version.`);
    }
  }

  return errors;
}