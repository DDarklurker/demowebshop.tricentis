import { Locator } from "@playwright/test";
import { GiftCard } from "./giftCard";

export class virtualGiftCard extends GiftCard {
  readonly recipientEmailPlaceholder: Locator;
  readonly yourEmailPlaceholder: Locator;
  constructor(page) {
    super(page);
    this.recipientEmailPlaceholder = page.locator("#giftcard_2_RecipientEmail");
    this.yourEmailPlaceholder = page.locator("#giftcard_2_SenderEmail");
  }
}
