import Link from 'next/link'
import { Reveal } from '@/components/system/Reveal'
import { Magnetic } from '@/components/system/Magnetic'
import { profile } from '@/data/profile'
import { aboutData } from '@/data/about'

export function AboutTeaser() {
  return (
    <section
      className="border-t border-border px-[var(--spacing-site-x)] py-20"
      aria-labelledby="about-teaser-heading"
    >
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:items-end">

          <div>
            <p className="text-label text-muted mb-3">ABOUT</p>
            <h2 id="about-teaser-heading" className="text-h2 text-foreground leading-tight">
              {profile.name}
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-body text-muted/80 leading-relaxed max-w-xl">
              {aboutData.bio[0]}
            </p>
            <Magnetic strength={0.2}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-label text-muted hover:text-foreground transition-colors"
              >
                <span>Full profile</span>
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
          </div>

        </div>
      </Reveal>
    </section>
  )
}
