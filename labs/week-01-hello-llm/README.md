---
description: "AI Learning 教程页面：Week 1 Lab: Hello LLM CLI"
icon: flask-vial
---

# Week 1 Lab: Hello LLM CLI

Run:

```bash
pnpm lab:hello
```

By default this lab runs in mock mode so the repository works without secrets. To call a real OpenAI-compatible Responses API endpoint:

```bash
OPENAI_API_KEY=... pnpm lab:hello
```

Optional:

```bash
OPENAI_MODEL=gpt-4.1-mini pnpm lab:hello
```

The goal is to run one complete request/response loop before Week 2 introduces web APIs and streaming.

