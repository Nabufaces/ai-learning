---
description: "AI Learning 教程页面：RAGAS Metric Mapping"
icon: chart-line
---

# RAGAS Metric Mapping

This repository does not run RAGAS yet, but Week 11 should map the assistant data to RAGAS-style metrics.

| Metric | Needs | Meaning |
| --- | --- | --- |
| Faithfulness | question, retrieved contexts, answer | Does the answer stay grounded in retrieved context? |
| Answer relevancy | question, answer | Does the answer address the question? |
| Context recall | question, retrieved contexts, reference answer | Did retrieval bring back the needed evidence? |
| Context precision | question, retrieved contexts | Are top contexts useful instead of noisy? |

## Data To Capture

- user question
- retrieved source paths
- retrieved excerpts
- final answer
- expected source paths
- trace run id

