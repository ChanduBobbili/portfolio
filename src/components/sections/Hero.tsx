'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Mail, ArrowRight, FileText, ChevronDown, Satellite, Globe } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { ResumeDialog } from '@/components/ui/ResumeDialog'
import { ResumeFab } from '@/components/ui/ResumeFab'
import { HudPanel } from '@/components/ui/HudPanel'
import { personal } from '@/data/portfolio'

type ResumeState = 'closed' | 'open' | 'minimized'

function AstronautSVG() {
  return (
    <svg viewBox="0 0 120 165" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="42" r="32" fill="url(#astroSuit)" stroke="url(#astroEdge)" strokeWidth="1.5" />
      <ellipse cx="60" cy="44" rx="20" ry="16" fill="url(#astroVisor)" />
      <ellipse cx="53" cy="39" rx="7" ry="4.5" fill="rgba(255,255,255,0.12)" />
      <ellipse cx="67" cy="38" rx="3" ry="2" fill="rgba(255,255,255,0.07)" />
      <circle cx="60" cy="42" r="32" fill="none" stroke="url(#astroGlow)" strokeWidth="0.8" opacity="0.6" />
      <rect x="47" y="70" width="26" height="10" rx="5" fill="url(#astroSuit)" stroke="url(#astroEdge)" strokeWidth="0.8" />
      <rect x="35" y="78" width="50" height="58" rx="18" fill="url(#astroSuit)" stroke="url(#astroEdge)" strokeWidth="1" />
      <rect x="11" y="84" width="27" height="17" rx="8.5" fill="url(#astroSuit)" stroke="url(#astroEdge)" strokeWidth="0.8" />
      <rect x="82" y="84" width="27" height="17" rx="8.5" fill="url(#astroSuit)" stroke="url(#astroEdge)" strokeWidth="0.8" />
      <circle cx="11" cy="92.5" r="7.5" fill="#1A2A4A" stroke="rgba(34,211,238,0.35)" strokeWidth="0.8" />
      <circle cx="109" cy="92.5" r="7.5" fill="#1A2A4A" stroke="rgba(34,211,238,0.35)" strokeWidth="0.8" />
      <rect x="39" y="133" width="18" height="30" rx="9" fill="url(#astroSuit)" stroke="url(#astroEdge)" strokeWidth="0.8" />
      <rect x="63" y="133" width="18" height="30" rx="9" fill="url(#astroSuit)" stroke="url(#astroEdge)" strokeWidth="0.8" />
      <rect x="47" y="92" width="26" height="20" rx="5" fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.28)" strokeWidth="0.6" />
      <circle cx="60" cy="102" r="3.5" fill="var(--accent-stellar, #22D3EE)" opacity="0.9" />
      <circle cx="60" cy="102" r="3.5" fill="var(--accent-stellar, #22D3EE)" opacity="0.3">
        <animate attributeName="r" values="3.5;6;3.5" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <rect x="82" y="85" width="18" height="38" rx="6" fill="#0C0C22" stroke="rgba(34,211,238,0.2)" strokeWidth="0.6" />
      <rect x="85" y="95" width="12" height="2" rx="1" fill="rgba(34,211,238,0.2)" />
      <rect x="85" y="101" width="12" height="2" rx="1" fill="rgba(34,211,238,0.2)" />
      <rect x="85" y="107" width="12" height="2" rx="1" fill="rgba(34,211,238,0.2)" />
      <rect x="37" y="160" width="22" height="5" rx="2.5" fill="#1A2A4A" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5" />
      <rect x="61" y="160" width="22" height="5" rx="2.5" fill="#1A2A4A" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="astroSuit" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E2D50" />
          <stop offset="55%" stopColor="#243460" />
          <stop offset="100%" stopColor="#162040" />
        </linearGradient>
        <linearGradient id="astroVisor" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#001428" stopOpacity="0.97" />
          <stop offset="100%" stopColor="#002850" stopOpacity="0.99" />
        </linearGradient>
        <linearGradient id="astroEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(34,211,238,0.5)" />
          <stop offset="100%" stopColor="rgba(168,85,247,0.25)" />
        </linearGradient>
        <linearGradient id="astroGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(34,211,238,0.6)" />
          <stop offset="50%" stopColor="rgba(168,85,247,0.4)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0.2)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function SatelliteChip({ label, accent }: { label: string; accent: 'cyan' | 'purple' | 'green' | 'solar' }) {
  const styles = {
    cyan:   { bg: 'rgba(34,211,238,0.10)',  border: 'rgba(34,211,238,0.4)',  color: 'var(--accent-stellar)' },
    purple: { bg: 'rgba(168,85,247,0.10)',  border: 'rgba(168,85,247,0.4)', color: 'var(--accent-nebula)'  },
    green:  { bg: 'rgba(52,211,153,0.10)',  border: 'rgba(52,211,153,0.4)', color: 'var(--accent-aurora)'  },
    solar:  { bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.4)', color: 'var(--accent-solar)'   },
  }
  const s = styles[accent]
  return (
    <div
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        borderRadius: '24px',
        padding: '3px 9px',
        fontSize: '10px',
        fontFamily: 'var(--font-mono, monospace)',
        fontWeight: 600,
        letterSpacing: '0.06em',
        backdropFilter: 'blur(10px)',
        whiteSpace: 'nowrap',
        boxShadow: `0 0 8px ${s.border}`,
      }}
    >
      {label}
    </div>
  )
}

