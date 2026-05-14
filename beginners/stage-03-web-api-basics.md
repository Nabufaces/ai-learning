---
title: Stage 3：Web、API 和 JSON
description: 理解 AI 应用开发中最常见的 HTTP、API、JSON 和 server 概念
---

# Stage 3：Web、API 和 JSON

AI 应用大多数时候不是一个孤立脚本，而是一个通过 API 接收请求、调用模型或工具、再返回结果的软件系统。本阶段目标是让你看懂 Web/API 的基本语言。

## Web 应用的最小模型

一次 Web 交互可以简化为：

```text
浏览器或客户端
  → 发送 HTTP 请求
  → 后端 API 接收请求
  → 后端处理数据或调用模型
  → 返回 HTTP 响应
  → 前端展示结果
```

AI 聊天接口也是这样：

```text
用户输入问题
  → POST /api/chat
  → 服务端组装 prompt
  → 调用 LLM API
  → 返回文本流或 JSON
```

## HTTP 请求

HTTP 请求至少包含：

| 部分 | 说明 | 示例 |
| --- | --- | --- |
| Method | 想做什么 | `GET`、`POST` |
| URL | 请求哪里 | `/api/chat` |
| Headers | 附加信息 | `content-type: application/json` |
| Body | 请求数据 | `{ "message": "你好" }` |

常见 method：

- `GET`：读取数据。
- `POST`：提交数据或触发动作。
- `PUT/PATCH`：更新数据。
- `DELETE`：删除数据。

AI 应用常用 `POST`，因为用户问题、messages、配置和工具上下文都需要放进请求 body。

## JSON

JSON 是前后端和 API 通信最常见的数据格式。

```json
{
  "message": "Week 4 学什么？",
  "topK": 5,
  "includeSources": true
}
```

JSON 的规则：

- 字段名必须用双引号。
- 字符串必须用双引号。
- 可以有对象、数组、数字、布尔值、null。
- 不能写注释。

TypeScript 对象和 JSON 很像，但不是完全一样。TypeScript 对象可以有函数、注释、未加双引号的字段名；JSON 是纯数据。

## API contract

API contract 是调用方和服务方之间的约定。

例如聊天接口可以约定：

```text
POST /api/chat

Request:
{
  "message": "string"
}

Response:
{
  "answer": "string",
  "sources": ["string"]
}
```

AI 应用必须重视 contract。因为模型输出不稳定，所以程序要明确输入、输出、错误和 fallback。

## 状态码

HTTP response 会带状态码：

| 状态码 | 含义 |
| --- | --- |
| 200 | 成功 |
| 400 | 请求格式错 |
| 401 | 未登录或没有认证 |
| 403 | 没权限 |
| 404 | 找不到资源 |
| 500 | 服务端错误 |

不要把所有错误都当成“模型不好”。有些是请求格式错，有些是权限错，有些是服务端程序错。

## 流式响应

聊天产品常用 streaming：模型不是等完整答案生成完再返回，而是一段一段返回。

优点：

- 用户更快看到输出。
- 长回答体验更好。
- 可以显示工具调用和中间状态。

缺点：

- 错误处理更复杂。
- 前端要处理部分内容。
- eval 和日志要额外设计。

Week 2 会学习为什么 Vercel AI SDK 对 TypeScript streaming chat 很有帮助。

## 动手任务

### Step 1

写一个 JSON，表示一次聊天请求：

```json
{
  "message": "我想学习 AI 应用开发",
  "level": "beginner"
}
```

### Step 2

写一个 JSON，表示一次搜索响应：

```json
{
  "results": [
    {
      "source": "roadmap/week-04.md",
      "excerpt": "RAG 的目标不是把所有文档塞给模型"
    }
  ]
}
```

### Step 3

解释下面这个 API contract：

```text
POST /api/search
Request: { "query": "string" }
Response: { "results": [{ "source": "string", "excerpt": "string" }] }
```

### Step 4

写出 3 个你认为应该返回 `400` 的请求错误。

## 验收标准

- 能解释 GET 和 POST 的区别。
- 能写出合法 JSON。
- 能解释 API request 和 response。
- 能说出 200、400、403、404、500 的大致含义。
- 能理解为什么 AI 应用需要明确 contract。
