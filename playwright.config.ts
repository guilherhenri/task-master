import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: 'auth.setup.ts',
      use: {
        storageState: undefined,
      },
    },
    {
      name: 'chromium-authenticated',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'chromium-unauthenticated',
      use: {
        ...devices['Desktop Chrome'],
        storageState: undefined,
      },
      testMatch: '*.auth.spec.ts',
    },
    {
      name: 'firefox-authenticated',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox-unauthenticated',
      use: {
        ...devices['Desktop Firefox'],
        storageState: undefined,
      },
      testMatch: '*.auth.spec.ts',
    },
  ],
  testMatch: '*.e2e-spec.ts',
  webServer: {
    command: 'pnpm build && pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 120s
  },
})
