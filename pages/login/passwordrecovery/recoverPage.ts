import { Locator, Page } from "@playwright/test";
import { LoginPage } from "../loginPage";

export class RecoverPage extends LoginPage{
    readonly emailPlaceholder: Locator;
    readonly recoverButton: Locator;
    readonly emptyEmailField: Locator; 
    readonly errorMessage: Locator;
    constructor(page:Page){
        super(page);
        this.emailPlaceholder = page.locator('#Email');
        this.recoverButton = page.locator('input[type=submit][value="Recover"]');
        this.emptyEmailField = page.locator('span[for="Email"]');
        this.errorMessage = page.locator('[class="result"]');
    }
}