import type { Metadata } from 'next'
import { Exo_2, Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const exo = Exo_2({
  variable: '--font-exo',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500'],
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Bobbili Vijaya Chandu — Software Development Engineer',
  description:
    'SDE based in Hyderabad building scalable systems with TypeScript, Go, React, and microservices.',
  keywords: [
    'Software Development Engineer',
    'TypeScript',
    'Go',
    'React',
    'Microservices',
    'Hyderabad',
    'India',
    'Full Stack',
  ],
  authors: [{ name: 'Bobbili Vijaya Chandu', url: 'https://github.com/ChanduBobbili' }],
  creator: 'Bobbili Vijaya Chandu',
  openGraph: {
    title: 'Bobbili Vijaya Chandu — SDE',
    description: 'Building things that scale.',
    url: 'https://chandubobbili.dev',
    siteName: 'Chandu Bobbili Portfolio',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bobbili Vijaya Chandu — SDE',
    description: 'Building things that scale.',
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
      className={`${exo.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
