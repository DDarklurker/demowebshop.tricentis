import { test as base } from "./fixtureBase";
import { App } from "./app";
export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    await use(new App(page));
  }
});
