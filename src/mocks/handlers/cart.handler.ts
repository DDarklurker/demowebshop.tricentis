/**
 * Shopping cart mock handlers.
 * Simulate cart API responses for edge case testing.
 */
import { MockConfig } from "../mock.types";

const BASE_URL = "https://demowebshop.tricentis.com";

export const cartHandlers = {
  /**
   * Mock cart page with items.
   */
  cartWithItems(): MockConfig {
    return {
      url: `${BASE_URL}/cart`,
      status: 200,
      body: `
<div class="cart">
  <h1>Shopping cart</h1>
  <div class="cart-item-row">
    <a class="product-name" href="/laptop">14.1-inch Laptop</a>
    <input name="itemquantity123" type="text" value="1" class="qty-input">
    <span class="product-unit-price">1000.00</span>
    <span class="product-subtotal">1000.00</span>
    <input type="checkbox" name="removefromcart">
  </div>
  <div class="cart-footer">
    <span class="order-total">1000.00</span>
    <button id="checkout">Checkout</button>
  </div>
</div>`,
    };
  },

  /**
   * Mock empty cart page.
   */
  cartEmpty(): MockConfig {
    return {
      url: `${BASE_URL}/cart`,
      status: 200,
      body: '<div class="order-summary-content">Your Shopping Cart is empty!</div>',
    };
  },

  /**
   * Mock add-to-cart error (e.g., product out of stock).
   */
  cartAddError(): MockConfig {
    return {
      url: /\/cart\/add\/\d+/,
      method: "POST",
      status: 200,
      body: "<div>Product out of stock</div>",
    };
  },
};
