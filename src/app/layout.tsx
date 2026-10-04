import type { Metadata } from 'next'
import './globals.css'
import { config } from '@/data'

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: config.title,
    description: config.description,
    type: 'website',
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
