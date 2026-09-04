import { expect, test } from '@playwright/test'

test.describe('venue catalogue', () => {
  test('/venues renders the public venue catalogue shell', async ({ page }) => {
    const response = await page.goto('/venues', { waitUntil: 'domcontentloaded' })

    expect(response?.status()).toBeLessThan(400)
    await expect(page.getByRole('heading', { name: /nezcc venues/i })).toBeVisible()
    await expect(page.locator('input[name="q"]')).toBeVisible()
    await expect(page.locator('select[name="category"]')).toBeVisible()
    await expect(page.locator('select[name="location"]')).toBeVisible()
    await expect(page.locator('select[name="type"]')).toBeVisible()
    await expect(page.locator('input[name="capacity"]')).toBeVisible()
  })

  test('/venues preserves filter state from URL query params', async ({ page }) => {
    const response = await page.goto('/venues?q=hall&type=indoor&capacity=100', { waitUntil: 'domcontentloaded' })

    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('input[name="q"]')).toHaveValue('hall')
    await expect(page.locator('select[name="type"]')).toHaveValue('indoor')
    await expect(page.locator('input[name="capacity"]')).toHaveValue('100')
  })
})
