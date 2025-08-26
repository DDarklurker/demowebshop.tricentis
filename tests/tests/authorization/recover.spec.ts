import { faker } from "@faker-js/faker";
import { test, expect } from "../../../fixture/fixturePage";

test.describe("Recover Tests: @authorization", async () => {
  test.beforeEach(async ({ page, basePage, loginPage }) => {
    await page.goto("/");
    await basePage.verifyBasePage();
    await basePage.headerSection.loginTab.click();
    await expect(page).toHaveURL("/login");
    await loginPage.forgotPasswordTab.click();
    await expect(page).toHaveURL("/passwordrecovery");
  });
  test(
    "Test Case 1: Recovere with correct email.",
    { tag: "@smoke" },
    async ({ recoverPage }) => {
      await recoverPage.emailPlaceholder.fill(process.env.LOGIN as string);
      await recoverPage.recoverButton.click();
      await expect(recoverPage.errorMessage).toContainText(
        "Email with instructions has been sent to you."
      );
    }
  );
  test("Test Case 2: Recovere with incorrect email.", async ({
    recoverPage,
  }) => {
    await recoverPage.emailPlaceholder.fill(faker.internet.email());
    await recoverPage.recoverButton.click();
    await expect(recoverPage.errorMessage).toContainText("Email not found.");
  });
  test("Test Case 3: Recovere with invalid email.", async ({ recoverPage }) => {
    await recoverPage.emailPlaceholder.fill(faker.internet.username());
    await recoverPage.recoverButton.click();
    await expect(recoverPage.validationEmailField).toContainText("Wrong email");
  });
  test("Test Case 4: Recovere with empty email.", async ({ recoverPage }) => {
    await recoverPage.recoverButton.click();
    await expect(recoverPage.validationEmailField).toContainText(
      "Enter your email"
    );
  });
});
