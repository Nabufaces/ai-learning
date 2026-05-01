import { createLearningSearchTool } from "../../../projects/ai-learning-assistant/src/tools.js";
import { runHarness } from "../../../harness/src/index.js";

const result = await runHarness({
  task: "请检索第 10 周 Harness Engineering 的学习目标",
  agent: {
    name: "learning-agent",
    instructions: "Use repository knowledge before answering learning roadmap questions."
  },
  tools: [createLearningSearchTool()],
  permissions: {
    allowedTools: ["search_learning_notes"]
  },
  budget: {
    maxToolCalls: 1,
    maxRuntimeMs: 5_000
  }
});

console.log(JSON.stringify(result, null, 2));

