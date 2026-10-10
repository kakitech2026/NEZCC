import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import { config } from 'dotenv'
import { fileURLToPath } from 'node:url'

config({ path: fileURLToPath(new URL('../../.env', import.meta.url)), quiet: true })
const repositoryRoot = fileURLToPath(new URL('../..', import.meta.url))

const nextConfig: NextConfig = {
  distDir: process.env.NEZCC_ISOLATED_TEST === '1' ? '.next-test' : '.next',
  reactCompiler: true,
  outputFileTracingRoot: repositoryRoot,
  turbopack: { root: repositoryRoot },
}

export default withPayload(nextConfig)
