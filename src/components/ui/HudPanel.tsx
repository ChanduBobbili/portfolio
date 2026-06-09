import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Accent = 'stellar' | 'nebula' | 'aurora' | 'solar'

const ACCENT_COLOR: Record<Accent, string> = {
  stellar: 'var(--accent-stellar)',
  nebula: 'var(--accent-nebula)',
  aurora: 'var(--accent-aurora)',
  solar: 'var(--accent-solar)',
}

interface HudPanelProps {
  children: ReactNode
  className?: string
  accent?: Accent
  header?: string
  code?: string
  scanlines?: boolean
  glow?: boolean
}

export function HudPanel({
  children,
  className,
  accent = 'stellar',
  header,
  code,
  scanlines = false,
  glow = false,
}: HudPanelProps) {
  const color = ACCENT_COLOR[accent]

  return (
    <div
      className={cn(
        'relative rounded-xl border overflow-hidden',
        scanlines && 'scanlines',
        glow && 'neon-glow-stellar',
        className,
      )}
      style={{
        borderColor: `color-mix(in srgb, ${color} 28%, var(--border-default))`,
        background: 'color-mix(in srgb, var(--bg-surface) 88%, transparent)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* HUD corner brackets */}
      <span
        className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 pointer-events-none"
        style={{ borderColor: color }}
      />
      <span
        className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 pointer-events-none"
        style={{ borderColor: color }}
      />
      <span
        className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 pointer-events-none"
        style={{ borderColor: color }}
      />
      <span
        className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 pointer-events-none"
        style={{ borderColor: color }}
      />

      {/* Top accent beam */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, var(--accent-nebula), transparent)`,
        }}
      />

      {(header || code) && (
        <div
          className="flex items-center justify-between gap-3 px-4 py-2.5 border-b font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{
            borderColor: 'var(--border-muted)',
            background: 'color-mix(in srgb, var(--bg-elevated) 70%, transparent)',
            color: 'var(--text-tertiary)',
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
            />
            {header && <span className="truncate">{header}</span>}
          </div>
          {code && (
            <span style={{ color }} className="shrink-0 tabular-nums">
              {code}
            </span>
          )}
        </div>
      )}

      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
