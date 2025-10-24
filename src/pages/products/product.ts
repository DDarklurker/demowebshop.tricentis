import { AbstractPage } from "../../abstract/abstract";

abstract class Product extends AbstractPage {
  readonly productRating = this.page.locator(
    '[class="product-review-box"]  div.rating'
  );
  readonly emailAFriendButton = this.page.locator(
    'input[class*="email-a-friend-button"]'
  );
}
