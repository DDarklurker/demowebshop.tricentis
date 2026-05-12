/**
 * Prometheus exporter — converts test metrics to Prometheus text format.
 * Outputs to metrics/metrics.txt for Prometheus Pushgateway or Node Exporter scraping.
 */
import { RunMetrics } from "./types";
import * as fs from "fs";
import * as path from "path";

const OUTPUT_DIR = "metrics";

/**
 * Export metrics to Prometheus text format (OpenMetrics).
 * Writes to metrics/metrics.txt.
 *
 * Metrics exported:
 *   test_total{status="pass|fail|skip"} — gauge
 *   test_success_rate — gauge (percentage 0-100)
 *   test_duration_ms{quantile="0.95|0.99"} — gauge
 *   test_avg_duration_ms — gauge
 *   test_flaky_count — gauge
 *
 * @param metrics - Aggregated run metrics.
 */
export function exportPrometheus(metrics: RunMetrics): void {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const avgDuration = metrics.total > 0
    ? Math.round(metrics.totalDurationMs / metrics.total)
    : 0;

  const lines = [
    "# HELP test_total Total number of tests by status.",
    "# TYPE test_total gauge",
    `test_total{status="pass"} ${metrics.passed}`,
    `test_total{status="fail"} ${metrics.failed}`,
    `test_total{status="skip"} ${metrics.skipped}`,
    "",
    "# HELP test_success_rate Percentage of passed tests.",
    "# TYPE test_success_rate gauge",
    `test_success_rate ${metrics.successRate}`,
    "",
    "# HELP test_duration_ms Test duration in milliseconds by quantile.",
    "# TYPE test_duration_ms gauge",
    `test_duration_ms{quantile="0.95"} ${metrics.p95LatencyMs}`,
    `test_duration_ms{quantile="0.99"} ${metrics.p99LatencyMs}`,
    "",
    "# HELP test_avg_duration_ms Average test duration in milliseconds.",
    "# TYPE test_avg_duration_ms gauge",
    `test_avg_duration_ms ${avgDuration}`,
    "",
    "# HELP test_flaky_count Number of flaky tests.",
    "# TYPE test_flaky_count gauge",
    `test_flaky_count ${metrics.flaky}`,
    "",
  ];

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "metrics.txt"),
    lines.join("\n"),
    "utf-8"
  );

  // Also export as structured JSON for other consumers
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "metrics.json"),
    JSON.stringify(metrics, null, 2),
    "utf-8"
  );
}
