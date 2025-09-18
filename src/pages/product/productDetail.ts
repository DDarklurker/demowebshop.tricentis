import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class ProductDetail extends BasePage {
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly productImage: Locator;
  readonly productSku: Locator;
  readonly productAvailability: Locator;
  readonly addToCartButton: Locator;
  readonly addToWishListButton: Locator;
  readonly addToCompareListButton: Locator;
  readonly emailAFriendButton: Locator;
  readonly quantityInput: Locator;
  readonly quantityIncreaseButton: Locator;
  readonly quantityDecreaseButton: Locator;
  readonly productAttributes: Locator;
  readonly attributeOptions: Locator;
  readonly backToListButton: Locator;
  readonly previousProductButton: Locator;
  readonly nextProductButton: Locator;
  readonly productTabs: Locator;
  readonly specificationsTab: Locator;
  readonly reviewsTab: Locator;
  readonly tagsTab: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly notificationBar: Locator;

  constructor(page: Page) {
    super(page);

    this.productTitle = page.locator('[class="product-name"] h1');
    this.productPrice = page.locator('[itemprop="price"]');
    this.productDescription = page.locator('[class="short-description"]');
    this.productImage = page.locator('[itemprop="image"]');
    this.productSku = page.locator('[itemprop="sku"], .sku, .product-sku');
    this.productAvailability = page.locator(
      '.stock, .availability, [itemprop="availability"]'
    );

    this.addToCartButton = page.locator('[id*="add-to-cart-button"]');
    this.addToWishListButton = page.locator('[id*="add-to-wishlist-button"]');
    this.addToCompareListButton = page.locator(
      '[class="button-2 add-to-compare-list-button"]'
    );
    this.emailAFriendButton = page.locator(
      '[class="button-2 x-a-friend-button"]'
    );

    this.quantityInput = page.locator(
      'input[name*="quantity"], .qty-input, #addtocart_EnteredQuantity'
    );
    this.quantityIncreaseButton = page.locator(
      '.qty-plus, .quantity-plus, [data-action="increase"]'
    );
    this.quantityDecreaseButton = page.locator(
      '.qty-minus, .quantity-minus, [data-action="decrease"]'
    );

    this.productAttributes = page.locator(
      ".attributes, .product-attributes, .product-variant-list"
    );
    this.attributeOptions = page.locator(
      ".attribute-options, .product-attribute-options, .variant-options"
    );

    this.backToListButton = page.locator(
      'input[value*="Back"], .back-button, a[href*="catalog"]'
    );
    this.previousProductButton = page.locator(
      '.previous-product, .product-prev, a[rel="prev"]'
    );
    this.nextProductButton = page.locator(
      '.next-product, .product-next, a[rel="next"]'
    );

    this.productTabs = page.locator(".product-tabs, .tabs, .product-info-tabs");
    this.specificationsTab = page.locator(
      'a[href*="specification"], .specification-tab, [data-tab="specification"]'
    );
    this.reviewsTab = page.locator(
      'a[href*="review"], .review-tab, [data-tab="review"]'
    );
    this.tagsTab = page.locator('a[href*="tag"], .tag-tab, [data-tab="tag"]');

    this.successMessage = page.locator(
      ".success, .alert-success, .notification-success"
    );
    this.errorMessage = page.locator(
      ".error, .alert-error, .notification-error"
    );
    this.notificationBar = page.locator(
      ".notification, .bar-notification, .message-notification"
    );
  }
}
