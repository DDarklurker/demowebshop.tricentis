/**
 * Mock factory — creates and applies mock handlers to Playwright page instances.
 * Provides a fluent API for setting up mock scenarios in tests.
 */
import { Page } from "@playwright/test";
import { applyMock, applyAbort, applyDelay, MockConfig } from "./mock.types";
import { authHandlers } from "./handlers/auth.handler";
import { catalogHandlers } from "./handlers/catalog.handler";
import { cartHandlers } from "./handlers/cart.handler";
import { commonHandlers } from "./handlers/common.handler";
import { searchHandlers } from "./handlers/search.handler";

/**
 * MockFactory provides an organized interface to all mock handlers.
 * Each property groups handlers by domain (auth, catalog, cart, common, search).
 *
 * @example
 * ```typescript
 * const mock = new MockFactory(page);
 * await mock.auth.loginInvalid();
 * await mock.cart.cartEmpty();
 * // Alternative: use static helper
 * await MockFactory.setupAuthMocks(page);
 * ```
 */
export class MockFactory {
  constructor(private page: Page) {}

  /**
   * Apply a single mock configuration to the page.
   * @param config - The mock configuration to apply.
   */
  private async apply(config: MockConfig): Promise<void> {
    await applyMock(this.page, config);
  }

  /** Authentication mock handlers. */
  auth = {
    loginSuccess: async () => this.apply(authHandlers.loginSuccess()),
    loginInvalid: async () => this.apply(authHandlers.loginInvalid()),
    loginServerError: async () => this.apply(authHandlers.loginServerError()),
    registerSuccess: async () => this.apply(authHandlers.registerSuccess()),
    registerDuplicate: async () => this.apply(authHandlers.registerDuplicate()),
    recoverSuccess: async () => this.apply(authHandlers.recoverSuccess()),
    recoverNotFound: async () => this.apply(authHandlers.recoverNotFound()),
  };

  /** Catalog mock handlers. */
  catalog = {
    withProducts: async (category: string) =>
      this.apply(catalogHandlers.catalogWithProducts(category)),
    empty: async () => this.apply(catalogHandlers.catalogEmpty()),
    abortTimeout: async (category: string): Promise<void> => {
      const { url } = catalogHandlers.catalogTimeout(category);
      await this.page.route(url, async (route) =>
        route.abort("timedout")
      );
    },
    productDetail: async () => this.apply(catalogHandlers.productDetail()),
  };

  /** Cart mock handlers. */
  cart = {
    withItems: async () => this.apply(cartHandlers.cartWithItems()),
    empty: async () => this.apply(cartHandlers.cartEmpty()),
    addError: async () => this.apply(cartHandlers.cartAddError()),
  };

  /** Common mock handlers. */
  common = {
    homePageOk: async () => this.apply(commonHandlers.homePageOk()),
    homePageError: async () => this.apply(commonHandlers.homePageError()),
    notFound: async () => this.apply(commonHandlers.notFound()),
  };

  /** Search mock handlers. */
  search = {
    withResults: async (query: string) =>
      this.apply(searchHandlers.searchWithResults(query)),
    noResults: async () => this.apply(searchHandlers.searchNoResults()),
    emptyQuery: async () => this.apply(searchHandlers.searchEmptyQuery()),
  };

  // ---- Static helpers for common scenarios ----

  /**
   * Simulate slow network by adding 3-second delay to all requests.
   */
  static async simulateSlowNetwork(page: Page): Promise<void> {
    await applyDelay(page, "**/*", { ms: 3000 });
  }

  /**
   * Simulate complete server unavailability — all requests return 503.
   */
  static async simulateServerUnavailable(page: Page): Promise<void> {
    await page.route("**/*", async (route) => {
      await route.fulfill({
        status: 503,
        body: "<h1>503 Service Unavailable</h1>",
      });
    });
  }

  /**
   * Simulate no internet connection — all requests are aborted.
   */
  static async simulateNoInternet(page: Page): Promise<void> {
    await applyAbort(page, "**/*");
  }
}
