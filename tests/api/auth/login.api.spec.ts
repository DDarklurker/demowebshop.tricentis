/**
 * Login API tests.
 * Test the POST /login endpoint directly via HTTP.
 */
import { test, expect, assertResponseOk } from "../fixture/api.fixture";

const login = process.env.LOGIN as string;
const password = process.env.PASSWORD as string;

test.describe("Login API: @api @authorization", () => {
  test("Login with valid credentials @api", async ({ apiRequest }) => {
    const response = await apiRequest.post("/login", {
      form: { Email: login, Password: password },
    });
    expect([200, 302]).toContain(response.status());
  });

  test("Login with wrong password returns error message @api", async ({
    apiRequest,
  }) => {
    const response = await apiRequest.post("/login", {
      form: { Email: login, Password: "wrongpass123" },
    });
    assertResponseOk(response, 200);
    const body = await response.text();
    expect(body).toContain("Login was unsuccessful");
  });

  test("Login with non-existent email returns error @api", async ({
    apiRequest,
  }) => {
    const response = await apiRequest.post("/login", {
      form: { Email: "noone@doesnotexist.com", Password: "anypass123" },
    });
    assertResponseOk(response, 200);
    const body = await response.text();
    expect(body).toContain("Login was unsuccessful");
  });

  test("Login with empty fields returns validation errors @api", async ({
    apiRequest,
  }) => {
    const response = await apiRequest.post("/login", {
      form: { Email: "", Password: "" },
    });
    assertResponseOk(response, 200);
    const body = await response.text();
    expect(body).toContain("Login was unsuccessful");
  });
});
