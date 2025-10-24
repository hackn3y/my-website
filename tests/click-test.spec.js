const { test, expect } = require('@playwright/test');
const path = require('path');

test('Click and test website functionality', async ({ page }) => {
  const indexPath = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
  
  console.log('Navigating to:', indexPath);
  await page.goto(indexPath);
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Wait a bit more for dynamic content
  await page.waitForTimeout(2000);
  
  // Check if theme toggle exists
  const themeToggle = await page.locator('#theme-toggle');
  const toggleExists = await themeToggle.count() > 0;
  
  if (toggleExists) {
    console.log('✅ Theme toggle found - testing theme switching');
    
    // Get initial theme
    const initialTheme = await page.evaluate(() => {
      return document.body.classList.contains('light-mode');
    });
    console.log('Initial theme is light mode:', initialTheme);
    
    // Click theme toggle
    await themeToggle.click();
    console.log('✅ Clicked theme toggle');
    
    // Check theme changed
    const newTheme = await page.evaluate(() => {
      return document.body.classList.contains('light-mode');
    });
    console.log('New theme is light mode:', newTheme);
    
    expect(newTheme).toBe(!initialTheme);
    console.log('✅ Theme toggle working correctly');
  } else {
    console.log('❌ Theme toggle not found');
  }
  
  // Test navigation
  console.log('Testing navigation...');
  const navLinks = await page.locator('nav a');
  const linkCount = await navLinks.count();
  console.log(`Found ${linkCount} navigation links`);
  
  if (linkCount > 0) {
    // Test clicking on About link
    const aboutLink = await page.locator('a[href*="#about"]');
    if (await aboutLink.count() > 0) {
      await aboutLink.click();
      console.log('✅ Clicked About link');
      await page.waitForTimeout(1000);
    }
  }
  
  // Test mobile menu
  console.log('Testing mobile menu...');
  await page.setViewportSize({ width: 375, height: 667 });
  
  const hamburger = await page.locator('#hamburger-menu');
  if (await hamburger.count() > 0) {
    await hamburger.click();
    console.log('✅ Clicked hamburger menu');
    await page.waitForTimeout(1000);
  }
  
  // Test shop section
  console.log('Testing shop section...');
  const shopSection = await page.locator('#shop');
  if (await shopSection.count() > 0) {
    await shopSection.scrollIntoViewIfNeeded();
    console.log('✅ Scrolled to shop section');
    
    // Look for product cards
    const productCards = await page.locator('.product-card');
    const productCount = await productCards.count();
    console.log(`Found ${productCount} product cards`);
    
    if (productCount > 0) {
      await productCards.first().click();
      console.log('✅ Clicked on first product');
      await page.waitForTimeout(1000);
    }
  }
  
  // Test contact form
  console.log('Testing contact form...');
  const contactSection = await page.locator('#contact');
  if (await contactSection.count() > 0) {
    await contactSection.scrollIntoViewIfNeeded();
    console.log('✅ Scrolled to contact section');
    
    const nameInput = await page.locator('#name');
    if (await nameInput.count() > 0) {
      await nameInput.fill('Test User');
      console.log('✅ Filled name field');
    }
    
    const emailInput = await page.locator('#email');
    if (await emailInput.count() > 0) {
      await emailInput.fill('test@example.com');
      console.log('✅ Filled email field');
    }
  }
  
  // Test project filters
  console.log('Testing project filters...');
  const projectSection = await page.locator('#projects');
  if (await projectSection.count() > 0) {
    await projectSection.scrollIntoViewIfNeeded();
    console.log('✅ Scrolled to projects section');
    
    const filterButtons = await page.locator('.filter-btn');
    const filterCount = await filterButtons.count();
    console.log(`Found ${filterCount} filter buttons`);
    
    if (filterCount > 0) {
      // Click on software filter
      const softwareFilter = await page.locator('.filter-btn[data-filter="software"]');
      if (await softwareFilter.count() > 0) {
        await softwareFilter.click();
        console.log('✅ Clicked software filter');
        await page.waitForTimeout(1000);
      }
    }
  }
  
  console.log('🎉 Website testing completed successfully!');
});
