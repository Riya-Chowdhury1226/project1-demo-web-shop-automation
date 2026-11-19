const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.country = page.locator('#BillingNewAddress_CountryId');
    this.state = page.locator('#BillingNewAddress_StateProvinceId');
    this.city = page.locator('#BillingNewAddress_City');
    this.address1 = page.locator('#BillingNewAddress_Address1');
    this.zip = page.locator('#BillingNewAddress_ZipPostalCode');
    this.phone = page.locator('#BillingNewAddress_PhoneNumber');
    this.billingContinue = page.locator('#billing-buttons-container input.new-address-next-step-button');
    this.shippingAddressContinue = page.locator('#shipping-buttons-container input.new-address-next-step-button');
    this.shippingMethodContinue = page.locator('#shipping-method-buttons-container input.shipping-method-next-step-button');
    this.paymentMethodContinue = page.locator('#payment-method-buttons-container input.payment-method-next-step-button');
    this.paymentInfoContinue = page.locator('#payment-info-buttons-container input.payment-info-next-step-button');
    this.confirmButton = page.locator('#confirm-order-buttons-container input.confirm-order-next-step-button');
  }

  async fillBillingAddress(addr) {
    await this.country.selectOption({ label: addr.country });
    if (addr.state) {
      await this.state.selectOption({ label: addr.state });
    }
    await this.city.fill(addr.city);
    await this.address1.fill(addr.address1);
    await this.zip.fill(addr.zip);
    await this.phone.fill(addr.phone);
    await this.billingContinue.click();
  }

  async completeCheckout(addr) {
    await this.fillBillingAddress(addr);

    // If the site shows a separate "Shipping address" step, continue it
    try {
      await this.shippingMethodContinue.waitFor({ state: 'visible', timeout: 10000 });
    } catch (e) {
      if (await this.shippingAddressContinue.isVisible()) {
        await this.shippingAddressContinue.click();
      }
    }

    await this.shippingMethodContinue.click();
    await this.paymentMethodContinue.click();
    await this.paymentInfoContinue.click();
    await this.confirmButton.click();
  }
}

module.exports = { CheckoutPage };