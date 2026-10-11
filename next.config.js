/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Externalize pg for serverless builds
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        {
          pg: 'commonjs pg',
        },
      ];
    }
    return config;
  },
}

module.exports = nextConfig