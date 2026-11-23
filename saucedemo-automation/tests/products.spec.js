const { test, expect } = require('@playwright/test');

test.describe('Products page tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('TC-10: 6 products are displayed', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('TC-11: sort by name A to Z', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'az');
    const names = await page.locator('.inventory_item_name').allTextContents();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('TC-12: sort by price low to high', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'lohi');
    const priceTexts = await page.locator('.inventory_item_price').allTextContents();
    const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('TC-13: sort by price high to low', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'hilo');
    const priceTexts = await page.locator('.inventory_item_price').allTextContents();
    const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('TC-14: logout returns to login page', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});