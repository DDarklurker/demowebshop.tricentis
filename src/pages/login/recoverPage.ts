import { expect, Locator } from "@playwright/test";
import { BasePage } from "../basePage";
export class RecoverPage extends BasePage {
  readonly emailPlaceholder: Locator;
  readonly recoverButton: Locator;
  readonly validationMessage: Locator;
  readonly resultMessage: Locator;
  constructor(page) {
    super(page);
    this.emailPlaceholder = page.locator("#Email");
    this.recoverButton = page.locator('input[type=submit][value="Recover"]');
    this.validationMessage = page.locator('span[for="Email"]');
    this.resultMessage = page.locator('[class="result"]');
  }
  async enterLogin(login: string) {
    await this.emailPlaceholder.fill(login);
    await expect(this.emailPlaceholder).toHaveValue(login);
  }
  async clickRecoverButton() {
    await this.recoverButton.click();
  }
  async recoverLogin(login: string, resultPage: string) {
    await this.enterLogin(login);
    await this.clickRecoverButton();
    expect(this.page).toHaveURL(resultPage);
  }
}
