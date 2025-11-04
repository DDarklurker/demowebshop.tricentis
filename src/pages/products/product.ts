import { AbstractPage, PageHolder } from "../../abstract/abstract";

export class Product extends PageHolder {
  readonly productRating = this.page.locator(
    '[class="product-review-box"]  div.rating'
  );
  async openProductDetailsByName(name: string) {
    await this.page.getByRole("link", { name: name, exact: true }).click();
  }
}
