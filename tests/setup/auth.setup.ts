import { expect } from "@playwright/test";
import { test as setup } from "../../src/fixture/fixturePage";
import pagesUrl from "../../src/utils/pagesUrl";

const authFile = "storage/state.json";

setup("authenticate", async ({ app: { homePage, loginPage }, page }) => {
  const login = process.env.LOGIN;
  const password = process.env.PASSWORD;
  if (!login || !password) {
    throw new Error("LOGIN and PASSWORD must be set (see .env.example)");
  }
  await homePage.open(pagesUrl.home);
  await homePage.headerComponent.clickLoginTab();
  await loginPage.logIn(login, password, pagesUrl.home);
  await expect(homePage.headerComponent.customerInfoTab).toContainText(login);
  await page.context().storageState({ path: authFile });
});
