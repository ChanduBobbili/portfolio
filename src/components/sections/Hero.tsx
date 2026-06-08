'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Mail, ArrowRight, FileText, ChevronDown } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { ResumeDialog } from '@/components/ui/ResumeDialog'
import { ResumeFab } from '@/components/ui/ResumeFab'
import { personal } from '@/data/portfolio'
import { cn } from '@/lib/utils'

type ResumeState = 'closed' | 'open' | 'minimized'

// ── Word-mask reveal component ──────────────────────────────────────────────
function WordReveal({
  text,
  accentWord,
  delay = 0,
}: {
  text: string
  accentWord?: string
  delay?: number
}) {
  const before = accentWord ? text.replace(accentWord, '').trim() : text
  const words = before.split(' ')

  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-none mr-[0.22em]">
          <motion.span
            className="inline-block text-[var(--text-primary)]"
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.65, delay: delay + i * 0.09, ease: [0.215, 0.61, 0.355, 1.0] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
      {accentWord && (
        <span className="inline-block overflow-hidden leading-none">
          <motion.span
            className="inline-block"
            style={{ color: 'var(--accent-purple)', textShadow: '0 0 50px rgba(167,139,250,0.5)' }}
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.65, delay: delay + words.length * 0.09, ease: [0.215, 0.61, 0.355, 1.0] }}
          >
            {accentWord}
          </motion.span>
        </span>
      )}
    </>
  )
}

// ── Animation variants ──────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.0, 0.0, 0.2, 1] } },
}

const codeCardVariants: Variants = {
  hidden:  { opacity: 0, x: 48, y: 16 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.75, ease: [0.0, 0.0, 0.2, 1], delay: 0.5 } },
}

// ── Code card data ──────────────────────────────────────────────────────────
const CODE_LINES = [
  { num: 1, indentation: 0, tokens: [{ t: 'const ', c: 'purple' }, { t: 'engineer', c: 'cyan' }, { t: ' = {', c: 'primary' }] },
  { num: 2, indentation: 2, tokens: [{ t: '  name', c: 'cyan' }, { t: ': ', c: 'secondary' }, { t: '"Chandu Bobbili"', c: 'green' }, { t: ',', c: 'secondary' }] },
  { num: 3, indentation: 2, tokens: [{ t: '  stack', c: 'cyan' }, { t: ': ', c: 'secondary' }, { t: '["Go","TypeScript","React"]', c: 'green' }, { t: ',', c: 'secondary' }] },
  { num: 4, indentation: 2, tokens: [{ t: '  builds', c: 'cyan' }, { t: ': ', c: 'secondary' }, { t: '"at scale"', c: 'green' }, { t: ',', c: 'secondary' }] },
  { num: 5, indentation: 2, tokens: [{ t: '  location', c: 'cyan' }, { t: ': ', c: 'secondary' }, { t: '"Hyderabad, India"', c: 'green' }, { t: ',', c: 'secondary' }] },
  { num: 6, indentation: 2, tokens: [{ t: '  open', c: 'cyan' }, { t: ': ', c: 'secondary' }, { t: 'true', c: 'purple' }] },
  { num: 7, indentation: 0, tokens: [{ t: '}', c: 'primary' }] },
]

const TOKEN_COLORS: Record<string, string> = {
  purple:    'var(--accent-purple)',
  cyan:      'var(--accent-cyan)',
  green:     'var(--accent-green)',
  primary:   'var(--text-primary)',
  secondary: 'var(--text-tertiary)',
}

// Pre-compute per-token character offsets (module-level — computed once)
const CHAR_LOOKUP: Record<string, { start: number; end: number }> = {}
let _offset = 0
for (let li = 0; li < CODE_LINES.length; li++) {
  for (let ti = 0; ti < CODE_LINES[li].tokens.length; ti++) {
    const len = CODE_LINES[li].tokens[ti].t.length
    CHAR_LOOKUP[`${li}-${ti}`] = { start: _offset, end: _offset + len }
    _offset += len
  }
}
const TOTAL_CHARS = _offset

const TECH_BADGES = ['TypeScript', 'Go', 'React', 'Kafka', 'K8s', 'ClickHouse']

