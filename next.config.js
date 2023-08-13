/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: '/api/portfolio/:path*', // API rotasını doğru şekilde güncelleyin
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Tüm kaynaklardan erişime izin vermek için '*' kullanabilirsiniz
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },

    ];
  },
}

module.exports = nextConfig
