'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Mail } from 'lucide-react'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { personal } from '@/data/portfolio'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''))

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeId = useScrollSpy(SECTION_IDS, 80)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md border-b border-[var(--nav-border)]'
          : 'border-b border-transparent'
      }`}
      style={{ backgroundColor: scrolled ? 'var(--nav-bg-scrolled)' : 'transparent' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg font-semibold text-[var(--text-primary)] hover:opacity-80 transition-opacity cursor-pointer"
          >
            Chandu Bobbili
            <span className="text-[var(--accent-purple)]">.</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.replace('#', '')
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer rounded-md ${
                    isActive
                      ? 'text-[var(--accent-purple)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[var(--accent-purple)]"
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href={`mailto:${personal.email}`}
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]
                hover:bg-[var(--btn-primary-hover)]
                hover:shadow-[var(--glow-purple)]
                transition-all duration-200
              "
            >
              <Mail size={14} />
              Hire me
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-[var(--border-default)] bg-[var(--bg-surface)]"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.href.replace('#', '')
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[var(--accent-purple)] bg-[var(--bg-elevated)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                    }`}
                  >
                    {link.label}
                  </button>
                )
              })}
              <a
                href={`mailto:${personal.email}`}
                className="
                  mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                  bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]
                  hover:bg-[var(--btn-primary-hover)]
                  transition-all duration-200
                "
              >
                <Mail size={14} />
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
