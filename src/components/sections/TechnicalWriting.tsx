'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { articles } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { WobbleCard } from '@/components/ui/wobble-card'
import { ArticleDialog } from '@/components/ui/ArticleDialog'
import { cn } from '@/lib/utils'

const ARTICLE_BG: Record<string, string> = {
  purple: 'bg-[#1a3550]',
  cyan: 'bg-[#0d3d5c]',
  green: 'bg-[#0f3d4a]',
}

const articleLayouts = [
  {
    key: 'seo',
    colSpan: 'col-span-1 lg:col-span-2',
    containerClassName: 'h-full min-h-[200px] lg:min-h-[300px]',
    contentClassName: 'max-w-md',
    imageClassName:
      'absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl',
    imageWidth: 500,
    imageHeight: 500,
  },
  {
    key: 'biome',
    colSpan: 'col-span-1',
    containerClassName: 'min-h-[200px]',
    contentClassName: 'max-w-80',
    imageClassName:
      'absolute -right-4 -bottom-6 w-40 h-40 md:w-48 md:h-48 object-contain rounded-2xl grayscale filter opacity-90',
    imageWidth: 300,
    imageHeight: 300,
  },
  {
    key: 'changesetgoo',
    colSpan: 'col-span-1 lg:col-span-3',
    containerClassName: 'min-h-[200px] lg:min-h-[600px] xl:min-h-[300px]',
    contentClassName: 'max-w-lg',
    imageClassName:
      'absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl grayscale filter',
    imageWidth: 500,
    imageHeight: 500,
  },
] as const

function getArticle(key: string) {
  const article = articles.find((a) => {
    if (key === 'seo') return a.title.toLowerCase().includes('seo')
    if (key === 'biome') return a.title.toLowerCase().includes('biome')
    return a.title.toLowerCase().includes('changesetgoo')
  })
  if (!article) throw new Error(`Article not found for key: ${key}`)
  return article
}

export function TechnicalWriting() {
  const [selectedArticle, setSelectedArticle] = useState<(typeof articles)[number] | null>(null)

  return (
    <section id="writing" className="section-even relative overflow-hidden py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle className="mb-4">Technical Writing</SectionTitle>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="font-sans text-muted-foreground mb-4 md:mb-8"
        >
          Published on{' '}
          <motion.a
            href="https://dev.to/chandu_bobbili_06"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 6,
              ease: 'circInOut',
              repeat: Infinity,
            }}
            className="font-medium bg-linear-to-r bg-size-[200%_200%] bg-clip-text text-brand"
          >
            DEV Community
          </motion.a>
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full">
          {articleLayouts.map((layout) => {
            const article = getArticle(layout.key)
            const bgClass = ARTICLE_BG[article.accent] ?? ARTICLE_BG.purple

            return (
              <WobbleCard
                key={layout.key}
                containerClassName={cn(layout.containerClassName, layout.colSpan, bgClass)}
                onClick={() => setSelectedArticle(article)}
                className={'flex flex-col h-full justify-center '}
              >
                <div className={layout.contentClassName}>
                  <h2 className="text-left text-balance text-sm md:text-base lg:text-xl font-semibold tracking-[-0.015em] text-white font-heading">
                    {article.title}
                  </h2>
                  <p className="mt-4 text-left text-sm/6 text-muted/50 dark:text-accent-foreground/60 font-sans">
                    {article.summary}
                  </p>
                </div>
              </WobbleCard>
            )
          })}
        </div>

        <ArticleDialog
          article={selectedArticle}
          onOpenChange={(open) => !open && setSelectedArticle(null)}
        />
      </div>
    </section>
  )
}
