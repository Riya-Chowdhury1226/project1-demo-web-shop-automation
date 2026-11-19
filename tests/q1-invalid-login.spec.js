const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const { shot } = require('../utils/helpers');

test.describe('Q1 - Invalid Login', () => {
  test('Q1: login with invalid email/password shows error and user is not logged in', async ({ page }, testInfo) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await test.step('Open the login page', async () => {
      await home.open();
      await home.loginLink.click();
      await expect(page).toHaveURL(/login/);
    });

    await test.step('Enter invalid email and password', async () => {
      await login.login('invalid.user.12345@example.com', 'WrongPass@123');
    });

    await test.step('Verify error message and not logged in', async () => {
      await expect(login.errorSummary).toContainText('Login was unsuccessful. Please correct the errors and try again.');
      await expect(login.errorSummary).toContainText('No customer account found');
      await expect(home.loginLink).toBeVisible();
      await expect(home.logoutLink).toHaveCount(0);
      await shot(page, testInfo, 'Q1 - invalid login error');
    });
  });
});