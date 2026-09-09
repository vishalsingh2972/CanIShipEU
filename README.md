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

> "We're building an AI medical assistant. What do we need before launching in Europe?"

The problem isn't simply finding regulations.

The harder problem is figuring out:

* Which regulations are actually relevant?
* What facts about the startup matter?
* What questions should the founder answer?
* Which sources are authoritative?
* Is the retrieved evidence actually sufficient?
* What requirements might apply?
* What remains uncertain?

CanIShipEU is designed around that investigation problem.

### Product philosophy

> **Don't ask the founder to understand regulation. Understand the founder's product first.**

Instead of forcing founders through a regulatory questionnaire, CanIShipEU starts with a natural conversation and progressively turns that conversation into the context required for meaningful regulatory research.

---

# 🎙️ The Core Experience

A founder can simply say:

> "I'm building an AI recruitment platform that reads CVs, scores candidates and recommends who should get interviewed. We're planning to launch in France next year."

CanIShipEU might ask:

> "Does the AI make the final hiring decision, or does a human make the final decision?"

The founder answers:

> "A human makes the final decision."

CanIShipEU then uses that additional context to determine what should actually be researched.

The result is not just an AI-generated paragraph.

It is a structured investigation:

```text
Founder
   ↓
Natural language description
   ↓
Understand the startup
   ↓
Build StartupProfile
   ↓
Identify missing information
   ↓
Ask targeted clarification questions
   ↓
Map relevant regulatory topics
   ↓
Generate research questions
   ↓
Expand research queries
   ↓
Retrieve authoritative sources
   ↓
Fuse + rank evidence
   ↓
Check evidence sufficiency
   ↓
Research missing gaps when necessary
   ↓
Build evidence package
   ↓
Reason over evidence
   ↓
Validate structured assessment
   ↓
Explain the result
   ↓
Continue the conversation
```

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

# 👤 Who Is It For?

CanIShipEU is primarily designed for:

* Startup founders
* Indie hackers
* Product teams
* AI startups
* Pre-launch companies
* Developers building products for the EU market
* Non-EU founders considering an EU launch

Especially founders who are asking:

> **"Can I actually launch this in Europe?"**

---

# 🎯 Initial Use Cases

The prototype intentionally focuses on a limited set of scenarios rather than attempting to cover every EU regulation.

Initial scenarios include:

* 🤖 AI recruitment
* 🏥 Medical / health AI
* 👁️ Biometrics
* 📹 Surveillance systems
* 💳 Credit and financial decision systems
* 🎓 Education AI
* ✍️ Content-generation systems
* 🏭 Industrial / computer vision systems

The regulatory coverage can expand later as the research layer becomes more mature.

---

# 🧩 Startup Understanding

Before researching regulation, CanIShipEU creates a structured representation of the startup.

Example:

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
  "geography": ["France", "European Union"],
  "planned_launch": "2027"
}
```

This structured representation becomes the foundation for the rest of the investigation.

---

# ❓ Targeted Clarification

CanIShipEU does not ask founders to complete a giant regulatory questionnaire.

Instead, it asks questions only when the answer could materially change the assessment.

Examples:

* Does the AI make the final decision?
* Does a human review the AI's output?
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
Does the uncertainty matter?
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

# ⚖️ Regulatory Mapping

Once enough context exists, CanIShipEU identifies relevant regulatory areas.

The system combines deterministic rules with LLM reasoning.

For example:

```text
IF domain = employment
AND AI capability = candidate evaluation
→ flag employment-related AI research

IF usesBiometrics = true
→ flag biometric AI research

IF geography includes EU
→ include EU regulatory framework

IF plannedLaunch is in the future
→ consider rules applicable by launch date
```

The exact mapping rules can evolve as regulatory frameworks and guidance change.

The architectural principle is:

> **Use deterministic logic where the decision can be explicit. Use the LLM where interpretation is required.**

The mapping layer identifies **what needs investigation**.

It does not pretend to be the legal authority.

---

# 🔎 Research Question Generation

A founder's original question is often too broad to search effectively.

For example:

> "Can I ship my AI recruiter in Europe?"

CanIShipEU turns that into a research plan.

### Original question

> Can I ship this AI recruiter in Europe?

### Standalone rewrite

> What EU regulatory requirements apply to AI systems used to evaluate job candidates?

### Step-back question

> How does EU law regulate AI systems used in employment and decision-making?

### Subquestions

* Does candidate evaluation fall into a regulated AI category?
* What obligations may apply?
* Does human oversight affect the assessment?
* What transparency requirements matter?
* What documentation requirements matter?
* What data protection considerations matter?
* Which requirements apply by the planned launch date?

### Exact keyword queries

```text
employment
candidate evaluation
recruitment
high-risk
human oversight
```

The original founder question is **always preserved** alongside generated queries.

This matters because a poor rewrite should never be allowed to silently replace what the founder actually asked.

---

# 🔬 Advanced Research Pipeline

The research layer is designed as a multi-stage retrieval and verification pipeline rather than a single search call.

```text
Research Question
       ↓
