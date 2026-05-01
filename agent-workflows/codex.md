# Codex Workflow

Use Codex for repository-aware implementation, refactoring, review, and verification.

## Default Loop

1. Read `README.md`, `AGENTS.md`, and the relevant roadmap week.
2. Inspect the current code before editing.
3. Make the smallest coherent change.
4. Run a file-scoped check when possible.
5. Add or update evals for agent, MCP, RAG, or harness behavior.
6. Summarize changed files and verification results.

## Good Codex Tasks

- Add a new lab for a roadmap week.
- Convert a repeated manual workflow into a skill.
- Add a harness control, such as budget or approval.
- Add eval cases for known failures.
- Review a PR for behavioral regressions.

## Avoid

- Asking Codex to invent external facts without sources.
- Letting Codex edit large unrelated areas in one run.
- Accepting a completion without running verification.

