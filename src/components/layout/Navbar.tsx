'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Button } from '@/components/ui/button'
import { personal } from '@/data/portfolio'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''))

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeId = useScrollSpy(SECTION_IDS, 80)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1080px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative flex items-center gap-2 cursor-pointer group"
            aria-label="Scroll to top"
          >
            <span className="font-heading text-xl font-extrabold text-foreground tracking-wide">
              Chandu Bobbili
            </span>
            <span
              className="absolute -right-3 -top-1 w-2 h-2 rounded-full animate-orbit"
              style={{
                background: 'var(--brand)',
                boxShadow: '0 0 8px var(--brand)',
                transformOrigin: '0px 14px',
              }}
            />
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.replace('#', '')
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3 py-1.5 font-sans text-[11px] uppercase tracking-widest transition-colors cursor-pointer ${
                    isActive ? 'text-brand' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand"
                    />
                  )}
                </button>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <Button size="sm" asChild>
              <a href={`mailto:${personal.email}`}>Hire me</a>
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            {/* <ThemeToggle /> */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, stiffness: 300, damping: 50, ease: 'easeInOut' }}
            className="md:hidden fixed inset-0 top-16 z-40 flex flex-col bg-background items-center justify-center gap-6"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-sans text-sm uppercase tracking-widest text-foreground"
              >
                {link.label}
              </button>
            ))}
            <Button asChild className="mt-4">
              <a href={`mailto:${personal.email}`}>Hire me</a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
