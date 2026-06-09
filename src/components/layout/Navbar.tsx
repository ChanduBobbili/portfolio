'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Rocket, Radio } from 'lucide-react'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { personal } from '@/data/portfolio'

const NAV_LINKS = [
  { label: 'Profile',   href: '#about',    code: 'SEC-01' },
  { label: 'Missions',  href: '#projects', code: 'SEC-02' },
  { label: 'Trajectory', href: '#work',    code: 'SEC-03' },
  { label: 'Systems',   href: '#skills',   code: 'SEC-04' },
  { label: 'Transmissions', href: '#writing', code: 'SEC-05' },
  { label: 'Comms',     href: '#contact',  code: 'SEC-06' },
]

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''))

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [time, setTime] = useState('')
  const activeId = useScrollSpy(SECTION_IDS, 80)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl' : ''
      }`}
    >
      {/* HUD top rail */}
      <div
        className="hidden sm:block h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 2%, var(--accent-stellar) 25%, var(--accent-nebula) 75%, transparent 98%)',
          opacity: scrolled ? 1 : 0.5,
        }}
      />

      <div
        className={`transition-all duration-500 border-b ${
          scrolled ? 'glass-panel shadow-[var(--glow-stellar)]' : 'border-transparent'
        }`}
        style={{ borderColor: scrolled ? 'var(--border-neon)' : 'transparent' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Logo — mission callsign */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2.5 cursor-pointer"
            >
              <div
                className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-stellar), var(--accent-nebula))',
                  boxShadow: 'var(--glow-stellar)',
                }}
              >
                <Rocket size={14} className="text-white" style={{ transform: 'rotate(-45deg)' }} />
                <span
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border animate-pulse"
                  style={{
                    backgroundColor: 'var(--accent-aurora)',
                    borderColor: 'var(--bg-base)',
                  }}
                />
              </div>
              <div className="text-left">
                <span
                  className="block text-sm sm:text-base font-bold leading-none"
                  style={{ fontFamily: 'var(--font-space)' }}
                >
                  CB<span style={{ color: 'var(--accent-stellar)' }}>.</span>MISSION
                </span>
                <span className="text-[9px] font-mono text-[var(--text-tertiary)] tracking-widest hidden sm:block">
                  ORBITAL PORTFOLIO v2.0
                </span>
              </div>
            </button>

            {/* Mission clock — desktop */}
            <div
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-[10px] uppercase tracking-wider"
              style={{
                borderColor: 'var(--border-muted)',
                color: 'var(--text-tertiary)',
                background: 'color-mix(in srgb, var(--bg-surface) 60%, transparent)',
              }}
            >
              <Radio size={10} style={{ color: 'var(--accent-aurora)' }} className="animate-pulse" />
              <span>UTC</span>
              <span style={{ color: 'var(--accent-stellar)' }} className="tabular-nums">
                {time}
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.href.replace('#', '')
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`relative px-2.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-md ${
                      isActive
                        ? 'text-[var(--accent-stellar)]'
                        : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-md -z-10 border"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--accent-stellar) 35%, transparent)',
                          background: 'color-mix(in srgb, var(--accent-stellar) 10%, transparent)',
                          boxShadow: 'var(--glow-stellar)',
                        }}
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <a
                href={`mailto:${personal.email}`}
                className="group relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider text-white transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-stellar), var(--accent-nebula))',
                  boxShadow: 'var(--glow-stellar)',
                }}
              >
                <motion.span
                  className="absolute inset-0 -skew-x-12 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                  }}
                  animate={{ x: ['-150%', '150%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                />
                <Rocket size={12} className="relative z-10" style={{ transform: 'rotate(-45deg)' }} />
                <span className="relative z-10">Hail</span>
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer glass-panel"
                style={{ borderColor: 'var(--border-neon)' }}
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-panel border-b"
            style={{ borderColor: 'var(--border-neon)' }}
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.href.replace('#', '')
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left px-3 py-2.5 rounded-lg text-sm font-mono transition-all duration-150 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'text-[var(--accent-stellar)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                    style={
                      isActive
                        ? {
                            background: 'color-mix(in srgb, var(--accent-stellar) 10%, transparent)',
                            border: '1px solid color-mix(in srgb, var(--accent-stellar) 25%, transparent)',
                          }
                        : {}
                    }
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] text-[var(--text-dim)]">{link.code}</span>
                  </button>
                )
              })}
              <a
                href={`mailto:${personal.email}`}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-mono uppercase tracking-wider text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-stellar), var(--accent-nebula))',
                }}
              >
                <Rocket size={13} style={{ transform: 'rotate(-45deg)' }} />
                Establish Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
