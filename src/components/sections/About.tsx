'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { SectionZoomReveal } from '@/components/layout/SectionZoomReveal'
import { personal } from '@/data/portfolio'
import { MagicCard } from '@/components/ui/magic-card'
import { Terminal, type TerminalOutputLine } from '@/components/ui/terminal'
import { GithubHeatmap } from '@/components/ui/github-heatmap'
import { VariableProximity } from '@/components/ui/variable-proximity'
import { SectionTitle } from '../ui/SectionTitle'
import { cn } from '@/lib/utils'
import { Marquee } from '../ui/marquee'
import Image from 'next/image'

const skillIconSlugs = [
  'typescript',
  'go',
  'javascript',
  'react',
  'nextdotjs',
  'nodedotjs',
  'docker',
  'kubernetes',
  'googlecloud',
  'postgresql',
  'mongodb',
]

const domeImages = skillIconSlugs.map((slug) => ({
  src: `https://cdn.simpleicons.org/${slug}/${slug}.svg`,
  alt: slug,
}))

const infoCards = [
  { icon: Briefcase, label: 'Current Role', value: 'Senior Software Engineer @ Deepta AI' },
]

const aboutCommands = [
  'run diagnostics --highlight',
  'run achievements --highlight',
  'list open-source --stats',
]

const aboutOutputs: Record<number, TerminalOutputLine[]> = {
  0: [
    {
      type: 'diagnostic',
      label: 'Tech lead (projects)',
      value: '3',
      note: '(Klaritics · AMS · Hearzap)',
    },
    {
      type: 'diagnostic',
      label: 'Events ingestion',
      value: '1M+ / sec',
      note: '(Klaritics, load-tested)',
    },
    {
      type: 'diagnostic',
      label: 'Lighthouse score',
      value: '54 → 97',
      note: '(Apxor Dashboard)',
    },
  ],
  1: [
    { type: 'achievement', label: 'Leads generated', value: '50,000+' },
    {
      type: 'achievement',
      label: 'Student enrollments',
      value: '20,000 across 4 universities',
    },
    { type: 'achievement', label: 'App processing', value: '15h → 8h per applicant' },
    {
      type: 'achievement',
      label: 'Accounts retained',
      value: '5+',
      note: '(churn prevented)',
    },
  ],
  2: [
    {
      type: 'diagnostic',
      label: 'Library',
      value: 'ZenithUI',
      note: '(React component library)',
    },
    {
      type: 'diagnostic',
      label: 'npm packages',
      value: '13+ scoped',
      note: '(@zenithui/*)',
    },
    {
      type: 'diagnostic',
      label: 'Weekly downloads',
      value: '700+ / week',
      note: '(combined npm)',
    },
    {
      type: 'diagnostic',
      label: 'CLI tool',
      value: 'changesetgoo',
      note: '(Go, single binary)',
    },
  ],
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <SectionZoomReveal
      id="about"
      data-bg="light"
      className="section-even relative overflow-hidden py-6 md:py-12"
      contentClassName="max-w-7xl mx-auto px-4"
      background={
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={cn(
              'absolute inset-0 bg-size-[40px_40px]',
              'bg-[linear-gradient(to_right,rgba(15,16,20,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,16,20,0.06)_1px,transparent_1px)]'
            )}
          />
          <div className="absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
      }
    >
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-start">
        <div ref={containerRef}>
          <h2 className="font-heading md:text-base text-sm font-bold tracking-normal text-primary">
            <VariableProximity
              label="A bit about me"
              containerRef={containerRef}
              fromFontVariationSettings="'wght' 400, 'wdth' 100"
              toFontVariationSettings="'wght' 900, 'wdth' 125"
              radius={120}
              falloff="gaussian"
            />
          </h2>
          <SectionTitle>More than shipped features</SectionTitle>

          <p className="font-sans text-muted-foreground text-base leading-[1.75] mb-2 md:mb-4">
            {personal.about.map((segment, i) =>
              segment.highlight ? (
                <span key={i} className="font-semibold text-primary">
                  {segment.text}
                </span>
              ) : (
                <span key={i}>{segment.text}</span>
              )
            )}
          </p>

          {infoCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.5, ease: 'easeInOut' }}
            >
              <MagicCard
                className="rounded-lg border-2 border-border"
                gradientFrom="#ee4f27"
                gradientTo="#6b21ef"
                gradientColor="#262626"
                gradientOpacity={0.15}
              >
                <div className="p-2.5 flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
                  <div className="flex items-center gap-1">
                    <card.icon size={14} className="text-primary" />
                    <h5 className="font-heading text-sm font-light tracking-wider text-muted-foreground">
                      {card.label}
                    </h5>
                  </div>
                  <p className="font-sans text-sm font-medium text-foreground">{card.value}</p>
                </div>
              </MagicCard>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeInOut' }}
            className="relative hidden lg:flex w-full flex-col items-center justify-center overflow-hidden mt-2 md:mt-4"
          >
            <Marquee pauseOnHover className="[--duration:25s]">
              {domeImages.map((image) => (
                <Image
                  key={image.alt}
                  src={image.src}
                  alt={image.alt}
                  width={40}
                  height={40}
                  className="w-8 h-8 shrink-0"
                />
              ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
          </motion.div>
        </div>

        <div>
          <Terminal
            commands={aboutCommands}
            outputs={aboutOutputs}
            username="chandu@mission-control"
            typingSpeed={42}
            initialDelay={750}
            delayBetweenCommands={900}
            enableSound={false}
            className="max-w-none px-0"
          />
        </div>
      </div>

      <GithubHeatmap className="mt-6" />
    </SectionZoomReveal>
  )
}
