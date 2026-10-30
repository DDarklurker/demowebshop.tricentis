import { App } from "./app";
import { test as base } from "./fixtureBase";
export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    await use(new App(page));
  },
});
