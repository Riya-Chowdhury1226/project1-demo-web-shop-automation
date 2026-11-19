const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { RegisterPage } = require('../pages/RegisterPage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { OrderPage } = require('../pages/OrderPage');
const { newUser, billingAddress } = require('../utils/testData');
const { shot } = require('../utils/helpers');

test.describe('Q3 - Search to Order (E2E)', () => {
  test('Q3: search product, add to cart, checkout and verify order details', async ({ page }, testInfo) => {
    const user = newUser();
    const searchTerm = 'Health';
    const productName = 'Health Book';
    const quantity = 3;

    const home = new HomePage(page);
    const register = new RegisterPage(page);
    const results = new SearchResultsPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const order = new OrderPage(page);

    await test.step('Pre-condition: register a new customer (auto logged in)', async () => {
      await register.open();
      await register.register(user);
      await expect(register.result).toContainText('Your registration completed');
      await register.clickContinue();
    });

    await test.step('Search product and verify search result', async () => {
      await home.search(searchTerm);
      await results.verifyProductShown(productName);
      await shot(page, testInfo, 'Q3 - search results');
    });

    await test.step('Open product, increase quantity, add to cart', async () => {
      await results.openProduct(productName);
      await expect(product.title).toHaveText(productName);
      await product.setQuantity(quantity);
      await product.addToCart();
    });

    await test.step('Verify cart, agree to terms and checkout', async () => {
      await cart.open();
      await cart.verifyItem(productName, quantity);
      await shot(page, testInfo, 'Q3 - cart');
      await cart.agreeAndCheckout();
      await expect(page).toHaveURL(/onepagecheckout/);
    });

    await test.step('Complete checkout steps and confirm order', async () => {
      await checkout.completeCheckout(billingAddress);
      await order.verifyOrderPlaced();
      await shot(page, testInfo, 'Q3 - order confirmation');
    });

    await test.step('Open and verify order details', async () => {
      const orderNumber = await order.getOrderNumber();
      expect(orderNumber).not.toBe('');
      await order.openOrderDetails();
      await order.verifyOrderDetails(orderNumber, productName, quantity);
      await shot(page, testInfo, 'Q3 - order details');
    });
  });
});