/**
 * Shopping Cart API tests.
 */
import { test, expect, assertResponseOk } from "../fixture/api.fixture";

test.describe("Shopping Cart API: @api", () => {
  test("GET /cart returns 200 with cart page @api", async ({
    apiRequest,
  }) => {
    const response = await apiRequest.get("/cart");
    assertResponseOk(response, 200);
    const body = await response.text();
    expect(body.toLowerCase()).toMatch(/cart|empty|shop/i);
  });

  test("GET /cart as authenticated user returns 200 @api", async ({
    authenticatedRequest,
  }) => {
    const response = await authenticatedRequest.get("/cart");
    assertResponseOk(response, 200);
  });
});
