import { Locator, Page, expect } from "@playwright/test";
import { CommonSections } from "../../sections/commonSections";

export class BasePage extends CommonSections {
  readonly bannerTricentis: Locator;
  readonly productItem: Locator;
  readonly productPrice: Locator;
  readonly productTitle: Locator;
  readonly productRaitingBox: Locator;
  readonly addToCartButton: Locator;
  constructor(page: Page) {
    super(page);
    this.bannerTricentis = page.locator(
      '[href="https://www.tricentis.com/speed/"]'
    );
    this.productItem = page.locator("div.product-item");
    this.productPrice = this.productItem.locator("span").first();
    this.productTitle = this.productItem
      .locator('[class="product-title"]')
      .first();
    this.productTitle = this.productItem
      .locator('[class="product-rating-box"]')
      .first();
    this.addToCartButton = this.productItem.locator('[type="button"]').first();
  }

  async verifyBasePage() {
    await this.headerSection.verifyHeaderSection();
    await this.topSection.verifyTopSection();
  }
}
