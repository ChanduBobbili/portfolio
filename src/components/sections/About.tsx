'use client'

import { motion } from 'framer-motion'
import { MapPin, Briefcase, GraduationCap, Zap } from 'lucide-react'
import { personal } from '@/data/portfolio'

const cards = [
  { icon: Briefcase,     label: 'Currently', value: personal.currentRole, accent: 'purple' },
  { icon: Zap,           label: 'Open to',   value: personal.openTo,      accent: 'cyan'   },
  { icon: GraduationCap, label: 'Education', value: personal.education,   accent: 'green'  },
  { icon: MapPin,        label: 'Based in',  value: personal.location,    accent: 'purple' },
]

const ICON_BG: Record<string, string> = {
  purple: 'rgba(167,139,250,0.12)',
  cyan:   'rgba(34,211,238,0.12)',
  green:  'rgba(52,211,153,0.12)',
}

const ICON_COLOR: Record<string, string> = {
  purple: 'var(--accent-purple)',
  cyan:   'var(--accent-cyan)',
  green:  'var(--accent-green)',
}

export function About() {
  return (
    <section id="about" className="py-24 section-alt relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-[0.03] dark:opacity-[0.05] blur-[80px]"
        style={{ background: 'radial-gradient(circle, var(--accent-purple), transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-6 leading-tight">
              A bit about me
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
              {personal.about}
            </p>
          </motion.div>

            </div>
    </section>
  )
}
