# Cart

### _Prerequisites:_

1. Launch browser
2. Navigate to `https://demowebshop.tricentis.com/`
3. Verify the home page is visible successfully

---

**Test Case 1 @smoke: add product to cart from category(Book - Computing and Internet)**
<br> Automated: Yes.

1. From the home page, open a category Book.
2. Click "Add to cart" on product "Computing and Internet".
   Result: Visible "The product has been added to your shopping cart" in header.
   Header shows "Shopping cart (1)".
3. Click "Shopping cart".
   Result: The cart contains "Computing and Internet" with quantity 1.

---

**Test Case 2 @smoke: add product to cart from detail product(Book - Computing and Internet)**
<br> Automated: Yes.

1. From the home page, open a category Book.
2. Click on name product "Computing and Internet".
3. Click "Add to cart".
   Result: Visible "The product has been added to your shopping cart" in header.
   Header shows "Shopping cart (1)".
4. Click "Shopping cart".
   Result: The cart contains "Computing and Internet" with quantity 1.
