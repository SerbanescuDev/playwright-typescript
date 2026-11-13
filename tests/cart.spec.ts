import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../utils/testData';

test.describe('Cart', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
  });

  test('added products appear in the cart', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');

    // The badge on the cart icon should show the number of products
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.cartItems.first()).toContainText('Sauce Labs Backpack');
  });

  test('product can be removed from the cart', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    await cartPage.removeItem('Sauce Labs Backpack');

    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });
});
