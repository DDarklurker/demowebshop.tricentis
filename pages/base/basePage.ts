import { Locator, Page, expect } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly basePageTab: Locator;
    readonly registerTab: Locator;
    readonly loginTab: Locator;
    readonly logoutTab: Locator;
    readonly customerInfoTab: Locator;
    readonly shoppingCartTab: Locator;
    readonly wishlistTab: Locator;
    readonly searchPlaceholder: Locator;
    readonly searchButton: Locator;
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
        this.page = page;
        this.basePageTab = page.locator('a[href="/"]');
        this.registerTab = page.locator('a[href="/register"]');
        this.loginTab = page.locator('a[href="/login"]');  
        this.logoutTab = page.locator('a[href="/logout"]');
        this.customerInfoTab = page.locator('a[href="/customer/info"]').first();
        this.shoppingCartTab = page.locator('a[href="/cart"]');
        this.wishlistTab = page.locator('a[href="/wishlist"]');
        this.searchPlaceholder = page.locator('[id="small-searchterms"]');
        this.searchButton = page.locator('[type="submit"]');
        this.bookTab = page.locator('a[href="/books"]');
        this.computerTab = page.locator('a[href="/computers"]');
        this.electronicsTab = page.locator('a[href="/electronics"]');
        this.apparelTab = page.locator('a[href="/apparel-shoes"]');
        this.digitalDownloadsTab = page.locator('a[href="/digital-downloads"]');
        this.jewelryTab = page.locator('a[href="/jewelry"]');
        this.giftCardsTab = page.locator('a[href="/gift-cards"]');
        this.tricentisTab = page.locator('a[href="/tricentis"]');
    }
    async verifyBasePage() {
        await expect(this.basePageTab).toBeVisible;
        await expect(this.registerTab).toBeVisible;
        await expect(this.loginTab).toBeVisible;
        await expect(this.logoutTab).toBeVisible;
        await expect(this.customerInfoTab).toBeVisible;
        await expect(this.shoppingCartTab).toBeVisible;
        await expect(this.wishlistTab).toBeVisible;
        await expect(this.searchPlaceholder).toBeVisible;
        await expect(this.searchButton).toBeVisible;
        await expect(this.bookTab).toBeVisible;
        await expect(this.computerTab).toBeVisible;
        await expect(this.electronicsTab).toBeVisible;
    }


}