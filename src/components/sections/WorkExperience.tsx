'use client'

import { experience } from '@/data/portfolio'
import { SectionZoomReveal } from '@/components/layout/SectionZoomReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ExperienceStickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { useRef } from 'react'
import { VariableProximity } from '../ui/variable-proximity'

export function WorkExperience() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <SectionZoomReveal
      id="work"
      data-bg="dark"
      className="section-odd relative py-6 md:py-12"
      contentClassName="max-w-7xl mx-auto px-4"
    >
      <h2 className="font-heading md:text-base text-sm font-bold tracking-normal text-primary">
        <VariableProximity
          label="Work Experience"
          containerRef={containerRef}
          fromFontVariationSettings="'wght' 400, 'wdth' 100"
          toFontVariationSettings="'wght' 900, 'wdth' 125"
          radius={120}
          falloff="gaussian"
        />
      </h2>
      <SectionTitle>Where I&apos;ve shipped at scale</SectionTitle>

      <ExperienceStickyScroll entries={experience} />
    </SectionZoomReveal>
  )
}
