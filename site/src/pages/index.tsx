import clsx from "clsx";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

const learningTracks = [
  {
    title: "零基础入门",
    description: "从开发环境、命令行、TypeScript、API、Git 和 AI 基础开始，补齐进入主线前的最低工程能力。",
    href: "/docs/beginners"
  },
  {
    title: "12 周应用主线",
    description: "从 LLM API、Vercel AI SDK、结构化输出到 RAG、MCP、LangChain.js、LangGraph 和 Agent loop，逐周把 AI 学习助手做出来。",
    href: "/docs/roadmap"
  },
  {
    title: "工程控制",
    description: "把权限、预算、trace、checkpoint、replay、eval 和 observability 做成 agent harness 的工程边界。",
    href: "/docs/harness"
  },
  {
    title: "编码工作流",
    description: "沉淀 Codex、Claude Code、AGENTS.md、skills 和 Superpowers 的协作约定，让 AI 编码过程可复用。",
    href: "/docs/agent-workflows"
  }
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="AI 应用开发学习路线"
      description="包含零基础入门和 12 周 TypeScript 优先 AI 应用开发路线的学习教程">
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>TypeScript-first AI application engineering</p>
            <Heading as="h1" className={styles.title}>
              AI Learning
            </Heading>
            <p className={styles.subtitle}>
              从零基础预备课到 12 周 AI 应用开发主线，逐步掌握 LLM API、RAG、MCP、Agent、Harness Engineering、Eval 和 AI 编码工作流。
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/beginners">
                从零基础开始
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/roadmap/week-01">
                直接进入 Week 1
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.trackSection}>
          <div className="container">
            <div className={styles.grid}>
              {learningTracks.map((track) => (
                <Link className={clsx("card", styles.trackCard)} to={track.href} key={track.title}>
                  <div className="card__body">
                    <Heading as="h2">{track.title}</Heading>
                    <p>{track.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
