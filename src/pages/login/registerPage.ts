import { expect, Locator } from "@playwright/test";
import { HomePage } from "../basePage";

export type genderType = "Male" | "Female";
export class RegisterPage extends HomePage {
  readonly genderManePoint: Locator;
  readonly genderFemalePoint: Locator;
  readonly firstNamePlaceholder: Locator;
  readonly lastNamePlaceholder: Locator;
  readonly emailPlaceholder: Locator;
  readonly passwordPlaceholder: Locator;
  readonly confirmPasswordPlaceholder: Locator;
  readonly firstNameErrorMessage: Locator;
  readonly lastNameErrorMessage: Locator;
  readonly registerButton: Locator;
  readonly emailErrorMessage: Locator;
  readonly passwordErrorMessage: Locator;
  readonly confirmPasswordErrorMessage: Locator;
  readonly registerErrorMessage: Locator;
  constructor(page) {
    super(page);
    this.genderManePoint = page.locator("#gender-male");
    this.genderFemalePoint = page.locator("#gender-female");
    this.firstNamePlaceholder = page.locator("#FirstName");
    this.lastNamePlaceholder = page.locator("#LastName");
    this.emailPlaceholder = page.locator("#Email");
    this.passwordPlaceholder = page.locator("#Password");
    this.confirmPasswordPlaceholder = page.locator("#ConfirmPassword");
    this.registerButton = page.locator("#register-button");
    this.firstNameErrorMessage = page.locator("[data-valmsg-for='FirstName']");
    this.lastNameErrorMessage = page.locator("[data-valmsg-for='LastName']");
    this.emailErrorMessage = page.locator("[data-valmsg-for='Email']");
    this.passwordErrorMessage = page.locator("[data-valmsg-for='Password']");
    this.confirmPasswordErrorMessage = page.locator(
      "[data-valmsg-for='ConfirmPassword']"
    );
    this.registerErrorMessage = page.locator(".validation-summary-errors");
  }
  async clickGenderPoint(gender: genderType) {
    if (gender === "Male") {
      await this.genderManePoint.click();
    } else if (gender === "Female") {
      await this.genderFemalePoint.click();
    } else {
      throw new Error("Invalid gender value");
    }
  }
  async enterFirstName(firstName: string) {
    await this.firstNamePlaceholder.fill(firstName);
    await expect(this.firstNamePlaceholder).toHaveValue(firstName);
  }
  async enterLastName(lastName: string) {
    await this.lastNamePlaceholder.fill(lastName);
    await expect(this.lastNamePlaceholder).toHaveValue(lastName);
  }
  async enterEmail(email: string) {
    await this.emailPlaceholder.fill(email);
    await expect(this.emailPlaceholder).toHaveValue(email);
  }
  async enterPassword(password: string) {
    await this.passwordPlaceholder.fill(password);
    await expect(this.passwordPlaceholder).toHaveValue(password);
  }
  async enterConfirmPassword(confirmPassword: string) {
    await this.confirmPasswordPlaceholder.fill(confirmPassword);
    await expect(this.confirmPasswordPlaceholder).toHaveValue(confirmPassword);
  }
  async clickRegisterButton() {
    await this.registerButton.click();
  }
  async registerUser(
    sex: genderType,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    await this.clickGenderPoint(sex);
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.enterConfirmPassword(confirmPassword);
    // await this.clickRegisterButton();
  }
  async verifyElements() {
    await expect(this.genderManePoint).toBeVisible();
    await expect(this.genderFemalePoint).toBeVisible();
    await expect(this.firstNamePlaceholder).toBeVisible();
    await expect(this.lastNamePlaceholder).toBeVisible();
    await expect(this.emailPlaceholder).toBeVisible();
    await expect(this.passwordPlaceholder).toBeVisible();
  }
  async verifyWithEmptyFields() {
    await expect(this.firstNameErrorMessage).toContainText(
      "First name is required."
    );
    await expect(this.lastNameErrorMessage).toContainText(
      "Last name is required."
    );
    await expect(this.emailErrorMessage).toContainText("Email is required.");
    await expect(this.passwordErrorMessage).toContainText(
      "Password is required"
    );
    await expect(this.confirmPasswordErrorMessage).toContainText(
      "Password is required"
    );
  }
}
