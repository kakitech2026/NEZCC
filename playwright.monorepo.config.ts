import { defineConfig, devices } from '@playwright/test'

if (process.env.NEZCC_ISOLATED_TEST !== '1') {
  throw new Error('Run npm run test:integration to start isolated databases and servers.')
}

export default defineConfig({
  testDir: './tests',
  testMatch: 'monorepo.integration.spec.ts',
  workers: 1,
  timeout: 120_000,
  expect: { timeout: 30_000 },
  use: {
    baseURL: process.env.NEZCC_TEST_WEB_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'catalogue-desktop',
      testDir: './apps/web/tests',
      testMatch: /(artist|venue)-catalogue\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'catalogue-mobile',
      testDir: './apps/web/tests',
      testMatch: /(artist|venue)-catalogue\.spec\.ts/,
      use: { ...devices['Pixel 5'] },
    },
  ],
  outputDir: '.local/integration-results',
})
