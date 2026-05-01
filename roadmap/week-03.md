# Week 3: Prompt、Tool Calling、Zod 和 Context 管理

## 本周目标

本周从“写 prompt”升级到“设计可验证的模型接口”。你需要理解 prompt 只是 AI 应用的一层，真正可维护的系统还需要 tool schema、runtime validation、上下文预算和错误恢复。Zod 是本周的关键工具，因为 TypeScript 类型只在编译期存在，模型输出和用户输入必须在运行时验证。

## 学习地图

| 模块 | 要解决的问题 | 主项目增量 |
| --- | --- | --- |
| Prompt 分层 | 如何让任务、上下文和输出约束不互相污染 | chat prompt contract |
| Tool calling | 模型如何选择和调用外部能力 | 三个 learning tools 的 schema |
| Zod | 如何验证请求、工具参数和模型输出 | schema 草案 |
| Context 管理 | 长文档和长对话如何进入模型 | 上下文策略笔记 |

## 核心概念详解

### Prompt 工程不是写作文

Prompt 工程的目标不是写出“优美提示词”，而是把任务 contract 表达清楚。一个可维护 prompt 通常包含：

- 角色：这个助手负责什么。
- 任务：本轮要完成什么。
- 上下文：可以依据哪些资料。
- 约束：不能做什么，何时拒答。
- 输出格式：返回 Markdown、JSON、表格还是结构化字段。
- 失败处理：资料不足、工具失败、输入模糊时如何回应。

如果 prompt 里同时塞入用户输入、检索材料、系统规则和工具结果，但没有边界标记，模型很容易把“不可信资料里的指令”当成系统要求。这也是 Week 7 prompt injection 的来源。

### Tool calling 的本质

Tool calling 是让模型选择一个外部函数，并生成该函数的参数。真正执行工具的是你的程序，不是模型。模型只负责“建议调用哪个工具和传什么参数”。

一个工具接口至少要定义：

- `name`：短、稳定、动作明确，例如 `search_learning_notes`。
- `description`：写给模型看的能力说明，不是给人看的营销文案。
- `inputSchema`：参数类型、必填字段、约束和例子。
- `output contract`：工具返回什么，失败时返回什么。
- `mode`：read/write/destructive。
- `approval`：是否需要人工确认。

工具设计好坏会直接影响 agent 行为。名字模糊、参数宽泛、错误信息不可执行，都会导致模型选错工具或失败后无法恢复。

### 为什么需要 Zod

TypeScript 的类型在运行时不存在。用户请求、模型输出、工具参数、JSON 文件和网络返回都必须做 runtime validation。Zod 的价值是用一份 schema 同时表达类型和运行时校验。

本路线建议从 Week 3 起用 Zod 描述：

- `/api/chat` 请求体。
- `/api/search` 请求体。
- tool input。
- tool output。
- eval case。
- 结构化模型输出。

即使当前代码还没引入依赖，也要先学会 schema 边界应该在哪里。

### Context window 管理

上下文管理是 AI 应用的核心能力之一。常见策略：

- 裁剪：只保留最近几轮对话，简单但可能丢失关键信息。
- 摘要：把历史压缩成状态摘要，成本低但可能损失细节。
- 检索：把历史、文档或知识库外部化，需要时取回。
- 工具状态：把可计算状态放在数据库、trace 或 checkpoint，不放进 prompt。

判断原则：需要模型推理的信息进入 prompt；需要程序精确执行的信息放在外部状态；来源文档通过 RAG 进入上下文；敏感信息不进入 prompt。

## 主项目增量

本周为 AI 学习助手定义三个工具的 schema：

- `search_learning_notes`：只读，检索学习资料。
- `create_weekly_plan`：写操作，需要人工确认。
- `run_quiz`：只读，根据主题生成测验。

同时为 `/api/chat` 和 `/api/search` 设计 Zod schema，后续实现时替换手写 validation。

## 动手任务

1. 为三个 learning tools 写 name、description、input、output、failure mode。
2. 用 Zod 草拟 chat request、search request、tool input 和 tool output。
3. 为长上下文问题写策略：哪些进 prompt，哪些进 RAG，哪些进 trace/checkpoint。
4. 写一个 eval case，验证模型应该选择 `search_learning_notes` 而不是直接回答。

## 验收标准

- 每个工具都有明确名字、参数和错误输出。
- 每个外部输入都有 runtime validation 边界。
- 能区分 prompt failure、tool selection failure、tool execution failure。
- 能解释 context window 不够时的三种处理策略。

## 常见误区

- 误区：tool description 越详细越好。  
  更好的做法：描述应短、准确、包含何时使用和何时不用。

- 误区：有 TypeScript 类型就不用运行时校验。  
  更好的做法：只要数据来自模型、用户或文件，就需要 runtime validation。

## 复盘问题

- 工具 description 应该写给人看，还是写给模型看？
- 高层工作流工具和低层 CRUD 工具如何取舍？
- 上下文不足时应该压缩、检索，还是让用户澄清？

