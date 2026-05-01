# AI Learning

TypeScript-first learning repository for building AI applications and agents from zero to one.

## Goal

This repository is designed to turn AI application development into a concrete 12-week path:

1. Learn the AI application stack: LLM APIs, structured output, tool calling, RAG, MCP, agents, and evaluation.
2. Build reusable project knowledge for Codex, Claude Code, skills, and Superpowers workflows.
3. Build the AI learning assistant incrementally from Week 2 onward, rather than treating it as a final-week sprint.

## How To Use This Repository

1. Start with [roadmap/README.md](roadmap/README.md).
2. Read one weekly roadmap file before doing that week's work.
3. Run the matching lab when available.
4. Keep notes, failures, prompts, and design choices in the week file or a new note under `roadmap/notes/`.
5. Track the main project through [roadmap/project-throughline.md](roadmap/project-throughline.md).
6. Use [evals/README.md](evals/README.md) and [harness/README.md](harness/README.md) once the project starts using tools or agents.

## GitBook Reading

This repository is ready to be used as a GitBook-backed knowledge base:

- [SUMMARY.md](SUMMARY.md) defines the GitBook navigation.
- [.gitbook.yaml](.gitbook.yaml) tells GitBook to use the repository root, `README.md`, and `SUMMARY.md`.
- [roadmap/gitbook-publishing.md](roadmap/gitbook-publishing.md) explains how to sync the repository to GitBook from GitHub.

The weekly roadmap files are written as learning chapters, not just checklists. External links are included as references, but key concepts are explained directly in the repository.

## Repository Map

| Path | Purpose |
| --- | --- |
| `roadmap/` | 12-week learning path with goals, concepts, exercises, and acceptance criteria. |
| `labs/` | Small TypeScript labs for structured output, RAG, and agent loops. |
| `projects/ai-learning-assistant/` | Main project: a learning assistant that gains capability each week. |
| `harness/` | Harness engineering primitives: runner, tool registry, budget, trace, checkpoint. |
| `evals/` | Eval cases and a basic eval runner for learning assistant behavior. |
| `agent-workflows/` | Codex, Claude Code, AGENTS.md, skills, and Superpowers workflow templates. |

## Commands

Use pnpm.

```bash
pnpm install
pnpm typecheck
pnpm lab:hello
pnpm lab:structured
pnpm lab:rag
pnpm lab:agent
pnpm harness:demo
pnpm eval
pnpm assistant:dev
```

The assistant server defaults to `http://localhost:4317`.

## Learning Contract

- Prefer building small working slices over collecting links.
- Every week must produce a visible artifact: a note, lab run, eval case, tool, API route, or project increment in the AI learning assistant.
- Every agent or tool feature must have a failure scenario and an eval case.
- Harness engineering is treated as a first-class topic: the runtime around the model matters as much as the prompt.
