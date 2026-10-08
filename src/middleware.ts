import { NextRequest, NextResponse } from 'next/server'

const WINDOW_MS = 60_000
const MAX_REQUESTS = 120
const clients = new Map<string, { count: number; resetAt: number }>()

function getClientKey(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  return forwarded?.split(',')[0]?.trim() || realIp || null
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const current = clients.get(key)

  if (!current || current.resetAt <= now) {
    clients.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  current.count += 1
  return current.count > MAX_REQUESTS
}

function pruneClients(now: number): void {
  if (clients.size < 5000) return
  for (const [key, value] of clients) {
    if (value.resetAt <= now) clients.delete(key)
  }
}

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'unsafe-none',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' https://cdn.discordapp.com https://younggod-org.vercel.app data: blob:",
    "connect-src 'self'",
    "media-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
}

export default function middleware(request: NextRequest) {
  const key = getClientKey(request)
  const now = Date.now()

  pruneClients(now)

  if (key && isRateLimited(key)) {
    return new NextResponse('Too many requests. Please try again later.', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'Cache-Control': 'no-store',
        ...SECURITY_HEADERS,
      },
    })
  }

  if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return new NextResponse('Method not allowed.', {
      status: 405,
      headers: {
        Allow: 'GET, HEAD, OPTIONS',
        'Cache-Control': 'no-store',
        ...SECURITY_HEADERS,
      },
    })
  }

  const response = NextResponse.next()

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }
  response.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS))

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|assets|favicon.ico).*)'],
}
