import type { CollectionConfig } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    group: 'Media & Resources',
  },
  access: {
    read: () => true, // Media should be readable by public
  },
  hooks: {
    beforeChange: [({ data, req }) => {
      if (req.file?.clientUploadContext && typeof data.filename === 'string' &&
        data.filename !== req.file.name) {
        // A direct upload used the old name; persist the original at its final key.
        req.file = { ...req.file, clientUploadContext: undefined }
      }
      return data
    }],
  },
  upload: {
    staticDir: process.env.PAYLOAD_MEDIA_DIR || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../apps/web/public/media'),
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
