'use client'

import { motion } from 'framer-motion'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  /** Fade/slide in when scrolled into view (default: true) */
  reveal?: boolean
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <motion.h2
      className={`text-section-title-gradient ${className}`}
      // initial={reveal ? { opacity: 0, y: 16 } : false}
      // whileInView={reveal ? { opacity: 1, y: 0 } : undefined}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 6,
        ease: 'circInOut',
        repeat: Infinity,
      }}
    >
      {/* <motion.h2
        className="from-primary via-foreground to-primary bg-linear-to-r bg-size-[200%_200%] bg-clip-text p-3 text-base font-medium text-transparent xl:text-lg"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 6,
          ease: 'circInOut',
          repeat: Infinity,
        }}
      ></motion.h2> */}
      {children}
    </motion.h2>
  )
}
