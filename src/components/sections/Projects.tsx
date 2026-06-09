'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Star, Download, Rocket } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { HudPanel } from '@/components/ui/HudPanel'
import { projects } from '@/data/portfolio'

const ACCENT_MAP: Record<string, { color: string; glow: string; bg: string; border: string }> = {
  green: {
    color: 'var(--accent-aurora)',
    glow: 'var(--glow-aurora)',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.28)',
  },
  cyan: {
    color: 'var(--accent-stellar)',
    glow: 'var(--glow-stellar)',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.28)',
  },
  purple: {
    color: 'var(--accent-nebula)',
    glow: 'var(--glow-nebula)',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.28)',
  },
}

const MISSION_STATUS = ['DEPLOYED', 'OPERATIONAL', 'ORBITAL', 'ACTIVE']

export function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          sector="Sector 02 — Deployed Missions"
          title="Mission archive"
          subtitle="Production systems launched into orbit — from CLI tools to distributed platforms."
        />

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => {
            const accent = ACCENT_MAP[project.accent] ?? ACCENT_MAP.cyan
            const status = MISSION_STATUS[i % MISSION_STATUS.length]
            const missionNum = String(i + 1).padStart(2, '0')

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <HudPanel
                  header={`Mission ${missionNum} — ${project.tag}`}
                  code={`MSN-${missionNum}`}
                  accent={project.accent === 'purple' ? 'nebula' : project.accent === 'green' ? 'aurora' : 'stellar'}
                  className="group transition-all duration-300 hover:neon-glow-stellar"
                >
                  <div className="p-5 sm:p-6 flex flex-col lg:flex-row gap-6">
                    {/* Mission number badge */}
                    <div className="shrink-0 flex lg:flex-col items-center gap-3 lg:gap-2">
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center border"
                        style={{
                          background: accent.bg,
                          borderColor: accent.border,
                          boxShadow: accent.glow,
                        }}
                      >
                        <Rocket
                          size={18}
                          style={{ color: accent.color, transform: 'rotate(-45deg)' }}
                        />
                        <span
                          className="text-[10px] font-mono font-bold mt-1 tabular-nums"
                          style={{ color: accent.color }}
                        >
                          #{missionNum}
                        </span>
                      </div>
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono border"
                        style={{
                          background: 'rgba(52,211,153,0.06)',
                          color: 'var(--accent-aurora)',
                          borderColor: 'rgba(52,211,153,0.2)',
                        }}
                      >
                        <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-aurora)' }} />
                        {status}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-1"
                        style={{ fontFamily: 'var(--font-space)' }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-[var(--text-tertiary)] mb-3">
                        {project.subtitle}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {project.stats && project.stats.length > 0 && (
                        <div className="flex flex-wrap gap-4 mb-4">
                          {project.stats.map((stat) => (
                            <div key={stat.label} className="flex items-center gap-1.5 font-mono text-xs">
                              {stat.label.includes('star') && <Star size={11} style={{ color: 'var(--accent-star)' }} />}
                              {stat.label.includes('download') && <Download size={11} style={{ color: accent.color }} />}
                              <span className="text-[var(--text-secondary)]">
                                <span className="font-semibold text-[var(--text-primary)]">{stat.value}</span>{' '}
                                {stat.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono border"
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

                      <div className="flex gap-4 pt-3 border-t" style={{ borderColor: 'var(--border-muted)' }}>
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition-colors"
                            style={{ color: accent.color }}
                          >
                            <ExternalLink size={12} />
                            Launch
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--accent-stellar)] transition-colors"
                          >
                            <GithubIcon style={{ width: 12, height: 12 }} />
                            Source
                          </a>
                        )}
                      </div>
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
