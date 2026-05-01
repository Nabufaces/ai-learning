import { searchLearningNotes } from "../../../projects/ai-learning-assistant/src/knowledge.js";

const queries = [
  "第 10 周 Harness Engineering 学什么？",
  "MCP Host Client Server",
  "量子计算路线"
];

for (const query of queries) {
  const results = searchLearningNotes(query, 3);
  console.log(`\nQuery: ${query}`);

  if (results.length === 0) {
    console.log("No local source found.");
    continue;
  }

  for (const result of results) {
    console.log(`- ${result.source} (score: ${result.score})`);
    console.log(`  ${result.excerpt}`);
  }
}

