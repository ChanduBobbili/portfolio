'use client'

import { motion } from 'framer-motion'
import { MapPin, Briefcase, GraduationCap, Zap } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { HudPanel } from '@/components/ui/HudPanel'
import { personal } from '@/data/portfolio'

const MISSION_CARDS = [
  { icon: Briefcase, label: 'Current Station', value: personal.currentRole, accent: 'stellar' as const },
  { icon: Zap, label: 'Open To', value: personal.openTo, accent: 'nebula' as const },
  { icon: GraduationCap, label: 'Training', value: personal.education, accent: 'aurora' as const },
  { icon: MapPin, label: 'Coordinates', value: personal.location, accent: 'stellar' as const },
]

function AstronautBadge() {
  return (
    <svg viewBox="0 0 80 100" className="w-full h-full" fill="none">
      <circle cx="40" cy="28" r="20" fill="#1E2D50" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
      <ellipse cx="40" cy="29" rx="13" ry="10" fill="#001428" />
      <ellipse cx="36" cy="26" rx="4" ry="2.5" fill="rgba(255,255,255,0.1)" />
      <rect x="28" y="46" width="24" height="36" rx="10" fill="#1E2D50" stroke="rgba(34,211,238,0.3)" />
      <rect x="32" y="54" width="16" height="12" rx="3" fill="rgba(34,211,238,0.1)" stroke="rgba(34,211,238,0.25)" />
      <circle cx="40" cy="60" r="2" fill="#22D3EE" />
    </svg>
  )
}

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          sector="Sector 01 — Mission Profile"
          title="Crew dossier"
          subtitle="Systems engineer navigating distributed architectures across the orbital stack."
        />

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Terminal readout */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-3"
          >
            <HudPanel
              header="Biographical Transmission"
              code="LOG-042"
              accent="stellar"
              scanlines
              className="h-full"
            >
              <div className="p-5 sm:p-6 font-mono text-sm leading-relaxed">
                <p className="text-[var(--text-tertiary)] mb-4 text-[11px] uppercase tracking-widest">
                  // decoded signal
                </p>
                <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
                  <span style={{ color: 'var(--accent-stellar)' }}>&gt; </span>
                  {personal.about}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {personal.stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="rounded-lg p-4 border"
                      style={{
                        borderColor: 'var(--border-muted)',
                        background: 'color-mix(in srgb, var(--bg-elevated) 60%, transparent)',
                      }}
                    >
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ fontFamily: 'var(--font-space)', color: 'var(--accent-stellar)' }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HudPanel>
          </motion.div>

          {/* NASA ID badge */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <HudPanel
              header="Personnel Identification"
              code="ID-ACTIVE"
              accent="nebula"
              glow
              className="scanner-line"
            >
              <div className="p-5">
                <div
                  className="flex items-center gap-4 mb-5 pb-5 border-b"
                  style={{ borderColor: 'var(--border-muted)' }}
                >
                  <div
                    className="w-20 h-24 rounded-xl flex items-center justify-center p-2 shrink-0"
                    style={{
                      background: 'linear-gradient(160deg, rgba(34,211,238,0.12), rgba(168,85,247,0.12))',
                      border: '1px solid rgba(34,211,238,0.3)',
                      boxShadow: 'var(--glow-stellar)',
                    }}
                  >
                    <AstronautBadge />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold text-[var(--text-primary)]"
                      style={{ fontFamily: 'var(--font-space)' }}
                    >
                      {personal.name}
                    </h3>
                    <p className="text-xs font-mono mt-1" style={{ color: 'var(--accent-stellar)' }}>
                      {personal.role}
                    </p>
                    <p className="text-[10px] font-mono text-[var(--text-dim)] mt-1 uppercase tracking-wider">
                      Clearance: SDE-III
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  {MISSION_CARDS.map((card, i) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.07 }}
                      className="flex items-start gap-3 rounded-lg p-3 border"
                      style={{
                        borderColor: 'var(--border-muted)',
                        background: 'color-mix(in srgb, var(--bg-elevated) 50%, transparent)',
                      }}
                    >
                      <card.icon size={14} style={{ color: `var(--accent-${card.accent})` }} className="mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-widest text-[var(--text-dim)]">
                          {card.label}
                        </p>
                        <p className="text-sm text-[var(--text-primary)]">{card.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div
                  className="mt-4 pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: 'var(--border-muted)' }}
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-full"
                        style={{
                          width: i % 3 === 0 ? 3 : 1.5,
                          height: 14,
                          backgroundColor: 'var(--text-dim)',
                          opacity: 0.35 + (i % 4) * 0.1,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-[var(--text-dim)]">BVC-2025-SDE</span>
                </div>
              </div>
            </HudPanel>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
