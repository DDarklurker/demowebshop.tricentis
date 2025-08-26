import { faker } from "@faker-js/faker";
import { test, expect } from "../../../src/fixture/fixturePage";
import pagesUrl from "../../../src/utils/pagesUrl";

const login = process.env.LOGIN as string;
test.describe("Recover Tests: @authorization", async () => {
  test.beforeEach(async ({ page, basePage, loginPage }) => {
    await page.goto(pagesUrl.home);
    await basePage.clickLoginTab();
    await loginPage.clickForgotPassword();
  });
  test(
    "Test Case 1: Recovere with correct email.",
    { tag: "@smoke" },
    async ({ recoverPage }) => {
      await recoverPage.recoverLogin(login, pagesUrl.recover);
      await expect(recoverPage.resultMessage).toContainText(
        "Email with instructions has been sent to you."
      );
    }
  );
  test("Test Case 2: Recovere with incorrect email.", async ({
    recoverPage,
  }) => {
    await recoverPage.recoverLogin(faker.internet.email(), pagesUrl.recover);
    await expect(recoverPage.resultMessage).toContainText("Email not found.");
  });
  test("Test Case 3: Recovere with invalid email.", async ({ recoverPage }) => {
    await recoverPage.recoverLogin(faker.internet.username(), pagesUrl.recover);
    await expect(recoverPage.validationMessage).toContainText("Wrong email");
  });
  test("Test Case 4: Recovere with empty email.", async ({ recoverPage }) => {
    await recoverPage.clickRecoverButton();
    await expect(recoverPage.validationMessage).toContainText(
      "Enter your email"
    );
  });
});
