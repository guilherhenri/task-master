import { expect, Page } from '@playwright/test'

export class AuthPage {
  constructor(private page: Page) {}

  async gotoSignIn() {
    await this.page.goto('/')
  }

  async ensureLoggedOut() {
    await this.page.goto('/api/auth/signout')
    await this.page.waitForURL(/\/auth\/signin/)
    await expect(this.page.getByText('Sign in')).toBeVisible()
  }

  async signInWithGitHub(username: string, password: string) {
    await this.page.getByText('Sign in with GitHub').click()
    await this.page.getByLabel('Username or email address').fill(username)
    await this.page.getByLabel('Password').fill(password)
    await this.page.getByRole('button', { name: 'Sign in' }).first().click()

    if (
      await this.page
        .getByRole('button', { name: 'Authorize guilherhenri' })
        .isVisible()
    ) {
      await this.page
        .getByRole('button', { name: 'Authorize guilherhenri' })
        .click()
    }

    await this.page.waitForURL('http://localhost:3000/dashboard')
  }

  async signOut() {
    await this.page.getByText('Sign out').click()
    await expect(this.page.getByText('Sign in')).toBeVisible()
  }
}
