---
title: 进入 12 周路线前的检查
description: 从零基础路线衔接到 AI 应用开发 12 周路线的准备清单
---

# 进入 12 周路线前的检查

这个页面帮你判断：是否已经准备好进入 [Week 1：LLM API 基础 + 第一个对话 CLI](../roadmap/week-01.md)。

不要因为“零基础路线看完了”就直接往前冲。真正的标准是你能运行、解释和排错。

## 准备度检查

| 能力 | 你应该能做到 | 如果做不到，回到哪里 |
| --- | --- | --- |
| 终端 | 进入项目目录，运行 `pnpm test` | [Stage 1](stage-01-computer-setup.md) |
| TypeScript | 写函数、对象、数组和简单 type | [Stage 2](stage-02-programming-basics.md) |
| API/JSON | 解释 request/response 和 JSON | [Stage 3](stage-03-web-api-basics.md) |
| Git | 完成一次 add/commit/push | [Stage 4](stage-04-git-github.md) |
| AI 基础 | 解释 prompt、token、RAG、tool calling | [Stage 5](stage-05-ai-basics.md) |
| 小练习 | 完成搜索函数和 API contract 草稿 | [Stage 6](stage-06-mini-projects.md) |

## 进入 Week 1 前要能回答的问题

### 工程基础

- 当前终端在哪个目录？
- `package.json` 里 scripts 的作用是什么？
- `pnpm install` 和 `pnpm test` 分别做什么？
- TypeScript 的 type 为什么能减少错误？
- JSON 为什么适合作为 API 数据格式？

### AI 基础

- Prompt 是什么？
- Token 和上下文窗口为什么会影响成本和效果？
- 为什么模型输出 JSON 后仍然要 validation？
- RAG 为什么必须带 sources？
- Tool calling 为什么要由程序控制权限？

### 工作流基础

- Git commit 记录了什么？
- GitHub Pages 为什么可以从 `main` 自动部署？
- 失败记录为什么比“再试一次”更有价值？

## 衔接到现有 labs

进入 Week 1 后，先运行：

```bash
pnpm lab:hello
pnpm lab:structured
```

如果 `pnpm lab:hello` 能跑，但你不理解输出，继续 Week 1。

如果命令本身跑不起来，并且你看不懂目录、依赖或终端错误，回到 Stage 1。

如果 `pnpm lab:structured` 里 TypeScript 语法看不懂，回到 Stage 2。

如果你不理解为什么结构化输出要验证，回到 Stage 5。

## 零基础路线和 12 周路线的映射

| 零基础能力 | 12 周里会用到哪里 |
| --- | --- |
| 终端和 pnpm | 所有 labs、eval、build、harness demo |
| TypeScript 函数和对象 | Tool calling、MCP tools、harness tools |
| JSON 和 API contract | `/api/chat`、`/api/search`、eval cases |
| Git/GitHub | 文档维护、部署、版本管理 |
| Prompt/token/context | Week 1、Week 3、Week 7 |
| 本地搜索函数 | Week 4 RAG |
| 失败记录 | Week 10 trace、Week 11 replay/eval |

## 开始后的学习策略

- Week 1 到 Week 3 不要追求框架多，先把 API、schema、prompt 和 context 管理讲清楚。
- Week 4 学 RAG 时，把 Stage 6 的本地搜索函数当作最小类比。
- Week 7 学 agent loop 时，把函数调用、对象参数和权限判断联系起来。
- Week 10/11 学 harness 时，把失败记录升级成 trace、checkpoint 和 replay。

## 最小毕业标准

你可以开始 12 周路线，如果你能独立完成：

```bash
pnpm install
pnpm test
pnpm lab:hello
pnpm lab:structured
```

并且能用自己的话解释：

```text
我运行了什么命令；
它读取了哪些文件；
它输出了什么；
失败时我应该先看哪里。
```

如果这四句话说不清楚，先不要急着进入 RAG、MCP 或 Agent。把基础补稳会更快。
