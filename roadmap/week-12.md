---
description: "AI Learning 教程页面：Week 12: 整合打磨、评测报告和复盘"
icon: calendar-days
---

# Week 12: 整合打磨、评测报告和复盘

## 本周目标

本周不是从零赶工做项目，而是整合前 11 周的增量成果。最终 AI 学习助手应该能运行、能检索、能调用工具、能被 harness 控制、能被 eval 检查，并且能清楚说明自己的能力边界。

{% hint style="info" %}
本周阅读方式：先读概念，再完成动手任务；主项目增量和验收标准必须一起看。
{% endhint %}

## 学习地图

| 模块 | 要解决的问题 | 本周产物 |
| --- | --- | --- |
| End-to-end | 从用户问题到回答的链路是否完整 | 项目演示 |
| Evaluation report | 当前能力和失败点是什么 | 评测报告 |
| Deployment readiness | 上线前缺什么 | checklist |
| GitBook 化 | 学习资料是否可阅读和发布 | `SUMMARY.md` |
| Retrospective | 下一步怎么继续 | backlog |

## 核心概念详解

### End-to-end slice

一个完整 AI 学习助手链路应该包括：

1. 用户输入问题。
2. API 验证请求。
3. 根据问题检索学习资料。
4. 必要时进入 agent loop。
5. Agent 选择工具。
6. Harness 检查权限和预算。
7. 工具返回 observation。
8. 生成回答并引用来源。
9. Trace 记录全过程。
10. Eval 检查关键行为。

如果其中任何一环不可观察，后续调试都会困难。

### Product contract

产品 contract 要回答：

- 助手能回答什么？
- 答案依据来自哪里？
- 什么时候拒答？
- 能调用哪些工具？
- 哪些操作需要人工确认？
- 失败时用户看到什么？

不要把“模型可能知道”当作产品能力。产品能力必须能被数据、工具和 eval 支撑。

### Evaluation report

评测报告至少包含：

- eval 总数和通过率。
- 覆盖类别：RAG、MCP、agent、harness、安全、拒答。
- 失败案例和修复建议。
- trace 样本。
- 未覆盖风险。
- 下一步优先级。

这份报告比“看起来能回答”更重要，因为它能指导后续迭代。

### Deployment readiness

上线前至少检查：

- API key 和环境变量管理。
- 日志和 trace 是否会泄露敏感信息。
- 超时、rate limit、重试策略。
- 成本预算。
- 工具权限和人工审批。
- eval 是否进入 CI。
- GitHub/GitBook 文档是否同步。

本路线不要求 Week 12 完成生产部署，但要知道缺口在哪里。

### GitBook 化

本仓库已经用 GitBook 友好的结构组织：

- `README.md` 是首页。
- `SUMMARY.md` 是目录。
- `.gitbook.yaml` 指定 GitBook 读取根目录。
- 每周学习内容在 `roadmap/week-*.md`。
- labs、harness、eval、agent workflows 都有文档入口。

后续推到 GitHub 后，可以把仓库连接到 GitBook，让它作为可阅读课程。

## 主项目增量

本周收口：

- API 可以启动。
- RAG baseline 可以检索。
- Harness demo 可以运行。
- Eval 全部通过。
- GitBook 目录完整。
- 写复盘和下一步规划。

## 动手任务

{% stepper %}
{% step %}
## Step 1

运行 `pnpm assistant:dev`。
{% endstep %}

{% step %}
## Step 2

用真实问题测试 `/api/chat` 和 `/api/search`。
{% endstep %}

{% step %}
## Step 3

运行 `pnpm eval`，保存结果摘要。
{% endstep %}

{% step %}
## Step 4

按 [project-throughline.md](project-throughline.md) 检查每周主项目切片是否完成。
{% endstep %}

{% step %}
## Step 5

检查 `SUMMARY.md` 是否覆盖所有阅读入口。
{% endstep %}

{% step %}
## Step 6

写一份项目复盘：已完成、未完成、下一步。
{% endstep %}
{% endstepper %}

## 验收标准

- AI 学习助手能基于仓库资料回答并引用来源。
- 至少 6 个 eval case 可以运行。
- Harness 能记录 trace，预算和权限可配置。
- README 和 SUMMARY 能指导新学习者按 GitBook 方式阅读。
- 能说清楚当前项目距离生产可用还差什么。

## 常见误区

{% hint style="warning" %}
- 误区：Week 12 才开始做最终项目。  
  更好的做法：Week 12 只做整合、评测、文档和复盘。

- 误区：demo 能跑就算完成。  
  更好的做法：demo、eval、trace、文档和下一步 backlog 都要有。
{% endhint %}

## 复盘问题

- 如果要上线给别人使用，最先要补什么？
- 这 12 周里最重要的能力是模型能力、应用设计，还是 harness engineering？
- 哪些内容应该继续深入成第二阶段路线？

