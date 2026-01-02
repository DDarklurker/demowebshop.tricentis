import { test } from "../../../src/fixture/fixturePage";
import { faker } from "@faker-js/faker";
import pagesUrl from "../../../src/utils/pagesUrl";
import { expect } from "@playwright/test";
const login = process.env.LOGIN as string;
const password = process.env.PASSWORD as string;
test.describe("Login Tests: @authorization", () => {
  test.beforeEach(async ({ app: { homePage } }) => {
    await homePage.open(pagesUrl.home);
    await homePage.headerComponent.clickLoginTab();
  });
  test(
    "Test Case 1: Login User with correct email and password.",
    { tag: "@smoke" },
    async ({ app: { homePage, loginPage } }) => {
      await loginPage.logIn(login, password, pagesUrl.home);
      await expect(homePage.headerComponent.customerInfoTab).toContainText(
        login
      );
    }
  );
  test(
    "Test Case 2: Login User with incorrect password.",
    { tag: "@smoke" },
    async ({ app: { loginPage } }) => {
      await loginPage.logIn(login, faker.internet.password(), pagesUrl.login);
      await expect(loginPage.incorrectLoginMessage).toContainText(
        "The credentials provided are incorrect"
      );
    }
  );
  test("Test Case 3:  Login User with incorrect email.", async ({
    app: { loginPage }
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
    app: { loginPage }
  }) => {
    await loginPage.enterLogin(faker.internet.username());
    await loginPage.clickLoginButton();
    await expect(loginPage.validationEmailField).toContainText(
      "Please enter a valid email address."
    );
  });
  test("Test Case 5: Click the 'Log in' button with no input", async ({
    app: { loginPage }
  }) => {
    await loginPage.clickLoginButton();
    await expect(loginPage.incorrectLoginMessage).toContainText(
      "No customer account found"
    );
  });
  test("Test Case 6: verify UI elements on page", async ({
    app: { loginPage }
  }) => {
    await expect(loginPage.emailPlaceholder).toBeVisible();
    await expect(loginPage.passwordPlaceholder).toBeVisible();
    await expect(loginPage.rememberMeCheckBox).toBeVisible();
    await expect(loginPage.forgotPasswordTab).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.registerButton).toBeVisible();
  });
  test.only("mock login on Demo Web Shop", async ({
    page,
    app: { loginPage }
  }) => {
    await page.route("**/login", async (route) => {
      await route.fulfill({
        status: 200,
        headers: {
          location: "/"
        }
      });
    });

    await loginPage.logIn("kek@mail.com", password, pagesUrl.home);
  });
});