Query Translation
       ↓
┌──────┼─────────┬────────────┐
↓      ↓         ↓            ↓
Original Rewrite Step-back  Subquestions
                         + keyword queries
       ↓
Hybrid Retrieval
       ↓
Semantic + Keyword Results
       ↓
Reciprocal Rank Fusion
       ↓
Reranking
       ↓
Top Evidence
       ↓
Evidence Sufficiency Check
       ↓
┌──────┴──────┐
│             │
Insufficient  Sufficient
│             │
↓             ↓
Find Gap      Evidence Pack
│             │
↓             │
New Research  │
Query         │
│             │
└──────┬──────┘
       ↓
Additional Retrieval
       ↓
Best Evidence Round
       ↓
Grounded Assessment
```

The goal is to make the research process **adaptive**, rather than assuming the first retrieval was good enough.

---

# 🔀 Hybrid Retrieval

Regulatory research has two different retrieval problems.

### Semantic retrieval

Useful for questions such as:

> "What EU rules apply to software that evaluates job candidates?"

This searches by meaning.

### Keyword retrieval

Useful for exact terminology such as:

> "Article 6"

or:

> "candidate evaluation"

or:

> "high-risk"

These searches are sensitive to exact words and phrases.

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
                 Ranked Set
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
Other research query results
      ↓
     RRF
      ↓
Unified ranking
```

The system can then keep the strongest candidates for deeper evaluation.

The exact retrieval implementation can evolve as the prototype corpus grows.

---

# 🎯 Reranking

After initial retrieval and fusion, the candidate evidence can be reranked against the **original founder question**.

This is important because generated queries are useful for finding evidence, but the final relevance decision should remain anchored to what the founder actually asked.

Conceptually:

```text
Original founder question
          +
Candidate evidence
          ↓
     Relevance score
          ↓
      Top evidence
```

A cross-encoder or equivalent reranking model can be introduced where it provides enough value to justify the additional complexity.

---

# 🔁 Corrective Research

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
Evidence Sufficiency Grader
      ↓
      5/10
```

The system may identify:

> "The evidence discusses AI regulation generally, but does not establish how candidate evaluation is classified."

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

The system can perform up to a limited number of corrective rounds.

The important principle is:

> **If the evidence is insufficient, improve the research before improving the prose.**

The system keeps the strongest evidence set rather than blindly using the final retrieval round.

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

Does candidate scoring fall into a regulated AI category?

       ↓

EVIDENCE

Official EU source
Relevant section
Supporting text

       ↓

CLAIM

The described use case appears relevant
to the employment-related provisions.

       ↓

ASSESSMENT

YELLOW
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
Candidate evaluation may be subject to
the relevant employment-related provisions.
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
Relevant section / page / timestamp
```

If the model produces a citation identifier that does not exist in the supplied evidence set, it should not be displayed.

This prevents the model from fabricating references.

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

Secondary sources may provide useful context, but the assessment should prioritize primary sources whenever possible.

---

# 🟢 🟡 🔴 Assessment

The system produces a structured assessment rather than a single conversational answer.

```ts
type Assessment = {
  verdict: "GREEN" | "YELLOW" | "RED";

  confidence: "low" | "medium" | "high";

  summary: string;

  why: string[];

  relevantRegulations: string[];

  requirements: string[];

  importantDates: {
    date: string;
    description: string;
  }[];

  euVsUs: {
    eu: string;
    us: string;
  };

  uncertainties: string[];

  sources: {
    title: string;
    url: string;
  }[];
};
```

### Verdict semantics

#### 🟢 GREEN

No major regulatory obstacle was identified from the sources reviewed.

This does **not** mean the product is guaranteed to be legally compliant.

#### 🟡 YELLOW

The product may be launchable, but meaningful regulatory requirements, dependencies or uncertainty need attention.

#### 🔴 RED

A significant restriction, prohibition or serious regulatory obstacle appears relevant based on the evidence reviewed.

The system should never claim:

> "Definitely legal."

or:

> "Definitely illegal."

Instead, it should communicate:

* What was found
* Why it matters
* Which requirements may apply
* What remains uncertain
* Which sources support the assessment

