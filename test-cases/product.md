# Product

### _Prerequisites:_

1. Launch browser
2. Navigate to `https://demowebshop.tricentis.com/`
3. Verify the home page is visible successfully

---

**Test Case 1 @smoke: Open a product category (e.g., Gift Cards)**
<br> Automated: Yes.

1. From the home page, open a category (e.g., `Gift Cards`).
2. Verify the page title and breadcrumbs.
   Result: The correct category is shown with valid breadcrumbs.

**Test Case 2 @ui: Product list card elements in category**
<br> Automated: Yes.

1. Open any category with products (e.g., `Featured products`).
2. For each product card verify: image, name (link), price, `Add to cart`, `Add to wishlist`, `Add to compare` (if available), rating (if present).
   Result: All key elements are present and clickable.

**Test Case 3 @navigation: Navigate to Product Details Page (PDP) from list**
<br> Automated: Yes.

1. Click the product name in the list (e.g., `Featured products`).
   Result: PDP open with correct URL, title, and breadcrumbs.

**Test Case 4 @ui: PDP elements**
<br> Automated: Yes.

1. On PDP verify: name, sku (if any), price, description (short/long), gallery/images, availability, quantity input, `Add to cart`, `Add to wishlist`, `Email a friend`, `Add to compare list` (if available), tags/categories, rating/reviews.
   Result: All key elements are present and rendered correctly.

**Test Case 5 @functional: Add to cart from list**
<br> Automated: Yes.

1. In a category page, click `Add to cart` for a simple product (no attributes).
   Result: Success notification is shown, header `Shopping cart` counter updates, item is visible in the cart.

**Test Case 6 @functional: Add to cart from PDP**
<br> Automated: Yes.

1. Open PDP of any simple product.
2. Click `Add to cart`.
   Result: Item is added, cart counter increases, the cart shows the added item.

**Test Case 7 @validation: Attribute selection required (e.g., size/color)**
<br> Automated: Yes.

1. On a configurable product PDP, try `Add to cart` without selecting required attributes.
   Result: Validation error prompts to select options.

**Test Case 8 @functional: Quantity increase/decrease**
<br> Automated: Yes.

1. On PDP change quantity (e.g., from 1 to 3) and add to cart.
   Result: Cart shows 3 units; total price is correct.

**Test Case 9 @validation: Invalid quantity values**
<br> Automated: Yes.

1. On PDP set quantity to `0`, a negative number, or non-numeric characters.
   Result: Validation/error is shown; item is not added.

**Test Case 10 @functional: Sorting in category**
<br> Automated: Yes.

1. In a category, change sort order (e.g., `Price: Low to High`).
   Result: Products are sorted according to the selected criterion.

**Test Case 11 @functional: Pagination and items per page**
<br> Automated: Yes.

1. In a category, set `Display per page` (e.g., 4/8/12) and navigate to the next page.
   Result: Number of cards matches selection; page navigation works.

**Test Case 12 @functional: Filtering (if available for the category)**
<br> Automated: Yes.

1. Apply a filter (e.g., price or attribute if present).
   Result: Only matching products are displayed.

**Test Case 13 @functional: Add to wishlist from list and PDP**
<br> Automated: Yes.

1. Add an item to `Wishlist` from the category page and from PDP.
   Result: Header `Wishlist` counter updates; item appears in the wishlist.

**Test Case 14 @functional: Add to compare list**
<br> Automated: Yes.

1. Add 2 items to the `Compare products list`.
   Result: Compare page opens with correct attributes for both items.

**Test Case 15 @functional: Image gallery and zoom on PDP**
<br> Automated: Yes.

1. Switch image thumbnails; open zoom/lightbox.
   Result: Images switch correctly; zoom works; no layout breaks.

**Test Case 16 @content: Product description and specifications**
<br> Automated: Yes.

1. Verify presence of short/full description and technical specs (if tabs exist).
   Result: Texts render fully without truncation; formatting preserved.

**Test Case 17 @reviews: Reviews and rating**
<br> Automated: Yes.

1. On PDP check reviews/rating section.
2. If allowed — submit a review (logged-in).
   Result: Review appears after submit/moderation; rating updates.

**Test Case 18 @gift-cards: $25 Virtual Gift Card**
<br> Automated: Yes.

1. Open `Gift Cards` → `$25 Virtual Gift Card`.
2. Try to add to cart without filling required recipient/sender/message fields.
   Result: Validation errors are shown.
3. Fill valid data and add to cart.
   Result: Item is added successfully; correct name and price in cart.

**Test Case 19 @digital-downloads: Digital products**
<br> Automated: Yes.

