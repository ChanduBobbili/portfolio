'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  sector: string
  title: string
  subtitle?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeader({
  sector,
  title,
  subtitle,
  align = 'left',
}: SectionHeaderProps) {
  const centered = align === 'center'

  return (
    <div className={centered ? 'text-center mb-12' : 'mb-12'}>
      <motion.div
        initial={{ opacity: 0, x: centered ? 0 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}
      >
        <div
          className="h-px w-8 sm:w-12"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--accent-stellar))',
          }}
        />
        <span
          className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] px-3 py-1 rounded-full border"
          style={{
            color: 'var(--accent-stellar)',
            borderColor: 'color-mix(in srgb, var(--accent-stellar) 35%, transparent)',
            background: 'color-mix(in srgb, var(--accent-stellar) 8%, transparent)',
          }}
        >
          {sector}
        </span>
        <div
          className="h-px w-8 sm:w-12"
          style={{
            background: 'linear-gradient(90deg, var(--accent-stellar), transparent)',
          }}
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight ${
          centered ? 'mx-auto' : ''
        }`}
        style={{ fontFamily: 'var(--font-space)' }}
      >
        <span className="holo-text">{title}</span>
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className={`mt-3 text-sm sm:text-base font-mono text-[var(--text-secondary)] max-w-2xl ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
