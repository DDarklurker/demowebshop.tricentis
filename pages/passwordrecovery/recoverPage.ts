import { Locator, Page } from "@playwright/test";
import { LoginPage } from "../login/loginPage";

export class RecoverPage extends LoginPage{
    readonly emailPlaceholder: Locator;
    readonly recoverButton: Locator;
    constructor(page:Page){
        super(page);
        this.emailPlaceholder = page.locator('#Email');
        this.recoverButton = page.locator('input[type=submit][value="Recover"]');
    }
}