---

# 🇪🇺 EU vs 🇺🇸 US

Founders often aren't asking only:

> "What does Europe require?"

They're asking:

> "Should we launch in Europe or the US first?"

CanIShipEU therefore includes an EU vs US comparison as part of the assessment.

The comparison is designed to provide decision context rather than pretending that "Europe" or "the US" has one universal regulatory framework.

Example:

```text
🇪🇺 EUROPE

Relevant framework
Applicable obligations
Data considerations
Transparency requirements
Human oversight
Important dates


🇺🇸 US

Relevant federal considerations
State-level considerations
Sector-specific requirements
Different compliance path
Important uncertainties
```

The system should clearly distinguish between broad jurisdiction-level context and specific laws that apply to the startup's use case.

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

### Primary: Gradium

Gradium is the primary voice provider for the prototype.

It is used for the main voice interaction:

```text
Founder voice
    ↓
Gradium STT
    ↓
CanIShipEU reasoning
    ↓
Gradium TTS
    ↓
Founder hears response
```

CanIShipEU also uses **Gradium Voice Design** to create a dedicated product voice rather than relying only on a generic preset.

The intended voice is:

> Calm, precise, analytical and reassuring — authoritative without sounding corporate or overly dramatic.

The goal is to give CanIShipEU a recognizable voice identity while keeping the voice itself secondary to the product experience.

### Cartesia

Cartesia is supported as an optional provider adapter for:

* Voice experiments
* Latency / quality comparison
* Alternative TTS paths
* Future fallback strategies

It does not need to participate in every request.

### Sarvam

Sarvam is supported as an optional multilingual provider adapter.

Its potential role is:

* Multilingual founder interaction
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

# 🎨 Voice Design

Voice Design is used as a product-level capability rather than a gimmick.

The intended workflow is:

```text
Voice description
       ↓
Generate candidates
       ↓
Evaluate voice
       ↓
Choose CanIShipEU voice
       ↓
Store voice ID
       ↓
Use through normal TTS
```

The application should not expose a "choose your voice" interface in the main product.

The user should simply experience a consistent CanIShipEU voice.

---

# 🔴 Avatar Philosophy

The prototype intentionally avoids celebrity faces or voices.

The product should not depend on a recognizable political or celebrity likeness.

If an avatar is eventually added, it should be an original CanIShipEU visual identity — or, preferably, a subtle animated interface/orb.

The important demo moment should be:

> **"It understood my startup."**

not:

> **"Why is a celebrity talking to me?"**

Voice remains the primary human interface.

---

# 🔄 LiveKit / Realtime Direction

A future version can experiment with realtime voice infrastructure such as LiveKit.

The initial architecture remains intentionally simple:

```text
Mic
 ↓
STT
 ↓
LLM
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

* More natural turn-taking
* Interruptions
* Lower perceived latency
* Continuous voice conversations

Realtime infrastructure is therefore an **optional evolution**, not a requirement for the core prototype.

---

# 🗣️ Conversation State

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
Thinking
 ↓
Researching
 ↓
Speaking
 ↓
Waiting
```

This allows founders to:

* Clarify their startup
* Correct assumptions
* Ask follow-up questions
* Change launch geography
* Challenge an assessment
* Explore "what if" scenarios

For example:

> "What if we remove the automated candidate ranking?"

The system should be able to update the relevant startup context and reassess the situation.

---

# 🧠 LLM Architecture

The LLM is used where natural-language understanding and reasoning are valuable.

Examples:

* Understanding startup descriptions
* Extracting structured startup context
* Identifying missing information
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
  sources
});
```

The LLM provider can be changed without rewriting the product architecture.

---

# 💰 Cost Strategy

The prototype is designed around a **$0-first development strategy**.

The goal is to use available free tiers and credits efficiently while avoiding unnecessary infrastructure.

### Voice

* Gradium — primary
* Cartesia — optional
* Sarvam — optional

### LLM

* OpenRouter free models where appropriate
* Groq free tier as a fallback / alternative

### Research

* Curated authoritative EU sources
* Lightweight targeted retrieval

### Infrastructure

* Next.js API routes
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
         Context sufficient?
             │          │
            NO         YES
             │          │
             ▼          ▼
       Clarification   Regulatory
             │          Mapping
             └────┬─────┘
                  ▼
          Research Questions
                  │
                  ▼
            Query Translation
          ┌───────┼────────┐
          ↓       ↓        ↓
       Rewrite  Step-back  Subquestions
          │       │        │
          └───────┼────────┘
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
             Rerank
                │
                ▼
          Top Evidence
                │
                ▼
       Evidence Sufficiency
             Grader
                │
          ┌─────┴─────┐
          │           │
     Insufficient   Sufficient
          │           │
          ▼           ▼
      Identify Gap  Evidence Pack
          │           │
          ▼           │
   New Research      │
      Query           │
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
          ┌─────┴─────┐
          ▼           ▼
       Visual       Voice
        Result      Summary
          │           │
          └─────┬─────┘
                ▼
           Follow-up
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
│   ├── VerdictCard.tsx
│   ├── Assessment.tsx
│   ├── EUUSComparison.tsx
│   └── Sources.tsx
│
├── lib/
│   ├── gradium.ts
│   ├── cartesia.ts
│   ├── sarvam.ts
│   ├── voice.ts
│   ├── llm.ts
│   ├── research.ts
│   ├── retrieval.ts
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

Determines relevant regulatory topics, generates research questions, performs retrieval and produces the evidence package.

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
RRF / Ranking
 ↓
Evidence Sufficiency
 ↓
Corrective Research
 ↓
EvidencePack
```