// ── Component ───────────────────────────────────────────────────────────────
export function Hero() {
  const [resumeState, setResumeState] = useState<ResumeState>('closed')
  const [typed, setTyped] = useState(0)

  // Typewriter effect — starts after code card entrance animation completes
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null

    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        setTyped((prev) => {
          if (prev >= TOTAL_CHARS) {
            if (interval) clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 22)
    }, 1350)

    return () => {
      clearTimeout(startTimer)
      if (interval) clearInterval(interval)
    }
  }, [])

  const isDoneTyping = typed >= TOTAL_CHARS

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      >
        {/* Aurora animated gradient */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15]"
          style={{
            backgroundSize: '400% 400%',
            animation: 'aurora 20s ease infinite',
            backgroundImage: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan), var(--accent-green), var(--accent-purple))',
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--accent-purple) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Hero gradient overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-hero)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-glow-top)' }} />

        {/* Blobs */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.06] dark:opacity-[0.11] blur-[100px] animate-float-slow"
          style={{ background: 'radial-gradient(circle, var(--accent-purple), transparent 70%)' }} />
        <div className="absolute top-1/3 -right-16 w-80 h-80 rounded-full pointer-events-none opacity-[0.05] dark:opacity-[0.09] blur-[70px] animate-float-medium"
          style={{ background: 'radial-gradient(circle, var(--accent-cyan), transparent 70%)' }} />
        <div className="absolute bottom-10 -left-10 w-64 h-64 rounded-full pointer-events-none opacity-[0.04] dark:opacity-[0.07] blur-[60px]"
          style={{ background: 'radial-gradient(circle, var(--accent-green), transparent 70%)', animation: 'float-medium 13s ease-in-out infinite', animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full pointer-events-none opacity-[0.03] dark:opacity-[0.06] blur-[50px]"
          style={{ background: 'radial-gradient(circle, var(--accent-pink), transparent 70%)', animation: 'float-slow 16s ease-in-out infinite', animationDelay: '6s' }} />

        {/* Horizontal glow line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px pointer-events-none opacity-[0.05] dark:opacity-[0.10]"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent-purple), var(--accent-cyan), transparent)' }} />

        {/* ── Main content ── */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

            {/* ── Left: text ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 max-w-2xl"
            >
              {/* Eyebrow + badge */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[var(--text-tertiary)]">
                  Hi, I&apos;m Chandu &mdash; {personal.role}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border bg-[rgba(52,211,153,0.10)] text-[var(--accent-green)] border-[rgba(52,211,153,0.25)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                  Available for hire
                </span>
              </motion.div>

              {/* Heading — word-mask reveal */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] mb-5">
                <WordReveal text={personal.tagline} accentWord={personal.taglineAccent} delay={0.15} />
              </h1>

              {/* Subtitle */}
              <motion.p variants={itemVariants} className="text-base sm:text-lg text-[var(--text-secondary)] mb-2 font-mono">
                {personal.subTagline}
              </motion.p>

              {/* Location */}
              <motion.p variants={itemVariants} className="text-sm text-[var(--text-tertiary)] mb-10">
                Based in {personal.location}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">

                {/* ── Shimmer primary button ── */}
                <a
                  href={`mailto:${personal.email}`}
                  className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)] hover:shadow-[var(--glow-purple)] transition-all duration-300"
                >
                  {/* Shimmer sweep — runs continuously every ~4s */}
                  <motion.span
                    className="absolute inset-0 -skew-x-12 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)' }}
                    animate={{ x: ['-150%', '150%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
                  />
                  <Mail size={16} className="relative z-10 shrink-0" />
                  <span className="relative z-10">Get in touch</span>
                </a>

                <button
                  onClick={() => setResumeState('open')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-[var(--accent-purple)] text-[var(--accent-purple)] hover:bg-[rgba(167,139,250,0.08)] hover:shadow-[var(--glow-purple)] transition-all duration-200 cursor-pointer"
                >
                  <FileText size={16} />
                  View Resume
                </button>

                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border border-[var(--btn-secondary-border)] text-[var(--btn-secondary-text)] hover:border-[var(--accent-purple)] hover:shadow-[var(--glow-purple)] transition-all duration-200"
                >
                  <GithubIcon style={{ width: 16, height: 16 }} />
                  GitHub
                  <ArrowRight size={14} className="opacity-50" />
                </a>
              </motion.div>
            </motion.div>

            {/* ── Right: Floating code card ── */}
            <motion.div
              variants={codeCardVariants}
              initial="hidden"
              animate="visible"
              className="hidden lg:block shrink-0 w-[390px]"
            >
              {/* Outer glow ring */}
              <div
                className="absolute -inset-4 rounded-2xl pointer-events-none animate-pulse-ring"
                style={{ background: 'radial-gradient(ellipse, rgba(167,139,250,0.10) 0%, transparent 70%)' }}
              />

              {/* Card — no animated shadow; clean border only */}
              <div className="relative rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
                {/* Accent top border line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1.5px]"
                  style={{ background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan), transparent)' }}
                />

                {/* Terminal title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-auto text-[11px] font-mono text-[var(--text-tertiary)]">chandu.ts</span>
                </div>

                {/* Code body — typewriter */}
                <div className="p-4 font-mono text-[12.5px] leading-7 min-h-[178px]">
                  {CODE_LINES.map((line, li) => {
                    // Check if this line has started appearing
                    const firstEntry = CHAR_LOOKUP[`${li}-0`]
                    if (typed <= firstEntry.start && li > 0) return null

                    return (
                      <div key={li} className={cn("flex items-start")} >
                        <span className="select-none w-6 text-right mr-4 text-[var(--text-tertiary)] opacity-40 text-[11px] leading-7 shrink-0">
                          {line.num}
                        </span>
                        <span className="flex flex-wrap gap-1" style={{ paddingLeft: line.indentation * 8 }}>
                          {line.tokens.map((tok, ti) => {
                            const entry = CHAR_LOOKUP[`${li}-${ti}`]
                            const visibleLen = Math.max(0, Math.min(tok.t.length, typed - entry.start))
                            return (
                              <span key={ti} style={{ color: TOKEN_COLORS[tok.c] }}>
                                {tok.t.slice(0, visibleLen)}
                              </span>
                            )
                          })}
                        </span>
                      </div>
                    )
                  })}

                  {/* Blinking cursor */}
                  <div className="flex items-start mt-0.5">
                    {isDoneTyping && (
                      <span className="select-none w-6 text-right mr-4 text-[var(--text-tertiary)] opacity-40 text-[11px] leading-7 shrink-0">
                        8
                      </span>
                    )}
                    <motion.span
                      className="inline-block w-[7px] h-[1.1em] rounded-[2px]"
                      style={{ backgroundColor: 'var(--accent-purple)', marginTop: '2px' }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {TECH_BADGES.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.4 + i * 0.07, duration: 0.35 }}
                    className="px-3 py-1 rounded-lg text-[11px] font-mono bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)] transition-colors duration-200 cursor-default"
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
          transition={{ delay: 2.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-tertiary)]"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={14} />
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
