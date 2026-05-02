---
title: AI Learning
description: 12 周 TypeScript 优先的 AI 应用开发与 Agent 工程学习教程
slug: /
---

# AI Learning

AI Learning 是一套 12 周的 AI 应用开发学习教程，目标是从零到一构建一个 TypeScript 优先的 AI 学习助手，并系统掌握 LLM API、RAG、MCP、Agent、Harness Engineering、Eval 和 coding agent 工作流。

:::info
这不是资料链接合集。每一周都包含概念讲解、工程取舍、主项目增量、动手任务、验收标准和复盘问题。
:::

## 从这里开始

| 入口 | 说明 |
| --- | --- |
| [12 周路线](roadmap/README.md) | 按周学习 AI 应用开发主线 |
| [主项目贯穿线](roadmap/project-throughline.md) | 查看 AI 学习助手如何每周增量构建 |
| [技术栈说明](roadmap/tech-stack.md) | 了解 Vercel AI SDK、Zod、RAG、PromptFoo、Langfuse 等工具定位 |
| [GitHub Pages 发布](roadmap/github-pages-publishing.md) | 使用 Docusaurus 和 GitHub Actions 发布教程网站 |

[开始 Week 1](roadmap/week-01.md) · [查看 GitHub 仓库](https://github.com/Nabufaces/ai-learning)

## 你会学到什么

### AI 应用开发

- LLM API 和结构化输出
- TypeScript AI 应用骨架
- RAG、向量数据库和混合检索
- MCP tools/resources/prompts
- Agent loop 和安全边界

### 工程化能力

- Harness runtime、permission、budget、trace
- Langfuse/LangSmith/OpenTelemetry observability
- PromptFoo、RAGAS 和 eval harness
- Codex、Claude Code、AGENTS.md 和 skills
- Docusaurus 文档站与 GitHub Pages 发布

## 本地运行

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

本地预览教程网站：

```bash
pnpm start
```

构建静态站点：

```bash
pnpm build
```

Assistant server 默认运行在 `http://localhost:4317`。

## 学习约定

- 每周至少产出一个可验证成果：笔记、lab、eval case、tool、API route 或项目增量。
- 不只收集链接；核心概念要能用自己的话解释。
- 每个 agent、tool、RAG 或 harness 行为都要有失败场景。
- 完成不等于“模型说可以”，完成必须有验证命令或评测结果。
