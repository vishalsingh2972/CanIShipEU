import type {
  ResearchQuery,
  StartupProfile,
} from "../types/regulatory";

export function buildResearchQueries(
  profile: StartupProfile,
): ResearchQuery[] {
  const queries: ResearchQuery[] = [];

  if (profile.domain !== "employment") {
    return queries;
  }

  // Core employment AI question.
  queries.push({
    original:
      "Does this AI recruitment system fall within the EU AI Act employment-related high-risk rules?",

    focus: "employment_classification",

    rewrite:
      "Does an AI system used to evaluate, score, rank, or recommend job candidates fall within the EU AI Act employment-related high-risk provisions?",

    stepBack:
      "Which AI systems used in recruitment and employment are classified as high-risk under the EU AI Act?",

    subQuestions: [
      "Does Annex III cover recruitment or candidate evaluation?",
      "How does Article 6 determine whether an Annex III system is high-risk?",
      "Which Article 6 exceptions could apply to this type of employment AI?",
    ],

    keywords: [
      "EU AI Act",
      "Annex III",
      "employment",
      "recruitment",
      "candidate evaluation",
      "Article 6",
      "high-risk",
    ],
  });

  // Decision influence.
  if (profile.decisionRole === "recommendation") {
    queries.push({
      original:
        "How much influence does the AI have on recruitment decisions?",

      focus: "decision_influence",

      rewrite:
        "How does the EU AI Act treat an employment AI system that recommends candidates while a human recruiter makes the final decision?",

      stepBack:
        "When does an AI system materially influence a decision under the EU AI Act?",

      subQuestions: [
        "What does material influence on decision-making mean?",
        "Could candidate scoring or ranking materially influence recruitment decisions?",
        "Does human review change the high-risk analysis?",
      ],

      keywords: [
        "material influence",
        "decision making",
        "candidate scoring",
        "candidate ranking",
        "human review",
        "Article 6",
      ],
    });
  }

  if (profile.decisionRole === "decision") {
    queries.push({
      original:
        "What rules apply if the AI automatically determines recruitment outcomes?",

      focus: "decision_influence",

      rewrite:
        "What EU AI Act requirements apply when an AI system directly or automatically determines recruitment or selection outcomes?",

      stepBack:
        "How does the EU AI Act regulate AI systems that directly influence employment decisions?",

      subQuestions: [
        "Does automated decision-making affect the high-risk analysis?",
        "What human oversight requirements apply?",
        "Can a human override or reverse the AI output?",
      ],

      keywords: [
        "automated decision",
        "employment",
        "recruitment",
        "high-risk",
        "human oversight",
        "override",
        "Article 14",
      ],
    });
  }

  // Human oversight.
  if (profile.humanInvolvement === true) {
    queries.push({
      original:
        "What human oversight obligations apply to this AI recruitment system?",

      focus: "human_oversight",

      rewrite:
        "What human oversight requirements apply to a high-risk AI system used for recruitment when a human recruiter makes the final decision?",

      stepBack:
        "What does effective human oversight require under the EU AI Act?",

      subQuestions: [
        "What must human oversight enable the user to do?",
        "Can the human disregard, override, or reverse the AI output?",
      ],

      keywords: [
        "Article 14",
        "human oversight",
        "override",
        "reverse",
        "high-risk AI",
      ],
    });
  }

  // Provider role.
  if (profile.role === "provider") {
    queries.push({
      original:
        "What AI Act obligations apply to us as the provider of the recruitment AI system?",

      focus: "provider_obligations",

      rewrite:
        "What provider obligations apply under the EU AI Act to a company developing and providing a high-risk AI system for recruitment?",

      stepBack:
        "What obligations does the EU AI Act place on providers of high-risk AI systems?",

      subQuestions: [
        "What provider obligations apply to high-risk employment AI?",
        "What documentation and risk-management duties may apply?",
      ],

      keywords: [
        "provider",
        "high-risk AI",
        "provider obligations",
        "employment AI",
        "EU AI Act",
      ],
    });
  }

  // Deployer role.
  if (
    profile.role === "deployer" ||
    profile.role === "provider_and_deployer"
  ) {
    queries.push({
      original:
        "What AI Act obligations apply to us as a deployer of the recruitment AI system?",

      focus: "deployer_obligations",

      rewrite:
        "What deployer obligations apply under the EU AI Act when an employment AI system is used for recruitment or candidate evaluation?",

      stepBack:
        "What obligations does the EU AI Act place on deployers of high-risk AI systems?",

      subQuestions: [
        "What deployer obligations apply to employment AI?",
        "What human oversight duties apply to deployers?",
      ],

      keywords: [
        "deployer",
        "high-risk AI",
        "deployer obligations",
        "employment AI",
        "EU AI Act",
      ],
    });
  }

  // Sensitive data.
  if (profile.usesSensitiveData === true) {
    queries.push({
      original:
        "What additional rules may apply because the recruitment AI processes sensitive candidate information?",

      focus: "sensitive_data",

      rewrite:
        "What additional EU regulatory requirements may apply when an AI recruitment system processes sensitive or specially protected candidate information?",

      stepBack:
        "What data-protection rules apply to sensitive personal data used in AI recruitment?",

      subQuestions: [
        "Which categories of sensitive candidate data are being processed?",
        "Which GDPR requirements are relevant?",
        "Which requirements come from the AI Act versus data-protection law?",
      ],

      keywords: [
        "sensitive personal data",
        "GDPR",
        "AI recruitment",
        "candidate data",
        "special categories",
      ],
    });
  }

  // Timeline.
  if (profile.plannedLaunch) {
    queries.push({
      original:
        `Which EU AI Act obligations apply by the planned ${profile.plannedLaunch} launch?`,

      focus: "timeline",

      rewrite:
        `Which relevant EU AI Act provisions and obligations will apply by ${profile.plannedLaunch}?`,

      stepBack:
        "What are the implementation and applicability dates for the EU AI Act?",

      subQuestions: [
        "Which relevant provisions are applicable by the planned launch date?",
        "Are there transitional rules or later applicability dates?",
      ],

      keywords: [
        "EU AI Act timeline",
        "applicability",
        "implementation",
        profile.plannedLaunch,
      ],
    });
  }

  return queries;
}