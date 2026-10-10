import { expect, test, type PlaywrightWorkerArgs } from '@playwright/test'

const adminURL = process.env.NEZCC_TEST_ADMIN_URL!
const webURL = process.env.NEZCC_TEST_WEB_URL!
const credentials = { email: 'admin@example.test', password: 'monorepo-test-password-123' }
const authenticatedAdmin = async (playwright: PlaywrightWorkerArgs['playwright']) => {
  const api = await playwright.request.newContext({ baseURL: adminURL, extraHTTPHeaders: { Origin: adminURL } })
  const login = await api.post('/api/users/login', { data: credentials })
  expect(login.status()).toBe(200)
  return api
}

test('public pages and media render on desktop and mobile without browser errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport)
    for (const route of ['/', '/news', '/artists', '/artists/migration-test-artist', '/venues', '/venues/migration-test-venue', '/feedback', '/newsletter', '/library', '/rti']) {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' })
      expect(response?.status(), route).toBe(200)
      await expect(page.locator('body')).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), route).toBe(true)
    }
    await page.goto('/news')
    await expect(page.getByText('Monorepo test news', { exact: true }).first()).toBeVisible()
    const images = page.locator('img[src*="migration-test"]')
    await expect(images.first()).toBeVisible()
    await expect.poll(() => images.first().evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)
    await page.screenshot({ path: `.local/web-${viewport.width}.png`, fullPage: true })
  }
  expect(errors).toEqual([])
})

test('public API boundaries hold for methods, encoded paths, and forwarded hosts', async ({ request }) => {
  for (const route of ['/admin', '/admin/login', '/api/users', '/api/booking-requests', '/api/contact-submissions', '/api/globals/booking-settings', '/graphql', '/api/graphql', '/%61pi/users', '/api/media/file/%2fusers']) {
    const response = await request.get(route, { headers: { 'x-forwarded-host': 'admin.nezcc.in' } })
    expect(response.status(), route).toBe(404)
  }
  expect((await request.patch('/api/globals/site-settings', { data: { contactHeroTitle: 'Denied' } })).status()).toBe(404)
  expect((await request.get('/api/globals/site-settings')).status()).toBe(200)
  const privateInbox = await request.get(`${adminURL}/api/booking-requests`)
  expect(privateInbox.status()).toBe(403)
  const publicArtist = await request.get(`${adminURL}/api/artists/${process.env.NEZCC_TEST_ARTIST_ID}`)
  expect(publicArtist.status()).toBe(200)
  expect(await publicArtist.json()).not.toHaveProperty('internalNotes')
})

test('admin edits are reflected on the public website and uploads remain publicly readable', async ({ playwright, page }) => {
  const api = await authenticatedAdmin(playwright)
  try {
    const updated = await api.patch(`/api/news/${process.env.NEZCC_TEST_NEWS_ID}`, { data: { title: 'Updated through separate admin' } })
    expect(updated.status()).toBe(200)
    await page.goto('/news')
    await expect(page.getByText('Updated through separate admin', { exact: true }).first()).toBeVisible()
    const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aF1sAAAAASUVORK5CYII=', 'base64')
    const upload = await api.post('/api/media', { multipart: {
      _payload: JSON.stringify({ alt: 'Cross-app upload' }),
      file: { name: 'cross-app.png', mimeType: 'image/png', buffer: png },
    } })
    expect(upload.status(), await upload.text()).toBe(201)
    const { doc } = await upload.json()
    for (const origin of [webURL, adminURL]) {
      const file = await api.get(`${origin}/api/media/file/${encodeURIComponent(doc.filename)}`)
      expect(file.status()).toBe(200)
      expect(file.headers()['content-type']).toContain('image/png')
      expect((await file.body()).length).toBeGreaterThan(0)
    }
    expect((await api.post('/api/users/refresh-token')).status()).toBe(200)
    expect((await api.post('/api/users/logout')).status()).toBe(200)
    expect((await api.get('/api/booking-requests')).status()).toBe(403)
  } finally { await api.dispose() }
})

