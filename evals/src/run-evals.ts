import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { answerFromKnowledge } from "../../projects/ai-learning-assistant/src/knowledge.js";

interface EvalCase {
  id: string;
  question: string;
  expectedIncludes: string[];
  expectedSources: string[];
}

interface EvalResult {
  id: string;
  passed: boolean;
  failures: string[];
}

const cases = loadCases(join(process.cwd(), "evals", "cases"));
const results = cases.map(runCase);
const passed = results.filter((result) => result.passed).length;
const failed = results.length - passed;

for (const result of results) {
  const status = result.passed ? "PASS" : "FAIL";
  console.log(`${status} ${result.id}`);

  for (const failure of result.failures) {
    console.log(`  - ${failure}`);
  }
}

console.log(`\n${passed}/${results.length} evals passed.`);

if (failed > 0) {
  process.exitCode = 1;
}

function runCase(testCase: EvalCase): EvalResult {
  const answer = answerFromKnowledge(testCase.question);
  const haystack = `${answer.answer}\n${answer.sources.join("\n")}`;
  const failures: string[] = [];

  for (const expected of testCase.expectedIncludes) {
    if (!haystack.includes(expected)) {
      failures.push(`Missing expected text: ${expected}`);
    }
  }

  for (const source of testCase.expectedSources) {
    if (!answer.sources.includes(source)) {
      failures.push(`Missing expected source: ${source}`);
    }
  }

  if (testCase.expectedSources.length === 0 && answer.sources.length > 0) {
    failures.push(`Expected no sources, got: ${answer.sources.join(", ")}`);
  }

  return {
    id: testCase.id,
    passed: failures.length === 0,
    failures
  };
}

function loadCases(directory: string): EvalCase[] {
  return readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .flatMap((file) => {
      const raw = readFileSync(join(directory, file), "utf8");
      return JSON.parse(raw) as EvalCase[];
    });
}

