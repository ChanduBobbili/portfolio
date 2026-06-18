import { ImageResponse } from 'next/og'
import { loadOgFont } from '@/lib/seo'

export const runtime = 'edge'

export const alt = 'Chandu Bobbili — Senior Software Engineer portfolio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const metrics = ['1M+ events/sec', '20K students', 'Lighthouse 54→97']

export default async function Image() {
  const outfitBold = await loadOgFont()

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '64px 72px',
        background: '#0d1117',
        color: '#e6edf3',
        fontFamily: 'Outfit',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#2f81f7',
            letterSpacing: '0.04em',
          }}
        >
          chandubobbili.dev
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>Chandu Bobbili</div>
        <div style={{ fontSize: 32, color: '#7d8590' }}>Senior Software Engineer</div>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {metrics.map((metric) => (
          <div
            key={metric}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              borderRadius: 8,
              border: '1px solid #30363d',
              background: '#161b22',
              fontSize: 22,
              fontWeight: 700,
              color: '#e6edf3',
            }}
          >
            {metric}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 24, color: '#7d8590' }}>
        TypeScript · Go · React · Kafka · Kubernetes
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: 'Outfit', data: outfitBold, style: 'normal', weight: 700 }],
    }
  )
}
