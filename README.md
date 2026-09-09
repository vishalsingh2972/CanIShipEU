# 🇪🇺 CanIShipEU

### Can you ship this in Europe? Just ask.

**CanIShipEU** is a voice-first regulatory research assistant for startup founders.

Describe what you're building in your own words. CanIShipEU turns that description into a structured startup profile, identifies the regulatory questions that actually matter, researches authoritative sources, checks whether it has enough evidence to answer, and explains the result in plain language — including an **EU vs US comparison**.

> **Your startup idea. EU reality. One conversation.**

---

## 💡 Why CanIShipEU?

Founders don't usually wake up thinking:

> "I need to determine whether my AI system falls under a particular regulatory classification."

They think:

> "I'm building an AI recruiter. Can I launch it in Germany?"

or:

> "We're building an AI product for hiring. What do we need before launching in France?"

The problem isn't simply finding regulations.

The harder problem is figuring out:

* Which regulations are actually relevant?
* Which facts about the startup matter?
* What questions should the founder answer?
* Is the company acting as a provider, deployer, or both?
* Which sources are authoritative?
* Are those sources current?
* Is the retrieved evidence actually sufficient?
* What requirements might apply?
* What remains uncertain?
* What facts would change the assessment?

CanIShipEU is designed around that investigation problem.

### Product philosophy

> **Don't ask the founder to understand regulation. Understand the founder's product first.**

Instead of forcing founders through a regulatory questionnaire, CanIShipEU starts with a natural conversation and progressively turns that conversation into the context required for meaningful regulatory research.

---

# 🎯 V1 Focus: Employment AI

CanIShipEU intentionally starts narrow.

The first deeply validated scenario is:

> **AI systems used in recruitment and employment.**

For example:

> "I'm building an AI recruiter that reads CVs, scores candidates and recommends who should get interviewed. We're planning to launch in France next year."

This is deliberately chosen because employment AI contains the exact ambiguity CanIShipEU is designed to solve:

* What does the AI actually do?
* Who uses it?
* Who is affected?
* Does it assist, recommend, or decide?
* Is there human involvement?
* Who is the provider?
* Who is the deployer?
* What data is processed?
* Which jurisdiction matters?
* Which requirements apply by the intended launch date?

The objective is not to claim coverage of every possible AI system.

The objective is to make **one difficult founder scenario extremely good** before expanding.

---

# 🧠 What Makes It Different?

A generic AI regulatory assistant looks like:

```text
Question
   ↓
LLM
   ↓
Answer
```

CanIShipEU is designed as an investigation workflow:

```text
Founder
   ↓
Understand
   ↓
StartupProfile
   ↓
Clarify
   ↓
Regulatory Mapping
   ↓
Research Questions
   ↓
Query Translation
   ↓
Hybrid Retrieval
   ↓
Evidence Fusion
   ↓
Evidence Sufficiency
   ↓
Corrective Research
   ↓
Grounded Reasoning
   ↓
Validate
   ↓
Assessment
   ↓
Explain
   ↓
Follow-up
```

The goal isn't to build a model that is "smarter than ChatGPT."

The goal is to build a better **product workflow around the model**.

> **Don't build an AI that answers regulatory questions. Build an AI that figures out which regulatory questions a founder needs answered.**

---

# 🗣️ The Core Experience

A founder can simply say:

> "I'm building an AI recruitment platform that reads CVs, scores candidates and recommends who should get interviewed. We're planning to launch in France next year."

CanIShipEU might ask:

> "Does the AI make the final hiring decision, or does a human make the final decision?"

The founder answers:

> "A human makes the final decision."

CanIShipEU does **not** automatically treat that answer as proof that the system is low-risk.

Instead, the new information becomes another input to the investigation.

The system may continue with questions such as:

> "Are employers using your system to evaluate or rank candidates?"

or:

> "Are you providing the AI system to employers, or are you also using it yourself to make hiring decisions?"

The result is a structured investigation rather than a chatbot response.

---

# 🔄 End-to-End Workflow

```text
Founder
   ↓
Natural language description
   ↓
Understand the startup
   ↓
Build StartupProfile
   ↓
Identify material uncertainty
   ↓
Ask targeted clarification
   ↓
Determine provider / deployer role
   ↓
Map relevant regulatory topics
   ↓
Generate research questions
   ↓
Translate / expand queries
   ↓
Retrieve authoritative sources
   ↓
Fuse + rank evidence
   ↓
Check evidence sufficiency
   ↓
Research missing gaps if necessary
   ↓
Build EvidencePack
   ↓
Reason only over supplied evidence
   ↓
Validate assessment
   ↓
Map claims → evidence
   ↓
Generate founder brief
   ↓
Explain through text + voice
   ↓
Follow-up / reassessment
```

---

# 👤 Who Is It For?

CanIShipEU is primarily designed for:

* Startup founders
* Indie hackers
* Product teams
* AI startups
* Pre-launch companies
* Developers building products for the EU market
* Non-EU founders considering an EU launch
* US founders evaluating Europe as a market

Especially founders asking:

> **"Can I actually launch this in Europe?"**

---

# 🧩 Startup Understanding

Before researching regulation, CanIShipEU creates a structured representation of the startup.

```ts
type StartupProfile = {
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

  role?:
    | "provider"
    | "deployer"
    | "provider_and_deployer"
    | "unknown";

  geography?: string[];
  plannedLaunch?: string;

  additionalContext?: string;
};
```

Example:

```json
{
  "product": "AI recruitment platform",
  "domain": "employment",
  "ai_capability": "candidate scoring and recommendation",
  "users": ["employers", "recruiters"],
  "affected_people": ["job applicants"],
  "decision_role": "recommendation",
  "human_involvement": true,
  "uses_personal_data": true,
  "uses_sensitive_data": "unknown",
  "uses_biometrics": false,
  "role": "provider",
  "geography": ["France", "European Union"],
  "planned_launch": "2027"
}
```

The profile is not intended to be a legal classification by itself.

It is the structured context used to determine **what needs to be investigated**.

---

# ❓ Targeted Clarification

CanIShipEU does not ask founders to complete a giant regulatory questionnaire.

