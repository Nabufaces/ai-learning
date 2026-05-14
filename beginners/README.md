---
title: 零基础入门路线
description: 面向没有编程基础的学习者，先补齐 AI 应用开发前置能力
---

# 零基础入门路线

这条路线面向完全没有编程经验、没有命令行经验、没有 Git/GitHub 经验的学习者。目标不是把你训练成传统软件工程师，而是让你具备进入 12 周 AI 应用开发路线的最低工程能力。

如果你已经能独立写简单 TypeScript、会使用终端、理解 HTTP/API/JSON、能用 Git 提交代码，可以直接进入 [12 周 AI 应用开发路线](../roadmap/README.md)。

## 学习目标

完成这条路线后，你应该能做到：

- 看懂一个项目目录里哪些是代码、文档、配置、依赖和脚本。
- 在终端里进入目录、安装依赖、运行命令、读懂常见错误。
- 写出最基本的 TypeScript：变量、函数、条件、数组、对象、模块。
- 理解 Web/API/HTTP/JSON 的基本关系。
- 用 Git 做最小版本管理：clone、status、add、commit、push。
- 理解 LLM API、prompt、token、上下文、结构化输出的基础概念。
- 能完成几个小练习，再衔接到 Week 1 的 `pnpm lab:hello` 和 `pnpm lab:structured`。

## 路线结构

| 阶段 | 主题 | 你要能完成什么 |
| --- | --- | --- |
| Stage 1 | [开发环境与命令行](stage-01-computer-setup.md) | 装好工具，能在项目目录运行 `pnpm` 命令 |
| Stage 2 | [编程基础](stage-02-programming-basics.md) | 能写基本 TypeScript 函数和对象 |
| Stage 3 | [Web、API 和 JSON](stage-03-web-api-basics.md) | 能解释一次 HTTP 请求和 JSON 数据结构 |
| Stage 4 | [Git 与 GitHub](stage-04-git-github.md) | 能提交一次文档或代码改动 |
| Stage 5 | [AI 与 LLM 基础](stage-05-ai-basics.md) | 能解释 prompt、token、上下文和 API 调用 |
| Stage 6 | [迷你项目练习](stage-06-mini-projects.md) | 完成 4 个小练习，形成最小工程直觉 |
| Bridge | [进入 12 周路线前的检查](bridge-to-12-week-roadmap.md) | 判断自己是否可以开始 Week 1 |

## 建议节奏

零基础路线不按“12 周”硬切。建议按可用时间选择：

| 节奏 | 适合人群 | 完成时间 |
| --- | --- | --- |
| 集中学习 | 每天 2 小时以上 | 2 到 3 周 |
| 业余学习 | 每周 4 到 6 小时 | 4 到 6 周 |
| 慢速学习 | 每周 2 到 3 小时 | 6 到 8 周 |

不要用“看完了”作为完成标准。每个阶段都要至少完成一个能运行、能提交、能解释的小产物。

## 和 12 周路线的关系

零基础路线是预备课，不是替代路线。

```text
零基础入门路线
  → 能使用电脑、终端、Git、TypeScript、API
  → 进入 Week 1：LLM API 基础 + 第一个对话 CLI
  → 进入 Week 2：TypeScript AI 应用骨架
  → 继续 12 周 AI 应用开发路线
```

如果你在 Week 1 遇到的问题是“模型 API 不会调用”，继续 Week 1；如果问题是“终端是什么、pnpm 是什么、TypeScript 语法怎么看”，先回到零基础路线补齐。

## 学习约定

- 不追求一次理解所有概念，先把最小命令跑通。
- 每次报错都先读第一行和最后一行，不要只说“它坏了”。
- 每学一个概念，都用一句自己的话解释。
- 每完成一个练习，都用 Git 提交一次。
- 不复制大段代码不看；至少要能指出输入、输出、失败点在哪里。

## 最小完成标准

进入 12 周路线前，你应该能回答：

- `pnpm install` 和 `pnpm test` 分别在做什么？
- 一个 `.ts` 文件如何被运行？
- JSON 和普通文本有什么区别？
- API 请求里 method、URL、headers、body 分别是什么？
- Git 的 `add`、`commit`、`push` 分别负责什么？
- 为什么 AI 应用不能只靠“模型回答看起来对”来判断成功？
