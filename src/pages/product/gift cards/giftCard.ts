import { Locator } from "@playwright/test";
import { ProductPage } from "../ProductPage";

export class GiftCard extends ProductPage {
  readonly yourNamePlaceholder: Locator;
  readonly recipientNamePlaceholder: Locator;

  constructor(page) {
    super(page);
    this.yourNamePlaceholder = page.locator("#giftcard_2_SenderName");
    this.recipientNamePlaceholder = page.locator("#giftcard_2_RecipientName");
  }
}
