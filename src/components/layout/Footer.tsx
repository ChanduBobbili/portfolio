'use client'

import { ArrowUp } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-[var(--text-tertiary)]">
          © 2025 Bobbili Vijaya Chandu · Built with Next.js &amp; Tailwind
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 text-sm text-[var(--accent-purple)] hover:underline transition-all cursor-pointer"
        >
          <ArrowUp size={14} />
          Back to top
        </button>
      </div>
    </footer>
  )
}
