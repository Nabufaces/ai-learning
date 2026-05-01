const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
const prompt = "用三句话解释 AI 应用开发为什么需要 eval。";

if (!apiKey) {
  console.log("OPENAI_API_KEY is not set. Running mock mode.");
  console.log(mockResponse(prompt));
} else {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: prompt
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI API request failed: ${response.status} ${body}`);
  }

  const data = (await response.json()) as ResponsesApiResult;
  console.log(extractOutputText(data));
}

function mockResponse(input: string): string {
  return [
    `Prompt: ${input}`,
    "Mock answer: eval 能把主观感觉变成可重复检查的用例。",
    "当 prompt、模型、工具或 RAG 数据变化时，eval 可以发现回归。",
    "没有 eval，AI 应用很容易在看似正常的回答里悄悄变差。"
  ].join("\n");
}

interface ResponsesApiResult {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
      type?: string;
    }>;
  }>;
}

function extractOutputText(data: ResponsesApiResult): string {
  if (typeof data.output_text === "string") {
    return data.output_text;
  }

  const text = data.output
    ?.flatMap((item) => item.content ?? [])
    .map((content) => content.text)
    .filter((value): value is string => typeof value === "string")
    .join("\n")
    .trim();

  if (!text) {
    throw new Error("The API response did not contain output text.");
  }

  return text;
}

