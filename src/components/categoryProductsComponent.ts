import { Component } from "../abstract/abstract";

export class CategoryProductsComponent extends Component {
  readonly root = this.page.locator("div.product-grid, div.product-list");
  readonly items = this.root.locator("div.item-box");

  async itemByName(name: string) {
    return this.items.filter({
      has: this.page.locator("h2.product-title a", { hasText: name })
    });
  }
  async openDetailsByName(name: string) {
    await (await this.itemByName(name))
      .locator("h2.product-title a")
      .first()
      .click();
  }

  async addToCartByName(name: string) {
    const item = this.itemByName(name);
    const addButton = (await item).locator(
      "input.button-2.product-box-add-to-cart-button, button.button-2.product-box-add-to-cart-button"
    );
    await addButton.first().click();
  }

  async addNthToCart(indexZeroBased: number) {
    const item = this.items.nth(indexZeroBased);
    const addButton = item.locator(
      "input.button-2.product-box-add-to-cart-button, button.button-2.product-box-add-to-cart-button"
    );
    await addButton.first().click();
  }

  async openNthDetails(indexZeroBased: number) {
    await this.items.nth(indexZeroBased).locator("h2.product-title a").click();
  }
}
