import { test as setup } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'url'

import { env } from '@/env'

import { AuthPage } from './auth.page'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const authFile = path.join(__dirname, '../playwright/.auth/user.json')

setup('authenticate', async ({ page, context }) => {
  const authPage = new AuthPage(page)

  await context.clearCookies()

  // await authPage.ensureLoggedOut()

  await authPage.gotoSignIn()
  await authPage.signInWithGitHub(
    env.GITHUB_TEST_USERNAME,
    env.GITHUB_TEST_PASSWORD,
  )

  await page.context().storageState({ path: authFile })
})