1. Open `Digital downloads` category.
2. Add a digital product to cart.
   Result: Item is added without shipping attributes; downloads available post-purchase (out of scope here).

**Test Case 20 @stock: Availability display**
<br> Automated: Yes.

1. Verify availability status (In stock / Out of stock) on PDP/list (if shown).
   Result: Status is correct and consistent with ability to add to cart.

**Test Case 21 @price: Price recalculation on attribute change**
<br> Automated: Yes.

1. On configurable PDP change price-impacting attributes.
   Result: Price updates dynamically; cart total matches selection.

**Test Case 22 @navigation: Breadcrumbs and back to category**
<br> Automated: Yes.

1. From PDP click the parent category in breadcrumbs.
   Result: Navigates back to correct category without errors.

**Test Case 23 @email: Email a friend (logged-in)**
<br> Automated: Yes.

1. On PDP click `Email a friend` (log in if needed).
2. Send to a valid email.
   Result: Confirmation is shown; invalid email triggers validation.

**Test Case 24 @accessibility: Image ALT and semantic roles**
<br> Automated: No.

1. Verify `alt` attributes on main product images.
2. Ensure buttons/links have proper roles and accessible names.
   Result: Meets basic accessibility requirements.

**Test Case 25 @a11y: Keyboard navigation on PDP**
<br> Automated: No.

1. TAB through all interactive elements on PDP.
2. Activate actions with Enter/Space.
   Result: Logical focus order; all controls keyboard accessible.

**Test Case 26 @performance: PDP load performance**
<br> Automated: No.

1. Measure PDP load time and main image load.
   Result: Within acceptable limits (e.g., < 3s for primary content).

**Test Case 27 @seo: Meta data and friendly URL**
<br> Automated: No.

1. Check `title`, `meta description`, and URL structure (readable slug).
   Result: No empty/duplicate meta; URL is human-readable.

**Test Case 28 @security: No sensitive data in URL/DOM**
<br> Automated: No.

1. Ensure no sensitive values appear in URL/DOM when changing attributes/quantity.
   Result: No data leakage.

**Test Case 29 @boundary: Message field max length (Gift Card)**
<br> Automated: Yes.

1. On `$25 Virtual Gift Card` enter a `Message` beyond max allowed length.
   Result: Input limited/validation shown; no improper truncation.

**Test Case 30 @boundary: Large quantities (stress add)**
<br> Automated: Yes.

1. On PDP set a large quantity (e.g., 99) and add to cart (if allowed).
   Result: Cart total is correct; limits show proper errors if exceeded.

**Test Case 31 @integration: Related/also purchased products**
<br> Automated: Yes.

1. On PDP verify `Related products` / `Customers also purchased` (if present).
   Result: Links work; navigation to other PDPs is correct.

**Test Case 32 @wishlist-cart: Move from Wishlist to Cart**
<br> Automated: Yes.

1. Add item to `Wishlist` → open `Wishlist` → add to `Cart`.
   Result: Item appears in cart with preserved attributes/quantity (when applicable).

**Test Case 33 @compare: Remove from compare list**
<br> Automated: Yes.

1. On compare page remove one item.
   Result: List updates; only selected items remain.

**Test Case 34 @error-handling: Network failure on Add to cart**
<br> Automated: No.

1. Mock 500/timeout on `Add to cart`.
   Result: Clear error message; no duplicate submissions.

**Test Case 35 @localization: Currency/locale (if available)**
<br> Automated: No.

1. Change currency/language (if option exists) and verify PDP/category.
   Result: Prices/formatting reflect selected locale.

**Test Case 36 @navigation: Browser Back from PDP**
<br> Automated: Yes.

1. Open PDP from category; press browser Back.
   Result: Returns to previous list position and preserves sort/filter/pagination.

**Test Case 37 @ui: Long names and descriptions layout**
<br> Automated: Yes.

1. Check layout with long names/descriptions (no overlaps/breaks).
   Result: Text wraps properly; page remains intact.

**Test Case 38 @functional: Quick add to cart on Home (Featured products)**
<br> Automated: Yes.

1. On Home under `Featured products`, click `Add to cart` for a simple item.
   Result: Item is added; success toast shown; cart counter updates.

**Test Case 39 @consistency: Price consistency across list/PDP/cart**
<br> Automated: Yes.

1. Compare product price in list, on PDP, and in cart (same attributes).
   Result: Values match; taxes/discounts reflected as expected.

**Test Case 40 @tags: Popular tags / browse by tag**
<br> Automated: Yes.

1. On Home click a popular tag (e.g., `apparel`).
   Result: Tag page opens with correct product list elements.
