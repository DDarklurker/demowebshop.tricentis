import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base/basePage";
export class LoginPage extends BasePage {
    readonly emailPlaceholder: Locator;
    readonly passwordPlaceholder: Locator;
    readonly loginButton: Locator;
    readonly rememberMeCheckBox: Locator;
    readonly forgotPasswordTab: Locator;
    readonly newCustomerButton: Locator;
    readonly incorrectLoginMessage: Locator;
    constructor(page: Page) {
        super(page);
        this.emailPlaceholder = page.locator('#Email');
        this.passwordPlaceholder = page.locator('#Password');
        this.loginButton = page.locator("input[type='submit'][value='Log in']");
        this.rememberMeCheckBox= page.locator("#RememberMe");
        this.forgotPasswordTab = page.locator('[href="/passwordrecovery"]');
        this.newCustomerButton = page.locator(`[onclick="location.href='/register'"]`);
        this.incorrectLoginMessage = page.locator('[class=validation-summary-errors]');
    }
}   