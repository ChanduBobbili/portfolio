'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ContributionCalendar, ContributionLevel } from '@/lib/github'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

const YEARS = [2026, 2025, 2024] as const
type Year = (typeof YEARS)[number]

const MIN_CELL_SIZE = 11
const CELL_GAP = 3
const DAY_LABEL_WIDTH = 28

const LEVEL_COLORS: Record<ContributionLevel, string> = {
  NONE: '#161b22',
  FIRST_QUARTILE: '#0e4429',
  SECOND_QUARTILE: '#006d32',
  THIRD_QUARTILE: '#26a641',
  FOURTH_QUARTILE: '#39d353',
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''] as const

const LEGEND_LEVELS: ContributionLevel[] = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
]

function formatContributionDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function getMonthLabels(weeks: ContributionCalendar['weeks']) {
  const labels: { month: string; column: number }[] = []
  let lastMonth = -1

  weeks.forEach((week, column) => {
    const firstDay = week.contributionDays[0]
    if (!firstDay) return

    const month = new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth()
    if (month !== lastMonth) {
      labels.push({ month: MONTHS[month], column })
      lastMonth = month
    }
  })

  return labels
}

function getDayRows(weeks: ContributionCalendar['weeks']) {
  return Array.from({ length: 7 }, (_, dayIndex) =>
    weeks.map((week) => week.contributionDays[dayIndex]).filter(Boolean)
  )
}

function computeCellSize(containerWidth: number, weekCount: number, isMobile: boolean): number {
  if (isMobile) return MIN_CELL_SIZE
  const available = containerWidth - DAY_LABEL_WIDTH - CELL_GAP
  const cellSize = Math.floor((available - (weekCount - 1) * CELL_GAP) / weekCount)
  return Math.max(MIN_CELL_SIZE, cellSize)
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isMobile
}

function useGridMetrics(
  containerRef: React.RefObject<HTMLDivElement | null>,
  weekCount: number,
  isMobile: boolean
) {
  const [cellSize, setCellSize] = useState(MIN_CELL_SIZE)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      setCellSize(computeCellSize(el.clientWidth, weekCount, isMobile))
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [containerRef, weekCount, isMobile])

  const columnWidth = cellSize + CELL_GAP
  return { cellSize, columnWidth }
}

