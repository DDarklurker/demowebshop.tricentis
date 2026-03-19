import { expect } from "@playwright/test";
import { AbstractPage } from "../../abstract/abstract";
import pagesUrl from "../../utils/pagesUrl";
import { step } from "../../helpers/decorators/step";
export class LoginPage extends AbstractPage {
  url?: string | undefined;
  readonly emailPlaceholder = this.page.locator("#Email");
  readonly passwordPlaceholder = this.page.locator("#Password");
  readonly loginButton = this.page.locator(
    "input[type='submit'][value='Log in']"
  );
  readonly rememberMeCheckBox = this.page.locator("#RememberMe");
  readonly forgotPasswordTab = this.page.locator('[href="/passwordrecovery"]');
  readonly newCustomerButton = this.page.locator(
    `[onclick="location.href='/register'"]`
  );
  readonly incorrectLoginMessage = this.page.locator(
    "[class=validation-summary-errors]"
  );
  readonly validationEmailField = this.page.locator(
    "[class='field-validation-error']"
  );
  readonly registerButton = this.page.locator(
    `[onclick="location.href='/register'"]`
  );
  @step("Click login button")
  async clickLoginButton() {
    await this.loginButton.click();
  }
  @step("Enter login")
  async enterLogin(login: string) {
    await this.emailPlaceholder.fill(login);
    await expect(this.emailPlaceholder).toHaveValue(login);
  }
  @step("Enter password")
  async enterPassword(password: string) {
    await this.passwordPlaceholder.fill(password);
    await expect(this.passwordPlaceholder).toHaveValue(password);
  }
  @step("Log in to the system")
  async logIn(login: string, password: string, resultPage: string) {
    await this.enterLogin(login);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await expect(this.page).toHaveURL(resultPage);
  }
  @step("Click forgot password")
  async clickForgotPassword() {
    await this.forgotPasswordTab.click();
    await expect(this.page).toHaveURL(pagesUrl.recover);
  }
}
