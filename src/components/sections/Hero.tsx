'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { personal } from '@/data/portfolio'
import { AstronautIllustration } from '@/components/ui/AstronautIllustration'
import { Starfield } from '@/components/ui/Starfield'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0, 0, 0.2, 1] as const },
  }),
}

export function Hero() {
  return (
    <section id="hero" className="section-odd relative min-h-screen flex items-center overflow-hidden pt-16">
      <Starfield density={36} />

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.h1 custom={1} variants={fadeUp} className="text-display-hero text-text-primary mb-3">
              {personal.name}
            </motion.h1>

            <motion.p custom={2} variants={fadeUp} className="font-display text-lg font-semibold text-accent mb-4">
              {personal.role}
            </motion.p>

            <motion.p custom={3} variants={fadeUp} className="text-lg text-text-secondary italic mb-2">
              &ldquo;{personal.tagline}&rdquo;
            </motion.p>

            <motion.p custom={4} variants={fadeUp} className="font-mono-tech text-sm text-text-tertiary mb-8">
              {personal.subTagline}
            </motion.p>

            <motion.div custom={5} variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              <a href={`mailto:${personal.email}`} className="btn-primary">
                <Mail size={16} />
                Get in touch
              </a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <GithubIcon style={{ width: 16, height: 16 }} />
                GitHub
              </a>
            </motion.div>

            <motion.div custom={6} variants={fadeUp} className="flex flex-wrap gap-2">
              {personal.stats.map((stat) => (
                <span key={stat.label} className="pill-stat">
                  <strong>{stat.value}</strong> {stat.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <AstronautIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
