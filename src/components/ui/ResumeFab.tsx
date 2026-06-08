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
          bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]
          border border-[var(--accent-purple)]
          shadow-[var(--glow-purple)]
          hover:bg-[var(--btn-primary-hover)]
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
