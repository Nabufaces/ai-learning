---
title: AI Learning
description: 12 周 TypeScript 优先的 AI 应用开发与 Agent 工程学习教程
slug: /
---

# AI Learning

AI Learning 是一套 12 周的 AI 应用开发学习教程，目标是从零到一构建一个 TypeScript 优先的 AI 学习助手，并系统掌握 LLM API、RAG、MCP、Agent、Harness Engineering、Eval 和 coding agent 工作流。

在线阅读：[https://nabufaces.github.io/ai-learning/](https://nabufaces.github.io/ai-learning/)

GitHub 仓库：[https://github.com/Nabufaces/ai-learning](https://github.com/Nabufaces/ai-learning)

> 这不是资料链接合集。每一周都包含概念讲解、工程取舍、主项目增量、动手任务、验收标准和复盘问题。

## 学习路线

| 周 | 主题 | 主要产出 |
| --- | --- | --- |
| Week 1 | LLM API 基础 | 跑通第一个对话 CLI，理解 token、上下文和结构化输出 |
| Week 2 | TypeScript AI 应用骨架 | 使用 Vercel AI SDK/Node API 设计聊天入口 |
| Week 3 | Prompt、Tool Calling、Zod | 建立工具 schema、结构化验证和 context 管理 |
| Week 4 | RAG | 设计 chunking、embedding、向量库、混合检索和引用来源 |
| Week 5 | MCP 协议 | 理解 Host/Client/Server、tools/resources/prompts 和传输层 |
| Week 6 | TypeScript MCP Server | 给学习助手暴露笔记检索工具 |
| Week 7 | Agent Loop | 实现规划、工具选择、状态、重试、人工确认和安全边界 |
| Week 8 | 编码 Agent 工作流 | 沉淀 Claude Code、Codex 和 AGENTS.md 实践 |
| Week 9 | Skills 与 Superpowers | 结构化复用 prompt、skills 和工作流方法 |
| Week 10 | Harness Engineering I | 实现 runtime、tool registry、permission、budget、trace |
| Week 11 | Harness Engineering II | 加入 checkpoint、replay、failure recovery 和 eval |
| Week 12 | 整合打磨 | 完成 AI 学习助手、评测报告和复盘 |

## 入口

| 入口 | 说明 |
| --- | --- |
| [12 周路线](roadmap/README.md) | 按周学习 AI 应用开发主线 |
| [主项目贯穿线](roadmap/project-throughline.md) | 查看 AI 学习助手如何每周增量构建 |
| [技术栈说明](roadmap/tech-stack.md) | 了解 Vercel AI SDK、Zod、RAG、PromptFoo、Langfuse 等工具定位 |
| [GitHub Pages 发布](roadmap/github-pages-publishing.md) | 使用 Docusaurus 和 GitHub Actions 发布教程网站 |

## 项目结构

```text
.
├── roadmap/                    # 12 周教程正文、项目贯穿线和技术栈说明
├── labs/                       # 每周配套 TypeScript 小练习
├── projects/ai-learning-assistant/
│   └── src/                    # AI 学习助手的最小实现
├── harness/                    # Agent harness、checkpoint、trace、权限和预算实验
├── evals/                      # 本地 eval cases、provider 和评分脚本
├── agent-workflows/            # Codex、Claude Code、skills、Superpowers 工作流
├── site/                       # Docusaurus 站点外壳
└── .github/workflows/deploy.yml # GitHub Pages 自动部署
```

## 本地开发

安装依赖：

```bash
pnpm install
```

运行验证：

```bash
pnpm typecheck
pnpm eval
pnpm test
```

运行 labs：

```bash
pnpm lab:hello
pnpm lab:structured
pnpm lab:rag
pnpm lab:agent
```

运行 harness demo 和学习助手服务：

```bash
pnpm harness:demo
pnpm assistant:dev
```

Assistant server 默认运行在 `http://localhost:4317`。

## 文档站

本仓库使用 Docusaurus 构建静态教程网站，并通过 GitHub Actions 部署到 GitHub Pages。

本地预览：

```bash
pnpm start
```

构建静态站点：

```bash
pnpm build
```

部署 workflow 会在 push 到 `main` 后自动执行：

1. 安装 pnpm 和 Node.js。
2. 执行 `pnpm test`。
3. 执行 `pnpm build`。
4. 上传 `site/build/` 到 GitHub Pages。

## 学习约定

- 每周至少产出一个可验证成果：笔记、lab、eval case、tool、API route 或项目增量。
- 不只收集链接；核心概念要能用自己的话解释。
- 每个 agent、tool、RAG 或 harness 行为都要有失败场景。
- 完成不等于“模型说可以”，完成必须有验证命令或评测结果。

## 维护约定

- 新增或重命名教程页面时，同步更新 `site/sidebars.ts`。
- 新增 agent、MCP、RAG 或 harness 行为时，优先补充 `evals/cases/`。
- 长期规则放在 `AGENTS.md`，更长的工作流说明放在 `agent-workflows/`。
- 文档内容保持中文，API 名称、工具名和英文术语按常用写法保留。
