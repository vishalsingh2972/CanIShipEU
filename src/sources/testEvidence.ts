import {
  loadEvidence,
  validateEvidence,
} from "./loadEvidence";

const evidence = loadEvidence();

const errors = validateEvidence(evidence);

console.log(`Loaded ${evidence.length} evidence chunk(s).`);

if (errors.length > 0) {
  console.error("Evidence validation failed:");

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log("All evidence chunks passed validation.");