import { HomePage } from "../pages/basePage";
import { LoginPage } from "../pages/login/loginPage";
import { RecoverPage } from "../pages/login/recoverPage";
import { RegisterPage } from "../pages/login/registerPage";
import { FeaturedProductsPage } from "../pages/main/featuredProductsPage";

export type TLoginPage = {
  basePage: HomePage;
  loginPage: LoginPage;
  recoverPage: RecoverPage;
  registerPage: RegisterPage;
};

export type THomePage = {
  basePage: HomePage;
  featuredProductsPage: FeaturedProductsPage;
};