const SATELLITES = [
  [160, 14,   0,     'React',      'cyan'],
  [250, 24,   0,     'Go',         'purple'],
  [250, 24,   -12,   'TypeScript', 'cyan'],
  [340, 36,   0,     'Kafka',      'green'],
  [340, 36,   -12,   'K8s',        'solar'],
  [340, 36,   -24,   'ClickHouse', 'purple'],
] as const

function OrbitalSystem({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const dim = size === 'sm' ? 220 : 380
  const scale = dim / 380

  return (
    <div
      className="relative mx-auto"
      style={{ width: dim, height: dim }}
      aria-hidden="true"
    >
      {([160, 250, 340] as const).map((ringSize, i) => (
        <div
          key={ringSize}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: ringSize * scale,
            height: ringSize * scale,
            marginTop: -(ringSize * scale) / 2,
            marginLeft: -(ringSize * scale) / 2,
            border: `1px solid rgba(34,211,238,${0.28 - i * 0.07})`,
            boxShadow: `0 0 ${(12 - i * 3) * scale}px rgba(34,211,238,${0.08 - i * 0.02})`,
          }}
        />
      ))}

      {SATELLITES.map(([ringSize, dur, delay, label, accent], idx) => (
        <div
          key={`sat-${idx}`}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: ringSize * scale,
            height: ringSize * scale,
            marginTop: -(ringSize * scale) / 2,
            marginLeft: -(ringSize * scale) / 2,
            animation: `orbit-spin ${dur}s linear ${delay}s infinite`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -14 * scale,
              left: '50%',
              animation: `satellite-counter ${dur}s linear ${delay}s infinite`,
            }}
          >
            <SatelliteChip label={label} accent={accent} />
          </div>
        </div>
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="animate-float-gentle"
          style={{
            width: 96 * scale,
            height: 130 * scale,
            filter: 'drop-shadow(0 0 28px rgba(34,211,238,0.35))',
          }}
        >
          <AstronautSVG />
        </div>
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 160 * scale,
          height: 160 * scale,
          background: 'radial-gradient(circle, rgba(34,211,238,0.1), transparent 70%)',
        }}
      />
    </div>
  )
}

const TELEMETRY = [
  { label: 'COORDINATES', value: personal.location.split(',')[0] },
  { label: 'STATUS', value: 'NOMINAL' },
  { label: 'EXPERIENCE', value: personal.stats[0]?.value ?? '3+ yrs' },
  { label: 'CLEARANCE', value: 'SDE-III' },
]

function WordReveal({ text, accentWord, delay = 0 }: { text: string; accentWord?: string; delay?: number }) {
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
            className="inline-block holo-text"
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

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.0, 0.0, 0.2, 1] } },
}
const orbitalVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.0, 0.0, 0.2, 1], delay: 0.5 } },
}

