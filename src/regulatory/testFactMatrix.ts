import { extractStartupProfile } from "../founder/profileExtractor";
import { findClarifications } from "../founder/clarifications";
import { updateProfileFromClarification } from "../founder/profileUpdater";
import { buildRegulatoryFactMatrix } from "./factMatrix";

const founderMessage =
  "We're building an AI recruiter that reads CVs, scores candidates, and recommends who gets interviewed. A human recruiter makes the final decision. We're launching in France and Germany in 2027.";

let profile = extractStartupProfile(founderMessage);

console.log("Initial regulatory facts:");

let facts = buildRegulatoryFactMatrix(profile);

for (const fact of facts) {
  console.log(
    `- ${fact.label}: ${String(fact.value)}`,
  );
}

// Answer provider/deployer question.
const providerAnswer =
  "We build and provide the AI recruitment system ourselves.";

profile = updateProfileFromClarification(
  profile,
  "provider-deployer-role",
  providerAnswer,
);

// Answer decision influence question.
const decisionAnswer =
  "The AI only recommends candidates. A human recruiter makes the final decision.";

profile = updateProfileFromClarification(
  profile,
  "decision-influence",
  decisionAnswer,
);

// Answer sensitive-data question.
const sensitiveDataAnswer =
  "No, we do not intentionally process sensitive candidate information.";

profile = updateProfileFromClarification(
  profile,
  "sensitive-data",
  sensitiveDataAnswer,
);

console.log("");
console.log("Updated profile facts:");

facts = buildRegulatoryFactMatrix(profile);

for (const fact of facts) {
  console.log(
    `- ${fact.label}: ${String(fact.value)}`,
  );
}

console.log("");
console.log(`Total regulatory facts: ${facts.length}`);