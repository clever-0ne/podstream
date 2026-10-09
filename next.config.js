/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // For Vercel serverless functions
  experimental: {
    serverActionsExternalFiles: [],
  },
}

module.exports = nextConfig