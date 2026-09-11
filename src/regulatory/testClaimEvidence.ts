import { extractStartupProfile } from "../founder/profileExtractor";
import { updateProfileFromClarification } from "../founder/profileUpdater";
import { buildResearchQueries } from "../research/queryPlanner";
import { correctiveResearch } from "../research/correctiveResearch";
import { buildEvidencePack } from "./evidencePack";
import type { VerifiedResearchPack } from "./verifiedResearch";
import { gradeEvidence } from "./evidenceGrader";
import { mapClaimsToEvidence } from "./claimEvidence";

const founderMessage =
  "We're building an AI recruiter that reads CVs, scores candidates, and recommends who gets interviewed. A human recruiter makes the final decision. We're launching in France and Germany in 2027.";

let profile = extractStartupProfile(
  founderMessage,
);

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

const evidencePack =
  buildEvidencePack(verified);

const claims = [
  "The AI recruitment system falls within the employment-related high-risk provisions of the EU AI Act.",
  "Annex III covers AI systems used for recruitment and candidate evaluation.",
  "Human oversight obligations apply to high-risk AI systems.",
  "The provider has specific obligations under the EU AI Act.",
];

const mapped = mapClaimsToEvidence(
  claims,
  evidencePack,
);

console.log("=== Claim → Evidence Mapping ===");

for (const item of mapped) {
  console.log("");
  console.log(`Claim: ${item.claim}`);
  console.log(
    `Supported: ${item.supported}`,
  );
  console.log(
    `Evidence IDs: ${item.evidenceIds.length > 0
      ? item.evidenceIds.join(", ")
      : "none"
    }`,
  );
  console.log(`Reason: ${item.reason}`);
}