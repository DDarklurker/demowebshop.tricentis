import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/basePage";

export class CartPage extends BasePage{
    readonly checkoutButton: Locator;
    readonly itemQuantityText: Locator;
    readonly removeCheckbox: Locator;
    readonly cartItem: Locator;
    readonly editItemButton: Locator;
    readonly continueShopButton: Locator;
    readonly updateCartButton: Locator;
    readonly termSofserviceCheckbox: Locator;
    readonly discountCodePlaceholder: Locator;
    readonly discountApplyButton: Locator;
    readonly giftCardPlaceholder: Locator;
    readonly giftApplyButton: Locator;
    readonly shippingCountry: Locator;
    readonly shippingState: Locator;
    constructor(page: Page) {
        super(page);
        this.cartItem = page.locator(' [class="cart-item-row"]');
        this.removeCheckbox = page.locator('[type="checkbox"]');
        this.itemQuantityText = this.cartItem.locator(' [name*="itemquantity"]');
        this.checkoutButton = page.locator('#checkout');
        this.continueShopButton = page.locator('input[name="continueshopping"]');
        this.updateCartButton = page.locator("input[name='updatecart']");
        this.editItemButton = page.locator("[class=edit-item]");
        this.termSofserviceCheckbox = page.locator('#termsofservice');
        this.discountCodePlaceholder = page.locator('input[name=discountcouponcode]');
        this.discountApplyButton = page.locator('input[name=applydiscountcouponcode]');
        this.giftCardPlaceholder = page.locator('input[name=giftcardcouponcode]');
        this.giftApplyButton = page.locator('input[name=applygiftcouponcode]');
        this.shippingCountry = page.locator('#CountryId');
        this.shippingState = page.locator('#StateProvinceId');
    }
}