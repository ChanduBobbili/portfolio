'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Mail, ArrowRight, FileText, ChevronDown } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { ResumeDialog } from '@/components/ui/ResumeDialog'
import { ResumeFab } from '@/components/ui/ResumeFab'
import { personal } from '@/data/portfolio'

type ResumeState = 'closed' | 'open' | 'minimized'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.0, 0.0, 0.2, 1] } },
}

const CODE_LINES = [
  { indent: 0, tokens: [{ t: 'const', c: 'purple' }, { t: 'engineer = {', c: 'primary' }] },
  { indent: 1, tokens: [{ t: 'name', c: 'cyan' }, { t: ': ', c: 'secondary' }, { t: '"Chandu Bobbili"', c: 'green' }, { t: ',', c: 'secondary' }] },
  { indent: 1, tokens: [{ t: 'stack', c: 'cyan' }, { t: ': ', c: 'secondary' }, { t: '["Go", "TypeScript", "React"]', c: 'green' }, { t: ',', c: 'secondary' }] },
  { indent: 1, tokens: [{ t: 'builds', c: 'cyan' }, { t: ': ', c: 'secondary' }, { t: '"at scale"', c: 'green' }, { t: ',', c: 'secondary' }] },
  { indent: 1, tokens: [{ t: 'location', c: 'cyan' }, { t: ': ', c: 'secondary' }, { t: '"Hyderabad, India"', c: 'green' }, { t: ',', c: 'secondary' }] },
  { indent: 1, tokens: [{ t: 'open', c: 'cyan' }, { t: ': ', c: 'secondary' }, { t: 'true', c: 'purple' }] },
  { indent: 0, tokens: [{ t: '}', c: 'primary' }] },
]

const TOKEN_COLORS: Record<string, string> = {
  purple:    'var(--accent-purple)',
  cyan:      'var(--accent-cyan)',
  green:     'var(--accent-green)',
  primary:   'var(--text-primary)',
  secondary: 'var(--text-tertiary)',
}

const codeCardVariants: Variants = {
  hidden:  { opacity: 0, x: 40, y: 20 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: [0.0, 0.0, 0.2, 1], delay: 0.5 } },
}

const lineVariants: Variants = {
  hidden:  { opacity: 0, x: 12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.0, 0.0, 0.2, 1], delay: 0.75 + i * 0.07 },
  }),
}

export function Hero() {
  const [resumeState, setResumeState] = useState<ResumeState>('closed')

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      >
        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--accent-purple) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Background gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--gradient-hero)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--gradient-glow-top)' }}
        />

        {/* Decorative blobs — larger, more dramatic */}
        <motion.div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[var(--accent-purple)] opacity-[0.07] dark:opacity-[0.12] blur-[80px] pointer-events-none"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 -right-10 w-72 h-72 rounded-full bg-[var(--accent-cyan)] opacity-[0.06] dark:opacity-[0.10] blur-[60px] pointer-events-none"
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-56 h-56 rounded-full bg-[var(--accent-green)] opacity-[0.05] dark:opacity-[0.08] blur-[50px] pointer-events-none"
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />

        {/* Horizontal glow line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px pointer-events-none opacity-[0.06] dark:opacity-[0.12]"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent-purple), var(--accent-cyan), transparent)' }}
        />

        {/* Main layout — content + code card side by side on desktop */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

            {/* ── Left: Text content ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 max-w-2xl"
            >
              {/* Greeting + availability badge */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-5">
                <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[var(--text-secondary)]">
                  Hi, I&apos;m Chandu &mdash; {personal.role}
                </p>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border bg-[rgba(52,211,153,0.10)] text-[var(--accent-green)] border-[rgba(52,211,153,0.25)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                  Available for hire
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--text-primary)] leading-[1.05] mb-5"
              >
                {personal.tagline.replace(personal.taglineAccent, '').trim()}{' '}
                <span
                  className="text-[var(--accent-purple)]"
                  style={{ textShadow: '0 0 40px rgba(167,139,250,0.4)' }}
                >
                  {personal.taglineAccent}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-[var(--text-secondary)] mb-3 font-mono"
              >
                {personal.subTagline}
              </motion.p>

              {/* Location */}
              <motion.p
                variants={itemVariants}
                className="text-sm text-[var(--text-tertiary)] mb-10"
              >
                Based in {personal.location}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="
                    flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium
                    bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]
                    hover:bg-[var(--btn-primary-hover)]
                    hover:shadow-[var(--glow-purple)]
                    transition-all duration-200
                  "
                >
                  <Mail size={16} />
                  Get in touch
                </a>
                <button
                  onClick={() => setResumeState('open')}
                  className="
                    flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium
                    border border-[var(--accent-purple)]
                    text-[var(--accent-purple)]
                    hover:bg-[rgba(167,139,250,0.08)]
                    hover:shadow-[var(--glow-purple)]
                    transition-all duration-200 cursor-pointer
                  "
                >
                  <FileText size={16} />
                  View Resume
                </button>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium
                    border border-[var(--btn-secondary-border)]
                    text-[var(--btn-secondary-text)]
                    hover:border-[var(--accent-purple)]
                    hover:shadow-[var(--glow-purple)]
                    transition-all duration-200
                  "
                >
                  <GithubIcon style={{ width: 16, height: 16 }} />
                  GitHub
                  <ArrowRight size={14} className="opacity-60" />
                </a>
              </motion.div>
            </motion.div>

            {/* ── Right: Floating code card (desktop only) ── */}
            <motion.div
              variants={codeCardVariants}
              initial="hidden"
              animate="visible"
              className="hidden lg:block shrink-0 w-[360px]"
            >
              <div
                className="relative rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden"
                style={{ boxShadow: 'var(--glow-purple), 0 20px 40px rgba(0,0,0,0.3)' }}
              >
                {/* Terminal title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-2 text-[11px] font-mono text-[var(--text-tertiary)]">chandu.ts</span>
                </div>

                {/* Code body */}
                <div className="p-5 font-mono text-[13px] leading-7">
                  {CODE_LINES.map((line, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={lineVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex gap-1.5"
                      style={{ paddingLeft: line.indent * 16 }}
                    >
                      {line.tokens.map((tok, j) => (
                        <span key={j} style={{ color: TOKEN_COLORS[tok.c] }}>
                          {tok.t}
                        </span>
                      ))}
                    </motion.div>
                  ))}

                  {/* Blinking cursor */}
                  <motion.span
                    className="inline-block w-2 h-4 mt-1 rounded-sm"
                    style={{ backgroundColor: 'var(--accent-purple)' }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Floating tech badges below the card */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {['TypeScript', 'Go', 'React', 'Kafka', 'K8s', 'ClickHouse'].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + i * 0.08, duration: 0.35 }}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[var(--text-tertiary)]"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      <ResumeDialog
        open={resumeState === 'open'}
        onClose={() => setResumeState('closed')}
        onMinimize={() => setResumeState('minimized')}
      />

      <AnimatePresence>
        {resumeState === 'minimized' && (
          <motion.div
            key="resume-fab"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: [0.0, 0.0, 0.2, 1] }}
            className="fixed inset-0 z-[99] pointer-events-none"
          >
            <ResumeFab onExpand={() => setResumeState('open')} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
