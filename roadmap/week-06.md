---
description: "AI Learning 教程页面：Week 6: TypeScript MCP Server"
icon: calendar-days
---

# Week 6: TypeScript MCP Server

## 本周目标

本周把 Week 5 的 MCP 设计推进到 TypeScript server 实现方案。重点不是一次性完成复杂 server，而是学会如何定义工具、输入 schema、输出结构、错误信息和本地调试方法。

{% hint style="info" %}
本周阅读方式：先读概念，再完成动手任务；主项目增量和验收标准必须一起看。
{% endhint %}

## 学习地图

| 模块 | 要解决的问题 | 主项目增量 |
| --- | --- | --- |
| Server 结构 | MCP server 代码如何组织 | server scaffold 设计 |
| Tool schema | 参数和输出如何约束 | 三个 learning tools |
| Inspector | 如何本地调试工具 | 调试流程笔记 |
| Error handling | agent 如何从工具失败恢复 | actionable errors |

## 核心概念详解

### MCP server 的基本组成

一个最小 MCP server 通常包含：

- server 初始化：声明名称、版本和能力。
- transport：stdio 或 HTTP。
- tool registration：注册工具名、描述和输入 schema。
- tool handler：执行工具逻辑。
- error formatter：把异常转成 agent 能理解的错误。

对于学习助手，MCP server 不应该直接复制所有 HTTP API，而应该暴露 agent 需要的工作流能力。

### 工具命名和描述

工具名要稳定、动作明确、领域清楚。推荐：

- `search_learning_notes`
- `create_weekly_plan`
- `run_quiz`

不推荐：

- `doThing`
- `query`
- `helper`

描述要告诉模型何时使用。例如 `search_learning_notes` 的描述应该强调“当问题需要依据本仓库学习资料回答时使用”，而不是泛泛地说“search docs”。

### 输入和输出

输入 schema 应该尽量窄。参数越宽，模型越容易传错。比如检索工具只需要：

- `query`: string
- `limit`: number，可选，有默认值

输出建议同时考虑机器可读和人类可读：

- 机器可读：`source`、`score`、`excerpt`
- 人类可读：简短 Markdown 摘要

这样不同 Host 都能更好地展示和消费工具结果。

### Tool annotations

MCP 工具可以通过 annotation 告诉 Host 这个工具的风险：

- read-only：只读，不改变外部状态。
- idempotent：重复调用不会产生额外副作用。
- destructive：可能删除或破坏数据。
- open-world：是否访问外部世界或不受控数据源。

这些标注不是装饰，它们会影响 Host 是否需要确认、是否允许自动调用、是否展示风险提示。

## 主项目增量

本周目标是为学习助手形成 MCP server 草案：

- 三个工具接口明确。
- 工具 annotations 明确。
- 错误消息明确。
- 后续可以把 `projects/ai-learning-assistant/src/tools.ts` 复用进 MCP server。

## 动手任务

{% stepper %}
{% step %}
## Step 1

写出三个 MCP tools 的接口草案。
{% endstep %}

{% step %}
## Step 2

给每个 tool 标注 read-only、idempotent、open-world、是否 destructive。
{% endstep %}

{% step %}
## Step 3

用伪实现模拟工具返回，先不要接真实模型。
{% endstep %}

{% step %}
## Step 4

设计 MCP Inspector 调试步骤。
{% endstep %}
{% endstepper %}

## 验收标准

- 工具接口能被 agent 读懂并选择。
- 错误消息包含下一步建议。
- 至少一个 eval case 会检查工具选择是否正确。
- 能解释 MCP server 与学习助手内部 API 的复用关系。

## 常见误区

{% hint style="warning" %}
- 误区：MCP server 越通用越好。  
  更好的做法：先围绕真实 agent 工作流设计最小可用工具。

- 误区：工具失败直接 throw 就行。  
  更好的做法：错误应包含原因、可恢复建议和是否可重试。
{% endhint %}

## 复盘问题

- MCP 工具应该返回 Markdown、JSON，还是两者都有？
- 什么时候应该拆工具，什么时候应该合并成工作流工具？
- 工具 schema 应该优先方便人写，还是方便模型生成？

