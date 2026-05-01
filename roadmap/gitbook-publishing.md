---
description: 将 AI Learning GitHub 仓库同步为 GitBook 文档站点的操作说明
icon: book-open
---

# GitBook 发布说明

本仓库已经按 GitBook Git Sync 方式准备好：

- `.gitbook.yaml` 指定 GitBook 从仓库根目录读取内容。
- `README.md` 是 GitBook 首页。
- `SUMMARY.md` 是左侧目录。
- `.gitbook/vars.yaml` 存放课程级变量。
- 代码、labs、harness 和 eval 文件仍保留在仓库中，但主要阅读入口由 `SUMMARY.md` 控制。

{% hint style="info" %}
建议后续只通过 Git 提交维护文档结构，避免 GitBook UI 和 GitHub 同时修改同一文件造成同步冲突。
{% endhint %}

## GitHub 仓库发布步骤

{% stepper %}
{% step %}
## 推送仓库

把本地仓库推送到自己的 GitHub repository。当前仓库地址：

```text
https://github.com/Nabufaces/ai-learning
```
{% endstep %}

{% step %}
## 创建 GitBook Space

在 GitBook 中创建一个新的 space，并选择 Git Sync。
{% endstep %}

{% step %}
## 连接 GitHub 仓库

选择 `Nabufaces/ai-learning`，Project directory 保持仓库根目录。
{% endstep %}

{% step %}
## 检查配置文件

确认 GitBook 读取：

```yaml
root: ./
structure:
  readme: README.md
  summary: SUMMARY.md
```
{% endstep %}

{% step %}
## 预览并发布

先检查左侧目录、内部链接、代码块和 GitBook custom blocks，再发布到正式站点。
{% endstep %}
{% endstepper %}

## 维护约定

{% hint style="warning" %}
每新增一个学习章节或专题文档，必须同步更新 `SUMMARY.md`。GitBook skill 明确要求目录与实际文件结构保持一致。
{% endhint %}

- 每周文档优先写概念解释、工程取舍和实践任务，不只放链接。
- 外部链接只作为延伸阅读，不能替代核心概念说明。
- 代码示例放在 `labs/` 或 `projects/`，文档中链接到对应路径。
- 重要提醒使用 GitBook hint block，顺序流程使用 GitBook stepper block。
