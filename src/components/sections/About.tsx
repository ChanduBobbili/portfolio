'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { personal } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SpaceCard } from '@/components/ui/SpaceCard'

const infoCards = [
  { icon: Briefcase, label: 'Currently', value: personal.currentRole },
  { icon: GraduationCap, label: 'Education', value: personal.education },
]

export function About() {
  return (
    <section id="about" className="section-even relative overflow-hidden py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle className="mb-6" reveal={false}>
              About Me
            </SectionTitle>
            <p className="font-sans text-muted-foreground text-base leading-[1.75] mb-8">{personal.about}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <SpaceCard className="p-4" style={{ borderColor: 'var(--border-accent)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <card.icon size={14} className="text-brand" />
                      <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
                        {card.label}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground leading-snug">{card.value}</p>
                  </SpaceCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <SpaceCard className="p-6 lg:p-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-6">Mission Stats</h3>
              <div className="flex flex-col">
                {personal.missionStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`flex items-center justify-between py-4 ${
                      i < personal.missionStats.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <span className="font-sans text-xs text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <span className="font-heading text-lg font-bold text-brand">{stat.value}</span>
                  </div>
                ))}
              </div>
            </SpaceCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