It asks questions only when the answer could materially change the research or assessment.

Examples:

* Does the AI make the final decision?
* Does the AI rank or evaluate candidates?
* Does a human review the AI output?
* Who actually uses the system?
* Are you providing the system to another organization?
* Are you also using the system internally?
* Does the system process personal data?
* Does it process sensitive data?
* Does it use biometric information?
* Who is affected by the system?
* Which countries are you launching in?
* When are you planning to launch?

The clarification loop is:

```text
Conversation
     ↓
Current StartupProfile
     ↓
Detect uncertainty
     ↓
Does the uncertainty materially matter?
     │
   ┌─┴─┐
   │   │
  No  Yes
   │   │
   │   ↓
   │ Ask targeted question
   │   ↓
   └ Update profile
```

The objective is not to collect every possible fact.

The objective is to collect the **minimum context required for useful research**.

---

# 🏢 Provider vs Deployer

A critical part of the prototype is distinguishing between the role a company plays in relation to an AI system.

A founder saying:

> "We're building an AI recruiter"

does not automatically tell us whether the company is:

```text
Provider
Deployer
Provider + Deployer
Unknown
```

CanIShipEU therefore treats this as a first-class part of the startup context.

Example:

```text
Startup
   ↓
How is the AI system used?
   ↓
Who develops / places it on the market?
   ↓
Who actually deploys / uses it?
   ↓
Provider / Deployer hypothesis
```

The system should not silently collapse different obligations into one generic "startup responsibility."

If the role is uncertain, that uncertainty should remain visible.

---

# ⚖️ Regulatory Mapping

Once enough context exists, CanIShipEU identifies relevant regulatory areas.

The system combines deterministic rules with LLM reasoning.

For example:

```text
IF domain = employment
AND AI capability involves candidate evaluation
→ flag employment-AI research

IF usesBiometrics = true
→ flag biometric AI research

IF geography includes EU
→ include EU regulatory framework

IF plannedLaunch is in the future
→ research requirements and dates relevant to the launch period
```

The exact mapping rules can evolve as regulatory frameworks and guidance change.

The architectural principle is:

> **Use deterministic logic where the decision can be explicit. Use the LLM where interpretation is required.**

The mapping layer identifies **what needs investigation**.

It does not pretend to be the legal authority.

---

# 📅 Time-Aware Research

Regulatory research is not only about:

> "What does the law say?"

It is also about:

> **"What applies when this founder plans to launch?"**

CanIShipEU therefore treats dates as first-class research data.

Each important source can carry metadata such as:

```ts
type SourceMetadata = {
  sourceId: string;
  title: string;
  url: string;

  authority: string;

  publishedAt?: string;
  updatedAt?: string;

  effectiveDate?: string;
  jurisdiction?: string;

  version?: string;
};
```

The UI should make the research state explicit:

```text
ASSESSMENT AS OF
September 2026
```

or another appropriate date.

The system should distinguish between:

```text
Publication date
Update date
Effective date
Planned applicability date
```

A stale source should not silently look equivalent to a current primary source.

---

# 🔎 Research Question Generation

A founder's original question is often too broad to search effectively.

For example:

> "Can I ship my AI recruiter in Europe?"

CanIShipEU turns that into a research plan.

### Original question

> Can I ship this AI recruiter in Europe?

### Standalone rewrite

> What EU regulatory requirements may apply to an AI system used to evaluate job candidates?

### Step-back question

> How does EU law regulate AI systems used in employment and candidate evaluation?

### Subquestions

* Does the described use case fall within an employment-related regulated category?
* What role does candidate evaluation play?
* Does human oversight change the relevant obligations?
* What obligations may apply to the provider?
* What obligations may apply to the deployer?
* What transparency requirements matter?
* What documentation requirements matter?
* What data protection considerations matter?
* Which requirements apply by the planned launch date?
* What evidence is still missing?

### Exact keyword queries

```text
employment
candidate evaluation
recruitment
high-risk
human oversight
provider
deployer
```

The original founder question is **always preserved** alongside generated queries.

This matters because a poor rewrite should never silently replace what the founder actually asked.

---

# 🔬 Advanced Evidence Research Pipeline

The research layer is designed as a multi-stage retrieval and verification pipeline rather than a single search call.

```text
Research Question
       ↓
Query Translation
       ↓
┌──────┼──────────┬────────────┐
↓      ↓          ↓            ↓
Original Rewrite  Step-back   Subquestions
                         + keyword queries
       ↓
Hybrid Retrieval
       ↓
Semantic + Keyword Results
       ↓
Reciprocal Rank Fusion
       ↓
Optional Reranking
       ↓
Candidate Evidence
       ↓
Evidence Sufficiency Check
       ↓
┌──────┴──────┐
│             │
Weak          Sufficient
│             │
↓             ↓
Identify Gap  EvidencePack
│             │
↓             │
Refined Query │
│             │
└──────┬──────┘
       ↓
Additional Retrieval
       ↓
Best Evidence Round
       ↓
Grounded Assessment
```

The goal is:

> **Research until supported, not until something can be said.**

---

# 🔀 Hybrid Retrieval

Regulatory research has two different retrieval problems.

### Semantic retrieval

Useful for questions such as:

> "What EU rules apply to software that evaluates job candidates?"

This searches by meaning.

### Keyword retrieval

Useful for exact terminology such as:

```text
Article 6
Annex III
employment
candidate evaluation
human oversight
provider
deployer
```

These searches are sensitive to exact terms and phrases.

CanIShipEU can combine both:

```text
                  Research Query
                       │
              ┌────────┴────────┐
              ↓                 ↓
       Semantic Search    Keyword Search
              │                 │
              └────────┬────────┘
                       ↓
              Reciprocal Rank
                  Fusion
                       ↓
                Candidate Set
```

This gives the retrieval layer both semantic flexibility and exact-match precision.

---

# 🧮 Reciprocal Rank Fusion

Multiple retrieval strategies can produce different rankings.

Instead of trusting one ranking, CanIShipEU can combine them using **Reciprocal Rank Fusion (RRF)**.

Conceptually:

