/**
 * Catalog mock handlers.
 * Simulate product catalog API responses for edge case testing.
 */
import { MockConfig } from "../mock.types";

const BASE_URL = "https://demowebshop.tricentis.com";

export const catalogHandlers = {
  /**
   * Mock a category page with products.
   * Returns HTML containing product items.
   */
  catalogWithProducts(category: string): MockConfig {
    const productsHtml = `
<div class="product-grid">
  <div class="product-item">
    <div class="product-title">${category} Sample Product 1</div>
    <div class="price">$10.00</div>
    <input type="button" value="Add to cart" class="product-box-add-to-cart-button">
    <input type="button" value="Add to wishlist" class="button-2 add-to-wishlist-button">
  </div>
  <div class="product-item">
    <div class="product-title">${category} Sample Product 2</div>
    <div class="price">$25.00</div>
    <input type="button" value="Add to cart" class="product-box-add-to-cart-button">
  </div>
</div>`;
    return {
      url: `${BASE_URL}/${category.replace(/\s+/g, "-").toLowerCase()}`,
      status: 200,
      body: productsHtml,
    };
  },

  /**
   * Mock an empty category page.
   */
  catalogEmpty(): MockConfig {
    return {
      url: /\/[a-z-]+$/,
      status: 200,
      body: "<div>No products found in this category</div>",
    };
  },

  /**
   * Mock category page timeout (no response).
   */
  catalogTimeout(category: string): { url: string; abort: true } {
    return {
      url: `${BASE_URL}/${category}`,
      abort: true,
    };
  },

  /**
   * Mock product detail page.
   */
  productDetail(): MockConfig {
    return {
      url: /\/[a-z-]+\/\d+$/,
      status: 200,
      body: `
<div class="product-details-page">
  <h1 class="product-name">Sample Product</h1>
  <div class="product-price"><span>100.00</span></div>
  <div class="sku">SKU: SAMP-001</div>
  <input type="button" value="Add to cart" id="add-to-cart-button">
</div>`,
    };
  },
};
