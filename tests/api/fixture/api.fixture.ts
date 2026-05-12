/**
 * API test fixture.
 *
 * Provides an APIRequestContext for direct HTTP calls to the backend.
 * No browser needed — faster and more stable than UI tests.
 *
 * Usage:
 *   import { test, expect } from '../fixture/api.fixture';
 *   test('GET / returns 200', async ({ apiRequest }) => {
 *     const response = await apiRequest.get('/');
 *     expect(response.status()).toBe(200);
 *   });
 */
import { test as base, expect, APIRequestContext } from "@playwright/test";
import { request } from "@playwright/test";

export { expect };

const BASE_URL = "https://demowebshop.tricentis.com";

export type TApiFixture = {
  /** Unauthenticated API request context. */
  apiRequest: APIRequestContext;
  /**
   * Authenticated API request context.
   * Reuses the login cookie from storage/state.json.
   */
  authenticatedRequest: APIRequestContext;
};

export const test = base.extend<TApiFixture>({
  apiRequest: async ({}, use) => {
    const context = await request.newContext({ baseURL: BASE_URL });
    await use(context);
    await context.dispose();
  },

  authenticatedRequest: async ({}, use) => {
    const context = await request.newContext({
      baseURL: BASE_URL,
      storageState: "storage/state.json",
    });
    await use(context);
    await context.dispose();
  },
});

/** Assert that response status is in the expected range. */
export function assertResponseOk(
  response: { status: () => number; ok: () => boolean },
  expectedStatus?: number
): void {
  if (expectedStatus !== undefined) {
    expect(
      response.status(),
      `Expected status ${expectedStatus} but got ${response.status()}`
    ).toBe(expectedStatus);
  } else {
    expect(response.ok(), `Expected 2xx status but got ${response.status()}`).toBeTruthy();
  }
}
