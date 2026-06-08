'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true)
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)]" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="
        relative w-9 h-9 rounded-lg flex items-center justify-center
        border border-[var(--border-default)]
        bg-[var(--bg-surface)]
        hover:border-[var(--accent-purple)]
        hover:shadow-[var(--glow-purple)]
        transition-all duration-200
        cursor-pointer
      "
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={16} className="text-[var(--accent-purple)]" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={16} className="text-[var(--accent-purple)]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
