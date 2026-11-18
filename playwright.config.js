// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    baseURL: 'https://demowebshop.tricentis.com',
    headless: true,
    screenshot: 'on',
    trace: 'retain-on-failure',
    actionTimeout: 20000,
    navigationTimeout: 45000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});