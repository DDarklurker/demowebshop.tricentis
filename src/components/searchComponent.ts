import { expect } from "@playwright/test";
import { Component } from "../abstract/abstract";

export class SearchComponent extends Component {
  readonly searchPlaceholder = this.page.locator(
    'div.header [id="small-searchterms"]'
  );
  readonly searchButton = this.page.locator('div.header [type="submit"]');
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
