import {
  loadRegulatorySources,
  validateRegulatorySources,
} from "./loadSources";

const sources = loadRegulatorySources();

const errors = validateRegulatorySources(sources);

console.log(`Loaded ${sources.length} regulatory source(s).`);

if (errors.length > 0) {
  console.error("Source validation failed:");

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log("All regulatory sources passed validation.");