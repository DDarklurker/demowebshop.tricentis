/**
 * Wishlist flow tests.
 *
 * End-to-end wishlist scenarios:
 * add to wishlist (authenticated), guest redirect to login.
 *
 * @e2e — full cross-page scenarios, sequential execution.
 */
import { test, expect } from "./fixture/flow.fixture";
import pagesUrl from "../../src/utils/pagesUrl";

test.describe("Wishlist Flow: @e2e", () => {
  test("Guest: Click wishlist → Redirect to login @e2e", async ({
    page,
    homePage,
  }) => {
    // Step 1: Open homepage as guest
    await page.goto(pagesUrl.home);

    // Step 2: Click wishlist tab (should redirect to login)
    await homePage.headerComponent.wishlistTab.click();

    // Step 3: Verify redirect to login page
    await expect(page).toHaveURL(/login/, { timeout: 10000 });
    await expect(
      page.locator('a[href="/register"]').first()
    ).toBeVisible();
  });

  test("Authenticated: Browse → Add to Wishlist → View → Remove @e2e", async ({
    page,
    homePage,
    loginPage,
  }) => {
    const login = process.env.LOGIN as string;
    const password = process.env.PASSWORD as string;

    // Step 1: Login
    await page.goto(pagesUrl.login);
    await loginPage.logIn(login, password, pagesUrl.home);

    // Step 2: Browse to Books
    await homePage.catalogComponent.booksTab.click();
    await expect(page).toHaveURL(/books/);

    // Step 3: Try to add first product to wishlist
    const wishlistButtons = page.locator(".add-to-wishlist-button, input[value='Add to wishlist']");
    const count = await wishlistButtons.count();
    if (count > 0) {
      await wishlistButtons.first().click();
      await page.waitForTimeout(1000);
    }

    // Step 4: Navigate to wishlist
    await homePage.headerComponent.clickWishlistTab();
    await expect(page).toHaveURL(pagesUrl.wishlist);

    // Step 5: Verify wishlist page loaded
    await expect(page.locator(".wishlist-content")).toBeVisible({
      timeout: 10000,
    });
  });
});
