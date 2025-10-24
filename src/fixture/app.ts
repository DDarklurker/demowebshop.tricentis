import { PageHolder } from "../abstract/abstract";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/login/loginPage";
import { RecoverPage } from "../pages/login/recoverPage";
import { RegisterPage } from "../pages/login/registerPage";

export class App extends PageHolder {
  readonly homePage = new HomePage(this.page);
  readonly loginPage = new LoginPage(this.page);
  readonly recoverPage = new RecoverPage(this.page);
  readonly registerPage = new RegisterPage(this.page);
}
