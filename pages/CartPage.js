const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.rows = page.locator('.cart tbody tr');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
  }

  async open() {
    await this.goto('/cart');
  }

  async verifyItem(productName, qty) {
    const row = this.rows.filter({ hasText: productName });
    await expect(row).toHaveCount(1);
    await expect(row.locator('input.qty-input')).toHaveValue(String(qty));
  }

  async agreeAndCheckout() {
    await this.termsCheckbox.check();
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };