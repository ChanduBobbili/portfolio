import { ImageResponse } from 'next/og'
import { personal } from '@/data/portfolio'
import { loadOgFonts, siteUrl } from '@/lib/seo'

export const runtime = 'edge'

const HERO_TAGLINE = 'Great engineering merges elegant code with real-world impact.'
const HERO_HEADLINE = 'Architecting scalable environments designed to maximize business ROI.'

export const alt = `${personal.name} — ${HERO_HEADLINE}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const primary = '#38bdf8'
const muted = '#94a3b8'

export default async function Image() {
  const { regular, bold } = await loadOgFonts()

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#000000',
        color: '#e6edf3',
        fontFamily: 'Outfit',
      }}
    >
      {/* Starfield dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: '48px 56px',
          position: 'relative',
        }}
      >
        {/* Left column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            gap: 16,
            maxWidth: 640,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: 'rgba(230,237,243,0.5)',
              lineHeight: 1.4,
            }}
          >
            {HERO_TAGLINE}
          </div>

          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#ffffff',
              letterSpacing: '0.02em',
            }}
          >
            {personal.name}
          </div>

          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.25,
              color: primary,
            }}
          >
            {HERO_HEADLINE}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', gap: 32, marginTop: 8 }}>
            {personal.missionStats.map((stat) => (
              <div
                key={stat.label}
                style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 140 }}
              >
                <span style={{ fontSize: 22, fontWeight: 700, color: primary }}>{stat.value}</span>
                <span style={{ fontSize: 16, fontWeight: 400, color: muted, lineHeight: 1.3 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', gap: 12, marginTop: 16 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 28px',
                borderRadius: 8,
                background: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)',
                color: '#ffffff',
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Email me
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 24px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(8,9,12,0.8)',
                color: '#e6edf3',
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Resume
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 24px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(8,9,12,0.8)',
                color: '#e6edf3',
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              GitHub
            </div>
          </div>
        </div>

        {/* Right column — astronaut */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: 420,
            height: 420,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 380,
              height: 380,
              borderRadius: '50%',
              border: '2px dashed rgba(56,189,248,0.25)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)',
            }}
          />
          <img
            src={`${siteUrl}/images/astronaut-transparent.png`}
            width={420}
            height={420}
            alt=""
            style={{ objectFit: 'contain', position: 'relative' }}
          />
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Outfit', data: regular, style: 'normal', weight: 400 },
        { name: 'Outfit', data: bold, style: 'normal', weight: 700 },
      ],
    }
  )
}
