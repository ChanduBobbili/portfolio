'use client'

import { motion } from 'framer-motion'
import { FileText, Mail } from 'lucide-react'
import Galaxy from '@/components/Galaxy'
import { personal } from '@/data/portfolio'
import { AstronautIllustration } from '@/components/ui/AstronautIllustration'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { RainbowButton } from '@/components/ui/rainbow-button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { HoverBorderGradient } from '../ui/hover-border-gradient'
import { GithubIcon } from '../ui/SocialIcons'
import { Badge } from '@/components/ui/badge'
import { Marquee } from '@/components/ui/marquee'

const heroSkills = personal.subTagline.split(' · ')

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
      data-bg="dark"
      className="section-odd bg-black! relative min-h-screen flex items-center overflow-hidden pt-16 pb-8 md:pb-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <Galaxy
          density={0.9}
          glowIntensity={0.35}
          starSpeed={0.35}
          twinkleIntensity={0.35}
          speed={0.5}
          mouseInteraction={true}
          mouseRepulsion={true}
          transparent={true}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 pb-0 md:pb-20 md:py-20 w-full">
        <div className="grid min-w-0 lg:grid-cols-2 gap-4 lg:gap-12 items-center">
          <motion.div initial="hidden" animate="visible" className="w-full min-w-0 max-w-2xl">
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
              I say Great Engineering is where elegant code meets real-world impact.
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
              className="font-heading text-[clamp(1.5rem,1.5vw,2.5rem)] text-primary font-semibold"
            >
              I build production systems that scale and ship measurable results.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              className="relative mt-4 mb-2 md:mb-6 h-9 md:h-11 w-full min-w-0 max-w-full overflow-hidden"
            >
              <Marquee
                pauseOnHover
                className="h-full w-full min-w-0 max-w-full [--duration:30s] [--gap:0.5rem] p-0"
              >
                {heroSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="font-sans text-xs px-3 py-1.5 md:px-3 md:py-3.5 border-foreground/20 bg-foreground/5 text-foreground"
                  >
                    {skill}
                  </Badge>
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-black to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-black to-transparent" />
            </motion.div>

            <HeroButtons className="hidden md:flex mt-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <AstronautIllustration />
            <HeroButtons className="flex md:hidden mx-auto justify-center" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroButtons({ className }: { className?: string }) {
  return (
    <motion.div
      custom={4}
      variants={fadeUp}
      className={cn('flex flex-wrap items-center gap-3', className)}
    >
      <HoverBorderGradient
        as="a"
        href={personal.github}
        target="_blank"
        rel="noopener noreferrer"
        containerClassName="rounded-full w-28 md:w-32 rounded-lg"
        className="h-10 w-full text-sm bg-background text-foreground flex items-center justify-center gap-2"
      >
        <GithubIcon className="size-4" />
        GitHub
      </HoverBorderGradient>

      <RainbowButton size="lg" asChild className="w-28 md:w-32 rounded-lg justify-center text-sm">
        <Link href={personal.resume} target="_blank" rel="noopener noreferrer">
          <FileText size={16} />
          Resume
        </Link>
      </RainbowButton>

      <MagneticButton>
        <Link
          href={`mailto:${personal.email}`}
          className="w-28 md:w-32 rounded-lg justify-center inline-flex h-11 items-center gap-2 text-sm bg-linear-to-b from-blue-500 to-blue-700 px-6 font-medium text-white transition-transform duration-150 active:scale-[0.98]"
        >
          <Mail size={16} />
          Email
        </Link>
      </MagneticButton>
    </motion.div>
  )
}
