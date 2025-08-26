import { chromium, type FullConfig } from "@playwright/test";
import { LoginPage } from "../pages/login/loginPage";
import { BasePage } from "../pages/base/basePage";

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const basePage = new BasePage(page);
  const loginPage = new LoginPage(page);
  await page.goto(baseURL!);
  await basePage.topSection.verifyTopSection();
  await basePage.headerSection.loginTab.click();
  await page.waitForURL("**/login");
  await loginPage.login(
    process.env.LOGIN as string,
    process.env.PASSWORD as string
  );
  await page.waitForURL(baseURL!);
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
