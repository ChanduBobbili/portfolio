'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { personal } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { MagicCard } from '@/components/ui/magic-card'
import { Terminal } from '@/components/ui/terminal'

const infoCards = [
  { icon: Briefcase, label: 'Currently', value: personal.currentRole },
  { icon: GraduationCap, label: 'Education', value: personal.education },
]

const aboutCommands = [
  'whoami',
  'cat stack.json',
  'git log --oneline --career',
  'run diagnostics --highlight',
  'ping chandu --contact',
]

const aboutOutputs: Record<number, string[]> = {
  0: [
    'Bobbili Vijaya Chandu',
    'Senior SDE · Deepta AI · Hyderabad, India',
    'TypeScript · Go · React · Microservices · 3+ years',
  ],
  1: [
    '  "languages":  ["TypeScript", "Go", "JavaScript", "Python"],',
    '  "frontend":   ["React", "Next.js", "TanStack", "Tailwind CSS"],',
    '  "backend":    ["Microservices", "REST", "Kafka", "gRPC", "SSE"],',
    '  "databases":  ["PostgreSQL", "MongoDB", "ClickHouse", "Redis"],',
    '  "devops":     ["Docker", "Kubernetes (GKE)", "GCP", "GitHub Actions"]',
  ],
  2: [
    '✔ 08/2025 – present   Senior SDE @ Deepta AI',
    '                      Klaritics analytics · Kafka · ClickHouse · GKE',
    '✔ 09/2024 – 07/2025   SDE @ Apxor Technology Solutions',
    '                      Hearzap CMS · Go microservices · ~90% test coverage',
    '✔ 07/2023 – 08/2024   Associate Web Dev @ Apxor Technology Solutions',
    '                      CRA → Vite · Lighthouse 54 → 97 (+80%)',
  ],
  3: [
    '✔ Lighthouse score    54 → 97   (+80%)',
    '✔ INP / blocking      ~500ms → negligible',
    '✔ npm downloads       ~1 000 / week  (@zenithui/day-picker)',
    '✔ Universities served  4  (concurrent via Go goroutines)',
  ],
  4: [
    'email   chandubobbili12@gmail.com',
    'github  github.com/ChanduBobbili',
    'linkedin  linkedin.com/in/chandu-bobbili-15863319b',
    '✔ open to full-time · remote · relocation',
  ],
}

export function About() {
  return (
    <section id="about" className="section-even relative overflow-hidden py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeInOut' }}
          >
            <SectionTitle className="mb-2 md:mb-6" reveal={false}>
              About Me
            </SectionTitle>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-sans text-muted-foreground text-base leading-[1.75] mb-4 md:mb-8"
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
                    className="rounded-lg border-2 border-border-default"
                    gradientFrom="#ee4f27"
                    gradientTo="#6b21ef"
                    gradientColor="#262626"
                    gradientOpacity={0.15}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <card.icon size={14} className="text-brand" />
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
            viewport={{ once: true }}
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
      </div>
    </section>
  )
}
