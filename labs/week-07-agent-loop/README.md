---
description: "AI Learning 教程页面：Week 7 Lab: Agent Loop"
icon: flask-vial
---

# Week 7 Lab: Agent Loop

Run:

```bash
pnpm lab:agent
```

This lab runs a deterministic agent loop through the shared harness. There is no real model call yet. The goal is to understand how the runtime controls tools, budget, trace, and result shape.

Change the budget or allowed tools in `src/index.ts` to observe:

- normal completion
- permission denial
- budget exhaustion

