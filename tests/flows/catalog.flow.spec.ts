/**
 * Catalog flow tests.
 *
 * End-to-end catalog browsing scenarios:
 * category navigation, search and explore.
 *
 * @e2e — full cross-page scenarios, sequential execution.
 */
import { test, expect } from "./fixture/flow.fixture";
import pagesUrl from "../../src/utils/pagesUrl";

test.describe("Catalog Flow: @e2e", () => {
  test("Browse categories: Books → Computers → Electronics @e2e", async ({
    page,
    homePage,
  }) => {
    await page.goto(pagesUrl.home);

    // Browse Books
    await homePage.catalogComponent.booksTab.click();
    await expect(page).toHaveURL(/books/);
    await expect(page.locator(".page-title")).toBeVisible();

    // Navigate back
    await homePage.headerComponent.clickOnLogo();

    // Browse Computers
    await homePage.catalogComponent.computersTab.click();
    await expect(page).toHaveURL(/computers/);
    await expect(page.locator(".page-title")).toBeVisible();

    // Navigate back
    await homePage.headerComponent.clickOnLogo();

    // Browse Electronics
    await homePage.catalogComponent.electronicsTab.click();
    await expect(page).toHaveURL(/electronics/);
    await expect(page.locator(".page-title")).toBeVisible();
  });

  test("Search product and explore results @e2e", async ({
    page,
    homePage,
  }) => {
    await page.goto(pagesUrl.home);

    // Search for "book"
    await homePage.searchComponent.searchProduct("book");
    await expect(page).toHaveURL(/search/);

    // Verify search results area is visible
    await expect(
      page.locator(".search-results, .product-grid, .product-list")
    ).toBeVisible({ timeout: 10000 });
  });
});
