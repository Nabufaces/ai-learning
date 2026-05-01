import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { createLearningSearchTool } from "../../projects/ai-learning-assistant/src/tools.js";
import { loadCheckpoint, runHarness, saveCheckpoint } from "../src/index.js";

const result = await runHarness({
  task: "检索第 10 周 Harness Engineering I 的验收标准",
  agent: {
    name: "harness-demo-agent",
    instructions: "Use read-only learning tools before answering."
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

const checkpointDirectory = join(process.cwd(), "harness", "checkpoints");
await mkdir(checkpointDirectory, { recursive: true });

const checkpointPath = await saveCheckpoint(checkpointDirectory, {
  runId: result.runId,
  task: "检索第 10 周 Harness Engineering I 的验收标准",
  status: result.status,
  trace: result.trace,
  savedAt: new Date().toISOString()
});

const checkpoint = await loadCheckpoint(checkpointDirectory, result.runId);

console.log(JSON.stringify({ result, checkpointPath, checkpointLoaded: checkpoint.runId }, null, 2));

