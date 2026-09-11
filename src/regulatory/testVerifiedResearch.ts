import { extractStartupProfile } from "../founder/profileExtractor";
import { updateProfileFromClarification } from "../founder/profileUpdater";
import { verifyResearch } from "./verifiedResearch";
import { findEvidenceGap } from "./evidenceGaps";

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

const verified = verifyResearch(profile);

for (const [index, result] of verified.results.entries()) {
  console.log("");
  console.log(`=== Research Area ${index + 1} ===`);
  console.log(result.query);
  console.log(
    `Sufficient evidence: ${result.sufficient}`,
  );

  const gap = findEvidenceGap(result);

  if (gap) {
    console.log(`Gap: ${gap.reason}`);
    console.log(
      `Suggested search: ${gap.suggestedSearchTerms.join(", ")}`,
    );
  }

  for (const item of result.evidence) {
    console.log("");
    console.log(`Source: ${item.title}`);
    console.log(
      `Score: ${item.grade.totalScore}/15`,
    );
    console.log(
      `Relevant: ${item.grade.relevanceScore}/3`,
    );
    console.log(
      `Sufficient: ${item.grade.sufficient}`,
    );
  }
}