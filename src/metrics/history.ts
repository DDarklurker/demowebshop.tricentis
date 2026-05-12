/**
 * History manager — reads, updates, and maintains a history of test runs.
 * Stores last 30 runs in metrics/history.json for trend analysis.
 */
import { HistoryEntry } from "./types";
import { RunMetrics } from "./types";
import * as fs from "fs";
import * as path from "path";

const HISTORY_FILE = "metrics/history.json";
const MAX_ENTRIES = 30;

/**
 * Read existing history entries from disk.
 * Returns empty array if file does not exist or is invalid.
 */
export function readHistory(): HistoryEntry[] {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const data = fs.readFileSync(HISTORY_FILE, "utf-8");
      const entries: HistoryEntry[] = JSON.parse(data);
      if (Array.isArray(entries)) {
        return entries;
      }
    }
  } catch {
    // Corrupted file — start fresh
  }
  return [];
}

/**
 * Append a new run to the history.
 * Keeps only the last MAX_ENTRIES (30) records.
 * Writes the updated history back to disk.
 *
 * @param metrics - Aggregated run metrics from the current run.
 */
export function appendHistory(metrics: RunMetrics): void {
  const entries = readHistory();
  const today = new Date().toISOString().split("T")[0];

  const entry: HistoryEntry = {
    date: today,
    successRate: metrics.successRate,
    total: metrics.total,
    passed: metrics.passed,
    failed: metrics.failed,
    durationMs: metrics.totalDurationMs,
  };

  entries.push(entry);

  // Keep only the last 30 entries
  while (entries.length > MAX_ENTRIES) {
    entries.shift();
  }

  const dir = path.dirname(HISTORY_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(HISTORY_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

/**
 * Compute trend data comparing the latest two runs.
 * Returns delta values (change from previous to current run).
 */
export function getTrend(): { direction: "up" | "down" | "stable"; delta: number } | null {
  const entries = readHistory();
  if (entries.length < 2) return null;

  const latest = entries[entries.length - 1];
  const previous = entries[entries.length - 2];
  const delta = Math.round((latest.successRate - previous.successRate) * 100) / 100;

  const direction = delta > 0 ? "up" : delta < 0 ? "down" : "stable";
  return { direction, delta };
}
