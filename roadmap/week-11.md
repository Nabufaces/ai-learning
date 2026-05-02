---
description: "AI Learning 教程页面：Week 11: Harness Engineering II：可靠性和 Eval"
icon: calendar-days
---

# Week 11: Harness Engineering II：可靠性和 Eval

## 本周目标

本周把 Week 10 的运行控制推进到可靠性工程：checkpoint、replay、failure recovery、regression 和 eval 工具链。你要理解 eval 不只是测模型，而是测整个 AI 应用：检索、工具选择、工具执行、模型回答、拒答和安全边界。

:::info
本周阅读方式：先读概念，再完成动手任务；主项目增量和验收标准必须一起看。
:::

## 学习地图

| 模块 | 要解决的问题 | 主项目增量 |
| --- | --- | --- |
| Checkpoint | 中间状态如何保存 | checkpoint read/write |
| Replay | 失败如何复现 | replay 设计 |
| Failure recovery | 工具失败、预算耗尽后怎么办 | recovery policy |
| Eval harness | 行为如何回归测试 | JSON eval runner |
| Eval 工具 | 何时用 PromptFoo/RAGAS/Braintrust | 工具链选型 |

## 核心概念详解

### Checkpoint

Checkpoint 是一次 run 的中间状态快照。它可以包含：

- run id
- task
- 当前状态
- trace
- 已完成工具调用
- 关键 observation
- 下一步计划

Checkpoint 的价值是失败后不用从头开始，也能分析“失败前系统知道什么”。它不应该塞进 prompt，当作外部状态保存更可靠。

### Replay

Replay 是用同样输入和同样工具结果复现一次失败。没有 replay，agent bug 往往难以定位，因为模型输出、工具结果和外部状态都可能变化。

一个可 replay 的系统需要记录：

- 原始用户输入。
- prompt 版本。
- 模型和参数。
- 检索结果。
- 工具输入和输出摘要。
- 错误。
- 最终回答。

学习阶段不要求实现完整 replay，但要从 trace 设计上为它留空间。

### Failure recovery

失败恢复不是简单重试。常见策略：

- 参数错误：让模型修正工具参数。
- 工具 timeout：重试有限次数或降级。
- 权限拒绝：请求人工确认或选择只读替代工具。
- 检索无结果：拒答并说明需要补充资料。
- budget exhausted：停止并返回已完成步骤。

Recovery policy 应该写在 harness 层，而不是散落在 prompt 中。

### Eval harness

Eval harness 负责评分。它和 agent harness 的区别：

- Agent harness 控制一次运行。
- Eval harness 给定输入、期望和评分规则，判断行为是否通过。

当前仓库的 JSON eval runner 适合做 deterministic regression：检查回答是否包含关键词、是否引用预期来源、未知主题是否拒答。

### PromptFoo

PromptFoo 适合 TypeScript 项目做 prompt 和输出回归测试。它可以把不同 prompt、provider、测试输入和断言组织成配置文件，并接入 CI。适合测试：

- prompt 变更是否破坏旧问题。
- tool calling 是否选对工具。
- RAG 回答是否包含来源。
- 安全拒答是否稳定。

### RAGAS

RAGAS 专注 RAG 质量指标。常见指标：

- Faithfulness：回答是否忠实于 retrieved context。
- Answer relevancy：回答是否切题。
- Context recall：检索是否召回了必要证据。
- Context precision：召回内容是否噪声过多。

RAGAS 通常需要 question、answer、contexts、reference answer 或 ground truth。学习阶段先做指标映射，后续再接工具。

### LLM-as-judge

LLM-as-judge 是用模型做评分器。它适合判断语义质量，但容易有偏差和不稳定。使用时要：

- 写明确 rubric。
- 给 judge 提供问题、上下文、答案和评分标准。
- 固定 judge 模型和 prompt 版本。
- 保留规则断言，例如必须包含来源。

## 必须实现

- Checkpoint 基础读写。
- 现有 JSON eval 继续可运行。
- 至少一个失败 case。
- Failure recovery policy 文档。

## 理解即可

- RAGAS、Braintrust、LLM-as-judge 的完整平台接入。
- 本周只做工具链选型和指标映射。

## 主项目增量

本周让 AI 学习助手具备可靠性基础：

- `pnpm eval` 通过。
- checkpoint 可以保存和读取。
- eval case 覆盖 RAG、MCP、harness、安全、拒答。
- PromptFoo 配置草案存在。
- RAGAS metric mapping 存在。

## 动手任务

### Step 1

运行 `pnpm eval`。

### Step 2

新增一个失败 case，并记录为什么失败。

### Step 3

用 checkpoint 保存一次 run，再读取它。

### Step 4

写一个 PromptFoo 配置草案，说明如何把现有 JSON eval 迁移过去。

### Step 5

为 RAG 场景标注 faithfulness、answer relevancy、context recall 分别需要哪些输入。

## 验收标准

- Eval 输出包含 pass/fail 和失败原因。
- Trace 能支持定位失败阶段。
- 能解释 eval harness 和 agent harness 的区别。
- 能说明 PromptFoo、RAGAS、Braintrust 分别适合解决什么问题。

## 常见误区

:::warning
- 误区：eval 是最后上线前才做。  
  更好的做法：从第一个 RAG/tool/agent 行为开始就加 eval。

- 误区：LLM-as-judge 可以替代所有测试。  
  更好的做法：规则断言、人工 golden set 和 judge score 结合使用。
:::

## 复盘问题

- 评测是在测模型，还是在测整个应用 harness？
- 哪些失败应该加入回归集？
- LLM-as-judge 的评分 prompt 怎样避免过度主观？

