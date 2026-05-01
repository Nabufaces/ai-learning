# Week 5: MCP 协议基础

## 本周目标

本周学习 MCP 的目标是理解“模型如何安全、标准化地连接外部工具和上下文”。MCP 不是模型，也不是 agent 框架，而是一套协议：让 Host、Client、Server 之间用统一方式暴露 tools、resources 和 prompts。

## 学习地图

| 模块 | 要解决的问题 | 主项目增量 |
| --- | --- | --- |
| MCP 架构 | Host/Client/Server 分别负责什么 | 架构图和术语笔记 |
| Tools | agent 如何执行外部动作 | learning tools MCP schema |
| Resources | agent 如何读取外部上下文 | 学习资料资源设计 |
| Transport | 本地和远程如何通信 | stdio vs HTTP 取舍 |

## 核心概念详解

### Host、Client、Server

MCP 的三个角色：

- Host：用户实际使用的 AI 应用，例如 Claude Desktop、Claude Code、Codex 或你自己的 AI 学习助手。
- Client：Host 内部负责连接某个 MCP server 的协议客户端。
- Server：暴露工具、资源和 prompt 的进程或服务。

一个 Host 可以连接多个 MCP server。每个 server 负责一个能力边界，例如文件系统、GitHub、数据库、学习资料检索或公司内部 API。

### Tools、Resources、Prompts

MCP server 可以暴露三类能力：

- Tools：可执行动作，例如搜索笔记、创建 issue、查询数据库。工具通常有输入 schema 和执行结果。
- Resources：可读取上下文，例如某个文件、数据库记录、文档页面。资源更像“可被引用的数据”。
- Prompts：可复用提示模板，例如代码审查模板、学习复盘模板。

不要把所有能力都做成 tool。如果只是读取稳定资料，resource 更合适。如果是重复 prompt 模板，prompt 更合适。如果需要执行逻辑或调用 API，才是 tool。

### MCP 和 REST API 的区别

REST API 是给程序员写代码调用的接口；MCP tool 是给模型发现和选择的接口。因此 MCP 工具设计更强调：

- 名字是否容易被模型选中。
- description 是否说明何时使用。
- 参数是否少而明确。
- 错误信息是否告诉 agent 下一步怎么办。
- 是否标注只读、破坏性、幂等和 open-world。

同一个后端能力可以同时有 REST API 和 MCP tool。REST API 服务产品，MCP tool 服务 agent。

### Transport：stdio 和 HTTP

stdio 适合本地 MCP server，简单、低延迟、便于开发工具启动子进程。风险是本地权限强，必须谨慎暴露文件系统、shell 和密钥。

Streamable HTTP 适合远程 server，更容易部署、鉴权、限流和观测。风险是服务化成本更高，需要处理网络、认证和多租户。

学习阶段可以先用 stdio 理解协议，再思考生产环境是否需要 HTTP。

## 主项目增量

本周不急着实现 server，先设计 AI 学习助手的 MCP 边界：

- `search_learning_notes` 作为 read-only tool。
- `create_weekly_plan` 作为 write tool，需要人工确认。
- `run_quiz` 作为 read-only workflow tool。
- 学习资料 Markdown 可以作为 resources 暴露。

## 动手任务

1. 画出 Claude Code/Codex 连接 MCP server 的数据流。
2. 为 `search_learning_notes` 设计 MCP tool schema。
3. 明确哪些能力是 MCP tools，哪些保留在学习助手内部 API。
4. 写出三种失败：找不到资料、参数无效、工具超时。

## 验收标准

- 能区分 MCP server 和普通 REST API。
- 能解释 Host、Client、Server 的职责。
- 能解释为什么工具名和描述会影响模型使用效果。
- 能说明本地 stdio server 的安全风险。

## 常见误区

- 误区：有了 MCP 就不需要 API。  
  更好的理解：MCP 是 agent 接入层，业务 API 仍然可以存在。

- 误区：把所有函数都暴露给 MCP。  
  更好的做法：只暴露 agent 真的需要、权限清晰、错误可恢复的能力。

## 复盘问题

- MCP 适合暴露什么，不适合暴露什么？
- 哪些能力应该做成 MCP tool，哪些应该留在应用内部？
- 如果 MCP 工具执行失败，错误信息应该怎样帮助 agent 恢复？

