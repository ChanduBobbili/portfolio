'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, MapPin, Calendar, Satellite } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { HudPanel } from '@/components/ui/HudPanel'
import { experience } from '@/data/portfolio'

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

function MissionAccordion({
  name, description, stack, bullets, accent, defaultOpen = true,
}: {
  name: string; description: string; stack: string[];
  bullets: string[]; accent: string; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen)
  const a = ACCENT_MAP[accent] ?? ACCENT_MAP.cyan
  const hudAccent = accent === 'purple' ? 'nebula' : accent === 'green' ? 'aurora' : 'stellar'

  return (
    <HudPanel accent={hudAccent} className="overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left cursor-pointer transition-colors duration-150"
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'color-mix(in srgb, var(--bg-elevated) 50%, transparent)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="shrink-0 w-2 h-2 rounded-full"
            style={{
              backgroundColor: open ? a.color : 'var(--border-bright)',
              boxShadow: open ? a.glow : 'none',
            }}
          />
          <span className="flex items-center gap-1.5 text-sm font-mono font-semibold text-[var(--text-primary)] truncate">
            <Satellite size={12} style={{ color: a.color, flexShrink: 0 }} />
            {name}
          </span>
        </div>
        <span
          className="shrink-0 ml-2 text-[var(--text-tertiary)] transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
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
            <div className="px-4 pb-4 border-t" style={{ borderColor: 'var(--border-muted)' }}>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 mt-3 font-mono">
                {description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono border"
                    style={{
                      background: 'var(--bg-elevated)',
                      borderColor: 'var(--border-muted)',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="flex flex-col gap-2">
                {bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="mt-2 shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: a.color }} />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </HudPanel>
  )
}

export function WorkExperience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 20%'],
  })
  const fillScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="work" className="py-24 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          sector="Sector 03 — Career Trajectory"
          title="Flight path"
          subtitle="Orbital stations visited — each waypoint a mission with measurable impact."
        />

        <div ref={timelineRef} className="relative">
          <div
            className="absolute left-[15px] top-4 bottom-4 w-px hidden sm:block"
            style={{ background: 'var(--border-default)' }}
          />
          <motion.div
            className="absolute left-[15px] hidden sm:block w-px origin-top"
            style={{
              top: '1rem',
              bottom: '1rem',
              scaleY: fillScaleY,
              background: 'linear-gradient(180deg, var(--accent-stellar), var(--accent-nebula))',
              boxShadow: '0 0 12px rgba(34,211,238,0.5)',
            }}
          />

          <div className="flex flex-col gap-16">
            {experience.map((entry, ei) => (
              <motion.div
                key={`${entry.company}-${entry.period}`}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: ei * 0.1 }}
                className="relative sm:pl-14"
              >
                <div className="absolute left-0 top-3 hidden sm:flex items-center justify-center w-[30px] h-[30px]">
                  {entry.current ? (
                    <div className="relative">
                      <div
                        className="absolute inset-0 rounded-full animate-pulse-ring"
                        style={{ background: 'rgba(34,211,238,0.15)', transform: 'scale(2.5)' }}
                      />
                      <div
                        className="w-4 h-4 rounded-full relative z-10"
                        style={{
                          background: 'linear-gradient(135deg, var(--accent-stellar), var(--accent-nebula))',
                          boxShadow: 'var(--glow-stellar)',
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-3 h-3 rounded-full border-2"
                      style={{
                        backgroundColor: 'var(--bg-base)',
                        borderColor: 'var(--accent-nebula)',
                      }}
                    />
                  )}
                </div>

                <HudPanel
                  header={entry.company}
                  code={entry.current ? 'STATION-ACTIVE' : `WAYPOINT-${ei + 1}`}
                  accent={entry.current ? 'stellar' : 'nebula'}
                  glow={entry.current}
                >
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                      <h3
                        className="text-lg font-bold text-[var(--text-primary)]"
                        style={{ fontFamily: 'var(--font-space)' }}
                      >
                        {entry.role}
                      </h3>
                      {entry.current && (
                        <span
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono border"
                          style={{
                            background: 'rgba(34,211,238,0.08)',
                            color: 'var(--accent-stellar)',
                            borderColor: 'rgba(34,211,238,0.3)',
                          }}
                        >
                          <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-stellar)' }} />
                          LIVE
                        </span>
                      )}
                    </div>

                    {entry.companyUrl ? (
                      <a
                        href={entry.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono hover:opacity-80"
                        style={{ color: 'var(--accent-stellar)' }}
                      >
                        {entry.company}
                      </a>
                    ) : (
                      <p className="text-sm font-mono" style={{ color: 'var(--accent-stellar)' }}>
                        {entry.company}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-4 text-[10px] font-mono mt-2 text-[var(--text-dim)] uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={10} />
                        {entry.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={10} />
                        {entry.location}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 mt-5">
                      {entry.projects.map((project, pi) => (
                        <MissionAccordion
                          key={project.name}
                          {...project}
                          defaultOpen={pi === 0}
                        />
                      ))}
                    </div>
                  </div>
                </HudPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
