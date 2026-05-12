/**
 * Flow test fixture.
 *
 * Provides all page objects for end-to-end cross-page test scenarios.
 * Uses storageState for authenticated flows where needed.
 *
 * Tests using this fixture should run with:
 *   fullyParallel: false, workers: 1
 * because flows are sequential and state-dependent.
 */
import { test as base } from "../../../src/fixture/fixtureBase";
import { test as pageTest } from "../../../src/fixture/fixturePage";
import { HomePage } from "../../../src/pages/basePage";
import { LoginPage } from "../../../src/pages/login/loginPage";
import { RegisterPage } from "../../../src/pages/login/registerPage";
import { RecoverPage } from "../../../src/pages/login/recoverPage";
import { shoppingCartPage } from "../../../src/pages/shoppingCart/shoppingCartPage";
import { Wishlist } from "../../../src/pages/wishlist/wishlistPage";
import { Page } from "@playwright/test";

export { expect } from "../../../src/fixture/fixtureBase";

export interface FlowFixtures {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  recoverPage: RecoverPage;
  shoppingCartPage: shoppingCartPage;
  wishlistPage: Wishlist;
}

export const test = base.extend<FlowFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  recoverPage: async ({ page }, use) => {
    await use(new RecoverPage(page));
  },
  shoppingCartPage: async ({ page }, use) => {
    await use(new shoppingCartPage(page));
  },
  wishlistPage: async ({ page }, use) => {
    await use(new Wishlist(page));
  },
});
