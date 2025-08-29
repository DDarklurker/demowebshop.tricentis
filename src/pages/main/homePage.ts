import { Locator } from "@playwright/test";
import { BasePage } from "../basePage";

export class HomePage extends BasePage {
  readonly firstFeaturedProductAddCardButton: Locator;
  readonly sliderBar: Locator;
  constructor(page) {
    super(page);
    this.firstFeaturedProductAddCardButton = page.locator(
      'div.item-box [type="button"]'
    );
    this.sliderBar = page.locator("#nivo-slider").first();
  }
  async clickAddToCardFirstProduct() {
    await this.firstFeaturedProductAddCardButton.click();
  }
}
