import { Page } from "@playwright/test";
import { HeaderSection } from "./headerSection";
import { FooterSection } from "./footerSection";
import { SidebarSection } from "./sidebarSection";
import { TopSection } from "./topSection";
import { NewsletterSection } from "./newsletterSection";

export class CommonSections {
  readonly headerSection: HeaderSection;
  readonly footerSection: FooterSection;
  readonly sidebarSection: SidebarSection;
  readonly topSection: TopSection;
  readonly newsletterSection: NewsletterSection;

  constructor(page: Page) {
    this.headerSection = new HeaderSection(page);
    this.footerSection = new FooterSection(page);
    this.sidebarSection = new SidebarSection(page);
    this.topSection = new TopSection(page);
    this.newsletterSection = new NewsletterSection(page);
  }
}
