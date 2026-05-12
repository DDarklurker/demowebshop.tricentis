/**
 * Common mock handlers.
 * Simulate homepage and static resource responses for edge case testing.
 */
import { MockConfig } from "../mock.types";

const BASE_URL = "https://demowebshop.tricentis.com";

export const commonHandlers = {
  /**
   * Mock normal homepage response with all essential elements.
   */
  homePageOk(): MockConfig {
    return {
      url: `${BASE_URL}/`,
      status: 200,
      body: `
<!DOCTYPE html>
<html>
<head><title>Demo Web Shop</title></head>
<body>
  <div class="header">
    <a href="/" class="header-logo">Demo Web Shop</a>
    <a href="/login">Log in</a>
    <a href="/register">Register</a>
    <a href="/cart">Shopping cart</a>
    <a href="/wishlist">Wishlist</a>
  </div>
  <div class="top-menu">
    <ul>
      <li><a href="/books">Books</a></li>
      <li><a href="/computers">Computers</a></li>
      <li><a href="/electronics">Electronics</a></li>
    </ul>
  </div>
  <div id="small-searchterms"></div>
</body>
</html>`,
    };
  },

  /**
   * Mock server error on homepage — simulates 503 Service Unavailable.
   */
  homePageError(): MockConfig {
    return {
      url: `${BASE_URL}/`,
      status: 503,
      body: "<h1>503 Service Unavailable</h1><p>The server is temporarily unable to service your request.</p>",
    };
  },

  /**
   * Mock 404 Not Found for any unmatched route.
   */
  notFound(): MockConfig {
    return {
      url: /.*/,
      status: 404,
      body: "<h1>404 Not Found</h1>",
    };
  },
};
