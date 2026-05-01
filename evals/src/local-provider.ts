import { answerFromKnowledge } from "../../projects/ai-learning-assistant/src/knowledge.js";

const question = process.argv.slice(2).join(" ").trim();

if (!question) {
  throw new Error("Question argument is required.");
}

console.log(answerFromKnowledge(question).answer);

