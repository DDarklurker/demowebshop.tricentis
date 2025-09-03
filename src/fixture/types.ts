import { BasePage } from "../pages/basePage";
import { LoginPage } from "../pages/login/loginPage";
import { RecoverPage } from "../pages/login/recoverPage";
import { RegisterPage } from "../pages/login/registerPage";

export type TLoginPage = {
  basePage: BasePage;
  loginPage: LoginPage;
  recoverPage: RecoverPage;
  registerPage: RegisterPage;
};
