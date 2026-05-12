/**
 * SLO configuration.
 * Defines Service Level Objective thresholds for test run quality gates.
 */
import { SloConfig } from "./types";

/**
 * SLO thresholds for the test suite.
 *
 * - successRate: At least 95% of tests must pass.
 * - p95Latency: 95th percentile test duration must be ≤ 5 seconds.
 * - p99Latency: 99th percentile test duration must be ≤ 10 seconds.
 * - flakyRate: At most 2% of tests may be flaky.
 */
export const sloConfig: SloConfig = {
  successRateMin: 95,
  p95LatencyMaxMs: 5000,
  p99LatencyMaxMs: 10000,
  flakyRateMax: 2,
};
