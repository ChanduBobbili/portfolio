import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseSectionHash(sectionIds: string[]): string | null {
  const id = window.location.hash.replace(/^#/, '')
  return id && sectionIds.includes(id) ? id : null
}

export function setSectionHash(sectionId: string, replace = false) {
  const url = `/#${sectionId}`
  if (replace) window.history.replaceState(null, '', url)
  else window.history.pushState(null, '', url)
}
