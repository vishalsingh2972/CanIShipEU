import { extractStartupProfile } from "../founder/profileExtractor";

import {
  updateProfileFromClarification,
} from "../founder/profileUpdater";

import { verifyResearch } from "./verifiedResearch";

import {
  buildEvidencePack,
} from "./evidencePack";

import {
  buildAssessment,
} from "./assessment";

import {
  buildFounderRegulatoryBrief,
} from "./brief";

const founderDescription =
  "We're building an AI recruiter that reads CVs, scores candidates, and recommends who gets interviewed. A human recruiter makes the final decision. We're launching in France and Germany in 2027.";

let profile = extractStartupProfile(
  founderDescription,
);

// Simulate the clarification answers from our golden case.
profile =
  updateProfileFromClarification(
    profile,
    "provider-deployer-role",
    "We are building the AI system ourselves.",
  );

profile =
  updateProfileFromClarification(
    profile,
    "decision-influence",
    "The AI recommends candidates, but a human recruiter makes the final decision.",
  );

profile =
  updateProfileFromClarification(
    profile,
    "sensitive-data",
    "No, we do not process sensitive or specially protected candidate information.",
  );

const research = verifyResearch(profile);

const evidencePack =
  buildEvidencePack(research);

const assessment =
  buildAssessment(
    profile,
    evidencePack,
  );

const brief =
  buildFounderRegulatoryBrief(
    profile,
    assessment,
    evidencePack,
  );

console.log(
  "=== Founder Regulatory Brief ===",
);

console.log("");
console.log(brief.title);

console.log("");
console.log("PRODUCT:");

console.log(
  `- ${brief.product}`,
);

console.log(
  `- Geography: ${
    brief.geography.join(", ") ||
    "Not confirmed"
  }`,
);

console.log(
  `- Planned launch: ${
    brief.plannedLaunch ||
    "Not confirmed"
  }`,
);

console.log("");
console.log("ASSESSMENT:");

console.log(
  `- Status: ${brief.status}`,
);

console.log(
  `- Confidence: ${brief.confidence}`,
);

console.log(
  `- Research current as of: ${brief.asOfDate}`,
);

console.log("");
console.log("SUMMARY:");

console.log(
  brief.summary,
);

console.log("");
console.log("WHY:");

for (const reason of brief.why) {
  console.log(`- ${reason}`);
}

console.log("");
console.log("RELEVANT REGULATIONS:");

for (
  const regulation of
  brief.relevantRegulations
) {
  console.log(`- ${regulation}`);
}

console.log("");
console.log("KEY REQUIREMENTS:");

for (
  const requirement of
  brief.requirements
) {
  console.log(`- ${requirement}`);
}

console.log("");
console.log("IMPORTANT DATES:");

if (brief.importantDates.length === 0) {
  console.log(
    "- None sufficiently verified.",
  );
}

for (
  const importantDate of
  brief.importantDates
) {
  console.log(
    `- ${importantDate.date}: ${importantDate.description}`,
  );

  console.log(
    `  Evidence: ${
      importantDate.evidenceIds.join(", ") ||
      "none"
    }`,
  );
}

console.log("");
console.log("WHAT WOULD CHANGE:");

for (
  const change of
  brief.whatWouldChange
) {
  console.log(`- ${change}`);
}

console.log("");
console.log("UNCERTAINTIES:");

if (brief.uncertainties.length === 0) {
  console.log("- None identified.");
}

for (
  const uncertainty of
  brief.uncertainties
) {
  console.log(`- ${uncertainty}`);
}

console.log("");
console.log("EU VS US:");

console.log(
  `EU: ${brief.euVsUs.eu}`,
);

console.log(
  `US: ${brief.euVsUs.us}`,
);

console.log("");
console.log("EVIDENCE:");

if (brief.evidence.length === 0) {
  console.log(
    "- No verified evidence.",
  );
}

for (
  const evidence of
  brief.evidence
) {
  console.log(
    `[${evidence.id}] ${evidence.title}`,
  );

  console.log(
    `  Score: ${evidence.score}`,
  );

  console.log(
    `  URL: ${evidence.url}`,
  );
}

console.log("");
console.log("DISCLAIMER:");

console.log(
  brief.disclaimer,
);