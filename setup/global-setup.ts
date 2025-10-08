import { chromium, type FullConfig } from '@playwright/test';
import { LoginPage } from '../src/pages/login/loginPage';
import { HomePage } from '../src/pages/basePage';

async function globalSetup(config: FullConfig) {
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await page.goto(baseURL!);
    await homePage.headerComponent.loginTab.click();
    await page.waitForURL('**/login');
    await loginPage.emailPlaceholder.fill(process.env.LOGIN as string);
    await loginPage.passwordPlaceholder.fill(process.env.PASSWORD as string);
    await loginPage.loginButton.click();
    await page.waitForURL(baseURL!);
    await page.context().storageState({ path: storageState as string });
    await browser.close();
}

export default globalSetup;
