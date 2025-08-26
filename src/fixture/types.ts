import { BasePage } from "../pages/basePage";
import { LoginPage } from "../pages/login/loginPage";
import { RecoverPage } from "../pages/login/recoverPage";

export type TLoginPage = {
  basePage: BasePage;
  loginPage: LoginPage;
  recoverPage: RecoverPage;
};
