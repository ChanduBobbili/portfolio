import Image from 'next/image'
import { cn } from '@/lib/utils'

export function AstronautIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      {/* Radial glow behind astronaut */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(56,189,248,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Orbital ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[88%] max-w-[420px] xl:max-w-[520px] aspect-square">
          <div
            className="absolute inset-0 rounded-full border border-dashed"
            style={{ borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)' }}
          />
          <div className="absolute inset-0 animate-orbit" style={{ transformOrigin: 'center' }}>
            <span
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
              style={{ background: 'var(--primary)', boxShadow: '0 0 12px var(--primary)' }}
            />
          </div>
        </div>
      </div>

      {/* Dotted grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.08) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative z-10 mx-auto aspect-square w-full max-w-[320px] md:max-w-[380px] xl:max-w-[480px] animate-float-astronaut">
        <Image
          src="/images/astronaut-transparent.png"
          alt="Astronaut at laptop"
          fill
          priority
          sizes="(max-width: 768px) 320px, 380px"
          className="object-contain"
        />
      </div>
    </div>
  )
}
