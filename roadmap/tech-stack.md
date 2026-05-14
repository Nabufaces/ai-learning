---
description: "AI Learning 教程页面：TypeScript AI 技术栈说明"
icon: brackets-curly
---

# TypeScript AI 技术栈说明

本路线 TypeScript 优先，但避免过早引入复杂框架。工具采用“先 baseline，再替换”的策略。

## 核心工具

| 工具 | 路线位置 | 用法 |
| --- | --- | --- |
| Vercel AI SDK | Week 2 起 | TS AI 应用主 SDK，学习 streaming、tool calling、多模型抽象和结构化输出。 |
| Zod | Week 3 起 | 请求、工具参数、模型输出和 eval case 的 runtime validation。 |
| LangChain.js | Week 4/7 选学 | RAG、agent、tool integration、middleware 和 structured output 的参考框架；先理解能力边界，再决定是否引入。 |
| LangGraph | Week 7/10/11 选学 | Stateful agent orchestration，学习 graph state、nodes、edges、checkpoint、human-in-the-loop、time travel 和 durable execution。 |
| MCP TypeScript SDK | Week 5/6 | 实现学习助手的 MCP server 和工具接口。 |
| PromptFoo | Week 11 | TS 友好的 prompt/eval 回归测试和 CI 集成候选。 |
| RAGAS | Week 11 | 理解 RAG 指标：faithfulness、answer relevancy、context recall。 |
| Langfuse 或 LangSmith | Week 10 | LLM/agent observability，追踪 token、latency、tool call、retrieval 和 eval score。 |

## RAG 存储选型

| 选项 | 适合阶段 | 取舍 |
| --- | --- | --- |
| Chroma | 本地调试 | 启动快，适合 Week 4 学 chunking 和 retrieval。 |
| pgvector | 生产过渡 | 和 PostgreSQL 数据放在一起，适合已有业务库。 |
| Pinecone | 云端托管 | 运维少，适合团队项目和大规模向量检索。 |

## Chunking 策略

- Fixed-size：最简单，适合 baseline，但容易切断语义。
- Recursive：按标题、段落、句子逐层切，适合 Markdown/文档。
- Semantic：按语义边界切，质量更好，但成本和复杂度更高。

## 检索策略

- BM25/关键词检索：对专有名词、周次、文件名稳定。
- 向量检索：对语义相似问题更好。
- 混合检索：推荐作为学习助手默认方向，先关键词 baseline，再加向量召回和 rerank。

## LangChain.js / LangGraph 选型

| 工具 | 适合解决 | 不应该替代 |
| --- | --- | --- |
| LangChain.js | 快速组合模型、tools、retrievers、middleware 和常见 agent 架构。 | 不替代对 tool permission、budget、trace 和 eval contract 的理解。 |
| LangGraph | 构建长时间运行、有状态、可暂停、可恢复的 graph workflow。 | 不替代业务权限、数据边界、审计和发布策略。 |
| 自建 harness | 学清楚运行控制、权限、预算、trace、checkpoint、replay、eval。 | 不需要永远手写所有 integrations。 |

学习建议：先用本仓库 baseline 解释清楚“为什么需要这个抽象”，再用 LangChain.js / LangGraph 验证成熟框架如何实现类似能力。详见 [LangChain.js 与 LangGraph 学习定位](langchain-langgraph.md)。

## 参考链接

- Vercel AI SDK: https://vercel.com/docs/ai-sdk
- Zod: https://zod.dev/
- LangChain.js agents: https://docs.langchain.com/oss/javascript/langchain/agents
- LangChain.js retrieval: https://docs.langchain.com/oss/javascript/langchain/retrieval
- LangGraph overview: https://docs.langchain.com/oss/javascript/langgraph/overview
- Thinking in LangGraph: https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph
- Chroma: https://docs.trychroma.com/
- pgvector: https://github.com/pgvector/pgvector
- PromptFoo: https://www.promptfoo.dev/docs/getting-started/
- RAGAS metrics: https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/
- Langfuse: https://langfuse.com/docs
