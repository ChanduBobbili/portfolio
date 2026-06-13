'use client'

import { useEffect, useState } from 'react'

export function useAdaptiveNavbar({
  headerTop = 16,
  headerBottom = 80,
}: {
  headerTop?: number
  headerBottom?: number
} = {}) {
  const [isOnLightBg, setIsOnLightBg] = useState(false)

  useEffect(() => {
    const detect = () => {
      const sections = document.querySelectorAll<HTMLElement>('[data-bg]')
      let bg: 'light' | 'dark' = 'dark'

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.bottom >= headerTop && rect.top <= headerBottom) {
          bg = (section.dataset.bg as 'light' | 'dark') ?? 'dark'
          break
        }
      }

      setIsOnLightBg(bg === 'light')
    }

    const onScroll = () => requestAnimationFrame(detect)
    const onResize = () => requestAnimationFrame(detect)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    detect()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [headerTop, headerBottom])

  return { isOnLightBg }
}
