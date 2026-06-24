'use client'

import { useEventListener } from '@zenithui/utils'
import { useLenis } from 'lenis/react'
import { useCallback, useEffect, useState } from 'react'
import { parseSectionHash } from '@/lib/utils'

function getVisibleHeight(rect: DOMRect, viewportHeight: number): number {
  const visibleTop = Math.max(0, rect.top)
  const visibleBottom = Math.min(viewportHeight, rect.bottom)
  return Math.max(0, visibleBottom - visibleTop)
}

function getViewportDominantSection(sectionIds: string[]): string {
  const viewportHeight = window.innerHeight
  let bestId = sectionIds[0] ?? ''
  let bestArea = -1
  let bestIndex = -1

  sectionIds.forEach((id, index) => {
    const el = document.getElementById(id)
    if (!el) return

    const area = getVisibleHeight(el.getBoundingClientRect(), viewportHeight)
    if (area > bestArea || (area === bestArea && index > bestIndex)) {
      bestArea = area
      bestId = id
      bestIndex = index
    }
  })

  return bestId
}

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  const update = useCallback(() => {
    const hashSection = parseSectionHash(sectionIds)
    const next = hashSection ?? getViewportDominantSection(sectionIds)
    setActiveId((prev) => (prev === next ? prev : next))
  }, [sectionIds])

  useLenis(update)
  useEventListener('scroll', update, undefined, { passive: true })
  useEventListener('resize', update, undefined, { passive: true })

  useEffect(() => {
    const onHashChange = () => update()
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onHashChange)
    }
  }, [update])

  useEffect(() => {
    // Mount-only initial sync; update is stable when sectionIds is stable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return activeId
}
