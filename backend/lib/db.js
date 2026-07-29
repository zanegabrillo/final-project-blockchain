import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const DB_PATH = fileURLToPath(new URL("../data/votes.json", import.meta.url));

function ensureFile() {
  const dir = dirname(DB_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (!existsSync(DB_PATH)) writeFileSync(DB_PATH, "[]");
}

export function getAllVotes() {
  ensureFile();
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
}

export function saveVote(vote) {
  ensureFile();
  const votes = getAllVotes();
  votes.push(vote);
  writeFileSync(DB_PATH, JSON.stringify(votes, null, 2));
  return vote;
}

export function tamperVote(id, updates) {
  ensureFile();
  const votes = getAllVotes();
  const idx = votes.findIndex((v) => v.id === id);
  if (idx === -1) throw new Error(`Vote not found: ${id}`);
  votes[idx] = { ...votes[idx], ...updates };
  writeFileSync(DB_PATH, JSON.stringify(votes, null, 2));
  return votes[idx];
}

export function replaceAllVotes(votes) {
  ensureFile();
  writeFileSync(DB_PATH, JSON.stringify(votes, null, 2));
}