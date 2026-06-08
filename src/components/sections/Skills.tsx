'use client'

import { motion } from 'framer-motion'
import { skills } from '@/data/portfolio'

const ACCENT_VARS: Record<string, { color: string; glow: string }> = {
  purple: { color: 'var(--accent-purple)', glow: 'var(--glow-purple)' },
  cyan:   { color: 'var(--accent-cyan)',   glow: 'var(--glow-cyan)'   },
  green:  { color: 'var(--accent-green)',  glow: 'var(--glow-green)'  },
}

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
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
            const a = ACCENT_VARS[group.accent] ?? ACCENT_VARS.purple

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: gi * 0.07 }}
                className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-5"
              >
                {/* Category label */}
                <p
                  className="text-[10px] font-mono uppercase tracking-widest mb-4"
                  style={{ color: a.color }}
                >
                  {group.category}
                </p>

                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: gi * 0.05 + ii * 0.04 }}
                      whileHover={{ scale: 1.06 }}
                      className="
                        px-2.5 py-1 rounded-md text-xs font-mono
                        bg-[var(--bg-elevated)] border border-[var(--border-default)]
                        text-[var(--text-secondary)]
                        hover:text-[var(--accent-purple)] hover:border-[var(--accent-purple)]
                        transition-colors duration-200 cursor-default
                      "
                      style={{
                        '--chip-glow': a.glow,
                        transition: 'color 0.2s, border-color 0.2s, box-shadow 0.2s',
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.boxShadow = a.glow
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
