import { AbstractPage } from "../../abstract/basePage";
import { CategoryProductsComponent } from "../../components/categoryProductsComponent";

export class GiftCardsPage extends AbstractPage {
  readonly products: CategoryProductsComponent;

  constructor(page) {
    super(page);
    this.products = new CategoryProductsComponent(page);
  }
}
