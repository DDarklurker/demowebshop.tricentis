import { Locator, Page, expect } from "@playwright/test";

export class FooterSection {
  readonly page: Page;
  readonly footer: Locator;
  readonly footerSitemap: Locator;
  readonly footerShippingAndReturn: Locator;
  readonly footerPrivaryNotice: Locator;
  readonly footerConditionsOfUse: Locator;
  readonly footerAboutUs: Locator;
  readonly footerContactUs: Locator;
  readonly footerSearch: Locator;
  readonly footerNews: Locator;
  readonly footerBlog: Locator;
  readonly footerRecentlyViewedProducts: Locator;
  readonly footerCompareProductsList: Locator;
  readonly footerNewProduct: Locator;
  readonly footerMyAccount: Locator;
  readonly footerOrder: Locator;
  readonly footerAddress: Locator;
  readonly footerShoppingCart: Locator;
  readonly footerWishlist: Locator;
  readonly footerFacebook: Locator;
  readonly footerTwitter: Locator;
  readonly footerRSS: Locator;
  readonly footerYouTube: Locator;
  readonly footerGoogle: Locator;
  constructor(page: Page) {
    this.footer = page.locator("div.footer");
    this.footerSitemap = this.footer.locator('[href="/sitemap"]');
    this.footerShippingAndReturn = this.footer.locator(
      '[href="/shipping-returns"]'
    );
    this.footerPrivaryNotice = this.footer.locator('[href="/privacy-policy"]');
    this.footerConditionsOfUse = this.footer.locator(
      '[href="/conditions-of-use"]'
    );
    this.footerAboutUs = this.footer.locator('[href="/about-us"]');
    this.footerContactUs = this.footer.locator('[href="/contactus"]');
    this.footerSearch = this.footer.locator('[href="/search"]');
    this.footerNews = this.footer.locator('[href="/news"]');
    this.footerBlog = this.footer.locator('[href="/blog"]');
    this.footerRecentlyViewedProducts = this.footer.locator(
      '[href="/recentlyviewedproducts"]'
    );
    this.footerCompareProductsList = this.footer.locator(
      '[href="/compareproducts"]'
    );
    this.footerNewProduct = this.footer.locator('[href="/newproducts"]');
    this.footerMyAccount = this.footer.locator('[href="/customer/info"]');
    this.footerOrder = this.footer.locator('[href="/customer/orders"]');
    this.footerAddress = this.footer.locator('[href="/customer/addresses"]');
    this.footerShoppingCart = this.footer.locator('[href="/cart"]');
    this.footerWishlist = this.footer.locator('[href="/wishlist"]');
    this.footerFacebook = this.footer.locator(
      '[href="http://www.facebook.com/nopCommerce"]'
    );
    this.footerTwitter = this.footer.locator(
      '[href="https://twitter.com/nopCommerce"]'
    );
    this.footerRSS = this.footer.locator('[href="/news/rss/1"]');
    this.footerYouTube = this.footer.locator(
      '[href="http://www.youtube.com/user/nopCommerce"]'
    );
    this.footerGoogle = this.footer.locator(
      '[href="https://plus.google.com/+nopcommerce"]'
    );
  }
  async verifyFooterSection() {
    await expect(this.footerSitemap).toBeVisible();
    await expect(this.footerShippingAndReturn).toBeVisible();
    await expect(this.footerPrivaryNotice).toBeVisible();
    await expect(this.footerConditionsOfUse).toBeVisible();
    await expect(this.footerAboutUs).toBeVisible();
    await expect(this.footerContactUs).toBeVisible();
    await expect(this.footerSearch).toBeVisible();
    await expect(this.footerNews).toBeVisible();
    await expect(this.footerBlog).toBeVisible();
    await expect(this.footerRecentlyViewedProducts).toBeVisible();
    await expect(this.footerCompareProductsList).toBeVisible();
    await expect(this.footerNewProduct).toBeVisible();
    await expect(this.footerMyAccount).toBeVisible();
    await expect(this.footerOrder).toBeVisible();
    await expect(this.footerAddress).toBeVisible();
    await expect(this.footerShoppingCart).toBeVisible();
    await expect(this.footerWishlist).toBeVisible();
    await expect(this.footerFacebook).toBeVisible();
    await expect(this.footerTwitter).toBeVisible();
    await expect(this.footerRSS).toBeVisible();
    await expect(this.footerYouTube).toBeVisible();
    await expect(this.footerGoogle).toBeVisible();
  }
}