function GridSkeleton({
  weekCount = 53,
  cellSize,
  isMobile,
}: {
  weekCount?: number
  cellSize: number
  isMobile: boolean
}) {
  const gridWidth = weekCount * (cellSize + CELL_GAP) - CELL_GAP

  const gridContent = (
    <div className="flex gap-1">
      <div className="flex w-7 shrink-0 flex-col gap-[3px]">
        {DAY_LABELS.map((_, i) => (
          <div key={i} style={{ height: cellSize }} />
        ))}
      </div>
      <div className="flex flex-col gap-[3px]" style={{ width: isMobile ? gridWidth : '100%' }}>
        {Array.from({ length: 7 }).map((_, row) => (
          <div
            key={row}
            className="flex gap-[3px]"
            style={{ width: isMobile ? gridWidth : '100%' }}
          >
            {Array.from({ length: weekCount }).map((_, col) => (
              <div
                key={col}
                className={cn(
                  'shrink-0 rounded-[2px] bg-muted-foreground/10',
                  !isMobile && 'flex-1'
                )}
                style={{
                  width: isMobile ? cellSize : undefined,
                  height: cellSize,
                  minWidth: isMobile ? cellSize : MIN_CELL_SIZE,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="animate-pulse" aria-hidden>
      <div
        className="mb-2 h-3 rounded bg-muted-foreground/10"
        style={{
          width: isMobile ? Math.min(gridWidth + DAY_LABEL_WIDTH, 280) : '100%',
          maxWidth: isMobile ? undefined : 280,
        }}
      />
      {isMobile ? (
        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          {gridContent}
        </div>
      ) : (
        gridContent
      )}
    </div>
  )
}

function ContributionGrid({
  calendar,
  cellSize,
  columnWidth,
  isMobile,
}: {
  calendar: ContributionCalendar
  cellSize: number
  columnWidth: number
  isMobile: boolean
}) {
  const monthLabels = useMemo(() => getMonthLabels(calendar.weeks), [calendar.weeks])
  const dayRows = useMemo(() => getDayRows(calendar.weeks), [calendar.weeks])
  const weekCount = calendar.weeks.length
  const gridWidth = weekCount * columnWidth - CELL_GAP

  const monthRow = (
    <div className="relative mb-1 ml-7 h-4" style={{ width: isMobile ? gridWidth : '100%' }}>
      {monthLabels.map(({ month, column }) => (
        <span
          key={`${month}-${column}`}
          className="absolute text-[10px] leading-none text-muted-foreground"
          style={{ left: column * columnWidth }}
        >
          {month}
        </span>
      ))}
    </div>
  )

  const gridBody = (
    <div className="flex gap-1">
      <div className="flex w-7 shrink-0 flex-col gap-[3px]">
        {DAY_LABELS.map((label, i) => (
          <div
            key={i}
            className="flex items-center text-[10px] leading-none text-muted-foreground"
            style={{ height: cellSize }}
          >
            {label}
          </div>
        ))}
      </div>

      <div
        className={cn('flex flex-col gap-[3px]', !isMobile && 'min-w-0 flex-1')}
        style={{ width: isMobile ? gridWidth : undefined }}
      >
        {dayRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-[3px]"
            style={{ width: isMobile ? gridWidth : '100%' }}
          >
            {row.map((day) => (
              <div
                key={day.date}
                title={`${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'} on ${formatContributionDate(day.date)}`}
                className={cn('shrink-0 rounded-[2px]', !isMobile && 'flex-1')}
                style={{
                  width: isMobile ? cellSize : undefined,
                  height: cellSize,
                  minWidth: isMobile ? cellSize : MIN_CELL_SIZE,
                  backgroundColor: LEVEL_COLORS[day.contributionLevel],
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div>
      {isMobile ? (
        <div className="overflow-x-auto min-w-0" style={{ WebkitOverflowScrolling: 'touch' }}>
          {monthRow}
          <div
            role="img"
            aria-label={`${calendar.totalContributions.toLocaleString()} GitHub contributions`}
          >
            {gridBody}
          </div>
        </div>
      ) : (
        <>
          {monthRow}
          <div
            role="img"
            aria-label={`${calendar.totalContributions.toLocaleString()} GitHub contributions`}
          >
            {gridBody}
          </div>
        </>
      )}
    </div>
  )
}

function HeatmapFooter() {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
        <span>Less</span>
        {LEGEND_LEVELS.map((level) => (
          <div
            key={level}
            className="size-[11px] rounded-[2px]"
            style={{ backgroundColor: LEVEL_COLORS[level] }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}

function YearSidebar({
  selectedYear,
  onSelectYear,
}: {
  selectedYear: Year
  onSelectYear: (year: Year) => void
}) {
  return (
    <motion.div className="hidden shrink-0 flex-col items-end justify-center gap-1 md:flex">
      {YEARS.map((year) => (
        <motion.button
          key={year}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          type="button"
          onClick={() => onSelectYear(year)}
          className={cn(
            'cursor-pointer rounded-md px-3 py-1 text-xs font-medium transition-colors',
            selectedYear === year
              ? 'bg-primary text-background'
              : 'text-muted-foreground hover:text-primary hover:bg-accent'
          )}
        >
          {year}
        </motion.button>
      ))}
    </motion.div>
  )
}

function YearSelect({
  selectedYear,
  onSelectYear,
}: {
  selectedYear: Year
  onSelectYear: (year: Year) => void
}) {
  return (
    <div className="md:hidden">
      <Select
        value={String(selectedYear)}
        onValueChange={(value) => onSelectYear(Number(value) as Year)}
      >
        <SelectTrigger
          className="border-background/10 rounded-sm"
          aria-label={`Year: ${selectedYear}`}
        >
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {YEARS.map((year) => (
            <SelectItem key={year} value={String(year)}>
              Year: {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function GithubHeatmap({ className }: { className?: string }) {
  const [selectedYear, setSelectedYear] = useState<Year>(2025)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const weekCount = calendar?.weeks.length ?? 53
  const { cellSize, columnWidth } = useGridMetrics(gridContainerRef, weekCount, isMobile)

  useEffect(() => {
    let cancelled = false
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus('loading')

    async function load() {
      try {
        const res = await fetch(`/api/github-activity?year=${selectedYear}`)
        if (!res.ok) {
          if (!cancelled) setStatus('error')
          return
        }
        const data = (await res.json()) as ContributionCalendar
        if (!cancelled) {
          setCalendar(data)
          setStatus('success')
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [selectedYear])

  if (status === 'error' && !calendar) {
    return (
      <div className={cn('rounded-md border border-border bg-background p-4', className)}>
        <p className="text-xs text-muted-foreground">Activity data unavailable</p>
      </div>
    )
  }

  const contributionLabel =
    status === 'success' && calendar
      ? `${calendar.totalContributions.toLocaleString()} GitHub contributions in ${selectedYear}`
      : `Loading contributions for ${selectedYear}...`

  return (
    <div className={cn('rounded-md border border-border bg-foreground p-4 font-sans', className)}>
      <p className="mb-3 text-sm text-background">{contributionLabel}</p>

      <div className="flex min-w-0 gap-3">
        <div ref={gridContainerRef} className="min-w-0 flex-1">
          <div className="rounded-md border border-border p-3 md:border-0 md:p-0">
            {status === 'loading' ? (
              <GridSkeleton weekCount={weekCount} cellSize={cellSize} isMobile={isMobile} />
            ) : status === 'error' ? (
              <p className="text-xs text-muted-foreground">Activity data unavailable</p>
            ) : calendar ? (
              <ContributionGrid
                calendar={calendar}
                cellSize={cellSize}
                columnWidth={columnWidth}
                isMobile={isMobile}
              />
            ) : null}
            <HeatmapFooter />
          </div>

          <div className="mt-3 flex items-center justify-between md:hidden">
            <YearSelect selectedYear={selectedYear} onSelectYear={setSelectedYear} />
          </div>
        </div>

        <YearSidebar selectedYear={selectedYear} onSelectYear={setSelectedYear} />
      </div>
    </div>
  )
}
