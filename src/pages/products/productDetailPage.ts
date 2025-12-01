import { AbstractPage } from "../../abstract/abstract";
import { CategoryProductsComponent } from "../../components/categoryProductsComponent";

export class ProductDetailPage extends AbstractPage {
  readonly products = new CategoryProductsComponent(this.page);
  readonly productName = this.page.locator("h1");
}
