const { test, expect } = require('@playwright/test');

test.describe('Checkout tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');
    await expect(page.locator('#first-name')).toBeVisible();
  });

  test('TC-20: complete checkout successfully', async ({ page }) => {
    await page.fill('#first-name', 'Rahim');
    await page.fill('#last-name', 'Ahmed');
    await page.fill('#postal-code', '1900');
    await page.click('#continue');
    await page.click('#finish');
    await expect(page.locator('.complete-header')).toHaveText(
      'Thank you for your order!'
    );
  });

  test('TC-21: first name is required', async ({ page }) => {
    await page.fill('#last-name', 'Ahmed');
    await page.fill('#postal-code', '1900');
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'First Name is required'
    );
  });

  test('TC-22: last name is required', async ({ page }) => {
    await page.fill('#first-name', 'Rahim');
    await page.fill('#postal-code', '1900');
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Last Name is required'
    );
  });

  test('TC-23: postal code is required', async ({ page }) => {
    await page.fill('#first-name', 'Rahim');
    await page.fill('#last-name', 'Ahmed');
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Postal Code is required'
    );
  });

});