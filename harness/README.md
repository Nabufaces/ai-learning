# Harness Engineering

Harness engineering is the engineering layer around an AI agent. It controls how the agent receives tasks, selects tools, spends budget, records trace, persists state, and recovers from failure.

## What This Harness Demonstrates

| Concern | Implemented In |
| --- | --- |
| Tool registry | `src/tools.ts` |
| Budget limits | `src/runner.ts` |
| Permission checks | `src/tools.ts` |
| Trace events | `src/runner.ts` |
| Checkpoint read/write | `src/checkpoint.ts` |
| Demo run | `examples/run-basic.ts` |
| Observability plan | `observability.md` |
| Security boundaries | `security.md` |

## Runner Contract

Input:

- task
- agent name and instructions
- tool definitions
- permissions
- budget
- optional human approval hook

Output:

- status: `completed` or `failed`
- final message
- tool call count
- trace events
- failure reason when applicable

## Design Notes

- Tool errors are captured as trace events instead of crashing the process.
- The demo does not call an LLM. It isolates harness behavior from model behavior.
- Production agents should persist traces and checkpoints outside the prompt context.
- Observability platforms such as Langfuse or LangSmith should consume harness trace fields, not replace harness controls.
- Prompt injection and tool authorization are harness concerns, not only prompt-writing concerns.

## Scope Split

Week 10 must implement runtime control: tool registry, permission, budget, and basic trace.

Week 11 focuses on reliability: checkpoint, replay, failure recovery, eval integration, and regression behavior.

