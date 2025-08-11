import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/base/basePage';
import { LoginPage } from '../../pages/login/loginPage';
require('dotenv').config();

test.describe('Login Tests: @login', () =>{
    let basePage: BasePage;
    let loginPage: LoginPage;
    test.beforeEach(async({page})=>{
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        await page.goto('/');
        await basePage.verifyBasePage();
    });
    test('Login User with correct email and password: @login', async ({page}) => {
        await basePage.loginTab.click();
        await expect(page).toHaveURL('/login');
        await loginPage.emailPlaceholder.fill(process.env.LOGIN as string);
        await loginPage.passwordPlaceholder.fill(process.env.PASSWORD as string);
        await loginPage.loginButton.click();
        await expect(basePage.customerInfoTab).toContainText(process.env.LOGIN as string);
    });
});