import { HomePage } from "../pages/basePage";
import { LoginPage } from "../pages/login/loginPage";
import { RecoverPage } from "../pages/login/recoverPage";
import { RegisterPage } from "../pages/login/registerPage";
import { ProductDetail } from "../pages/product/productDetail";

export type TLoginPage = {
  basePage: HomePage;
  loginPage: LoginPage;
  recoverPage: RecoverPage;
  registerPage: RegisterPage;
};

export type THomePage = {
  basePage: HomePage;
  productDetail: ProductDetail;
};
