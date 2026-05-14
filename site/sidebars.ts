import type {SidebarsConfig} from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "category",
      label: "开始",
      collapsed: false,
      items: [
        "README",
        "roadmap/README",
        "roadmap/project-throughline",
        "roadmap/tech-stack",
        "roadmap/langchain-langgraph",
        "roadmap/github-pages-publishing"
      ]
    },
    {
      type: "category",
      label: "12 周学习章节",
      collapsed: false,
      items: [
        "roadmap/week-01",
        "roadmap/week-02",
        "roadmap/week-03",
        "roadmap/week-04",
        "roadmap/week-05",
        "roadmap/week-06",
        "roadmap/week-07",
        "roadmap/week-08",
        "roadmap/week-09",
        "roadmap/week-10",
        "roadmap/week-11",
        "roadmap/week-12"
      ]
    },
    {
      type: "category",
      label: "实战项目",
      collapsed: false,
      items: [
        "projects/ai-learning-assistant/README",
        "labs/README",
        "labs/week-01-hello-llm/README",
        "labs/week-01-structured-output/README",
        "labs/week-04-rag-search/README",
        "labs/week-07-agent-loop/README"
      ]
    },
    {
      type: "category",
      label: "工程化专题",
      collapsed: false,
      items: [
        "harness/README",
        "harness/observability",
        "harness/security",
        "evals/README",
        "evals/ragas-mapping"
      ]
    },
    {
      type: "category",
      label: "Agent 工作流",
      collapsed: false,
      items: [
        "agent-workflows/README",
        "agent-workflows/codex",
        "agent-workflows/claude-code",
        "agent-workflows/superpowers",
        "agent-workflows/learning-review"
      ]
    }
  ]
};

export default sidebars;
