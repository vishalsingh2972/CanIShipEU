import type {
  ResearchQuery,
  EvidenceChunk,
  StartupProfile,
} from "../types/regulatory";

import { buildResearchQueries } from "./queryPlanner";
import {
  retrieveWithFusion,
  type FusedEvidence,
} from "./fusion";

export type ResearchResult = {
  query: ResearchQuery;
  evidence: FusedEvidence[];
};

export type ResearchPack = {
  profile: StartupProfile;
  results: ResearchResult[];
};

export function researchStartup(
  profile: StartupProfile,
): ResearchPack {
  const queries = buildResearchQueries(profile);

  const results: ResearchResult[] = queries.map(
    (query) => ({
      query,
      evidence: retrieveWithFusion(query),
    }),
  );

  return {
    profile,
    results,
  };
}