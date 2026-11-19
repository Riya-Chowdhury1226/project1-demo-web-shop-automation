const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.loginButton = page.locator('input.login-button');
    this.errorSummary = page.locator('.validation-summary-errors');
  }

  async open() {
    await this.goto('/login');
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };