'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, FileText } from 'lucide-react'
import { articles } from '@/data/portfolio'

const ACCENT: Record<string, { color: string; glow: string; bg: string; gradient: string }> = {
  purple: {
    color:    'var(--accent-purple)',
    glow:     'var(--glow-purple)',
    bg:       'rgba(167,139,250,0.12)',
    gradient: 'linear-gradient(90deg, rgba(167,139,250,0.8), rgba(167,139,250,0.25), transparent)',
  },
  cyan: {
    color:    'var(--accent-cyan)',
    glow:     'var(--glow-cyan)',
    bg:       'rgba(34,211,238,0.12)',
    gradient: 'linear-gradient(90deg, rgba(34,211,238,0.8), rgba(34,211,238,0.25), transparent)',
  },
  green: {
    color:    'var(--accent-green)',
    glow:     'var(--glow-green)',
    bg:       'rgba(52,211,153,0.12)',
    gradient: 'linear-gradient(90deg, rgba(52,211,153,0.8), rgba(52,211,153,0.25), transparent)',
  },
}

export function TechnicalWriting() {
  return (
    <section id="writing" className="py-24 section-alt relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-[0.03] dark:opacity-[0.05] blur-[70px]"
        style={{ background: 'radial-gradient(circle, var(--accent-cyan), transparent 70%)' }}
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
          Technical Writing
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-3"
        >
          Articles I&apos;ve written
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[var(--text-secondary)] mb-12"
        >
          Published on{' '}
          <a
            href="https://dev.to/chandu_bobbili_06"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-purple)] hover:underline font-medium"
          >
            DEV Community
          </a>{' '}
          — covering frontend tooling, SEO, and open-source development.
        </motion.p>

        <div className="flex flex-col gap-3">
          {articles.map((article, i) => {
            const a = ACCENT[article.accent] ?? ACCENT.purple

            return (
              <motion.a
                key={article.title}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.09, ease: [0.0, 0.0, 0.2, 1] }}
                whileHover={{ x: 4 }}
                className="group relative flex items-start gap-4 p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] card-base hover:border-[var(--border-neon)] transition-all duration-300 overflow-hidden"
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = a.glow
                  ;(e.currentTarget as HTMLElement).style.borderColor = `color-mix(in srgb, ${a.color} 40%, transparent)`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                  ;(e.currentTarget as HTMLElement).style.borderColor = ''
                }}
              >
                {/* Gradient accent top line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: a.gradient }}
                />

                {/* Number label */}
                <span className="absolute top-4 right-14 text-[10px] font-mono text-[var(--text-tertiary)] opacity-0 group-hover:opacity-60 transition-opacity duration-300 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon block */}
                <div
                  className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: a.bg }}
                >
                  <FileText size={17} style={{ color: a.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent-purple)] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                    {article.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-elevated)] border border-[var(--border-default)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="shrink-0 text-[var(--text-tertiary)] group-hover:text-[var(--accent-purple)] transition-all duration-200 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={18} />
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
