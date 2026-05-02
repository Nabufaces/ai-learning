---
title: GitHub Pages 发布说明
description: 使用 Docusaurus 和 GitHub Actions 发布 AI Learning 教程网站
---

# GitHub Pages 发布说明

本仓库使用 Docusaurus 构建教程网站，并通过 GitHub Actions 部署到 GitHub Pages。仓库公开后，站点地址会是：

```text
https://nabufaces.github.io/ai-learning/
```

:::info
GitHub Pages 项目站点部署在仓库路径下，所以 Docusaurus 配置里的 `baseUrl` 必须是 `/ai-learning/`。
:::

## 仓库结构

- `site/docusaurus.config.ts`：站点配置、GitHub Pages 路径、导航、footer 和 docs 插件。
- `site/sidebars.ts`：左侧文档目录，取代 GitBook 的 `SUMMARY.md`。
- `site/src/pages/index.tsx`：站点首页。
- `site/src/css/custom.css`：Docusaurus 主题样式。
- `.github/workflows/deploy.yml`：GitHub Pages 自动部署 workflow。
- `roadmap/`、`labs/`、`harness/`、`evals/`、`agent-workflows/`：教程正文和工程专题。

## 发布流程

### Step 1

确认仓库是 public。GitHub Free 下，public repository 可以直接使用 GitHub Pages。

### Step 2

在本地安装依赖并验证：

```bash
pnpm install
pnpm test
pnpm build
```

### Step 3

推送到 `main` 分支：

```bash
git push origin main
```

### Step 4

GitHub Actions 会运行 `.github/workflows/deploy.yml`：

1. 安装 pnpm 和 Node.js。
2. 执行 `pnpm test`。
3. 执行 `pnpm build`。
4. 上传 `site/build/` artifact。
5. 使用 GitHub Pages 发布。

### Step 5

在 GitHub 仓库的 **Settings → Pages** 中确认 source 是 **GitHub Actions**。部署成功后访问：

```text
https://nabufaces.github.io/ai-learning/
```

## 维护约定

:::warning
新增或重命名教程页面时，必须同步更新 `site/sidebars.ts`，否则页面可能存在但不会出现在左侧目录中。
:::

- 每周文档优先写概念解释、工程取舍和实践任务，不只放链接。
- 外部链接只作为延伸阅读，不能替代核心概念说明。
- 代码示例放在 `labs/` 或 `projects/`，文档中链接到对应路径。
- 重要提醒使用 Docusaurus admonition，例如 `:::info`、`:::warning`。
