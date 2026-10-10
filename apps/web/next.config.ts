import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from "next";

const publicSiteURL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://nezcc.in'
).trim().replace(/\/+$/, '');
const publicSiteOrigin = /^https?:\/\//i.test(publicSiteURL) ? publicSiteURL : `https://${publicSiteURL}`;

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [new URL('/api/media/file/**', publicSiteOrigin)],
  },
};

export default withPayload(nextConfig);
