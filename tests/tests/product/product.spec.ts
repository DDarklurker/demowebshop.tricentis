import { expect } from "@playwright/test";
import { test } from "../../../src/fixture/fixturePage";
import pagesUrl from "../../../src/utils/pagesUrl";

test.describe("Product: @product", async () => {
  // test.beforeEach(async ({ app: { homePage } }) => {
  //   await homePage.open(pagesUrl.home);
  // });
  // test("Test Case 1 @smoke: Open a product category (e.g., Gift Card)", async ({
  //   app: { homePage, product, productDetailPage }
  // }) => {
  //   await homePage.catalogComponent.giftCardsTab.click();
  //   await product.openProductDetailsByName("$25 Virtual Gift Card");
  //   await expect(productDetailPage.productName).toBeVisible();
  // });

  test("mock login on Demo Web Shop", async ({ page }) => {
    await page.route("**/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          // Залежно від API/форми — підстав свій формат
          token: "MOCK_TOKEN_12345",
          user: { id: 1, email: "mock@example.com" }
        })
      });
    });

    await page.goto("https://demowebshop.tricentis.com/login");
    // В залежності від того, як сайт працює — можеш спробувати сабміт форми:
    await page.fill("#Email", "test@example.com");
    await page.fill("#Password", "password");
    await page.click('input[value="Log in"]'); // Це селектор кнопки на Demo Web Shop

    // Тепер сайт має отримати нашу мок-відповідь та вважати, що ми залогінені
    // Наприклад, перевіримо що зʼявився лінк Log out
    await expect(page.locator('a[href="/logout"]')).toBeVisible();
  });
});
