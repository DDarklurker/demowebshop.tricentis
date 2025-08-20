import { BasePage } from "../pages/base/basePage";
import { LoginPage } from "../pages/login/loginPage";
import { RecoverPage } from "../pages/login/passwordrecovery/recoverPage";

export type TLoginPage = {
  basePage: BasePage;
  loginPage: LoginPage;
  recoverPage: RecoverPage;
};
