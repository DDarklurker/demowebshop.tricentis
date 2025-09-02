import { expect, Locator } from "@playwright/test";
import { BasePage } from "../basePage";

export type sexType = "male" | "female";
export class RegisterPage extends BasePage {
  readonly genderManePoint: Locator;
  readonly genderFemalePoint: Locator;
  readonly firstNamePlaceholder: Locator;
  readonly lastNamePlaceholder: Locator;
  readonly emailPlaceholder: Locator;
  readonly passwordPlaceholder: Locator;
  readonly confirmPasswordPlaceholder: Locator;
  readonly registerButton: Locator;

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
  }
  async clickGenderPoint(sex: sexType) {
    if (sex === "male") {
      await this.genderManePoint.click();
    } else {
      await this.genderFemalePoint.click();
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
  async register(
    sex: sexType,
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
    await this.clickRegisterButton();
  }
  async verifyElements() {
    await expect(this.genderManePoint).toBeVisible();
    await expect(this.genderFemalePoint).toBeVisible();
    await expect(this.firstNamePlaceholder).toBeVisible();
    await expect(this.lastNamePlaceholder).toBeVisible();
    await expect(this.emailPlaceholder).toBeVisible();
    await expect(this.passwordPlaceholder).toBeVisible();
  }
}
