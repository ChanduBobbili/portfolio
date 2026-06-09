'use client'

import { motion } from 'framer-motion'
import { skills } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SpaceCard } from '@/components/ui/SpaceCard'
import { Badge } from '@/components/ui/badge'

export function Skills() {
  return (
    <section id="skills" className="section-even relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle className="mb-12">Skills</SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.07, ease: [0, 0, 0.2, 1] }}
              whileHover={{ y: -4 }}
            >
              <SpaceCard
                className="overflow-hidden flex flex-col"
                style={{ borderColor: 'color-mix(in srgb, var(--brand) 20%, transparent)' }}
              >
                <div className="px-5 pt-5 pb-4 border-b border-border">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0 bg-brand"
                      style={{
                        boxShadow: '0 0 8px color-mix(in srgb, var(--brand) 50%, transparent)',
                      }}
                    />
                    <p className="font-sans text-[11px] uppercase tracking-[0.12em] font-semibold text-brand">
                      {group.category}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, ii) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.28, delay: gi * 0.04 + ii * 0.03 }}
                      >
                        <Badge variant="secondary" className="font-sans rounded-lg text-[0.6875rem]">
                          {item}
                        </Badge>
                      </motion.span>
                    ))}
                  </div>
                </div>
              </SpaceCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
