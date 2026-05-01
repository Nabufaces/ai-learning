---
description: "AI Learning 教程页面：Week 1 Lab: Structured Output"
icon: flask-vial
---

# Week 1 Lab: Structured Output

Run:

```bash
pnpm lab:structured
```

This lab validates a small `WeeklyPlan` object without relying on a model. The point is to see the application-side contract that should exist after a model returns JSON.

Try changing the samples in `src/index.ts` to create:

- missing fields
- wrong types
- empty arrays
- extra fields that the application ignores

