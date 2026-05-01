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
| LangChain.js | Week 4/7 选学 | RAG、agent、tool integration 的参考框架；先理解能力边界，再决定是否引入。 |
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

## 参考链接

- Vercel AI SDK: https://vercel.com/docs/ai-sdk
- Zod: https://zod.dev/
- LangChain.js agents: https://docs.langchain.com/oss/javascript/langchain/agents
- Chroma: https://docs.trychroma.com/
- pgvector: https://github.com/pgvector/pgvector
- PromptFoo: https://www.promptfoo.dev/docs/getting-started/
- RAGAS metrics: https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/
- Langfuse: https://langfuse.com/docs

