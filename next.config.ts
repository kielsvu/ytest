import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options',             value: 'nosniff' },
  { key: 'X-Frame-Options',                     value: 'DENY' },
  { key: 'X-XSS-Protection',                   value: '1; mode=block' },
  { key: 'Referrer-Policy',                     value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',                  value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Strict-Transport-Security',           value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy',          value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy',        value: 'same-origin' },
  { key: 'X-Permitted-Cross-Domain-Policies',  value: 'none' },
  { key: 'X-Robots-Tag',                        value: 'noarchive' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
