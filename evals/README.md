# Evals

Evals turn learning goals into regression checks. The goal is not to prove the assistant is smart; the goal is to detect when retrieval, tool selection, or answer contracts break.

## Run

```bash
pnpm eval
```

## Eval Case Shape

Cases live in `evals/cases/*.json`.

```json
{
  "id": "week-10-harness",
  "question": "第 10 周 Harness Engineering 学什么？",
  "expectedIncludes": ["Harness", "runtime", "trace"],
  "expectedSources": ["roadmap/week-10.md"]
}
```

## What To Evaluate

- RAG accuracy: answer comes from the right local source.
- Source citation: answer includes at least one source.
- Tool selection: agent chooses the expected tool for a task.
- Failure behavior: unknown topics should not produce confident answers.
- Regression: old working cases should keep passing when prompts or tools change.

## Concrete Tooling

| Tool | Role |
| --- | --- |
| Current JSON runner | Fast local baseline for deterministic checks. |
| PromptFoo | TS-friendly prompt, tool, and RAG regression tests; good CI candidate. |
| RAGAS | RAG quality metrics such as faithfulness, answer relevancy, and context recall. |
| Braintrust | Optional hosted/platform path for datasets, experiments, tracing, and review. |

## LLM-as-Judge Notes

- Use a rubric with explicit pass/fail criteria.
- Include the retrieved context, answer, and expected behavior in the judge prompt.
- Keep deterministic rule checks for sources and required text even when adding judge scores.
- Track judge model and prompt version in results.

## Harness Distinction

- Agent harness controls a run: tools, permissions, budget, trace, checkpoint.
- Eval harness scores behavior: input, expected properties, result, failure explanation.

