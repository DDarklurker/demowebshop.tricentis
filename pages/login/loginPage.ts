import { expect, Locator, Page } from "@playwright/test";
import { CommonSections } from "../../sections/commonSections";

export class LoginPage extends CommonSections {
  readonly emailPlaceholder: Locator;
  readonly passwordPlaceholder: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckBox: Locator;
  readonly forgotPasswordTab: Locator;
  readonly newCustomerButton: Locator;
  readonly incorrectLoginMessage: Locator;
  readonly validationEmailField: Locator;

  constructor(page: Page) {
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
  }

  async login(email: string, password: string) {
    await this.emailPlaceholder.fill(email);
    await this.passwordPlaceholder.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginPage() {
    await this.headerSection.verifyHeaderSection();
    await this.footerSection.verifyFooterSection();
    await this.verifyLoginElements();
  }

  async verifyLoginElements() {
    await expect(this.emailPlaceholder).toBeVisible();
    await expect(this.passwordPlaceholder).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.rememberMeCheckBox).toBeVisible();
    await expect(this.forgotPasswordTab).toBeVisible();
    await expect(this.newCustomerButton).toBeVisible();
  }
}
