import test, { expect } from "@playwright/test";
import { BasePage } from "../../../pages/base/basePage";
import { LoginPage } from "../../../pages/login/loginPage";

test.describe('Recover Tests:@authorization', async () => {
    let basePage: BasePage;
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        await page.goto('/');
        await basePage.verifyBasePage();
        await basePage.loginTab.click();
        await expect(page).toHaveURL('/login');
        await loginPage.forgotPasswordTab.click();
        await expect(page).toHaveURL('/passwordrecovery');
    });
    test('Test Case 1: Recovere with correct email:@authorization', async () => {
        
    })
});