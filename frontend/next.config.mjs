/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // เมื่อหน้าเว็บเรียกไปที่ /python-api/...
        source: '/python-api/:path*',
        // ให้ส่งต่อไป Backend จริงๆ ที่ port 8000
        destination: 'http://127.0.0.1:8000/api/:path*',
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
