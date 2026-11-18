const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.loginLink = page.locator('a.ico-login');
    this.registerLink = page.locator('a.ico-register');
    this.logoutLink = page.locator('a.ico-logout');
    this.accountLink = page.locator('.header-links a.account');
    this.searchBox = page.locator('#small-searchterms');
    this.searchButton = page.locator('input.search-box-button');
  }

  async open() {
    await this.goto('/');
  }

  async openCategory(name) {
    await this.page.locator('ul.top-menu > li > a', { hasText: name }).first().click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async search(term) {
    await this.searchBox.fill(term);
    await this.searchButton.click();
  }
}

module.exports = { HomePage };