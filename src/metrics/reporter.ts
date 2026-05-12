/**
 * Custom Playwright Reporter — collects and displays test metrics.
 *
 * Integrates with Playwright's reporter system.
 * On test end: records per-test metrics to MetricCollector.
 * On run end: prints summary table, checks SLO, exports Prometheus metrics,
 * appends to history, and writes SLO result.
 *
 * Usage in playwright.config.ts:
 *   reporter: [['list'], ['./src/metrics/reporter.ts']]
 */
import type {
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";
import { MetricCollector } from "./collector";
import { TestMetric } from "./types";
import { sloConfig } from "./slo.config";
import { checkSlo, writeSloResult } from "./slo.checker";
import { exportPrometheus } from "./prometheus.exporter";
import { appendHistory, getTrend } from "./history";

class MetricsReporter implements Reporter {
  private collector = new MetricCollector();

  onBegin(_config: unknown, _suite: Suite): void {
    this.collector.reset();
    this.collector.markStart();
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const durationMs: number = result.duration;
    const file: string = test.location.file;

    // Determine status: pass, fail, skip, or flaky (passed after retry)
    let status: TestMetric["status"];
    if (result.status === "passed") {
      status = result.retry > 0 ? "flaky" : "passed";
    } else if (result.status === "skipped") {
      status = "skipped";
    } else {
      status = "failed";
    }

    const testMetric: TestMetric = {
      name: test.title,
      file,
      status,
      durationMs,
      retries: result.retry,
      error: result.error?.message?.substring(0, 200),
      startTime: new Date(result.startTime).toISOString(),
    };

    this.collector.addTest(testMetric);
  }

  onEnd(result: FullResult): void {
    this.collector.markEnd();
    const metrics = this.collector.compute();
    const sloResult = checkSlo(metrics);
    const trend = getTrend();

    // Console output
    this.printSummary(metrics, sloResult, trend);

    // Export to files
    try {
      writeSloResult(sloResult);
      exportPrometheus(metrics);
      appendHistory(metrics);
    } catch (err) {
      console.error("[MetricsReporter] Failed to write metrics:", err);
    }
  }

  private printSummary(
    m: ReturnType<MetricCollector["compute"]>,
    slo: ReturnType<typeof checkSlo>,
    trend: ReturnType<typeof getTrend>
  ): void {
    const border = "─".repeat(64);
    console.log(`\n┌${border}┐`);
    console.log(
      `│  Test Run Metrics${" ".repeat(38)}Duration  │`
    );
    console.log(`├${border}┤`);
    console.log(
      `│  ✅ Passed: ${String(m.passed).padEnd(6)}❌ Failed: ${String(m.failed).padEnd(6)}⚠️  Flaky: ${String(m.flaky).padEnd(6)}│`
    );
    const totalSec = Math.round(m.totalDurationMs / 1000);
    console.log(
      `│  🔄 Retries: ${String(m.tests.filter((t) => t.retries > 0).length).padEnd(5)}⏱️  Total: ${totalSec}s${" ".repeat(
        Math.max(0, 19 - String(totalSec).length)
      )}📊 Success: ${m.successRate}% │`
    );
    console.log(`├${border}┤`);
    console.log(`│  SLI Check${" ".repeat(50)}│`);
    for (const check of slo.checks) {
      console.log(`│  ${check.message.padEnd(58)}│`);
    }
    if (trend) {
      const arrow = trend.direction === "up" ? "▲" : trend.direction === "down" ? "▼" : "→";
      console.log(
        `│  Trend vs previous: ${arrow} ${trend.delta}%${" ".repeat(36)}│`
      );
    }
    console.log(
      `│  Allure: npx allure serve allure-results/${" ".repeat(24)}│`
    );
    console.log(`└${border}┘\n`);
  }
}

export default MetricsReporter;
