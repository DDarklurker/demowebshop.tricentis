import { test as base } from "./fixtureBase";
import { App } from "./app";
export const test = base.extend<{ app: App }>({
  app: ({ page }, use) => {
    use(new App(page));
  }
});
