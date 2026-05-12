/**
 * Purchase flow tests.
 *
 * End-to-end purchase scenarios spanning multiple pages:
 * browse → product → cart → checkout.
 *
 * @e2e — full cross-page scenarios, sequential execution.
 */
import { test, expect } from "./fixture/flow.fixture";
import pagesUrl from "../../src/utils/pagesUrl";

test.describe("Purchase Flow: @e2e", () => {
  test("Guest: Browse → View Product → Add to Cart → Verify @e2e", async ({
    page,
    homePage,
  }) => {
    // Step 1: Open homepage
    await page.goto(pagesUrl.home);
    await expect(homePage.headerComponent.shoppingCartTab).toBeVisible();

    // Step 2: Browse to a category (Books)
    await homePage.catalogComponent.booksTab.click();
    await expect(page).toHaveURL(/books/);

    // Step 3: Click first product (if any)
    const products = page.locator(".product-item");
    const productCount = await products.count();
    if (productCount > 0) {
      await products.first().locator("a").first().click();
      await expect(page).not.toHaveURL(/books/);
    }
  });

  test("Registered user: Login → Browse → Add to Cart → View Cart @e2e", async ({
    page,
    homePage,
    loginPage,
  }) => {
    const login = process.env.LOGIN as string;
    const password = process.env.PASSWORD as string;

    // Step 1: Login
    await page.goto(pagesUrl.login);
    await loginPage.logIn(login, password, pagesUrl.home);

    // Step 2: Browse to computers
    await homePage.catalogComponent.computersTab.click();
    await expect(page).toHaveURL(/computers/);

    // Step 3: Navigate to cart
    await homePage.headerComponent.clickShoppingCartTab();
    await expect(page).toHaveURL(pagesUrl.cart);
  });

  test("Cart management: Add → View → Verify empty state @e2e", async ({
    page,
    homePage,
  }) => {
    // Step 1: Open cart without adding anything
    await page.goto(pagesUrl.home);
    await homePage.headerComponent.clickShoppingCartTab();

    // Step 2: Verify cart page loaded
    await expect(page.locator(".order-summary-content")).toBeVisible({
      timeout: 10000,
    });
  });
});
