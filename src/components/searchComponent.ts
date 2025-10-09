import { expect, Locator, Page } from "@playwright/test";

export class SearchComponent {
  private searchPlaceholder: Locator;
  private searchButton: Locator;
  constructor(protected readonly page: Page) {
    this.searchPlaceholder = page.locator(
      'div.header [id="small-searchterms"]'
    );
    this.searchButton = page.locator('div.header [type="submit"]');
  }
  async clickSearchButton() {
    await this.searchButton.click();
  }
  async searchProduct(product: string) {
    await this.searchPlaceholder.fill(product);
    await this.clickSearchButton();
  }
  async verifyInputText(product: string) {
    await this.searchPlaceholder.fill(product);
    await expect(this.searchPlaceholder).toContainText(product);
  }

  async verifySearchPlaceholderValue() {
    await expect(this.searchPlaceholder).toHaveValue("Search store");
  }
}
