export const galaxySkillSlugs = [
  'typescript',
  'go',
  'react',
  'nextdotjs',
  'tailwindcss',
  'docker',
  'kubernetes',
  'postgresql',
  'mongodb',
  'redis',
  'nodedotjs',
] as const

export const defaultGalaxySkillSlugs: string[] = [...galaxySkillSlugs]

export function skillIconUrl(slug: string, color?: string) {
  return color
    ? `https://cdn.simpleicons.org/${slug}/${color}`
    : `https://cdn.simpleicons.org/${slug}`
}
