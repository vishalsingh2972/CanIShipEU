export type RegulatorySource = {
  id: string;

  title: string;
  authority: string;

  url: string;

  publishedAt?: string;
  updatedAt?: string;

  effectiveFrom?: string;
  effectiveUntil?: string;

  jurisdiction: string;

  topic:
    | "ai_act"
    | "employment_ai"
    | "human_oversight"
    | "transparency"
    | "gdpr"
    | "national"
    | "guidance"
    | "other";

  version: string;

  sourceType:
    | "regulation"
    | "official_guidance"
    | "official_report"
    | "national_authority"
    | "other";

  references?: {
    article?: string;
    annex?: string;
    section?: string;
  };

  notes?: string;
};

export type EvidenceChunk = {
  id: string;

  sourceId: string;

  title: string;

  url: string;

  location?: string;

  text: string;

  authority: string;

  jurisdiction: string;

  retrievedAt: string;

  evidenceType:
    | "classification"
    | "requirement"
    | "definition"
    | "timeline"
    | "exception"
    | "guidance"
    | "other";
};

export type RegulatoryFact = {
  id: string;

  label: string;

  value: string | boolean | string[];

  importance: "high" | "medium" | "low";

  regulatoryImpact: string;

  evidenceIds?: string[];
};

export type StartupProfile = {
  product: string;
  domain?: string;
  aiCapability?: string;
  users?: string[];
  affectedPeople?: string[];

  decisionRole?:
    | "none"
    | "assistance"
    | "recommendation"
    | "decision"
    | "unknown";

  humanInvolvement?: boolean | "unknown";

  usesPersonalData?: boolean | "unknown";
  usesSensitiveData?: boolean | "unknown";
  usesBiometrics?: boolean | "unknown";

  geography?: string[];

  plannedLaunch?: string;

  role?:
    | "provider"
    | "deployer"
    | "provider_and_deployer"
    | "unknown";

  additionalContext?: string;
  clarifiedFacts?: string[];
};

export type Assessment = {
  status:
    | "LIKELY_REGULATED"
    | "POTENTIALLY_RESTRICTED"
    | "INSUFFICIENT_EVIDENCE"
    | "NO_ANNEX_III_HOOK_FOUND";

  confidence: "low" | "medium" | "high";

  asOfDate: string;

  summary: string;

  why: string[];

  relevantRegulations: string[];

  requirements: string[];

  importantDates: {
    date: string;
    description: string;
    evidenceIds: string[];
  }[];

  euVsUs: {
    eu: string;
    us: string;
  };

  uncertainties: string[];

  whatWouldChangeAssessment: string[];

  claims: {
    claim: string;
    evidenceIds: string[];
  }[];

  sources: {
    title: string;
    url: string;
    evidenceIds?: string[];
  }[];
};

export type ResearchQuery = {
  original: string;
  rewrite?: string;
  stepBack?: string;
  subQuestions?: string[];
  keywords?: string[];
};