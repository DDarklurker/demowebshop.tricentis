import { PageHolder } from "../../abstract/abstract";

export class ProductDetailPage extends PageHolder {
  readonly productName = this.page.locator("h1");
  readonly addToCartButton = this.page.locator('[id^="add-to-cart-button"]');
}
