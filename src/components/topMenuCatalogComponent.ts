import { Locator, Page } from "@playwright/test";

export class topMenuCatalogComponent {
  readonly topMenu: Locator;
  readonly bookTab: Locator;
  readonly computerTab: Locator;
  readonly electronicsTab: Locator;
  readonly apparelTab: Locator;
  readonly digitalDownloadsTab: Locator;
  readonly jewelryTab: Locator;
  readonly giftCardsTab: Locator;
  constructor(protected readonly page: Page) {
    this.bookTab = page.locator('ul.top-menu a[href="/books"]');
    this.computerTab = page.locator('ul.top-menu a[href="/computers"]');
    this.electronicsTab = page.locator('ul.top-menu a[href="/electronics"]');
    this.apparelTab = page.locator('ul.top-menu a[href="/apparel-shoes"]');
    this.digitalDownloadsTab = page.locator(
      'ul.top-menu a[href="/digital-downloads"]'
    );
    this.jewelryTab = page.locator('ul.top-menu a[href="/jewelry"]');
    this.giftCardsTab = page.locator('ul.top-menu a[href="/gift-cards"]');
  }
}
