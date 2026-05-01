---
description: 12 周 TypeScript 优先的 AI 应用开发与 Agent 工程学习教程
icon: graduation-cap
layout:
  width: wide
  title:
    visible: true
  description:
    visible: true
---

# AI Learning

<code class="expression">space.vars.course_name</code> 是一套 <code class="expression">space.vars.course_duration</code> 的 AI 应用开发学习教程，目标是从零到一构建一个 <code class="expression">space.vars.primary_stack</code> 的 AI 学习助手，并系统掌握 LLM API、RAG、MCP、Agent、Harness Engineering、Eval 和 coding agent 工作流。

{% hint style="info" %}
这不是资料链接合集。每一周都包含概念讲解、工程取舍、主项目增量、动手任务、验收标准和复盘问题。
{% endhint %}

## 从这里开始

<table data-view="cards">
    <thead>
        <tr>
            <th>入口</th>
            <th>说明</th>
            <th data-card-target data-type="content-ref">打开</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>12 周路线</td>
            <td>按周学习 AI 应用开发主线</td>
            <td><a href="roadmap/README.md">路线总览</a></td>
        </tr>
        <tr>
            <td>主项目贯穿线</td>
            <td>查看 AI 学习助手如何每周增量构建</td>
            <td><a href="roadmap/project-throughline.md">项目路线</a></td>
        </tr>
        <tr>
            <td>技术栈说明</td>
            <td>了解 Vercel AI SDK、Zod、RAG、PromptFoo、Langfuse 等工具定位</td>
            <td><a href="roadmap/tech-stack.md">技术栈</a></td>
        </tr>
        <tr>
            <td>GitBook 发布</td>
            <td>把 GitHub 仓库同步为 GitBook 文档站点</td>
            <td><a href="roadmap/gitbook-publishing.md">发布说明</a></td>
        </tr>
    </tbody>
</table>

<a href="roadmap/week-01.md" class="button primary" data-icon="rocket">开始 Week 1</a>
<a href="https://github.com/Nabufaces/ai-learning" class="button secondary" data-icon="github">查看 GitHub 仓库</a>

## 你会学到什么

{% columns %}
{% column %}
### AI 应用开发

- LLM API 和结构化输出
- TypeScript AI 应用骨架
- RAG、向量数据库和混合检索
- MCP tools/resources/prompts
- Agent loop 和安全边界

{% endcolumn %}

{% column %}
### 工程化能力

- Harness runtime、permission、budget、trace
- Langfuse/LangSmith/OpenTelemetry observability
- PromptFoo、RAGAS 和 eval harness
- Codex、Claude Code、AGENTS.md 和 skills
- GitBook 化学习文档维护

{% endcolumn %}
{% endcolumns %}

## 本地运行

```bash
pnpm install
pnpm typecheck
pnpm lab:hello
pnpm lab:structured
pnpm lab:rag
pnpm lab:agent
pnpm harness:demo
pnpm eval
pnpm assistant:dev
```

The assistant server defaults to `http://localhost:4317`.

## 学习约定

- 每周至少产出一个可验证成果：笔记、lab、eval case、tool、API route 或项目增量。
- 不只收集链接；核心概念要能用自己的话解释。
- 每个 agent、tool、RAG 或 harness 行为都要有失败场景。
- 完成不等于“模型说可以”，完成必须有验证命令或评测结果。

