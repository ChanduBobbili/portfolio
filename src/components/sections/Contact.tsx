'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { personal } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'

export function Contact() {
  return (
    <section id="contact" className="section-odd relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* <SectionLabel className="text-center">OPEN CHANNEL</SectionLabel> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Radial glow behind heading */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
            style={{ background: 'var(--glow-radial)' }}
          />

          <SectionTitle className="relative mb-4" reveal={false}>
            Let&apos;s work together
          </SectionTitle>

          <p className="relative text-text-secondary leading-[1.75] mb-8">
            Open to full-time roles, freelance projects, and interesting collaborations. Best way to
            reach me is email — I reply within 24 hours.
          </p>

          <div className="relative flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <a href={`mailto:${personal.email}`} className="btn-primary">
              <Mail size={16} />
              {personal.email}
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <GithubIcon style={{ width: 16, height: 16 }} />
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <LinkedinIcon style={{ width: 16, height: 16 }} />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
