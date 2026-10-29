import { test, expect } from "../../../src/fixture/fixturePage";
import { genderType } from "../../../src/pages/login/registerPage";
import pagesUrl from "../../../src/utils/pagesUrl";
import users from "../../data/users.json";
import { faker } from "@faker-js/faker";
const data = users[2];
test.describe("Register", () => {
  test.beforeEach(async ({ page, basePage }) => {
    await page.goto(pagesUrl.home);
    await basePage.headerComponent.clickRegisterTab();
  });
  test("Verify UI elements on page", async ({ registerPage }) => {
    await registerPage.verifyElements();
  });

  test("Password ≠ Confirm password", { tag: "@validation" }, async ({ registerPage }) => {
    await registerPage.fillRegisterForm(
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
  test("Email already exists", { tag: "@regression" }, async ({ registerPage }) => {
    await registerPage.fillRegisterForm(
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

  test("Empty fields -> required errors", { tag: "@validation" }, async ({
    page,
    registerPage,
  }) => {
    await registerPage.clickRegisterButton();
    await expect(page).toHaveURL(pagesUrl.register);
    await registerPage.verifyWithEmptyFields();
  });

  const invalidEmails = [
    { email: "invalidemail", description: "without @ symbol" },
    { email: "test@", description: "without domain" },
    { email: "test @example.com", description: "with spaces" },
  ];

  for (const { email, description } of invalidEmails) {
    test(`Invalid email formats - ${description}`, { tag: "@validation" }, async ({
      registerPage,
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
    confirmpassword,
  } of users) {
    test(`Successfully registration (parameterized) - ${id}`, { tag: "@smoke" }, async ({
      registerPage,
    }) => {
      await registerPage.fillRegisterForm(
        gender as genderType,
        firstname,
        lastname,
        email,
        password,
        confirmpassword
      );
    });
  }
  test("Gender radio buttons mutual exclusivity - Male selected", { tag: "@functional" }, async ({
    registerPage,
  }) => {
    await registerPage.genderMalePoint.click();
    await expect(registerPage.genderMalePoint).toBeChecked();
    await expect(registerPage.genderFemalePoint).not.toBeChecked();
  });
  test("Gender radio buttons mutual exclusivity - Female selected", { tag: "@functional" }, async ({
    registerPage,
  }) => {
    await registerPage.genderFemalePoint.click();
    await expect(registerPage.genderFemalePoint).toBeChecked();
    await expect(registerPage.genderMalePoint).not.toBeChecked();
  });
  test("Password field is hidden", { tag: "@functional" }, async ({ registerPage }) => {
    await registerPage.passwordPlaceholder.fill(data.password);
    await expect(registerPage.passwordPlaceholder).toHaveAttribute(
      "type",
      "password"
    );
  });
  test("Password strength validation", { tag: "@security" }, async ({ registerPage }) => {
    await registerPage.fillRegisterForm(
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
});
