import { expect } from "@playwright/test";
import pagesUrl from "../utils/pagesUrl";
import { SearchComponent } from "./searchComponent";
import { Component } from "../abstract/abstract";

export class HeaderComponent extends Component {
  readonly searchComponent = new SearchComponent(this.page);
  readonly logoTab = this.page.locator('a[href="/"]');
  readonly registerTab = this.page.locator('div.header a[href="/register"]');
  readonly loginTab = this.page.locator('div.header a[href="/login"]');
  readonly logoutTab = this.page.locator('div.header a[href="/logout"]');
  readonly customerInfoTab = this.page
    .locator('div.header a[href="/customer/info"]')
    .first();
  readonly shoppingCartTab = this.page.locator('div.header a[href="/cart"]');
  readonly wishlistTab = this.page.locator('div.header a[href="/wishlist"]');
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
