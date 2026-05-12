/**
 * Authentication flow tests.
 *
 * End-to-end authentication scenarios:
 * register → logout → login, and password recovery flow.
 *
 * @e2e — full cross-page scenarios, sequential execution.
 */
import { test, expect } from "./fixture/flow.fixture";
import { faker } from "@faker-js/faker";
import pagesUrl from "../../src/utils/pagesUrl";

test.describe("Authentication Flow: @e2e", () => {
  test("Register → Logout → Login @e2e", async ({
    page,
    homePage,
    registerPage,
    loginPage,
  }) => {
    const email = faker.internet.email();
    const pass = faker.internet.password({ length: 8 });
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    // Step 1: Register
    await page.goto(pagesUrl.register);
    await registerPage.registerUser(
      "Male",
      firstName,
      lastName,
      email,
      pass,
      pass
    );
    await registerPage.clickRegisterButton();

    // Verify registration result page
    await expect(page).toHaveURL(/registerresult/);

    // Step 2: Logout (click continue → then logout)
    await page.goto(pagesUrl.home);
    const logoutVisible = await homePage.headerComponent.logoutTab.isVisible().catch(() => false);
    if (logoutVisible) {
      await homePage.headerComponent.clickLogoutTab();
    }

    // Step 3: Login with new credentials
    await homePage.headerComponent.clickLoginTab();
    await loginPage.logIn(email, pass, pagesUrl.home);

    // Verify logged in
    await expect(homePage.headerComponent.customerInfoTab).toBeVisible();
  });

  test("Login page → Recover Password → Verify message @e2e", async ({
    page,
    homePage,
    loginPage,
    recoverPage,
  }) => {
    // Step 1: Navigate to login → forgot password
    await page.goto(pagesUrl.home);
    await homePage.headerComponent.clickLoginTab();
    await loginPage.clickForgotPassword();

    // Step 2: Enter email and submit
    await recoverPage.enterLogin(process.env.LOGIN as string);
    await recoverPage.clickRecoverButton();

    // Step 3: Verify result message
    await expect(recoverPage.resultMessage).toBeVisible({ timeout: 10000 });
    const text = await recoverPage.resultMessage.textContent();
    expect(text).toMatch(/sent|instructions|recover/i);
  });
});
