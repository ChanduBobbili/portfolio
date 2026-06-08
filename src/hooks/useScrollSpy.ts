'use client'

import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 100): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      }
    }

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: `-${offset}px 0px -50% 0px`,
      threshold: 0,
    })

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    })

    observers.push(observer)

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [sectionIds, offset])

  return activeId
}
