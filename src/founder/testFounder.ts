import {
  extractStartupProfile,
} from "./profileExtractor";

import {
  findClarifications,
} from "./clarifications";

import {
  updateProfileFromClarification,
} from "./profileUpdater";

const founderMessage =
  "We're building an AI recruiter that reads CVs, scores candidates, and recommends who gets interviewed. A human recruiter makes the final decision. We're launching in France and Germany in 2027.";

let profile = extractStartupProfile(founderMessage);

console.log("Initial profile:");
console.log(JSON.stringify(profile, null, 2));

let questions = findClarifications(profile);

console.log("");
console.log(`Initial clarification questions: ${questions.length}`);

for (const question of questions) {
  console.log(`- ${question.id}: ${question.question}`);
}

// Simulate founder answering the provider/deployer question.
const providerAnswer =
  "We build and provide the AI recruitment system ourselves.";

profile = updateProfileFromClarification(
  profile,
  "provider-deployer-role",
  providerAnswer,
);

console.log("");
console.log("After provider/deployer clarification:");
console.log(`Role: ${profile.role}`);

// Simulate founder answering the decision-influence question.
const decisionAnswer =
  "The AI only recommends candidates. A human recruiter makes the final decision.";

profile = updateProfileFromClarification(
  profile,
  "decision-influence",
  decisionAnswer,
);

console.log("");
console.log("After decision-influence clarification:");
console.log(`Decision role: ${profile.decisionRole}`);

// Simulate founder answering the sensitive-data question.
const sensitiveDataAnswer =
  "No, we do not intentionally process sensitive candidate information.";

profile = updateProfileFromClarification(
  profile,
  "sensitive-data",
  sensitiveDataAnswer,
);

console.log("");
console.log("After sensitive-data clarification:");
console.log(`Sensitive data: ${profile.usesSensitiveData}`);

// Recalculate questions.
questions = findClarifications(profile);

console.log("");
console.log(`Remaining clarification questions: ${questions.length}`);

for (const question of questions) {
  console.log(`- ${question.id}: ${question.question}`);
}