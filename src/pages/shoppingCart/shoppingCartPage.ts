import { AbstractPage } from "../../abstract/abstract";

export class ShoppingCartPage extends AbstractPage {
  readonly cartItem = this.page.locator(' [class="cart-item-row"]');
  readonly removeCheckbox = this.page.locator('[type="checkbox"]');
  readonly itemQuantityText = this.cartItem.locator(' [name*="itemquantity"]');
  readonly checkoutButton = this.page.locator("#checkout");
  readonly continueShopButton = this.page.locator(
    'input[name="continueshopping"]'
  );
  readonly updateCartButton = this.page.locator("input[name='updatecart']");
  readonly editItemButton = this.page.locator("[class=edit-item]");
  readonly termSofserviceCheckbox = this.page.locator("#termsofservice");
  readonly discountCodePlaceholder = this.page.locator(
    "input[name=discountcouponcode]"
  );
  readonly discountApplyButton = this.page.locator(
    "input[name=applydiscountcouponcode]"
  );
  readonly giftCardPlaceholder = this.page.locator(
    "input[name=giftcardcouponcode]"
  );
  readonly giftApplyButton = this.page.locator(
    "input[name=applygiftcouponcode]"
  );
  readonly shippingCountry = this.page.locator("#CountryId");
  readonly shippingState = this.page.locator("#StateProvinceId");
}
