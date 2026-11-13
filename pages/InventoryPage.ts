import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly itemPrices: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.itemPrices = page.locator('.inventory_item_price');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  // Clicks the "Add to cart" button of the product with the given name
  async addToCart(productName: string) {
    const product = this.inventoryItems.filter({ hasText: productName });
    await product.locator('button', { hasText: 'Add to cart' }).click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  // Returns all product prices as numbers, e.g. "$29.99" -> 29.99
  async getPrices() {
    const pricesText = await this.itemPrices.allTextContents();
    return pricesText.map((price) => parseFloat(price.replace('$', '')));
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
