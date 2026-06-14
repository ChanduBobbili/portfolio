'use client'

import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { articles } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { WobbleCard } from '@/components/ui/wobble-card'
import { ArticleDialog } from '@/components/ui/ArticleDialog'
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern'
import { cn } from '@/lib/utils'
import { useDeviceType } from '@zenithui/utils'
import { VariableProximity } from '../ui/variable-proximity'
import { StripedPattern } from '../magicui/striped-pattern'

const ARTICLE_BG: Record<string, string> = {
  purple: 'bg-[#1a3550]',
  cyan: 'bg-[#0d3d5c]',
  green: 'bg-[#0f3d4a]',
}

const desktopArticleOrder = [
  {
    key: 'seo',
    colSpan: 'col-span-1 lg:col-span-2',
    containerClassName: 'min-h-[200px] lg:min-h-[300px]',
    contentClassName: 'max-w-md',
    imageClassName: 'absolute right-4 bottom-4 w-[45%] h-[80%] object-contain rounded-2xl',
    imageWidth: 500,
    imageHeight: 500,
  },
  {
    key: 'biome',
    colSpan: 'col-span-1',
    containerClassName: 'min-h-[200px] lg:min-h-[300px]',
    contentClassName: 'max-w-80',
    imageClassName:
      'absolute -right-4 -bottom-6 w-40 h-40 md:w-48 md:h-48 object-contain rounded-2xl grayscale filter opacity-90',
    imageWidth: 300,
    imageHeight: 300,
  },
  {
    key: 'changesetgoo',
    colSpan: 'col-span-1 lg:col-span-3',
    containerClassName: 'min-h-[200px] lg:min-h-[300px]',
    contentClassName: 'max-w-lg',
    imageClassName:
      'absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl grayscale filter',
    imageWidth: 500,
    imageHeight: 500,
  },
] as const

const mobileArticleOrder = [
  {
    key: 'changesetgoo',
    colSpan: 'col-span-1 lg:col-span-3',
    containerClassName: 'min-h-[200px] lg:min-h-[300px]',
    contentClassName: 'max-w-lg',
    imageClassName:
      'absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl grayscale filter',
    imageWidth: 500,
    imageHeight: 500,
  },
  {
    key: 'seo',
    colSpan: 'col-span-1 lg:col-span-2',
    containerClassName: 'min-h-[200px] lg:min-h-[300px]',
    contentClassName: 'max-w-md',
    imageClassName: 'absolute right-4 bottom-4 w-[45%] h-[80%] object-contain rounded-2xl',
    imageWidth: 500,
    imageHeight: 500,
  },
  {
    key: 'biome',
    colSpan: 'col-span-1',
    containerClassName: 'min-h-[200px] lg:min-h-[300px]',
    contentClassName: 'max-w-80',
    imageClassName:
      'absolute -right-4 -bottom-6 w-40 h-40 md:w-48 md:h-48 object-contain rounded-2xl grayscale filter opacity-90',
    imageWidth: 300,
    imageHeight: 300,
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
  const deviceType = useDeviceType()
  const isMobile = useMemo(
    () => deviceType === 'largeMobile' || deviceType === 'smallMobile',
    [deviceType]
  )
  const articlesOrder = useMemo(() => {
    return isMobile ? mobileArticleOrder : desktopArticleOrder
  }, [isMobile])

  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedArticle, setSelectedArticle] = useState<(typeof articles)[number] | null>(null)

  return (
    <section
      id="writing"
      data-bg="light"
      className="section-even relative overflow-hidden py-8 md:py-20"
    >
      {/* Only show the grid pattern on desktop */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <InteractiveGridPattern variant="light" className="z-0" squares={[80, 40]} opacity={0.75} />
        <div className="pointer-events-none absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      {/* Only show the striped pattern on mobile */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden md:hidden">
        <StripedPattern direction="left" className="z-0 text-foreground/8" />
        <div className="absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeInOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4"
      >
        <h2 className="font-heading md:text-base text-sm font-bold tracking-normal text-primary">
          <VariableProximity
            label="Technical Writing"
            containerRef={containerRef}
            fromFontVariationSettings="'wght' 400, 'wdth' 100"
            toFontVariationSettings="'wght' 900, 'wdth' 125"
            radius={120}
            falloff="gaussian"
          />
        </h2>
        <SectionTitle className="mb-2">Articles I&apos;ve written </SectionTitle>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: 0.35, ease: 'easeInOut' }}
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
            className="font-medium bg-linear-to-r bg-size-[200%_200%] bg-clip-text text-primary"
          >
            DEV Community
          </motion.a>
        </motion.p>

        <div
          className={cn(
            isMobile
              ? '-mx-4 flex gap-3 overflow-x-auto overflow-y-hidden px-4 scrollbar-none'
              : 'grid grid-cols-1 lg:grid-cols-3 gap-3 w-full'
          )}
        >
          {articlesOrder.map((layout, i) => {
            const article = getArticle(layout.key)
            const bgClass = ARTICLE_BG[article.accent] ?? ARTICLE_BG.purple

            return (
              <WobbleCard
                key={layout.key}
                framerMotionProps={{
                  initial: {
                    opacity: 0,
                    x: i === 0 ? -20 : i === 1 ? 20 : 0,
                    y: i === 2 ? 20 : 0,
                  },
                  whileInView: { opacity: 1, x: 0, y: 0 },
                  viewport: { once: true, amount: isMobile ? 0 : 0.25 },
                  transition: { duration: 0.5, delay: isMobile ? 0.25 : 0.5, ease: 'easeInOut' },
                }}
                containerClassName={cn(
                  layout.containerClassName,
                  !isMobile && layout.colSpan,
                  isMobile && 'w-[85vw] shrink-0',
                  bgClass
                )}
                onClick={() => setSelectedArticle(article)}
                className="flex flex-col h-full justify-center"
              >
                <div className={layout.contentClassName}>
                  <h2 className="text-left text-balance text-sm md:text-base lg:text-xl font-semibold tracking-[-0.015em]  font-heading">
                    {article.title}
                  </h2>
                  <p className="mt-4 text-left text-sm/6 text-muted/65 font-sans">
                    {article.summary}
                  </p>
                </div>

                {/* {layout.key !== 'biome' && (
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={layout.imageWidth}
                    height={layout.imageHeight}
                    sizes="(max-width: 768px) 50vw, 500px"
                    className={layout.imageClassName}
                  />
                )} */}
              </WobbleCard>
            )
          })}
        </div>

        <ArticleDialog
          article={selectedArticle}
          onOpenChange={(open) => !open && setSelectedArticle(null)}
        />
      </motion.div>
    </section>
  )
}
