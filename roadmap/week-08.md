---
description: "AI Learning 教程页面：Week 8: 编码 Agent 工作流"
icon: calendar-days
---

# Week 8: 编码 Agent 工作流

## 本周目标

本周学习如何让 Codex、Claude Code 和其他 coding agent 稳定参与项目开发。重点不是“哪个工具更聪明”，而是建立 agentic coding 的工作流：读代码、规划、小步修改、验证、review、记录风险。

:::info
本周阅读方式：先读概念，再完成动手任务；主项目增量和验收标准必须一起看。
:::

## 学习地图

| 模块 | 要解决的问题 | 主项目增量 |
| --- | --- | --- |
| AGENTS.md | 给 coding agent 的常驻规则放哪里 | 审查根规则 |
| Codex | 如何做仓库内修改和验证 | Codex workflow |
| Claude Code | 如何结合 skills、MCP、subagents | Claude Code workflow |
| Agentic coding | 如何降低 AI 改代码风险 | review checklist |

## 核心概念详解

### AGENTS.md 的定位

AGENTS.md 是项目级、常驻、短规则文档。它不应该变成教程、设计文档或长篇背景资料。好的 AGENTS.md 只放 agent 每次工作都需要知道的规则：

- 包管理器和关键命令。
- 文件范围和项目约定。
- 验证命令。
- 提交归因要求。
- 不应触碰的边界。

长流程应该放到 `agent-workflows/` 或 skill 中，避免常驻上下文过重。

### Codex 的适用场景

Codex 适合：

- 阅读现有仓库。
- 实现明确改动。
- 运行终端验证。
- 做代码 review。
- 持续修复测试失败。

好的 Codex 任务应该有明确目标和验收标准。不要只说“优化一下项目”，而要说“把 Week 4 文档补成 Docusaurus 教程章节，并保持 eval 通过”。

### Claude Code 的适用场景

Claude Code 常见优势在于：

- Skills：把重复流程沉淀成可加载工作流。
- MCP：连接外部工具和上下文。
- Subagents：把探索、实现、review 拆开。
- Hooks/commands：把项目流程自动化。

在本路线中，Claude Code 与 Codex 的边界不是绝对的。重要的是：所有 coding agent 都要遵守 AGENTS.md、运行验证、说明残余风险。

### AGENTS.md、Skill、MCP 的职责边界

- AGENTS.md：永远加载的项目规则。
- Skill：按需加载的工作流或知识包。
- MCP：让 agent 调用外部工具或读取外部上下文的协议。
- Harness：控制 agent 运行权限、预算、trace、checkpoint。

如果 agent 忽略规则，先检查规则是不是太长、太模糊、没有验收命令。不要把所有问题都归因于模型。

### Agentic coding 的可靠流程

推荐流程：

1. 读相关文件。
2. 明确改动范围。
3. 小步修改。
4. 运行最小验证。
5. 如果失败，读错误再改。
6. 总结改动、验证和风险。

这也是后续 Skills 和 Superpowers 要沉淀的流程。

## 主项目增量

本周不一定改业务代码，但要让仓库更适合 agent 协作：

- 审查 `AGENTS.md` 是否短而可执行。
- 保持 `CLAUDE.md -> AGENTS.md`。
- 完善 `agent-workflows/codex.md` 和 `agent-workflows/claude-code.md`。
- 为新增功能建立 review checklist。

## 动手任务

### Step 1

审查 AGENTS.md 是否短而可执行。

### Step 2

用 Codex/Claude Code 工作流描述一次“新增 eval case”的 agentic coding 流程。

### Step 3

写下 coding agent 在本仓库中必须遵守的验证命令。

### Step 4

明确 AGENTS.md、Skill、MCP 的职责边界。

## 验收标准

- AGENTS.md 不超过 100 行。
- 能说明 AGENTS.md、Skill、MCP 的职责边界。
- 能说明什么时候用 Codex、什么时候用 Claude Code、什么时候只写普通脚本。
- 每次 agentic coding 都有验证命令和残余风险说明。

## 常见误区

:::warning
- 误区：把所有背景都写进 AGENTS.md。  
  更好的做法：AGENTS.md 放常驻规则，细节放教程文档、skills 或 workflow 文档。

- 误区：AI 写完代码就算完成。  
  更好的做法：完成必须包含验证输出和风险说明。
:::

## 复盘问题

- 哪些内容应该永远加载，哪些应该按需加载？
- 如果 agent 忽略规则，是规则太长、太模糊，还是验证不够？
- Coding agent 的价值来自生成代码，还是来自持续执行读代码、改代码、验证、review 的闭环？
