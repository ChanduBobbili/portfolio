'use client'

import { forwardRef, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSectionZoomReveal } from '@/hooks/useSectionZoomReveal'
import { cn } from '@/lib/utils'

type SectionZoomRevealProps = React.ComponentPropsWithoutRef<'section'> & {
  mode?: 'enter' | 'exit'
  background?: React.ReactNode
  contentClassName?: string
  disableZoom?: boolean
}

export const SectionZoomReveal = forwardRef<HTMLElement, SectionZoomRevealProps>(
  function SectionZoomReveal(
    { mode = 'enter', background, children, className, contentClassName, disableZoom, ...props },
    ref
  ) {
    const internalRef = useRef<HTMLElement>(null)
    const setSectionRef = useCallback(
      (node: HTMLElement | null) => {
        internalRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref]
    )
    const { scale, opacity } = useSectionZoomReveal(internalRef, mode)

    return (
      <section ref={setSectionRef} className={className} {...props}>
        {background}
        <motion.div
          style={{
            scale: disableZoom ? 1 : scale,
            opacity: disableZoom ? 1 : opacity,
            transformOrigin: 'center top',
          }}
          className={cn('relative z-10', contentClassName)}
        >
          {children}
        </motion.div>
      </section>
    )
  }
)
