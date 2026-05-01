import type { JsonValue, ToolDefinition, ToolPermissions } from "./types.js";

export class ToolRegistry {
  private readonly tools = new Map<string, ToolDefinition>();

  constructor(tools: ToolDefinition[] = []) {
    for (const tool of tools) {
      this.register(tool);
    }
  }

  register(tool: ToolDefinition): void {
    if (this.tools.has(tool.name)) {
      throw new Error(`Duplicate tool registered: ${tool.name}`);
    }

    this.tools.set(tool.name, tool);
  }

  list(): ToolDefinition[] {
    return Array.from(this.tools.values());
  }

  get(name: string): ToolDefinition | undefined {
    return this.tools.get(name);
  }

  ensureAllowed(toolName: string, permissions: ToolPermissions): ToolDefinition {
    const tool = this.get(toolName);

    if (!tool) {
      throw new Error(`Unknown tool: ${toolName}`);
    }

    if (!permissions.allowedTools.includes(toolName)) {
      throw new Error(`Tool is not allowed for this run: ${toolName}`);
    }

    return tool;
  }
}

export function buildDefaultToolInput(task: string, tool: ToolDefinition): Record<string, JsonValue> {
  const properties = tool.inputSchema.properties;

  if (typeof properties === "object" && properties !== null && !Array.isArray(properties)) {
    const propertyMap = properties as Record<string, JsonValue>;
    const input: Record<string, JsonValue> = {};

    if ("query" in propertyMap) {
      input.query = task;
    }

    if ("limit" in propertyMap) {
      input.limit = 3;
    }

    return input;
  }

  return { query: task };
}

export function chooseToolForTask(task: string, tools: ToolDefinition[]): ToolDefinition | undefined {
  const normalized = task.toLowerCase();

  const searchTool = tools.find((tool) => {
    const haystack = `${tool.name} ${tool.description}`.toLowerCase();
    return haystack.includes("search") || haystack.includes("检索");
  });

  if (normalized.includes("search") || normalized.includes("检索") || normalized.includes("学习") || normalized.includes("week")) {
    return searchTool ?? tools[0];
  }

  return tools[0];
}

