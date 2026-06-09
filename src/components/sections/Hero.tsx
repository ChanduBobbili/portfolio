'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { personal } from '@/data/portfolio'
import { AstronautIllustration } from '@/components/ui/AstronautIllustration'
import { Starfield } from '@/components/ui/Starfield'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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
    <section
      id="hero"
      className="section-odd relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      <Starfield density={36} />

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-heading text-[clamp(2rem,2.5vw,3.5rem)] font-extrabold tracking-[0.02em] leading-[1.05] text-foreground mb-3"
            >
              {personal.name}
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="font-heading text-lg font-semibold text-brand mb-4"
            >
              {personal.role}
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              className="font-sans text-lg text-muted-foreground italic mb-2"
            >
              &ldquo;{personal.tagline}&rdquo;
            </motion.p>

            <motion.p
              custom={4}
              variants={fadeUp}
              className="font-sans text-sm text-muted-foreground mb-8"
            >
              {personal.subTagline}
            </motion.p>

            <motion.div custom={5} variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              <Button size="lg" asChild>
                <a href={`mailto:${personal.email}`}>
                  <Mail size={16} />
                  Get in touch
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={personal.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon style={{ width: 16, height: 16 }} />
                  GitHub
                </a>
              </Button>
            </motion.div>

            <motion.div custom={6} variants={fadeUp} className="flex flex-wrap gap-2">
              {personal.stats.map((stat) => (
                <Badge
                  key={stat.label}
                  variant="secondary"
                  className="font-sans h-auto px-4 py-2 text-xs"
                >
                  <strong className="text-brand font-semibold">{stat.value}</strong> {stat.label}
                </Badge>
              ))}
            </motion.div>
          </motion.div>

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
