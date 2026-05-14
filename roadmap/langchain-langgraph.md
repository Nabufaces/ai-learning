---
title: LangChain.js 与 LangGraph 学习定位
description: 说明 LangChain.js、LangGraph、Vercel AI SDK 和自建 harness 在 AI Learning 路线中的分工
---

# LangChain.js 与 LangGraph 学习定位

LangChain.js 和 LangGraph 应该加入本路线，但不应该替代从 baseline 开始理解 AI 应用工程的过程。推荐顺序是：先手写最小 RAG、tool calling、agent loop 和 harness，再用 LangChain.js / LangGraph 对照成熟框架如何抽象这些能力。

## 为什么不是一开始就用框架

框架能提高速度，但也会隐藏关键问题：

- RAG 失败到底是 chunking、retrieval、rerank、context packing 还是回答合成的问题。
- Agent loop 为什么需要停止条件、预算、权限和人工确认。
- Checkpoint、trace、replay 和 eval 为什么必须作为工程数据结构存在。
- 工具 schema、运行状态和 prompt 上下文之间的边界在哪里。

所以本路线保留自建 baseline：先让学习者看见底层 contract，再学习框架如何包装这些 contract。

## LangChain.js 适合学什么

LangChain.js 适合放在 Week 4 和 Week 7：

- Week 4：学习 document loader、text splitter、vector store、retriever、RAG pipeline 的组合方式。
- Week 7：学习 `createAgent`、tools、middleware、structured output、model abstraction。
- Week 10：如果采用 LangSmith，学习 LangChain/LangGraph trace 与 observability 的连接方式。

LangChain v1 的 JavaScript/TypeScript 重点已经收敛到 agent building blocks。核心关注点不是“链式调用”这个名字，而是：

- 用统一接口初始化模型。
- 用 tool schema 暴露外部能力。
- 用 middleware 做动态 prompt、上下文裁剪、tool call 包装、guardrails、人类审批。
- 用 structured output 把模型回答变成可验证对象。

需要注意：部分传统 chain、retriever、indexing API 在 v1 中被移到 `@langchain/classic`。学习时要区分“现代 agent API”和“历史 chain API”，不要照搬旧教程。

## LangGraph 适合学什么

LangGraph 适合放在 Week 7、Week 10 和 Week 11：

- Week 7：把单 agent loop 拆成状态、节点、边和停止条件。
- Week 10：把 harness runtime 映射到 graph runtime、state schema、node execution、interrupt 和 trace。
- Week 11：学习 checkpoint、replay、time travel、failure recovery 和 human-in-the-loop。

LangGraph 是更底层的 orchestration framework/runtime。它的核心不是“让 agent 更聪明”，而是让长时间运行、有状态、可恢复的人机协作流程更可控。

典型 LangGraph 思维：

- State：保存原始任务、检索结果、工具结果、审批状态、错误和最终输出。
- Node：每个节点只做一件事，例如 classify、retrieve、draft、review、act。
- Edge：根据状态决定下一步走向。
- Checkpoint：保存中间状态，失败后可以恢复。
- Interrupt：在敏感操作前暂停，等待人工输入。

## 和本路线主线的关系

| 能力 | 自建 baseline | Vercel AI SDK | LangChain.js | LangGraph |
| --- | --- | --- | --- | --- |
| Streaming chat | 理解 HTTP/流式基础 | 主力选择 | 可用但不是强项 | 通常通过上层 API 暴露 |
| Tool calling | 手写 schema 和执行边界 | TS 应用中很顺 | `createAgent` 和 middleware 成熟 | 作为 graph 节点或 agent 节点运行 |
| RAG | 先做关键词/混合 baseline | 可配合使用 | loaders、splitters、retrievers 生态完整 | 适合多步检索流程 |
| Agent loop | 最适合学习底层机制 | 适合简单工具调用 | 适合常见 agent 架构 | 适合复杂、有状态、可恢复流程 |
| Harness | 必须理解权限/预算/trace | 需要自己补控制层 | 可用 middleware 辅助 | 可承载 checkpoint、interrupt、replay |
| Eval | 自建 JSON runner 起步 | 可接 CI | 可接 LangSmith/PromptFoo | 可评估 graph path 和 state transitions |

## 推荐学习路径

### Week 4 对照任务

在完成本仓库 RAG baseline 后，写一份 LangChain.js RAG 对照笔记：

- 本仓库的 Markdown loader 对应 LangChain 的 document loader。
- 本仓库的 chunking 对应 text splitter。
- 本仓库的搜索函数对应 retriever。
- 本仓库的 answer sources contract 对应 retrieved context + citation policy。

不要急着替换实现，先画出概念映射。

### Week 7 对照任务

在完成 `pnpm lab:agent` 后，写一份 `createAgent` 对照笔记：

- 哪些逻辑可以交给 LangChain agent。
- 哪些逻辑必须留在 harness，例如 permission、budget、approval 和审计。
- middleware 如何对应 context 管理、tool error handling、人类审批和输出 guardrails。

### Week 10 对照任务

把 harness runtime 映射到 LangGraph：

- `RunState` 对应 graph state。
- `ToolRegistry` 对应 node 可调用的工具集合。
- `approval` 对应 interrupt / human-in-the-loop。
- `checkpoint` 对应 graph checkpointer。
- `trace` 对应 LangSmith / Langfuse / OpenTelemetry event。

### Week 11 对照任务

用 LangGraph 的 checkpoint/time travel 思路复盘一次失败：

- 从哪个 checkpoint 恢复最合理。
- 哪些节点可以重放，哪些外部工具结果必须 mock。
- replay 后如何比较新旧 trace。
- 哪些失败应该进入 eval regression。

## 选型建议

- 做 TypeScript Web AI 应用和流式聊天：优先 Vercel AI SDK。
- 做 RAG/agent 原型，需要大量现成 integrations：学习 LangChain.js。
- 做多步骤、有状态、可暂停、可恢复的 agent workflow：学习 LangGraph。
- 做生产权限、预算、审计、eval 和恢复控制：必须理解 harness engineering，不能只依赖框架。

## 参考资料

- LangChain.js agents: https://docs.langchain.com/oss/javascript/langchain/agents
- LangChain.js retrieval: https://docs.langchain.com/oss/javascript/langchain/retrieval
- LangChain v1 migration guide: https://docs.langchain.com/oss/javascript/migrate/langchain-v1
- LangGraph overview: https://docs.langchain.com/oss/javascript/langgraph/overview
- Thinking in LangGraph: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph
- LangGraph time travel: https://docs.langchain.com/oss/javascript/langgraph/use-time-travel
