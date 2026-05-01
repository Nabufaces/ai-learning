# GitBook 发布说明

本仓库已经按 GitBook Git Sync 方式准备好：

- `.gitbook.yaml` 指定 GitBook 从仓库根目录读取内容。
- `README.md` 是 GitBook 首页。
- `SUMMARY.md` 是左侧目录。
- 代码、labs、harness 和 eval 文件仍保留在仓库中，但只有被 `SUMMARY.md` 引用的 Markdown 页面会作为主要阅读入口。

## GitHub 仓库发布步骤

1. 把本地仓库推送到自己的 GitHub repository。
2. 在 GitBook 中创建 space，并启用 Git Sync。
3. 选择该 GitHub repository。
4. Project directory 保持仓库根目录，除非未来把文档迁移到 `docs/`。
5. 后续只在 GitHub 中改 `README.md`、`SUMMARY.md` 和 Markdown 文档，避免 GitBook UI 与 Git 仓库同时改同一文件。

## 维护约定

- 每新增一个学习章节或专题文档，必须加入 `SUMMARY.md`。
- 每周文档优先写概念解释、工程取舍和实践任务，不只放链接。
- 外部链接只作为延伸阅读，不能替代核心概念说明。
- 代码示例放在 `labs/` 或 `projects/`，文档中链接到对应路径。

