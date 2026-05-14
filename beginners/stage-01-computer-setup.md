---
title: Stage 1：开发环境与命令行
description: 从零配置 AI 应用开发需要的最小本地环境
---

# Stage 1：开发环境与命令行

本阶段解决的问题是：你能否在自己的电脑上进入项目目录、安装依赖、运行命令、看到输出、读懂最基础的错误。

编程入门最容易卡住的不是语言，而是环境。很多小白第一次失败不是因为代码难，而是因为不知道当前在哪个目录、不知道命令装到了哪里、不知道错误应该从哪一行看起。

## 你需要安装什么

| 工具 | 作用 | 你需要知道的最小概念 |
| --- | --- | --- |
| VS Code 或其他编辑器 | 编辑代码和文档 | 文件、目录、搜索、终端面板 |
| Terminal | 输入命令 | 当前目录、命令、参数、输出、错误 |
| Node.js | 运行 JavaScript/TypeScript 生态 | 让本地电脑能跑 JS 工具 |
| pnpm | 安装依赖、运行脚本 | 项目的包管理器 |
| Git | 版本管理 | 记录改动、提交、推送 |

本仓库约定使用 `pnpm`。后续看到命令时，优先使用 `pnpm install`、`pnpm test`、`pnpm build`。

## 目录是什么

目录就是文件夹。一个项目通常长这样：

```text
ai-learning/
├── README.md
├── package.json
├── roadmap/
├── labs/
├── projects/
└── site/
```

你要养成一个习惯：运行命令前先确认自己在哪个目录。

```bash
pwd
```

如果输出是：

```text
/Users/callan/ai-learning
```

说明你在这个项目根目录。大多数命令都应该在这里运行。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `pwd` | 显示当前目录 |
| `ls` | 查看当前目录下有什么 |
| `cd ai-learning` | 进入 `ai-learning` 目录 |
| `cd ..` | 回到上一级目录 |
| `pnpm install` | 安装项目依赖 |
| `pnpm test` | 运行项目验证 |
| `pnpm build` | 构建文档站点 |

命令由三部分组成：

```text
程序 参数 参数
```

例如：

```bash
pnpm --dir site build
```

意思是：调用 `pnpm`，指定目录为 `site`，运行 `build`。

## 什么是依赖

依赖就是项目需要使用的外部代码。比如 Docusaurus、TypeScript、tsx 都是依赖。它们记录在 `package.json`，具体版本锁在 `pnpm-lock.yaml`。

你不需要一开始理解 lockfile 的所有细节，只要知道：

- `package.json` 说明项目要用什么工具。
- `pnpm-lock.yaml` 记录实际安装的版本。
- `node_modules/` 是安装后的依赖目录，不需要手动编辑。

## 第一次运行项目

在项目根目录运行：

```bash
pnpm install
pnpm test
pnpm build
```

如果成功，你会看到类似：

```text
6/6 evals passed.
Generated static files in "build".
```

这说明代码检查、eval 和文档构建都能跑。

## 如何读错误

错误信息通常很长。新手先看三件事：

1. 哪个命令失败了。
2. 哪个文件或哪一行报错。
3. 错误里有没有明确的单词，例如 `Cannot find module`、`SyntaxError`、`Permission denied`。

不要只说“报错了”。更好的记录方式：

```text
我在 /Users/callan/ai-learning 运行 pnpm test。
失败命令是 tsc。
错误文件是 labs/week-01-hello-llm/src/index.ts。
错误信息包含 Cannot find name。
```

这就是工程沟通的开始。

## 动手任务

### Step 1

打开终端，进入项目目录。

### Step 2

运行：

```bash
pwd
ls
```

写下你看到的当前目录和三个文件名。

### Step 3

运行：

```bash
pnpm install
pnpm test
```

### Step 4

故意运行一个不存在的命令：

```bash
pnpm not-a-command
```

观察错误信息，并写下第一行和最后一行。

## 验收标准

- 能解释“当前目录”是什么。
- 能进入项目根目录并运行 `pnpm test`。
- 能说出 `package.json`、`pnpm-lock.yaml`、`node_modules/` 分别大致做什么。
- 遇到错误时能记录命令、目录、文件和错误关键字。
