/**
 * MetricCollector — gathers per-test metrics during a Playwright run.
 * Stores results in memory and exposes aggregation methods.
 */
import { TestMetric, RunMetrics } from "./types";

export class MetricCollector {
  private tests: TestMetric[] = [];
  private startTime: string = "";
  private endTime: string = "";

  /**
   * Record the start of the test run.
   * Called from the reporter's onBegin hook.
   */
  markStart(): void {
    this.startTime = new Date().toISOString();
  }

  /**
   * Record the end of the test run.
   * Called from the reporter's onEnd hook.
   */
  markEnd(): void {
    this.endTime = new Date().toISOString();
  }

  /**
   * Add a single test result to the collector.
   * @param metric - Test execution metric.
   */
  addTest(metric: TestMetric): void {
    this.tests.push(metric);
  }

  /**
   * Compute aggregated metrics for the entire run.
   * Returns a RunMetrics object with summary statistics.
   */
  compute(): RunMetrics {
    const total = this.tests.filter(
      (t) => t.status !== "skipped"
    ).length;
    const passed = this.tests.filter((t) => t.status === "passed").length;
    const failed = this.tests.filter((t) => t.status === "failed").length;
    const skipped = this.tests.filter((t) => t.status === "skipped").length;
    const flaky = this.tests.filter((t) => t.status === "flaky").length;

    const successRate =
      total > 0 ? Math.round((passed / total) * 100 * 100) / 100 : 100;

    const durations = this.tests
      .filter((t) => t.status !== "skipped")
      .map((t) => t.durationMs)
      .sort((a, b) => a - b);

    const totalDurationMs = this.tests.reduce(
      (sum, t) => sum + t.durationMs,
      0
    );

    const p95Idx = Math.ceil(durations.length * 0.95) - 1;
    const p99Idx = Math.ceil(durations.length * 0.99) - 1;

    return {
      total,
      passed,
      failed,
      skipped,
      flaky,
      successRate,
      totalDurationMs,
      p95LatencyMs: durations.length > 0 ? durations[p95Idx] ?? 0 : 0,
      p99LatencyMs: durations.length > 0 ? durations[p99Idx] ?? 0 : 0,
      tests: [...this.tests],
      startTime: this.startTime,
      endTime: this.endTime,
    };
  }

  /**
   * Get all collected test metrics.
   */
  getAll(): TestMetric[] {
    return [...this.tests];
  }

  /**
   * Reset the collector for a new run.
   */
  reset(): void {
    this.tests = [];
    this.startTime = "";
    this.endTime = "";
  }
}
