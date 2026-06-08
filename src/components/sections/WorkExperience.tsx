'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react'
import { experience } from '@/data/portfolio'

const ACCENT_VARS: Record<string, { color: string; glow: string; tag: string }> = {
  purple: { color: 'var(--accent-purple)', glow: 'var(--glow-purple)', tag: 'rgba(167,139,250,0.12)' },
  cyan:   { color: 'var(--accent-cyan)',   glow: 'var(--glow-cyan)',   tag: 'rgba(34,211,238,0.12)'  },
  green:  { color: 'var(--accent-green)',  glow: 'var(--glow-green)',  tag: 'rgba(52,211,153,0.12)'  },
}

function ProjectAccordion({
  name,
  description,
  stack,
  bullets,
  accent,
  defaultOpen = false,
}: {
  name: string
  description: string
  stack: string[]
  bullets: string[]
  accent: string
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const a = ACCENT_VARS[accent] ?? ACCENT_VARS.purple

  return (
    <div
      className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] overflow-hidden transition-all duration-300"
      style={open ? { borderColor: `color-mix(in srgb, ${a.color} 40%, transparent)` } : undefined}
    >
      {/* Accordion header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="shrink-0 w-2 h-2 rounded-full"
            style={{ backgroundColor: a.color }}
          />
          <span className="text-sm font-semibold text-[var(--text-primary)] truncate">{name}</span>
        </div>
        <span className="shrink-0 ml-2 text-[var(--text-tertiary)]">
          {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </span>
      </button>

      {/* Accordion body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-[var(--border-muted)]">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-4 mb-4">
                {description}
              </p>

              {/* Stack chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-2.5">
                {bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span
                      className="mt-2 shrink-0 w-1 h-1 rounded-full"
                      style={{ backgroundColor: a.color }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function WorkExperience() {
  return (
    <section id="work" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono uppercase tracking-widest text-[var(--accent-purple)] mb-3"
        >
          Work Experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-14"
        >
          Where I&apos;ve worked
        </motion.h2>

        <div className="relative">
          {/* Timeline rail */}
          <div className="absolute left-4 top-3 bottom-3 w-px bg-[var(--border-default)] hidden sm:block" />

          <div className="flex flex-col gap-14">
            {experience.map((entry, ei) => (
              <motion.div
                key={`${entry.company}-${entry.period}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ei * 0.1 }}
                className="relative sm:pl-12"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2.5 hidden sm:flex items-center justify-center w-8 h-8">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      entry.current
                        ? 'bg-[var(--dot-active)] shadow-[var(--glow-purple)]'
                        : 'border-2 border-[var(--dot-inactive)] bg-transparent'
                    }`}
                  />
                </div>

                {/* Company header */}
                <div className="mb-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                      {entry.role}
                    </h3>
                    {entry.current && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[rgba(167,139,250,0.12)] text-[var(--accent-purple)] border border-[rgba(167,139,250,0.3)]">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--accent-purple)] font-medium text-sm mb-2">
                    {entry.company}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-[var(--text-tertiary)]">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      {entry.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={11} />
                      {entry.location}
                    </span>
                  </div>
                </div>

                {/* Projects */}
                <div className="flex flex-col gap-3">
                  {entry.projects.map((project, pi) => (
                    <ProjectAccordion
                      key={project.name}
                      {...project}
                      defaultOpen={ei === 0 && pi === 0}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
