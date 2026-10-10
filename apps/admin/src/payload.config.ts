import { createCMSConfig } from '@nezcc/cms/config'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default createCMSConfig({
  target: 'admin',
  admin: {
    importMap: {
      autoGenerate: false,
      baseDir: dirname,
      importMapFile: path.resolve(dirname, 'app/(payload)/admin/importMap.js'),
    },
    components: {
      views: {
        dashboard: { Component: '@/components/admin/AdminDashboard#AdminDashboard' },
      },
      graphics: {
        Logo: '@/components/admin/AdminLogo#AdminLogo',
        Icon: '@/components/admin/AdminIcon#AdminIcon',
      },
    },
  },
})
