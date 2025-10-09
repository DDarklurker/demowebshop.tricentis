import { test } from "../../../src/fixture/fixturePage";
import pagesUrl from "../../../src/utils/pagesUrl";

test.describe("Card Tests: @card", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pagesUrl.home);
  });
  test("Quick add 14.1-inch Laptop", async () => {});
});
