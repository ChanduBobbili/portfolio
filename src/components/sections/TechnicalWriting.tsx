'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Radio } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { HudPanel } from '@/components/ui/HudPanel'
import { articles } from '@/data/portfolio'

const ACCENT_MAP: Record<string, { color: string; glow: string; bg: string; border: string }> = {
  purple: {
    color: 'var(--accent-nebula)',
    glow: 'var(--glow-nebula)',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.25)',
  },
  cyan: {
    color: 'var(--accent-stellar)',
    glow: 'var(--glow-stellar)',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.25)',
  },
  green: {
    color: 'var(--accent-aurora)',
    glow: 'var(--glow-aurora)',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.25)',
  },
}

export function TechnicalWriting() {
  return (
    <section id="writing" className="py-24 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          sector="Sector 05 — Field Transmissions"
          title="Signal log"
          subtitle={
            <>
              Broadcasts from{' '}
              <a
                href="https://dev.to/chandu_bobbili_06"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'var(--accent-stellar)' }}
              >
                DEV Community
              </a>{' '}
              — intercepted and archived.
            </>
          }
        />

        <div className="flex flex-col gap-4">
          {articles.map((article, i) => {
            const a = ACCENT_MAP[article.accent] ?? ACCENT_MAP.purple
            const hudAccent = article.accent === 'purple' ? 'nebula' : article.accent === 'green' ? 'aurora' : 'stellar'

            return (
              <motion.a
                key={article.title}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ x: 4 }}
                className="block group"
              >
                <HudPanel
                  header={`Transmission ${String(i + 1).padStart(2, '0')}`}
                  code={`TX-${String(i + 1).padStart(3, '0')}`}
                  accent={hudAccent}
                  className="transition-all duration-300 group-hover:neon-glow-stellar"
                >
                  <div className="p-5 flex items-start gap-4">
                    <div
                      className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: a.bg, border: `1px solid ${a.border}` }}
                    >
                      <Radio size={18} style={{ color: a.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base font-bold text-[var(--text-primary)] mb-1.5 leading-snug group-hover:text-[var(--accent-stellar)] transition-colors"
                        style={{ fontFamily: 'var(--font-space)' }}
                      >
                        {article.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3 font-mono">
                        {article.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono border"
                            style={{
                              background: 'var(--bg-elevated)',
                              borderColor: 'var(--border-muted)',
                              color: 'var(--text-dim)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="shrink-0 mt-1 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: 'var(--text-dim)' }}
                    />
                  </div>
                </HudPanel>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
