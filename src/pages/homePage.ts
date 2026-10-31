import { AbstractPage } from "../abstract/abstract";
import { CatalogComponent } from "../components/catalogComponent";
import { HeaderComponent } from "../components/headerComponent";
import { SearchComponent } from "../components/searchComponent";
import { topMenuCatalogComponent } from "../components/topMenuCatalogComponent";
import pagesUrl from "../utils/pagesUrl";

export class HomePage extends AbstractPage {
  readonly url = pagesUrl.home;
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
