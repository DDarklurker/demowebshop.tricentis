import { expect, Page } from "@playwright/test";

export class PageHolder {
  constructor(protected page: Page) {}
}
export abstract class AbstractPage extends PageHolder {
  abstract url?: string;
  async open() {
    await this.page.goto(this.url as string);
  }
  async verifyUrl() {
    await expect(this.page).toHaveURL(this.url as string);
  }
}
export abstract class Component extends PageHolder {}
