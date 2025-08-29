import { test } from "../../../src/fixture/fixturePage";
import pagesUrl from "../../../src/utils/pagesUrl";

test.describe("Shopping cart: @shopping", async () => {
  test.beforeEach(async ({ page, homePage }) => {
    await page.goto(pagesUrl.home);
    await homePage.clickAddToCardFirstProduct();
  });
  test("", async () => {});
});
