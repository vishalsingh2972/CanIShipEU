import type { EvidencePack } from "./evidencePack";

import type {
  Assessment,
  StartupProfile,
} from "../types/regulatory";

import {
  mapClaimsToEvidence,
} from "./claimEvidence";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function hasSufficientFocus(
  evidencePack: EvidencePack,
  focus: string,
): boolean {
  return evidencePack.results.some(
    (result) =>
      result.focus === focus &&
      result.sufficient &&
      result.evidence.length > 0,
  );
}

function hasResearchResult(
  evidencePack: EvidencePack,
  focus: string,
): boolean {
  return evidencePack.results.some(
    (result) => result.focus === focus,
  );
}

function buildWhatWouldChange(
  profile: StartupProfile,
  uncertainties: string[],
  whatWouldChangeAssessment: string[],
): void {
  if (profile.role === "unknown") {
    uncertainties.push(
      "Provider/deployer role has not been confirmed.",
    );

    whatWouldChangeAssessment.push(
      "Confirm whether you are the provider, deployer, or both.",
    );
  }

  if (
    profile.domain === "employment" &&
    (
      profile.decisionRole === "recommendation" ||
      profile.decisionRole === "decision"
    )
  ) {
    whatWouldChangeAssessment.push(
      "If the system stops evaluating, scoring, ranking, or recommending candidates and is limited to administrative tasks such as scheduling, the classification analysis could change.",
    );
  }

  if (profile.decisionRole === "recommendation") {
    whatWouldChangeAssessment.push(
      "If the AI starts automatically rejecting, advancing, selecting, or otherwise determining candidates, the assessment may become more restrictive.",
    );
  }

  if (profile.humanInvolvement === true) {
    whatWouldChangeAssessment.push(
      "If human review is removed or reduced so that the AI output is acted on without meaningful human oversight, reassess the regulatory position.",
    );
  } else if (profile.humanInvolvement === false) {
    uncertainties.push(
      "The system is described as operating without human involvement.",
    );

    whatWouldChangeAssessment.push(
      "Confirm whether a human can meaningfully review, disregard, override, or reverse the AI output.",
    );
  } else {
    uncertainties.push(
      "Human involvement has not been fully confirmed.",
    );

    whatWouldChangeAssessment.push(
      "Confirm how and where a human reviews or acts on the AI output.",
    );
  }

  if (
    profile.usesSensitiveData === "unknown"
  ) {
    uncertainties.push(
      "The categories of candidate data processed have not been fully confirmed.",
    );

    whatWouldChangeAssessment.push(
      "Confirm whether sensitive or specially protected candidate information is processed.",
    );
  } else if (
    profile.usesSensitiveData === true
  ) {
    whatWouldChangeAssessment.push(
      "If sensitive or specially protected candidate information is introduced, additional data-protection analysis may be required.",
    );
  }

  if (profile.usesBiometrics === "unknown") {
    whatWouldChangeAssessment.push(
      "If biometric analysis or biometric identification is introduced, reassess the applicable EU rules.",
    );
  } else if (profile.usesBiometrics === true) {
    whatWouldChangeAssessment.push(
      "The use of biometric analysis or identification would require additional regulatory analysis.",
    );
  }

  if (
    !profile.geography ||
    profile.geography.length === 0
  ) {
    uncertainties.push(
      "Launch geography has not been fully confirmed.",
    );

    whatWouldChangeAssessment.push(
      "Confirm the EU countries where the system will be launched or deployed.",
    );
  }

  if (!profile.plannedLaunch) {
    uncertainties.push(
      "Planned launch timing has not been confirmed.",
    );

    whatWouldChangeAssessment.push(
      "Confirm the planned launch date because applicability can depend on timing.",
    );
  }
}

function buildEuVsUs(
  profile: StartupProfile,
): Assessment["euVsUs"] {
  const euLocation =
    profile.geography &&
    profile.geography.length > 0
      ? `The current assessment focuses on the EU launch context: ${profile.geography.join(", ")}.`
      : "The current assessment focuses on the EU regulatory context.";

  return {
    eu:
      `${euLocation} The assessment is based on the verified EU AI Act evidence currently available.`,

    us:
      "The US is not assessed by the current evidence pack. EU classification should not be assumed to determine US obligations; a separate US jurisdiction-specific assessment would be required.",
  };
}

