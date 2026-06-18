'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { personal } from '@/data/portfolio'
import { MagicCard } from '@/components/ui/magic-card'
import { Terminal } from '@/components/ui/terminal'
import { GithubHeatmap } from '@/components/ui/github-heatmap'
import { VariableProximity } from '@/components/ui/variable-proximity'
import { SectionTitle } from '../ui/SectionTitle'
import { cn } from '@/lib/utils'

const infoCards = [
  { icon: Briefcase, label: 'Currently', value: personal.currentRole },
  // { icon: GraduationCap, label: 'Education', value: personal.education },
]

const aboutCommands = ['whoami', 'cat stack.json', 'run diagnostics --highlight']

const aboutOutputs: Record<number, string[]> = {
  0: ['Bobbili Vijaya Chandu'],
  1: [
    '  "languages":  ["TypeScript", "Go", "JavaScript", "Python"],',
    '  "frontend":   ["React", "Next.js", "TanStack", "Tailwind CSS"],',
    '  "backend":    ["Microservices", "REST", "Kafka", "gRPC", "SSE"],',
    '  "databases":  ["PostgreSQL", "MongoDB", "ClickHouse", "Redis"],',
    '  "devops":     ["Docker", "Kubernetes (GKE)", "GCP", "GitHub Actions"]',
  ],
  2: [
    '✔ Lighthouse score    54 → 97   (+80%)',
    '✔ INP / blocking      ~500ms → negligible',
    '✔ npm downloads       ~1 000 / week  (@zenithui/day-picker)',
    '✔ Universities served  4  (concurrent via Go goroutines)',
  ],
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="about"
      data-bg="light"
      className="section-even relative overflow-hidden py-8 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            'absolute inset-0 bg-size-[40px_40px]',
            'bg-[linear-gradient(to_right,rgba(15,16,20,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,16,20,0.06)_1px,transparent_1px)]'
          )}
        />
        <div className="absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-start">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeInOut' }}
          >
            <h2 className="font-heading md:text-base text-sm font-bold tracking-normal text-primary">
              <VariableProximity
                label="About Me"
                containerRef={containerRef}
                fromFontVariationSettings="'wght' 400, 'wdth' 100"
                toFontVariationSettings="'wght' 900, 'wdth' 125"
                radius={120}
                falloff="gaussian"
              />
            </h2>
            <SectionTitle>A bit about me</SectionTitle>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-sans text-muted-foreground text-base leading-[1.75] mb-2 md:mb-4"
            >
              {personal.about}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <card.icon size={14} className="text-primary" />
                        <h5 className="font-heading text-sm font-light uppercase tracking-widest text-muted-foreground">
                          {card.label}
                        </h5>
                      </div>
                      <p className="font-sans text-sm font-medium text-foreground leading-snug">
                        {card.value}
                      </p>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeInOut' }}
          >
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
          </motion.div>
        </div>

        <GithubHeatmap className="mt-6" />
      </div>
    </section>
  )
}
