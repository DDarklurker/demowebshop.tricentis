/**
 * Password Recovery API tests.
 * Endpoint: /passwordrecovery (with CSRF protection).
 */
import { test, expect, assertResponseOk } from "../fixture/api.fixture";

test.describe("Password Recovery API: @api", () => {
  test("GET /passwordrecovery returns 200 @api", async ({ apiRequest }) => {
    const response = await apiRequest.get("/passwordrecovery");
    assertResponseOk(response, 200);
    const body = await response.text();
    expect(body).toContain("passwordrecovery");
  });

  test("POST /passwordrecovery with email returns response @api", async ({
    apiRequest,
  }) => {
    const getPage = await apiRequest.get("/passwordrecovery");
    const html = await getPage.text();
    const tokenMatch = html.match(
      /__RequestVerificationToken[^>]+value="([^"]*)"/i
    );
    const token = tokenMatch ? tokenMatch[1] : "";

    const response = await apiRequest.post("/passwordrecovery", {
      form: {
        __RequestVerificationToken: token,
        Email: process.env.LOGIN as string,
      },
    });

    expect([200, 302]).toContain(response.status());
  });
});
