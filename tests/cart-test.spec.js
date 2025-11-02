const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Cart Functionality Tests', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear localStorage and cookies before each test
    await context.clearCookies();

    // Use the http server
    await page.goto('http://127.0.0.1:8000/index.html');

    // Clear localStorage after page load
    await page.evaluate(() => localStorage.clear());

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Wait for header to load
    await page.waitForSelector('nav', { timeout: 10000 });
  });

  test('Cart button should be visible in header', async ({ page }) => {
    const cartButton = page.locator('#cart-link');
    await expect(cartButton).toBeVisible();
    console.log('✅ Cart button is visible');
  });

  test('Add to Cart button should work and update badge', async ({ page }) => {
    // Navigate to shop section
    await page.locator('#shop').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Wait for products to load
    await page.waitForSelector('.product-card', { timeout: 5000 });

    // Get initial cart count
    const initialCount = await page.locator('#cart-count').textContent();
    console.log(`Initial cart count: ${initialCount || '0'}`);

    // Find and click the first "Add to Cart" button
    const addButton = page.locator('[data-add-to-cart]').first();
    await addButton.click();
    console.log('✅ Clicked Add to Cart button');

    // Wait for cart to update
    await page.waitForTimeout(1000);

    // Check that cart badge is now visible and shows 1
    const cartBadge = page.locator('#cart-count');
    await expect(cartBadge).toBeVisible();
    const newCount = await cartBadge.textContent();
    console.log(`New cart count: ${newCount}`);
    expect(newCount).toBe('1');
    console.log('✅ Cart badge updated correctly');
  });

  test('Clicking cart button should open cart modal', async ({ page }) => {
    // First add an item to cart
    await page.locator('#shop').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const addButton = page.locator('[data-add-to-cart]').first();
    await addButton.click();
    await page.waitForTimeout(1000);

    // Now click the cart button
    const cartButton = page.locator('#cart-link');
    await cartButton.click();
    console.log('✅ Clicked cart button');

    await page.waitForTimeout(1000);

    // Check that checkout modal is visible
    const checkoutModal = page.locator('#checkout-modal');
    await expect(checkoutModal).toHaveClass(/active/);
    console.log('✅ Cart modal opened');

    // Verify cart items are displayed
    const cartItems = page.locator('#cart-items .checkout-item');
    const itemCount = await cartItems.count();
    expect(itemCount).toBeGreaterThan(0);
    console.log(`✅ Cart shows ${itemCount} item(s)`);
  });

  test('Cart should persist after page reload', async ({ page }) => {
    // Add item to cart
    await page.locator('#shop').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const addButton = page.locator('[data-add-to-cart]').first();
    await addButton.click();
    await page.waitForTimeout(1000);

    // Verify cart count
    let cartBadge = page.locator('#cart-count');
    let count = await cartBadge.textContent();
    expect(count).toBe('1');
    console.log('✅ Item added to cart');

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check cart count is still 1
    cartBadge = page.locator('#cart-count');
    count = await cartBadge.textContent();
    expect(count).toBe('1');
    console.log('✅ Cart persisted after page reload');
  });

  test('Clear cart button should empty the cart', async ({ page }) => {
    // Add item to cart
    await page.locator('#shop').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const addButton = page.locator('[data-add-to-cart]').first();
    await addButton.click();
    await page.waitForTimeout(1000);

    // Open cart modal
    const cartButton = page.locator('#cart-link');
    await cartButton.click();
    await page.waitForTimeout(1000);

    // Click clear cart button
    const clearButton = page.locator('#clear-cart');
    await clearButton.click();
    await page.waitForTimeout(1000);

    // Verify cart is empty (badge should not be visible)
    const cartBadge = page.locator('#cart-count');
    await expect(cartBadge).not.toBeVisible();
    console.log('✅ Cart cleared successfully');
  });

  test('QuickView add to cart should work', async ({ page }) => {
    // Click on product card to open quickview
    await page.locator('#shop').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const productCard = page.locator('.product-card').first();
    await productCard.click();
    await page.waitForTimeout(1000);

    // Verify quickview modal opened
    const quickviewModal = page.locator('#quickview-modal');
    await expect(quickviewModal).toHaveClass(/active/);
    console.log('✅ QuickView modal opened');

    // Click add to cart in quickview
    const quickviewAddButton = page.locator('#quickview-add');
    await quickviewAddButton.click();
    await page.waitForTimeout(1000);

    // Check cart badge updated
    const cartBadge = page.locator('#cart-count');
    await expect(cartBadge).toBeVisible();
    const count = await cartBadge.textContent();
    expect(count).toBe('1');
    console.log('✅ Item added from QuickView');
  });
});
