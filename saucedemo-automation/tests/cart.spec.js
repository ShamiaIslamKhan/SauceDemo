const { test, expect } = require('@playwright/test');

test.describe('Cart tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('TC-15: add one item, badge shows 1', async ({ page }) => {
    await page.click('#add-to-cart-sauce-labs-backpack');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('TC-16: add two items, badge shows 2', async ({ page }) => {
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#add-to-cart-sauce-labs-bike-light');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  test('TC-17: button changes to Remove after adding', async ({ page }) => {
    await page.click('#add-to-cart-sauce-labs-backpack');
    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();
  });

  test('TC-18: remove item, badge disappears', async ({ page }) => {
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#remove-sauce-labs-backpack');
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  test('TC-19: cart page lists the added item', async ({ page }) => {
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(
    'Sauce Labs Backpack'
  );
});

});