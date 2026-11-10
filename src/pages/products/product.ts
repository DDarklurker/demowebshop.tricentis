import { PageHolder } from "../../abstract/abstract";
import { CategoryProductsComponent } from "../../components/categoryProductsComponent";

export class Product extends PageHolder {
  readonly productRating = this.page.locator('[class="product-review-box"]  div.rating');
  readonly categoryProductsComponent = new CategoryProductsComponent(this.page);
  async openProductDetailsByName(name: string) {
    await this.page.getByRole("link", { name: name, exact: true }).click();
  }
}
