import { extractStartupProfile } from "../founder/profileExtractor";
import { updateProfileFromClarification } from "../founder/profileUpdater";
import { buildResearchQueries } from "./queryPlanner";
import { retrieveByTokenOverlap } from "./tokenRetriever";

const founderMessage =
  "We're building an AI recruiter that reads CVs, scores candidates, and recommends who gets interviewed. A human recruiter makes the final decision. We're launching in France and Germany in 2027.";

let profile = extractStartupProfile(founderMessage);

profile = updateProfileFromClarification(
  profile,
  "provider-deployer-role",
  "We build and provide the AI recruitment system ourselves.",
);

profile = updateProfileFromClarification(
  profile,
  "decision-influence",
  "The AI only recommends candidates. A human recruiter makes the final decision.",
);

profile = updateProfileFromClarification(
  profile,
  "sensitive-data",
  "No, we do not intentionally process sensitive candidate information.",
);

const queries = buildResearchQueries(profile);

const query = queries[0];

if (!query) {
  throw new Error("No research query was generated.");
}

console.log("Research question:");
console.log(query.original);
console.log("");

const results = retrieveByTokenOverlap(query);

console.log(`Token-overlap evidence: ${results.length}`);

for (const [index, result] of results.entries()) {
  console.log("");
  console.log(`Rank: ${index + 1}`);
  console.log(`Token score: ${result.score.toFixed(4)}`);
  console.log(
    `Matched tokens: ${result.matchedTokens.join(", ")}`,
  );
  console.log(`Source: ${result.chunk.title}`);
  console.log(`Location: ${result.chunk.location ?? "n/a"}`);
}