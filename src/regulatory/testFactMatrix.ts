import { buildRegulatoryFactMatrix } from "./factMatrix";
import type { StartupProfile } from "../types/regulatory";

const profile: StartupProfile = {
  product: "AI recruitment platform",
  domain: "employment",
  aiCapability:
    "Reads CVs, scores candidates, and recommends candidates for interview.",
  users: ["Recruiters", "Employers"],
  affectedPeople: ["Job applicants", "Candidates"],
  decisionRole: "recommendation",
  humanInvolvement: true,
  usesPersonalData: true,
  usesSensitiveData: "unknown",
  usesBiometrics: false,
  geography: ["France", "Germany"],
  plannedLaunch: "2027",
  role: "unknown",
};

const facts = buildRegulatoryFactMatrix(profile);

console.log(`Built ${facts.length} regulatory facts.`);

for (const fact of facts) {
  console.log(`- ${fact.label}: ${String(fact.value)}`);
}