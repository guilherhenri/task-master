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
    console.log('Username: ', !!username)
    console.log('Password: ', !!password)
    await this.page.getByText('Sign in with GitHub').click()

    console.log('URL após clicar em Sign in with Github:', this.page.url()) // Log para depuração
    await this.page.waitForURL(/^https:\/\/github\.com\/login/)

    await this.page.getByLabel('Username or email address').fill(username)
    await this.page.getByLabel('Password').fill(password)
    await this.page.getByRole('button', { name: 'Sign in' }).first().click()

    console.log('URL após clicar em Sign in:', this.page.url()) // Log para depuração

    await this.page.waitForURL(
      /^https:\/\/github\.com\/login\/oauth\/authorize/,
    )

    const authorizeButton = this.page.getByRole('button', {
      name: /Authorize/i,
    })

    if (await authorizeButton.isVisible()) {
      await authorizeButton.click()
    }

    await this.page.waitForURL('http://localhost:3000/dashboard')
  }

  async signOut() {
    await this.page.getByText('Sign out').click()
    await expect(this.page.getByText('Sign in')).toBeVisible()
  }
}
