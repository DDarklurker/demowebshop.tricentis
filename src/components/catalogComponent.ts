import { Locator, Page } from "@playwright/test";
import { Component } from "../abstract/abstract";

export class CatalogComponent extends Component {
  readonly booksTab = this.page.locator(`div.block a[href="/books"]`);
  readonly computersTab = this.page.locator(`div.block a[href="/computers"]`);
  readonly desktopsTab = this.page.locator(`div.block a[href="/desktops"]`);
  readonly notebooksTab = this.page.locator(`div.block a[href="/notebooks"]`);
  readonly accessoriesTab = this.page.locator(
    `div.block a[href="/accessories"]`
  );
  readonly electronicsTab = this.page.locator(
    `div.block a[href="/electronics"]`
  );
  readonly cameraPhotoTab = this.page.locator(
    `div.block a[href="/camera-photo"]`
  );
  readonly cellPhonesTab = this.page.locator(
    `div.block a[href="/cell-phones"]`
  );
  readonly apparelShoesTab = this.page.locator(
    `div.block a[href="/apparel-shoes"]`
  );
  readonly digitalDownloadsTab = this.page.locator(
    `div.block a[href="/digital-downloads"]`
  );
  readonly jewelryTab = this.page.locator(`div.block a[href="/jewelry"]`);
  readonly giftCardsTab = this.page.locator(`div.block a[href="/gift-cards"]`);
}
