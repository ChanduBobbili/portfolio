'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Star, Download } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { projects } from '@/data/portfolio'

const ACCENT_VARS: Record<string, { color: string; glow: string; tag: string; gradient: string }> = {
  green: {
    color:    'var(--accent-green)',
    glow:     'var(--glow-green)',
    tag:      'rgba(52,211,153,0.12)',
    gradient: 'linear-gradient(90deg, rgba(52,211,153,0.8), rgba(52,211,153,0.25), transparent)',
  },
  cyan: {
    color:    'var(--accent-cyan)',
    glow:     'var(--glow-cyan)',
    tag:      'rgba(34,211,238,0.12)',
    gradient: 'linear-gradient(90deg, rgba(34,211,238,0.8), rgba(34,211,238,0.25), transparent)',
  },
  purple: {
    color:    'var(--accent-purple)',
    glow:     'var(--glow-purple)',
    tag:      'rgba(167,139,250,0.12)',
    gradient: 'linear-gradient(90deg, rgba(167,139,250,0.8), rgba(167,139,250,0.25), transparent)',
  },
}

export function Projects() {
  return (
    <section id="projects" className="py-24 section-alt relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-[0.03] dark:opacity-[0.05] blur-[80px]"
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
          Projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-12"
        >
          Things I&apos;ve built
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const accent = ACCENT_VARS[project.accent] ?? ACCENT_VARS.purple

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.0, 0.0, 0.2, 1] }}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col border border-[var(--border-default)] rounded-2xl overflow-hidden card-base transition-all duration-300"
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = accent.glow
                  ;(e.currentTarget as HTMLDivElement).style.borderColor = `color-mix(in srgb, ${accent.color} 50%, transparent)`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = ''
                  ;(e.currentTarget as HTMLDivElement).style.borderColor = ''
                }}
              >
                {/* Border beam — shown on hover via group-hover in BorderBeam */}
                <BorderBeam color={accent.color} duration={3.5} borderRadius={16} />

                {/* All card content must be z-10 to sit above the beam layer */}
                <div className="relative z-10 flex flex-col flex-1 p-6 bg-[var(--bg-surface)]">
                  {/* Gradient top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1.5px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: accent.gradient }}
                  />

                  {/* Inner glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top left, ${accent.tag} 0%, transparent 60%)` }}
                  />

                  {/* Tag + index */}
                  <div className="relative flex items-center justify-between mb-5">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-mono font-medium border"
                      style={{
                        backgroundColor: accent.tag,
                        color: accent.color,
                        borderColor: `color-mix(in srgb, ${accent.color} 30%, transparent)`,
                      }}
                    >
                      {project.tag}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-tertiary)]">0{i + 1}</span>
                  </div>

                  {/* Title + subtitle */}
                  <h3 className="relative text-xl font-semibold text-[var(--text-primary)] mb-1">
                    {project.title}
                  </h3>
                  <p className="relative text-xs font-mono text-[var(--text-tertiary)] mb-3">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="relative text-sm text-[var(--text-secondary)] leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Stats */}
                  {project.stats && project.stats.length > 0 && (
                    <div className="relative flex flex-wrap gap-4 mb-5">
                      {project.stats.map((stat) => (
                        <div key={stat.label} className="flex items-center gap-1.5">
                          {stat.label.includes('star') ? (
                            <Star size={11} style={{ color: accent.color }} />
                          ) : stat.label.includes('download') ? (
                            <Download size={11} style={{ color: accent.color }} />
                          ) : null}
                          <span className="text-xs text-[var(--text-secondary)]">
                            <span className="font-semibold text-[var(--text-primary)]">{stat.value}</span>{' '}
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stack chips */}
                  <div className="relative flex flex-wrap gap-2 mb-5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)] transition-colors duration-200 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="relative flex gap-4 mt-auto pt-4 border-t border-[var(--border-muted)]">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-purple)] transition-colors font-medium"
                      >
                        <ExternalLink size={12} />
                        Live
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-purple)] transition-colors font-medium"
                      >
                        <GithubIcon style={{ width: 12, height: 12 }} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
