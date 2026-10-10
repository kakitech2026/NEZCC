import { spawn } from 'node:child_process'
import { createWriteStream, mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { availablePort } from './ports.mjs'

const require = createRequire(import.meta.url)
const repositoryRoot = path.resolve(import.meta.dirname, '..')
const children = []
const logs = []
let mongo
let payload
let mediaDirectory
const production = process.argv.includes('--production')

const stopChild = async (child) => {
  if (child.exitCode !== null) return
  if (process.platform === 'win32') {
    await new Promise((resolve) => spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' }).on('exit', resolve))
  } else {
    child.kill('SIGTERM')
    await new Promise((resolve) => child.on('exit', resolve))
  }
}
const cleanup = async () => {
  await Promise.all(children.map(stopChild))
  if (payload) await payload.destroy()
  if (mongo) await mongo.stop()
  if (mediaDirectory && path.dirname(mediaDirectory) === path.resolve(tmpdir()) && path.basename(mediaDirectory).startsWith('nezcc-media-')) {
    rmSync(mediaDirectory, { recursive: true, force: true })
  }
  for (const log of logs) log.end()
}
process.on('SIGINT', async () => { await cleanup(); process.exit(130) })
process.on('SIGTERM', async () => { await cleanup(); process.exit(143) })

const run = (entry, args, options = {}) => {
  const child = spawn(process.execPath, [entry, ...args], { cwd: repositoryRoot, env: process.env, ...options })
  children.push(child)
  return child
}
const waitFor = async (url, child) => {
  const deadline = Date.now() + 180_000
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Server exited before ${url}; see .local/*.log`)
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(5_000) })
      if (response.ok) return
    } catch { /* The server may still be compiling. */ }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error(`Timed out starting ${url}; see .local/*.log`)
}

try {
  const webPort = await availablePort(3100)
  const adminPort = await availablePort(webPort === 3101 ? 3102 : 3101)
  const webURL = `http://localhost:${webPort}`
  const adminURL = `http://localhost:${adminPort}`
  console.log('Starting isolated MongoDB replica set (first run downloads a local MongoDB binary).')
  mongo = await MongoMemoryReplSet.create({ replSet: { count: 1 } })
  console.log('Isolated database ready; loading shared CMS.')
  Object.assign(process.env, {
    MONGODB_URI: mongo.getUri('nezcc_monorepo_test'),
    PAYLOAD_SECRET: 'isolated-monorepo-test-secret-not-for-deployment',
    NEXT_PUBLIC_SITE_URL: webURL,
    ADMIN_URL: adminURL,
    PAYLOAD_ALLOWED_ORIGINS: `${webURL},${adminURL}`,
    PAYLOAD_MEDIA_DIR: mediaDirectory = mkdtempSync(path.join(tmpdir(), 'nezcc-media-')),
    BLOB_READ_WRITE_TOKEN: '',
    SMTP_HOST: '', SMTP_USER: '', SMTP_PASS: '',
    EMAIL_FROM: 'test@example.test', EMAIL_TO_ADMIN: 'inbox@example.test',
    NEZCC_ISOLATED_TEST: '1',
    NEZCC_TEST_WEB_URL: webURL,
    NEZCC_TEST_ADMIN_URL: adminURL,
    // Match Payload's CLI condition while loading CMS code outside Next's bundler.
    NODE_ENV: 'production',
  })
  const { createCMSConfig } = await import('@nezcc/cms/config')
  console.log('Shared CMS loaded; seeding test records.')
  const { getPayload } = await import('payload')
  const { default: sharp } = await import('sharp')
  payload = await getPayload({ config: createCMSConfig() })
  // Finish background index creation before transactional test seeding.
  await Promise.all(Object.values(payload.db.connection.models).map((model) => model.init()))
  await payload.create({ collection: 'users', data: { email: 'admin@example.test', password: 'monorepo-test-password-123' } })
  const image = await sharp({ create: { width: 1200, height: 800, channels: 3, background: '#b23636' } }).png().toBuffer()
  const media = await payload.create({ collection: 'media', data: { alt: 'Migration test image' }, file: { data: image, name: 'migration-test.png', mimetype: 'image/png', size: image.length } })
  const news = await payload.create({ collection: 'news', data: { title: 'Monorepo test news', summary: 'A shared content record for migration verification.', featuredImage: media.id, publishedDate: new Date().toISOString() } })
  const artist = await payload.create({ collection: 'artists', data: { name: 'Migration Test Artist', slug: 'migration-test-artist', stateRegion: 'Nagaland', shortBiography: 'A test artist for migration verification.', isPublished: true, isActive: true, bookingEnabled: true, internalNotes: 'PRIVATE_TEST_NOTE' } })
  const venue = await payload.create({ collection: 'venues', data: { name: 'Migration Test Venue', slug: 'migration-test-venue', address: 'Test address', cityState: 'Dimapur, Nagaland', description: 'A test venue for migration verification.', capacity: 100, isPublished: true, isActive: true, bookingEnabled: true } })
  await payload.updateGlobal({ slug: 'site-settings', data: { contactHeroTitle: 'Contact Us' } })
  await payload.updateGlobal({ slug: 'booking-settings', data: { bookingEnabled: true } })
  Object.assign(process.env, { NEZCC_TEST_NEWS_ID: news.id, NEZCC_TEST_ARTIST_ID: artist.id, NEZCC_TEST_VENUE_ID: venue.id })
  mkdirSync(path.join(repositoryRoot, '.local'), { recursive: true })
  const nextCLI = require.resolve('next/dist/bin/next')
  if (production) {
    for (const app of ['web', 'admin']) {
      console.log(`Building ${app} for isolated production checks.`)
      const build = run(nextCLI, ['build'], { cwd: path.join(repositoryRoot, 'apps', app), stdio: 'inherit' })
      const code = await new Promise((resolve, reject) => { build.on('exit', resolve); build.on('error', reject) })
      if (code !== 0) throw new Error(`${app} production build failed`)
    }
  }
  const servers = [['web', webPort], ['admin', adminPort]].map(([app, port]) => {
    const log = createWriteStream(path.join(repositoryRoot, '.local', `${app}-integration.log`))
    logs.push(log)
    const child = run(nextCLI, [production ? 'start' : 'dev', '--port', String(port)], { cwd: path.join(repositoryRoot, 'apps', app), env: { ...process.env, NODE_ENV: production ? 'production' : 'development' }, stdio: ['ignore', 'pipe', 'pipe'] })
    child.stdout.pipe(log)
    child.stderr.pipe(log)
    return child
  })
  console.log(`Starting isolated website at ${webURL} and admin at ${adminURL}.`)
  await Promise.all([waitFor(`${webURL}/feedback`, servers[0]), waitFor(`${adminURL}/login`, servers[1])])
  const tests = run(require.resolve('@playwright/test/cli'), ['test', '--config=playwright.monorepo.config.ts'], { stdio: 'inherit' })
  const code = await new Promise((resolve, reject) => { tests.on('exit', resolve); tests.on('error', reject) })
  process.exitCode = code ?? 1
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  await cleanup()
}