---

### `POST /api/assess`

Reasons over the startup profile and collected evidence to generate a structured assessment.

```text
StartupProfile
+
EvidencePack
 ↓
LLM
 ↓
Assessment
 ↓
Validation
```

---

### `POST /api/speak`

Converts the assistant's response into speech using the selected TTS provider.

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

> **Tell me what you're building. I'll check the EU vs US reality.**

---

# 📊 Result Interface

The detailed result should look roughly like:

```text
┌────────────────────────────────────────┐
│        CAN I SHIP THIS?                │
│                                        │
│               🟡                       │
│             YELLOW                     │
│                                        │
│ Potentially launchable, but meaningful │
│ requirements need attention.           │
└────────────────────────────────────────┘

WHY

• Employment-related AI
• Candidate evaluation
• Personal data
• EU deployment


WHAT TO INVESTIGATE

✓ AI classification
✓ Human oversight
✓ Documentation
✓ Transparency
✓ Data protection


IMPORTANT DATES

...


EU 🇪🇺                  US 🇺🇸

...                     ...


SOURCES

...
```

The interface should make the reasoning visible without overwhelming the founder.

---

# 🔬 Research Progress UI

Research should feel transparent rather than like a generic loading screen.

For example:

```text
UNDERSTANDING       ✓
IDENTIFYING         ✓
RESEARCHING         ●
CHECKING EVIDENCE   ○
ANALYZING           ○
BUILDING ASSESSMENT ○
```

This reinforces the core product idea:

> **The system is investigating, not merely generating text.**

---

# 🧪 Example

### Founder

> "I'm building an AI recruiter that reads CVs, scores candidates and recommends who should get interviewed. We're planning to launch in Germany next year."

### CanIShipEU

> "Does the AI make the final hiring decision, or does a human make the final decision?"

### Founder

> "A human makes the final decision."

### Internal process

```text
StartupProfile
      ↓
Employment identified
      ↓
Candidate evaluation identified
      ↓
Human oversight identified
      ↓
EU deployment identified
      ↓
Research questions generated
      ↓
Official sources retrieved
      ↓
Evidence checked
      ↓
Assessment generated
```

### Result

```text
🟡 YELLOW

Relevant areas:

• Employment-related AI
• Candidate evaluation
• Personal data
• Human oversight
• EU deployment


Requires investigation:

• AI classification
• Applicable obligations
• Transparency
• Documentation
• Human oversight
• Data protection


EU vs US:

Different regulatory considerations apply.

Sources:

Primary EU / national sources used
for the assessment.
```

The exact verdict should always depend on the evidence retrieved for the specific scenario.

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

0:22
RESEARCHING...

0:28
Evidence appears.

0:32
🟡 YELLOW

0:35
Why?

0:43
"What if we launch in the US?"

0:47
EU vs US

0:55
Voice explanation.

1:00
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

### 2. Adaptive clarification

The system determines what information is still missing.

### 3. Regulatory routing

Startup characteristics → relevant regulatory research areas.

### 4. Query translation

One founder question → multiple research strategies.

### 5. Hybrid retrieval

Semantic + exact keyword retrieval.

### 6. Evidence fusion

Multiple rankings → unified evidence ranking.

### 7. Corrective research

Insufficient evidence → identify gap → search again.

### 8. Grounded reasoning

Assessment based on supplied evidence.

### 9. Citation integrity

Model-generated evidence references are validated against actual supplied evidence.

### 10. Voice-first UX

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
Relevant questions
          ↓
Relevant research
          ↓
