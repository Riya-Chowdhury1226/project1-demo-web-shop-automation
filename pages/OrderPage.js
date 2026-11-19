const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class OrderPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.locator('.order-completed .title');
    this.orderNumberLine = page.locator('.order-completed .details li').first();
    this.detailsLink = page.locator('.order-completed .details a');
    this.orderNumberOnDetails = page.locator('.order-number');
    this.detailsPage = page.locator('.order-details-page');
  }

  async verifyOrderPlaced() {
    await expect(this.title).toContainText('Your order has been successfully processed!');
  }

  async getOrderNumber() {
    const text = await this.orderNumberLine.innerText();
    const match = text.match(/(\d+)/);
    return match ? match[1] : '';
  }

  async openOrderDetails() {
    await this.detailsLink.click();
  }

  async verifyOrderDetails(orderNumber, productName, qty) {
    await expect(this.page).toHaveURL(/orderdetails/);
    await expect(this.orderNumberOnDetails).toContainText(orderNumber);
    await expect(this.detailsPage).toContainText(productName);
    await expect(this.detailsPage).toContainText(String(qty));
  }
}

module.exports = { OrderPage };