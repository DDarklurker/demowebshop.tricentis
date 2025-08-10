import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/base/basePage';
import { LoginPage } from '../../pages/login/loginPage'

test.describe('Login Tests: @login', () =>{
    let basePage: BasePage;
    let loginPage: LoginPage;
    test.beforeEach(async({page})=>{
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        await page.goto('/');
        await basePage.verifyBasePage();
    });
});