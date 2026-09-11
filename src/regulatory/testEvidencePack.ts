import { extractStartupProfile } from "../founder/profileExtractor";
import { updateProfileFromClarification } from "../founder/profileUpdater";
import { buildResearchQueries } from "../research/queryPlanner";
import { correctiveResearch } from "../research/correctiveResearch";
import { buildEvidencePack } from "./evidencePack";
import type { VerifiedResearchPack } from "./verifiedResearch";
import { gradeEvidence } from "./evidenceGrader";

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

const results = queries.map((query) => {
  const corrected = correctiveResearch(
    profile,
    query,
  );

  const evidence = corrected.evidence.map(
    (item) => {
      const grade = gradeEvidence(
        item.chunk,
        query,
      );

      return {
        evidenceId: item.chunk.id,
        title: item.chunk.title,
        url: item.chunk.url,
        grade,
      };
    },
  );

  return {
    query: query.original,
    focus: query.focus,
    evidence,
    sufficient: evidence.some(
      (item) => item.grade.sufficient,
    ),
  };
});

const verified: VerifiedResearchPack = {
  profile,
  results,
};

const pack = buildEvidencePack(verified);

console.log("=== Evidence Pack ===");

for (const result of pack.results) {
  console.log("");
  console.log(`Query: ${result.query}`);
  console.log(`Sufficient: ${result.sufficient}`);
  console.log(
    `Verified evidence: ${result.evidence.length}`,
  );

  for (const evidence of result.evidence) {
    console.log(
      `${evidence.title} — ${evidence.score}/15`,
    );
  }
}