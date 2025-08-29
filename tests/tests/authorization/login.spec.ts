import { test, expect } from "../../../src/fixture/fixturePage";
import { faker } from "@faker-js/faker";
import pagesUrl from "../../../src/utils/pagesUrl";
const login = process.env.LOGIN as string;
const password = process.env.PASSWORD as string;
test.describe("Login Tests: @authorization", async () => {
  test.beforeEach(async ({ page, basePage }) => {
    await page.goto(pagesUrl.home);
    await basePage.clickLoginTab();
  });
  test(
    "Test Case 1: Login User with correct email and password.",
    { tag: "@smoke" },
    async ({ basePage, loginPage }) => {
      await loginPage.logIn(login, password, pagesUrl.home);
      await expect(basePage.customerInfoTab).toContainText(login);
    }
  );
  test(
    "Test Case 2: Login User with incorrect password.",
    { tag: "@smoke" },
    async ({ loginPage }) => {
      await loginPage.logIn(login, faker.internet.password(), pagesUrl.login);
      await expect(loginPage.incorrectLoginMessage).toContainText(
        "The credentials provided are incorrect"
      );
    }
  );
  test("Test Case 3:  Login User with incorrect email.", async ({
    loginPage,
  }) => {
    await loginPage.logIn(
      faker.internet.email(),
      faker.internet.password(),
      pagesUrl.login
    );
    await expect(loginPage.incorrectLoginMessage).toContainText(
      "No customer account found"
    );
  });
  test("Test Case 4:  Login User with invalid email.", async ({
    loginPage,
  }) => {
    await loginPage.enterLogin(faker.internet.username());
    await loginPage.clickLoginButton();
    await expect(loginPage.validationEmailField).toContainText(
      "Please enter a valid email address."
    );
  });
  test("Test Case 5: Click the 'Log in' button with no input", async ({
    loginPage,
  }) => {
    await loginPage.clickLoginButton();
    await expect(loginPage.incorrectLoginMessage).toContainText(
      "No customer account found"
    );
  });
  test("Test Case 6: verify UI elements on page", async ({ loginPage }) => {
    await expect(loginPage.emailPlaceholder).toBeVisible();
    await expect(loginPage.passwordPlaceholder).toBeVisible();
    await expect(loginPage.rememberMeCheckBox).toBeVisible();
    await expect(loginPage.forgotPasswordTab).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.registerButton).toBeVisible();
  });
});
