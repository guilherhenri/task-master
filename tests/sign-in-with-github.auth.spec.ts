import { test } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'url'

import { env } from '@/env'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const authFile = path.join(__dirname, '../playwright/.auth/user.json')

test.describe('Github Auth', () => {
  test.use({ storageState: undefined })

  test('authenticate with github', async ({ page }) => {
    await page.goto('/')

    await page.getByText('Sign in with GitHub').click()

    await page.waitForURL(/^https:\/\/github\.com\/login/)

    await page
      .getByLabel('Username or email address')
      .fill(env.GITHUB_TEST_USERNAME)
    await page.getByLabel('Password').fill(env.GITHUB_TEST_PASSWORD)
    await page.getByRole('button', { name: 'Sign in' }).first().click()

    await page.waitForURL(/^https:\/\/github\.com\/login\/oauth\/authorize/)

    const authorizeButton = page.getByRole('button', {
      name: /Authorize/i,
    })

    if (await authorizeButton.isVisible()) {
      await authorizeButton.click()
    }

    await page.waitForURL('http://localhost:3000/dashboard')

    await page.context().storageState({ path: authFile })
  })
})
