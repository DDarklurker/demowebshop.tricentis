import { expect } from "@playwright/test";
import { AbstractPage } from "../../abstract/abstract";
export class RecoverPage extends AbstractPage {
  readonly emailPlaceholder = this.page.locator("#Email");
  readonly recoverButton = this.page.locator(
    'input[type=submit][value="Recover"]'
  );
  readonly validationMessage = this.page.locator('span[for="Email"]');
  readonly resultMessage = this.page.locator('[class="result"]');

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
