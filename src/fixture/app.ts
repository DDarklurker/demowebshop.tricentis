import { PageHolder } from "../abstract/abstract";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/login/loginPage";
import { RecoverPage } from "../pages/login/recoverPage";
import { RegisterPage } from "../pages/login/registerPage";
import { Product } from "../pages/products/product";
import { ProductDetailPage } from "../pages/products/productDetailPage";

export class App extends PageHolder {
  readonly homePage = new HomePage(this.page);
  readonly loginPage = new LoginPage(this.page);
  readonly recoverPage = new RecoverPage(this.page);
  readonly registerPage = new RegisterPage(this.page);
  readonly product = new Product(this.page);
  readonly productDetailPage = new ProductDetailPage(this.page);
}
