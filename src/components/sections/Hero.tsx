'use client'

import { motion } from 'framer-motion'
import { FileText, Mail } from 'lucide-react'
import Galaxy from '@/components/Galaxy'
import { SectionZoomReveal } from '@/components/layout/SectionZoomReveal'
import { personal } from '@/data/portfolio'
import { AstronautIllustration } from '@/components/ui/AstronautIllustration'
import { MagneticButton } from '@/components/ui/magnetic-button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { HoverBorderGradient } from '../ui/hover-border-gradient'
import { GithubIcon } from '../ui/SocialIcons'
import { Marquee } from '../ui/marquee'

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
    <SectionZoomReveal
      mode="exit"
      id="hero"
      data-bg="dark"
      className="section-odd bg-black! relative min-h-screen flex items-center overflow-hidden pb-8 md:pb-20"
      contentClassName="max-w-7xl mx-auto px-4 py-10 pb-0 md:pb-20 md:py-20 w-full"
      background={
        <div className="absolute inset-0 pointer-events-none">
          <Galaxy
            density={0.9}
            glowIntensity={0.1}
            starSpeed={0.35}
            twinkleIntensity={0.35}
            speed={0.5}
            mouseInteraction={true}
            mouseRepulsion={true}
            transparent={true}
          />
        </div>
      }
    >
      <div className="grid min-w-0 lg:grid-cols-2 gap-4 lg:gap-0 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          className="w-full min-w-0 max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
        >
          <motion.p
            custom={0}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: (i: number) => ({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: i * 0.15, ease: [0, 0, 0.2, 1] as const },
              }),
            }}
            className="font-sans text-xs md:text-base text-foreground/50 mb-3 leading-snug"
          >
            Great engineering merges elegant code with real-world impact.
          </motion.p>

          <motion.h1
            custom={1}
            variants={{
              hidden: { opacity: 0, y: -40 },
              visible: (i: number) => ({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: i * 0.25, ease: [0, 0, 0.2, 1] as const },
              }),
            }}
            className="font-heading text-[clamp(2rem,2.5vw,3.5rem)] font-extrabold tracking-[0.02em] leading-[1.05] text-foreground mb-2 md:mb-4"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            custom={3}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: (i: number) => ({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: i * 0.15, ease: [0, 0, 0.2, 1] as const },
              }),
            }}
            className="font-heading text-xl md:text-2xl text-primary font-semibold"
          >
            Architecting scalable environments designed to maximize business ROI.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            className="hidden lg:flex flex-row gap-2 mt-2 lg:mt-4"
          >
            {personal.missionStats.map((stat, i) => (
              <motion.p
                key={stat.label}
                custom={i * 0.75}
                variants={fadeUp}
                className="flex lg:flex-col gap-1 lg:max-w-28"
              >
                <span className="font-bold text-sm lg:text-base xl:text-lg text-primary">
                  {stat.value}
                </span>
                <span className="text-xs xl:text-sm">{stat.label}</span>
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            className="relative h-9 w-full min-w-0 max-w-full overflow-hidden lg:hidden"
          >
            <Marquee
              pauseOnHover
              className="h-full w-full min-w-0 max-w-full [--duration:30s] [--gap:1rem] p-0"
            >
              {personal.missionStats.map((stat, i) => (
                <motion.p
                  key={stat.label}
                  custom={i * 0.75}
                  variants={fadeUp}
                  className="flex lg:flex-col gap-1 lg:max-w-28 items-center"
                >
                  <span className="font-bold text-sm lg:text-base xl:text-lg text-primary">
                    {stat.value}
                  </span>
                  <span className="text-xs xl:text-sm">{stat.label}</span>
                </motion.p>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-black to-transparent" />
          </motion.div>

          <HeroButtons className="hidden lg:flex mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative"
        >
          <AstronautIllustration />
          <HeroButtons className="flex lg:hidden mx-auto justify-center" />
        </motion.div>
      </div>
    </SectionZoomReveal>
  )
}

function HeroButtons({ className }: { className?: string }) {
  return (
    <motion.div
      custom={6}
      variants={fadeUp}
      className={cn('flex flex-wrap items-start md:items-center gap-2', className)}
    >
      <MagneticButton>
        <Link
          href={`mailto:${personal.email}`}
          className="inline-flex h-11 md:h-12 items-center gap-2 rounded-lg bg-linear-to-b from-blue-500 to-blue-700 px-6 md:px-8 text-sm md:text-base font-semibold text-white shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_40%,transparent)] transition-transform duration-150 active:scale-[0.98]"
        >
          <Mail size={16} />
          Email me
        </Link>
      </MagneticButton>

      <HoverBorderGradient
        as="a"
        href={personal.resume}
        target="_blank"
        rel="noopener noreferrer"
        containerClassName="rounded-full w-28 md:w-32 rounded-lg"
        className="h-10 w-full text-sm bg-background text-foreground flex items-center justify-center gap-2"
      >
        <FileText className="size-4" />
        Resume
      </HoverBorderGradient>

      <HoverBorderGradient
        as="a"
        href={personal.github}
        target="_blank"
        rel="noopener noreferrer"
        containerClassName="rounded-full w-fit md:w-32 rounded-lg"
        className="h-10 w-full text-sm bg-background text-foreground flex items-center justify-center gap-2"
      >
        <GithubIcon className="size-4" />
        <span className="hidden md:inline">GitHub</span>
      </HoverBorderGradient>
    </motion.div>
  )
}
