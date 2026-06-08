'use client'

import { motion, type Variants } from 'framer-motion'
import { MapPin, Briefcase, GraduationCap, Zap } from 'lucide-react'
import { personal } from '@/data/portfolio'

const cards = [
  { icon: Briefcase, label: 'Currently',  value: personal.currentRole },
  { icon: Zap,        label: 'Open to',   value: personal.openTo },
  { icon: GraduationCap, label: 'Education', value: personal.education },
  { icon: MapPin,     label: 'Based in',  value: personal.location },
]

const cardVariants: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.0, 0.0, 0.2, 1], delay: i * 0.1 },
  }),
}

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono uppercase tracking-widest text-[var(--accent-purple)] mb-3"
        >
          About
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-6 leading-tight">
              A bit about me
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              {personal.about}
            </p>
          </motion.div>

          {/* Right — info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="
                  group p-4 rounded-xl
                  bg-[var(--bg-surface)] border border-[var(--border-default)]
                  hover:border-[var(--accent-purple)]
                  hover:shadow-[var(--glow-purple)]
                  transition-all duration-300
                "
              >
                <div className="flex items-center gap-2 mb-2">
                  <card.icon
                    size={14}
                    className="text-[var(--accent-purple)] shrink-0"
                  />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)]">
                    {card.label}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)] leading-snug">
                  {card.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
