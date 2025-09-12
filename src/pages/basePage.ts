import { Locator, Page, expect } from "@playwright/test";
import { CatalogComponent } from "../components/catalogComponent";
import { HeaderComponent } from "../components/headerComponent";
import { SearchComponent } from "../components/searchComponent";
import { topMenuCatalogComponent } from "../components/topMenuCatalogComponent";
export abstract class BasePage {
  constructor(protected readonly page: Page) {}
  async verifyUrl(pageUrl: string) {
    await expect(this.page).toHaveURL(pageUrl);
  }
  async reloadPage() {
    await this.page.reload();
  }
  async navigatePrevious() {
    await this.page.goBack();
  }
}
export class HomePage extends BasePage {
  readonly catalogComponent: CatalogComponent;
  readonly headerComponent: HeaderComponent;
  readonly searchComponent: SearchComponent;
  readonly topMenuCatalogComponent: topMenuCatalogComponent;
  constructor(page) {
    super(page);
    this.catalogComponent = new CatalogComponent(page);
    this.headerComponent = new HeaderComponent(page);
    this.searchComponent = new SearchComponent(page);
    this.topMenuCatalogComponent = new topMenuCatalogComponent(page);
  }
}
