import { Page } from "@playwright/test";

/**
 * Represents a mock HTTP response configuration for Playwright route interception.
 * Used to simulate server responses without hitting the real backend.
 */
export interface MockConfig {
  /** URL pattern to intercept (glob or regex). Example: '**\/login' */
  url: string | RegExp;
  /** HTTP method to match (GET, POST, PUT, DELETE). Defaults to all methods if omitted. */
  method?: string;
  /** HTTP status code for the mocked response. */
  status: number;
  /** Response body content (HTML, JSON string, or empty). */
  body?: string;
  /** Content-Type header. Defaults to 'text/html; charset=utf-8'. */
  contentType?: string;
  /** Additional response headers as key-value pairs. */
  headers?: Record<string, string>;
}

/**
 * Options for simulating network conditions during mock interception.
 */
export interface DelayOptions {
  /** Delay in milliseconds before the mocked response is returned. */
  ms: number;
}

/**
 * Applies a mock configuration to a Playwright page using route interception.
 * All matching requests will receive the configured mock response.
 *
 * @param page - Playwright Page instance to intercept requests on.
 * @param config - Mock response configuration.
 *
 * @example
 * ```typescript
 * await applyMock(page, {
 *   url: '**\/login',
 *   method: 'POST',
 *   status: 200,
 *   body: '<div>Welcome back!</div>'
 * });
 * ```
 */
export async function applyMock(page: Page, config: MockConfig): Promise<void> {
  await page.route(config.url, async (route) => {
    if (config.method && route.request().method() !== config.method) {
      await route.fallback();
      return;
    }
    await route.fulfill({
      status: config.status,
      body: config.body,
      contentType: config.contentType ?? "text/html; charset=utf-8",
      headers: config.headers,
    });
  });
}

/**
 * Applies a network delay to all matching requests.
 * Useful for testing loading states and spinners.
 *
 * @param page - Playwright Page instance.
 * @param url - URL pattern to delay.
 * @param options - Delay configuration (defaults to 3000ms if not specified).
 */
export async function applyDelay(
  page: Page,
  url: string | RegExp,
  options: DelayOptions = { ms: 3000 }
): Promise<void> {
  await page.route(url, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, options.ms));
    await route.continue();
  });
}

/**
 * Aborts all matching requests, simulating network failure.
 *
 * @param page - Playwright Page instance.
 * @param url - URL pattern to abort.
 */
export async function applyAbort(
  page: Page,
  url: string | RegExp = "**/*"
): Promise<void> {
  await page.route(url, async (route) => {
    await route.abort("internetdisconnected");
  });
}