```text
Semantic results
      +
Keyword results
      +
Research-query results
      ↓
     RRF
      ↓
Unified ranking
```

RRF is intentionally implemented as a small retrieval utility rather than requiring a large infrastructure stack.

---

# 🎯 Reranking

After initial retrieval and fusion, candidate evidence can be reranked against the **original founder question** and the specific research question.

This helps prevent generated query rewrites from becoming the only definition of relevance.

Conceptually:

```text
Original founder question
          +
Research question
          +
Candidate evidence
          ↓
      Relevance score
          ↓
       Top evidence
```

A cross-encoder or equivalent reranking model can be introduced where it provides enough value to justify the additional complexity.

Reranking is optional if the initial corpus is small enough that deterministic ranking is sufficient.

---

# 🔁 Corrective Evidence Research

CanIShipEU does not assume that the first retrieval is sufficient.

Before generating an assessment, the system evaluates whether the retrieved evidence can actually answer the research question.

For example:

```text
Research Question
      ↓
Search
      ↓
Retrieved Evidence
      ↓
Evidence Sufficiency
      ↓
      5/10
```

The system may identify:

> "The evidence discusses AI regulation generally, but does not establish whether this particular employment use case falls within the relevant category."

That missing piece becomes the next research target.

```text
Round 1
   ↓
Evidence insufficient
   ↓
Identify missing information
   ↓
Generate targeted query
   ↓
Round 2
   ↓
Evaluate evidence again
```

The system should use a bounded number of rounds, for example:

```text
Maximum corrective rounds: 2–3
```

It should keep the strongest evidence round rather than blindly using the final round.

The principle is:

> **If the evidence is insufficient, improve the research before improving the prose.**

---

# 📦 EvidencePack

Research results are converted into a structured evidence package before assessment.

```ts
type ResearchQuery = {
  original: string;

  rewrite?: string;
  stepBack?: string;

  subQuestions?: string[];
  keywords?: string[];
};
```

```ts
type EvidenceChunk = {
  sourceId: string;

  title: string;
  url: string;

  location?: string;

  text: string;

  score?: number;

  retrievalRound?: number;
};
```

```ts
type EvidencePack = {
  question: string;

  chunks: EvidenceChunk[];

  gaps: string[];

  retrievalRound: number;

  sufficient: boolean;
};
```

This gives the assessment layer a controlled research boundary.

---

# 📚 Evidence-First Reasoning

CanIShipEU does not treat the LLM as the legal authority.

The research layer builds an evidence package before the assessment model reasons over it.

Conceptually:

```text
Research Question
       ↓
Source
       ↓
Relevant Section
       ↓
Evidence / Fact
       ↓
What the Evidence Supports
```

An evidence object can look like:

```ts
type Evidence = {
  sourceId: string;
  title: string;
  url: string;

  section?: string;
  page?: number;
  timestamp?: string;

  chunk: string;

  supports: string;
};
```

This makes the research layer easier to:

* inspect
* debug
* evaluate
* cite
* improve

---

# 🔗 Claim → Evidence → Assessment

The system is designed around an explicit reasoning chain:

```text
Research Question
       ↓
Evidence
       ↓
Claim
       ↓
Assessment
```

For example:

```text
QUESTION

Does candidate evaluation fall into a regulated category?

       ↓

EVIDENCE

Official source
Relevant section
Supporting text

       ↓

CLAIM

The described use case appears relevant
to the relevant employment provisions.

       ↓

ASSESSMENT

LIKELY REGULATED
```

This is intentionally different from:

```text
Sources → LLM → Magical Answer
```

The aim is to make important conclusions traceable back to evidence.

---

# 🔗 Citation Integrity

Citations are treated as structured data rather than decorative text.

The assessment model receives controlled evidence identifiers:

```text
[EVIDENCE_01]
[EVIDENCE_02]
[EVIDENCE_03]
```

If the model writes:

```text
The described use case appears relevant
to employment-related provisions.
[EVIDENCE_01]
```

the server resolves that identifier to the actual source.

Conceptually:

```text
[EVIDENCE_01]
      ↓
Evidence record
      ↓
Real source
      ↓
Real URL
      ↓
Relevant article / section / page
```

If the model produces a citation identifier that does not exist in the supplied evidence set, it should not be displayed.

This prevents the model from fabricating references.

---

# 🛡️ Evidence Contract

The assessment layer follows an explicit evidence contract.

### Every material claim should be supported.

If a claim matters to the assessment, it should have supporting evidence.

### Unsupported claims should not become facts.

If the research layer cannot support a claim:

```text
Do not guess.
Do not invent.
Do not confidently complete the sentence.
```

Instead:

```text
Mark uncertainty
      or
Research the missing fact
      or
Omit the claim
```

### Dates require explicit support.

Regulatory dates should come from identified evidence, not model memory.

### Evidence and interpretation stay separate.

The system should distinguish:

```text
SOURCE SAYS
```

from:

```text
CANISHIPEU INTERPRETATION
```

### Evidence floor

If the evidence cannot support a meaningful assessment, the system should return:

> **INSUFFICIENT EVIDENCE**

rather than manufacturing a confident answer.

---

# 🏛️ Research Sources

CanIShipEU prioritizes authoritative sources.

### Tier 1 — Primary / authoritative

* European Commission
* EUR-Lex
* Official EU institutions
* Official EU regulatory guidance

### Tier 2 — National sources

* National regulators
* Government agencies
* Official national guidance

### Tier 3 — Secondary analysis

* Reputable legal analysis
* Regulatory commentary
* Industry guidance

Secondary sources may provide useful context, but primary sources should carry the assessment wherever possible.

---

# 📅 Versioned Source Pack

The prototype uses a **curated, versioned source pack** rather than pretending to have a complete legal database.

The initial corpus should prioritize the employment/recruitment case.

Each source should have metadata such as:

```text
Source ID
Title
Authority
URL
Publication date
Last updated date
Effective date
Jurisdiction
Relevant article / section
Corpus version
```

Example:

