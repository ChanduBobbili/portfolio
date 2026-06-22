import { type RefObject } from 'react'
import { useReducedMotion, useScroll, useTransform } from 'framer-motion'

export const ZOOM_FROM = 0.88
export const ZOOM_TO = 1
export const EXIT_SCALE_TO = 0.94

export function useSectionZoomReveal(
  ref: RefObject<HTMLElement | null>,
  mode: 'enter' | 'exit' = 'enter'
) {
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset:
      mode === 'enter'
        ? (['start end', 'start 40%'] as ['start end', 'start 40%'])
        : (['start start', 'end start'] as ['start start', 'end start']),
  })

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    mode === 'enter'
      ? [reducedMotion ? ZOOM_TO : ZOOM_FROM, ZOOM_TO]
      : [ZOOM_TO, reducedMotion ? ZOOM_TO : EXIT_SCALE_TO]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    mode === 'enter' ? [reducedMotion ? 1 : 0, 1] : [1, reducedMotion ? 1 : 0]
  )

  return { scale, opacity }
}