export function buildAssessment(
  profile: StartupProfile,
  evidencePack: EvidencePack,
): Assessment {
  const classificationSupported =
    hasSufficientFocus(
      evidencePack,
      "employment_classification",
    );

  const humanOversightSupported =
    hasSufficientFocus(
      evidencePack,
      "human_oversight",
    );

  const decisionInfluenceSupported =
    hasSufficientFocus(
      evidencePack,
      "decision_influence",
    );

  const timelineSupported =
    hasSufficientFocus(
      evidencePack,
      "timeline",
    );

  const providerResearchAvailable =
    hasResearchResult(
      evidencePack,
      "provider_obligations",
    );

  const providerObligationsSupported =
    hasSufficientFocus(
      evidencePack,
      "provider_obligations",
    );

  const deployerResearchAvailable =
    hasResearchResult(
      evidencePack,
      "deployer_obligations",
    );

  const deployerObligationsSupported =
    hasSufficientFocus(
      evidencePack,
      "deployer_obligations",
    );

  let status: Assessment["status"];
  let confidence: Assessment["confidence"];

  if (
    profile.domain === "employment" &&
    classificationSupported
  ) {
    status = "LIKELY_REGULATED";
    confidence = "medium";
  } else {
    status = "INSUFFICIENT_EVIDENCE";
    confidence = "low";
  }

  const relevantRegulations: string[] = [];
  const requirements: string[] = [];
  const why: string[] = [];
  const uncertainties: string[] = [];
  const whatWouldChangeAssessment: string[] = [];
  const claims: Assessment["claims"] = [];

  if (classificationSupported) {
    relevantRegulations.push(
      "EU AI Act — Article 6 and Annex III",
    );

    why.push(
      "The described system is used for recruitment and candidate evaluation, which is covered by the employment-related high-risk provisions in Annex III.",
    );

    claims.push({
      claim:
        "The AI recruitment system falls within the employment-related high-risk provisions of the EU AI Act.",
      evidenceIds: [],
    });
  }

  if (decisionInfluenceSupported) {
    why.push(
      "The AI recommends or evaluates candidates, so its influence on recruitment decisions is relevant to the classification analysis.",
    );
  }

  if (humanOversightSupported) {
    relevantRegulations.push(
      "EU AI Act — Article 14",
    );

    requirements.push(
      "Human oversight must be effective during use, including the ability to disregard, override, or reverse AI output where appropriate.",
    );

    claims.push({
      claim:
        "High-risk AI systems are subject to human oversight requirements under Article 14.",
      evidenceIds: [],
    });
  }

  /*
   * Provider/deployer evidence gaps.
   *
   * Missing evidence remains an uncertainty.
   * We never manufacture an obligation from an
   * unsuccessful research result.
   */
  if (
    profile.role === "provider" ||
    profile.role === "provider_and_deployer"
  ) {
    if (
      providerResearchAvailable &&
      !providerObligationsSupported
    ) {
      uncertainties.push(
        "Provider obligations could not be sufficiently verified from the current authoritative evidence pack.",
      );

      whatWouldChangeAssessment.push(
        "Verify the specific EU AI Act provider obligations applicable to the system before launch.",
      );
    }
  }

  if (
    profile.role === "deployer" ||
    profile.role === "provider_and_deployer"
  ) {
    if (
      deployerResearchAvailable &&
      !deployerObligationsSupported
    ) {
      uncertainties.push(
        "Deployer obligations could not be sufficiently verified from the current authoritative evidence pack.",
      );

      whatWouldChangeAssessment.push(
        "Verify the specific EU AI Act deployer obligations applicable to the system before launch.",
      );
    }
  }

  buildWhatWouldChange(
    profile,
    uncertainties,
    whatWouldChangeAssessment,
  );

  const mappedClaims =
    mapClaimsToEvidence(
      claims.map((claim) => claim.claim),
      evidencePack,
    );

  const importantDates: Assessment["importantDates"] = [];

  if (timelineSupported) {
    const timelineResults =
      evidencePack.results.filter(
        (result) =>
          result.focus === "timeline" &&
          result.sufficient,
      );

    const timelineEvidenceIds =
      timelineResults.flatMap(
        (result) =>
          result.evidence.map(
            (evidence) =>
              evidence.evidenceId,
          ),
      );

    importantDates.push({
      date: "2027-08-02",
      description:
        "Annex III high-risk requirements become applicable according to the current European Commission implementation timeline.",
      evidenceIds: [
        ...new Set(timelineEvidenceIds),
      ],
    });
  } else {
    uncertainties.push(
      "The applicable AI Act timeline has not been sufficiently verified for the planned launch date.",
    );

    whatWouldChangeAssessment.push(
      "Verify the current AI Act implementation timeline against the actual launch date.",
    );
  }

  return {
    status,
    confidence,
    asOfDate: today(),

    summary:
      status === "LIKELY_REGULATED"
        ? "The described AI recruitment system is likely subject to the EU AI Act's employment-related high-risk rules."
        : "There is not enough verified evidence to make a reliable regulatory assessment.",

    why,

    relevantRegulations: [
      ...new Set(relevantRegulations),
    ],

    requirements: [
      ...new Set(requirements),
    ],

    importantDates,

    euVsUs: buildEuVsUs(profile),

    uncertainties: [
      ...new Set(uncertainties),
    ],

    whatWouldChangeAssessment: [
      ...new Set(
        whatWouldChangeAssessment,
      ),
    ],

    claims: mappedClaims,

    sources: [],
  };
}