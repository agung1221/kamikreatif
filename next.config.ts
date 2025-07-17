import type { NextConfig } from 'next'

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' https:; object-src 'none'; frame-ancestors 'none'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' https: data:;",
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig: NextConfig = {
  // ✅ Gambar dioptimalkan dan aman
  images: {
    domains: ['img.youtube.com', 'placehold.co'],
    formats: ['image/webp', 'image/avif'],
  },

  // ✅ Kompresi aktif
  compress: true,

  // ✅ Mode strict React
  reactStrictMode: true,

  // ✅ Trailing slash off (SEO friendly clean URL)
  trailingSlash: false,

  // ✅ Headers global
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
