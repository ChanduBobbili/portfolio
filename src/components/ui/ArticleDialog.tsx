'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/animate-ui/components/radix/dialog'
import { Button } from '@/components/ui/button'
import { articles } from '@/data/portfolio'

type Article = (typeof articles)[number]

interface ArticleDialogProps {
  article: Article | null
  onOpenChange: (open: boolean) => void
}

export function ArticleDialog({ article, onOpenChange }: ArticleDialogProps) {
  return (
    <Dialog open={!!article} onOpenChange={onOpenChange}>
      <DialogContent
        from="bottom"
        className="sm:max-w-md p-0 border-none bg-accent-foreground shadow-md shadow-accent"
        overlayClassName="bg-background/50 backdrop-blur-xs md:backdrop-blur-sm"
        showCloseButton={false}
      >
        {article && (
          <>
            <div className="relative aspect-video rounded-t-lg max-h-64 w-full overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 448px"
              />
            </div>

            <div className="flex flex-col gap-1 px-4 pb-4">
              <DialogHeader>
                <DialogTitle className="font-heading text-left leading-snug text-muted/90 font-medium">
                  {article.title}
                </DialogTitle>
                <DialogDescription className="font-sans text-left leading-relaxed text-muted-foreground">
                  {article.summary}
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="sm:justify-start">
                <Button asChild variant="link" className="p-0 mr-auto">
                  <Link href={article.url} target="_blank" rel="noopener noreferrer">
                    Read on DEV
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </DialogFooter>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
