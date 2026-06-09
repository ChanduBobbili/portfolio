'use client'

import { Rocket, ArrowUp, Satellite } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative border-t overflow-hidden glass-panel" style={{ borderColor: 'var(--border-neon)' }}>
      <div className="sector-divider absolute top-0 left-0 right-0" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, var(--accent-stellar), var(--accent-nebula))',
                boxShadow: 'var(--glow-stellar)',
              }}
            >
              <Rocket size={14} className="text-white" style={{ transform: 'rotate(-45deg)' }} />
            </div>
            <div>
              <p
                className="text-sm font-bold"
                style={{ fontFamily: 'var(--font-space)' }}
              >
                CB.MISSION
              </p>
              <p className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-widest">
                © 2025 Bobbili Vijaya Chandu · Next.js orbital craft
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider">
            <Satellite size={10} style={{ color: 'var(--accent-aurora)' }} className="animate-pulse" />
            <span>Signal stable</span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border transition-all duration-200 cursor-pointer hover:neon-glow-stellar"
            style={{
              borderColor: 'color-mix(in srgb, var(--accent-stellar) 30%, transparent)',
              color: 'var(--accent-stellar)',
            }}
          >
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            Return to launch pad
          </button>
        </div>
      </div>
    </footer>
  )
}
