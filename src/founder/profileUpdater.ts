import type { StartupProfile } from "../types/regulatory";

export function updateProfileFromClarification(
  profile: StartupProfile,
  questionId: string,
  answer: string,
): StartupProfile {
  const text = answer.toLowerCase();

  const updated: StartupProfile = {
    ...profile,
    geography: profile.geography
      ? [...profile.geography]
      : [],
    clarifiedFacts: profile.clarifiedFacts
      ? [...profile.clarifiedFacts]
      : [],
  };

  switch (questionId) {
    case "provider-deployer-role":
      if (
        text.includes("both") ||
        (text.includes("build") && text.includes("deploy"))
      ) {
        updated.role = "provider_and_deployer";
      } else if (
        text.includes("build") ||
        text.includes("our own") ||
        text.includes("ourselves")
      ) {
        updated.role = "provider";
      } else if (
        text.includes("deploy") ||
        text.includes("someone else's") ||
        text.includes("third-party")
      ) {
        updated.role = "deployer";
      }
      break;

    case "decision-influence":
      if (
        text.includes("only recommend") ||
        text.includes("only recommends") ||
        text.includes("just recommend") ||
        text.includes("human decides")
      ) {
        updated.decisionRole = "recommendation";
      } else if (
        text.includes("automatically reject") ||
        text.includes("automatically select") ||
        text.includes("makes the decision")
      ) {
        updated.decisionRole = "decision";
      }
      break;

    case "sensitive-data":
      if (
        text.includes("no") ||
        text.includes("don't") ||
        text.includes("do not")
      ) {
        updated.usesSensitiveData = false;
      } else if (text.includes("yes")) {
        updated.usesSensitiveData = true;
      }
      break;
  }

  const clarifiedFacts = updated.clarifiedFacts ?? [];

  if (!clarifiedFacts.includes(questionId)) {
    clarifiedFacts.push(questionId);
  }

  updated.clarifiedFacts = clarifiedFacts;

  return updated;
}