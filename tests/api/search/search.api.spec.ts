/**
 * Search API tests.
 */
import { test, expect, assertResponseOk } from "../fixture/api.fixture";

test.describe("Search API: @api", () => {
  test("GET /search?q=computer returns results @api", async ({
    apiRequest,
  }) => {
    const response = await apiRequest.get("/search", {
      params: { q: "computer" },
    });
    assertResponseOk(response, 200);
    const body = await response.text();
    expect(body.length).toBeGreaterThan(100);
  });

  test("GET /search?q=xyznonexist12345 returns no results @api", async ({
    apiRequest,
  }) => {
    const response = await apiRequest.get("/search", {
      params: { q: "xyznonexist12345" },
    });
    assertResponseOk(response, 200);
    const body = await response.text();
    expect(body).toMatch(/no products|not found|results/i);
  });

  test("GET /search?q= returns search page for empty query @api", async ({
    apiRequest,
  }) => {
    const response = await apiRequest.get("/search", {
      params: { q: "" },
    });
    assertResponseOk(response, 200);
    const body = await response.text();
    expect(body).toMatch(/length|term|enter|search|warning/i);
  });
});
