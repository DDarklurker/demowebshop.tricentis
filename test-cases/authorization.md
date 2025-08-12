# Authorization
### *Prerequisites:*

1. Launch browser
2. Navigate to url 'https://demowebshop.tricentis.com'
3. Verify that home page is visible successfully
4. Click on 'Login' button
5. Verify Login Page is visible.

---

**Test Case 1:Login User with correct email and password**
<br> *Automated: Yes.*

1. Enter correct email address and password.
2. Click 'login' button.
3. Verify that 'Logged in as username' is visible.
4. click 'Log out' button.
5. Verify that  'Logged in as username' isn`t visible

**Test Case 2: Login User with incorrect password**
<br> *Automated: No.*

1. Enter correct email address
2. Enter incorrect password.
3. Click 'login' button.
4. Verify that 'The credentials provided are incorrect' is visible.

**Test Case 3:  Login User with incorrect email**
<br> *Automated: No.*

1. Enter correct email address
2. Enter incorrect password.
3. Click 'login' button.
4. Verify that 'No customer account found' is visible.

**Test Case 4:  Login User with invalid email**
<br> *Automated: No.*

1. Enter invalid email.
2. Verify that 'Please enter a valid email address.' is visible.

