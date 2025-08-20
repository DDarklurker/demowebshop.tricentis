import { Locator, Page, expect } from "@playwright/test";
import { TopBasePage } from "./topBasePage";
import { FooterBasePage } from "./footerBasePage";
import { SidebarBasePage } from "./sidebarBasePage";

export class BasePage {
  readonly topBasePage: TopBasePage;
  readonly footerBasePage: FooterBasePage;
  readonly sidebarBasePage: SidebarBasePage;
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
    this.page = page;
    this.topBasePage = new TopBasePage(page);
    this.footerBasePage = new FooterBasePage(page);
    this.sidebarBasePage = new SidebarBasePage(page);
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
  async verifyBasePage() {
    await expect(this.shoppingCartTab).toBeVisible();
    await expect(this.wishlistTab).toBeVisible();
    await expect(this.searchPlaceholder).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.topBasePage.bookTab).toBeVisible();
    await expect(this.topBasePage.computerTab).toBeVisible();
    await expect(this.topBasePage.electronicsTab).toBeVisible();
  }
}
