import { App } from "./app";
import { test as base } from "./fixtureBase";
export const test = base.extend<{ app: App; cleanCart: void }>({
  app: async ({ page }, use) => {
    await use(new App(page));
  },
  cleanCart: async ({ app }, use) => {
    await app.shoppingCartPage.clearCart();
    await use();
    await app.shoppingCartPage.clearCart();
  },
});
