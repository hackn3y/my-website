const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Website Comprehensive Testing', () => {
  test.beforeEach(async ({ page }) => {
    const indexPath = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
    await page.goto(indexPath);
    
    // Wait for header to load
    await page.waitForSelector('#theme-toggle', { timeout: 15000 });
  });

  test('Theme toggle functionality', async ({ page }) => {
    // Get initial theme state
    const initialIsLight = await page.evaluate(() => document.body.classList.contains('light-mode'));
    
    // Click theme toggle
    await page.click('#theme-toggle');
    
    // Check theme changed
    const toggledIsLight = await page.evaluate(() => document.body.classList.contains('light-mode'));
    expect(toggledIsLight).toBe(!initialIsLight);
    
    // Check icon changed
    const iconText = await page.textContent('#theme-icon');
    expect(iconText).toBe(initialIsLight ? '☀️' : '🌙');
  });

  test('Navigation menu functionality', async ({ page }) => {
    // Test hamburger menu on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check hamburger menu exists
    const hamburger = await page.locator('#hamburger-menu');
    await expect(hamburger).toBeVisible();
    
    // Click hamburger menu
    await hamburger.click();
    
    // Check menu is expanded
    const navMenu = await page.locator('#nav-menu');
    await expect(navMenu).toHaveClass(/active/);
    
    // Test clicking a nav link
    const homeLink = await page.locator('a[href="index.html#home"]');
    await homeLink.click();
    
    // Check menu closes
    await expect(navMenu).not.toHaveClass(/active/);
  });

  test('Shop functionality', async ({ page }) => {
    // Wait for shop section to load
    await page.waitForSelector('#shop', { timeout: 10000 });
    
    // Check if products are loaded
    const productsContainer = await page.locator('#products-container');
    await expect(productsContainer).toBeVisible();
    
    // Look for product cards
    const productCards = await page.locator('.product-card');
    const productCount = await productCards.count();
    
    if (productCount > 0) {
      // Test clicking on first product
      await productCards.first().click();
      
      // Check if quick view modal opens
      const quickViewModal = await page.locator('#quickview-modal');
      await expect(quickViewModal).toBeVisible();
      
      // Close modal
      const closeButton = await page.locator('.close-modal');
      await closeButton.click();
      
      // Check modal is closed
      await expect(quickViewModal).not.toBeVisible();
    }
  });

  test('Contact form functionality', async ({ page }) => {
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Check form elements exist
    const nameInput = await page.locator('#name');
    const emailInput = await page.locator('#email');
    const messageInput = await page.locator('#message');
    const submitButton = await page.locator('.submit-btn');
    
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    
    // Test form validation
    await submitButton.click();
    
    // Check for HTML5 validation (required fields)
    const nameValid = await nameInput.evaluate(el => el.checkValidity());
    const emailValid = await emailInput.evaluate(el => el.checkValidity());
    const messageValid = await messageInput.evaluate(el => el.checkValidity());
    
    expect(nameValid).toBe(false);
    expect(emailValid).toBe(false);
    expect(messageValid).toBe(false);
  });

  test('Project filters functionality', async ({ page }) => {
    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();
    
    // Check filter buttons exist
    const filterButtons = await page.locator('.filter-btn');
    const buttonCount = await filterButtons.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Test clicking different filters
    const featuredButton = await page.locator('.filter-btn[data-filter="featured"]');
    const softwareButton = await page.locator('.filter-btn[data-filter="software"]');
    
    // Click software filter
    await softwareButton.click();
    
    // Check button becomes active
    await expect(softwareButton).toHaveClass(/active/);
    
    // Check project cards are filtered
    const projectCards = await page.locator('.project-card');
    const visibleCards = await projectCards.filter({ hasNot: page.locator('.hidden') }).count();
    expect(visibleCards).toBeGreaterThan(0);
  });

  test('Newsletter subscription', async ({ page }) => {
    // Scroll to newsletter section
    await page.locator('#newsletter').scrollIntoViewIfNeeded();
    
    // Check newsletter form exists
    const emailInput = await page.locator('input[name="EMAIL"]');
    const subscribeButton = await page.locator('button[type="submit"]');
    
    await expect(emailInput).toBeVisible();
    await expect(subscribeButton).toBeVisible();
    
    // Test form submission (this will redirect to external service)
    await emailInput.fill('test@example.com');
    
    // Note: We don't actually submit to avoid external redirects in test
    // In a real test, you'd mock the external service
  });

  test('Social links functionality', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    
    // Check social links exist
    const socialLinks = await page.locator('.social-links a');
    const linkCount = await socialLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    
    // Test that links have correct href attributes
    const instagramLink = await page.locator('a[href*="instagram"]');
    const twitterLink = await page.locator('a[href*="x.com"]');
    const linkedinLink = await page.locator('a[href*="linkedin"]');
    
    await expect(instagramLink).toBeVisible();
    await expect(twitterLink).toBeVisible();
    await expect(linkedinLink).toBeVisible();
  });

  test('Responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check hamburger menu is visible
    const hamburger = await page.locator('#hamburger-menu');
    await expect(hamburger).toBeVisible();
    
    // Check theme toggle is still visible
    const themeToggle = await page.locator('#theme-toggle');
    await expect(themeToggle).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Check navigation is visible
    const navMenu = await page.locator('#nav-menu');
    await expect(navMenu).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Check all navigation elements are visible
    const navLinks = await page.locator('#nav-menu a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('Accessibility features', async ({ page }) => {
    // Check for proper ARIA labels
    const themeToggle = await page.locator('#theme-toggle');
    const ariaLabel = await themeToggle.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    
    // Check for proper heading structure
    const h1 = await page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Check for alt text on images
    const images = await page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Allow empty alt for decorative images, but check it exists
      expect(alt).not.toBeNull();
    }
  });
});
