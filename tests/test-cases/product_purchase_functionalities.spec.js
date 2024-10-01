import { test } from '@playwright/test';
import { ShopPage } from '../page/product_purchase_functionalities';

test('validate product purchase functionalities', async ({ page }) => {
  const shopPage = new ShopPage(page);

  // Go to the shop page and select a product
  await shopPage.goto();
  await shopPage.selectProduct();

  // Add product to cart
  await shopPage.addProductToCart();

  // View cart and validate product details
  await shopPage.viewCart();

  // Proceed to checkout
  await shopPage.proceedToCheckout();

  // Fill in contact information
  await shopPage.fillContactInformation('rakib.cse.bubt@gmail.com');

  // Fill in billing address details
  await shopPage.fillBillingAddress({
    country: 'BD',
    firstName: 'Md. Rakibul',
    lastName: 'Islam',
    address: 'DWIP Housing, Road-02, Mirpur-2, Dhaka, Bangladesh',
    city: 'Dhaka',
    district: 'BD-13'
  });

  // Select payment method and place the order
  await shopPage.selectPaymentMethod();
  await shopPage.placeOrder();
});