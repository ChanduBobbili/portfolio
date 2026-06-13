import * as React from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function SpaceCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        'rounded-[20px] border border-border bg-card/75 shadow-[0_8px_32px_rgba(56,189,248,0.12)] backdrop-blur-xl transition-shadow hover:shadow-[0_16px_48px_rgba(56,189,248,0.2)] ring-0',
        className
      )}
      {...props}
    />
  )
}

export { SpaceCard }
