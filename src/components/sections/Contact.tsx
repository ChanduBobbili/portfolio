'use client'

import { motion } from 'framer-motion'
import { Mail, Send, Antenna } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { HudPanel } from '@/components/ui/HudPanel'
import { personal } from '@/data/portfolio'

const SOCIAL_LINKS = [
  { href: personal.github, icon: GithubIcon, label: 'GitHub' },
  { href: personal.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          sector="Sector 06 — Communication Station"
          title="Open channel"
          subtitle="Frequency open. Awaiting your transmission."
          align="center"
        />

        <div className="relative max-w-2xl mx-auto">
          {/* Signal rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="absolute rounded-full border"
                style={{
                  width: 60 + n * 70,
                  height: 60 + n * 70,
                  marginTop: -(30 + n * 35),
                  marginLeft: -(30 + n * 35),
                  borderColor: `rgba(34,211,238,${0.18 - n * 0.03})`,
                  animation: `signal-wave ${2 + n * 0.6}s ease-out ${n * 0.35}s infinite`,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HudPanel
              header="Deep Space Relay"
              code="COMMS-ACTIVE"
              accent="stellar"
              glow
              scanlines
              className="text-center"
            >
              <div className="relative px-6 sm:px-10 py-12 sm:py-14">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 mx-auto"
                  style={{
                    background: 'rgba(34,211,238,0.1)',
                    border: '1px solid rgba(34,211,238,0.35)',
                    boxShadow: 'var(--glow-stellar)',
                  }}
                >
                  <Antenna size={32} style={{ color: 'var(--accent-stellar)' }} />
                  <div
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 animate-pulse"
                    style={{
                      backgroundColor: 'var(--accent-aurora)',
                      borderColor: 'var(--bg-surface)',
                    }}
                  />
                </motion.div>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md mx-auto font-mono text-sm">
                  Open to full-time roles, freelance projects, and interesting collaborations.
                  Best way to reach me is email — I reply within 24 hours.
                </p>

                <motion.a
                  href={`mailto:${personal.email}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-mono uppercase tracking-wider text-white w-full sm:w-auto mb-8 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-stellar), var(--accent-nebula))',
                    boxShadow: 'var(--glow-stellar)',
                  }}
                >
                  <motion.span
                    className="absolute inset-0 -skew-x-12 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                    animate={{ x: ['-150%', '150%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                  />
                  <Mail size={16} className="relative z-10" />
                  <span className="relative z-10">{personal.email}</span>
                  <Send size={14} className="relative z-10 opacity-60" />
                </motion.a>

                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 sector-divider" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-dim)]">
                    alternate frequencies
                  </span>
                  <div className="h-px flex-1 sector-divider" />
                </div>

                <div className="flex justify-center gap-3">
                  {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono border transition-all duration-200 hover:neon-glow-stellar"
                      style={{
                        borderColor: 'var(--border-muted)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <Icon style={{ width: 15, height: 15 }} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </HudPanel>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
