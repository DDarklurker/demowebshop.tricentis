import { Locator, Page, expect } from "@playwright/test";

export class SidebarBasePage{
    readonly sidebar: Locator;
    readonly sidebarBook: Locator;
    readonly sidebarComputers: Locator;
    readonly sidebarElectronics: Locator;
    readonly sidebarApparelAndShoes: Locator;
    readonly sidebarDigitalDownloads: Locator;
    readonly sidebarJewelry: Locator;
    readonly sidebarGiftCards: Locator;
    readonly sidebarTricentis: Locator;
    
    constructor(page:Page){
        this.sidebar = page.locator('div.side-2');
        this.sidebarBook = this.sidebar.locator('[href="/books"]');
        this.sidebarComputers = this.sidebar.locator('[href="/computers"]');
        this.sidebarElectronics = this.sidebar.locator('[href="/electronics"]');
        this.sidebarApparelAndShoes = this.sidebar.locator('[href="/apparel-shoes"]');
        this.sidebarDigitalDownloads = this.sidebar.locator('[href="/digital-downloads"]');
        this.sidebarJewelry = this.sidebar.locator('[href="/jewelry"]');
        this.sidebarGiftCards = this.sidebar.locator('[href="/gift-cards"]');
        this.sidebarTricentis = this.sidebar.locator('[href="/tricentis"]');
    }

    async verifySidebarBasePage() {
        await expect(this.sidebar).toBeVisible();
        await expect(this.sidebarBook).toBeVisible();
        await expect(this.sidebarComputers).toBeVisible();
        await expect(this.sidebarElectronics).toBeVisible();
        await expect(this.sidebarApparelAndShoes).toBeVisible();
        await expect(this.sidebarDigitalDownloads).toBeVisible();
        await expect(this.sidebarJewelry).toBeVisible();
        await expect(this.sidebarGiftCards).toBeVisible();
        await expect(this.sidebarTricentis).toBeVisible();
    }
}