import Link from 'next/link'
import { Reveal } from '@/components/system/Reveal'
import { Magnetic } from '@/components/system/Magnetic'
import { WindowCard } from '@/components/ui/WindowCard'
import { profile } from '@/data/profile'
import { aboutData } from '@/data/about'

export function AboutTeaser() {
  return (
    <section
      className="border-t border-border px-[var(--spacing-site-x)] py-20"
      aria-labelledby="about-teaser-heading"
    >
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:items-start">

          <div>
            <h2 id="about-teaser-heading" className="text-h1 text-foreground leading-none">
              {profile.name}
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <WindowCard title="Bio" subtitle="About me">
              <p
                className="text-body leading-relaxed"
                style={{ color: '#3A3A2A' }}
              >
                {aboutData.bio[0]}
              </p>
            </WindowCard>

            <Magnetic strength={0.2}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-label text-muted hover:text-foreground"
                style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}
              >
                <span>Full profile</span>
                <span
                  className="inline-block group-hover:translate-x-1.5"
                  style={{ transition: 'transform 200ms cubic-bezier(0.23,1,0.32,1)' }}
                >→</span>
              </Link>
            </Magnetic>
          </div>

        </div>
      </Reveal>
    </section>
  )
}
