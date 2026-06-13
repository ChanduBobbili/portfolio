export function AstronautIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
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
        <div className="relative w-[88%] max-w-[420px] aspect-square">
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

      {/* Astronaut SVG */}
      <svg
        viewBox="0 0 320 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full max-w-[340px] mx-auto animate-float-astronaut"
        aria-hidden="true"
      >
        {/* Tether cable */}
        <path
          d="M88 210 C40 250 20 300 35 360"
          stroke="var(--primary)"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 8"
        />

        {/* Body suit */}
        <path
          d="M118 248 C108 300 112 340 128 360 L192 360 C208 340 212 300 202 248 Z"
          fill="color-mix(in srgb, var(--primary) 18%, var(--card))"
          stroke="var(--primary)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <rect
          x="132"
          y="268"
          width="56"
          height="44"
          rx="10"
          fill="color-mix(in srgb, var(--accent) 50%, transparent)"
          stroke="var(--primary)"
          strokeOpacity="0.3"
        />

        {/* Shoulder patch */}
        <circle
          cx="128"
          cy="262"
          r="10"
          fill="var(--primary)"
          fillOpacity="0.2"
          stroke="var(--primary)"
          strokeOpacity="0.5"
        />
        <path
          d="M124 262 L128 258 L132 266"
          stroke="var(--primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Arms */}
        <path
          d="M118 255 C92 270 84 290 90 310"
          stroke="var(--primary)"
          strokeOpacity="0.45"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M202 255 C228 270 236 290 230 310"
          stroke="var(--primary)"
          strokeOpacity="0.45"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Helmet ring */}
        <ellipse
          cx="160"
          cy="168"
          rx="78"
          ry="82"
          fill="color-mix(in srgb, var(--muted) 80%, transparent)"
          stroke="var(--primary)"
          strokeOpacity="0.55"
          strokeWidth="2"
        />

        {/* Visor glass */}
        <rect
          x="98"
          y="108"
          width="124"
          height="96"
          rx="28"
          fill="color-mix(in srgb, var(--primary) 15%, var(--background))"
          stroke="var(--primary)"
          strokeOpacity="0.65"
          strokeWidth="2"
        />

        {/* Starfield reflection in visor */}
        <circle cx="128" cy="142" r="2" fill="var(--primary)" fillOpacity="0.9" />
        <circle cx="168" cy="128" r="1.5" fill="#7dd3fc" fillOpacity="0.8" />
        <circle cx="190" cy="158" r="1.2" fill="var(--primary)" fillOpacity="0.7" />
        <circle cx="145" cy="175" r="1" fill="white" fillOpacity="0.6" />
        <ellipse cx="175" cy="168" rx="18" ry="12" fill="var(--primary)" fillOpacity="0.12" />

        {/* Visor highlight */}
        <path
          d="M108 118 C130 108 170 106 205 118"
          stroke="white"
          strokeOpacity="0.35"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Antenna */}
        <line
          x1="210"
          y1="118"
          x2="238"
          y2="88"
          stroke="var(--primary)"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="240"
          cy="86"
          r="5"
          fill="var(--primary)"
          style={{ filter: 'drop-shadow(0 0 6px var(--primary))' }}
        />

        {/* Backpack */}
        <rect
          x="198"
          y="220"
          width="28"
          height="52"
          rx="8"
          fill="color-mix(in srgb, var(--primary) 12%, var(--card))"
          stroke="var(--primary)"
          strokeOpacity="0.35"
        />
        <rect
          x="204"
          y="232"
          width="16"
          height="6"
          rx="2"
          fill="var(--primary)"
          fillOpacity="0.25"
        />
        <rect
          x="204"
          y="246"
          width="16"
          height="6"
          rx="2"
          fill="var(--primary)"
          fillOpacity="0.25"
        />
      </svg>
    </div>
  )
}
