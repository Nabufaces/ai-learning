import type {Config} from "@docusaurus/types";
import type {Preset} from "@docusaurus/preset-classic";
import {themes as prismThemes} from "prism-react-renderer";

const config: Config = {
  title: "AI Learning",
  tagline: "12 周 TypeScript 优先的 AI 应用开发学习教程",
  favicon: "img/favicon.svg",

  url: "https://nabufaces.github.io",
  baseUrl: "/ai-learning/",
  organizationName: "Nabufaces",
  projectName: "ai-learning",
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn"
    }
  },

  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN"]
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "..",
          routeBasePath: "docs",
          sidebarPath: "./sidebars.ts",
          include: [
            "README.md",
            "roadmap/**/*.md",
            "labs/**/README.md",
            "projects/**/README.md",
            "harness/**/*.md",
            "evals/**/*.md",
            "agent-workflows/**/*.md"
          ],
          exclude: [
            "AGENTS.md",
            "CLAUDE.md",
            "agent-workflows/skills/**",
            "site/**",
            "node_modules/**",
            "build/**",
            ".docusaurus/**",
            ".git/**"
          ],
          editUrl: ({docPath}) => `https://github.com/Nabufaces/ai-learning/edit/main/${docPath}`
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css"
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    image: "img/social-card.svg",
    navbar: {
      title: "AI Learning",
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "教程"
        },
        {
          href: "https://github.com/Nabufaces/ai-learning",
          label: "GitHub",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "学习路线",
          items: [
            {
              label: "12 周路线总览",
              to: "/docs/roadmap"
            },
            {
              label: "主项目贯穿线",
              to: "/docs/roadmap/project-throughline"
            },
            {
              label: "技术栈说明",
              to: "/docs/roadmap/tech-stack"
            }
          ]
        },
        {
          title: "工程专题",
          items: [
            {
              label: "Harness Engineering",
              to: "/docs/harness"
            },
            {
              label: "Evals",
              to: "/docs/evals"
            },
            {
              label: "Agent 工作流",
              to: "/docs/agent-workflows"
            }
          ]
        },
        {
          title: "源码",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/Nabufaces/ai-learning"
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AI Learning. Built with Docusaurus.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "typescript"]
    }
  } satisfies Preset.ThemeConfig
};

export default config;
