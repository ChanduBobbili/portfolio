'use client'

import { useCallback } from 'react'
import { useLenis } from 'lenis/react'

const SCROLL_OFFSET = -80

export function useLenisScrollTo() {
  const lenis = useLenis()

  return useCallback(
    (href: string) => {
      if (href === '#hero' || href === '#') {
        if (lenis) {
          lenis.scrollTo(0)
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        return
      }

      if (lenis) {
        lenis.scrollTo(href, { offset: SCROLL_OFFSET })
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [lenis]
  )
}
