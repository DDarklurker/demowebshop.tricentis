import { ProductDetail } from "../pages/product/productDetail";
import { test as base } from "./fixtureBase";
import { THomePage } from "./types";

export const test = base.extend<THomePage>({
  productDetail: async ({ page }, use) => {
    const productDetail = new ProductDetail(page);
    use(productDetail);
  },
});
