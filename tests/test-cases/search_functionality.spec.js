import { test } from '@playwright/test';
import { ShopPage } from '../page/search_functionality';

test('Validate search functionalities Search Beanie And then validate search result', async ({ page }) => {
  const shopPage = new ShopPage(page);

  // Go to the shop page and verify elements
  await shopPage.goto();
  await shopPage.verifyShopPage();

  // Search for a product("Beanie") and verify results
  await shopPage.searchProduct('Beanie');
  await shopPage.verifyProductSearchResults();

  // View the product and verify product details
  await shopPage.viewProduct();
  await shopPage.verifyProductDetails();

  // Verify product description
  await shopPage.viewDescriptionTab();

  // Verify additional information
  await shopPage.viewAdditionalInformationTab();

  // Verify reviews
  await shopPage.viewReviewsTab();
});
