import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
  authors: [{ name: 'Bobbili Vijaya Chandu' }],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
      </body>
    </html>
  )
}
