import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { useDeviceType } from '@zenithui/utils'
import { SparklesText } from './sparkles-text'

interface SectionLabelProps {
  /** Label text without the // prefix */
  children: string
  className?: string
  sparkles?: boolean
}

export function SectionLabel({ children, className = '', sparkles = false }: SectionLabelProps) {
  const deviceType = useDeviceType()

  const content = () => (
    <motion.p
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 6,
        ease: 'circInOut',
        repeat: Infinity,
      }}
      className={cn(
        'font-heading text-base font-bold tracking-normal text-primary',
        'bg-[linear-gradient(90deg,var(--primary)_0%,var(--foreground)_35%,var(--primary)_65%,var(--primary)_100%)]',
        'bg-size-[200%_200%] bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </motion.p>
  )

  return sparkles ? (
    <SparklesText sparklesCount={deviceType === 'desktop' ? 4 : 3}>{content()}</SparklesText>
  ) : (
    content()
  )
}
