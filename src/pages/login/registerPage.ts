import { expect } from "@playwright/test";
import { AbstractPage } from "../../abstract/abstract";

export type genderType = "Male" | "Female";
export class RegisterPage extends AbstractPage {
  readonly genderManePoint = this.page.locator("#gender-male");
  readonly genderFemalePoint = this.page.locator("#gender-female");
  readonly firstNamePlaceholder = this.page.locator("#FirstName");
  readonly lastNamePlaceholder = this.page.locator("#LastName");
  readonly emailPlaceholder = this.page.locator("#Email");
  readonly passwordPlaceholder = this.page.locator("#Password");
  readonly confirmPasswordPlaceholder = this.page.locator("#ConfirmPassword");
  readonly registerButton = this.page.locator("#register-button");
  readonly firstNameErrorMessage = this.page.locator(
    "[data-valmsg-for='FirstName']"
  );
  readonly lastNameErrorMessage = this.page.locator(
    "[data-valmsg-for='LastName']"
  );
  readonly emailErrorMessage = this.page.locator("[data-valmsg-for='Email']");
  readonly passwordErrorMessage = this.page.locator(
    "[data-valmsg-for='Password']"
  );
  readonly confirmPasswordErrorMessage = this.page.locator(
    "[data-valmsg-for='ConfirmPassword']"
  );
  readonly registerErrorMessage = this.page.locator(
    ".validation-summary-errors"
  );
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
