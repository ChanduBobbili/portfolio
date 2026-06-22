import type { Metadata } from 'next'
import { JetBrains_Mono, Outfit } from 'next/font/google'
import { ClickSparkShell } from '@/components/layout/ClickSparkShell'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { cn } from '@/lib/utils'
import { getPersonJsonLd, siteUrl } from '@/lib/seo'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' })

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Chandu Bobbili | Senior Software Engineer',
    template: '%s | Chandu Bobbili',
  },
  description:
    'Senior SDE in Hyderabad building full-stack systems at scale — 1M+ events/sec analytics, 20K student enrollments, Lighthouse 54→97. TypeScript, Go, React, Kafka, Kubernetes.',
  keywords: [
    'Chandu Bobbili',
    'Senior Software Engineer',
    'Full Stack Developer',
    'TypeScript',
    'Go',
    'React',
    'Next.js',
    'Microservices',
    'Kafka',
    'Kubernetes',
    'Hyderabad',
    'India',
    'Software Engineer Portfolio',
  ],
  authors: [{ name: 'Bobbili Vijaya Chandu', url: siteUrl }],
  creator: 'Bobbili Vijaya Chandu',
  publisher: 'Bobbili Vijaya Chandu',
  applicationName: 'Chandu Bobbili Portfolio',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Chandu Bobbili | Senior Software Engineer',
    description:
      'Full-stack engineer shipping production systems — 1M+ events/sec, 20K enrollments, measurable business impact. TypeScript, Go, React.',
    url: siteUrl,
    siteName: 'Chandu Bobbili',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chandu Bobbili | Senior Software Engineer',
    description:
      'Full-stack engineer — TypeScript, Go, React. Systems at 1M+ events/sec with real business impact.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/favi/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', url: '/favi/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', type: 'image/png', url: '/favi/favicon-16x16.png', sizes: '16x16' },
    { rel: 'manifest', url: '/favi/site.webmanifest' },
  ],
  appleWebApp: {
    title: 'Chandu Bobbili Portfolio',
    statusBarStyle: 'black-translucent',
    startupImage: ['/favi/apple-touch-icon.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-IN"
      className={cn('h-full antialiased font-sans', jetbrains.variable, outfit.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonJsonLd()),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          storageKey="astronaut-theme"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <SmoothScrollProvider>
            <ClickSparkShell>{children}</ClickSparkShell>
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
