import { loadEvidence } from "../sources/loadEvidence";
import type { ResearchQuery } from "../types/regulatory";
import { gradeEvidence } from "./evidenceGrader";

const evidence = loadEvidence();

const query: ResearchQuery = {
  original:
    "Does this AI recruitment system fall within the EU AI Act employment-related high-risk rules?",

  focus: "employment_classification",

  rewrite:
    "Does an AI system used to evaluate, score, rank, or recommend job candidates fall within the EU AI Act employment-related high-risk provisions?",

  stepBack:
    "Which AI systems used in recruitment and employment are classified as high-risk under the EU AI Act?",

  keywords: [
    "EU AI Act",
    "Annex III",
    "employment",
    "recruitment",
    "candidate evaluation",
    "Article 6",
    "high-risk",
  ],
};

console.log("=== Evidence Grading ===");
console.log(`Query focus: ${query.focus}`);

for (const chunk of evidence) {
  const grade = gradeEvidence(
    chunk,
    query,
  );

  console.log("");
  console.log(`=== ${chunk.title} ===`);
  console.log(
    `Authority: ${grade.authorityScore}/3`,
  );
  console.log(
    `Relevance: ${grade.relevanceScore}/3`,
  );
  console.log(
    `Specificity: ${grade.specificityScore}/3`,
  );
  console.log(
    `Freshness: ${grade.freshnessScore}/3`,
  );
  console.log(
    `Topic alignment: ${grade.topicAlignmentScore}/3`,
  );
  console.log(
    `Total: ${grade.totalScore}/15`,
  );
  console.log(
    `Sufficient: ${grade.sufficient}`,
  );
  console.log(`Reason: ${grade.reason}`);
}