'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'

import type { ExperienceEntry, ExperienceProject } from '@/data/portfolio'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useDeviceType } from '@zenithui/utils'
import Image from 'next/image'

function EntryMeta({
  entry,
  className,
  showLocation,
}: {
  entry: ExperienceEntry
  className?: string
  showLocation?: boolean
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {entry.companyUrl && entry.companyLogo ? (
        <Link
          href={entry.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-sm font-bold text-primary hover:underline"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={entry.companyLogo}
            alt={entry.company}
            loading="lazy"
            className={cn(
              'w-28 h-10 object-contain',
              entry.company.includes('Apxor') && 'w-24 h-7'
            )}
          />
        </Link>
      ) : entry.companyLogo ? (
        <div className="flex items-center gap-2">
          <Image src={entry.companyLogo} alt={entry.company} width={24} height={24} />
          <p className="font-heading text-sm font-bold text-primary">{entry.company}</p>
        </div>
      ) : entry.companyUrl ? (
        <Link
          href={entry.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-sm font-bold text-primary hover:underline"
        >
          {entry.company}
        </Link>
      ) : (
        <p className="font-heading text-sm font-bold text-primary">{entry.company}</p>
      )}

      <div className="hidden md:flex md:flex-col md:gap-2">
        <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
          {entry.role}
        </h3>

        {showLocation && (
          <p className="font-sans text-sm text-muted-foreground">{entry.location}</p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground">
            {entry.period}
          </span>
        </div>
      </div>

      <div className="flex md:hidden justify-between items-center">
        <h3 className="font-heading text-xl font-bold text-primary leading-tight">{entry.role}</h3>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-[10px] px-2 py-1 rounded-full border border-border text-muted-foreground">
            {entry.period}
          </span>
        </div>
      </div>
    </div>
  )
}

function ProjectItem({
  project,
  defaultExpanded,
}: {
  project: ExperienceProject
  defaultExpanded: boolean
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setExpanded(defaultExpanded)
    }, 100)
    return () => clearTimeout(timeout)
  }, [defaultExpanded])

  return (
    <div>
      <h5 className="font-heading text-base md:text-lg font-bold text-foreground leading-tight">
        {project.name}
      </h5>
      <p className="font-sans text-sm text-foreground/70 font-medium leading-relaxed mb-3">
        {project.description}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="inline-flex items-center gap-1 font-sans text-xs text-primary hover:text-primary/80 transition-colors mb-2"
      >
        {expanded ? 'Hide details' : 'Show details'}
        <ChevronDown className={cn('size-3.5 transition-transform', expanded && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            {project.stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="font-sans rounded-sm text-xs px-2 py-1"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
            <ul className="flex flex-col gap-2">
              {project.bullets.map((bullet, bi) => (
                <li
                  key={bi}
                  className="flex gap-2.5 font-sans text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="text-primary shrink-0 mt-0.5">▸</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectList({ entry }: { entry: ExperienceEntry; isActiveEntry: boolean }) {
  return (
    <div className="flex flex-col gap-8">
      {entry.projects.map((project) => (
        <ProjectItem key={project.name} project={project} defaultExpanded={true} />
      ))}
    </div>
  )
}

function getStickyTriggerLine() {
  const navHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
  )
  const navPx = Number.isNaN(navHeight) ? 64 : navHeight * 24
  return navPx + 8 + 24 + 16
}

function getViewportOccupancy(el: HTMLElement): number {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  const visibleTop = Math.max(0, rect.top)
  const visibleBottom = Math.min(vh, rect.bottom)
  return Math.max(0, visibleBottom - visibleTop)
}

export function ExperienceStickyScroll({
  entries,
  className,
}: {
  entries: ExperienceEntry[]
  className?: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [dotPositions, setDotPositions] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])

  const deviceType = useDeviceType()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 20%', 'end 80%'],
  })

  const fillScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const updateDotPositions = useCallback(() => {
    const left = leftColumnRef.current
    const blocks = entryRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!left || blocks.length === 0) return

    const totalHeight = left.offsetHeight
    if (totalHeight === 0) return

    setDotPositions(
      blocks.map((el) => {
        const center = el.offsetTop + el.offsetHeight / 2
        return (center / totalHeight) * 100
      })
    )
  }, [])

  const updateActiveIndex = useCallback(() => {
    const blocks = entryRefs.current
    if (blocks.length === 0) return

    if (deviceType === 'desktop') {
      const triggerLine = getStickyTriggerLine()
      let newIndex = 0
      blocks.forEach((el, i) => {
        if (!el) return
        if (el.getBoundingClientRect().top <= triggerLine) newIndex = i
      })
      setActiveIndex(newIndex)
      return
    }

    let bestIndex = 0
    let bestOccupancy = -1
    blocks.forEach((el, i) => {
      if (!el) return
      const occupancy = getViewportOccupancy(el)
      if (occupancy >= bestOccupancy) {
        bestOccupancy = occupancy
        bestIndex = i
      }
    })
    setActiveIndex(bestIndex)
  }, [deviceType])

  useEffect(() => {
    entryRefs.current = entryRefs.current.slice(0, entries.length)

    const syncLayout = () => {
      updateActiveIndex()
      updateDotPositions()
    }

    const raf = requestAnimationFrame(syncLayout)

    const ro = new ResizeObserver(syncLayout)

    if (leftColumnRef.current) ro.observe(leftColumnRef.current)
    entryRefs.current.forEach((el) => {
      if (el) ro.observe(el)
    })

    window.addEventListener('scroll', updateActiveIndex, { passive: true })
    window.addEventListener('resize', updateDotPositions)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', updateActiveIndex)
      window.removeEventListener('resize', updateDotPositions)
    }
  }, [entries, deviceType, updateActiveIndex, updateDotPositions])

  const activeEntry = entries[activeIndex]

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-stretch">
        {/* Left: scrolling projects */}
        <div ref={leftColumnRef} className="min-w-0 flex-1">
          {entries.map((entry, index) => (
            <motion.div
              key={`${entry.company}-${entry.period}`}
              ref={(el) => {
                entryRefs.current[index] = el
              }}
              data-index={index}
              animate={{ opacity: activeIndex === index ? 1 : 0.35 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="py-4 lg:py-8 border-b border-border last:border-b-0"
            >
              <EntryMeta entry={entry} className="mb-4 lg:mb-8 lg:hidden" />
              <ProjectList entry={entry} isActiveEntry={activeIndex === index} />
            </motion.div>
          ))}
        </div>

        {/* Right: sticky company / role */}
        <div className="hidden w-[280px] shrink-0 lg:block">
          <div className="sticky top-[calc(var(--nav-height)+1.5rem)] rounded-xl border border-border bg-card p-6 backdrop-blur-sm">
            {activeEntry && (
              <motion.div
                key={`${activeEntry.company}-${activeEntry.period}`}
                initial={{ opacity: 0, filter: 'blur(2px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <EntryMeta entry={activeEntry} showLocation={true} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Far right: timeline */}
        <div className="relative hidden w-10 shrink-0 sm:block">
          <div
            className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2"
            style={{
              background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.18), transparent)',
            }}
          />
          <motion.div
            className="absolute left-1/2 top-4 w-px -translate-x-1/2 origin-top"
            style={{
              bottom: '1rem',
              scaleY: fillScaleY,
              background: 'linear-gradient(180deg, #38bdf8, #7dd3fc)',
            }}
          />
          {entries.map((entry, index) => {
            const topPercent =
              dotPositions[index] ??
              (entries.length === 1 ? 50 : ((index + 0.5) / entries.length) * 100)
            const isActive = activeIndex === index

            return (
              <div
                key={`${entry.company}-${entry.period}-dot`}
                className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ top: `${topPercent}%` }}
              >
                <span
                  className={cn(
                    'h-3.5 w-3.5 rounded-full border-2 transition-all duration-300',
                    entry.current && isActive && 'animate-pulse-dot',
                    isActive ? 'scale-110' : 'scale-90 opacity-60'
                  )}
                  style={{
                    background: isActive ? 'var(--primary)' : 'var(--background)',
                    borderColor: 'var(--primary)',
                    boxShadow: isActive
                      ? '0 0 0 4px color-mix(in srgb, var(--primary) 20%, transparent)'
                      : 'none',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
