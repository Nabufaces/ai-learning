---
title: Stage 5：AI 与 LLM 基础
description: 以小白能理解的方式建立 LLM API、prompt、token、上下文和结构化输出概念
---

# Stage 5：AI 与 LLM 基础

本阶段把“会聊天的 AI”拆成工程视角。你需要理解：AI 应用不是把用户问题直接丢给模型，而是一个包含输入、上下文、模型调用、输出解析、验证和错误处理的软件系统。

## LLM 是什么

LLM 是 Large Language Model，大语言模型。它根据输入文本预测并生成输出文本。它可以写代码、总结、分类、规划、回答问题，但它不是数据库，也不是可靠执行器。

工程上要记住：

- 模型可能答错。
- 模型可能编造。
- 模型可能不按格式输出。
- 模型不知道你项目里的最新资料，除非你把资料提供给它。
- 模型不能直接拥有权限，权限应该由程序控制。

## Prompt 是什么

Prompt 是给模型的输入指令和上下文。一个 AI 应用里的 prompt 通常包含：

- system/developer 指令：规则、角色、边界。
- user message：用户问题。
- retrieved context：检索到的资料。
- tool result：工具调用结果。
- output requirement：输出格式要求。

不要把 prompt 当魔法咒语。更好的理解是：prompt 是模型接口的一部分，需要设计、版本管理和测试。

## Token 和上下文

Token 是模型处理文本的单位。上下文窗口是模型一次请求能看到的最大 token 数。

你不需要一开始会精确计算 token，但要理解：

- 输入越长，成本越高。
- 上下文不是无限记忆。
- 长文档不能全部塞进 prompt。
- 需要 RAG 来选择“本次回答最相关”的资料。

## LLM API 调用

一次 LLM API 调用可以理解为：

```text
你的程序
  → 发送 messages/model/参数
  → 模型服务处理
  → 返回文本或结构化结果
  → 你的程序验证和展示
```

重要参数：

| 参数 | 作用 |
| --- | --- |
| model | 使用哪个模型 |
| messages | 对话和上下文 |
| temperature | 输出随机性 |
| max tokens | 最大输出长度 |
| tools | 模型可请求调用的工具 |
| response format | 结构化输出要求 |

## 结构化输出

AI 应用经常需要 JSON，而不是一段自然语言。

例如你希望模型返回：

```json
{
  "topic": "RAG",
  "difficulty": "beginner",
  "nextAction": "read_week_04"
}
```

但模型可能返回：

```text
你可以先学习 RAG，它比较适合初学者。
```

这对程序来说就不可靠。程序需要 schema 和 validation。Week 3 会学习 Zod，本阶段只需要理解：模型输出必须被验证。

## RAG 是什么

RAG 是 Retrieval-Augmented Generation，检索增强生成。

简单说：

```text
先从资料库找相关内容
  → 把相关内容放进上下文
  → 再让模型基于这些内容回答
  → 回答时给出来源
```

它解决的问题是：模型本身不知道你的项目资料，或者模型记忆不可靠。RAG 让回答有依据、有来源、可检查。

## Tool calling 是什么

Tool calling 是让模型请求程序调用工具。模型不是直接执行工具，而是生成一个工具名和参数，程序判断是否允许，再执行。

例如：

```json
{
  "tool": "search_learning_notes",
  "input": {
    "query": "Week 4 RAG 学什么"
  }
}
```

关键点：模型可以“建议”调用工具，但程序必须控制权限、预算和审批。

## 动手任务

### Step 1

用自己的话解释：

```text
LLM 不是数据库，也不是执行器。
```

### Step 2

写一个 prompt，要求模型把一段学习笔记总结成 3 个字段：

```json
{
  "topic": "...",
  "summary": "...",
  "nextStep": "..."
}
```

### Step 3

写出 3 个模型输出可能失败的方式，例如字段缺失、类型错误、事实错误。

### Step 4

解释 RAG 为什么需要“引用来源”。

## 验收标准

- 能解释 prompt、token、context window。
- 能说明 LLM API 调用不是直接等于完整应用。
- 能解释为什么结构化输出需要 validation。
- 能解释 RAG 和 tool calling 分别解决什么问题。
- 能说明为什么权限不能只靠 prompt 控制。
