import { personal } from '@/data/portfolio'

export const siteUrl = 'https://chandubobbili.dev'

export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    alternateName: 'Chandu Bobbili',
    jobTitle: 'Senior Software Engineer',
    url: siteUrl,
    email: `mailto:${personal.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressCountry: 'IN',
    },
    sameAs: [personal.github, personal.linkedin],
    knowsAbout: ['TypeScript', 'Go', 'React', 'Microservices', 'Kafka', 'Kubernetes'],
  }
}

async function loadGoogleFont(font: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap`,
    { next: { revalidate: 86400 } }
  ).then((res) => res.text())

  const match = css.match(/src: url\((.+)\) format\('(?:opentype|truetype)'\)/)
  if (!match?.[1]) throw new Error(`Failed to load font: ${font}`)

  return fetch(match[1]).then((res) => res.arrayBuffer())
}

export async function loadOgFont() {
  return loadGoogleFont('Outfit', 700)
}

export async function loadOgFonts() {
  const [regular, bold] = await Promise.all([
    loadGoogleFont('Outfit', 400),
    loadGoogleFont('Outfit', 700),
  ])
  return { regular, bold }
}
