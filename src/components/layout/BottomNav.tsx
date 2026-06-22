'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, ContactIcon, FolderOpen, Zap } from 'lucide-react'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useNavVisibility } from '@/hooks/useNavVisibility'
import { useLenisScrollTo } from '@/hooks/useLenisScrollTo'
import { cn } from '@/lib/utils'

const SCROLL_SPY_IDS = ['about', 'projects', 'skills', 'work', 'writing', 'contact']

const BOTTOM_TABS = [
  { label: 'Projects', href: '#projects', icon: FolderOpen, id: 'projects' },
  { label: 'Skills', href: '#skills', icon: Zap, id: 'skills' },
  { label: 'Work', href: '#work', icon: Briefcase, id: 'work' },
  { label: 'Contact', href: '#contact', icon: ContactIcon, id: 'contact' },
] as const

const tabSpring = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 32,
  mass: 0.85,
}

export function BottomNav() {
  const activeId = useScrollSpy(SCROLL_SPY_IDS, 20)
  const { heroLeft, isOnLightBg } = useNavVisibility({
    navElementId: 'bottom-nav',
    anchor: 'bottom',
  })
  const showTab = heroLeft
  const scrollTo = useLenisScrollTo()

  const isDarkPill = isOnLightBg
  const pillContent = {
    logo: isDarkPill ? 'text-foreground' : 'text-accent-foreground',
    linkInactive: isDarkPill
      ? 'text-accent-foreground hover:text-primary'
      : 'text-accent-foreground hover:text-primary',
    linkActive: isDarkPill ? 'text-primary' : 'text-primary',
    linkDot: isDarkPill ? 'bg-primary' : 'bg-primary',
    menuBtn: isDarkPill
      ? 'border-foreground/25 text-foreground'
      : 'border-foreground/25 text-primary',
  }

  return (
    <AnimatePresence>
      {showTab && (
        <motion.nav
          id="bottom-nav"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={tabSpring}
          aria-label="Section navigation"
          className={cn(
            'lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-110',
            'w-7/12 max-w-sm',
            'rounded-2xl border backdrop-blur-md',
            'flex items-center justify-around px-2 py-2',
            isOnLightBg
              ? 'bg-background/50 border-border text-foreground'
              : 'bg-foreground/10 border-foreground/15 text-background'
          )}
        >
          {BOTTOM_TABS.map((tab) => {
            const isActive = activeId === tab.id
            const Icon = tab.icon
            return (
              <button
                key={tab.href}
                type="button"
                onClick={() => scrollTo(tab.href)}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex flex-1 flex-col items-center gap-1 py-1 transition-colors',
                  isActive ? pillContent.linkActive : pillContent.linkInactive
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.25 : 1.75} />
                {/* <span className="font-mono text-[10px] tracking-wide">{tab.label}</span> */}
                {/* {isActive && (
                  <motion.span
                    layoutId="bottom-tab-dot"
                    className="absolute -bottom-0.5 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-primary"
                  />
                )} */}
              </button>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
