---
description: "AI Learning 教程页面：Week 9: Skills、Prompt 工程沉淀和 Superpowers"
icon: calendar-days
---

# Week 9: Skills、Prompt 工程沉淀和 Superpowers

## 本周目标

本周把前面几周反复出现的 prompt、流程和项目知识沉淀成可复用资产。你需要理解 Skills 是“按需加载的工作流/知识包”，Prompt 模板是“任务 contract 的复用形式”，Superpowers 在本仓库里指“已安装的开发工作流技能集合”，不是模型内部推理模式。

## Superpowers 定义

本路线中的 Superpowers 指本地 Superpowers 插件/技能集合，例如：

- brainstorming：把想法澄清成设计。
- writing-plans：把设计拆成可执行计划。
- test-driven-development：先写失败测试或 eval。
- verification-before-completion：完成前必须验证。
- requesting-code-review / receiving-code-review：把 review 当作质量门。

它是 agent-assisted development 的流程技能包，不是 Claude extended thinking、interleaved thinking 或某个模型能力名称。

:::info
本周阅读方式：先读概念，再完成动手任务；主项目增量和验收标准必须一起看。
:::

## 学习地图

| 模块 | 要解决的问题 | 主项目增量 |
| --- | --- | --- |
| Skills | 如何复用流程和项目知识 | `learning-review` skill |
| Prompt 模板 | 如何减少重复提示词 | 模板草案 |
| Superpowers | 如何把 AI 开发流程标准化 | 计划/TDD/验证闭环 |
| Progressive disclosure | 如何避免常驻上下文过大 | supporting docs 约定 |

## 核心概念详解

### Skill 是什么

Skill 是给 agent 使用的按需知识包。它通常包含：

- 触发条件：什么时候使用。
- 工作流步骤：先做什么，再做什么。
- 检查清单：如何判断完成。
- 参考文件：更长的背景资料。
- 模板或脚本：避免重复手写。

Skill 不应该变成百科全书。主 `SKILL.md` 应该短而清楚，长示例和资料放到引用文件。

### Prompt 模板和 Skill 的区别

Prompt 模板解决“如何表达一个任务”。Skill 解决“如何完成一类任务”。例如：

- Prompt 模板：代码 review 输出格式。
- Skill：完整 code review 流程，包括读 diff、找风险、按严重程度排序、检查测试。

当你发现一个 prompt 反复复制粘贴，就可以考虑把它变成模板。当你发现一个流程反复执行，就可以考虑做成 skill。

### Progressive disclosure

Progressive disclosure 是指只在需要时加载详细知识。这样可以避免上下文窗口被无关内容占满。

本仓库的分层建议：

- `AGENTS.md`：短规则，永远加载。
- `agent-workflows/*.md`：具体工作流，按需读。
- `agent-workflows/skills/*/SKILL.md`：可复用技能。
- `roadmap/*.md`：学习内容，作为 Docusaurus 教程页面。
- MCP resources/tools：让 agent 在需要时读取或执行。

### Superpowers 工作流

一个稳健的 Superpowers 风格开发流程：

1. Brainstorming：确认目标、范围、成功标准。
2. Writing plans：写可执行计划，锁定文件、接口和验证。
3. TDD/eval-first：先写失败测试或 eval case。
4. Implementation：小步实现。
5. Verification：运行验证命令。
6. Review：找 bug、回归、缺测试和模糊 contract。

它的价值在于把 agent 的临场发挥变成可检查流程。

## 主项目增量

本周要把“学习资料 review”沉淀成项目 skill，并设计 prompt 模板：

- `agent-workflows/skills/learning-review/SKILL.md` 用于检查学习章节是否清晰、完整、有实践、有 eval。
- 为新增 roadmap 章节建立 review prompt。
- 为新增 agent/tool 行为建立 eval-first 模板。

## 动手任务

### Step 1

运行一次 `learning-review` skill 的人工模拟。

### Step 2

把一个重复 prompt 改写成项目 skill 或 prompt 模板。

### Step 3

为 AI 学习助手新增一个小功能，先写计划，再实现。

### Step 4

写一个最小失败测试或 eval case。

### Step 5

完成后记录验证命令和结果。

## 验收标准

- 至少有一个项目级 skill 草案。
- 每个功能都有计划、验证和复盘。
- 不把“模型说可以”当作验证。
- 能区分开发计划、任务清单和 agent trace。
- 能清楚说明 Superpowers 在本路线中是工作流技能包，不是模型推理模式。

## 常见误区

:::warning
- 误区：Skill 就是长 prompt。  
  更好的理解：Skill 是任务流程、检查清单和必要知识的组合。

- 误区：Superpowers 是模型更强的思考模式。  
  在本仓库中，Superpowers 是开发流程技能包。
:::

## 复盘问题

- 哪一步最容易被跳过？
- 哪些流程会提升 agent 质量，哪些只是形式主义？
- 什么内容应该沉淀成 skill，什么内容只需要放在 Docusaurus 教程文档里？
