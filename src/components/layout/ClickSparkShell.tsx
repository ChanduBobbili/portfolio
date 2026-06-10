'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'

import ClickSpark from '@/components/ClickSpark'

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

export function ClickSparkShell({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) return <>{children}</>

  const sparkColor = resolvedTheme === 'dark' ? '#e8f2ff' : '#13293d'

  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="flex min-h-full w-full flex-1 flex-col">{children}</div>
    </ClickSpark>
  )
}
