/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/certification*',
        destination: 'https://api.yunusemretopcu.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig
