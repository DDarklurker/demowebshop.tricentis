import { test as base } from "./fixtureBase";
export { expect } from "./fixtureBase";
import { LoginPage } from "../pages/login/loginPage";
import { RecoverPage } from "../pages/login/recoverPage";
import { TLoginPage } from "./types";
import { BasePage } from "../pages/basePage";
export const test = base.extend<TLoginPage>({
  basePage: ({ page }, use) => {
    const basePage = new BasePage(page);
    use(basePage);
  },
  loginPage: ({ page }, use) => {
    const loginPage = new LoginPage(page);
    use(loginPage);
  },
  recoverPage: ({ page }, use) => {
    const recoverPage = new RecoverPage(page);
    use(recoverPage);
  },
});
