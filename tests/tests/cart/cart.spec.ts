import { expect } from "@playwright/test";
import { test } from "../../../src/fixture/fixturePage";
test.describe("Cart: @cart", async () => {
  test.beforeEach(async ({ app: { homePage } }) => {
    await homePage.open();
  });
  test("Test Case 1 @smoke: add product to cart from category(Book - Computing and Internet)", async ({
    app: { homePage, product, shoppingCartPage },
  }) => {
    await homePage.catalogComponent.booksTab.click();
    await product.categoryProductsComponent.addToCartByName("Computing and Internet");
    await expect(homePage.headerComponent.productHasBeenAdded).toContainText(
      "The product has been added to your",
    );
    await expect(homePage.headerComponent.shoppingCartTabCounter).toHaveText("(1)");
    await homePage.headerComponent.clickShoppingCartTab();
    await expect(shoppingCartPage.itemCartName).toHaveText("Computing and Internet");
    await expect(shoppingCartPage.itemQuantityText).toHaveValue("1");
  });
  test("Test Case 2 @smoke: add product to cart from detail product(Book - Computing and Internet)", async ({
    app: { homePage, product, productDetailPage, shoppingCartPage },
  }) => {
    await homePage.catalogComponent.booksTab.click();
    await product.openProductDetailsByName("Computing and Internet");
    await productDetailPage.addToCartButton.click();
    await expect(homePage.headerComponent.productHasBeenAdded).toContainText(
      "The product has been added to your",
    );
    await expect(homePage.headerComponent.shoppingCartTabCounter).toHaveText("(1)");
    await homePage.headerComponent.clickShoppingCartTab();
    await expect(shoppingCartPage.itemCartName).toHaveText("Computing and Internet");
    await expect(shoppingCartPage.itemQuantityText).toHaveValue("1");
  });
});
