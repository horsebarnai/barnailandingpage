import type { Metadata } from 'next'
import { Inter, Geist_Mono, Playfair_Display, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MagneticCursor } from '@/components/magnetic-cursor'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: 'Barn AI | Institutional-Grade Equine Analytics',
  description: 'The ultimate back office for the equine industry. Institutional-grade pedigree analytics, syndicate asset management, and proprietary deal brokerage—all in one terminal.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${playfair.variable} ${spaceGrotesk.variable} bg-black`}>
      <body className="font-sans antialiased bg-black text-white cursor-none">
        <MagneticCursor />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
