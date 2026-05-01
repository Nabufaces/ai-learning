import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import type { AssistantAnswer, KnowledgeDocument, SearchResult } from "./types.js";

const DEFAULT_DIRECTORIES = ["roadmap", "harness", "evals", "agent-workflows"];
const DEFAULT_FILES = ["README.md", "AGENTS.md"];

export function loadKnowledgeBase(rootDirectory = process.cwd()): KnowledgeDocument[] {
  const files = new Set<string>();

  for (const file of DEFAULT_FILES) {
    const fullPath = join(rootDirectory, file);
    if (existsSync(fullPath)) {
      files.add(fullPath);
    }
  }

  for (const directory of DEFAULT_DIRECTORIES) {
    const fullPath = join(rootDirectory, directory);
    if (existsSync(fullPath)) {
      for (const file of listMarkdownFiles(fullPath)) {
        files.add(file);
      }
    }
  }

  return Array.from(files)
    .sort()
    .map((file) => ({
      source: relative(rootDirectory, file),
      content: readFileSync(file, "utf8")
    }));
}

export function searchLearningNotes(query: string, limit = 5, rootDirectory = process.cwd()): SearchResult[] {
  const documents = loadKnowledgeBase(rootDirectory);
  const terms = tokenize(query);
  const weekNumber = extractWeekNumber(query);

  const scored = documents
    .flatMap((document) => chunkDocument(document).map((chunk) => scoreChunk(chunk, terms, weekNumber)))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.source.localeCompare(b.source));

  return scored.slice(0, limit);
}

export function answerFromKnowledge(question: string, rootDirectory = process.cwd()): AssistantAnswer {
  const results = searchLearningNotes(question, 8, rootDirectory);

  if (results.length === 0) {
    return {
      answer: "我没有在当前仓库资料中找到足够依据。请先补充相关路线、笔记或 eval case，再让助手回答。",
      sources: []
    };
  }

  const sourceList = Array.from(new Set(results.map((result) => result.source)));
  const evidence = results
    .map((result) => `- ${result.source}: ${result.excerpt}`)
    .join("\n");

  return {
    answer: `根据本仓库资料：\n${evidence}\n\n可继续查看：${sourceList.join(", ")}`,
    sources: sourceList
  };
}

function listMarkdownFiles(directory: string): string[] {
  const entries = readdirSync(directory).sort();
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...listMarkdownFiles(fullPath));
    } else if (entry.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function chunkDocument(document: KnowledgeDocument): KnowledgeDocument[] {
  const parts = document.content
    .split(/\n{2,}/)
    .map((content) => content.trim())
    .filter(Boolean);

  const chunks: KnowledgeDocument[] = [];

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    const next = parts[index + 1];

    if (/^#+\s/.test(part)) {
      if (next && !/^#+\s/.test(next)) {
        chunks.push({
          source: document.source,
          content: `${part}\n${next}`
        });
        index += 1;
      }

      continue;
    }

    chunks.push({
      source: document.source,
      content: part
    });
  }

  return chunks;
}

function scoreChunk(chunk: KnowledgeDocument, terms: string[], weekNumber: number | undefined): SearchResult {
  const normalizedContent = normalize(chunk.content);
  const normalizedSource = normalize(chunk.source);
  let score = 0;

  for (const term of terms) {
    if (normalizedContent.includes(term)) {
      score += term.length > 3 ? 3 : 1;
    }

    if (normalizedSource.includes(term)) {
      score += 2;
    }
  }

  if (weekNumber !== undefined && normalizedSource.includes(`week-${String(weekNumber).padStart(2, "0")}`)) {
    score += 10;
  }

  if (terms.length > 0 && normalizedContent.includes(terms.join(" "))) {
    score += 5;
  }

  return {
    source: chunk.source,
    score,
    excerpt: chunk.content.replace(/\s+/g, " ").slice(0, 280)
  };
}

function tokenize(input: string): string[] {
  const normalized = normalize(input);
  const terms = normalized
    .split(/[^a-z0-9\u4e00-\u9fff]+/u)
    .map((term) => term.trim())
    .filter((term) => term.length > 1);

  const extraTerms = [];

  if (normalized.includes("harness")) {
    extraTerms.push("harness", "engineering");
  }

  if (normalized.includes("mcp")) {
    extraTerms.push("mcp", "host", "client", "server");
  }

  if (normalized.includes("agents.md")) {
    extraTerms.push("agents.md", "agents", "skill", "mcp");
  }

  if (normalized.includes("职责") || normalized.includes("边界")) {
    extraTerms.push("职责", "边界", "职责边界");
  }

  if (normalized.includes("学什么") || normalized.includes("学习什么")) {
    extraTerms.push("目标", "核心概念", "动手任务");
  }

  if (normalized.includes("rag")) {
    extraTerms.push("rag", "检索", "引用");
  }

  return Array.from(new Set([...terms, ...extraTerms]));
}

function extractWeekNumber(input: string): number | undefined {
  const match = input.match(/(?:week|第)\s*(\d{1,2})\s*(?:周)?/i);
  if (!match) {
    return undefined;
  }

  return Number.parseInt(match[1], 10);
}

function normalize(input: string): string {
  return input.toLowerCase().replace(/\s+/g, " ").trim();
}
