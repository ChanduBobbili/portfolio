'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { personal } from '@/data/portfolio'

const infoCards = [
  { icon: Briefcase, label: 'Currently', value: personal.currentRole },
  // { icon: Zap, label: 'Open To', value: personal.openTo },
  { icon: GraduationCap, label: 'Education', value: personal.education },
  // { icon: MapPin, label: 'Based In', value: personal.location },
]

export function About() {
  return (
    <section id="about" className="section-even relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* <SectionLabel>PILOT PROFILE</SectionLabel> */}

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-section-title text-text-primary mb-6">About Me</h2>
            <p className="text-text-secondary text-base leading-[1.75] mb-8">{personal.about}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="glass-card p-4"
                  style={{ borderColor: 'var(--border-accent)' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <card.icon size={14} className="text-accent" />
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-text-tertiary">
                      {card.label}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-text-primary leading-snug">{card.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Mission Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-card p-6 lg:p-8"
          >
            <h3 className="font-display text-xl font-bold text-text-primary mb-6">Mission Stats</h3>
            <div className="flex flex-col">
              {personal.missionStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex items-center justify-between py-4 ${
                    i < personal.missionStats.length - 1 ? 'border-b border-border-muted' : ''
                  }`}
                >
                  <span className="font-mono-tech text-xs text-text-tertiary uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span className="font-display text-lg font-bold text-accent">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
