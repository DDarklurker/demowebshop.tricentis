import { test, expect } from "../../../fixture/fixturePage";
import { faker } from "@faker-js/faker";

test.describe("Login Tests: @authorization", () => {
  test.beforeEach(async ({ page, basePage }) => {
    await page.goto("/");
    await basePage.verifyBasePage();
    await basePage.headerSection.loginTab.click();
    await expect(page).toHaveURL("/login");
  });
  test(
    "Test Case 1: Login User with correct email and password.",
    { tag: "@smoke" },
    async ({ basePage, loginPage }) => {
      await loginPage.login(
        process.env.LOGIN as string,
        process.env.PASSWORD as string
      );
      await expect(basePage.headerSection.customerInfoTab).toContainText(
        process.env.LOGIN as string
      );
      await basePage.headerSection.logoutTab.click();
      await expect(basePage.headerSection.loginTab).toBeVisible;
    }
  );
  test(
    "Test Case 2: Login User with incorrect password.",
    { tag: "@smoke" },
    async ({ loginPage }) => {
      await loginPage.login(
        process.env.LOGIN as string,
        faker.internet.password()
      );
      await expect(loginPage.incorrectLoginMessage).toContainText(
        "The credentials provided are incorrect"
      );
    }
  );
  test("Test Case 3:  Login User with incorrect email.", async ({
    loginPage,
  }) => {
    await loginPage.emailPlaceholder.fill(faker.internet.email());
    await loginPage.loginButton.click();
    await expect(loginPage.incorrectLoginMessage).toContainText(
      "No customer account found"
    );
  });
  test("Test Case 4:  Login User with invalid email.", async ({
    loginPage,
  }) => {
    await loginPage.emailPlaceholder.fill(faker.internet.username());
    await loginPage.loginButton.click();
    await expect(loginPage.validationEmailField).toContainText(
      "Please enter a valid email address."
    );
  });
});
