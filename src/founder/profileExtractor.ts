import type { StartupProfile } from "../types/regulatory";

export function extractStartupProfile(
  description: string,
): StartupProfile {
  const text = description.toLowerCase();

  const profile: StartupProfile = {
    product: description,
    domain: undefined,
    aiCapability: undefined,
    users: [],
    affectedPeople: [],
    decisionRole: "unknown",
    humanInvolvement: "unknown",
    usesPersonalData: "unknown",
    usesSensitiveData: "unknown",
    usesBiometrics: "unknown",
    geography: [],
    plannedLaunch: undefined,
    role: "unknown",
  };

  // Domain
  if (
    text.includes("recruit") ||
    text.includes("candidate") ||
    text.includes("hiring") ||
    text.includes("employment")
  ) {
    profile.domain = "employment";
  }

  // AI capability
  const capabilitySignals: string[] = [];

  if (text.includes("cv") || text.includes("resume")) {
    capabilitySignals.push("reads CVs");
    profile.usesPersonalData = true;
  }

  if (
    text.includes("score candidate") ||
    text.includes("scores candidate") ||
    text.includes("rank candidate") ||
    text.includes("ranks candidate")
  ) {
    capabilitySignals.push("scores or ranks candidates");
    profile.decisionRole = "recommendation";
  }

  if (
    text.includes("recommend") ||
    text.includes("recommends")
  ) {
    capabilitySignals.push("recommends candidates");
    profile.decisionRole = "recommendation";
  }

  if (
    text.includes("automatically reject") ||
    text.includes("automatically rejects") ||
    text.includes("automatically select") ||
    text.includes("automatically selects")
  ) {
    profile.decisionRole = "decision";
  }

  if (capabilitySignals.length > 0) {
    profile.aiCapability = capabilitySignals.join(", ");
  }

  // Human involvement
  if (
    text.includes("human recruiter") ||
    text.includes("human makes") ||
    text.includes("human decision") ||
    text.includes("human review") ||
    text.includes("human reviews")
  ) {
    profile.humanInvolvement = true;
  }

  // Geography
  const countries = [
    "France",
    "Germany",
    "Spain",
    "Italy",
    "Netherlands",
    "Belgium",
    "Ireland",
  ];

  for (const country of countries) {
    if (text.includes(country.toLowerCase())) {
      profile.geography?.push(country);
    }
  }

  // Launch year
  const launchMatch = text.match(
    /\b(202[6-9]|203\d)\b/,
  );

  if (launchMatch) {
    profile.plannedLaunch = launchMatch[1];
  }

  // People affected
  if (
    text.includes("candidate") ||
    text.includes("applicant")
  ) {
    profile.affectedPeople = [
      "Job applicants",
      "Candidates",
    ];
  }

  // Users
  if (text.includes("recruiter")) {
    profile.users = ["Recruiters"];
  }

  if (text.includes("employer")) {
    profile.users?.push("Employers");
  }

  return profile;
}