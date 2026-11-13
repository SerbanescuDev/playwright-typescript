import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, customer } from '../utils/testData';

test.describe('Checkout', () => {
  let checkoutPage: CheckoutPage;

  // Login, add one product and go to the checkout page before each test
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('Sauce Labs Onesie');
    await inventoryPage.openCart();

    const cartPage = new CartPage(page);
    await cartPage.checkout();

    checkoutPage = new CheckoutPage(page);
  });

  test('user can complete an order', async ({ page }) => {
    await checkoutPage.fillInformation(customer.firstName, customer.lastName, customer.postalCode);
    await expect(page).toHaveURL(/checkout-step-two.html/);

    await checkoutPage.finish();

    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('error is shown when first name is missing', async () => {
    // Leave the first name empty on purpose
    await checkoutPage.fillInformation('', customer.lastName, customer.postalCode);

    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });
});
