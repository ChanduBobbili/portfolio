'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Star, Download } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { projects } from '@/data/portfolio'

const ACCENT_VARS: Record<string, { color: string; glow: string; tag: string }> = {
  green: {
    color: 'var(--accent-green)',
    glow: 'var(--glow-green)',
    tag: 'rgba(52,211,153,0.12)',
  },
  cyan: {
    color: 'var(--accent-cyan)',
    glow: 'var(--glow-cyan)',
    tag: 'rgba(34,211,238,0.12)',
  },
  purple: {
    color: 'var(--accent-purple)',
    glow: 'var(--glow-purple)',
    tag: 'rgba(167,139,250,0.12)',
  },
}

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="
                  group relative flex flex-col
                  bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-6
                  hover:border-[var(--border-neon)]
                  transition-all duration-300
                "
                style={{ '--hover-glow': accent.glow } as React.CSSProperties}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = accent.glow
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = ''
                }}
              >
                {/* Tag pill */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border"
                    style={{
                      backgroundColor: accent.tag,
                      color: accent.color,
                      borderColor: `color-mix(in srgb, ${accent.color} 30%, transparent)`,
                    }}
                  >
                    {project.tag}
                  </span>
                </div>

                {/* Title + subtitle */}
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[var(--text-tertiary)] mb-3">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Stats */}
                {project.stats && project.stats.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-4">
                    {project.stats.map((stat) => (
                      <div key={stat.label} className="flex items-center gap-1.5">
                        {stat.label.includes('star') ? (
                          <Star size={12} style={{ color: accent.color }} />
                        ) : stat.label.includes('download') ? (
                          <Download size={12} style={{ color: accent.color }} />
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
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="
                        px-2.5 py-1 rounded-md text-[11px] font-mono
                        bg-[var(--bg-elevated)] border border-[var(--border-default)]
                        text-[var(--text-secondary)]
                        hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)]
                        transition-colors duration-200 cursor-default
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-auto">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-purple)] transition-colors"
                    >
                      <ExternalLink size={13} />
                      Live
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-purple)] transition-colors"
                    >
                      <GithubIcon style={{ width: 13, height: 13 }} />
                      GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
