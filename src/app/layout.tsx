import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Chandu Bobbili — Software Development Engineer',
  description:
    'SDE based in Hyderabad with 3+ years building scalable systems. TypeScript, Go, React, Microservices.',
  keywords: [
    'Software Engineer',
    'TypeScript',
    'Go',
    'React',
    'Microservices',
    'Hyderabad',
    'India',
    'Next.js',
    'Full Stack',
  ],
  authors: [{ name: 'Bobbili Vijaya Chandu', url: 'https://github.com/ChanduBobbili' }],
  creator: 'Bobbili Vijaya Chandu',
  publisher: 'Bobbili Vijaya Chandu',
  applicationName: 'Chandu Bobbili Portfolio',
  appleWebApp: {
    title: 'Chandu Bobbili Portfolio',
    statusBarStyle: 'black-translucent',
    startupImage: ['/favi/apple-touch-icon.png'],
  },
  // manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/favi/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', url: '/favi/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', type: 'image/png', url: '/favi/favicon-16x16.png', sizes: '16x16' },
    { rel: 'manifest', url: '/favi/site.webmanifest' },
  ],
  openGraph: {
    title: 'Chandu Bobbili — SDE',
    description: 'Building scalable systems with TypeScript, Go, and React.',
    url: 'https://chandubobbili.dev',
    siteName: 'Chandu Bobbili Portfolio',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chandu Bobbili — SDE',
    description: 'Building scalable systems with TypeScript, Go, and React.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
