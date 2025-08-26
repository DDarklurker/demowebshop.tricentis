import { Locator, Page, expect } from "@playwright/test";
import pagesUrl from "../utils/pagesUrl";

export class BasePage {
  readonly basePageTab: Locator;
  readonly registerTab: Locator;
  readonly loginTab: Locator;
  readonly logoutTab: Locator;
  readonly customerInfoTab: Locator;
  readonly shoppingCartTab: Locator;
  readonly wishlistTab: Locator;
  readonly searchPlaceholder: Locator;
  readonly searchButton: Locator;
  readonly topMenu: Locator;
  readonly bookTab: Locator;
  readonly computerTab: Locator;
  readonly electronicsTab: Locator;
  readonly apparelTab: Locator;
  readonly digitalDownloadsTab: Locator;
  readonly jewelryTab: Locator;
  readonly giftCardsTab: Locator;
  readonly checkoutTab: Locator;
  readonly orderDetailsTab: Locator;
  readonly tricentisTab: Locator;

  constructor(protected readonly page: Page) {
    this.page = page;
    this.basePageTab = page.locator('a[href="/"]');
    this.registerTab = page.locator('div.header a[href="/register"]');
    this.loginTab = page.locator('div.header a[href="/login"]');
    this.logoutTab = page.locator('div.header a[href="/logout"]');
    this.customerInfoTab = page
      .locator('div.header a[href="/customer/info"]')
      .first();
    this.shoppingCartTab = page.locator('div.header a[href="/cart"]');
    this.wishlistTab = page.locator('div.header a[href="/wishlist"]');
    this.searchPlaceholder = page.locator(
      'div.header [id="small-searchterms"]'
    );
    this.searchButton = page.locator('div.header [type="submit"]');
    this.bookTab = page.locator('ul.top-menu a[href="/books"]');
    this.computerTab = page.locator('ul.top-menu a[href="/computers"]');
    this.electronicsTab = page.locator('ul.top-menu a[href="/electronics"]');
    this.apparelTab = page.locator('ul.top-menu a[href="/apparel-shoes"]');
    this.digitalDownloadsTab = page.locator(
      'ul.top-menu a[href="/digital-downloads"]'
    );
    this.jewelryTab = page.locator('ul.top-menu a[href="/jewelry"]');
    this.tricentisTab = page.locator('ul.top-menu a[href="/tricentis"]');
    this.giftCardsTab = page.locator('ul.top-menu a[href="/gift-cards"]');
  }
  async verifyBasePageElements() {
    await expect(this.shoppingCartTab).toBeVisible();
    await expect(this.wishlistTab).toBeVisible();
    await expect(this.searchPlaceholder).toBeVisible();
    await expect(this.searchButton).toBeVisible();
  }
  async clickLoginTab() {
    await this.loginTab.click();
    await expect(this.page).toHaveURL(pagesUrl.login);
  }
}
