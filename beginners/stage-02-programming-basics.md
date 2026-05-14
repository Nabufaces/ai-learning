---
title: Stage 2：编程基础
description: 用 TypeScript 建立变量、函数、对象、数组和模块的最小基础
---

# Stage 2：编程基础

本阶段只学进入 AI 应用开发必须用到的编程基础。不要一开始追求算法题，也不要急着学框架。你需要先理解：程序就是一组明确的输入、处理和输出。

## 程序的基本结构

一个最小程序通常包含：

- 输入：来自用户、文件、API 或函数参数。
- 处理：判断、计算、转换、调用函数。
- 输出：打印文本、返回 JSON、写文件、调用 API。

AI 应用也是程序。模型回答只是其中一个步骤，不是整个系统。

## 变量

变量用来给数据起名字。

```ts
const courseName = "AI Learning";
const weeks = 12;
const isBeginner = true;
```

你要先养成两个习惯：

- 名字要能说明含义。
- 不确定类型时，先看值是什么。

## 函数

函数是可以重复使用的一段逻辑。

```ts
function formatWeekTitle(week: number, topic: string): string {
  return `Week ${week}: ${topic}`;
}

const title = formatWeekTitle(1, "LLM API 基础");
console.log(title);
```

函数最重要的是 contract：

- 输入是什么。
- 输出是什么。
- 失败时怎么办。

后续 tool calling、MCP tool、harness tool，本质上都离不开函数 contract。

## 条件判断

条件判断用来处理分支。

```ts
function getLevelLabel(hasProgrammingBasics: boolean): string {
  if (hasProgrammingBasics) {
    return "进入 12 周路线";
  }

  return "先完成零基础入门路线";
}
```

AI 应用里常见判断：

- 检索结果为空时拒答。
- 工具需要审批时暂停。
- 超出预算时停止。
- 输出不符合 schema 时重试或失败。

## 数组

数组是一组有顺序的数据。

```ts
const topics = ["LLM API", "RAG", "MCP", "Agent"];

for (const topic of topics) {
  console.log(topic);
}
```

RAG 的 chunks、eval cases、messages、trace events 都常常是数组。

## 对象

对象是一组带名字的字段。

```ts
const toolCall = {
  name: "search_learning_notes",
  input: {
    query: "Week 4 学什么"
  },
  requiresApproval: false
};
```

AI 应用中对象非常重要，因为 API、JSON、schema、tool input、trace event 都是对象思维。

## 类型

TypeScript 的价值是让数据结构更明确。

```ts
type SearchResult = {
  source: string;
  excerpt: string;
  score: number;
};

function summarizeResult(result: SearchResult): string {
  return `${result.source}: ${result.excerpt}`;
}
```

你不需要一开始掌握复杂泛型，但要能看懂：

- `string` 是文本。
- `number` 是数字。
- `boolean` 是 true/false。
- `string[]` 是文本数组。
- `{ source: string }` 是带字段的对象。

## 模块

一个项目不会把所有代码写在一个文件里。模块用于拆分文件。

```ts
// tools.ts
export function sayHello(name: string): string {
  return `Hello, ${name}`;
}
```

```ts
// index.ts
import { sayHello } from "./tools.js";

console.log(sayHello("AI Learning"));
```

注意：本仓库 TypeScript 使用 NodeNext 模式，导入本地 TS 文件时常见写法是 `./tools.js`。这是新手容易疑惑的地方：源文件是 `.ts`，运行时模块路径按编译后的 `.js` 写。

## 动手任务

### Step 1

新建一个临时文件，例如 `scratch/basics.ts`，写一个函数：

```ts
function createWeeklyGoal(week: number, topic: string): string {
  return `第 ${week} 周目标：学习 ${topic}`;
}

console.log(createWeeklyGoal(1, "LLM API"));
```

### Step 2

加一个数组，循环打印 3 个主题。

### Step 3

加一个对象，描述一个 tool call，包含 `name`、`input`、`requiresApproval`。

### Step 4

给对象写一个 `type`，让 TypeScript 帮你检查字段。

## 验收标准

- 能写出一个带参数和返回值的函数。
- 能区分数组和对象。
- 能解释为什么 AI tool input 适合用对象表达。
- 能看懂简单 TypeScript 类型定义。
