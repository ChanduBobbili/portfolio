'use client'

import { useCallback, useMemo } from 'react'
import { useLenis } from 'lenis/react'
import { useDeviceType } from '@zenithui/utils'

export function useLenisScrollTo() {
  const lenis = useLenis()
  const deviceType = useDeviceType()
  const SCROLL_OFFSET = useMemo(() => (deviceType === 'desktop' ? -80 : 0), [deviceType])

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
    [lenis, SCROLL_OFFSET]
  )
}
