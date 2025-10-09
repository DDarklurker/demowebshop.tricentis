import { Locator, Page } from "@playwright/test";

export class CatalogComponent {
  readonly booksTab: Locator;
  readonly computersTab: Locator;
  readonly desktopsTab: Locator;
  readonly notebooksTab: Locator;
  readonly accessoriesTab: Locator;
  readonly electronicsTab: Locator;
  readonly cameraPhotoTab: Locator;
  readonly cellPhonesTab: Locator;
  readonly apparelShoesTab: Locator;
  readonly digitalDownloadsTab: Locator;
  readonly jewelryTab: Locator;
  readonly giftCardsTab: Locator;

  constructor(protected readonly page: Page) {
    this.booksTab = page.locator(`div.block a[href="/books"]`);
    this.computersTab = page.locator(`div.block a[href="/computers"]`);
    this.electronicsTab = page.locator(`div.block a[href="/electronics"]`);
    this.apparelShoesTab = page.locator(`div.block a[href="/apparel-shoes"]`);
    this.digitalDownloadsTab = page.locator(
      `div.block a[href="/digital-downloads"]`
    );
    this.jewelryTab = page.locator(`div.block a[href="/jewelry"]`);
    this.giftCardsTab = page.locator(`div.block a[href="/gift-cards"]`);
    this.desktopsTab = page.locator(`div.block a[href="/desktops"]`);
    this.notebooksTab = page.locator(`div.block a[href="/notebooks"]`);
    this.accessoriesTab = page.locator(`div.block a[href="/accessories"]`);
    this.cameraPhotoTab = page.locator(`div.block a[href="/camera-photo"]`);
    this.cellPhonesTab = page.locator(`div.block a[href="/cell-phones"]`);
  }
}
