'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, FileText } from 'lucide-react'
import { articles } from '@/data/portfolio'

const ACCENT_VARS: Record<string, { color: string; glow: string; bg: string }> = {
  purple: { color: 'var(--accent-purple)', glow: 'var(--glow-purple)', bg: 'rgba(167,139,250,0.12)' },
  cyan:   { color: 'var(--accent-cyan)',   glow: 'var(--glow-cyan)',   bg: 'rgba(34,211,238,0.12)'  },
  green:  { color: 'var(--accent-green)',  glow: 'var(--glow-green)',  bg: 'rgba(52,211,153,0.12)'  },
}

export function TechnicalWriting() {
  return (
    <section id="writing" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
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
          className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-4"
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
            href="https://dev.to/chandubobbili"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-purple)] hover:underline"
          >
            DEV Community
          </a>{' '}
          — covering frontend tooling, SEO, and open-source development.
        </motion.p>

        <div className="flex flex-col gap-4">
          {articles.map((article, i) => {
            const a = ACCENT_VARS[article.accent] ?? ACCENT_VARS.purple

            return (
              <motion.a
                key={article.title}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="
                  group flex items-start gap-4 p-5 rounded-xl
                  bg-[var(--bg-surface)] border border-[var(--border-default)]
                  hover:border-[var(--accent-purple)]
                  transition-all duration-300
                "
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--glow-purple)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                }}
              >
                {/* Icon block */}
                <div
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: a.bg }}
                >
                  <FileText size={18} style={{ color: a.color }} />
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
                        className="px-2 py-0.5 rounded text-[11px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-elevated)] border border-[var(--border-default)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <motion.div
                  className="shrink-0 text-[var(--text-tertiary)] group-hover:text-[var(--accent-purple)] transition-colors mt-0.5"
                  whileHover={{ x: 4 }}
                >
                  <ArrowUpRight size={18} />
                </motion.div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
