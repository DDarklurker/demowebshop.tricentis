import { expect, Locator, Page } from "@playwright/test";

export class NewsletterSection {
  readonly page: Page;
  readonly newsletterPlaceholder: Locator;
  readonly newsletterButton: Locator;
  constructor(page: Page) {
    this.newsletterPlaceholder = page.locator("#newsletter-email");
    this.newsletterButton = page.locator("#newsletter-subscribe-button");
  }
  async verifyNewsletterSection() {
    await expect(this.newsletterPlaceholder).toBeVisible();
    await expect(this.newsletterButton).toBeVisible();
  }
}