Validated evidence
          ↓
Clear decision context
```

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

The objective is to demonstrate the **core product loop extremely well**.

---

# 🧭 Development Principles

### Keep the workflow explicit

Prefer understandable pipelines over framework-heavy abstractions.

### Use the LLM where it adds value

Natural language understanding and reasoning belong with the model.

Deterministic decisions should remain deterministic where possible.

### Evidence before conclusions

Regulatory conclusions should be grounded in retrieved sources.

### Research before prose

If evidence is insufficient, improve the research rather than asking the model to produce a more convincing answer.

### Preserve the original question

Generated rewrites should improve retrieval, never replace the founder's actual wording.

### Structured outputs

Important model outputs should be validated before reaching the UI.

### Provider abstraction

Voice and LLM providers should be replaceable.

### Small infrastructure

A prototype should not need a distributed architecture to demonstrate a good product idea.

---

# 🧰 Tech Stack

| Layer                       | Technology                                  |
| --------------------------- | ------------------------------------------- |
| Framework                   | Next.js                                     |
| Language                    | TypeScript                                  |
| UI                          | Tailwind CSS                                |
| Components                  | shadcn/ui                                   |
| Primary Voice               | Gradium                                     |
| Voice Design                | Gradium Voice Design                        |
| Optional Voice              | Cartesia                                    |
| Optional Multilingual Voice | Sarvam                                      |
| LLM                         | OpenRouter / Groq                           |
| Research                    | Official EU sources + lightweight retrieval |
| Retrieval                   | Semantic + keyword + RRF                    |
| Reasoning                   | Evidence-grounded LLM                       |
| Backend                     | Next.js API Routes                          |
| Database                    | None initially                              |
| Deployment                  | Local first / optional Vercel               |

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
* Encourage professional legal review for consequential decisions

Every assessment should display:

> **Prototype / informational tool — not legal advice.**

---

# 📌 Disclaimer

**CanIShipEU is a prototype for informational and research purposes only. It does not provide legal advice, legal opinions, or guarantees of regulatory compliance.**

Regulatory requirements can depend on the exact product, implementation, jurisdiction, sector, data practices, deployment model and applicable dates.

Always verify important conclusions against current official sources and seek qualified legal advice where appropriate.

---

# 🚀 Future Possibilities

If the core concept proves useful, CanIShipEU could evolve into:

## Regulatory Monitoring

> "Tell me when the rules affecting my startup change."

## Founder Compliance Workspace

Track:

* Requirements
* Evidence
* Open questions
* Important dates
* Regulatory changes

## More Jurisdictions

Expand beyond:

```text
EU 🇪🇺
US 🇺🇸
```

into additional markets.

## Multilingual Founder Conversations

Allow founders to explain products in more languages while preserving the same structured regulatory workflow.

## Deeper Regulatory Domains

Gradually expand the scenario library as the evidence and validation layer becomes more reliable.

## Realtime Voice

Move from request/response voice interactions toward realtime conversational agents with interruption and natural turn-taking.

## Voice Provider Benchmarking

Internally compare:

```text
Gradium
Cartesia
Sarvam
```

across latency, transcription quality and speech generation.

---

# 🎯 MVP Success Criteria

The prototype is successful if a founder can say:

> "I'm building an AI recruitment platform in France. It scores candidates and recommends who should be interviewed. Humans make the final decision."

…and the system can:

1. Understand the product.
2. Identify the employment context.
3. Identify candidate evaluation as relevant.
4. Understand the role of human decision-making.
5. Ask useful clarification questions.
6. Identify relevant regulatory topics.
7. Generate targeted research questions.
8. Retrieve authoritative sources.
9. Combine different retrieval strategies.
10. Check whether the evidence is sufficient.
11. Research missing evidence when necessary.
12. Produce a structured evidence-backed assessment.
13. Explain a GREEN / YELLOW / RED result.
14. Show why the result was reached.
15. Show supporting sources.
16. Compare relevant EU and US considerations.
17. Explain the result through voice.
18. Continue the conversation with follow-up questions.
19. Reassess when important assumptions change.
20. Refuse to make unsupported conclusions when the evidence is insufficient.

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
Clear founder decision
```

The long-term opportunity is not simply:

> "Ask AI about regulation."

It is:

> **"Tell AI what you're building, and let it figure out what you need to know before you ship."**

---

# ⭐ The One-Liner

> **CanIShipEU is a voice-first AI assistant that helps startup founders understand whether and how they can launch their products in Europe.**

---

## Built around one question:

# 🇪🇺 Can I ship this in Europe?

**Just ask.**
