---
title: Stage 6：迷你项目练习
description: 用几个小练习把零基础知识连接到 AI 应用开发路线
---

# Stage 6：迷你项目练习

本阶段用几个小练习把前面的基础串起来。练习不追求复杂，而是要求你能清楚说明输入、处理、输出和失败情况。

## 练习 1：学习主题格式化器

目标：写一个函数，把周次和主题格式化成标题。

输入：

```ts
const week = 1;
const topic = "LLM API 基础";
```

输出：

```text
Week 1: LLM API 基础
```

你要练习：

- 变量。
- 函数。
- 字符串模板。
- `console.log`。

完成标准：

- 能运行并看到输出。
- 能解释函数的输入和输出。

## 练习 2：JSON 学习计划

目标：用对象表示一条学习计划。

示例：

```ts
type LearningTask = {
  title: string;
  estimatedMinutes: number;
  done: boolean;
};

const task: LearningTask = {
  title: "阅读 Week 1",
  estimatedMinutes: 45,
  done: false
};
```

你要练习：

- TypeScript type。
- 对象字段。
- boolean。
- JSON 思维。

完成标准：

- 能解释 `title`、`estimatedMinutes`、`done` 的类型。
- 能把对象改写成合法 JSON。

## 练习 3：本地搜索函数

目标：写一个最小关键词搜索。

示例：

```ts
const notes = [
  "Week 1 学习 LLM API",
  "Week 4 学习 RAG",
  "Week 7 学习 Agent loop"
];

function searchNotes(query: string): string[] {
  return notes.filter((note) => note.includes(query));
}

console.log(searchNotes("RAG"));
```

你要练习：

- 数组。
- filter。
- 字符串匹配。
- 函数返回数组。

完成标准：

- 搜索 `RAG` 能返回 Week 4。
- 搜索不存在的词能返回空数组。
- 能解释这和 RAG 里的 retrieval 有什么关系。

## 练习 4：API contract 草稿

目标：为一个学习助手写 API contract。

示例：

```text
POST /api/search

Request:
{
  "query": "string"
}

Response:
{
  "results": [
    {
      "source": "string",
      "excerpt": "string"
    }
  ]
}
```

你要练习：

- HTTP method。
- URL。
- request/response。
- JSON schema 思维。

完成标准：

- 能解释为什么 search 用 `POST` 或 `GET` 都可以，但 chat 更常用 `POST`。
- 能写出一个错误响应，例如 query 为空时返回什么。

## 练习 5：失败记录

目标：每次练习至少记录一个失败。

模板：

```text
我运行的命令：

错误信息：

我认为原因是：

我怎么修复：

下次如何避免：
```

AI 应用工程里，失败记录非常重要。后续 trace、eval、checkpoint、replay 都是在把失败变成可分析的数据。

## 最终产物

完成本阶段后，你应该有：

- 一个 TypeScript 小文件，包含 2 到 3 个函数。
- 一个 JSON 示例。
- 一个 API contract 草稿。
- 一份失败记录。
- 一次 Git commit。

## 验收标准

- 能运行一个 `.ts` 文件并看到输出。
- 能写对象、数组、函数和简单类型。
- 能写出一个 request/response contract。
- 能解释本地搜索函数和 RAG retrieval 的关系。
- 能提交自己的练习改动。
