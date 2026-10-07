import type { Metadata } from 'next'
import './globals.css'
import { config } from '@/data'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
const ogImage = 'https://younggod-org.vercel.app/assets/og-image.jpg'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: config.title,
  description: config.description,
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: config.title,
    description: config.description,
    url: siteUrl,
    siteName: config.title,
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Young God Worldwide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: config.title,
    description: config.description,
    images: [ogImage],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.discordapp.com" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
