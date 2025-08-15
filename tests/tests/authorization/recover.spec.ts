import test, { expect } from "@playwright/test";
import { BasePage } from "../../../pages/base/basePage";
import { LoginPage } from "../../../pages/login/loginPage";
import { RecoverPage } from "../../../pages/login/passwordrecovery/recoverPage";
import { faker } from "@faker-js/faker";


test.describe('Recover Tests: @authorization', async () => {
    let basePage: BasePage;
    let loginPage: LoginPage;
    let recoverPage: RecoverPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        recoverPage = new RecoverPage(page);
        await page.goto('/');
        await basePage.verifyBasePage();
        await basePage.loginTab.click();
        await expect(page).toHaveURL('/login');
        await loginPage.forgotPasswordTab.click();
        await expect(page).toHaveURL('/passwordrecovery');
    });
    test('Test Case 1: Recovere with correct email.', {tag: '@smoke'}, async () => {
        await recoverPage.emailPlaceholder.fill(process.env.LOGIN as string);
        await recoverPage.recoverButton.click();
        await expect(recoverPage.errorMessage).toContainText('Email with instructions has been sent to you.');
    });
    test('Test Case 2: Recovere with incorrect email.', async () => {
        await recoverPage.emailPlaceholder.fill(faker.internet.email());
        await recoverPage.recoverButton.click();
        await expect(recoverPage.errorMessage).toContainText('Email not found.');
    });
    test('Test Case 3: Recovere with invalid email.', async () => {
        await recoverPage.emailPlaceholder.fill(faker.internet.username());
        await recoverPage.recoverButton.click();
        await expect(recoverPage.validationEmailField).toContainText('Wrong email');
    });
    test('Test Case 4: Recovere with empty email.', async () => {
        await recoverPage.recoverButton.click();
        await expect(recoverPage.validationEmailField).toContainText('Enter your email');
    });
});