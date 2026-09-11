import { extractStartupProfile } from "../founder/profileExtractor";
import { updateProfileFromClarification } from "../founder/profileUpdater";
import { buildResearchQueries } from "./queryPlanner";

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
  console.log(`=== Query ${index + 1} ===`);

  console.log("Original:");
  console.log(query.original);

  console.log("");
  console.log("Rewrite:");
  console.log(query.rewrite);

  console.log("");
  console.log("Step-back:");
  console.log(query.stepBack);

  console.log("");
  console.log("Subquestions:");

  for (const question of query.subQuestions ?? []) {
    console.log(`- ${question}`);
  }

  console.log("");
  console.log("Keywords:");
  console.log(query.keywords?.join(", "));
}