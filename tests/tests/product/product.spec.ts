import { expect } from "@playwright/test";
import { test } from "../../../src/fixture/fixturePage";
import pagesUrl from "../../../src/utils/pagesUrl";

test.describe("Product: @product", async () => {
  test.beforeEach(async ({ app: { homePage } }) => {
    await homePage.open(pagesUrl.home);
  });
  test("Test Case 1 @smoke: Open a product category (e.g., Gift Card)", async ({
    app: { homePage, product, productDetailPage }
  }) => {
    await homePage.catalogComponent.giftCardsTab.click();
    await product.openProductDetailsByName("$25 Virtual Gift Card");
    await expect(productDetailPage.productName).toBeVisible();
  });
});
