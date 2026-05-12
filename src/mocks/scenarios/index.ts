/**
 * Pre-built mock scenarios.
 * Import and apply directly in test files for consistent mock setup.
 */
export { MockFactory } from "../mock.factory";

/**
 * Server unavailability scenario: all requests → 503.
 * Import: `import { serverUnavailable } from 'src/mocks/scenarios/server-unavailable';`
 * Usage:  `test.beforeEach(async ({ page }) => { await serverUnavailable(page); });`
 */
import { Page } from "@playwright/test";

/**
 * All network requests return 503 Service Unavailable.
 * Tests should verify error pages and graceful degradation.
 */
export async function serverUnavailable(page: Page): Promise<void> {
  await page.route("**/*", async (route) => {
    await route.fulfill({
      status: 503,
      body: "<h1>503 Service Unavailable</h1><p>Please try again later.</p>",
      contentType: "text/html; charset=utf-8",
    });
  });
}

/**
 * All network requests are aborted (no internet simulation).
 * Tests should verify offline behavior and error recovery.
 */
export async function noInternet(page: Page): Promise<void> {
  await page.route("**/*", async (route) => {
    await route.abort("internetdisconnected");
  });
}

/**
 * All network requests have a 3-second delay.
 * Tests should verify loading states, spinners, and timeout handling.
 */
export async function slowNetwork(page: Page): Promise<void> {
  await page.route("**/*", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await route.continue();
  });
}
