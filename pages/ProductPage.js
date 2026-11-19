const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.locator('.product-name h1');
    this.quantity = page.locator('input.qty-input');
    this.addToCartButton = page.locator('input.add-to-cart-button');
    this.notification = page.locator('#bar-notification .content');
  }

  async openFromList(productName) {
    await this.page
      .locator('.product-item .product-title a')
      .filter({ hasText: new RegExp(`^\\s*${productName}\\s*$`) })
      .first()
      .click();
  }

  async setQuantity(qty) {
    await this.quantity.fill(String(qty));
  }

  async addToCart() {
    await this.addToCartButton.click();
    await expect(this.notification).toContainText('The product has been added to your');
  }
}

module.exports = { ProductPage };