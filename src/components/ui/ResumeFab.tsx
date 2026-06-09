'use client'

import { FileText } from 'lucide-react'
import { Root as FabRoot, Trigger as FabTrigger } from '@zenithui/fab'

interface ResumeFabProps {
  onExpand: () => void
}

export function ResumeFab({ onExpand }: ResumeFabProps) {
  return (
    <FabRoot
      position="bottom-right"
      xOffset={24}
      yOffset={24}
      dismissOutsideClick={false}
      dismissOnEsc={false}
    >
      <FabTrigger
        onClick={onExpand}
        className="
          flex items-center gap-2 px-5 py-3 rounded-full
          bg-primary text-primary-foreground
          border border-brand
          shadow-[var(--glow)]
          hover:bg-primary/80
          transition-all duration-200
          text-sm font-medium
          cursor-pointer
        "
        aria-label="Expand resume viewer"
      >
        <FileText size={18} />
        Resume
      </FabTrigger>
    </FabRoot>
  )
}
