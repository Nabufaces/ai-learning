import type { JsonValue, ToolDefinition } from "../../../harness/src/index.js";
import { answerFromKnowledge, searchLearningNotes } from "./knowledge.js";

export function createLearningSearchTool(): ToolDefinition {
  return {
    name: "search_learning_notes",
    description: "Search local AI learning roadmap, harness notes, eval docs, and agent workflow docs.",
    mode: "read",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Learning question or topic to search for."
        },
        limit: {
          type: "number",
          description: "Maximum number of search results."
        }
      },
      required: ["query"]
    },
    execute(input) {
      const query = typeof input.query === "string" ? input.query : "";
      const limit = typeof input.limit === "number" ? input.limit : 5;

      if (query.trim().length === 0) {
        throw new Error("query is required. Ask a concrete learning question, for example: 第 10 周 Harness Engineering 学什么？");
      }

      const results: JsonValue[] = searchLearningNotes(query, limit).map((result) => ({
        source: result.source,
        score: result.score,
        excerpt: result.excerpt
      }));

      return { results };
    }
  };
}

export function createWeeklyPlanTool(): ToolDefinition {
  return {
    name: "create_weekly_plan",
    description: "Create a lightweight weekly learning plan from a topic and target week.",
    mode: "write",
    requiresApproval: true,
    inputSchema: {
      type: "object",
      properties: {
        week: {
          type: "number",
          description: "Week number from 1 to 12."
        },
        topic: {
          type: "string",
          description: "Learning topic for the week."
        }
      },
      required: ["week", "topic"]
    },
    execute(input) {
      const week = typeof input.week === "number" ? input.week : undefined;
      const topic = typeof input.topic === "string" ? input.topic : undefined;

      if (!week || week < 1 || week > 12 || !topic) {
        throw new Error("week must be 1-12 and topic must be a non-empty string.");
      }

      return {
        week,
        topic,
        plan: [`Read the Week ${week} roadmap.`, `Build one small artifact for ${topic}.`, "Add one eval or failure case.", "Write a short retrospective."]
      };
    }
  };
}

export function createQuizTool(): ToolDefinition {
  return {
    name: "run_quiz",
    description: "Generate a short quiz question from repository learning material.",
    mode: "read",
    inputSchema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description: "Topic to quiz, such as MCP, RAG, Agent Loop, or Harness Engineering."
        }
      },
      required: ["topic"]
    },
    execute(input) {
      const topic = typeof input.topic === "string" ? input.topic : "";
      const answer = answerFromKnowledge(topic);

      return {
        topic,
        question: `请用自己的话解释：${topic} 在 AI 应用开发中解决什么问题？`,
        sourceHint: answer.sources[0] ?? "No source found"
      };
    }
  };
}

export function listLearningTools(): ToolDefinition[] {
  return [createLearningSearchTool(), createWeeklyPlanTool(), createQuizTool()];
}
