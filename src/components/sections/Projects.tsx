'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { projects } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { SectionZoomReveal } from '@/components/layout/SectionZoomReveal'
import { VariableProximity } from '../ui/variable-proximity'

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
      <div className="p-2 md:p-4 flex flex-col flex-1 gap-0">
        <h3 className="font-heading text-2xl xl:text-3xl font-bold text-foreground mb-1 leading-tight">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="font-sans text-xs lg:text-sm text-muted-foreground mb-4">
            {project.subtitle}
          </p>
        )}

        <p className="font-sans text-sm lg:text-base text-muted-foreground leading-[1.85] mb-2 md:mb-6 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3 md:mb-6">
          {project.stack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="font-sans rounded-md text-xs lg:text-sm md:py-3.5 md:px-4 py-3.5 px-4"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {project.stats && (
          <div className="flex gap-1 md:gap-2 mb-2">
            {project.stats.map((stat) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={stat.label}
                alt={stat.label}
                src={stat.value}
                className="h-5 w-fit object-contain"
                width={100}
                height={100}
              />
            ))}
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-border mt-auto">
          {project.links.github && (
            <Button variant="outline" size="lg" asChild>
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon style={{ width: 13, height: 13 }} />
                GitHub
              </a>
            </Button>
          )}
          {project.links.live && (
            <Button variant="outline" size="lg" asChild>
              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={13} />
                Live Docs
              </a>
            </Button>
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
      <div className="flex flex-col gap-1 sticky top-28">
        {projects.map((project, i) => {
          const barColor = ACCENT_BAR[project.accent] ?? ACCENT_BAR.purple
          const isActive = active === i

          return (
            <motion.button
              key={project.title}
              onHoverStart={() => setActive(i)}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.5, ease: 'easeInOut' }}
              className="group relative text-left rounded-xl px-5 py-4 outline-none overflow-hidden cursor-pointer"
            >
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

              {isActive && (
                <motion.span
                  layoutId="desktop-active-bar"
                  className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full z-10"
                  style={{ background: barColor }}
                  transition={{ type: 'spring', stiffness: 400, damping: 38 }}
                />
              )}

              <div className="relative z-10 pl-1">
                <h5
                  className={cn('font-heading text-lg font-medium transition-colors duration-200', {
                    'text-foreground': isActive,
                    'text-muted-foreground group-hover:text-foreground': !isActive,
                  })}
                >
                  {project.title}
                </h5>
                <p className="font-sans text-sm text-muted-foreground leading-snug line-clamp-1 mt-1">
                  {project.subtitle ?? project.tag}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="min-h-[420px]">
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
      <div className="relative grid grid-cols-2 gap-1 p-1 rounded-xl bg-[color-mix(in_srgb,var(--primary)_6%,transparent)] overflow-x-auto scrollbar-none">
        {projects.map((project, i) => {
          // const barColor = ACCENT_BAR[project.accent] ?? ACCENT_BAR.purple
          const isActive = active === i
          return (
            <motion.button
              key={project.title}
              onClick={() => setActive(i)}
              className="relative w-full z-10 shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-150 outline-none"
              style={{
                color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
              }}
              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-lg z-[-1] bg-muted-foreground/50"
                  // style={{ background: `color-mix(in srgb, ${barColor} 10%, transparent)` }}
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
              {project.title}
            </motion.button>
          )
        })}
      </div>

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

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <SectionZoomReveal
      id="projects"
      data-bg="dark"
      className="section-odd relative overflow-hidden py-6 md:py-12"
      contentClassName="max-w-7xl mx-auto px-4"
      background={
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={cn(
              'absolute inset-0 bg-size-[40px_40px]',
              'bg-[linear-gradient(to_right,rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.08)_1px,transparent_1px)]'
            )}
          />
          <div className="absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
      }
    >
      <h2 className="font-heading md:text-base text-sm font-bold tracking-normal text-primary">
        <VariableProximity
          label="Open Source Contributions"
          containerRef={containerRef}
          fromFontVariationSettings="'wght' 400, 'wdth' 100"
          toFontVariationSettings="'wght' 900, 'wdth' 125"
          radius={120}
          falloff="gaussian"
        />
      </h2>

      <SectionTitle className="mb-2 md:mb-6">Tools I put in the world</SectionTitle>

      <ProjectsDesktop />
      <ProjectsMobile />
    </SectionZoomReveal>
  )
}
