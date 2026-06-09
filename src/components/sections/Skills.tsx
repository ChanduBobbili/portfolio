'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { HudPanel } from '@/components/ui/HudPanel'
import { skills } from '@/data/portfolio'

const ACCENT_MAP: Record<string, {
  color: string; glow: string; bg: string; border: string; planet: string;
}> = {
  purple: {
    color: 'var(--accent-nebula)',
    glow: 'var(--glow-nebula)',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.22)',
    planet: 'radial-gradient(circle at 35% 35%, #2D1B52, #1A0A35)',
  },
  cyan: {
    color: 'var(--accent-stellar)',
    glow: 'var(--glow-stellar)',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.22)',
    planet: 'radial-gradient(circle at 35% 35%, #0D3547, #061822)',
  },
  green: {
    color: 'var(--accent-aurora)',
    glow: 'var(--glow-aurora)',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.22)',
    planet: 'radial-gradient(circle at 35% 35%, #0D3528, #061814)',
  },
}

const CATEGORY_SYMBOLS: Record<string, string> = {
  'Languages': 'λ',
  'Go Internals': 'G',
  'Frontend': '◈',
  'Backend & Messaging': '⚡',
  'Databases': '⬡',
  'DevOps & Cloud': '☁',
  'Other': '✦',
}

export function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          sector="Sector 04 — Technology Systems"
          title="Systems radar"
          subtitle={`${skills.length} orbital modules online — scanning tech stack across all quadrants.`}
        />

        {/* Radar centerpiece — decorative */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-48 h-48 mx-auto mb-12 hidden sm:block"
          aria-hidden="true"
        >
          {[1, 2, 3, 4].map((ring) => (
            <div
              key={ring}
              className="absolute top-1/2 left-1/2 rounded-full border"
              style={{
                width: ring * 36,
                height: ring * 36,
                marginTop: -(ring * 36) / 2,
                marginLeft: -(ring * 36) / 2,
                borderColor: `rgba(34,211,238,${0.15 - ring * 0.03})`,
              }}
            />
          ))}
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 rounded-full"
            style={{ backgroundColor: 'var(--accent-stellar)', boxShadow: 'var(--glow-stellar)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-[72px] h-[1px] origin-left animate-orbit"
            style={{
              background: 'linear-gradient(90deg, var(--accent-stellar), transparent)',
              marginTop: -0.5,
            }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, gi) => {
            const a = ACCENT_MAP[group.accent] ?? ACCENT_MAP.purple
            const hudAccent = group.accent === 'purple' ? 'nebula' : group.accent === 'green' ? 'aurora' : 'stellar'

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.06 }}
              >
                <HudPanel
                  header={group.category}
                  code={`MOD-${String(gi + 1).padStart(2, '0')}`}
                  accent={hudAccent}
                  className="h-full transition-all duration-300 hover:neon-glow-stellar"
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{
                          background: a.planet,
                          border: `1px solid ${a.border}`,
                          color: a.color,
                          fontFamily: 'var(--font-mono)',
                          boxShadow: a.glow,
                        }}
                      >
                        {CATEGORY_SYMBOLS[group.category] ?? '◉'}
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-widest">
                          {group.items.length} modules detected
                        </p>
                        {/* Signal strength bar */}
                        <div className="flex gap-0.5 mt-1.5">
                          {Array.from({ length: 5 }).map((_, bi) => (
                            <div
                              key={bi}
                              className="w-3 h-1 rounded-full"
                              style={{
                                backgroundColor: bi < Math.min(5, Math.ceil(group.items.length / 3))
                                  ? a.color
                                  : 'var(--border-muted)',
                                opacity: bi < Math.min(5, Math.ceil(group.items.length / 3)) ? 0.8 : 0.3,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all duration-200 cursor-default hover:scale-105"
                          style={{
                            background: 'var(--bg-elevated)',
                            borderColor: 'var(--border-muted)',
                            color: 'var(--text-secondary)',
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement
                            el.style.color = a.color
                            el.style.borderColor = a.border
                            el.style.background = a.bg
                            el.style.boxShadow = a.glow
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement
                            el.style.color = 'var(--text-secondary)'
                            el.style.borderColor = 'var(--border-muted)'
                            el.style.background = 'var(--bg-elevated)'
                            el.style.boxShadow = ''
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </HudPanel>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
