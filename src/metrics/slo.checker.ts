/**
 * SLO Checker — validates test run metrics against defined SLO thresholds.
 * Determines whether the test run meets quality gates.
 */
import { RunMetrics, SloCheckResult, SloResult } from "./types";
import { sloConfig } from "./slo.config";
import * as fs from "fs";
import * as path from "path";

/**
 * Check collected metrics against SLO thresholds.
 *
 * @param metrics - Aggregated run metrics from MetricCollector.
 * @returns SloResult with per-criterion pass/fail status.
 */
export function checkSlo(metrics: RunMetrics): SloResult {
  const checks: SloCheckResult[] = [];

  const successRatePassed = metrics.successRate >= sloConfig.successRateMin;
  checks.push({
    criteria: "successRate",
    passed: successRatePassed,
    threshold: sloConfig.successRateMin,
    actual: metrics.successRate,
    message: successRatePassed
      ? `✔ successRate: ${metrics.successRate}% ≥ ${sloConfig.successRateMin}%`
      : `✘ successRate: ${metrics.successRate}% < ${sloConfig.successRateMin}%`,
  });

  const p95Passed = metrics.p95LatencyMs <= sloConfig.p95LatencyMaxMs;
  checks.push({
    criteria: "p95Latency",
    passed: p95Passed,
    threshold: sloConfig.p95LatencyMaxMs,
    actual: metrics.p95LatencyMs,
    message: p95Passed
      ? `✔ p95Latency: ${metrics.p95LatencyMs}ms ≤ ${sloConfig.p95LatencyMaxMs}ms`
      : `✘ p95Latency: ${metrics.p95LatencyMs}ms > ${sloConfig.p95LatencyMaxMs}ms`,
  });

  const p99Passed = metrics.p99LatencyMs <= sloConfig.p99LatencyMaxMs;
  checks.push({
    criteria: "p99Latency",
    passed: p99Passed,
    threshold: sloConfig.p99LatencyMaxMs,
    actual: metrics.p99LatencyMs,
    message: p99Passed
      ? `✔ p99Latency: ${metrics.p99LatencyMs}ms ≤ ${sloConfig.p99LatencyMaxMs}ms`
      : `✘ p99Latency: ${metrics.p99LatencyMs}ms > ${sloConfig.p99LatencyMaxMs}ms`,
  });

  const flakyRate =
    metrics.total > 0
      ? Math.round((metrics.flaky / metrics.total) * 100 * 100) / 100
      : 0;
  const flakyPassed = flakyRate <= sloConfig.flakyRateMax;
  checks.push({
    criteria: "flakyRate",
    passed: flakyPassed,
    threshold: sloConfig.flakyRateMax,
    actual: flakyRate,
    message: flakyPassed
      ? `✔ flakyRate: ${flakyRate}% ≤ ${sloConfig.flakyRateMax}%`
      : `✘ flakyRate: ${flakyRate}% > ${sloConfig.flakyRateMax}%`,
  });

  const overallPassed = checks.every((c) => c.passed);

  const result: SloResult = {
    overallPassed,
    checks,
    timestamp: new Date().toISOString(),
  };

  return result;
}

/**
 * Write SLO result to disk as JSON.
 * Output path: metrics/slo-result.json
 */
export function writeSloResult(result: SloResult): void {
  const dir = "metrics";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(dir, "slo-result.json"),
    JSON.stringify(result, null, 2),
    "utf-8"
  );
}
