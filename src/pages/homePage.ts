import { expect } from "@playwright/test";
import { CatalogComponent } from "../components/catalogComponent";
import { HeaderComponent } from "../components/headerComponent";
import { SearchComponent } from "../components/searchComponent";
import { topMenuCatalogComponent } from "../components/topMenuCatalogComponent";
import { AbstractPage } from "../abstract/abstract";

export class HomePage extends AbstractPage {
  readonly catalogComponent = new CatalogComponent(this.page);
  readonly headerComponent = new HeaderComponent(this.page);
  readonly searchComponent = new SearchComponent(this.page);
  readonly topMenuCatalogComponent = new topMenuCatalogComponent(this.page);
  async verifyUrl(pageUrl: string) {
    await expect(this.page).toHaveURL(pageUrl);
  }
  async reloadPage() {
    await this.page.reload();
  }
  async navigatePrevious() {
    await this.page.goBack();
  }
  async open(url: string) {
    await this.page.goto(url);
  }
}
