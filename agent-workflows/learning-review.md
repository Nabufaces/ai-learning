---
description: 面向读者的学习内容审查说明，解释 learning-review skill 如何用于维护教程质量
icon: list-check
---

# Learning Review Skill

`learning-review` 是本仓库的项目级 skill，用于审查学习章节、lab、harness 文档、eval case 和 agent workflow 是否清晰、可执行、可验证。

{% hint style="info" %}
GitBook 目录中展示的是这份人类可读说明；原始 skill 文件保留在 `agent-workflows/skills/learning-review/SKILL.md`，供 Codex 或 Claude Code 加载。
{% endhint %}

## 使用场景

- 新增或改写一个 roadmap 周章节。
- 新增一个 lab。
- 新增 harness、eval 或 agent workflow 文档。
- 检查教程是否只堆概念、缺少动手任务。

## 审查重点

{% stepper %}
{% step %}
## 明确读者

说明这个页面是给初学者、工程实践者，还是 agent 维护者阅读。
{% endstep %}

{% step %}
## 检查目标

页面必须有具体目标，不能只有资料链接或泛泛介绍。
{% endstep %}

{% step %}
## 检查实践

至少包含一个可运行命令、可检查任务、设计草案或 eval case。
{% endstep %}

{% step %}
## 检查验收

验收标准必须可观察，不能写成“理解某概念”这种不可验证表达。
{% endstep %}

{% step %}
## 检查失败模式

涉及 agent、tool、RAG 或 harness 的内容必须说明失败场景。
{% endstep %}
{% endstepper %}

## 原始 Skill

原始文件路径：

```text
agent-workflows/skills/learning-review/SKILL.md
```

