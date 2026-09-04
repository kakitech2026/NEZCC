import { expect, test } from '@playwright/test'

test.describe('artist catalogue', () => {
  test('/artists renders the public artist catalogue shell', async ({ page }) => {
    const response = await page.goto('/artists', { waitUntil: 'domcontentloaded' })

    expect(response?.status()).toBeLessThan(400)
    await expect(page.getByRole('heading', { name: /cultural artists/i })).toBeVisible()
    await expect(page.locator('input[name="q"]')).toBeVisible()
    await expect(page.locator('select[name="category"]')).toBeVisible()
    await expect(page.locator('select[name="location"]')).toBeVisible()
    await expect(page.locator('select[name="type"]')).toBeVisible()
  })

  test('/artists preserves filter state from URL query params', async ({ page }) => {
    const response = await page.goto('/artists?q=dance&type=group', { waitUntil: 'domcontentloaded' })

    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('input[name="q"]')).toHaveValue('dance')
    await expect(page.locator('select[name="type"]')).toHaveValue('group')
  })
})