```json
{
  "source_id": "eu-example-001",
  "title": "Official EU source",
  "authority": "European Union",
  "url": "https://example.eu",
  "published_at": "2026-01-01",
  "updated_at": "2026-08-01",
  "jurisdiction": "EU",
  "version": "2026-09"
}
```

The corpus should be deliberately small enough that it can be inspected by a human.

> **A small trustworthy corpus is better than a giant unverified corpus.**

---

# 🟡 Assessment Philosophy

The first version intentionally avoids making the UI look like a regulatory permit.

A traffic light is easy to screenshot, misunderstand and quote out of context.

Instead, the assessment uses research-oriented statuses.

### `LIKELY REGULATED`

The sources reviewed indicate that the described system is likely within a relevant regulatory category or obligation set.

### `POTENTIALLY RESTRICTED`

The evidence indicates that significant restrictions, prohibitions, conditions or other serious regulatory concerns may apply.

### `INSUFFICIENT EVIDENCE`

The available evidence is not sufficient to make a meaningful assessment.

### `NO ANNEX III HOOK FOUND IN SOURCES REVIEWED`

Where appropriate, and only after sufficiently targeted research, the system may state that it did not identify a relevant Annex III hook in the sources reviewed.

This is **not** a declaration of compliance.

It means only:

> **No relevant hook was identified in the evidence reviewed.**

The system should never imply:

> "You're legally cleared."

or:

> "You are definitely compliant."

---

# 📊 Assessment Schema

```ts
type Assessment = {
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

  sources: {
    title: string;
    url: string;
    evidenceIds?: string[];
  }[];
};
```

---

# 🔄 What Would Change This Assessment?

This is a first-class product feature.

The founder shouldn't only see:

> "Here's the answer."

They should also see:

> **"Here's what could change the answer."**

For example:

```text
WHAT WOULD CHANGE THIS ASSESSMENT?

• If the AI stops evaluating candidates
• If the system is used only for administrative assistance
• If the company is only a deployer rather than a provider
• If the launch geography changes
• If the planned launch date changes
• If biometric processing is introduced
```

This turns the product from a static answer generator into a decision-support system.

---

# 🇪🇺 EU vs 🇺🇸 US

Founders often aren't asking only:

> "What does Europe require?"

They're asking:

> **"Should we launch in Europe or the US first?"**

CanIShipEU therefore includes an EU vs US comparison.

The comparison is intentionally narrow.

The system should not pretend that:

```text
EU = one universal rule
US = one universal rule
```

Instead, it should research the specific use case.

Example:

```text
🇪🇺 EUROPE

Relevant horizontal framework
Relevant employment considerations
Applicable dates
Data protection considerations
Specific obligations identified


🇺🇸 UNITED STATES

Relevant federal considerations
Relevant state considerations
Sector-specific requirements where supported
No equivalent horizontal regime where applicable
Important uncertainties
```

If no relevant US rule has been retrieved, the system should say so.

For example:

> "No equivalent horizontal regime was identified in the sources reviewed."

That is preferable to generating a generic:

> "The US is less regulated."

The US comparison exists to support founder decisions, not to produce artificial symmetry.

---

# 🎙️ Voice Is the Interface

Voice isn't just a microphone attached to a chatbot.

It is the primary interaction model.

The founder should be able to explain their startup the same way they would explain it to another founder.

```text
Founder
   ↓
Microphone
   ↓
Speech-to-Text
   ↓
Conversation State
   ↓
Startup Understanding
   ↓
Regulatory Research
   ↓
Assessment
   ↓
Response Text
   ↓
Text-to-Speech
   ↓
Founder
```

The screen provides the detailed evidence and assessment.

The voice provides the concise explanation.

This keeps the interaction conversational without hiding the underlying research.

---

# 🔊 Voice Provider Architecture

CanIShipEU uses a provider abstraction rather than tightly coupling the product to one voice implementation.

```ts
type VoiceProvider = {
  transcribe(audio: Buffer): Promise<string>;

  synthesize(
    text: string,
    options?: VoiceOptions
  ): Promise<Buffer>;
};
```

Supported provider names:

```ts
type VoiceProviderName =
  | "gradium"
  | "cartesia"
  | "sarvam";
```

---

## Primary Voice: Gradium

Gradium is the primary voice provider for the prototype.

The main demo path should be:

```text
Founder
   ↓
Gradium STT
   ↓
CanIShipEU reasoning
   ↓
Gradium TTS
   ↓
Founder
```

The product also uses **Gradium Voice Design** to create a dedicated CanIShipEU voice identity.

The intended voice direction:

> **A calm European female voice in her late thirties, clear and authoritative without sounding corporate, neutral international English with a subtle European character, warm but precise, medium-low pitch, deliberate conversational pacing, confident and analytical, reassuring when explaining uncertainty, never dramatic or overly enthusiastic. Designed for a voice-first regulatory research assistant helping startup founders understand complex EU rules.**

The objective is not to showcase voice technology for its own sake.

The objective is for the founder to hear a **consistent, recognizable CanIShipEU voice**.

---

# 🎨 Voice Design

The Voice Design workflow is:

```text
Voice description
       ↓
Generate candidates
       ↓
Evaluate candidates
       ↓
Choose CanIShipEU voice
       ↓
Store selected voice
       ↓
Use through TTS
```

The main application should not expose a voice marketplace or voice picker.

The user should simply experience:

> **The CanIShipEU voice.**

Voice Design therefore becomes part of the product's identity rather than another feature in the UI.

---

# 🧪 Optional Voice Providers

### Cartesia

Cartesia can be integrated as an optional provider adapter for:

* Voice experiments
* Latency comparisons
* TTS quality comparisons
* Alternative voice paths

It does not need to participate in every request.

### Sarvam

Sarvam can be integrated as an optional multilingual provider adapter for:

* Multilingual founder conversations
* Language experiments
* Future localization

The core prototype remains English-first.

### Why not use all providers simultaneously?

Because that would turn CanIShipEU into a voice API showcase.

The architecture is instead:

```text
                 VoiceProvider
                      │
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
    Gradium        Cartesia      Sarvam
    Primary        Optional      Optional
```

The product remains the focus.

The providers are replaceable infrastructure.

---

# 🎨 Avatar Philosophy

