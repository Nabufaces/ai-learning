# AI 学习助手贯穿式构建线

这份路线把 AI 学习助手当作 12 周的主载体。每周学习一个主题，同时把主题落到同一个项目里，避免 Week 12 变成赶工整合。

## 增量计划

| 周 | 项目切片 | 必须实现 | 理解即可 |
| --- | --- | --- | --- |
| 1 | API Hello World | CLI 能直接调 API 或在无密钥时走 mock fallback。 | 多模型路由、成本优化。 |
| 2 | Web/API 骨架 | `/api/chat`、`/api/search`、流式响应 contract。 | 完整 Next.js UI 和登录系统。 |
| 3 | 结构化输出和工具 schema | 用 Zod 定义请求、工具参数和模型输出 contract。 | 自动 prompt 优化。 |
| 4 | RAG 检索 | 本地文档 chunking、引用来源、混合检索 baseline。 | 大规模向量索引调优。 |
| 5 | MCP 设计 | 明确 tools/resources/prompts 和 transport 选择。 | 多租户远程 MCP 服务。 |
| 6 | MCP server 切片 | 暴露 `search_learning_notes`、`create_weekly_plan`、`run_quiz`。 | MCP marketplace 和 OAuth 深集成。 |
| 7 | Agent loop | 工具选择、重试、停止条件、人工确认、安全边界。 | 多 agent 自主协作。 |
| 8 | Coding agent workflow | AGENTS.md、Codex/Claude Code 任务模式、review 流程。 | 大规模 agent team 编排。 |
| 9 | Skills 和 Superpowers | 项目 skill、prompt 模板、计划/TDD/验证流程。 | 自动 skill 评测平台。 |
| 10 | Harness 控制层 | runtime、tool registry、permission、budget、trace、Langfuse/LangSmith 选型。 | 全量 OpenTelemetry collector 部署。 |
| 11 | 可靠性和 Eval | checkpoint、replay、failure recovery、PromptFoo 配置草案、RAGAS 指标理解。 | Braintrust 平台化治理。 |
| 12 | 整合和复盘 | 评测报告、部署 checklist、下一步 backlog。 | 生产 SLA 和组织级治理。 |

## 每周项目验收

- 有一个可运行命令、API 调用、eval case 或文档 decision record。
- 新增行为要说明失败模式。
- 涉及 agent/tool/RAG 的行为必须能被 trace 或 eval 观察。
- 任何“理解即可”的内容不能阻塞主项目前进。

