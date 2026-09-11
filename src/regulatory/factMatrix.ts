import type {
  StartupProfile,
  RegulatoryFact,
} from "../types/regulatory";

export function buildRegulatoryFactMatrix(
  profile: StartupProfile,
): RegulatoryFact[] {
  const facts: RegulatoryFact[] = [];

  // --------------------------------------------------
  // Domain
  // --------------------------------------------------

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

  // --------------------------------------------------
  // AI capability / candidate evaluation
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Decision role
  // --------------------------------------------------

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

  if (profile.decisionRole === "decision") {
    facts.push({
      id: "decision-automated",
      label: "AI can make or determine recruitment decisions",
      value: true,
      importance: "high",
      regulatoryImpact:
        "Direct or automated influence on recruitment decisions requires careful assessment of the applicable high-risk rules and exceptions.",
    });
  }

  if (profile.decisionRole === "unknown") {
    facts.push({
      id: "decision-role-unknown",
      label: "AI decision role unknown",
      value: "unknown",
      importance: "high",
      regulatoryImpact:
        "The degree of AI influence on recruitment decisions must be clarified.",
    });
  }

  // --------------------------------------------------
  // Human involvement
  // --------------------------------------------------

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

  if (profile.humanInvolvement === false) {
    facts.push({
      id: "human-involvement",
      label: "Human involvement",
      value: false,
      importance: "high",
      regulatoryImpact:
        "The absence of human involvement may materially affect the regulatory analysis and oversight requirements.",
    });
  }

  // --------------------------------------------------
  // Personal / sensitive data
  // --------------------------------------------------

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

  if (profile.usesSensitiveData === true) {
    facts.push({
      id: "sensitive-data",
      label: "Sensitive data",
      value: true,
      importance: "high",
      regulatoryImpact:
        "Sensitive or specially protected candidate information may require additional regulatory analysis.",
    });
  }

  if (profile.usesSensitiveData === false) {
    facts.push({
      id: "sensitive-data",
      label: "Sensitive data",
      value: false,
      importance: "medium",
      regulatoryImpact:
        "The founder states that sensitive or specially protected candidate information is not intentionally processed.",
    });
  }

  if (profile.usesSensitiveData === "unknown") {
    facts.push({
      id: "sensitive-data-unknown",
      label: "Sensitive data status unknown",
      value: "unknown",
      importance: "medium",
      regulatoryImpact:
        "The categories of candidate information being processed should be clarified.",
    });
  }

  // --------------------------------------------------
  // Geography
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Launch date
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Provider / deployer role
  // --------------------------------------------------

  if (profile.role === "provider") {
    facts.push({
      id: "provider-role",
      label: "Provider role",
      value: "provider",
      importance: "high",
      regulatoryImpact:
        "The startup is acting as the AI provider, so provider-specific obligations should be investigated.",
    });
  }

  if (profile.role === "deployer") {
    facts.push({
      id: "deployer-role",
      label: "Deployer role",
      value: "deployer",
      importance: "high",
      regulatoryImpact:
        "The startup is acting as the AI deployer, so deployer-specific obligations should be investigated.",
    });
  }

  if (profile.role === "provider_and_deployer") {
    facts.push({
      id: "provider-deployer-role",
      label: "Provider and deployer role",
      value: "provider_and_deployer",
      importance: "high",
      regulatoryImpact:
        "The startup may have both provider and deployer responsibilities, so both sets of obligations should be investigated.",
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