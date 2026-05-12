/**
 * Metrics type definitions.
 * Core data structures for test run metrics collection and reporting.
 */

/** Result of a single test execution. */
export interface TestMetric {
  /** Test title (concatenated describe + test name). */
  name: string;
  /** File path of the test spec. */
  file: string;
  /** Execution result: passed, failed, skipped, or flaky (passed after retry). */
  status: "passed" | "failed" | "skipped" | "flaky";
  /** Duration of this test in milliseconds. */
  durationMs: number;
  /** Number of retries taken (0 if passed on first attempt). */
  retries: number;
  /** Error message if the test failed, undefined otherwise. */
  error?: string;
  /** ISO-8601 timestamp of test start. */
  startTime: string;
}

/** Aggregated metrics for an entire test run. */
export interface RunMetrics {
  /** Total number of tests executed (excluding skipped). */
  total: number;
  /** Number of passed tests. */
  passed: number;
  /** Number of failed tests. */
  failed: number;
  /** Number of skipped tests. */
  skipped: number;
  /** Number of flaky tests (passed after 1+ retries). */
  flaky: number;
  /** Success rate as percentage (0-100). */
  successRate: number;
  /** Total run duration in milliseconds. */
  totalDurationMs: number;
  /** 95th percentile test duration in milliseconds. */
  p95LatencyMs: number;
  /** 99th percentile test duration in milliseconds. */
  p99LatencyMs: number;
  /** Per-test detailed metrics. */
  tests: TestMetric[];
  /** ISO-8601 timestamp of run start. */
  startTime: string;
  /** ISO-8601 timestamp of run end. */
  endTime: string;
}

/** SLO (Service Level Objective) configuration thresholds. */
export interface SloConfig {
  /** Minimum pass rate percentage (0-100). */
  successRateMin: number;
  /** Maximum 95th percentile duration in milliseconds. */
  p95LatencyMaxMs: number;
  /** Maximum 99th percentile duration in milliseconds. */
  p99LatencyMaxMs: number;
  /** Maximum flaky test rate percentage (0-100). */
  flakyRateMax: number;
}

/** Result of an SLO check — one entry per SLO criterion. */
export interface SloCheckResult {
  /** Criterion name (e.g. "successRate", "p95Latency"). */
  criteria: string;
  /** Whether the criterion passed (true) or violated (false). */
  passed: boolean;
  /** Threshold value from the SLO config. */
  threshold: number;
  /** Actual measured value. */
  actual: number;
  /** Human-readable description of the result. */
  message: string;
}

/** Overall SLO check result for a test run. */
export interface SloResult {
  /** Whether ALL SLO criteria passed. */
  overallPassed: boolean;
  /** Individual criterion check results. */
  checks: SloCheckResult[];
  /** ISO-8601 timestamp of the check. */
  timestamp: string;
}

/** Historical run entry stored in history.json for trend analysis. */
export interface HistoryEntry {
  /** ISO-8601 date string (YYYY-MM-DD). */
  date: string;
  /** Success rate percentage. */
  successRate: number;
  /** Total number of tests. */
  total: number;
  /** Number of passed tests. */
  passed: number;
  /** Number of failed tests. */
  failed: number;
  /** Total run duration in milliseconds. */
  durationMs: number;
}
