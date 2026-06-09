'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star, Download } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { projects } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'

const ACCENT_BAR: Record<string, string> = {
  green: '#34D399',
  cyan: '#22D3EE',
  purple: '#60A5FA',
}

function ProjectDetail({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(4px)' }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden flex flex-col h-full"
    >
      <div className="p-2 flex flex-col flex-1">
        {/* title */}
        <h3 className="font-display text-2xl font-bold text-text-primary mb-1 leading-tight">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="font-mono-tech text-xs text-text-tertiary mb-4">{project.subtitle}</p>
        )}

        {/* description */}
        <p className="text-sm text-text-secondary leading-[1.85] mb-6 flex-1">
          {project.description}
        </p>

        {/* stack pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span key={tech} className="tag-mono">
              {tech}
            </span>
          ))}
        </div>

        {/* stats */}
        {project.stats && (
          <div className="flex flex-wrap gap-5 mb-6 font-mono-tech text-xs text-text-secondary">
            {project.stats.map((stat) => (
              <span key={stat.label} className="flex items-center gap-1.5">
                {stat.label.includes('star') && <Star size={11} className="text-accent" />}
                {stat.label.includes('download') && <Download size={11} className="text-accent" />}
                <strong className="text-text-primary">{stat.value}</strong>
                &nbsp;{stat.label}
              </span>
            ))}
          </div>
        )}

        {/* links */}
        <div className="flex gap-3 pt-5 border-t border-border-muted mt-auto">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs py-2 px-4 inline-flex items-center gap-2"
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
              className="btn-ghost text-xs py-2 px-4 inline-flex items-center gap-2"
            >
              <ExternalLink size={13} />
              Live Docs
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectsDesktop() {
  const [active, setActive] = useState(0)

  return (
    <div className="hidden md:grid grid-cols-[1fr_1.6fr] gap-6 items-start">
      {/* ── Left: project list ── */}
      <div className="flex flex-col gap-1 sticky top-28">
        {projects.map((project, i) => {
          const barColor = ACCENT_BAR[project.accent] ?? ACCENT_BAR.purple
          const isActive = active === i

          return (
            <motion.button
              key={project.title}
              onHoverStart={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group relative text-left rounded-xl px-5 py-4 outline-none overflow-hidden"
              style={{ cursor: 'default' }}
            >
              {/* sliding highlight — same layoutId pattern as mobile pill */}
              {isActive && (
                <motion.span
                  layoutId="desktop-active-bg"
                  className="absolute inset-0 rounded-xl z-0"
                  style={{
                    background: `color-mix(in srgb, ${barColor} 10%, transparent)`,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: `color-mix(in srgb, ${barColor} 28%, transparent)`,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 38 }}
                />
              )}

              {/* left accent bar — slides with the background */}
              {isActive && (
                <motion.span
                  layoutId="desktop-active-bar"
                  className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full z-10"
                  style={{ background: barColor }}
                  transition={{ type: 'spring', stiffness: 400, damping: 38 }}
                />
              )}

              <div className="relative z-10 pl-1">
                <span
                  className={`font-display text-[15px] font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-text-primary'
                      : 'text-text-secondary group-hover:text-text-primary'
                  }`}
                >
                  {project.title}
                </span>
                <p className="font-mono-tech text-[11px] text-text-tertiary leading-snug line-clamp-1 mt-0.5">
                  {project.subtitle ?? project.tag}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* ── Right: detail panel ── */}
      <div className="min-h-[460px]">
        <AnimatePresence mode="wait">
          <ProjectDetail key={active} project={projects[active]} />
        </AnimatePresence>
      </div>
    </div>
  )
}

function ProjectsMobile() {
  const [active, setActive] = useState(0)

  return (
    <div className="md:hidden flex flex-col gap-2">
      {/* Tab strip */}
      <div className="relative grid grid-cols-2 gap-1 p-1 rounded-xl bg-[color-mix(in_srgb,var(--accent)_6%,transparent)] overflow-x-auto scrollbar-none">
        {projects.map((project, i) => {
          const barColor = ACCENT_BAR[project.accent] ?? ACCENT_BAR.purple
          const isActive = active === i
          return (
            <motion.button
              key={project.title}
              onClick={() => setActive(i)}
              className="relative w-full z-10 shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-150 outline-none"
              style={{
                color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
              }}
              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-lg z-[-1] bg-accent-strong"
                  style={{ background: `color-mix(in srgb, ${barColor} 10%, transparent)` }}
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
              {project.title}
            </motion.button>
          )
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        >
          <ProjectDetail project={projects[active]} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Section export ────────────────────────────────────────────────────────────

export function Projects() {
  return (
    <section id="projects" className="section-odd relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle className="mb-6 md:mb-12">Open Source Contributions</SectionTitle>
        <ProjectsDesktop />
        <ProjectsMobile />
      </div>
    </section>
  )
}
