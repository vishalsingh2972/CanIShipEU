import type { StartupProfile } from "../types/regulatory";

export type ClarificationQuestion = {
  id: string;
  question: string;
  reason: string;
  priority: "high" | "medium" | "low";
};

export function findClarifications(
  profile: StartupProfile,
): ClarificationQuestion[] {
  const questions: ClarificationQuestion[] = [];

  const clarifiedFacts = profile.clarifiedFacts ?? [];

  if (
    profile.role === "unknown" &&
    !clarifiedFacts.includes("provider-deployer-role")
  ) {
    questions.push({
      id: "provider-deployer-role",
      question:
        "Are you building the AI system yourself, deploying someone else's AI system, or both?",
      reason:
        "Provider and deployer obligations can differ under the AI Act.",
      priority: "high",
    });
  }

  if (
    profile.decisionRole === "recommendation" &&
    !clarifiedFacts.includes("decision-influence")
  ) {
    questions.push({
      id: "decision-influence",
      question:
        "Does the AI only recommend candidates, or can its output automatically reject, advance, or determine candidates?",
      reason:
        "The degree of influence on recruitment decisions can materially affect the regulatory analysis.",
      priority: "high",
    });
  }

  if (
    profile.usesSensitiveData === "unknown" &&
    !clarifiedFacts.includes("sensitive-data")
  ) {
    questions.push({
      id: "sensitive-data",
      question:
        "Does the system process sensitive or specially protected candidate information?",
      reason:
        "The categories of personal data being processed can affect the analysis.",
      priority: "medium",
    });
  }

  if (
    !profile.plannedLaunch &&
    !clarifiedFacts.includes("launch-date")
  ) {
    questions.push({
      id: "launch-date",
      question:
        "When and where do you plan to launch the product?",
      reason:
        "Regulatory obligations are date- and jurisdiction-sensitive.",
      priority: "high",
    });
  }

  return questions;
}