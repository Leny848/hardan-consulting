import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { ContentProvider } from '@/components/content-provider'
import { SiteAura } from '@/components/site/site-aura'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hardan Consulting | Environmental & Social Assessment',
  description:
    'Hardan Consulting Limited — science-based environmental and social assessment, ESMP development, regulatory compliance, and sustainability advisory in Abuja, Nigeria.',
  icons: {
    icon: [{ url: '/icon.png', sizes: '512x512', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1a4d32',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} light bg-background`}>
      <body className="relative font-sans antialiased">
        <SiteAura />
        <div className="relative z-[1]">
          <ContentProvider>{children}</ContentProvider>
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
