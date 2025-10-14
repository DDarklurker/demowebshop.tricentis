import { Locator } from "@playwright/test";
import { BasePage } from "../basePage";

abstract class Product extends BasePage {
  readonly emailAFriendButton: Locator;
  readonly addToCompareList: Locator;
  readonly addYourReview: Locator;
  readonly productRating: Locator;
  constructor(page) {
    super(page);

    this.productRating = page.locator(
      '[class="product-review-box"]  div.rating'
    );
    this.emailAFriendButton = page.locator(
      'input[class*="email-a-friend-button"]'
    );
  }
}