test('public submissions arrive in the separate admin inbox with booking hooks and idempotency', async ({ request, playwright }) => {
  const contact = await request.post('/api/contact', { data: { name: 'Migration Test', email: 'contact@example.test', subject: 'Migration test', message: 'A controlled local migration test message.' } })
  expect(contact.status()).toBe(201)
  const feedback = await request.post('/api/feedback', { data: { name: 'Migration Test', email: 'feedback@example.test', subject: 'Migration test', feedbackType: 'website', message: 'A controlled local migration feedback message.' } })
  expect(feedback.status()).toBe(201)
  expect((await request.post('/api/newsletter', { data: { email: 'newsletter@example.test' } })).status()).toBe(201)
  const booking = {
    bookingType: 'artist', artist: process.env.NEZCC_TEST_ARTIST_ID,
    requesterName: 'Migration Test', email: 'booking@example.test', phone: '+91 9876543210',
    eventName: 'Migration Event', eventType: 'Festival', eventLocation: 'Dimapur',
    startDateTime: new Date(Date.now() + 86_400_000).toISOString(),
    endDateTime: new Date(Date.now() + 90_000_000).toISOString(),
    timeType: 'exact', termsAccepted: true, privacyAccepted: true,
    idempotencyToken: 'monorepo-integration-booking-token',
  }
  const created = await request.post('/api/bookings', { data: booking })
  expect(created.status(), await created.text()).toBe(201)
  const result = await created.json()
  expect(result.bookingReference).toMatch(/^NEZCC-BKG-/)
  const duplicate = await request.post('/api/bookings', { data: booking })
  expect(duplicate.status()).toBe(200)
  expect((await duplicate.json()).bookingReference).toBe(result.bookingReference)
  const api = await authenticatedAdmin(playwright)
  try {
    for (const collection of ['contact-submissions', 'feedback-submissions', 'newsletter-subscribers', 'booking-requests']) {
      const inbox = await api.get(`/api/${collection}`)
      expect(inbox.status(), collection).toBe(200)
      expect((await inbox.json()).totalDocs, collection).toBe(1)
    }
    const { docs } = await (await api.get('/api/booking-requests')).json()
    expect(docs[0].auditHistory.length).toBeGreaterThan(0)
    expect(docs[0].acceptedPolicyVersion).toBeTruthy()
    const changed = await api.patch(`/api/booking-requests/${docs[0].id}`, { data: { bookingStatus: 'under-review' } })
    expect(changed.status(), await changed.text()).toBe(200)
    expect((await changed.json()).doc.bookingStatus).toBe('under-review')
  } finally { await api.dispose() }
})

test('admin browser login, dashboard links, global save, refresh, and mobile assets work', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(`${adminURL}/login`)
  await page.locator('input[type="email"]').fill(credentials.email)
  await page.locator('input[type="password"]').fill(credentials.password)
  await page.getByRole('button', { name: /log in|login/i }).click()
  await expect(page).toHaveURL(`${adminURL}/`)
  await expect(page.getByRole('link', { name: 'View site', exact: true })).toHaveAttribute('href', webURL)
  await page.getByRole('link', { name: 'News', exact: true }).last().click()
  await expect(page).toHaveURL(/\/collections\/news/)
  await page.goto(`${adminURL}/globals/site-settings`)
  await page.locator('#field-contactHeroTitle').fill('Contact From Separate Admin')
  const saved = page.waitForResponse((response) =>
    new URL(response.url()).pathname === '/api/globals/site-settings' && response.request().method() === 'POST')
  await page.getByRole('button', { name: /^save$/i }).click()
  expect((await saved).status()).toBe(200)
  await page.reload()
  await expect(page.locator('#field-contactHeroTitle')).toHaveValue('Contact From Separate Admin')
  await page.screenshot({ path: '.local/admin-desktop.png', fullPage: true })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${adminURL}/`)
  await expect(page.getByAltText('NEZCC Icon').first()).toBeVisible()
  await page.screenshot({ path: '.local/admin-mobile.png', fullPage: true })
  expect(errors).toEqual([])
  await page.goto('/contact')
  await expect(page.getByRole('heading', { name: 'Contact From Separate Admin', exact: true })).toBeVisible()
})
