'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

function useIsClient() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isClient = useIsClient()

  if (!isClient) {
    return <div className="w-[52px] h-7 rounded-full bg-[var(--bg-elevated)]" />
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-[52px] h-7 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] transition-colors duration-300"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span
        className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center transition-transform duration-300"
        style={{ transform: isDark ? 'translateX(22px)' : 'translateX(0)' }}
      >
        {isDark ? (
          <Moon size={12} className="text-primary-foreground" />
        ) : (
          <Sun size={12} className="text-primary-foreground" />
        )}
      </span>
    </button>
  )
}
