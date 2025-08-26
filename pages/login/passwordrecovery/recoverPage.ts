import { Locator, Page } from "@playwright/test";
import { CommonSections } from "../../../sections/commonSections";

export class RecoverPage extends CommonSections {
  readonly;
  readonly page: Page;
  readonly emailPlaceholder: Locator;
  readonly recoverButton: Locator;
  readonly errorMessage: Locator;
  readonly validationEmailField: Locator;
  constructor(page: Page) {
    super(page);
    this.emailPlaceholder = page.locator("#Email");
    this.recoverButton = page.locator('input[type=submit][value="Recover"]');
    this.validationEmailField = page.locator('span[for="Email"]');
    this.errorMessage = page.locator('[class="result"]');
  }
  async recoverLogin(email: string) {
    await this.emailPlaceholder.fill(email);
    await this.recoverButton.click();
  }
}
