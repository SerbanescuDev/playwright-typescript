import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../utils/testData';

test.describe('Inventory', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    inventoryPage = new InventoryPage(page);
  });

  test('inventory page shows 6 products', async () => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('products can be sorted by price from low to high', async () => {
    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.getPrices();
    // Make a sorted copy and compare it with what is shown on the page
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });
});
