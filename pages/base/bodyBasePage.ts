import { Locator, Page, expect } from "@playwright/test";

export class BodyBasePage{
    readonly bannerTricentis: Locator;
    readonly productItem: Locator;
    readonly itemButton: Locator;
    constructor(page:Page) {
        this.bannerTricentis = page.locator('[href="https://www.tricentis.com/speed/"]');
        this.productItem = page.locator('div.product-item');
        this.itemButton = this.productItem.locator('[type="button"]');
        
    }

    async verifyBodyBasePage() {
        await expect(this.bannerTricentis).toBeVisible();
        await expect(this.productItem).toBeVisible();
    }
}