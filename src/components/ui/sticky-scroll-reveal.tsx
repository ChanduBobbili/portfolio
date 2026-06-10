'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

import type { ExperienceEntry } from '@/data/portfolio'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useDeviceType } from '@zenithui/utils'

function EntryMeta({ entry, className }: { entry: ExperienceEntry; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {entry.companyUrl ? (
        <Link
          href={entry.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-sm font-bold text-brand hover:underline"
        >
          {entry.company}
        </Link>
      ) : (
        <p className="font-heading text-sm font-bold text-brand">{entry.company}</p>
      )}

      <h3 className="font-heading text-xl font-bold text-foreground leading-tight">{entry.role}</h3>

      <p className="font-sans text-sm text-muted-foreground">{entry.location}</p>

      <div className="flex flex-wrap items-center gap-2">
        <span className="font-sans text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground">
          {entry.period}
        </span>
        {entry.current && (
          <span className="font-sans text-[10px] px-2 py-0.5 rounded-full text-brand border border-border">
            CURRENT
          </span>
        )}
      </div>
    </div>
  )
}

function ProjectList({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="flex flex-col gap-8">
      {entry.projects.map((project) => (
        <div key={project.name}>
          <p className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-brand mb-2">
            {`// ${project.name}`}
          </p>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3">
            {project.description}
          </p>
          {project.stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.stack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="font-sans rounded-sm text-[0.625rem] px-2 py-0.5"
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
                <span className="text-brand shrink-0 mt-0.5">▸</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function getStickyTriggerLine() {
  const navHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
  )
  const navPx = Number.isNaN(navHeight) ? 64 : navHeight * 16
  return navPx + 8 + 24
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
              <ProjectList entry={entry} />
            </motion.div>
          ))}
        </div>

        {/* Right: sticky company / role */}
        <div className="hidden w-[280px] shrink-0 lg:block">
          <div className="sticky top-[calc(var(--nav-height)+0.5rem)] rounded-xl border border-border bg-card/75 p-6 backdrop-blur-sm">
            {activeEntry && (
              <motion.div
                key={`${activeEntry.company}-${activeEntry.period}`}
                initial={{ opacity: 0, filter: 'blur(2px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <EntryMeta entry={activeEntry} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Far right: timeline */}
        <div className="relative hidden w-10 shrink-0 sm:block">
          <div
            className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2"
            style={{
              background: 'linear-gradient(180deg, var(--timeline-line), transparent)',
            }}
          />
          <motion.div
            className="absolute left-1/2 top-4 w-px -translate-x-1/2 origin-top"
            style={{
              bottom: '1rem',
              scaleY: fillScaleY,
              background: 'var(--timeline-fill)',
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
                    background: isActive ? 'var(--brand)' : 'var(--bg-base)',
                    borderColor: 'var(--brand)',
                    boxShadow: isActive
                      ? '0 0 0 4px color-mix(in srgb, var(--brand) 20%, transparent)'
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
