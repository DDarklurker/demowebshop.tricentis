import { expect } from "@playwright/test";
import { test } from "../../../src/fixture/fixturePage";
import { genderType } from "../../../src/pages/login/registerPage";
import pagesUrl from "../../../src/utils/pagesUrl";
import users from "../../data/users.json";
import { faker } from "@faker-js/faker";
const data = users[2];
test.describe("Register", () => {
  test.beforeEach(async ({ app: { homePage } }) => {
    await homePage.open(pagesUrl.home);
    await homePage.headerComponent.clickRegisterTab();
  });
  test("Verify UI elements on page", async ({ app: { registerPage } }) => {
    await registerPage.verifyElements();
  });

  test("@validation: Password ≠ Confirm password", async ({
    app: { registerPage }
  }) => {
    await registerPage.registerUser(
      data.gender as genderType,
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      faker.internet.password()
    );
    await registerPage.clickRegisterButton();
    await expect(registerPage.confirmPasswordErrorMessage).toContainText(
      "The password and confirmation password do not match."
    );
  });
  test("@regression: Email already exists", async ({
    app: { registerPage }
  }) => {
    await registerPage.registerUser(
      data.gender as genderType,
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      data.confirmpassword
    );
    await registerPage.clickRegisterButton();
    await expect(registerPage.registerErrorMessage).toContainText(
      "The specified email already exists"
    );
  });

  test("@validation: Empty fields -> required errors", async ({
    app: { registerPage },
    page
  }) => {
    await registerPage.clickRegisterButton();
    await expect(page).toHaveURL(pagesUrl.register);
    await registerPage.verifyWithEmptyFields();
  });

  const invalidEmails = [
    { email: "invalidemail", description: "without @ symbol" },
    { email: "test@", description: "without domain" },
    { email: "test @example.com", description: "with spaces" }
  ];

  for (const { email, description } of invalidEmails) {
    test(`@validation: Invalid email formats - ${description}`, async ({
      app: { registerPage }
    }) => {
      await registerPage.enterEmail(email);
      await registerPage.clickRegisterButton();
      await expect(registerPage.emailErrorMessage).toContainText("Wrong email");
    });
  }

  for (const {
    id,
    gender,
    firstname,
    lastname,
    email,
    password,
    confirmpassword
  } of users) {
    test(`@smoke: Successfully registration (parameterized) - ${id}`, async ({
      app: { registerPage }
    }) => {
      await registerPage.registerUser(
        gender as genderType,
        firstname,
        lastname,
        email,
        password,
        confirmpassword
      );
    });
  }
  test("@functional: Gender radio buttons mutual exclusivity - Male selected", async ({
    app: { registerPage }
  }) => {
    await registerPage.genderManePoint.click();
    await expect(registerPage.genderManePoint).toBeChecked();
    await expect(registerPage.genderFemalePoint).not.toBeChecked();
  });
  test("@functional: Gender radio buttons mutual exclusivity - Female selected", async ({
    app: { registerPage }
  }) => {
    await registerPage.genderFemalePoint.click();
    await expect(registerPage.genderFemalePoint).toBeChecked();
    await expect(registerPage.genderManePoint).not.toBeChecked();
  });
  test("@functional: Password field is hidden", async ({
    app: { registerPage }
  }) => {
    await registerPage.passwordPlaceholder.fill(data.password);
    await expect(registerPage.passwordPlaceholder).toHaveAttribute(
      "type",
      "password"
    );
  });
  test("@security: Password strength validation", async ({
    app: { registerPage }
  }) => {
    await registerPage.registerUser(
      data.gender as genderType,
      data.firstname,
      data.lastname,
      data.email,
      faker.internet.password({ length: 3 }),
      data.confirmpassword
    );
    await registerPage.clickRegisterButton();
    await expect(registerPage.passwordErrorMessage).toContainText(
      "The password should have at least 6 characters."
    );
  });
  test("@mock: Successful registration", async ({
    app: { registerPage },
    page
  }) => {
    await page.route("**/register", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/html",
        body: `DONE`
      });
    });

    await registerPage.registerUser(
      data.gender as genderType,
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      data.confirmpassword
    );
    await registerPage.clickRegisterButton();

    await expect(page.getByText("DONE")).toBeVisible();
  });
});
