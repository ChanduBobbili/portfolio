'use client'

import React, { useState } from 'react'

import { cn } from '@/lib/utils'

type GridVariant = 'dark' | 'light'

const GRID_PRESETS: Record<GridVariant, { border: string; stroke: string; hoveredFill: string }> = {
  dark: {
    border: 'border-gray-400/30',
    stroke: 'stroke-gray-400/30',
    hoveredFill: 'fill-gray-300/30',
  },
  light: {
    border: 'border-border/40',
    stroke: 'stroke-border/50',
    hoveredFill: 'fill-primary/12',
  },
}

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 *
 * @param width - The width of each square.
 * @param height - The height of each square.
 * @param squares - The number of squares in the grid. The first element is the number of horizontal squares, and the second element is the number of vertical squares.
 * @param variant - Surface preset for border, stroke, and hover fill colors.
 * @param className - The class name of the grid.
 * @param squaresClassName - The class name of the squares.
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  squares?: [number, number]
  variant?: GridVariant
  className?: string
  squaresClassName?: string
}

/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  variant = 'dark',
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)
  const preset = GRID_PRESETS[variant]

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn('absolute inset-0 h-full w-full border', preset.border, className)}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width
        const y = Math.floor(index / horizontal) * height
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              'transition-all duration-100 ease-in-out not-[&:hover]:duration-1000',
              preset.stroke,
              hoveredSquare === index ? preset.hoveredFill : 'fill-transparent',
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        )
      })}
    </svg>
  )
}