CanIShipEU intentionally avoids celebrity faces or recognizable public-figure voices.

The product should not depend on a political or celebrity likeness.

If an avatar is eventually added, it should be:

* An original CanIShipEU character
* A subtle animated analyst
* Or simply an animated orb/interface

The important demo moment should be:

> **"It understood my startup."**

not:

> **"Why is a celebrity talking to me?"**

Voice and reasoning remain the focus.

---

# 🔄 LiveKit / Realtime Direction

Realtime voice infrastructure can be explored as a future layer.

The initial architecture remains:

```text
Mic
 ↓
STT
 ↓
Reasoning
 ↓
TTS
 ↓
Audio
```

A future realtime architecture could become:

```text
Founder
   ↕
Realtime Voice Agent
   ↕
CanIShipEU Reasoning Engine
```

This could eventually enable:

* Natural turn-taking
* Interruptions
* Lower perceived latency
* More fluid conversations
* Continuous voice interaction

LiveKit is therefore treated as an **optional realtime experiment**, not a requirement for the core MVP.

The text research brief must be useful even if all voice infrastructure is removed.

---

# 🔄 Conversation State

The assistant maintains lightweight conversation history.

```ts
type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};
```

Conversation states can include:

```text
Idle
 ↓
Listening
 ↓
Transcribing
 ↓
Understanding
 ↓
Clarifying
 ↓
Researching
 ↓
Verifying
 ↓
Assessing
 ↓
Speaking
 ↓
Waiting
```

The UI can expose the high-level research state:

```text
UNDERSTANDING       ✓
IDENTIFYING         ✓
RESEARCHING         ✓
CHECKING EVIDENCE   ●
ANALYZING           ○
BUILDING BRIEF      ○
```

This reinforces the core product idea:

> **The system is investigating, not merely generating text.**

---

# 🧠 LLM Architecture

The LLM is used where natural-language understanding and reasoning are valuable.

Examples:

* Understanding startup descriptions
* Extracting structured startup context
* Identifying material uncertainty
* Generating clarification questions
* Generating research questions
* Translating queries
* Identifying research gaps
* Reasoning over collected evidence
* Explaining results in natural language

The LLM is **not** treated as the source of truth for regulations.

Conceptually:

```ts
const result = await llm.analyze({
  startupProfile,
  evidencePack
});
```

The LLM provider can be changed without rewriting the product architecture.

---

# 🧱 Lightweight Research Architecture

CanIShipEU deliberately does **not** copy large advanced-RAG architectures wholesale.

The prototype does not need:

```text
Postgres
+
Qdrant
+
Redis
+
BullMQ
+
S3
+
multiple backend services
+
large crawler
```

just to prove the concept.

Instead:

```text
Curated source corpus
       ↓
Simple metadata
       ↓
Lightweight retrieval
       ↓
Semantic + keyword search
       ↓
RRF
       ↓
Optional reranking
       ↓
Evidence grading
       ↓
Corrective research
```

A vector database can be introduced later if the corpus becomes large enough to justify it.

The architecture should earn its complexity.

---

# 🚫 What We Deliberately Do NOT Copy

CanIShipEU borrows useful ideas from advanced RAG systems, but not their entire infrastructure.

We deliberately avoid:

* ❌ Giant vector databases for a tiny corpus
* ❌ Distributed queues
* ❌ Microservice architecture
* ❌ Arbitrary user-source ingestion in V1
* ❌ Complex SQL routing
* ❌ Huge crawler infrastructure
* ❌ Background processing infrastructure
* ❌ Full legal database replication
* ❌ Framework-heavy RAG abstractions
* ❌ Analytics systems before the core loop works

We keep the mechanisms that improve evidence quality:

* Original query preservation
* Query decomposition
* Hybrid retrieval
* RRF
* Optional reranking
* Evidence sufficiency grading
* Corrective research
* Best-round selection
* Claim-to-evidence mapping
* Evidence-floor refusal

This is an engineering judgment:

> **Borrow the mechanism, not the architecture.**

---

# 💰 Cost Strategy

The prototype follows a **$0-first development strategy**.

The goal is to use available free tiers and credits efficiently while avoiding unnecessary infrastructure.

### Voice

* Gradium — primary
* Cartesia — optional
* Sarvam — optional

### LLM

* OpenRouter free models where appropriate
* Groq free tier as fallback / alternative

### Research

* Curated authoritative EU sources
* Lightweight retrieval

### Infrastructure

* Next.js
* Local development first
* Optional Vercel deployment later

The prototype does not depend on a paid Gemini plan.

Free-tier availability and provider limits can change, so the implementation should never assume unlimited free inference.

---

# 🏗️ Architecture

```text
                         FOUNDER
                            │
                            ▼
                    Voice / Text UI
                            │
                            ▼
                 Voice Provider Layer
                  ┌────────┼────────┐
                  ↓        ↓        ↓
               Gradium  Cartesia  Sarvam
               Primary  Optional  Optional
                  │
                  ▼
               Transcript
                  │
                  ▼
           Conversation State
                  │
                  ▼
          Startup Understanding
                  │
                  ▼
            StartupProfile
                  │
                  ▼
        Material context missing?
             │          │
            YES         NO
             │          │
             ▼          ▼
       Clarification   Regulatory
             │          Mapping
             └────┬─────┘
                  ▼
        Provider / Deployer
             Analysis
                  │
                  ▼
          Research Questions
                  │
                  ▼
            Query Translation
          ┌───────┼─────────┐
          ↓       ↓         ↓
       Rewrite  Step-back  Subquestions
          │       │         │
          └───────┼─────────┘
                  │
                  ▼
           Hybrid Retrieval
             /         \
            /           \
     Semantic          Keyword
       Search           Search
            \           /
             \         /
              ▼       ▼
                RRF
                │
                ▼
        Optional Reranking
                │
                ▼
          Candidate Evidence
                │
                ▼
       Evidence Sufficiency
                │
          ┌─────┴─────┐
          │           │
       Insufficient  Sufficient
          │           │
          ▼           ▼
      Identify Gap  EvidencePack
          │           │
          ▼           │
   Refined Research │
       Query          │
          │           │
          └─────┬─────┘
                ▼
        Best Evidence Set
                │
                ▼
        Grounded Assessment
                │
                ▼
             Validation
                │
                ▼
        Claim → Evidence Map
                │
          ┌─────┴─────┐
          ▼           ▼
       Visual       Voice
        Brief      Summary
          │           │
          └─────┬─────┘
                ▼
           Follow-up
                │
                ▼
           Reassessment
```

