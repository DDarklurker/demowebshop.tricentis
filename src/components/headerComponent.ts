import { expect, Locator, Page } from "@playwright/test";
import pagesUrl from "../utils/pagesUrl";
import { SearchComponent } from "./searchComponent";

export class HeaderComponent {
  readonly logoTab: Locator;
  readonly registerTab: Locator;
  readonly loginTab: Locator;
  readonly logoutTab: Locator;
  readonly customerInfoTab: Locator;
  readonly shoppingCartTab: Locator;
  readonly wishlistTab: Locator;
  readonly searchComponent: SearchComponent;
  constructor(protected readonly page: Page) {
    this.page = page;
    this.searchComponent = new SearchComponent(page);
    this.logoTab = page.locator('a[href="/"]');
    this.registerTab = page.locator('div.header a[href="/register"]');
    this.loginTab = page.locator('div.header a[href="/login"]');
    this.logoutTab = page.locator('div.header a[href="/logout"]');
    this.customerInfoTab = page
      .locator('div.header a[href="/customer/info"]')
      .first();
    this.shoppingCartTab = page.locator('div.header a[href="/cart"]');
    this.wishlistTab = page.locator('div.header a[href="/wishlist"]');
  }
  async clickShoppingCartTab() {
    await this.shoppingCartTab.click();
    await expect(this.page).toHaveURL(pagesUrl.cart);
  }
  async clickWishlistTab() {
    await this.wishlistTab.click();
    await expect(this.page).toHaveURL(pagesUrl.wishlist);
  }
  async clickLoginTab() {
    await this.loginTab.click();
    await expect(this.page).toHaveURL(pagesUrl.login);
  }
  async clickRegisterTab() {
    await this.registerTab.click();
    await expect(this.page).toHaveURL(pagesUrl.register);
  }
  async clickLogoutTab() {
    await this.logoutTab.click();
    await expect(this.loginTab).toBeVisible();
  }
  async clickOnLogo() {
    await this.logoTab.click();
    await expect(this.page).toHaveURL(pagesUrl.home);
  }
  async clickOnProfile() {
    await this.customerInfoTab.click();
    await expect(this.page).toHaveURL(pagesUrl.profile);
  }
}
