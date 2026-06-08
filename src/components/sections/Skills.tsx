'use client'

import { motion } from 'framer-motion'
import { skills } from '@/data/portfolio'

const ACCENT: Record<string, { color: string; glow: string; bg: string; header: string }> = {
  purple: {
    color:  'var(--accent-purple)',
    glow:   'var(--glow-purple)',
    bg:     'rgba(167,139,250,0.08)',
    header: 'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(167,139,250,0.05))',
  },
  cyan: {
    color:  'var(--accent-cyan)',
    glow:   'var(--glow-cyan)',
    bg:     'rgba(34,211,238,0.08)',
    header: 'linear-gradient(135deg, rgba(34,211,238,0.18), rgba(34,211,238,0.05))',
  },
  green: {
    color:  'var(--accent-green)',
    glow:   'var(--glow-green)',
    bg:     'rgba(52,211,153,0.08)',
    header: 'linear-gradient(135deg, rgba(52,211,153,0.18), rgba(52,211,153,0.05))',
  },
}

export function Skills() {
  return (
    <section id="skills" className="py-24 section-alt relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.025] dark:opacity-[0.04] blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--accent-purple), transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono uppercase tracking-widest text-[var(--accent-purple)] mb-3"
        >
          Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-12"
        >
          What I work with
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, gi) => {
            const a = ACCENT[group.accent] ?? ACCENT.purple

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.07, ease: [0.0, 0.0, 0.2, 1] }}
                whileHover={{ y: -3 }}
                className="group relative bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl overflow-hidden card-base hover:border-[var(--accent-purple)] transition-all duration-300"
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = a.glow
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = ''
                }}
              >
                {/* Category header with gradient background */}
                <div
                  className="px-5 pt-5 pb-4 border-b border-[var(--border-muted)]"
                  style={{ background: a.header }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: a.color, boxShadow: `0 0 8px ${a.color}60` }}
                    />
                    <p
                      className="text-[11px] font-mono uppercase tracking-widest font-semibold"
                      style={{ color: a.color }}
                    >
                      {group.category}
                    </p>
                  </div>
                </div>

                {/* Chips */}
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, ii) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.28, delay: gi * 0.04 + ii * 0.03 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] transition-all duration-200 cursor-default"
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.color = a.color
                          el.style.borderColor = `color-mix(in srgb, ${a.color} 50%, transparent)`
                          el.style.backgroundColor = a.bg
                          el.style.boxShadow = a.glow
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.color = ''
                          el.style.borderColor = ''
                          el.style.backgroundColor = ''
                          el.style.boxShadow = ''
                        }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
