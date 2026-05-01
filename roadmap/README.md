# 12 周 AI 应用开发路线

这条路线面向已经具备基础编程能力的学习者，目标是在 12 周内增量完成一个 TypeScript 优先的 AI 学习助手，并理解 agent 工程所需的 LLM API、Vercel AI SDK、RAG、MCP、agent loop、coding agent workflow、skills、Superpowers 和 harness engineering。

主项目不是 Week 12 的最后冲刺，而是从 Week 2 开始贯穿全程。每周至少给 `projects/ai-learning-assistant/`、`harness/`、`evals/` 或 `agent-workflows/` 增加一个可验证切片。

## 总览

| 周 | 主题 | 交付物 |
| --- | --- | --- |
| 1 | LLM 应用基础 | 结构化输出 lab 和 API 概念笔记 |
| 2 | TypeScript AI 应用骨架 | Next.js/Vercel AI SDK 方案和 `/api/chat` 切片 |
| 3 | Prompt、Tool Calling、Zod 和 Context 管理 | 工具 schema、结构化验证和上下文预算 |
| 4 | RAG | chunking、embedding、向量库选型、混合检索和引用来源 |
| 5 | MCP 基础 | MCP 架构图和工具设计草案 |
| 6 | TypeScript MCP server | 学习资料检索 MCP 工具设计 |
| 7 | Agent loop 和安全边界 | 规划、工具选择、状态、重试、人工确认、prompt injection 防护 |
| 8 | 编码 Agent 工作流 | Claude Code、Codex、AGENTS.md 和 agentic coding 实践 |
| 9 | Skills、Prompt 沉淀和 Superpowers | 项目 skill、prompt 模板、Superpowers 工作流定义 |
| 10 | Harness Engineering I | runtime、tool registry、permission、budget、trace、observability |
| 11 | Harness Engineering II 和 Eval | checkpoint、replay、恢复、PromptFoo/RAGAS/LLM-as-judge |
| 12 | 项目整合 | AI 学习助手、评测报告、复盘、下一步规划 |

## 主项目贯穿线

详见 [project-throughline.md](project-throughline.md)。

| 周 | AI 学习助手增量 |
| --- | --- |
| 2 | 搭骨架：`/api/chat`、`/api/search`、流式响应 contract。 |
| 4 | 接 RAG：本地笔记检索、引用来源、向量库选型记录。 |
| 6 | 挂 MCP：把学习资料检索抽象成 MCP tools。 |
| 7 | 升 agent loop：工具选择、状态、重试、人工确认和安全边界。 |
| 10 | 加 harness 控制层：runtime、权限、预算、trace、observability。 |
| 11 | 加可靠性：checkpoint、replay、failure recovery、eval 集成。 |
| 12 | 打磨发布：评测报告、复盘、部署准备。 |

## 每周节奏

1. 阅读本周路线。
2. 用 30 分钟写下本周验收标准。
3. 完成 lab 或项目切片。
4. 写一条 eval 或失败案例。
5. 复盘：哪里是模型能力问题，哪里是 harness 问题。
