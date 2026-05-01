# Observability Plan

Agent debugging is hard because a final answer hides the path that produced it. The harness should expose enough trace data to answer where a run failed: prompt, retrieval, tool selection, tool execution, model output, or post-processing.

## Trace Fields

| Field | Purpose |
| --- | --- |
| `runId` | Correlate all events in one agent run. |
| `task` | Original user intent. |
| `model` | Model/provider used for each generation. |
| `retrieval` | Query, sources, scores, context length. |
| `toolCall` | Tool name, input, output summary, latency, error. |
| `budget` | Tool calls, runtime, token/cost budget. |
| `latencyMs` | Step and total runtime. |
| `evalScore` | Optional score attached after eval. |

## Tooling Options

| Tool | Use |
| --- | --- |
| Langfuse | Open-source/self-hostable LLM observability, traces, prompt management, eval scores. |
| LangSmith | Strong fit if using LangChain/LangGraph heavily. |
| OpenTelemetry | Standard trace/metrics layer; useful when AI traces should join backend traces. |

## Rule

The harness remains the enforcement layer. Observability records what happened; it should not be the only place where permissions, budgets, or approvals live.

