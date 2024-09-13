import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: process.env.CI ? 'github' : 'html',
  timeout: 120 * 1000,
  expect: {
    timeout: 60 * 1000,
  },
  use: {
    baseURL: 'http://localhost:8765',
    trace: process.env.CI ? 'on-first-retry' : 'on',
    video: process.env.CI ? 'on-first-retry' : 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `pnpm dev`,
    url: 'http://localhost:8765',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
