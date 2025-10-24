import { AbstractPage } from "../../abstract/abstract";
import { CategoryProductsComponent } from "../../components/categoryProductsComponent";

export class GiftCardsPage extends AbstractPage {
  readonly products = new CategoryProductsComponent(this.page);
}
