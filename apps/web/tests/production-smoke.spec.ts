import { expect, test } from '@playwright/test'

const routes = [
  '/',
  '/contact',
  '/feedback',
  '/newsletter',
  '/library',
  '/member-states/assam',
  '/member-states/nagaland',
  '/about/leadership-and-team',
  '/rti',
]

test.describe('production public site smoke', () => {
  for (const route of routes) {
    test(`${route} renders without page errors`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' })

      expect(response?.status(), route).toBeLessThan(400)
      await expect(page.locator('body')).toContainText(/NEZCC|North East Zone Cultural Centre|Newsletter|Library|Feedback|RTI/i)
      await expect(page.locator('body')).toBeVisible()
    })
  }

  test('unknown member state returns 404', async ({ page }) => {
    const response = await page.goto('/member-states/not-a-state', { waitUntil: 'domcontentloaded' })

    expect(response?.status()).toBe(404)
  })

  test('contact form can submit a controlled QA message', async ({ page }) => {
    await page.goto('/contact')

    await page.getByLabel(/full name/i).fill('Playwright QA Test')
    await page.getByLabel(/email address/i).fill('playwright-contact@example.com')
    await page.getByLabel(/subject/i).fill('Playwright production contact test')
    await page.getByLabel(/^message$/i).fill('This is a controlled Playwright QA contact submission for production smoke testing.')
    await page.getByRole('button', { name: /send message/i }).click()

    await expect(page.getByText(/message has been/i)).toBeVisible()
  })

  test('feedback form can submit a controlled QA message', async ({ page }) => {
    await page.goto('/feedback')

    await page.getByLabel(/full name/i).fill('Playwright QA Test')
    await page.getByLabel(/email address/i).fill('playwright-feedback@example.com')
    await page.getByLabel(/subject of feedback/i).selectOption('website')
    await page.getByLabel(/short subject/i).fill('Playwright production feedback test')
    await page.getByLabel(/detailed message/i).fill('This is a controlled Playwright QA feedback submission for production smoke testing.')
    await page.getByRole('button', { name: /submit feedback/i }).click()

    await expect(page.getByText(/feedback has been saved/i)).toBeVisible()
  })

  test('newsletter form can subscribe a controlled QA email', async ({ page }) => {
    await page.goto('/newsletter')

    await page.getByLabel(/email address/i).fill(`playwright-newsletter-${Date.now()}@example.com`)
    await page.getByRole('button', { name: /subscribe/i }).click()

    await expect(page.getByText(/subscribed to the NEZCC newsletter/i)).toBeVisible()
  })
})
