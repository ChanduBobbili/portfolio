'use client'

import {
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
  LayoutGrid,
  Server,
  type LucideIcon,
} from 'lucide-react'
import { skills } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from '@/components/animate-ui/components/base/accordion'
import DomeGallery from '@/components/DomeGallery'
import { cn } from '@/lib/utils'
import { useDeviceType } from '@zenithui/utils'
import { motion } from 'framer-motion'

const skillIconSlugs = [
  'typescript',
  'go',
  'javascript',
  'python',
  'html5',
  'css',
  'react',
  'nextdotjs',
  'tailwindcss',
  'webflow',
  // 'shadcnui',
  'nodedotjs',
  'express',
  'docker',
  'kubernetes',
  'googlecloud',
  'postgresql',
  'mongodb',
  'clickhouse',
  'redis',
  // 'kafka',
  // 'grpc',
  'githubactions',
  'git',
  // 'vitest',
  // 'playwright',
  'figma',
]

const domeImages = skillIconSlugs.map((slug) => ({
  src: `https://cdn.simpleicons.org/${slug}/${slug}.svg`,
  alt: slug,
}))

type CategoryMeta = {
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

const categoryMeta: Record<string, CategoryMeta> = {
  Languages: {
    icon: Code2,
    iconBg: 'bg-sky-500/15',
    iconColor: 'text-sky-500',
  },
  'Go Internals': {
    icon: Cpu,
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-500',
  },
  Frontend: {
    icon: LayoutGrid,
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-500',
  },
  'Backend & Messaging': {
    icon: Server,
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-500',
  },
  Databases: {
    icon: Database,
    iconBg: 'bg-orange-500/15',
    iconColor: 'text-orange-500',
  },
  'DevOps & Cloud': {
    icon: Cloud,
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-500',
  },
  Other: {
    icon: Boxes,
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-500',
  },
}

const defaultMeta: CategoryMeta = {
  icon: Boxes,
  iconBg: 'bg-muted',
  iconColor: 'text-muted-foreground',
}

function categoryToValue(category: string) {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function Skills() {
  const deviceType = useDeviceType()

  return (
    <section id="skills" className="section-even relative overflow-hidden py-8 md:py-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeInOut' }}
        className="max-w-7xl mx-auto px-4"
      >
        <SectionTitle className="mb-2 md:mb-6" sparkles>
          Skills
        </SectionTitle>

        <div className="grid lg:grid-cols-2 gap-0 lg:gap-16 items-start justify-items-center">
          <Accordion multiple={false} className="w-full">
            {skills.map((group, i) => {
              const value = categoryToValue(group.category)
              const meta = categoryMeta[group.category] ?? defaultMeta
              const Icon = meta.icon

              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: i * 0.25, ease: 'easeInOut' }}
                >
                  <AccordionItem
                    value={value}
                    className="mb-3 overflow-hidden rounded-xl border border-border bg-card border-b! last:border-b!"
                  >
                    <AccordionTrigger className="items-center px-4 py-4 hover:no-underline">
                      <div className="flex flex-1 items-center gap-3">
                        <span
                          className={cn(
                            'flex size-9 shrink-0 items-center justify-center rounded-lg',
                            meta.iconBg
                          )}
                        >
                          <Icon size={18} className={meta.iconColor} />
                        </span>
                        <h5 className="font-heading text-sm 2xl:text-base font-medium tracking-wide text-muted/90">
                          {group.category}
                        </h5>
                      </div>
                      <p className="mr-2 shrink-0 font-sans text-xs text-muted-foreground">
                        {group.items.length} skills
                      </p>
                    </AccordionTrigger>
                    <AccordionPanel className="px-4 pb-4 pt-0">
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <Badge
                            key={item}
                            variant="outline"
                            className={cn(
                              'font-sans rounded-sm text-xs 2xl:text-sm px-3 py-3',
                              group.accent
                            )}
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                </motion.div>
              )
            })}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeInOut' }}
            style={{
              width:
                deviceType === 'desktop' ? '600px' : deviceType === 'tablet' ? '600px' : '375px',
              height:
                deviceType === 'desktop' ? '500px' : deviceType === 'tablet' ? '400px' : '300px',
            }}
          >
            <DomeGallery
              images={domeImages}
              grayscale={false}
              minRadius={400}
              maxVerticalRotationDeg={1}
              dragDampening={2}
              segments={deviceType === 'desktop' ? 32 : deviceType === 'tablet' ? 32 : 44}
              imageBorderRadius="16px"
              overlayBlurColor="transparent"
              scrimColor="rgba(232, 242, 255, 0.5)"
              openedImageBorderRadius="16px"
              openedImageHeight={
                deviceType === 'desktop' ? '400px' : deviceType === 'tablet' ? '300px' : '200px'
              }
              openedImageWidth={
                deviceType === 'desktop' ? '400px' : deviceType === 'tablet' ? '300px' : '200px'
              }
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