---

# 🧱 Project Structure

```text
canishipeu/
│
├── app/
│   ├── page.tsx
│   │
│   └── api/
│       ├── transcribe/
│       │   └── route.ts
│       ├── understand/
│       │   └── route.ts
│       ├── research/
│       │   └── route.ts
│       ├── assess/
│       │   └── route.ts
│       └── speak/
│           └── route.ts
│
├── components/
│   ├── VoiceInterface.tsx
│   ├── Conversation.tsx
│   ├── StartupProfile.tsx
│   ├── ResearchProgress.tsx
│   ├── AssessmentBrief.tsx
│   ├── EvidencePanel.tsx
│   ├── EUUSComparison.tsx
│   └── Sources.tsx
│
├── lib/
│   ├── gradium.ts
│   ├── cartesia.ts
│   ├── sarvam.ts
│   ├── voice.ts
│   ├── llm.ts
│   │
│   ├── research/
│   │   ├── questions.ts
│   │   ├── retrieval.ts
│   │   ├── fusion.ts
│   │   ├── rerank.ts
│   │   ├── corrective.ts
│   │   └── evidence.ts
│   │
│   ├── regulations.ts
│   ├── prompts.ts
│   └── validation.ts
│
├── data/
│   └── eu-sources.json
│
├── types/
│   ├── startup.ts
│   ├── assessment.ts
│   ├── evidence.ts
│   └── voice.ts
│
├── public/
│
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🔌 API Routes

### `POST /api/transcribe`

Converts recorded audio into text through the selected STT provider.

```text
Audio
 ↓
Voice Provider
 ↓
Transcript
```

---

### `POST /api/understand`

Turns conversation context into a structured `StartupProfile`.

```text
Conversation
 ↓
LLM
 ↓
StartupProfile
```

---

### `POST /api/research`

Runs the regulatory investigation.

```text
StartupProfile
 ↓
Regulatory Mapping
 ↓
Research Questions
 ↓
Query Translation
 ↓
Hybrid Retrieval
 ↓
RRF
 ↓
Optional Reranking
 ↓
Evidence Sufficiency
 ↓
Corrective Research
 ↓
EvidencePack
```

---

### `POST /api/assess`

Reasons over the startup profile and evidence package.

```text
StartupProfile
+
EvidencePack
 ↓
LLM
 ↓
Assessment
 ↓
Structured Validation
 ↓
Claim / Evidence Validation
```

---

### `POST /api/speak`

Converts the assistant's response into speech.

```text
Response Text
 ↓
Voice Provider
 ↓
Audio
```

---

# 🖥️ Interface

## Homepage

The initial interface is intentionally minimal.

```text
CAN I SHIP THIS
IN EUROPE?

Tell me what you're building.

        🎙️
    Start talking

    or type instead

       🇪🇺 EU
       🇺🇸 US

No legal jargon required.

Prototype / informational tool.
Not legal advice.
```

Possible positioning line:

> **Tell me what you're building. I'll investigate the EU vs US reality.**

---

# 📊 Founder Brief

The result should look like a compact research memo rather than a regulatory traffic light.

```text
┌────────────────────────────────────────────┐
│ CANISHIPEU                                 │
│ Regulatory Research Brief                 │
│                                            │
│ ASSESSMENT AS OF: September 2026           │
│                                            │
│ 🟡 LIKELY REGULATED                        │
│                                            │
│ The sources reviewed indicate that the     │
│ described recruitment use case may fall    │
│ within relevant employment AI provisions.  │
└────────────────────────────────────────────┘


WHY THIS MATTERS

• Candidate evaluation is central to the system
• Employers use the system for recruitment
• Personal data is processed
• Human involvement does not automatically
  remove regulatory relevance


WHAT WE FOUND

✓ Relevant regulatory category
✓ Provider / deployer considerations
✓ Applicable requirements to investigate
✓ Relevant dates


WHAT WOULD CHANGE THIS?

• Change the AI's role
• Remove candidate evaluation
• Change deployment model
• Change geography
• Change launch timing


EVIDENCE

[EVIDENCE_01]
Official source
Relevant section


[EVIDENCE_02]
Official source
Relevant section


EU 🇪🇺 vs US 🇺🇸

Concise, source-backed comparison.


OPEN QUESTIONS

• ...
• ...


Prototype / informational tool.
Not legal advice.
```

The goal is to make the output:

* Useful
* Scannable
* Screenshot-friendly
* Evidence-backed
* Honest about uncertainty

---

# 🔬 Research Progress UI

Research should feel transparent rather than like a generic loading spinner.

```text
UNDERSTANDING       ✓
IDENTIFYING         ✓
RESEARCHING         ✓
CHECKING EVIDENCE   ●
ANALYZING           ○
BUILDING BRIEF      ○
```

During corrective research:

```text
Evidence check

Round 1
  Evidence insufficient

Missing:
Candidate classification

Searching for:
Employment + candidate evaluation

Round 2
  Evidence improved
```

This makes the research process itself part of the product experience.

---

# 🧪 Example

### Founder

> "I'm building an AI recruiter that reads CVs, scores candidates and recommends who should get interviewed. We're planning to launch in Germany next year."

### CanIShipEU

> "Are you providing this AI system to employers, using it internally yourself, or both?"

Founder:

> "We're selling it to companies. They use it during hiring."

CanIShipEU:

> "Does the system only help recruiters organize candidates, or does it evaluate or rank candidates?"

Founder:

> "It scores them and recommends who should be interviewed."

CanIShipEU:

> "Does a human make the final hiring decision?"

Founder:

> "Yes."

### Internal process

```text
StartupProfile
      ↓
Employment identified
      ↓
Candidate evaluation identified
      ↓
