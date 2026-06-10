'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { personal } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/button'

export function Contact() {
  return (
    <section id="contact" className="section-odd relative overflow-hidden py-8 md:py-20">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
            style={{ background: 'var(--glow-radial)' }}
          />

          <SectionTitle className="mb-2 md:mb-6" reveal={false}>
            Let&apos;s work together
          </SectionTitle>

          <p className="relative text-muted-foreground leading-[1.75] mb-8">
            Open to full-time roles, freelance projects, and interesting collaborations. Best way to
            reach me is email — I reply within 24 hours.
          </p>

          <div className="relative flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Button size="lg" asChild>
              <a href={`mailto:${personal.email}`}>
                <Mail size={16} />
                {personal.email}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={personal.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon style={{ width: 16, height: 16 }} />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon style={{ width: 16, height: 16 }} />
                LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
