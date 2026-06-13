'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Mail, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useAdaptiveNavbar } from '@/hooks/useAdaptiveNavbar'
import { personal } from '@/data/portfolio'
import { HoverBorderGradient } from '../../ui/hover-border-gradient'
import { SparklesText } from '../../ui/sparkles-text'
import { RainbowButton } from '../../ui/rainbow-button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''))

const mobilePanelSpring = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 32,
  mass: 0.85,
  bounce: 0,
}

const mobilePanelExit = {
  duration: 0.28,
  ease: [0.4, 0, 1, 1] as const,
}

const mobileLinkSpring = {
  type: 'spring' as const,
  stiffness: 520,
  damping: 26,
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const activeId = useScrollSpy(SECTION_IDS, 80)
  const { isOnLightBg } = useAdaptiveNavbar()

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const isDarkPill = isOnLightBg
  const pillContent = {
    logo: isDarkPill ? 'text-foreground' : 'text-accent-foreground',
    linkInactive: isDarkPill
      ? 'text-accent-foreground hover:text-primary'
      : 'text-accent-foreground hover:text-primary',
    linkActive: isDarkPill ? 'text-primary' : 'text-primary',
    linkDot: isDarkPill ? 'bg-primary' : 'bg-primary',
    menuBtn: isDarkPill
      ? 'border-foreground/25 text-foreground'
      : 'border-foreground/25 text-primary',
  }

  return (
    <header
      id="nav-header"
      className={cn(
        'max-w-7xl mx-auto fixed top-4 left-2 right-2 z-110 border',
        'transition-colors duration-300 rounded-xl md:rounded-2xl backdrop-blur-md',
        isOnLightBg
          ? 'bg-background/50 border-border text-foreground'
          : 'bg-foreground/10 border-foreground/15 text-background'
      )}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <div className="flex items-center justify-between h-16">
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            transition={mobilePanelSpring}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative flex items-center gap-2 cursor-pointer group"
            aria-label="Scroll to top"
          >
            <SparklesText
              sparklesCount={3}
              colors={
                isDarkPill
                  ? { first: '#38bdf8', second: '#7dd3fc' }
                  : { first: '#0284c7', second: '#0ea5e9' }
              }
              className={cn('text-xl font-bold tracking-wide', pillContent.logo)}
            >
              Chandu Bobbili
            </SparklesText>
          </motion.button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.replace('#', '')
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    'relative px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer',
                    isActive ? pillContent.linkActive : pillContent.linkInactive
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className={cn(
                        'absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full',
                        pillContent.linkDot
                      )}
                    />
                  )}
                </button>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <RainbowButton
              asChild
              size="sm"
              variant={isDarkPill ? 'default' : 'outline'}
              className="rounded-md"
            >
              <Link href={`mailto:${personal.email}`}>
                <Mail size={16} />
                Hire Me
              </Link>
            </RainbowButton>
          </div>

          <div className="flex md:hidden items-center gap-2">
            {/* <ThemeToggle /> */}
            <motion.button
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                'relative w-9 h-9 flex items-center justify-center rounded-md border',
                pillContent.menuBtn
              )}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              whileTap={{ scale: 0.92 }}
              transition={mobilePanelSpring}
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 90 : 0, scale: mobileOpen ? 0.9 : 1 }}
                transition={mobilePanelSpring}
                className="flex items-center justify-center"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <>
                <motion.button
                  key="mobile-nav-backdrop"
                  type="button"
                  aria-label="Close menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => setMobileOpen(false)}
                  className="md:hidden fixed inset-0 z-100 bg-background/25 backdrop-blur-xs"
                />

                <motion.nav
                  key="mobile-nav-panel"
                  initial={{ y: '100%', opacity: 0.6 }}
                  animate={{ y: 0, opacity: 1, transition: mobilePanelSpring }}
                  exit={{ y: '100%', opacity: 0, transition: mobilePanelExit }}
                  className="md:hidden fixed inset-x-0 bottom-0 z-105 mx-3 mb-3 max-h-[min(82vh,calc(100dvh-5rem))] overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-[0_16px_48px_rgba(56,189,248,0.2)] backdrop-blur-xl"
                  aria-label="Mobile navigation"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(56,189,248,0.15) 0%, transparent 70%)',
                    }}
                  />

                  <div className="relative flex flex-col px-5 pb-5 pt-4">
                    <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
                      <div>
                        <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                          Navigation
                        </p>
                        <p className="font-heading text-sm font-semibold text-foreground">
                          {personal.shortName} Bobbili
                        </p>
                      </div>
                      <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
                        {String(NAV_LINKS.length).padStart(2, '0')} sections
                      </span>
                    </div>

                    <ul className="flex flex-col gap-1.5 overflow-y-auto">
                      {NAV_LINKS.map((link, index) => {
                        const isActive = activeId === link.href.replace('#', '')
                        return (
                          <motion.li
                            key={link.href}
                            custom={index}
                            // variants={mobileLinkVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <button
                              type="button"
                              onClick={() => scrollTo(link.href)}
                              className={`group flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors ${
                                isActive
                                  ? 'border-primary/30 bg-primary/8 text-primary'
                                  : 'border-transparent bg-background/40 text-foreground hover:border-border hover:bg-background/70'
                              }`}
                            >
                              <span
                                className={`font-mono text-[11px] tabular-nums ${
                                  isActive ? 'text-primary' : 'text-muted-foreground'
                                }`}
                              >
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span className="flex-1 font-heading text-base font-semibold tracking-wide">
                                {link.label}
                              </span>
                              <ArrowUpRight
                                size={14}
                                className={`shrink-0 transition-transform group-active:translate-x-0.5 group-active:-translate-y-0.5 ${
                                  isActive ? 'text-primary' : 'text-muted-foreground'
                                }`}
                              />
                            </button>
                          </motion.li>
                        )
                      })}
                    </ul>

                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          ...mobileLinkSpring,
                          delay: 0.08,
                        },
                      }}
                      exit={{ opacity: 0, y: 12, transition: mobilePanelExit }}
                      className="mt-4"
                    >
                      <HoverBorderGradient
                        as="a"
                        href={`mailto:${personal.email}`}
                        containerClassName="rounded-full w-full"
                        className="h-10 w-full font-sans text-sm uppercase tracking-widest bg-background text-foreground flex items-center justify-center gap-1"
                      >
                        Hire me
                        <ArrowUpRight size={14} />
                      </HoverBorderGradient>
                    </motion.div>
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  )
}