Provider role identified
      ↓
Human involvement identified
      ↓
EU deployment identified
      ↓
Launch date identified
      ↓
Research questions generated
      ↓
Official sources retrieved
      ↓
Evidence checked
      ↓
Missing evidence identified
      ↓
Corrective research
      ↓
Assessment generated
```

### Result

```text
LIKELY REGULATED

Assessment as of:
September 2026

Why:

• Employment context identified
• Candidate evaluation is central
• AI influences recruitment decisions
• Provider / deployer responsibilities require analysis
• Human involvement does not automatically remove
  regulatory relevance


What to investigate:

• Applicable AI classification
• Provider obligations
• Deployer obligations
• Human oversight
• Documentation
• Transparency
• Data protection


What would change this:

• Removing candidate evaluation
• Changing the AI's role
• Changing deployment model
• Changing geography
• Changing launch timing


Evidence:

Primary sources reviewed
with traceable sections.


EU vs US:

Specific differences identified from
sources reviewed.
```

The exact assessment depends on the evidence retrieved for the specific scenario.

---

# 🎥 Demo Story

The demo should focus on the product experience rather than listing technologies.

```text
0:00
"European founders keep asking one question..."

0:05
CAN I SHIP THIS IN EUROPE?

0:08
Founder starts talking.

0:12
Transcript appears.

0:15
System asks a smart clarification.

0:20
Founder answers.

0:23
Another material clarification.

0:28
RESEARCHING...

0:33
Evidence appears.

0:38
CHECKING EVIDENCE...

0:42
"One more thing matters..."

0:48
Evidence-backed brief appears.

0:55
"What would change this?"

1:00
EU vs US

1:08
Voice explanation.

1:15
"Built this as a prototype."
```

The goal is for the viewer to think:

> **"It actually understood what information mattered."**

---

# 🧠 What Makes the Engineering Interesting?

The project is intentionally not positioned around any single AI API.

The interesting engineering is the combination of:

### 1. Startup understanding

Natural language → structured startup representation.

### 2. Material clarification

The system determines which missing facts could actually change the investigation.

### 3. Provider / deployer analysis

The system does not collapse different roles into one generic startup responsibility.

### 4. Regulatory routing

Startup characteristics → relevant regulatory research areas.

### 5. Query translation

One founder question → multiple research strategies.

### 6. Hybrid retrieval

Semantic + exact keyword retrieval.

### 7. Evidence fusion

Multiple rankings → unified evidence ranking.

### 8. Corrective research

Insufficient evidence → identify gap → search again.

### 9. Grounded reasoning

Assessment based on supplied evidence.

### 10. Citation integrity

Model-generated evidence references are validated against actual supplied evidence.

### 11. Time-aware research

Sources and regulatory dates are explicitly tracked.

### 12. Reassessment

Changing a material startup assumption can trigger a new investigation.

### 13. Voice-first UX

The entire process feels like an agent rather than a search form.

The components are individually common.

The value comes from **how they are orchestrated around the founder's actual problem**.

---

# 💡 Core Product Insight

The moat isn't the voice.

The moat isn't the LLM.

The moat isn't RAG.

The core idea is the workflow that turns an ambiguous startup description into an evidence-backed regulatory investigation.

```text
Messy startup description
          ↓
Structured context
          ↓
Material uncertainties
          ↓
Relevant questions
          ↓
Relevant research
          ↓
Validated evidence
          ↓
Clear decision context
```

The voice makes the workflow delightful.

The evidence makes it useful.

---

# 🔐 Evidence Over Confidence

A confident LLM answer is not evidence.

CanIShipEU therefore follows:

> **Research until supported, not until something can be said.**

If evidence is weak:

```text
Do not increase confidence.
Increase research.
```

If research still cannot establish the answer:

```text
INSUFFICIENT EVIDENCE
```

This is a deliberate product behavior, not a failure state.

---

# 💰 Why Keep the Infrastructure Small?

This is a prototype, not a production compliance platform.

We intentionally avoid building infrastructure that isn't necessary to demonstrate the core experience.

The initial system does **not** require:

* A distributed architecture
* Multiple backend services
* A large vector database
* Background job infrastructure
* User authentication
* Persistent user accounts
* Payment infrastructure
* A complete legal database

If the product proves useful, these can be introduced later for concrete reasons.

---

# 🚫 Deliberate Scope Limits

CanIShipEU is intentionally **not** trying to become a complete EU legal platform.

The prototype does not include:

* ❌ User accounts
* ❌ Authentication
* ❌ Payments
* ❌ Admin dashboard
* ❌ Mobile app
* ❌ Browser extension
* ❌ PDF upload
* ❌ Full website crawling
* ❌ Complete EU law database
* ❌ Large-scale vector database
* ❌ LangChain / LlamaIndex dependency
* ❌ Microservices
* ❌ Production monitoring
* ❌ Public unlimited API
* ❌ Voice cloning as a core feature
* ❌ Celebrity voice or likeness
* ❌ Full multilingual expansion
* ❌ Multiple regulatory verticals before employment is validated

The objective is to demonstrate the **core product loop extremely well**.

---

# 🧭 Development Principles

### Evidence before conclusions

Regulatory conclusions should be grounded in retrieved sources.

### Research before prose

If evidence is insufficient, improve the research rather than asking the model to produce a more convincing answer.

### Preserve the original question

Generated rewrites should improve retrieval, never replace the founder's actual wording.

### Ask only material questions

Every clarification should have a reason.

### Separate provider and deployer

Do not collapse different responsibilities into a generic startup profile.

### Treat dates as data

Never rely on model memory for important regulatory dates.

### Prefer primary sources

Secondary analysis can help provide context but should not silently replace authoritative sources.

### Structured outputs

Important model outputs should be validated before reaching the UI.

### Claim-to-evidence traceability

Important conclusions should be traceable to the evidence that supports them.

### Refuse unsupported conclusions

Insufficient evidence should result in insufficient evidence.

### Provider abstraction

Voice and LLM providers should be replaceable.

### Small infrastructure

A prototype should not need a distributed architecture to demonstrate a good product idea.

---

# 🧰 Tech Stack

| Layer                       | Technology                    |
| --------------------------- | ----------------------------- |
| Framework                   | Next.js                       |
| Language                    | TypeScript                    |
| UI                          | Tailwind CSS                  |
| Components                  | shadcn/ui                     |
| Primary Voice               | Gradium                       |
| Voice Design                | Gradium Voice Design          |
| Optional Voice              | Cartesia                      |
| Optional Multilingual Voice | Sarvam                        |
| LLM                         | OpenRouter / Groq             |
| Research                    | Curated official EU sources   |
| Retrieval                   | Semantic + keyword + RRF      |
| Reranking                   | Optional                      |
| Reasoning                   | Evidence-grounded LLM         |
| Backend                     | Next.js API Routes            |
| Database                    | None initially                |
| Deployment                  | Local first / optional Vercel |

---

# ⚙️ Environment Variables

Create `.env.local`:

```env
GRADIUM_API_KEY=
CARTESIA_API_KEY=
SARVAM_API_KEY=

