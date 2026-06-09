'use client'

import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { personal } from '@/data/portfolio'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="section-even border-t py-2"
      style={{ borderColor: 'color-mix(in srgb, var(--brand) 15%, transparent)' }}
    >
      <div className="max-w-[1080px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-muted-foreground">
          © {year} {personal.name}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-brand transition-colors duration-200"
            style={{ filter: 'none' }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.filter = 'drop-shadow(0 0 6px var(--brand))'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.filter = 'none'
            }}
          >
            <GithubIcon style={{ width: 18, height: 18 }} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-brand transition-colors duration-200"
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.filter = 'drop-shadow(0 0 6px var(--brand))'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.filter = 'none'
            }}
          >
            <LinkedinIcon style={{ width: 18, height: 18 }} />
          </a>
        </div>
      </div>
    </footer>
  )
}
