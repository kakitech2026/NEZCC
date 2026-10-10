import { expect, test } from '@playwright/test'
import { buildConfig, getPayload, type Payload } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import sharp from 'sharp'
import { Media } from '../../../packages/cms/src/collections/Media'

test.describe('cloud media uploads', () => {
  test.describe.configure({ mode: 'serial' })
  let mongo: MongoMemoryReplSet
  let payload: Payload
  let mediaDirectory: string
  const files = new Map<string, Buffer>()

  test.beforeAll(async () => {
    test.setTimeout(180_000)
    mongo = await MongoMemoryReplSet.create({ replSet: { count: 1 } })
    mediaDirectory = mkdtempSync(path.join(tmpdir(), 'nezcc-upload-regression-'))
    payload = await getPayload({
      key: 'media-upload-regression',
      config: buildConfig({
        admin: { disable: true },
        secret: 'isolated-media-test-secret-not-for-deployment',
        typescript: { autoGenerate: false },
        sharp,
        db: mongooseAdapter({ url: mongo.getUri('media_upload_test') }),
        collections: [{
          ...Media,
          upload: {
            ...(typeof Media.upload === 'object' ? Media.upload : {}),
            staticDir: mediaDirectory,
          },
        }],
        plugins: [cloudStoragePlugin({
          collections: {
            media: {
              adapter: () => ({
                name: 'test-blob',
                clientUploads: true,
                handleUpload: ({ file }) => { files.set(file.filename, file.buffer) },
                handleDelete: ({ filename }) => { files.delete(filename) },
                staticHandler: (_req, { params }) => {
                  const file = files.get(params.filename)
                  return file ? new Response(new Uint8Array(file), {
                    headers: { 'Content-Type': 'image/png' },
                  }) : new Response(null, { status: 404 })
                },
              }),
            },
          },
        })],
      }),
    })
    const adapter = payload.db as unknown as {
      connection: { models: Record<string, { init: () => Promise<unknown> }> }
    }
    await Promise.all(Object.values(adapter.connection.models).map(model => model.init()))
  })

  test.afterAll(async () => {
    if (payload) await payload.destroy()
    if (mongo) await mongo.stop()
    if (mediaDirectory && path.dirname(mediaDirectory) === path.resolve(tmpdir()) &&
      path.basename(mediaDirectory).startsWith('nezcc-upload-regression-')) {
      rmSync(mediaDirectory, { recursive: true, force: true })
    }
  })

  test('replacement keeps the full-size cloud file when Payload changes its filename', async () => {
    const original = await sharp({ create: {
      width: 1200, height: 800, channels: 3, background: '#b23636',
    } }).png().toBuffer()
    const created = await payload.create({
      collection: 'media', data: { alt: 'Original hero' },
      file: { name: 'hero.png', mimetype: 'image/png', size: original.length, data: original },
    })
    const replacement = await sharp({ create: {
      width: 1200, height: 800, channels: 3, background: '#238151',
    } }).png().toBuffer()
    // The browser puts the original before submitting its metadata to Payload.
    files.set('hero.png', replacement)
    const clientFile = {
      name: 'hero.png', mimetype: 'image/png', size: replacement.length,
      data: replacement, clientUploadContext: { prefix: '' },
    }
    const updated = await payload.update({
      collection: 'media', id: created.id, data: { alt: 'Replacement hero' },
      file: clientFile,
    })
    expect(updated.filename).not.toBe('hero.png')
    expect(files.has(updated.sizes!.thumbnail!.filename!)).toBe(true)
    const fullSize = files.get(updated.filename!)
    expect(fullSize, `Missing full-size file: ${updated.filename}`).toBeDefined()
    const stats = await sharp(fullSize!).stats()
    expect(stats.channels[1].mean).toBeGreaterThan(stats.channels[0].mean)
  })

  test('an unchanged client-upload filename does not upload the original twice', async () => {
    const image = await sharp({ create: {
      width: 1200, height: 800, channels: 3, background: '#18799c',
    } }).png().toBuffer()
    files.set('fresh.png', image)
    const clientFile = {
      name: 'fresh.png', mimetype: 'image/png', size: image.length,
      data: image, clientUploadContext: { prefix: '' },
    }
    const created = await payload.create({
      collection: 'media', data: { alt: 'Fresh upload' },
      file: clientFile,
    })
    expect(created.filename).toBe('fresh.png')
    expect(files.get('fresh.png')).toBe(image)
  })
})
