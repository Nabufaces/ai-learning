export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export type RunStatus = "completed" | "failed";
export type TraceEventType =
  | "run_started"
  | "plan_created"
  | "tool_selected"
  | "tool_call_started"
  | "tool_call_completed"
  | "tool_call_failed"
  | "permission_denied"
  | "budget_exhausted"
  | "run_completed"
  | "run_failed";

export type ToolMode = "read" | "write";

export interface AgentConfig {
  name: string;
  instructions: string;
}

export interface BudgetLimits {
  maxToolCalls: number;
  maxRuntimeMs: number;
}

export interface ToolPermissions {
  allowedTools: string[];
}

export interface ToolExecutionContext {
  runId: string;
  toolName: string;
}

export interface ToolDefinition {
  name: string;
  description: string;
  mode: ToolMode;
  inputSchema: Record<string, JsonValue>;
  requiresApproval?: boolean;
  execute(input: Record<string, JsonValue>, context: ToolExecutionContext): Promise<JsonValue> | JsonValue;
}

export interface TraceEvent {
  id: number;
  runId: string;
  timestamp: string;
  type: TraceEventType;
  message: string;
  data?: JsonValue;
}

export interface HarnessRunRequest {
  task: string;
  agent: AgentConfig;
  tools: ToolDefinition[];
  permissions: ToolPermissions;
  budget: BudgetLimits;
  approveToolCall?: (tool: ToolDefinition, input: Record<string, JsonValue>) => Promise<boolean> | boolean;
}

export interface HarnessRunResult {
  runId: string;
  status: RunStatus;
  finalMessage: string;
  toolCalls: number;
  trace: TraceEvent[];
  failureReason?: string;
}

export interface Checkpoint {
  runId: string;
  task: string;
  status: RunStatus;
  trace: TraceEvent[];
  savedAt: string;
}

