import { expect, Locator } from "@playwright/test";
import { HomePage } from "../basePage";
import pagesUrl from "../../utils/pagesUrl";
export class LoginPage extends HomePage {
  readonly emailPlaceholder: Locator;
  readonly passwordPlaceholder: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckBox: Locator;
  readonly forgotPasswordTab: Locator;
  readonly newCustomerButton: Locator;
  readonly incorrectLoginMessage: Locator;
  readonly validationEmailField: Locator;
  readonly registerButton: Locator;
  constructor(page) {
    super(page);
    this.emailPlaceholder = page.locator("#Email");
    this.passwordPlaceholder = page.locator("#Password");
    this.loginButton = page.locator("input[type='submit'][value='Log in']");
    this.rememberMeCheckBox = page.locator("#RememberMe");
    this.forgotPasswordTab = page.locator('[href="/passwordrecovery"]');
    this.newCustomerButton = page.locator(
      `[onclick="location.href='/register'"]`
    );
    this.incorrectLoginMessage = page.locator(
      "[class=validation-summary-errors]"
    );
    this.validationEmailField = page.locator(
      "[class='field-validation-error']"
    );
    this.registerButton = page.locator(`[onclick="location.href='/register'"]`);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
  async enterLogin(login: string) {
    await this.emailPlaceholder.fill(login);
    await expect(this.emailPlaceholder).toHaveValue(login);
  }
  async enterPassword(password: string) {
    await this.passwordPlaceholder.fill(password);
    await expect(this.passwordPlaceholder).toHaveValue(password);
  }
  async logIn(login: string, password: string, resultPage: string) {
    await this.enterLogin(login);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await expect(this.page).toHaveURL(resultPage);
  }
  async clickForgotPassword() {
    await this.forgotPasswordTab.click();
    await expect(this.page).toHaveURL(pagesUrl.recover);
  }
}
