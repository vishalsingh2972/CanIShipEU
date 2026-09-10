import type { Assessment } from "../types/regulatory";

export const goldenAssessment: Assessment = {
  status: "LIKELY_REGULATED",

  confidence: "medium",

  asOfDate: "2026-09-10",

  summary:
    "The described AI recruitment system is likely within the EU AI Act's employment-related high-risk framework, subject to the detailed Article 6 conditions and exceptions.",

  why: [
    "The system evaluates job candidates and recommends candidates for interview.",
    "Annex III covers AI systems intended for recruitment or selection, including evaluating candidates.",
    "The fact that a human recruiter makes the final decision does not by itself resolve the high-risk analysis.",
    "The degree to which the AI output materially influences the recruitment decision must be assessed."
  ],

  relevantRegulations: [
    "Regulation (EU) 2024/1689 — Artificial Intelligence Act",
    "Article 6 — Classification rules for high-risk AI systems",
    "Annex III — Employment, workers' management and access to self-employment",
    "Article 14 — Human oversight"
  ],

  requirements: [
    "Determine whether the system meets the applicable high-risk classification conditions.",
    "Determine the startup's role as provider, deployer, or both.",
    "Assess required human oversight measures if the system is classified as high-risk.",
    "Determine which obligations apply by the planned launch date."
  ],

  importantDates: [
    {
      date: "2027-12-02",
      description:
        "Current European Commission implementation timeline identifies this date for Annex III high-risk rules.",
      evidenceIds: []
    }
  ],

  euVsUs: {
    eu: "The EU has a horizontal AI regulatory framework with specific employment-related high-risk provisions.",
    us: "US AI regulation is more fragmented across federal, state and sector-specific rules."
  },

  uncertainties: [
    "The startup's provider/deployer role has not yet been established.",
    "The precise intended purpose and material influence of the recommendation output need confirmation.",
    "The categories of personal or sensitive data processed need confirmation.",
    "The applicable obligations must be checked against the actual launch date and current implementation timeline."
  ],

  whatWouldChangeAssessment: [
    "If the system only performs administrative scheduling and does not evaluate or rank candidates, the classification analysis could change.",
    "If the system does not materially influence recruitment decisions, an Article 6 exception may become relevant.",
    "If the AI directly determines candidate eligibility or selection, the risk analysis could become stronger.",
    "If biometric analysis is introduced, additional regulatory questions would need to be investigated."
  ],

  claims: [
    {
      claim:
        "AI systems intended for recruitment or selection, including evaluating candidates, are covered by the employment-related Annex III analysis.",
      evidenceIds: [
        "evidence-annex-iii-employment-001",
        "evidence-article-6-high-risk-001"
      ]
    },
    {
      claim:
        "Human involvement does not automatically remove the need to assess high-risk classification.",
      evidenceIds: [
        "evidence-article-6-high-risk-001",
        "evidence-article-14-human-oversight-001"
      ]
    },
    {
      claim:
        "High-risk systems are subject to human oversight requirements.",
      evidenceIds: [
        "evidence-article-14-human-oversight-001",
        "evidence-article-14-override-001"
      ]
    }
  ],

  sources: [
    {
      title:
        "Regulation (EU) 2024/1689 — Artificial Intelligence Act",
      url:
        "https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng",
      evidenceIds: [
        "evidence-article-6-high-risk-001",
        "evidence-annex-iii-employment-001",
        "evidence-article-14-human-oversight-001",
        "evidence-article-14-override-001"
      ]
    }
  ]
};