OPENROUTER_API_KEY=
GROQ_API_KEY=

VOICE_PROVIDER=gradium
```

The application should use provider abstractions so individual providers can be enabled or disabled without changing the core product logic.

The primary demo path should work with Gradium before optional provider integrations are added.

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd canishipeu
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create:

```text
.env.local
```

and add the required API keys.

## 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🛡️ Safety & Reliability

CanIShipEU is an **informational research prototype**, not a law firm or legal advice service.

The system should:

* Prefer authoritative sources
* Show supporting sources
* Separate evidence from interpretation
* Communicate uncertainty
* Avoid inventing regulations
* Avoid inventing legal dates
* Avoid unsupported legal conclusions
* Validate structured LLM output
* Clearly distinguish facts from assumptions
* Show an explicit assessment date
* Identify important missing evidence
* Encourage professional legal review for consequential decisions

Every assessment should display:

> **Prototype / informational tool — not legal advice.**

---

# 📌 Disclaimer

**CanIShipEU is a prototype for informational and research purposes only. It does not provide legal advice, legal opinions, or guarantees of regulatory compliance.**

Regulatory requirements can depend on the exact product, implementation, jurisdiction, sector, data practices, deployment model, company role and applicable dates.

Always verify important conclusions against current official sources and seek qualified legal advice where appropriate.

---

# 🎯 MVP Success Criteria

The prototype is successful if a founder can say:

> "I'm building an AI recruitment platform in France. It scores candidates and recommends who should be interviewed. Humans make the final decision."

…and the system can:

1. Understand the product.
2. Identify the employment context.
3. Identify candidate evaluation as relevant.
4. Understand the role of human decision-making.
5. Identify the likely provider / deployer role.
6. Ask only useful clarification questions.
7. Preserve uncertainty when important facts are unknown.
8. Identify relevant regulatory topics.
9. Generate targeted research questions.
10. Preserve the founder's original question.
11. Retrieve authoritative sources.
12. Combine semantic and keyword retrieval.
13. Fuse retrieval results.
14. Optionally rerank evidence.
15. Check whether the evidence is sufficient.
16. Identify missing evidence.
17. Perform bounded corrective research.
18. Select the strongest evidence set.
19. Produce a structured evidence-backed assessment.
20. Show the assessment date.
21. Explain why the assessment was reached.
22. Show what would change the assessment.
23. Map important claims to evidence.
24. Show supporting sources.
25. Provide a narrow EU vs US comparison.
26. Explain the result through voice.
27. Continue the conversation with follow-up questions.
28. Reassess when important assumptions change.
29. Return `INSUFFICIENT EVIDENCE` instead of guessing when necessary.

---

# 🚀 What Success Looks Like

The first milestone is **not**:

> "We support eight regulatory domains."

It is:

> **"Give us an AI recruitment startup and we'll investigate it properly."**

The golden case should become so reliable that the research output feels almost boring.

That is a feature.

Once the employment workflow is strong, additional verticals can be added without changing the fundamental product architecture.

---

# 🌍 The Bigger Idea

Europe doesn't have a shortage of regulations.

Founders have a shortage of **clarity**.

CanIShipEU explores whether AI can sit between:

```text
Complex regulation
        +
Messy startup context
        ↓
Evidence-backed founder decision
```

The long-term opportunity is not simply:

> "Ask AI about regulation."

It is:

> **"Tell AI what you're building, and let it figure out what you need to know before you ship."**

---

# 🔮 Future Possibilities

If the core concept proves useful, CanIShipEU could evolve into:

## Regulatory Monitoring

> "Tell me when something affecting my startup changes."

Track:

* Regulatory changes
* Important dates
* New guidance
* Relevant source updates

---

## Founder Compliance Workspace

Track:

* Requirements
* Evidence
* Open questions
* Important dates
* Regulatory changes
* Decisions and assumptions

---

## More Jurisdictions

Expand beyond:

```text
EU 🇪🇺
US 🇺🇸
```

into additional markets.

---

## More Regulatory Domains

Gradually expand into:

```text
Employment
    ↓
Biometrics
    ↓
Health
    ↓
Credit
    ↓
Education
    ↓
Other domains
```

Only after each domain has a sufficiently strong evidence corpus and validation strategy.

---

## Multilingual Founder Conversations

Allow founders to explain products in more languages while preserving the same structured regulatory workflow.

---

## Realtime Voice

Move from request/response voice interactions toward realtime conversational agents with interruption and natural turn-taking.

---

## Voice Provider Benchmarking

Internally compare:

```text
Gradium
Cartesia
Sarvam
```

across:

* Latency
* Transcription quality
* Voice quality
* Multilingual performance

without making provider comparison part of the core product experience.

---

# ⭐ Product Principle

> **The goal isn't to sound certain. The goal is to know when the evidence is strong enough to say something useful.**

---

# 🎯 The One-Liner

> **CanIShipEU is a voice-first AI regulatory research assistant that helps startup founders understand what EU rules may apply to the products they're building — using targeted questions, current evidence and transparent reasoning.**

---

## Built around one question:

# 🇪🇺 Can I ship this in Europe?

### Just ask
