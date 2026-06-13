'use client'

import { motion } from 'framer-motion'

interface BorderBeamProps {
  /** Any valid CSS color or var() token */
  color?: string
  /** Full rotation duration in seconds */
  duration?: number
  /** border-radius of the host element in px (used for inner mask) */
  borderRadius?: number
  /** When true the beam is always visible; when false it only shows on group-hover */
  alwaysVisible?: boolean
  className?: string
}

/**
 * Rotating border-beam effect.
 * Place this as the *first* child of any `relative overflow-hidden` container.
 * Wrap all other card content in `<div className="relative z-10">`.
 */
export function BorderBeam({
  color = 'var(--primary)',
  duration = 4,
  borderRadius = 16,
  alwaysVisible = false,
  className = '',
}: BorderBeamProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        alwaysVisible ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
      } ${className}`}
      style={{ borderRadius }}
    >
      {/* Rotating conic gradient — the "beam" */}
      <motion.div
        className="absolute w-[200%] h-[200%]"
        style={{
          top: '-50%',
          left: '-50%',
          background: `conic-gradient(
            from 0deg at 50% 50%,
            transparent 330deg,
            color-mix(in srgb, ${color} 35%, transparent) 345deg,
            ${color} 358deg,
            color-mix(in srgb, ${color} 35%, transparent) 11deg,
            transparent 25deg
          )`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      />
      {/* Inner mask — covers the card interior, leaving only the 1 px border ring visible */}
      <div
        className="absolute inset-[1px] bg-[var(--card)]"
        style={{ borderRadius: Math.max(0, borderRadius - 1) }}
      />
    </div>
  )
}
