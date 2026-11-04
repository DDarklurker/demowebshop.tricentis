import { test as base, ConsoleMessage } from "@playwright/test";
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await use(page);
  }
});
