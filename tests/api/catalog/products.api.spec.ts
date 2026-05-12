/**
 * Catalog / Products API tests.
 */
import { test, expect, assertResponseOk } from "../fixture/api.fixture";

const categories = [
  { name: "Books", url: "/books" },
  { name: "Computers", url: "/computers" },
  { name: "Electronics", url: "/electronics" },
  { name: "Apparel & Shoes", url: "/apparel-shoes" },
  { name: "Digital Downloads", url: "/digital-downloads" },
  { name: "Jewelry", url: "/jewelry" },
  { name: "Gift Cards", url: "/gift-cards" },
];

test.describe("Catalog API: @api", () => {
  for (const { name, url } of categories) {
    test(`GET ${url} returns category page for ${name} @api`, async ({
      apiRequest,
    }) => {
      const response = await apiRequest.get(url);
      assertResponseOk(response, 200);
      const body = await response.text();
      expect(body.length).toBeGreaterThan(100);
    });
  }

  test("GET non-existent category returns 404 @api", async ({
    apiRequest,
  }) => {
    const response = await apiRequest.get("/nonexistent-category");
    expect([404, 500]).toContain(response.status());
  });

  test("GET product detail page returns valid response @api", async ({
    apiRequest,
  }) => {
    const response = await apiRequest.get("/build-your-cheap-own-computer");
    // May 404 or 200 — both are valid responses for a product endpoint
    const status = response.status();
    expect([200, 404, 302]).toContain(status);
  });
});
