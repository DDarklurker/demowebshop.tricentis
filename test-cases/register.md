# Register

### _Prerequisites:_

1. Launch browser
2. Navigate to url 'https://demowebshop.tricentis.com'
3. Verify that home page is visible successfully
4. Click on 'Register' button
5. Verify Login Page is visible.

---

**Test Case 1 @smoke: Successfully registration (male/female, parameterized)**
<br> Automated: Yes.

1. Fill all fields, necessary fields valid data.
2. Click 'Register' button.
   Result: Saw “Your registration completed”, button Continue, user loggined (in header Log out / My account).

**Test Case 2 @validation: Empty fields -> required errors**
<br> Automated: Yes.

1. Click 'Register' button.
   Result: Error near First name, Last name, Email, Password, Confirm password.

**Test Case 3 @validation: Invalid email formats**
<br> Automated: Yes.

1. Fill all fields with valid data
2. Test with invalid email formats:
   - "invalidemail" (without @ symbol)
   - "test@" (without domain)
   - "test @example.com" (with spaces)
3. Click register button for each invalid email
   Result: Error message "Wrong email" appears near email field for each invalid format
   **Test Case 4 @validation: Password ≠ Confirm password**
   <br> Automated: Yes.

4. Fill all fields with valid data
5. Enter different password in 'Confirm password' field
6. Click 'Register' button
   Result: Error message "The password and confirmation password do not match." appears

**Test Case 5 @regression: Email already exists**
<br> Automated: Yes.

1. Prerequisites: Existing account with email already registered
2. Fill all fields with valid data using existing email address
3. Click 'Register' button
   Result: Error message "The specified email already exists" appears

**Test Case 6 @functional: Gender radio buttons mutual exclusivity**
<br> Automated: Yes.

1. Select 'Male' radio button
2. Verify that 'Female' radio button is not selected
3. Select 'Female' radio button
4. Verify that 'Male' radio button is not selected

**Test Case 7 @functional: Newsletter checkbox state**
<br> Automated: Yes.

1. Check 'Newsletter' checkbox
2. Click 'Register' button
   Result: Registration successful with newsletter subscription
3. Repeat registration without newsletter checkbox
   Result: Registration successful without newsletter subscription

**Test Case 8 @functional: Field trimming (leading/trailing spaces)**
<br> Automated: Yes.

1. Fill First name, Last name, Email fields with leading and trailing spaces
2. Fill remaining fields with valid data
3. Click 'Register' button
   Result: Spaces are ignored, registration is successful

**Test Case 9 @functional: Email case-insensitive**
<br> Automated: Yes.

1. Register with email 'QA@EXAMPLE.COM'
   Result: Registration successful
2. Attempt to register again with 'qa@example.com'
   Result: Error message "The specified email already exists" appears

**Test Case 10 @functional: International characters in names**
<br> Automated: Yes.

1. Fill First name with international characters (e.g., 'Олег', 'İrem', 'José')
2. Fill Last name with international characters
3. Fill remaining fields with valid data
4. Click 'Register' button
   Result: Registration successful without errors

**Test Case 11 @functional: Password field is hidden**
<br> Automated: Yes.

1. Enter password in 'Password' field
2. Verify that input type is 'password' and characters are not visible
3. Enter password in 'Confirm password' field
4. Verify that input type is 'password' and characters are not visible

**Test Case 12 @error-handling: Server error handling (500 error)**
<br> Automated: No.

1. Mock POST /register endpoint to return 500 error
2. Fill all fields with valid data
3. Click 'Register' button
   Result: User remains on registration page, error message is displayed

**Test Case 13 @functional: Register button disabled during submission**
<br> Automated: No.

1. Mock server response delay of 2-3 seconds
2. Fill all fields with valid data
3. Click 'Register' button multiple times quickly
   Result: Button becomes disabled, no duplicate submissions occur

**Test Case 14 @functional: Form data persistence after validation error**
<br> Automated: Yes.

1. Fill all fields with valid data except 'Confirm password'
2. Click 'Register' button
   Result: All fields except password fields retain their values after error

**Test Case 15 @navigation: Continue button redirects to home page**
<br> Automated: Yes.

1. Complete successful registration
2. Click 'Continue' button
   Result: Redirected to home page, user is logged in (header shows 'Log out' and 'My account')

**Test Case 16 @accessibility: Labels, roles, and associations**
<br> Automated: No.

1. Verify all form fields have visible labels or aria-label attributes
2. Verify gender radio buttons have proper radio role and clear labels
3. Verify error messages are associated with fields through aria-describedby
4. Verify form structure is accessible to screen readers

**Test Case 17 @accessibility: Keyboard navigation (TAB order)**
<br> Automated: No.

1. Navigate through form fields using TAB key from Gender to Register button
2. Use Space/Enter keys on radio buttons and buttons
   Result: Logical tab order and full keyboard control of all interactive elements

**Test Case 18 @visual: Registration page snapshot**
<br> Automated: No.

1. Navigate to registration page
2. Take screenshot of the page
   Result: Visual regression test passes without deviations from baseline design

**Test Case 19 @performance: Page load time**
<br> Automated: No.

1. Navigate to registration page
2. Measure page load time
   Result: Page loads within acceptable time limits (e.g., < 3 seconds)

**Test Case 20 @security: Password strength validation**
<br> Automated: Yes.

1. Enter weak password (e.g., '123')
2. Click 'Register' button
   Result: Password strength validation message appears or registration fails with appropriate error

**Test Case 21 @boundary: Maximum field length limits**
<br> Automated: Yes.

1. Fill fields with maximum allowed character lengths
2. Attempt to exceed character limits
   Result: System enforces field length limits appropriately

**Test Case 22 @integration: Registration with external email provider**
<br> Automated: No.

1. Register with email from different providers (Gmail, Yahoo, Outlook)
2. Verify email confirmation process works
   Result: Registration works consistently across different email providers
