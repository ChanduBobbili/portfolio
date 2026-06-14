'use client'

import { motion } from 'framer-motion'
import { FileText, Mail } from 'lucide-react'
import Galaxy from '@/components/Galaxy'
import TrueFocus from '@/components/TrueFocus'
import { TextType } from '@/components/ui/text-type'
import { personal } from '@/data/portfolio'
import { AstronautIllustration } from '@/components/ui/AstronautIllustration'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { RainbowButton } from '@/components/ui/rainbow-button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 items-center">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
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
              className="font-sans text-xs md:text-base text-primary mb-3 leading-snug"
            >
              I build production systems that scale and ship measurable results.
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
              className="font-heading text-[clamp(2rem,2.5vw,3.5rem)] font-extrabold tracking-[0.02em] leading-[1.05] text-foreground mb-4"
            >
              {personal.name}
            </motion.h1>

            <motion.div custom={3} variants={fadeUp} className="min-h-20">
              <TextType
                as="p"
                text="I say Great Engineering is where elegant code meets real-world impact."
                typingSpeed={55}
                initialDelay={1000}
                showCursor={true}
                cursorCharacter="|"
                cursorClassName="text-foreground/50 font-medium"
                className="font-heading text-base md:text-2xl text-foreground/50 font-semibold"
              />
            </motion.div>

            <motion.div custom={4} variants={fadeUp} className="mb-2 md:mb-8">
              <TrueFocus
                sentence="TypeScript · Go · React · Microservices."
                separator=" · "
                blurAmount={3}
                borderColor="var(--primary)"
                glowColor="color-mix(in srgb, var(--primary) 60%, transparent)"
                animationDuration={0.4}
                pauseBetweenAnimations={1.2}
                className="justify-start gap-2 md:gap-3"
                wordClassName="text-sm md:text-base font-semibold text-foreground cursor-default"
              />
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
      <MagneticButton>
        <Link
          href={`mailto:${personal.email}`}
          className="w-32 md:w-auto justify-center inline-flex h-11 items-center gap-2 rounded-lg bg-linear-to-b from-blue-500 to-blue-700 px-6 text-sm font-medium text-white transition-transform duration-150 active:scale-[0.98]"
        >
          <Mail size={16} />
          Email
        </Link>
      </MagneticButton>

      <RainbowButton size="lg" asChild className="w-32 md:w-auto justify-center">
        <Link href={personal.resume} target="_blank" rel="noopener noreferrer">
          <FileText size={16} />
          Resume
        </Link>
      </RainbowButton>
    </motion.div>
  )
}
