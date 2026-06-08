'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, MapPin, Calendar } from 'lucide-react'
import { experience } from '@/data/portfolio'

const ACCENT: Record<string, { color: string; glow: string; bg: string }> = {
  purple: { color: 'var(--accent-purple)', glow: 'var(--glow-purple)', bg: 'rgba(167,139,250,0.10)' },
  cyan:   { color: 'var(--accent-cyan)',   glow: 'var(--glow-cyan)',   bg: 'rgba(34,211,238,0.10)'  },
  green:  { color: 'var(--accent-green)',  glow: 'var(--glow-green)',  bg: 'rgba(52,211,153,0.10)'  },
}

function ProjectAccordion({
  name,
  description,
  stack,
  bullets,
  accent,
  defaultOpen = true,
}: {
  name: string
  description: string
  stack: string[]
  bullets: string[]
  accent: string
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const a = ACCENT[accent] ?? ACCENT.purple

  return (
    <div
      className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden transition-all duration-300 card-base"
      style={open ? { borderColor: `color-mix(in srgb, ${a.color} 35%, transparent)` } : undefined}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="shrink-0 w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: open ? a.color : `color-mix(in srgb, ${a.color} 40%, transparent)`,
              boxShadow: open ? a.glow : 'none',
            }}
          />
          <span className="text-sm font-semibold text-[var(--text-primary)] truncate">{name}</span>
        </div>
        <span className="shrink-0 ml-2 text-[var(--text-tertiary)] transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <ChevronDown size={15} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-[var(--border-muted)]">
              {/* Gradient accent at top */}
              <div
                className="h-[1px] -mx-5 mb-4"
                style={{ background: `linear-gradient(90deg, ${a.color}40, transparent)` }}
              />

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {description}
              </p>

              {/* Stack chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)]"
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
                      className="mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: a.color, opacity: 0.7 }}
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
  const timelineRef = useRef<HTMLDivElement>(null)

  // Scroll-driven timeline fill — progress goes 0→1 as the section scrolls through view
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 20%'],
  })
  const fillScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="work" className="py-24 section-alt relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-20 right-0 w-72 h-72 rounded-full pointer-events-none opacity-[0.03] dark:opacity-[0.05] blur-[70px]"
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

        <div ref={timelineRef} className="relative">
          {/* Background rail — always visible, muted */}
          <div className="absolute left-[15px] top-4 bottom-4 w-px bg-[var(--border-default)] hidden sm:block" />

          {/* Scroll-driven fill rail — grows from top as user scrolls */}
          <motion.div
            className="absolute left-[15px] hidden sm:block w-px origin-top"
            style={{
              top: '1rem',
              bottom: '1rem',
              scaleY: fillScaleY,
              background: 'linear-gradient(180deg, var(--accent-purple), var(--accent-cyan))',
            }}
          />

          <div className="flex flex-col gap-14">
            {experience.map((entry, ei) => (
              <motion.div
                key={`${entry.company}-${entry.period}`}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: ei * 0.1, ease: [0.0, 0.0, 0.2, 1] }}
                className="relative sm:pl-14"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2.5 hidden sm:flex items-center justify-center w-[30px] h-[30px]">
                  <span
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                      entry.current
                        ? 'bg-[var(--accent-purple)] border-[var(--accent-purple)]'
                        : 'bg-[var(--bg-base)] border-[var(--border-default)]'
                    }`}
                    style={entry.current ? { boxShadow: 'var(--glow-purple)' } : undefined}
                  />
                </div>

                {/* Company header */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                      {entry.role}
                    </h3>
                    {entry.current && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[rgba(167,139,250,0.12)] text-[var(--accent-purple)] border border-[rgba(167,139,250,0.3)]">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-sm mb-2.5" style={{ color: 'var(--accent-purple)' }}>
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
                  {entry.projects.map((project) => (
                    <ProjectAccordion
                      key={project.name}
                      {...project}
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
