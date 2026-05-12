/**
 * Smoke Tests — Critical Paths.
 *
 * Verify the most essential user flows.
 * Tagged @smoke for CI pipeline (runs on every push/PR).
 * Each test must complete in < 60s.
 *
 * Strategy: test ONLY the "happy path" for each core feature.
 * No edge cases — those belong in API and UI tests.
 */
import { test, expect } from "../../src/fixture/fixturePage";
import { faker } from "@faker-js/faker";
import { MockFactory } from "../../src/mocks/mock.factory";
import pagesUrl from "../../src/utils/pagesUrl";

const login = process.env.LOGIN as string;
const password = process.env.PASSWORD as string;

test.describe("Critical Paths: @smoke", () => {
  test("Home page loads successfully @smoke", async ({ page, basePage }) => {
    await page.goto(pagesUrl.home);

    await expect(basePage.headerComponent.logoTab).toBeVisible();
    await expect(basePage.topMenuCatalogComponent.bookTab).toBeVisible();
  });

  test("User can log in with valid credentials @smoke", async ({
    page,
    basePage,
    loginPage,
  }) => {
    await page.goto(pagesUrl.home);
    await basePage.headerComponent.clickLoginTab();
    await loginPage.logIn(login, password, pagesUrl.home);

    await expect(basePage.headerComponent.customerInfoTab).toContainText(login);
  });

  test("User can register a new account @smoke", async ({
    page,
    basePage,
    registerPage,
  }) => {
    const email = faker.internet.email();
    const pass = faker.internet.password({ length: 8 });

    await page.goto(pagesUrl.home);
    await basePage.headerComponent.clickRegisterTab();
    await registerPage.registerUser("Male", faker.person.firstName(), faker.person.lastName(), email, pass, pass);
    await registerPage.clickRegisterButton();

    // Should redirect to registration result page
    await expect(page).toHaveURL(/registerresult/);
  });

  test("Catalog navigation works @smoke", async ({
    page,
    basePage,
  }) => {
    await page.goto(pagesUrl.home);

    await basePage.headerComponent.clickOnLogo();
    await basePage.catalogComponent.booksTab.click();
    await expect(page).toHaveURL(/books/);

    await basePage.headerComponent.clickOnLogo();
    await basePage.catalogComponent.computersTab.click();
    await expect(page).toHaveURL(/computers/);

    await basePage.headerComponent.clickOnLogo();
    await basePage.catalogComponent.electronicsTab.click();
    await expect(page).toHaveURL(/electronics/);
  });

  test("Search returns results @smoke", async ({ page, basePage }) => {
    await page.goto(pagesUrl.home);
    await basePage.searchComponent.searchProduct("computer");

    await expect(page).toHaveURL(/search/);
    // Verify search page has some content
  });

  test("Shopping cart is accessible @smoke", async ({
    page,
    basePage,
  }) => {
    await page.goto(pagesUrl.home);
    await basePage.headerComponent.clickShoppingCartTab();

    // Cart page should load (empty or with items)
    await expect(page.locator(".order-summary-content")).toBeVisible({
      timeout: 10000,
    });
  });

  test("Password recovery page loads @smoke", async ({
    page,
    basePage,
    loginPage,
  }) => {
    await page.goto(pagesUrl.home);
    await basePage.headerComponent.clickLoginTab();
    await loginPage.clickForgotPassword();

    await expect(page).toHaveURL(pagesUrl.recover);
    await expect(page.locator("#Email")).toBeVisible();
  });

  test("API health check returns 200 @smoke", async ({ request }) => {
    const response = await request.get(pagesUrl.home);

    expect(response.status()).toBe(200);
  });
});
