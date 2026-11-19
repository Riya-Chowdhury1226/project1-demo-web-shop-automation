const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class SearchResultsPage extends BasePage {
  constructor(page) {
    super(page);
    this.results = page.locator('.search-results .product-item');
    this.titles = page.locator('.search-results .product-item .product-title a');
  }

  async verifyProductShown(productName) {
    await expect(this.results.first()).toBeVisible();
    await expect(this.titles.filter({ hasText: productName }).first()).toBeVisible();
  }

  async openProduct(productName) {
    await this.titles.filter({ hasText: productName }).first().click();
  }
}

module.exports = { SearchResultsPage };