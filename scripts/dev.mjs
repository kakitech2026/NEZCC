import { spawn } from 'node:child_process'
import { config } from 'dotenv'
import { createRequire } from 'node:module'
import path from 'node:path'
import { availablePort } from './ports.mjs'

config({ path: '.env', quiet: true })
const webPort = await availablePort(3000)
const adminPort = await availablePort(webPort === 3001 ? 3002 : 3001)
const env = {
  ...process.env,
  NEXT_PUBLIC_SITE_URL: `http://localhost:${webPort}`,
  ADMIN_URL: `http://localhost:${adminPort}`,
  PAYLOAD_ALLOWED_ORIGINS: `http://localhost:${webPort},http://localhost:${adminPort}`,
}
const require = createRequire(import.meta.url)
console.log(`Website: ${env.NEXT_PUBLIC_SITE_URL}\nAdmin: ${env.ADMIN_URL}`)
const children = [['web', webPort], ['admin', adminPort]].map(([app, port]) => spawn(
  process.execPath,
  [require.resolve('next/dist/bin/next'), 'dev', '--port', String(port)],
  { cwd: path.resolve('apps', app), stdio: 'inherit', env },
))
let stopping = false
const stop = (code = 0) => {
  if (stopping) return
  stopping = true
  for (const child of children) {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' })
    } else {
      child.kill('SIGTERM')
    }
  }
  process.exitCode = code
}
process.on('SIGINT', () => stop())
process.on('SIGTERM', () => stop())
for (const child of children) {
  child.on('error', (error) => { console.error(error); stop(1) })
  child.on('exit', (code) => stop(code ?? 1))
}
