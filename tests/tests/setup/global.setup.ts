import { test as setup } from "../../../src/fixture/fixturePage";
import pagesUrl from "../../../src/utils/pagesUrl";
setup("login and save session", async ({ app: { homePage, loginPage }, page }) => {
  await homePage.open(pagesUrl.home);
  await homePage.headerComponent.clickLoginTab();
  await loginPage.logIn(process.env.LOGIN as string, process.env.PASSWORD as string, pagesUrl.home);
  await page.context().storageState({ path: "storage/state.json" });
});
