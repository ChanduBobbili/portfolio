'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experience } from '@/data/portfolio'

function groupExperience() {
  const groups: { company: string; entries: typeof experience }[] = []
  for (const entry of experience) {
    const last = groups[groups.length - 1]
    if (last && last.company === entry.company) {
      last.entries.push(entry)
    } else {
      groups.push({ company: entry.company, entries: [entry] })
    }
  }
  return groups
}

export function WorkExperience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 30%'],
  })
  const fillScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const groups = groupExperience()

  return (
    <section id="work" className="section-odd relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* <SectionLabel>MISSION LOG</SectionLabel> */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-section-title text-text-primary mb-14"
        >
          Work Experience
        </motion.h2>

        <div ref={timelineRef} className="relative pl-8 sm:pl-10">
          {/* Background rail */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px hidden sm:block"
            style={{
              background: 'linear-gradient(180deg, var(--timeline-line), transparent)',
            }}
          />

          {/* Scroll fill rail */}
          <motion.div
            className="absolute left-[7px] top-2 hidden sm:block w-px origin-top"
            style={{
              bottom: '0.5rem',
              scaleY: fillScaleY,
              background: 'var(--timeline-fill)',
            }}
          />

          <div className="flex flex-col gap-10">
            {groups.map((group) =>
              group.entries.map((entry, ei) => {
                const isCurrent = entry.current
                const showCompanyHeader = ei === 0

                return (
                  <motion.article
                    key={`${entry.company}-${entry.period}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-8 sm:-left-10 top-6 flex items-center justify-center w-4 h-4">
                      <span
                        className={`w-3.5 h-3.5 rounded-full border-2 ${
                          isCurrent ? 'animate-pulse-dot' : ''
                        }`}
                        style={{
                          background: isCurrent ? 'var(--accent)' : 'var(--bg-base)',
                          borderColor: 'var(--accent)',
                          boxShadow: isCurrent
                            ? '0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent)'
                            : 'none',
                        }}
                      />
                    </div>

                    <div className="glass-card p-5 sm:p-6">
                      {showCompanyHeader && (
                        <p className="font-display text-sm font-bold text-accent mb-1">
                          {entry.company}
                        </p>
                      )}

                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                        <h3 className="font-display text-lg font-bold text-text-primary">
                          {entry.role}
                        </h3>
                        <span className="font-mono-tech text-[10px] px-2.5 py-1 rounded-full border border-border-muted text-text-tertiary">
                          {entry.period}
                        </span>
                        {isCurrent && (
                          <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded-full text-accent border border-border-accent">
                            CURRENT
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-5">
                        {entry.projects.map((project) => (
                          <div key={project.name}>
                            <p className="label-mission text-[11px] mb-2">{`// ${project.name}`}</p>
                            <p className="text-sm text-text-secondary leading-relaxed mb-3">
                              {project.description}
                            </p>
                            <ul className="flex flex-col gap-2">
                              {project.bullets.map((bullet, bi) => (
                                <li
                                  key={bi}
                                  className="flex gap-2.5 text-sm text-text-secondary leading-relaxed"
                                >
                                  <span className="text-accent shrink-0 mt-0.5">▸</span>
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                )
              })
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
