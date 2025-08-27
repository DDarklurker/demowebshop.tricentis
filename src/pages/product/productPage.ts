import { Locator } from "@playwright/test";
import { BasePage } from "../basePage";

export class ProductPage extends BasePage {
  readonly addToCardButton: Locator;
  readonly messagePlaceHolder: Locator;
  readonly notificationBar: Locator;
  readonly emailAFriendButton: Locator;
  readonly addToCompareList: Locator;
  constructor(page) {
    super(page);

    this.addToCardButton = page.locator("input#add-to-cart-button-1");
    this.messagePlaceHolder = page.locator("#giftcard_2_Message");
    this.notificationBar = page.locator("#bar-notification");
    this.emailAFriendButton = page.locator(
      `[onclick="setLocation('/productemailafriend/1')]`
    );
    this.addToCompareList = page.locator(
      `[onclick="setLocation('/compareproducts/add/1')"]`
    );
  }
}
