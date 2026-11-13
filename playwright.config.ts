import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  // On CI each suite creates a blob report, they are merged into one HTML report at the end
  reporter: process.env.CI ? 'blob' : 'html',

  use: {
    baseURL: 'https://www.saucedemo.com',
    // Keep screenshots and traces only when something goes wrong
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
