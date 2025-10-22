import { Page } from "@playwright/test";

export class PageHolder {
  constructor(protected page: Page) {}
}
export abstract class AbstractPage extends PageHolder {}
export abstract class Component extends PageHolder {}
