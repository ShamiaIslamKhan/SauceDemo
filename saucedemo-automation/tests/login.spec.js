const { test, expect } = require('@playwright/test');

test.describe('Login tests', () => {

  // Runs before every test in this group
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  test('TC-01: valid login opens products page', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC-02: wrong password shows error', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrongpass');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match'
    );
  });

  test('TC-03: wrong username shows error', async ({ page }) => {
    await page.fill('#user-name', 'wronguser');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match'
    );
  });

  test('TC-04: empty username and password', async ({ page }) => {
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username is required'
    );
  });

  test('TC-05: empty password', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Password is required'
    );
  });

  test('TC-06: locked out user cannot log in', async ({ page }) => {
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'locked out'
    );
  });

  test('TC-07: username is case sensitive', async ({ page }) => {
    await page.fill('#user-name', 'STANDARD_USER');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('TC-08: Enter key submits the login form', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.press('#password', 'Enter');
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC-09: cannot open products page without login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

});