import { AbstractPage } from "../../abstract/abstract";
import { HeaderComponent } from "../../components/headerComponent";
import { step } from "../../helpers/decorators/step";
import pagesUrl from "../../utils/pagesUrl";

export class ShoppingCartPage extends AbstractPage {
  readonly headerComponent = new HeaderComponent(this.page);
  url = pagesUrl.cart;
  readonly cartItem = this.page.locator(' [class="cart-item-row"]');
  readonly itemCartName = this.cartItem.locator(".product-name");
  readonly removeCheckbox = this.cartItem.locator('[type="checkbox"]');
  readonly itemQuantityText = this.cartItem.locator(' [name*="itemquantity"]');
  readonly checkoutButton = this.page.locator("#checkout");
  readonly continueShopButton = this.page.locator('input[name="continueshopping"]');
  readonly updateCartButton = this.page.locator("input[name='updatecart']");
  readonly editItemButton = this.page.locator("[class=edit-item]");
  readonly termSofserviceCheckbox = this.page.locator("#termsofservice");
  readonly discountCodePlaceholder = this.page.locator("input[name=discountcouponcode]");
  readonly discountApplyButton = this.page.locator("input[name=applydiscountcouponcode]");
  readonly giftCardPlaceholder = this.page.locator("input[name=giftcardcouponcode]");
  readonly giftApplyButton = this.page.locator("input[name=applygiftcouponcode]");
  readonly shippingCountry = this.page.locator("#CountryId");
  readonly shippingState = this.page.locator("#StateProvinceId");

  async clickAllRemoveCheckbox() {
    for (const checkbox of await this.removeCheckbox.all()) {
      await checkbox.check();
    }
  }

  @step("Remove all items in cart")
  async clearCart() {
    await this.open();
    if ((await this.cartItem.count()) > 0) {
      await this.clickAllRemoveCheckbox();
      await this.updateCartButton.click();
    }
  }
}
