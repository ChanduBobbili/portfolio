import * as React from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function SpaceCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        'rounded-[20px] border border-border bg-card/75 shadow-[var(--glow)] backdrop-blur-xl transition-shadow hover:shadow-[var(--glow-hover)] ring-0',
        className
      )}
      {...props}
    />
  )
}

export { SpaceCard }
