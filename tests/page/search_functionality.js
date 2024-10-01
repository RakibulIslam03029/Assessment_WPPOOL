import { expect } from '@playwright/test';

export class ShopPage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.getByRole('searchbox', { name: 'Insert search query' });
    this.shopHeading = page.getByRole('heading', { name: 'Shop' });
    this.browseText = page.getByText('This is where you can browse');
    this.productLink = page.getByRole('link', { name: 'Beanie' }).nth(3);
    this.productTitle = page.getByTitle('Beanie', { exact: true });
    this.productDescription = page.locator('#post-17').getByText('This is a simple product.');
    this.productPageHeading = page.locator('.single-post-title.product_title.entry-title');
    this.productPrice = page.locator('div[class="summary entry-summary"] ins[aria-hidden="true"] bdi:nth-child(1)');
    this.productInfo = page.getByText('SKU: woo-beanie Category:');
    this.descriptionTab = page.getByRole('link', { name: 'Description' });
    this.descriptionHeading = page.getByRole('heading', { name: 'Description' });
    this.descriptionContent = page.getByText('Pellentesque habitant morbi');
    this.additionalInfoTab = page.getByRole('link', { name: 'Additional information' });
    this.colorRowHeader = page.getByRole('rowheader', { name: 'Color' });
    this.colorCell = page.getByRole('cell', { name: 'Red' });
    this.reviewsTab = page.getByRole('link', { name: 'Reviews (0)' });
    this.reviewsContent = page.getByText('Reviews There are no reviews');
  }

  async goto() {
    await this.page.goto('https://for-qa-candidate.s4-tastewp.com/shop/');
  }

  async verifyShopPage() {
    await expect(this.shopHeading).toBeVisible();
    await expect(this.browseText).toBeVisible();
  }

  async searchProduct(productName) {
    await this.searchBox.click();
    await this.searchBox.fill(productName);
    await this.searchBox.press('Enter');
  }

  async verifyProductSearchResults() {
    await expect(this.productLink).toBeVisible();
    await expect(this.productTitle).toBeVisible();
    await expect(this.productDescription).toBeVisible();
  }

  async viewProduct() {
    await this.productTitle.click();
  }

  async verifyProductDetails() {
    await expect(this.productPageHeading).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productInfo).toBeVisible();
  }

  async viewDescriptionTab() {
    await this.descriptionTab.click();
    await expect(this.descriptionHeading).toBeVisible();
    await expect(this.descriptionContent).toBeVisible();
  }

  async viewAdditionalInformationTab() {
    await this.additionalInfoTab.click();
    await expect(this.colorRowHeader).toBeVisible();
    await this.colorCell.click();
  }

  async viewReviewsTab() {
    await this.reviewsTab.click();
    await expect(this.reviewsContent).toBeVisible();
  }
}
