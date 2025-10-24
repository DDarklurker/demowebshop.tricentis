import { faker } from "@faker-js/faker";
import { test } from "../../../src/fixture/fixturePage";
import pagesUrl from "../../../src/utils/pagesUrl";
import { expect } from "@playwright/test";

const login = process.env.LOGIN as string;
test.describe("Recover Tests: @authorization", async () => {
  test.beforeEach(async ({ app: { homePage, loginPage } }) => {
    await homePage.open(pagesUrl.home);
    await homePage.headerComponent.clickLoginTab();
    await loginPage.clickForgotPassword();
  });
  test(
    "Test Case 1: Recovere with correct email.",
    { tag: "@smoke" },
    async ({ app: { recoverPage } }) => {
      await recoverPage.recoverLogin(login, pagesUrl.recover);
      await expect(recoverPage.resultMessage).toContainText(
        "Email with instructions has been sent to you."
      );
    }
  );
  test("Test Case 2: Recovere with incorrect email.", async ({
    app: { recoverPage }
  }) => {
    await recoverPage.recoverLogin(faker.internet.email(), pagesUrl.recover);
    await expect(recoverPage.resultMessage).toContainText("Email not found.");
  });
  test("Test Case 3: Recovere with invalid email.", async ({
    app: { recoverPage }
  }) => {
    await recoverPage.recoverLogin(faker.internet.username(), pagesUrl.recover);
    await expect(recoverPage.validationMessage).toContainText("Wrong email");
  });
  test("Test Case 4: Recovere with empty email.", async ({
    app: { recoverPage }
  }) => {
    await recoverPage.clickRecoverButton();
    await expect(recoverPage.validationMessage).toContainText(
      "Enter your email"
    );
  });
  test("Test Case 5: verify UI elements on page", async ({
    app: { recoverPage }
  }) => {
    await expect(recoverPage.emailPlaceholder).toBeVisible();
    await expect(recoverPage.recoverButton).toBeVisible();
  });
});
