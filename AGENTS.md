# Agent Instructions

## Package Manager
Use **pnpm**: `pnpm install`, `pnpm typecheck`, `pnpm test`.

## File-Scoped Commands
| Task | Command |
| --- | --- |
| Typecheck | `pnpm exec tsc --noEmit --pretty false` |
| Run evals | `pnpm eval` |
| Harness demo | `pnpm harness:demo` |
| Assistant API | `pnpm assistant:dev` |

## Project Conventions
- Keep learning content in Chinese unless the source title or API term is normally English.
- TypeScript examples should use built-in Node APIs unless a dependency is justified in the relevant README.
- Add eval cases when adding agent, MCP, RAG, or harness behavior.
- Keep AGENTS.md concise; put longer workflow guidance in `agent-workflows/`.

## Commit Attribution
AI commits MUST include:
```
Co-Authored-By: (the agent model's name and attribution byline)
```

