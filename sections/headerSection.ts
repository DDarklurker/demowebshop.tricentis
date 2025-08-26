import { Locator, Page, expect } from "@playwright/test";
export class HeaderSection {
  readonly page: Page;
  readonly header: Locator;
  readonly basePageTab: Locator;
  readonly registerTab: Locator;
  readonly loginTab: Locator;
  readonly logoutTab: Locator;
  readonly customerInfoTab: Locator;
  readonly shoppingCartTab: Locator;
  readonly wishlistTab: Locator;
  readonly searchPlaceholder: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.header = page.locator("div.header");
    this.basePageTab = page.locator('a[href="/"]');
    this.registerTab = this.header.locator('a[href="/register"]');
    this.loginTab = this.header.locator('a[href="/login"]');
    this.logoutTab = this.header.locator('a[href="/logout"]');
    this.customerInfoTab = this.header
      .locator('a[href="/customer/info"]')
      .first();
    this.shoppingCartTab = this.header.locator('a[href="/cart"]');
    this.wishlistTab = this.header.locator('a[href="/wishlist"]');
    this.searchPlaceholder = this.header.locator('[id="small-searchterms"]');
    this.searchButton = this.header.locator('[type="submit"]');
  }
  async verifyHeaderSection() {
    await expect(this.basePageTab).toBeVisible();
    await expect(this.registerTab).toBeVisible();
    await expect(this.loginTab).toBeVisible();
    await expect(this.shoppingCartTab).toBeVisible();
    await expect(this.wishlistTab).toBeVisible();
    await expect(this.searchPlaceholder).toBeVisible();
    await expect(this.searchButton).toBeVisible();
  }
}
