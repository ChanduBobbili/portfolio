'use client'

import { useEventListener } from '@zenithui/utils'
import { useCallback, useState } from 'react'

export interface NavVisibility {
  heroLeft: boolean
  isOnLightBg: boolean
}

export type UseNavVisibilityOptions = {
  navElementId: string
  anchor?: 'top' | 'bottom'
  heroOffset?: number
  bandTop?: number
  bandBottom?: number
}

export function useNavVisibility({
  navElementId,
  anchor = 'top',
  heroOffset = 80,
  bandTop = 16,
  bandBottom = 80,
}: UseNavVisibilityOptions): NavVisibility {
  const [state, setState] = useState<NavVisibility>({
    heroLeft: false,
    isOnLightBg: false,
  })

  const update = useCallback(() => {
    const nav = document.getElementById(navElementId)
    const navRect =
      nav?.getBoundingClientRect() ??
      (anchor === 'top'
        ? { top: bandTop, bottom: bandBottom }
        : {
            top: window.innerHeight - bandBottom,
            bottom: window.innerHeight - bandTop,
          })

    const about = document.getElementById('about')
    const heroLeft = about ? about.getBoundingClientRect().top <= heroOffset : false

    const sections = document.querySelectorAll<HTMLElement>('[data-bg]')
    let isOnLightBg = false
    for (const section of sections) {
      const rect = section.getBoundingClientRect()
      const overlapsNav = rect.bottom >= navRect.top && rect.top <= navRect.bottom
      if (overlapsNav) {
        isOnLightBg = (section.dataset.bg as string) === 'light'
        break
      }
    }

    setState({ heroLeft, isOnLightBg })
  }, [navElementId, anchor, bandTop, bandBottom, heroOffset])

  useEventListener('scroll', update, undefined, { passive: true })
  useEventListener('resize', update, undefined, { passive: true })

  return state
}
