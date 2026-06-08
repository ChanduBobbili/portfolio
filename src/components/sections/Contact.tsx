'use client'

import { motion } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { personal } from '@/data/portfolio'

const SOCIAL_LINKS = [
  {
    href:  personal.github,
    icon:  GithubIcon,
    label: 'GitHub',
  },
  {
    href:  personal.linkedin,
    icon:  LinkedinIcon,
    label: 'LinkedIn',
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.04] dark:opacity-[0.08] blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--accent-purple), var(--accent-cyan), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-[0.04] dark:opacity-[0.07] blur-[80px]"
        style={{ background: 'radial-gradient(circle, var(--accent-green), transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        

        <div className="relative max-w-2xl mx-auto">
          {/* Outer glow ring */}
          <motion.div
            className="absolute -inset-6 rounded-3xl pointer-events-none"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)',
            }}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }}
            className="relative text-center rounded-3xl border border-[var(--border-neon)] overflow-hidden"
            style={{ boxShadow: 'var(--glow-purple), var(--card-shadow)' }}
          >
            {/* Always-on border beam for the contact card */}
            <BorderBeam
              color="var(--accent-purple)"
              duration={6}
              borderRadius={24}
              alwaysVisible
            />

            {/* Card interior — z-10 so it sits above the beam's inner mask */}
            <div className="relative z-10 px-8 sm:px-12 py-14 bg-[var(--bg-surface)]">
              {/* Inner background gradient */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{ background: 'var(--gradient-hero)' }}
              />

              {/* Sparkle icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 mx-auto"
                style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)' }}
              >
                <Sparkles size={24} style={{ color: 'var(--accent-purple)' }} />
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="relative text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-4"
              >
                Let&apos;s work together
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.22 }}
                className="relative text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md mx-auto"
              >
                Open to full-time roles, freelance projects, and interesting collaborations.
                Best way to reach me is email — I reply within 24 hours.
              </motion.p>

              {/* Primary CTA */}
              <motion.a
                href={`mailto:${personal.email}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-medium w-full sm:w-auto bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)] hover:shadow-[var(--glow-purple)] transition-all duration-200 mb-6"
              >
                <Mail size={16} />
                {personal.email}
              </motion.a>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="relative flex items-center gap-3 mb-6"
              >
                <div className="h-px flex-1 bg-[var(--border-default)]" />
                <span className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">or find me on</span>
                <div className="h-px flex-1 bg-[var(--border-default)]" />
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="relative flex justify-center gap-3"
              >
                {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-[var(--btn-secondary-border)] text-[var(--btn-secondary-text)] hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)] hover:shadow-[var(--glow-purple)] transition-all duration-200"
                  >
                    <Icon style={{ width: 15, height: 15 }} />
                    {label}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
