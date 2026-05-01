---
description: "AI Learning 教程页面：Week 2: TypeScript AI 应用骨架"
icon: calendar-days
---

# Week 2: TypeScript AI 应用骨架

## 本周目标

本周开始让 AI 学习助手成为主项目载体。你要建立第一个 Web/API 骨架，理解聊天接口、检索接口、流式响应、错误格式和配置管理。路线建议以 Next.js + Vercel AI SDK 作为目标形态，但当前仓库保留一个无框架 Node baseline，方便先理解底层行为。

{% hint style="info" %}
本周阅读方式：先读概念，再完成动手任务；主项目增量和验收标准必须一起看。
{% endhint %}

## 学习地图

| 模块 | 要解决的问题 | 主项目增量 |
| --- | --- | --- |
| API route | 前端或客户端如何调用 AI 服务 | `/api/chat`、`/api/search` |
| Streaming | 如何边生成边返回 | text/plain chunked baseline |
| Vercel AI SDK | TS 生态如何统一模型、流和工具 | 写入技术选型说明 |
| 配置管理 | 密钥、模型名、环境差异怎么处理 | `.env` 不入库、错误 contract |

## 核心概念详解

### 为什么 Week 2 要引入 Vercel AI SDK

Vercel AI SDK 是 TypeScript 生态中非常成熟的 AI 应用 SDK。它把几个重复问题统一起来：

- 流式响应：把模型输出转成 Web stream，前端可以逐字或逐块渲染。
- 多模型切换：通过 provider 抽象减少供应商耦合。
- Tool calling：用统一接口描述工具、参数和执行函数。
- Structured output：与 schema 工具结合，让输出更容易验证。

本仓库当前用 Node HTTP server 做 baseline，是为了让学习者能看见最小 API 行为。后续真正做 UI 或部署时，推荐迁移到 Next.js Route Handlers + Vercel AI SDK。

### `/api/chat` 和 `/api/search` 的职责边界

`/api/search` 只负责从本地学习资料中找相关片段，返回来源、分数和摘要。它不应该编造答案，也不应该调用模型。

`/api/chat` 负责把用户问题转成回答。当前版本用 deterministic answer from knowledge，后续可以接入模型，把 search results 作为上下文输入。

把两个接口拆开有几个好处：

- 检索可以独立测试。
- 回答质量问题能拆成“没检索到”和“合成失败”。
- RAG eval 可以直接检查来源是否正确。

### 流式响应

流式响应能降低用户感知延迟，但也让错误处理更复杂。非流式响应可以在服务端完全生成后统一返回 JSON；流式响应一旦开始写出 header，中途失败就不能再返回标准错误 JSON。

工程上需要提前定义：

- 请求参数错误在 streaming 前返回 JSON。
- 模型生成中断时如何通知前端。
- trace 如何记录 partial output。
- eval 是否使用 streaming，还是使用非 streaming 的稳定接口。

### 错误格式

AI 应用里的错误至少分几类：

- 请求错误：缺少 message、limit 类型错误。
- 配置错误：缺少 API key、模型名不可用。
- 上游错误：模型 API timeout、rate limit。
- 应用错误：检索失败、schema 校验失败、工具执行失败。

错误格式应该稳定，例如 `{ "error": "invalid_request", "message": "message is required" }`。不要把原始异常、密钥或完整 prompt 暴露给用户。

## 主项目增量

本周主项目切片：

- 保留当前 `projects/ai-learning-assistant/src/server.ts` baseline。
- 记录未来迁移目标：Next.js Route Handlers + Vercel AI SDK。
- 明确 `/api/chat`、`/api/search` 的 contract。
- 所有后续能力都围绕这两个入口扩展。

## 动手任务

{% stepper %}
{% step %}
## Step 1

运行 `pnpm assistant:dev`。
{% endstep %}

{% step %}
## Step 2

调用 `/health` 确认服务存活。
{% endstep %}

{% step %}
## Step 3

调用 `POST /api/search` 检索 Week 1 内容。
{% endstep %}

{% step %}
## Step 4

调用 `POST /api/chat` 观察流式输出。
{% endstep %}

{% step %}
## Step 5

在笔记中写下：如果迁移到 Vercel AI SDK，哪些逻辑保留，哪些交给 SDK。
{% endstep %}
{% endstepper %}

## 验收标准

- 能说明 `chat` API 和 `search` API 的职责差异。
- 能解释为什么 Vercel AI SDK 适合作为 TypeScript AI 应用主线。
- 能为 API 错误定义稳定 JSON 格式。
- 能解释为什么密钥不应该进入 prompt、日志或 trace。

## 常见误区

{% hint style="warning" %}
- 误区：直接上复杂 UI。  
  更好的做法：先让 API contract 稳定，再做界面。

- 误区：把搜索和回答混在一个黑盒里。  
  更好的做法：先拆出 search，这样 RAG 和 eval 才能定位问题。
{% endhint %}

## 复盘问题

- 什么时候需要 Next.js，什么时候一个 Node API server 就够？
- Streaming 增加了哪些测试和错误处理复杂度？
- 如果模型接口失败，用户应该看到什么？

