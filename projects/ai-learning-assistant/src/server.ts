import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { answerFromKnowledge, searchLearningNotes } from "./knowledge.js";
import { listLearningTools } from "./tools.js";

const port = Number.parseInt(process.env.PORT ?? "4317", 10);

const server = createServer(async (request, response) => {
  try {
    if (request.method === "GET" && request.url === "/health") {
      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method === "GET" && request.url === "/api/tools") {
      sendJson(
        response,
        200,
        {
          tools: listLearningTools().map((tool) => ({
            name: tool.name,
            description: tool.description,
            mode: tool.mode,
            requiresApproval: Boolean(tool.requiresApproval),
            inputSchema: tool.inputSchema
          }))
        }
      );
      return;
    }

    if (request.method === "POST" && request.url === "/api/search") {
      const body = await readJsonBody(request);
      const query = getString(body, "query");
      const limit = getOptionalNumber(body, "limit") ?? 5;

      if (!query) {
        sendJson(response, 400, { error: "query is required" });
        return;
      }

      sendJson(response, 200, { results: searchLearningNotes(query, limit) });
      return;
    }

    if (request.method === "POST" && request.url === "/api/chat") {
      const body = await readJsonBody(request);
      const message = getString(body, "message");

      if (!message) {
        sendJson(response, 400, { error: "message is required" });
        return;
      }

      const answer = answerFromKnowledge(message);
      await streamText(response, answer.answer);
      return;
    }

    sendJson(response, 404, { error: "not_found" });
  } catch (error) {
    sendJson(response, 500, {
      error: "internal_error",
      message: error instanceof Error ? error.message : String(error)
    });
  }
});

server.listen(port, () => {
  console.log(`AI learning assistant listening on http://localhost:${port}`);
});

async function readJsonBody(request: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8").trim();

  if (raw.length === 0) {
    return {};
  }

  const parsed = JSON.parse(raw) as unknown;

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Expected JSON object body.");
  }

  return parsed as Record<string, unknown>;
}

function getString(value: Record<string, unknown>, key: string): string | undefined {
  const item = value[key];
  return typeof item === "string" && item.trim().length > 0 ? item : undefined;
}

function getOptionalNumber(value: Record<string, unknown>, key: string): number | undefined {
  const item = value[key];
  return typeof item === "number" && Number.isFinite(item) ? item : undefined;
}

function sendJson(response: ServerResponse, statusCode: number, body: unknown): void {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(body, null, 2));
}

async function streamText(response: ServerResponse, text: string): Promise<void> {
  response.writeHead(200, {
    "content-type": "text/plain; charset=utf-8",
    "transfer-encoding": "chunked"
  });

  for (const chunk of chunkText(text, 64)) {
    response.write(chunk);
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  response.end();
}

function chunkText(text: string, size: number): string[] {
  const chunks: string[] = [];

  for (let index = 0; index < text.length; index += size) {
    chunks.push(text.slice(index, index + size));
  }

  return chunks;
}

