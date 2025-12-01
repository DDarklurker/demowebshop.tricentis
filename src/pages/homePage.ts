import { CatalogComponent } from "../components/catalogComponent";
import { HeaderComponent } from "../components/headerComponent";
import { SearchComponent } from "../components/searchComponent";
import { topMenuCatalogComponent } from "../components/topMenuCatalogComponent";
import { AbstractPage } from "../abstract/abstract";

export class HomePage extends AbstractPage {
  readonly url = "/";
  readonly catalogComponent = new CatalogComponent(this.page);
  readonly headerComponent = new HeaderComponent(this.page);
  readonly searchComponent = new SearchComponent(this.page);
  readonly topMenuCatalogComponent = new topMenuCatalogComponent(this.page);
  async reloadPage() {
    await this.page.reload();
  }
  async navigatePrevious() {
    await this.page.goBack();
  }
}
