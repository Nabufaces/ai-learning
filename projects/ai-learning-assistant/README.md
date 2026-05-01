---
description: "AI Learning 教程页面：AI Learning Assistant"
icon: graduation-cap
---

# AI Learning Assistant

This is the main project target for the 12-week roadmap. It is built incrementally from Week 2 onward, not saved for Week 12.

The current implementation is a deterministic local assistant, not a real LLM integration yet. It gives the repository a runnable product slice while keeping early learning focused on retrieval, tools, harness behavior, and evals.

## Run

```bash
pnpm assistant:dev
```

Default URL:

```text
http://localhost:4317
```

## Endpoints

### `POST /api/search`

Request:

```json
{
  "query": "第 10 周 Harness Engineering 学什么？",
  "limit": 3
}
```

Response:

```json
{
  "results": [
    {
      "source": "roadmap/week-10.md",
      "score": 15,
      "excerpt": "..."
    }
  ]
}
```

### `POST /api/chat`

Request:

```json
{
  "message": "MCP 基础应该学什么？"
}
```

Response:

- `text/plain`
- streamed in small chunks
- includes source references when local material is found

## Next Project Increments

| Week | Increment |
| --- | --- |
| 2 | Move this baseline toward Next.js Route Handlers and Vercel AI SDK streaming. |
| 3 | Add Zod schemas for request bodies, tool inputs, and structured model outputs. |
| 4 | Add embeddings and a vector index; keep keyword search as hybrid baseline. |
| 6 | Expose the three learning tools through a real MCP server. |
| 7 | Route chat requests through an agent loop with permissions and human approval. |
| 10 | Persist harness traces and map them to Langfuse/LangSmith/OpenTelemetry fields. |
| 11 | Add checkpoint/replay and migrate selected evals to PromptFoo or RAGAS-style scoring. |
| 12 | Produce an evaluation report and deployment readiness checklist. |
