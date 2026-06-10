'use client'

import { experience } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ExperienceStickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { motion } from 'motion/react'

export function WorkExperience() {
  return (
    <section id="work" className="section-odd relative py-8 md:py-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="max-w-7xl mx-auto px-4"
      >
        <SectionTitle>Work Experience</SectionTitle>

        <ExperienceStickyScroll entries={experience} />
      </motion.div>
    </section>
  )
}
