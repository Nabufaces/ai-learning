import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { Checkpoint } from "./types.js";

export async function saveCheckpoint(directory: string, checkpoint: Checkpoint): Promise<string> {
  const filePath = join(directory, `${checkpoint.runId}.json`);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(checkpoint, null, 2), "utf8");
  return filePath;
}

export async function loadCheckpoint(directory: string, runId: string): Promise<Checkpoint> {
  const filePath = join(directory, `${runId}.json`);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as Checkpoint;
}

