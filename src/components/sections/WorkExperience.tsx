'use client'

import { experience } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ExperienceStickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { motion } from 'motion/react'
import { useRef } from 'react'
import { VariableProximity } from '../ui/variable-proximity'

export function WorkExperience() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="work" className="section-odd relative py-8 md:py-20">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="max-w-7xl mx-auto px-4"
      >
        <h2 className="font-heading md:text-base text-sm font-bold tracking-normal text-brand">
          <VariableProximity
            label="Work Experience"
            containerRef={containerRef}
            fromFontVariationSettings="'wght' 400, 'wdth' 100"
            toFontVariationSettings="'wght' 900, 'wdth' 125"
            radius={120}
            falloff="gaussian"
          />
        </h2>
        <SectionTitle>Where I&apos;ve worked</SectionTitle>

        <ExperienceStickyScroll entries={experience} />
      </motion.div>
    </section>
  )
}
