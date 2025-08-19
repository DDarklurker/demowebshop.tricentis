import { Locator, Page, expect } from "@playwright/test";

export class TopBasePage{
    readonly topMenu: Locator;
    readonly bookTab: Locator;
    readonly computerTab: Locator;
    readonly electronicsTab: Locator;
    readonly apparelTab: Locator;  
    readonly digitalDownloadsTab: Locator;
    readonly jewelryTab: Locator;
    readonly giftCardsTab: Locator;
    readonly checkoutTab: Locator;
    readonly orderDetailsTab: Locator;
    readonly tricentisTab: Locator;
    constructor(page: Page) {
        this.topMenu = page.locator('ul.top-menu');
        this.bookTab = this.topMenu.locator('a[href="/books"]');
        this.computerTab = this.topMenu.locator('a[href="/computers"]');
        this.electronicsTab = this.topMenu.locator('a[href="/electronics"]');
        this.apparelTab = this.topMenu.locator('a[href="/apparel-shoes"]');
        this.digitalDownloadsTab = this.topMenu.locator('a[href="/digital-downloads"]');
        this.jewelryTab = this.topMenu.locator('a[href="/jewelry"]');
        this.giftCardsTab = this.topMenu.locator('a[href="/gift-cards"]');
        this.tricentisTab = this.topMenu.locator('a[href="/tricentis"]');
    }

    async verifyTopBasePage() {
        await expect(this.topMenu).toBeVisible();
        await expect(this.bookTab).toBeVisible();
        await expect(this.computerTab).toBeVisible();
        await expect(this.electronicsTab).toBeVisible();
        await expect(this.apparelTab).toBeVisible();
        await expect(this.digitalDownloadsTab).toBeVisible();
        await expect(this.jewelryTab).toBeVisible();
        await expect(this.giftCardsTab).toBeVisible();
        await expect(this.tricentisTab).toBeVisible();
    }
}