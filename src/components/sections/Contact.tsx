'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { personal } from '@/data/portfolio'

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-2xl mx-auto">
          {/* Subtle background glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
            style={{ background: 'var(--gradient-hero)' }}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="
              relative text-center px-8 py-14 rounded-2xl
              bg-[var(--bg-surface)]
              border border-[var(--border-neon)]
              shadow-[var(--glow-purple)]
              dark:border-[var(--border-neon)] dark:shadow-[var(--glow-purple)]
            "
          >
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-4"
            >
              Let&apos;s work together
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md mx-auto"
            >
              Open to full-time roles, freelance projects, and interesting collaborations.
              Best way to reach me is email — I reply within 24 hours.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
            >
              <a
                href={`mailto:${personal.email}`}
                className="
                  flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium
                  bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]
                  hover:bg-[var(--btn-primary-hover)]
                  hover:shadow-[var(--glow-purple)]
                  transition-all duration-200
                "
              >
                <Mail size={15} />
                {personal.email}
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium
                  border border-[var(--btn-secondary-border)]
                  text-[var(--btn-secondary-text)]
                  hover:border-[var(--accent-purple)]
                  hover:shadow-[var(--glow-purple)]
                  transition-all duration-200
                "
              >
                <GithubIcon style={{ width: 15, height: 15 }} />
                GitHub
              </a>
            </motion.div>

            {/* LinkedIn */}
            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--accent-purple)] transition-colors"
            >
              <LinkedinIcon style={{ width: 13, height: 13 }} />
              linkedin.com/in/chandu-bobbili-15863319b
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
