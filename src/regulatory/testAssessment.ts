import { goldenAssessment } from "./goldenAssessment";

console.log("Golden assessment:");
console.log(`Status: ${goldenAssessment.status}`);
console.log(`Confidence: ${goldenAssessment.confidence}`);
console.log(`As of: ${goldenAssessment.asOfDate}`);
console.log(`Claims: ${goldenAssessment.claims.length}`);
console.log(`Sources: ${goldenAssessment.sources.length}`);
console.log(
  `What would change assessment: ${goldenAssessment.whatWouldChangeAssessment.length}`,
);