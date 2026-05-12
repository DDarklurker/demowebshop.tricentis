/**
 * Search mock handlers.
 * Simulate search API responses for edge case testing.
 */
import { MockConfig } from "../mock.types";

const BASE_URL = "https://demowebshop.tricentis.com";

export const searchHandlers = {
  /**
   * Mock search with results.
   */
  searchWithResults(query: string): MockConfig {
    return {
      url: `${BASE_URL}/search?q=${encodeURIComponent(query)}`,
      status: 200,
      body: `
<div class="search-results">
  <div class="product-item">
    <div class="product-title">${query} Product 1</div>
    <div class="price">$50.00</div>
  </div>
  <div class="product-item">
    <div class="product-title">${query} Product 2</div>
    <div class="price">$75.00</div>
  </div>
</div>`,
    };
  },

  /**
   * Mock search with no results.
   */
  searchNoResults(): MockConfig {
    return {
      url: /\/search\?q=/,
      status: 200,
      body: '<div class="search-results"><strong>No products were found that match your criteria.</strong></div>',
    };
  },

  /**
   * Mock search with empty query — shows warning.
   */
  searchEmptyQuery(): MockConfig {
    return {
      url: /\/search\?q=$/,
      status: 200,
      body: '<div class="warning">Search term minimum length is 3 characters</div>',
    };
  },
};
