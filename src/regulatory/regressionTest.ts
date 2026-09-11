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

function assert(
  condition: boolean,
  message: string,
): void {
  if (!condition) {
    throw new Error(
      `REGRESSION FAILED: ${message}`,
    );
  }
}

const founderDescription =
  "We're building an AI recruiter that reads CVs, scores candidates, and recommends who gets interviewed. A human recruiter makes the final decision. We're launching in France and Germany in 2027.";

let profile =
  extractStartupProfile(
    founderDescription,
  );

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

const research =
  verifyResearch(profile);

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

/*
 * Startup profile assertions.
 */
assert(
  profile.domain === "employment",
  "Domain should be employment.",
);

assert(
  profile.role === "provider",
  "Role should be provider.",
);

assert(
  profile.decisionRole === "recommendation",
  "Decision role should be recommendation.",
);

assert(
  profile.humanInvolvement === true,
  "Human involvement should be true.",
);

assert(
  profile.usesPersonalData === true,
  "Personal data should be true.",
);

assert(
  profile.usesSensitiveData === false,
  "Sensitive data should be false.",
);

assert(
  profile.geography?.includes("France") === true,
  "France should be detected.",
);

assert(
  profile.geography?.includes("Germany") === true,
  "Germany should be detected.",
);

assert(
  profile.plannedLaunch === "2027",
  "Planned launch should be 2027.",
);

/*
 * Assessment assertions.
 */
assert(
  assessment.status === "LIKELY_REGULATED",
  "Assessment should be LIKELY_REGULATED.",
);

assert(
  assessment.confidence === "medium",
  "Assessment confidence should be medium.",
);

assert(
  assessment.asOfDate.length === 10,
  "Assessment should have a YYYY-MM-DD as-of date.",
);

assert(
  assessment.relevantRegulations.includes(
    "EU AI Act — Article 6 and Annex III",
  ),
  "Assessment should reference Article 6 and Annex III.",
);

assert(
  assessment.relevantRegulations.includes(
    "EU AI Act — Article 14",
  ),
  "Assessment should reference Article 14.",
);

assert(
  assessment.requirements.length > 0,
  "Assessment should contain requirements.",
);

assert(
  assessment.importantDates.length > 0,
  "Assessment should contain at least one verified important date.",
);

assert(
  assessment.importantDates.some(
    (date) =>
      date.date === "2027-08-02",
  ),
  "Assessment should contain the verified Annex III applicability date.",
);

assert(
  assessment.uncertainties.some(
    (uncertainty) =>
      uncertainty.includes(
        "Provider obligations",
      ),
  ),
  "Assessment should surface the provider-obligations evidence gap.",
);

assert(
  assessment.whatWouldChangeAssessment.some(
    (change) =>
      change.includes(
        "administrative tasks",
      ),
  ),
  "Assessment should explain that removing candidate evaluation could change the analysis.",
);

assert(
  assessment.whatWouldChangeAssessment.some(
    (change) =>
      change.includes(
        "automatically rejecting",
      ),
  ),
  "Assessment should explain the effect of automated recruitment decisions.",
);

assert(
  assessment.whatWouldChangeAssessment.some(
    (change) =>
      change.includes(
        "human review",
      ),
  ),
  "Assessment should explain the importance of human review.",
);

/*
 * Claim/evidence assertions.
 */
assert(
  assessment.claims.length >= 2,
  "Assessment should contain at least two material claims.",
);

assert(
  assessment.claims.every(
    (claim) =>
      claim.evidenceIds.length > 0,
  ),
  "Every assessment claim should have verified evidence.",
);

/*
 * EU vs US boundary assertions.
 */
assert(
  assessment.euVsUs.eu.includes(
    "EU",
  ),
  "EU assessment explanation should be present.",
);

assert(
  assessment.euVsUs.us.includes(
    "not assessed",
  ),
  "US assessment should explicitly state that it is not assessed.",
);

/*
 * Founder Regulatory Brief assertions.
 */
assert(
  brief.title.includes(
    "CANISHIPEU",
  ),
  "Brief should have the CanIShipEU title.",
);

assert(
  brief.status === assessment.status,
  "Brief status should match assessment status.",
);

assert(
  brief.confidence === assessment.confidence,
  "Brief confidence should match assessment confidence.",
);

assert(
  brief.asOfDate === assessment.asOfDate,
  "Brief date should match assessment date.",
);

assert(
  brief.geography.includes(
    "France",
  ),
  "Brief should contain France.",
);

assert(
  brief.geography.includes(
    "Germany",
  ),
  "Brief should contain Germany.",
);

assert(
  brief.importantDates.length > 0,
  "Brief should contain important dates.",
);

assert(
  brief.uncertainties.length > 0,
  "Brief should contain the evidence uncertainty.",
);

assert(
  brief.whatWouldChange.length > 0,
  "Brief should contain reassessment conditions.",
);

assert(
  brief.evidence.length >= 4,
  "Brief should contain multiple verified evidence items.",
);

assert(
  brief.evidence.some(
    (item) =>
      item.id ===
      "evidence-annex-iii-employment-001",
  ),
  "Brief should contain Annex III employment evidence.",
);

assert(
  brief.evidence.some(
    (item) =>
      item.id ===
      "evidence-article-14-human-oversight-001",
  ),
  "Brief should contain Article 14 evidence.",
);

assert(
  brief.evidence.some(
    (item) =>
      item.id ===
      "evidence-ai-act-timeline-001",
  ),
  "Brief should contain timeline evidence.",
);

assert(
  brief.disclaimer.includes(
    "not legal advice",
  ),
  "Brief should contain the legal disclaimer.",
);

console.log(
  "=== CanIShipEU Regression Test ===",
);

console.log("");
console.log("Profile: PASS");
console.log("Assessment: PASS");
console.log("Evidence claims: PASS");
console.log("EU vs US boundary: PASS");
console.log("Founder Regulatory Brief: PASS");

console.log("");
console.log(
  "ALL REGRESSION TESTS PASSED",
);