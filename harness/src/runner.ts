import { randomUUID } from "node:crypto";
import { buildDefaultToolInput, chooseToolForTask, ToolRegistry } from "./tools.js";
import type { HarnessRunRequest, HarnessRunResult, JsonValue, TraceEvent, TraceEventType } from "./types.js";

export async function runHarness(request: HarnessRunRequest): Promise<HarnessRunResult> {
  const runId = randomUUID();
  const startedAt = Date.now();
  const registry = new ToolRegistry(request.tools);
  const trace: TraceEvent[] = [];
  let eventId = 0;
  let toolCalls = 0;

  function addTrace(type: TraceEventType, message: string, data?: JsonValue): void {
    trace.push({
      id: ++eventId,
      runId,
      timestamp: new Date().toISOString(),
      type,
      message,
      data
    });
  }

  function fail(message: string, type: TraceEventType = "run_failed"): HarnessRunResult {
    addTrace(type, message);
    return {
      runId,
      status: "failed",
      finalMessage: message,
      toolCalls,
      trace,
      failureReason: message
    };
  }

  addTrace("run_started", `Agent ${request.agent.name} started.`, {
    task: request.task,
    budget: request.budget as unknown as JsonValue
  });

  if (request.budget.maxToolCalls < 1) {
    return fail("Budget exhausted before any tool call was allowed.", "budget_exhausted");
  }

  if (Date.now() - startedAt > request.budget.maxRuntimeMs) {
    return fail("Runtime budget exhausted before planning.", "budget_exhausted");
  }

  const availableTools = registry
    .list()
    .filter((tool) => request.permissions.allowedTools.includes(tool.name));

  addTrace("plan_created", "Created a one-step plan: inspect the task, choose one allowed tool, then answer from observation.", {
    availableTools: availableTools.map((tool) => tool.name)
  });

  const selectedTool = chooseToolForTask(request.task, availableTools);

  if (!selectedTool) {
    return fail("No allowed tool is available for this task.", "permission_denied");
  }

  addTrace("tool_selected", `Selected tool ${selectedTool.name}.`, {
    tool: selectedTool.name,
    mode: selectedTool.mode
  });

  let tool;
  try {
    tool = registry.ensureAllowed(selectedTool.name, request.permissions);
  } catch (error) {
    return fail(error instanceof Error ? error.message : String(error), "permission_denied");
  }

  const input = buildDefaultToolInput(request.task, tool);

  if (tool.requiresApproval) {
    const approved = request.approveToolCall ? await request.approveToolCall(tool, input) : false;

    if (!approved) {
      return fail(`Tool call requires approval and was denied: ${tool.name}`, "permission_denied");
    }
  }

  if (toolCalls + 1 > request.budget.maxToolCalls) {
    return fail(`Tool budget exhausted before calling ${tool.name}.`, "budget_exhausted");
  }

  if (Date.now() - startedAt > request.budget.maxRuntimeMs) {
    return fail(`Runtime budget exhausted before calling ${tool.name}.`, "budget_exhausted");
  }

  try {
    addTrace("tool_call_started", `Calling ${tool.name}.`, { input });
    toolCalls += 1;
    const output = await tool.execute(input, { runId, toolName: tool.name });
    addTrace("tool_call_completed", `Tool ${tool.name} completed.`, { output });

    const finalMessage = `Completed with ${tool.name}. Observation: ${summarizeJson(output)}`;
    addTrace("run_completed", finalMessage);

    return {
      runId,
      status: "completed",
      finalMessage,
      toolCalls,
      trace
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    addTrace("tool_call_failed", `Tool ${tool.name} failed: ${message}`);
    return fail(`Run failed during tool execution: ${message}`);
  }
}

function summarizeJson(value: JsonValue): string {
  const text = JSON.stringify(value);
  return text.length > 500 ? `${text.slice(0, 497)}...` : text;
}

