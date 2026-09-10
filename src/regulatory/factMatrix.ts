import type { StartupProfile, RegulatoryFact } from "../types/regulatory";

export function buildRegulatoryFactMatrix(
  profile: StartupProfile,
): RegulatoryFact[] {
  const facts: RegulatoryFact[] = [];

  if (profile.domain === "employment") {
    facts.push({
      id: "employment-domain",
      label: "Employment domain",
      value: true,
      importance: "high",
      regulatoryImpact:
        "Employment-related AI use requires investigation of the AI Act employment provisions.",
    });
  }

  if (
    profile.aiCapability?.toLowerCase().includes("candidate") ||
    profile.aiCapability?.toLowerCase().includes("recruit")
  ) {
    facts.push({
      id: "candidate-evaluation",
      label: "Candidate evaluation",
      value: true,
      importance: "high",
      regulatoryImpact:
        "Candidate evaluation can trigger the employment-related Annex III analysis.",
    });
  }

  if (profile.decisionRole === "recommendation") {
    facts.push({
      id: "decision-recommendation",
      label: "AI recommends candidates",
      value: true,
      importance: "high",
      regulatoryImpact:
        "The material influence of the AI output on recruitment decisions must be assessed.",
    });
  }

  if (profile.humanInvolvement === true) {
    facts.push({
      id: "human-involvement",
      label: "Human involvement",
      value: true,
      importance: "high",
      regulatoryImpact:
        "Human involvement is relevant to oversight analysis but does not automatically remove high-risk classification.",
    });
  }

  if (profile.usesPersonalData === true) {
    facts.push({
      id: "personal-data",
      label: "Personal data",
      value: true,
      importance: "medium",
      regulatoryImpact:
        "Data-protection obligations may need separate analysis from AI Act obligations.",
    });
  }

  if (profile.geography?.includes("France")) {
    facts.push({
      id: "france",
      label: "France launch",
      value: true,
      importance: "medium",
      regulatoryImpact:
        "French implementation, employment and regulatory context may need separate investigation.",
    });
  }

  if (profile.geography?.includes("Germany")) {
    facts.push({
      id: "germany",
      label: "Germany launch",
      value: true,
      importance: "medium",
      regulatoryImpact:
        "German implementation, employment and regulatory context may need separate investigation.",
    });
  }

  if (profile.plannedLaunch) {
    facts.push({
      id: "planned-launch",
      label: "Planned launch",
      value: profile.plannedLaunch,
      importance: "high",
      regulatoryImpact:
        "Regulatory applicability must be evaluated against the planned launch date.",
    });
  }

  if (profile.role === "unknown") {
    facts.push({
      id: "provider-deployer-unknown",
      label: "Provider/deployer role unknown",
      value: "unknown",
      importance: "high",
      regulatoryImpact:
        "The startup's role under the AI Act must be clarified because obligations can differ.",
    });
  }

  return facts;
}