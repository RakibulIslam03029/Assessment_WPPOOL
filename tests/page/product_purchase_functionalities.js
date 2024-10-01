import { expect } from '@playwright/test';

export class ShopPage {
  constructor(page) {
    this.page = page;
    this.productLink = page.getByRole('link', { name: 'Beanie with Logo' }).first();
    this.productHeading = page.locator('#product-34').getByRole('heading', { name: 'Beanie with Logo' });
    this.quantityIncreaseButton = page.getByRole('link', { name: '+' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.cartMessage = page.getByText('2 × “Beanie with Logo” have');
    this.viewCartLink = page.getByRole('link', { name: 'View cart' });
    this.subtotalText = page.getByText('Subtotal');
    this.subtotalAmount = page.getByText('$36.00').nth(1);
    this.totalText = page.getByText('Total').nth(3);
    this.totalAmount = page.locator('div').filter({ hasText: /^\$36\.00$/ }).locator('span');
    this.proceedToCheckoutLink = page.getByRole('link', { name: 'Proceed to Checkout' });
    this.contactInfoHeading = page.getByRole('group', { name: 'Contact information' }).locator('h2');
    this.emailLabel = page.getByLabel('Email address');
    this.billingAddressHeading = page.getByRole('group', { name: 'Billing address' }).locator('h2');
    this.billingCountry = page.getByLabel('Country/Region');
    this.firstNameLabel = page.getByLabel('First name');
    this.lastNameLabel = page.getByLabel('Last name');
    this.addressLabel = page.getByLabel('Address', { exact: true });
    this.cityLabel = page.getByLabel('City');
    this.districtLabel = page.getByLabel('District');
    this.paymentMethodLabel = page.locator('#radio-control-wc-payment-method-options-cod__label');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.orderReceivedHeading = page.getByRole('heading', { name: 'Order received' });
    this.thankYouText = page.locator('.woocommerce-notice.woocommerce-notice--success.woocommerce-thankyou-order-received');
  }

  async goto() {
    await this.page.goto('https://for-qa-candidate.s4-tastewp.com/shop/');
  }

  async selectProduct() {
    await this.productLink.click();
    await expect(this.productHeading).toBeVisible();
  }

  async addProductToCart() {
    await this.quantityIncreaseButton.click();
    await this.addToCartButton.click();
    await expect(this.cartMessage).toBeVisible();
  }

  async viewCart() {
    await this.viewCartLink.click();
    await expect(this.subtotalText).toBeVisible();
    await expect(this.subtotalAmount).toBeVisible();
    await expect(this.totalText).toBeVisible();
    await expect(this.totalAmount).toBeVisible();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutLink.click();
    await expect(this.contactInfoHeading).toBeVisible();
  }

  async fillContactInformation(email) {
    await this.emailLabel.click();
    await this.emailLabel.fill(email);
  }

  async fillBillingAddress(details) {
    await expect(this.billingAddressHeading).toBeVisible();
    await this.billingCountry.selectOption(details.country);
    await this.firstNameLabel.click();
    await this.firstNameLabel.fill(details.firstName);
    await this.lastNameLabel.click();
    await this.lastNameLabel.fill(details.lastName);
    await this.addressLabel.click();
    await this.addressLabel.fill(details.address);
    await this.cityLabel.click();
    await this.cityLabel.fill(details.city);
    await this.districtLabel.selectOption(details.district);
  }

  async selectPaymentMethod() {
    await this.paymentMethodLabel.click();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
    await expect(this.orderReceivedHeading).toBeVisible();
    await expect(this.thankYouText).toBeVisible();
  }
}
