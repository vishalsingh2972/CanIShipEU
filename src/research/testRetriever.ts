import { extractStartupProfile } from "../founder/profileExtractor";
import { updateProfileFromClarification } from "../founder/profileUpdater";
import { buildResearchQueries } from "./queryPlanner";
import { retrieveEvidence } from "./retriever";

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

console.log(`Research queries: ${queries.length}`);

for (const [index, query] of queries.entries()) {
  console.log("");
  console.log(`=== Research Query ${index + 1} ===`);
  console.log(query.original);

  const results = retrieveEvidence(query);

  console.log(`Retrieved evidence: ${results.length}`);

  for (const result of results) {
    console.log("");
    console.log(
      `Score: ${result.score.toFixed(2)}`,
    );

    console.log(
      `Matched keywords: ${result.matchedKeywords.join(", ")}`,
    );

    console.log(
      `Source: ${result.chunk.title}`,
    );

    console.log(
      `Location: ${result.chunk.location ?? "n/a"}`,
    );
  }
}