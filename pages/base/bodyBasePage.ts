import { Locator, Page, expect } from "@playwright/test";

export class BodyBasePage{
    readonly bannerTricentis: Locator;
    readonly productItem: Locator;
    readonly productPrice: Locator;
    readonly productTitle: Locator;
    readonly productRaitingBox: Locator
    readonly addToCartButton: Locator;
    constructor(page:Page) {
        this.bannerTricentis = page.locator('[href="https://www.tricentis.com/speed/"]');
        this.productItem = page.locator('div.product-item');
        this.productPrice = this.productItem.locator('span').first();
        this.productTitle = this.productItem.locator('[class="product-title"]').first();
        this.productTitle = this.productItem.locator('[class="product-rating-box"]').first();
        this.addToCartButton = this.productItem.locator('[type="button"]').first();
    }

    async verifyBodyBasePage() {
        await expect(this.bannerTricentis).toBeVisible();
        await expect(this.productItem).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productTitle).toBeVisible();
        await expect(this.addToCartButton).toBeVisible();
    }
}