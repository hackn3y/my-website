const { test, expect } = require('@playwright/test');
const path = require('path');

test('theme toggle smoke test', async ({ page }) => {
  const indexPath = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');

  // open page
  await page.goto(indexPath);

  // ensure initial body exists
  const body = await page.$('body');
  expect(body).toBeTruthy();

  // Wait for header to be loaded dynamically
  await page.waitForSelector('#theme-toggle', { timeout: 10000 });

  // get initial theme state
  const initialIsLight = await page.evaluate(() => document.body.classList.contains('light-mode'));

  // click toggle
  await page.click('#theme-toggle');

  // expect theme toggled
  const toggledIsLight = await page.evaluate(() => document.body.classList.contains('light-mode'));
  expect(toggledIsLight).toBe(!initialIsLight);

  // reload and ensure persisted state
  await page.reload();
  await page.waitForSelector('#theme-toggle', { timeout: 10000 });
  const persistedIsLight = await page.evaluate(() => document.body.classList.contains('light-mode'));
  expect(persistedIsLight).toBe(toggledIsLight);
});