export function Hero() {
  const [resumeState, setResumeState] = useState<ResumeState>('closed')

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      >
        {/* Cockpit frame lines */}
        <div className="absolute inset-4 sm:inset-8 pointer-events-none hidden lg:block">
          <span className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: 'color-mix(in srgb, var(--accent-stellar) 40%, transparent)' }} />
          <span className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: 'color-mix(in srgb, var(--accent-stellar) 40%, transparent)' }} />
          <span className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: 'color-mix(in srgb, var(--accent-nebula) 40%, transparent)' }} />
          <span className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: 'color-mix(in srgb, var(--accent-nebula) 40%, transparent)' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          {/* Mobile orbital preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:hidden mb-10 flex justify-center"
          >
            <OrbitalSystem size="sm" />
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10">

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 max-w-2xl"
            >
              <motion.div variants={itemVariants}>
                <HudPanel
                  header="Mission Control — Entry Vector"
                  code="CMD-001"
                  accent="aurora"
                  className="mb-6 inline-block w-full sm:w-auto"
                >
                  <div className="px-4 py-3 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                      <Satellite size={11} style={{ color: 'var(--accent-stellar)' }} />
                      Astronaut Engineer
                    </span>
                    <span
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border"
                      style={{
                        background: 'rgba(52,211,153,0.08)',
                        color: 'var(--accent-aurora)',
                        borderColor: 'rgba(52,211,153,0.3)',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-aurora)' }} />
                      Open for deployment
                    </span>
                  </div>
                </HudPanel>
              </motion.div>

              <h1
                className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5"
                style={{ fontFamily: 'var(--font-space)' }}
              >
                <WordReveal
                  text={personal.tagline}
                  accentWord={personal.taglineAccent}
                  delay={0.15}
                />
              </h1>

              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base text-[var(--text-secondary)] mb-2 font-mono border-l-2 pl-4"
                style={{ borderColor: 'var(--accent-stellar)' }}
              >
                {personal.subTagline}
              </motion.p>

              <motion.p variants={itemVariants} className="text-sm text-[var(--text-tertiary)] mb-8 leading-relaxed max-w-lg font-mono">
                <span style={{ color: 'var(--accent-stellar)' }}>&gt;</span>{' '}
                {personal.about.split('.')[0]}. Orbiting{' '}
                <span style={{ color: 'var(--accent-nebula)' }}>{personal.location}</span>.
              </motion.p>

              {/* Telemetry strip */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8"
              >
                {TELEMETRY.map((t) => (
                  <div
                    key={t.label}
                    className="rounded-lg px-3 py-2 border font-mono"
                    style={{
                      borderColor: 'var(--border-muted)',
                      background: 'color-mix(in srgb, var(--bg-surface) 50%, transparent)',
                    }}
                  >
                    <div className="text-[9px] uppercase tracking-widest text-[var(--text-dim)] mb-0.5">
                      {t.label}
                    </div>
                    <div className="text-xs font-semibold" style={{ color: 'var(--accent-stellar)' }}>
                      {t.value}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-mono uppercase tracking-wider text-white transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-stellar), var(--accent-nebula))',
                    boxShadow: 'var(--glow-stellar)',
                  }}
                >
                  <motion.span
                    className="absolute inset-0 -skew-x-12 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)' }}
                    animate={{ x: ['-150%', '150%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
                  />
                  <Mail size={16} className="relative z-10 shrink-0" />
                  <span className="relative z-10">Establish Contact</span>
                </a>

                <button
                  onClick={() => setResumeState('open')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-mono uppercase tracking-wider border transition-all duration-200 cursor-pointer"
                  style={{
                    borderColor: 'var(--accent-stellar)',
                    color: 'var(--accent-stellar)',
                    background: 'rgba(34,211,238,0.05)',
                  }}
                >
                  <FileText size={16} />
                  Mission Files
                </button>

                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-mono border transition-all duration-200"
                  style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                >
                  <GithubIcon style={{ width: 16, height: 16 }} />
                  GitHub
                  <ArrowRight size={14} className="opacity-50" />
                </a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 mt-10 pt-6 border-t sector-divider"
              >
                {personal.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span
                      className="text-2xl font-bold"
                      style={{ fontFamily: 'var(--font-space)', color: 'var(--accent-stellar)' }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={orbitalVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:block shrink-0"
            >
              <HudPanel
                header="Orbital Tech Stack"
                code="ORBIT-7"
                accent="stellar"
                scanlines
                className="p-6"
              >
                <OrbitalSystem size="lg" />
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-mono text-[var(--text-tertiary)]">
                  <Globe size={10} style={{ color: 'var(--accent-stellar)' }} />
                  <span>Satellites in stable orbit</span>
                </div>
              </HudPanel>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Descend to surface</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99] pointer-events-none"
          >
            <ResumeFab onExpand={() => setResumeState('open')} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
