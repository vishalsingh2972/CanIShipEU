import { extractStartupProfile } from "../founder/profileExtractor";
import { updateProfileFromClarification } from "../founder/profileUpdater";
import { buildResearchQueries } from "./queryPlanner";
import { correctiveResearch } from "./correctiveResearch";

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

for (const query of queries) {
  const result = correctiveResearch(
    profile,
    query,
  );

  console.log("");
  console.log("=== Corrective Research ===");
  console.log(`Original: ${query.original}`);
  console.log(`Round used: ${result.round}`);
  console.log(
    `Sufficient evidence: ${result.sufficient}`,
  );

  for (const item of result.evidence) {
    const grade = require(
      "../regulatory/evidenceGrader",
    ).gradeEvidence(
      item.chunk,
      result.query,
    );

    console.log(
      `${item.chunk.title} — ${grade.totalScore}/12 — sufficient: ${grade.sufficient}`,
    );
  }
}