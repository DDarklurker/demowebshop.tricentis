import { Locator } from "@playwright/test";
import { BasePage } from "../basePage";

export class Wishlist extends BasePage {
  readonly wishlistContent: Locator;
  readonly removeCheckbox: Locator;
  readonly addToCartCheckbox: Locator;
  readonly updateWishlistButton: Locator;
  readonly shareLinkWishProduct: Locator;
  readonly quantityWishProduct: Locator;
  constructor(page) {
    super(page);
    this.wishlistContent = page.locator(".wishlist-content");
    this.removeCheckbox = page.locator("input[name='removefromcart']");
    this.updateWishlistButton = page.locator("input[name='updatecart']");
    this.addToCartCheckbox = page.locator("input[name='addtocart']");
    this.shareLinkWishProduct = page.locator("a.share-link");
    this.quantityWishProduct = page.locator("input.qty-input.valid");
  }
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
