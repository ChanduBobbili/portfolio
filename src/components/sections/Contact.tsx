'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useDeviceType } from '@zenithui/utils'
import MagicRings from '@/components/MagicRings'
import { KineticText } from '@/components/ui/kinetic-text'
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '@/components/ui/SocialIcons'
import { personal } from '@/data/portfolio'
import Link from 'next/link'

const CONTACT_LINKS = [
  {
    label: 'Email',
    href: `mailto:${personal.email}`,
    bg: '#EA4335',
    ariaLabel: 'Email Chandu',
    external: false,
    icon: Mail,
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/${personal.whatsapp}`,
    bg: '#25D366',
    ariaLabel: 'WhatsApp Chandu',
    external: true,
    icon: WhatsAppIcon,
  },
  {
    label: 'LinkedIn',
    href: personal.linkedin,
    bg: '#0A66C2',
    ariaLabel: 'LinkedIn profile',
    external: true,
    icon: LinkedinIcon,
  },
  {
    label: 'GitHub',
    href: personal.github,
    bg: '#24292f',
    ariaLabel: 'GitHub profile',
    external: true,
    icon: GithubIcon,
  },
] as const

export function Contact() {
  const { resolvedTheme } = useTheme()
  const deviceType = useDeviceType()
  const isDesktop = deviceType === 'desktop'

  const ringColor = resolvedTheme === 'dark' ? '#7ec0e8' : '#3e92cc'
  const ringColorTwo = resolvedTheme === 'dark' ? '#3e92cc' : '#13293d'

  return (
    <section
      id="contact"
      className="section-odd relative overflow-hidden py-8 md:py-20 min-h-[40vh] md:min-h-[52vh] flex items-center"
    >
      <div className="absolute inset-0 ">
        <MagicRings
          color={ringColor}
          colorTwo={ringColorTwo}
          opacity={isDesktop ? 0.6 : 0.45}
          ringCount={isDesktop ? 8 : 4}
          followMouse={isDesktop}
          speed={isDesktop ? 1 : 0.7}
          mouseInfluence={0.15}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-background/30 dark:bg-background/40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-3xl mx-auto px-4 text-center w-full"
      >
        <div className="mb-4 md:mb-6">
          <KineticText
            text="Let's work together"
            as="h2"
            className="font-heading text-3xl md:text-5xl font-extrabold text-foreground justify-center leading-tight"
          />
        </div>

        <p className="font-sans text-muted-foreground text-base md:text-lg leading-[1.75] mb-8 md:mb-10 max-w-xl mx-auto">
          Open to full-time roles, freelance projects, and interesting collaborations. Best way to
          reach me is email — I reply within 24 hours.
        </p>

        <div className="flex flex-wrap justify-center md:grid grid-cols-4 gap-4  md:gap-3 max-w-2xl mx-auto">
          {CONTACT_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                aria-label={link.ariaLabel}
                className="group relative isolate overflow-hidden flex items-center justify-center gap-2.5 rounded-md md:rounded-xl px-4 md:px-5 py-3 md:py-3.5 font-sans text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
                style={{ backgroundColor: link.bg }}
              >
                <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                  <span className="absolute inset-y-0 left-0 w-2/5 animate-shimmer-sweep bg-linear-to-r from-transparent via-white/40 to-transparent" />
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20"
                />
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <Icon style={{ width: 18, height: 18 }} />
                  {isDesktop && link.label}
                </span>
              </Link>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
