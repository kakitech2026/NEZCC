import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from "next";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
config({ path: path.join(repositoryRoot, '.env'), quiet: true });

const publicSiteURL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://nezcc.in')
).trim().replace(/\/+$/, '');
const publicSiteOrigin = /^https?:\/\//i.test(publicSiteURL) ? publicSiteURL : `https://${publicSiteURL}`;

const nextConfig: NextConfig = {
  distDir: process.env.NEZCC_ISOLATED_TEST === '1' ? '.next-test' : '.next',
  outputFileTracingRoot: repositoryRoot,
  turbopack: { root: repositoryRoot },
  reactCompiler: true,
  images: {
    remotePatterns: [new URL('/api/media/file/**', publicSiteOrigin)],
  },
};

export default withPayload(nextConfig);
