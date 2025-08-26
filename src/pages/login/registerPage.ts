import { Locator } from "@playwright/test";
import { BasePage } from "../basePage";

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
}
