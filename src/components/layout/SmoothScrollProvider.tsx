'use client'

import { useSyncExternalStore, useEffect, useRef } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import { cancelFrame, frame } from 'motion/react'
import 'lenis/dist/lenis.css'

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  )
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion()
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    if (reducedMotion) return

    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [reducedMotion])

  if (reducedMotion) {
    return <>{children}</>
  }

  return (
    <>
      <ReactLenis
        root
        ref={lenisRef}
        options={{
          autoRaf: false,
          lerp: 0.1,
          duration: 1.2,
          smoothWheel: true,
          anchors: true,
        }}
      />
      {children}
    </>
  )
}
