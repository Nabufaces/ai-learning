# Claude Code Workflow

Use Claude Code when you want deep codebase work, skill-based playbooks, or subagent-style decomposition.

## Context Layers

| Layer | Use |
| --- | --- |
| `CLAUDE.md` / `AGENTS.md` | Short always-on project rules. |
| Skill | Repeatable playbooks and task-specific knowledge. |
| MCP | External tools, APIs, local resources, and live context. |
| Subagent | Isolated exploration or parallel implementation. |

## Skill Guidelines

- Create a skill when the same checklist or playbook is pasted repeatedly.
- Keep `SKILL.md` focused; move long examples to supporting files.
- Write skills so they are useful across Codex and Claude Code where possible.

## Review Checklist

- Did the agent inspect current files before editing?
- Is there an eval or test for behavior changes?
- Are tool permissions and failure modes explicit?
- Are long-lived instructions in `AGENTS.md` short enough to remain useful?

