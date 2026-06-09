'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Star, Download } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { projects } from '@/data/portfolio'

const ACCENT_BAR: Record<string, string> = {
  green: '#34D399',
  cyan: '#22D3EE',
  purple: '#60A5FA',
}

export function Projects() {
  return (
    <section id="projects" className="section-odd relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-section-title text-text-primary mb-12"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const barColor = ACCENT_BAR[project.accent] ?? ACCENT_BAR.purple

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group glass-card overflow-hidden flex flex-col"
                style={{ borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)' }}
              >
                {/* Top accent bar */}
                <div
                  className="h-[3px] w-full transition-shadow duration-300 group-hover:shadow-[0_0_12px_var(--accent)]"
                  style={{ background: barColor }}
                />

                <div className="p-6 flex flex-col flex-1">
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider text-accent mb-3">
                    {project.tag}
                  </span>

                  <h3 className="font-display text-xl font-bold text-text-primary mb-1">
                    {project.title}
                  </h3>
                  <p className="font-mono-tech text-xs text-text-tertiary mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-sm text-text-secondary leading-[1.75] mb-5 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.stack.map((tech) => (
                      <span key={tech} className="tag-mono">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.stats && (
                    <div className="flex flex-wrap gap-4 mb-5 font-mono-tech text-xs text-text-secondary">
                      {project.stats.map((stat) => (
                        <span key={stat.label} className="flex items-center gap-1.5">
                          {stat.label.includes('star') ? (
                            <Star size={11} className="text-accent" />
                          ) : null}
                          {stat.label.includes('download') ? (
                            <Download size={11} className="text-accent" />
                          ) : null}
                          <strong className="text-text-primary">{stat.value}</strong> {stat.label}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 mt-auto pt-4 border-t border-border-muted">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost text-xs py-2 px-3"
                      >
                        <GithubIcon style={{ width: 13, height: 13 }} />
                        GitHub
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost text-xs py-2 px-3"
                      >
                        <ExternalLink size={13} />
                        Live Docs
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
