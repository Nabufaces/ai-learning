---
description: "AI Learning 教程页面：Week 4: RAG、向量数据库和混合检索"
icon: calendar-days
---

# Week 4: RAG、向量数据库和混合检索

## 本周目标

本周让 AI 学习助手真正能“基于资料回答”。RAG 的目标不是把所有文档塞给模型，而是在回答前找到最相关、可信、可引用的上下文。你需要理解 chunking、embedding、向量数据库、关键词检索、混合检索和引用来源之间的关系。

:::info
本周阅读方式：先读概念，再完成动手任务；主项目增量和验收标准必须一起看。
:::

## 学习地图

| 模块 | 要解决的问题 | 主项目增量 |
| --- | --- | --- |
| 文档切分 | 大文档如何变成可检索片段 | Markdown chunking baseline |
| 检索方式 | 关键词、向量、混合检索如何取舍 | `pnpm lab:rag` |
| 向量数据库 | embedding 存哪里，如何查询 | Chroma/pgvector/Pinecone 选型 |
| 引用来源 | 回答如何可追溯 | answer sources contract |

## 核心概念详解

### RAG 的基本流程

RAG 是 Retrieval-Augmented Generation。典型流程如下：

1. 加载文档：Markdown、PDF、网页、数据库记录。
2. 切分文档：把长文档拆成 chunk。
3. 建索引：关键词索引或向量索引。
4. 查询召回：根据用户问题找相关 chunk。
5. 组装上下文：把最相关 chunk 放进 prompt。
6. 生成回答：要求模型只依据上下文回答并引用来源。
7. 验证：检查来源、事实和拒答行为。

RAG 的失败可能发生在每一步。资料不存在、chunk 切坏、embedding 召回错、上下文过长、模型合成时幻觉，都会导致最终答案不可信。

### Chunking 策略

- Fixed-size chunking：按固定长度切分。实现简单，适合 baseline，但可能切断标题和正文的关系。
- Recursive chunking：优先按标题、段落、句子切分，再控制长度。适合 Markdown 和技术文档。
- Semantic chunking：按语义相似度切分。质量可能更好，但成本和复杂度更高。

本仓库当前的检索 baseline 会把标题和紧邻正文合并，避免只命中标题而丢失具体内容。这个小细节很重要：RAG 质量常常来自文档结构处理，而不是只换更强模型。

### 向量数据库选型

| 选项 | 适合场景 | 优点 | 风险 |
| --- | --- | --- | --- |
| Chroma | 本地学习和调试 | 上手快，适合小型知识库 | 生产运维和权限要额外设计 |
| pgvector | 已经使用 PostgreSQL 的项目 | 数据和业务系统靠近，生产路径清晰 | 需要理解索引、扩展和数据库调优 |
| Pinecone | 托管向量检索 | 运维少，扩展方便 | 成本、供应商绑定、数据出境要评估 |

学习阶段推荐：先用本地关键词 baseline 理解评测，再用 Chroma 做 embedding 实验，最后根据生产约束在 pgvector 和托管服务之间选择。

### 关键词检索、向量检索和混合检索

关键词检索适合专有名词、周次、文件名、API 名称，例如 `Week 10`、`MCP`、`AGENTS.md`。向量检索适合语义相似问题，例如“怎么让 agent 不乱调用工具”可能应该命中 permission、approval、harness。

混合检索通常更稳：先用关键词保证精确命中，再用向量召回语义相关内容，最后 rerank 排序。学习资料里有大量术语、文件名和编号，因此不应过早放弃关键词检索。

### 引用来源和拒答

RAG 回答必须带来源，否则用户无法判断依据。来源至少包括文件路径和摘要片段。资料不足时，应明确拒答，而不是用模型常识补全。

好的回答 contract：

- 先说明依据来自哪些资料。
- 回答只覆盖资料支持的内容。
- 不确定时说不确定。
- 给出下一步应该补充哪些资料。

## 主项目增量

本周主项目要把 Week 2 的 `/api/search` 和 `/api/chat` 变成真正的 RAG baseline：

- 从本仓库 Markdown 加载知识。
- 切分文档并保留来源。
- 对用户 query 做检索。
- chat 回答包含来源。
- unknown topic 返回拒答。

## 动手任务

### Step 1

运行 `pnpm lab:rag`。

### Step 2

用 MCP 角色相关问题、`第 10 周 Harness`、未知主题三类 query 测试检索。

### Step 3

写一份向量数据库选型记录：本地 Chroma，生产 pgvector，托管 Pinecone。

### Step 4

设计 hybrid retrieval：关键词召回、向量召回、rerank、context packing。

### Step 5

新增一个 eval case，要求问题必须命中正确 roadmap 来源。

## 验收标准

- 能解释 chunk size 对召回和准确性的影响。
- 能说明 Chroma、pgvector、Pinecone 的取舍。
- 能解释为什么混合检索比纯向量检索更适合学习资料。
- 能给出“答案必须引用来源”的输出 contract。
- 能说明什么时候不应该回答。

## 常见误区

:::warning
- 误区：RAG 等于向量数据库。  
  更好的理解：向量库只是 RAG 的一个组件，文档结构、检索策略和 eval 同样重要。

- 误区：检索到内容就一定能回答。  
  更好的做法：检查上下文是否足够、是否相关、是否支持结论。
:::

## 复盘问题

- RAG 的失败是因为资料缺失、检索失败，还是模型合成失败？
- 本地学习资料要怎样组织，才能让 agent 更容易检索？
- 如果用户问的问题跨多个周次，context packing 应该怎么做？
