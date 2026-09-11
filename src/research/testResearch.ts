import { extractStartupProfile } from "../founder/profileExtractor";
import { updateProfileFromClarification } from "../founder/profileUpdater";
import { researchStartup } from "./research";

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

const researchPack = researchStartup(profile);

console.log(
  `Research questions: ${researchPack.results.length}`,
);

for (const [index, result] of researchPack.results.entries()) {
  console.log("");
  console.log(`=== Research Area ${index + 1} ===`);
  console.log(result.query.original);
  console.log(
    `Evidence found: ${result.evidence.length}`,
  );

  for (const evidence of result.evidence.slice(0, 3)) {
    console.log(
      `- ${evidence.chunk.title} | fusion=${evidence.fusionScore.toFixed(4)}`,
    );
  }
}