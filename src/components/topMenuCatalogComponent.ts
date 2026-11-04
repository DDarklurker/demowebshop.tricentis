import { Component } from "../abstract/abstract";

export class topMenuCatalogComponent extends Component {
  readonly bookTab = this.page.locator('ul.top-menu a[href="/books"]');
  readonly computerTab = this.page.locator('ul.top-menu a[href="/computers"]');
  readonly electronicsTab = this.page.locator(
    'ul.top-menu a[href="/electronics"]'
  );
  readonly apparelTab = this.page.locator(
    'ul.top-menu a[href="/apparel-shoes"]'
  );
  readonly digitalDownloadsTab = this.page.locator(
    'ul.top-menu a[href="/digital-downloads"]'
  );
  readonly jewelryTab = this.page.locator('ul.top-menu a[href="/jewelry"]');
  readonly giftCardsTab = this.page.locator(
    'ul.top-menu a[href="/gift-cards"]'
  );
}
