const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const { RegisterPage } = require('../pages/RegisterPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { newUser } = require('../utils/testData');
const { shot } = require('../utils/helpers');

test.describe('Q2 - Register + Add Product to Cart', () => {
  test('Q2: register, login, add product to cart and verify product and quantity', async ({ page }, testInfo) => {
    const user = newUser();
    const productName = 'Fiction';
    const quantity = 2;

    const home = new HomePage(page);
    const login = new LoginPage(page);
    const register = new RegisterPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await test.step('Register a new customer', async () => {
      await register.open();
      await register.register(user);
      await expect(register.result).toContainText('Your registration completed');
      await shot(page, testInfo, 'Q2 - registration completed');
      await register.clickContinue();
    });

    await test.step('Logout and login again with the new account', async () => {
      await home.logout();
      await login.open();
      await login.login(user.email, user.password);
      await expect(home.accountLink).toContainText(user.email);
      await shot(page, testInfo, 'Q2 - logged in');
    });

    await test.step('Open Books category and select a product', async () => {
      await home.openCategory('Books');
      await product.openFromList(productName);
      await expect(product.title).toHaveText(productName);
    });

    await test.step('Set quantity and add to cart', async () => {
      await product.setQuantity(quantity);
      await product.addToCart();
      await shot(page, testInfo, 'Q2 - product added');
    });

    await test.step('Verify product and quantity in the cart', async () => {
      await cart.open();
      await cart.verifyItem(productName, quantity);
      await shot(page, testInfo, 'Q2 - shopping cart');
    });
  });
});