# Test Cases

Manual test cases for SauceDemo. TC01 - TC10 are covered by the automated tests, TC11 - TC15 are not automated yet.

- **Website:** https://www.saucedemo.com
- **Browser:** Chrome
- **User:** standard_user / secret_sauce (unless another user is mentioned)

| ID | Title | Priority | Automated test |
|----|-------|----------|----------------|
| TC01 | Login with valid credentials | High | tests/login.spec.ts |
| TC02 | Login with locked out user | High | tests/login.spec.ts |
| TC03 | Login with wrong password | High | tests/login.spec.ts |
| TC04 | Logout | High | tests/login.spec.ts |
| TC05 | Inventory page shows all products | High | tests/inventory.spec.ts |
| TC06 | Sort products by price (low to high) | Medium | tests/inventory.spec.ts |
| TC07 | Add products to the cart | High | tests/cart.spec.ts |
| TC08 | Remove a product from the cart | High | tests/cart.spec.ts |
| TC09 | Complete an order | High | tests/checkout.spec.ts |
| TC10 | Checkout without first name | Medium | tests/checkout.spec.ts |
| TC11 | Login with empty username | Medium | To do |
| TC12 | Inventory page cannot be opened without login | High | To do |
| TC13 | Sort products by price (high to low) | Medium | To do |
| TC14 | Checkout without postal code | Medium | To do |
| TC15 | Order overview shows the correct total | High | To do |

---

## TC01 - Login with valid credentials

- **Priority:** High
- **Precondition:** The login page is open.
- **Test data:** standard_user / secret_sauce

**Steps:**
1. Enter the username
2. Enter the password
3. Click Login

**Expected result:** The user is logged in and the Products page is displayed.

---

## TC02 - Login with locked out user

- **Priority:** High
- **Precondition:** The login page is open.
- **Test data:** locked_out_user / secret_sauce

**Steps:**
1. Enter the username
2. Enter the password
3. Click Login

**Expected result:** The user is not logged in. The error "Epic sadface: Sorry, this user has been locked out." is displayed.

---

## TC03 - Login with wrong password

- **Priority:** High
- **Precondition:** The login page is open.
- **Test data:** standard_user / wrong_password

**Steps:**
1. Enter the username
2. Enter the wrong password
3. Click Login

**Expected result:** The user is not logged in. The error "Epic sadface: Username and password do not match any user in this service" is displayed.

---

## TC04 - Logout

- **Priority:** High
- **Precondition:** The user is logged in.

**Steps:**
1. Click the menu button in the top left corner
2. Click Logout

**Expected result:** The user is logged out and the login page is displayed.

---

## TC05 - Inventory page shows all products

- **Priority:** High
- **Precondition:** The user is logged in.

**Steps:**
1. Check the list of products on the Products page

**Expected result:** 6 products are displayed.

---

## TC06 - Sort products by price (low to high)

- **Priority:** Medium
- **Precondition:** The user is logged in.

**Steps:**
1. Open the sort dropdown in the top right corner
2. Select "Price (low to high)"

**Expected result:** The products are sorted from the cheapest to the most expensive.

---

## TC07 - Add products to the cart

- **Priority:** High
- **Precondition:** The user is logged in and the cart is empty.

**Steps:**
1. Click "Add to cart" for Sauce Labs Backpack
2. Click "Add to cart" for Sauce Labs Bike Light
3. Click the cart icon

**Expected result:**
- The cart icon shows 2
- Both products are listed in the cart

---

## TC08 - Remove a product from the cart

- **Priority:** High
- **Precondition:** The user is logged in and Sauce Labs Backpack is in the cart.

**Steps:**
1. Click the cart icon
2. Click "Remove" for Sauce Labs Backpack

**Expected result:**
- The cart is empty
- The number on the cart icon is no longer displayed

---

## TC09 - Complete an order

- **Priority:** High
- **Precondition:** The user is logged in and Sauce Labs Onesie is in the cart.
- **Test data:** John / Smith / 12345

**Steps:**
1. Click the cart icon
2. Click Checkout
3. Enter first name, last name and postal code
4. Click Continue
5. Click Finish

**Expected result:**
- After step 4 the order overview page is displayed
- After step 5 the message "Thank you for your order!" is displayed

---

## TC10 - Checkout without first name

- **Priority:** Medium
- **Precondition:** The user is logged in and Sauce Labs Onesie is in the cart.
- **Test data:** last name Smith, postal code 12345

**Steps:**
1. Click the cart icon
2. Click Checkout
3. Leave the first name empty
4. Enter last name and postal code
5. Click Continue

**Expected result:** The user stays on the same page. The error "Error: First Name is required" is displayed.

---

## TC11 - Login with empty username

- **Priority:** Medium
- **Precondition:** The login page is open.
- **Test data:** password secret_sauce
- **Status:** To do

**Steps:**
1. Leave the username empty
2. Enter the password
3. Click Login

**Expected result:** The user is not logged in. The error "Epic sadface: Username is required" is displayed.

---

## TC12 - Inventory page cannot be opened without login

- **Priority:** High
- **Precondition:** The user is not logged in.
- **Status:** To do

**Steps:**
1. Open https://www.saucedemo.com/inventory.html directly in the browser

**Expected result:** The products are not displayed. The login page is shown with the error "Epic sadface: You can only access '/inventory.html' when you are logged in."

---

## TC13 - Sort products by price (high to low)

- **Priority:** Medium
- **Precondition:** The user is logged in.
- **Status:** To do

**Steps:**
1. Open the sort dropdown in the top right corner
2. Select "Price (high to low)"

**Expected result:** The products are sorted from the most expensive to the cheapest. The first product is Sauce Labs Fleece Jacket ($49.99).

---

## TC14 - Checkout without postal code

- **Priority:** Medium
- **Precondition:** The user is logged in and a product is in the cart.
- **Test data:** John / Smith
- **Status:** To do

**Steps:**
1. Click the cart icon
2. Click Checkout
3. Enter first name and last name
4. Leave the postal code empty
5. Click Continue

**Expected result:** The user stays on the same page. The error "Error: Postal Code is required" is displayed.

---

## TC15 - Order overview shows the correct total

- **Priority:** High
- **Precondition:** The user is logged in and only Sauce Labs Backpack is in the cart.
- **Test data:** John / Smith / 12345
- **Status:** To do

**Steps:**
1. Click the cart icon
2. Click Checkout
3. Enter first name, last name and postal code
4. Click Continue
5. Check the prices on the overview page

**Expected result:**
- Item total: $29.99
- Tax: $2.40
- Total: $32.39
