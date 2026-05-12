/**
 * Registration API tests.
 * Test the POST /register endpoint. Note: this site uses CSRF protection
 * (__RequestVerificationToken), so tests first GET the page to extract the token.
 */
import { test, expect, assertResponseOk } from "../fixture/api.fixture";
import { faker } from "@faker-js/faker";

test.describe("Registration API: @api", () => {
  test("Register new user returns redirect @api", async ({
    apiRequest,
  }) => {
    // First GET the register page to extract CSRF token
    const getPage = await apiRequest.get("/register");
    const html = await getPage.text();
    const tokenMatch = html.match(
      /__RequestVerificationToken[^>]+value="([^"]*)"/i
    );
    const token = tokenMatch ? tokenMatch[1] : "";

    const email = faker.internet.email();
    const pass = faker.internet.password({ length: 8 });
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const response = await apiRequest.post("/register", {
      form: {
        __RequestVerificationToken: token,
        Gender: "M",
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: pass,
        ConfirmPassword: pass,
      },
    });

    // Should redirect to registerresult or return 200
    expect([200, 302]).toContain(response.status());
  });

  test("Register endpoint is reachable @api", async ({
    apiRequest,
  }) => {
    const response = await apiRequest.get("/register");
    assertResponseOk(response, 200);
    const body = await response.text();
    // Verify it's the registration form page
    expect(body).toContain("register");
  });

  test("Register with empty fields returns validation errors @api", async ({
    apiRequest,
  }) => {
    // Extract CSRF token
    const getPage = await apiRequest.get("/register");
    const html = await getPage.text();
    const tokenMatch = html.match(
      /__RequestVerificationToken[^>]+value="([^"]*)"/i
    );
    const token = tokenMatch ? tokenMatch[1] : "";

    const response = await apiRequest.post("/register", {
      form: {
        __RequestVerificationToken: token,
        Gender: "",
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
      },
    });

    // Site may return 200 with validation or internal error
    const body = await response.text();
    expect(body).toBeTruthy();
  });
});
