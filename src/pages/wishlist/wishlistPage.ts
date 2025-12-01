import { AbstractPage } from "../../abstract/abstract";

export class Wishlist extends AbstractPage {
  url?: string | undefined;
  readonly wishlistContent = this.page.locator(".wishlist-content");
  readonly removeCheckbox = this.page.locator("input[name='removefromcart']");
  readonly updateWishlistButton = this.page.locator("input[name='updatecart']");
  readonly addToCartCheckbox = this.page.locator("input[name='addtocart']");
  readonly shareLinkWishProduct = this.page.locator("a.share-link");
  readonly quantityWishProduct = this.page.locator("input.qty-input.valid");
  async clickShareLinkWishProduct() {
    await this.shareLinkWishProduct.click();
  }
  async clickUpdateWishlistButton() {
    await this.updateWishlistButton.click();
  }
  async clickRemoveCheckbox() {
    await this.removeCheckbox.click();
  }
  async clickAddToCartCheckbox() {
    await this.addToCartCheckbox.click();
  }
  async clickQuantityWishProduct() {
    await this.quantityWishProduct.click();
  }
  async removeProductFromWishlist() {
    await this.clickRemoveCheckbox();
    await this.clickUpdateWishlistButton();
  }
  async addProductToCart() {
    await this.clickAddToCartCheckbox();
    await this.clickUpdateWishlistButton();
  }
  async updateQuantityWishProduct() {
    await this.clickQuantityWishProduct();
  }
}
