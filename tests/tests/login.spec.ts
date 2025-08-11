import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/base/basePage';
import { LoginPage } from '../../pages/login/loginPage';
require('dotenv').config();
import { faker } from '@faker-js/faker';


test.describe('Login Tests: @login', () =>{
    let basePage: BasePage;
    let loginPage: LoginPage;
    test.beforeEach(async({page})=>{
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        await page.goto('/');
        await basePage.verifyBasePage();
        await basePage.loginTab.click();
        await expect(page).toHaveURL('/login');
    });
    test('Login User with correct email and password: @login', async () => {
        await loginPage.emailPlaceholder.fill(process.env.LOGIN as string);
        await loginPage.passwordPlaceholder.fill(process.env.PASSWORD as string);
        await loginPage.loginButton.click();
        await expect(basePage.customerInfoTab).toContainText(process.env.LOGIN as string);
        await basePage.logoutTab.click();
        await expect(basePage.customerInfoTab).not.toContainText(process.env.LOGIN as string);
    });
    test('Test Case 2: Login User with incorrect email and password: @login', async () => {
        await loginPage.emailPlaceholder.fill(faker.internet.email());
        await loginPage.passwordPlaceholder.fill(faker.internet.password());
        await loginPage.loginButton.click();
        await expect(loginPage.incorrectLoginMessage).toContainText('Login was unsuccessful.');
    });
});