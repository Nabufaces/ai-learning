---
description: "AI Learning 教程页面：Agent Workflows"
icon: robot
---

# Agent Workflows

This directory contains reusable guidance for using AI coding agents while building this repository.

## Files

| File | Purpose |
| --- | --- |
| `codex.md` | How to use Codex on this repository. |
| `claude-code.md` | Claude Code workflow and skill boundaries. |
| `superpowers.md` | Superpowers-style development loop. |
| `skills/learning-review/SKILL.md` | Project skill draft for reviewing learning artifacts. |

## Boundary Between AGENTS.md, Skills, MCP, and Harness

- `AGENTS.md`: always-on project rules for coding agents.
- Skills: reusable playbooks loaded when a task matches.
- MCP: protocol for exposing external tools and context to agents.
- Harness: runtime control layer around agent execution.
- Evals: scoring layer that checks behavior over time.

