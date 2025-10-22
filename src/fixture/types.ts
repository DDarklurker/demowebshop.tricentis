import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/login/loginPage";
import { RecoverPage } from "../pages/login/recoverPage";
import { RegisterPage } from "../pages/login/registerPage";

export type TLoginPage = {
  basePage: HomePage;
  loginPage: LoginPage;
  recoverPage: RecoverPage;
  registerPage: RegisterPage;
};

export type THomePage = {
  basePage: HomePage;
};
export type TCategories = {
  // booksPage: BooksPage;
};
