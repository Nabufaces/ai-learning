---
title: Stage 4：Git 与 GitHub
description: 学会最小版本管理流程，能提交和推送自己的学习改动
---

# Stage 4：Git 与 GitHub

Git 是版本管理工具，GitHub 是托管 Git 仓库的网站。你不需要一开始理解 Git 的所有内部机制，但必须掌握最小工作流：查看改动、暂存改动、提交改动、推送远程。

## 为什么 AI 学习也需要 Git

AI 应用开发会频繁改 prompt、schema、eval、工具和文档。如果没有 Git，你很难回答：

- 我刚刚改了什么？
- 哪次改动让测试坏了？
- 能不能回到之前能跑的版本？
- 线上部署的是哪个版本？

Git 不是只给团队用的。个人学习项目也应该从第一天开始用。

## 仓库、提交和分支

| 概念 | 解释 |
| --- | --- |
| Repository | 一个被 Git 管理的项目 |
| Commit | 一次明确的版本记录 |
| Branch | 一条开发线 |
| Remote | 远程仓库地址，通常在 GitHub |
| main | 默认主分支 |

本仓库目前直接在 `main` 上维护教程内容。后续多人协作时，可以使用 feature branch 和 pull request。

## 最小工作流

查看状态：

```bash
git status
```

查看具体改动：

```bash
git diff
```

暂存文件：

```bash
git add README.md
```

提交：

```bash
git commit -m "docs: Update learning notes"
```

推送：

```bash
git push origin main
```

## 如何写提交信息

推荐格式：

```text
docs: Add beginner learning notes
```

常见类型：

| 类型 | 用途 |
| --- | --- |
| `docs` | 文档 |
| `feat` | 新功能 |
| `fix` | 修 bug |
| `test` | 测试 |
| `ci` | 自动化流程 |
| `chore` | 维护 |

提交信息要说明“这次改了什么”，不要写成：

```text
update
fix
change
```

## GitHub Pages 和自动部署

本仓库的教程网站通过 GitHub Pages 发布。流程是：

```text
push 到 main
  → GitHub Actions 运行测试和构建
  → 生成 site/build
  → 部署到 GitHub Pages
```

这意味着文档修改不是手动复制到网站，而是通过 Git 提交触发自动部署。

## 常见新手错误

### 不知道自己改了哪些文件

先运行：

```bash
git status
git diff
```

### 忘记 add

如果 commit 时提示没有内容，说明你可能还没暂存：

```bash
git add <file>
```

### push 失败

可能原因：

- 没有登录 GitHub。
- 没有仓库权限。
- 远程分支比本地新。
- 网络或 SSH 配置问题。

记录完整错误，不要只写“push 不上去”。

## 动手任务

### Step 1

修改一个 Markdown 文件，写一段学习笔记。

### Step 2

运行：

```bash
git status
git diff
```

观察 Git 看到的改动。

### Step 3

暂存并提交：

```bash
git add <file>
git commit -m "docs: Add beginner note"
```

### Step 4

如果你有远程仓库权限，推送：

```bash
git push origin main
```

## 验收标准

- 能解释 Git 和 GitHub 的区别。
- 能用 `git status` 判断工作区是否干净。
- 能完成一次 add、commit、push。
- 能写出有意义的 commit message。
- 能理解 GitHub Pages 自动部署和 `main` 分支的关系。
