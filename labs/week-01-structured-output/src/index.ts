type WeeklyPlan = {
  week: number;
  topic: string;
  goals: string[];
  acceptanceCriteria: string[];
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string" && item.length > 0);
}

function parseWeeklyPlan(raw: unknown): WeeklyPlan {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Expected an object with week, topic, goals, and acceptanceCriteria.");
  }

  const value = raw as Record<string, unknown>;

  if (typeof value.week !== "number" || !Number.isInteger(value.week) || value.week < 1) {
    throw new Error("Invalid week: expected a positive integer.");
  }

  if (typeof value.topic !== "string" || value.topic.trim().length === 0) {
    throw new Error("Invalid topic: expected a non-empty string.");
  }

  if (!isStringArray(value.goals)) {
    throw new Error("Invalid goals: expected a non-empty string array.");
  }

  if (!isStringArray(value.acceptanceCriteria)) {
    throw new Error("Invalid acceptanceCriteria: expected a non-empty string array.");
  }

  return {
    week: value.week,
    topic: value.topic,
    goals: value.goals,
    acceptanceCriteria: value.acceptanceCriteria
  };
}

const samples: unknown[] = [
  {
    week: 1,
    topic: "LLM 应用基础",
    goals: ["理解 token 和上下文", "掌握结构化输出"],
    acceptanceCriteria: ["能解释 schema 的作用", "能处理格式错误"]
  },
  {
    week: "2",
    topic: "TypeScript AI 应用骨架",
    goals: ["启动 API server"],
    acceptanceCriteria: ["能调用 /api/chat"]
  },
  {
    week: 3,
    topic: "",
    goals: [],
    acceptanceCriteria: ["能设计工具 schema"]
  }
];

for (const [index, sample] of samples.entries()) {
  try {
    const plan = parseWeeklyPlan(sample);
    console.log(`[sample ${index + 1}] valid`, plan);
  } catch (error) {
    console.log(`[sample ${index + 1}] invalid`, error instanceof Error ? error.message : String(error));
  }
}

