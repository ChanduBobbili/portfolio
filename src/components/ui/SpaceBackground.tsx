'use client'

function hash(n: number): number {
  const x = Math.sin(n + 1) * 10000
  return x - Math.floor(x)
}

const STARS_LAYER_1 = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: hash(i * 7.3) * 100,
  y: hash(i * 13.7) * 100,
  size: hash(i * 5.1) * 2.2 + 0.4,
  opacity: hash(i * 11.3) * 0.55 + 0.15,
  delay: hash(i * 3.7) * 5,
  duration: hash(i * 17.1) * 3 + 2,
}))

const STARS_LAYER_2 = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: hash(i * 19.3 + 100) * 100,
  y: hash(i * 23.7 + 50) * 100,
  size: hash(i * 8.1) * 3 + 1.5,
  opacity: hash(i * 14.3) * 0.35 + 0.25,
  delay: hash(i * 5.7) * 4,
  duration: hash(i * 11.1) * 4 + 3,
}))

export function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Deep space base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% 0%, #0a0a2e 0%, var(--bg-base) 45%, #020208 100%)',
        }}
      />

      {/* Nebula clouds */}
      <div
        className="absolute -top-40 -right-40 w-[900px] h-[700px] rounded-full blur-[140px] animate-nebula"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 65%)' }}
      />
      <div
        className="absolute top-1/3 -left-32 w-[600px] h-[500px] rounded-full blur-[120px] animate-float-slow"
        style={{ background: 'radial-gradient(circle, rgba(14,116,144,0.14), transparent 65%)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.1), transparent 70%)',
          animation: 'float-medium 18s ease-in-out 2s infinite',
        }}
      />

      {/* Star layers — visible in both themes, stronger in dark */}
      <div className="absolute inset-0 dark:opacity-100 opacity-30">
        {STARS_LAYER_1.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              backgroundColor: star.size > 2 ? '#A8D4FF' : '#E2E8FF',
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
        {STARS_LAYER_2.map((star) => (
          <div
            key={`b-${star.id}`}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              backgroundColor: '#C4E4FF',
              boxShadow: '0 0 6px rgba(168,212,255,0.6)',
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Light mode: cosmic coordinate grid */}
      <div
        className="absolute inset-0 light:block dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14,116,144,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,116,144,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 75%)',
        }}
      />

      {/* Dark mode: HUD grid */}
      <div
        className="absolute inset-0 dark:block hidden opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Horizon glow line */}
      <div
        className="absolute left-0 right-0 top-[38%] h-px opacity-[0.12] dark:opacity-[0.18]"
        style={{
          background:
            'linear-gradient(90deg, transparent 5%, var(--accent-stellar) 30%, var(--accent-nebula) 70%, transparent 95%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)',
        }}
      />
      <div
        className="absolute inset-0 light:block dark:hidden"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 30%, transparent 50%, rgba(8,13,44,0.08) 100%)',
        }}
      />
    </div>
  )
}
