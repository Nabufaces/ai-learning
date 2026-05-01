---
description: "AI Learning 教程页面：Week 10: Harness Engineering I：运行控制和 Observability"
icon: calendar-days
---

# Week 10: Harness Engineering I：运行控制和 Observability

## 本周目标

本周进入 harness engineering。目标是把 agent 从“会调用工具”升级为“在受控运行框架中调用工具”。你要实现或理解 runtime、tool registry、permission、budget、trace，并设计 observability 字段。Harness 是执行边界，Observability 是看见执行过程，两者不能互相替代。

{% hint style="info" %}
本周阅读方式：先读概念，再完成动手任务；主项目增量和验收标准必须一起看。
{% endhint %}

## 学习地图

| 模块 | 要解决的问题 | 主项目增量 |
| --- | --- | --- |
| Runtime | 一次 agent run 如何启动和结束 | `runHarness` |
| Tool registry | 工具如何注册、选择和执行 | `ToolRegistry` |
| Permission | agent 能调用什么 | allowlist 和 approval |
| Budget | 如何限制成本和循环 | maxToolCalls、maxRuntimeMs |
| Trace | 如何知道每一步发生了什么 | trace events |
| Observability | 如何跨 run 分析问题 | Langfuse/LangSmith/OTel 选型 |

## 核心概念详解

### Harness 是什么

Harness 是 agent 外面的工程控制层。模型可以建议下一步，但 harness 决定：

- 这次 run 能用哪些工具。
- 最多调用几次工具。
- 哪些工具需要人工确认。
- 工具失败如何记录。
- 什么时候停止。
- trace 和 checkpoint 怎么保存。

没有 harness 的 agent 很难上线，因为它缺少权限、预算、可观测性和恢复能力。

### Tool registry

Tool registry 是工具目录。它至少包含：

- 工具名称。
- 描述。
- 模式：read/write/destructive。
- 输入 schema。
- 是否需要审批。
- 执行函数。

模型不应该直接访问任意函数。它只能从 registry 中选择本次 run 被允许的工具。

### Permission 和 approval

Permission 是预先定义的权限边界，approval 是运行时人工确认。二者不同：

- Permission：这次 run 的 allowlist 中是否有该工具。
- Approval：即使允许该工具，某次调用是否需要人确认。

例如 `create_weekly_plan` 可能是允许的写工具，但真正写入文件前仍需要人工确认。

### Budget

Budget 防止 agent 无限循环或成本失控。本仓库 baseline 包含：

- `maxToolCalls`
- `maxRuntimeMs`

生产系统还可以加入：

- max prompt tokens
- max completion tokens
- max cost
- max retries
- max external API calls

预算耗尽不是程序崩溃，而是一种正常失败结果，应该进入 trace 并返回明确原因。

### Trace 和 Observability

Trace 是单次 run 的事件记录，例如 run started、plan created、tool selected、tool call started、tool completed、run failed。Observability 平台则用于跨 run 查看趋势、延迟、token、成本、失败率和 eval score。

推荐字段：

- run id
- task
- model
- retrieval query 和 sources
- tool name/input/output summary
- latency
- token/cost
- error
- eval score

Langfuse、LangSmith 和 OpenTelemetry 都可以接入这类数据。区别是 Langfuse 更偏开源 LLM observability，LangSmith 与 LangChain 生态结合更紧，OpenTelemetry 更适合和已有后端 tracing 统一。

## 必须实现

- Runtime。
- Tool registry。
- Permission allowlist。
- Budget。
- 基础 trace。

## 理解即可

- Langfuse/LangSmith/OpenTelemetry 的完整部署。
- 本周只需要完成 observability 选型和 trace 字段设计。

## 主项目增量

本周要让 AI 学习助手可以通过 harness 控制工具调用：

- `pnpm harness:demo` 能运行。
- 工具调用进入 trace。
- 未授权工具被拒绝。
- 超出预算返回可解释失败。
- observability 字段写入文档。

## 动手任务

{% stepper %}
{% step %}
## Step 1

运行 `pnpm harness:demo`。
{% endstep %}

{% step %}
## Step 2

增加一个只读工具和一个需要审批的工具。
{% endstep %}

{% step %}
## Step 3

制造预算耗尽，观察 trace。
{% endstep %}

{% step %}
## Step 4

写一份 observability 选型记录：Langfuse、LangSmith、OpenTelemetry 的取舍。
{% endstep %}

{% step %}
## Step 5

给 AI 学习助手定义 trace 字段：run id、model、retrieval、tool call、latency、token/cost、eval score。
{% endstep %}
{% endstepper %}

## 验收标准

- 每次工具调用都出现在 trace 中。
- 超出预算会停止执行并返回失败原因。
- 权限拒绝不是异常崩溃，而是可解释结果。
- 能说明 harness trace 和 observability platform 的关系。

## 常见误区

{% hint style="warning" %}
- 误区：用了 Langfuse 就有 harness。  
  更好的理解：Langfuse 记录和分析行为，harness 执行权限和预算。

- 误区：trace 只是日志。  
  更好的理解：trace 是调试、replay、eval 和恢复的基础数据结构。
{% endhint %}

## 复盘问题

- Harness 应该控制哪些行为？
- 权限、预算、日志和 checkpoint 哪个最先影响生产可靠性？
- 没有 trace 时，agent bug 为什么难排查？

