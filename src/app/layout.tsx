import type { Metadata } from 'next'
import { JetBrains_Mono, Outfit } from 'next/font/google'
import { ClickSparkShell } from '@/components/layout/ClickSparkShell'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { cn } from '@/lib/utils'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' })

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
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
      className={cn('h-full antialiased font-sans', jetbrains.variable, outfit.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ClickSparkShell>{children}</ClickSparkShell>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
