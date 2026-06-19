'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SparklesText } from './sparkles-text'
import { useDeviceType } from '@zenithui/utils'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  sparkles?: boolean
}

export function SectionTitle({ children, className = '', sparkles = false }: SectionTitleProps) {
  const deviceType = useDeviceType()

  const content = () => (
    <motion.h2
      className={cn(
        'font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight',
        'bg-[linear-gradient(90deg,var(--primary)_0%,var(--foreground)_35%,var(--primary)_65%,var(--primary)_100%)]',
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

  return sparkles ? (
    <SparklesText sparklesCount={deviceType === 'desktop' ? 4 : 3}>{content()}</SparklesText>
  ) : (
    content()
  )
}
