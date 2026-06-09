'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  /** Fade/slide in when scrolled into view (default: true) */
  reveal?: boolean
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <motion.h2
      className={cn(
        'font-heading text-[clamp(2rem,4vw,3rem)] font-bold tracking-[0.02em] leading-[1.15]',
        'bg-[linear-gradient(90deg,var(--brand)_0%,var(--foreground)_35%,var(--brand-sky)_65%,var(--brand)_100%)]',
        'bg-size-[200%_200%] bg-clip-text text-transparent',
        className
      )}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 6,
        ease: 'circInOut',
        repeat: Infinity,
      }}
    >
      {children}
    </motion.h2>
  )
}
