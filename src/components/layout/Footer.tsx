import Link from 'next/link'
import { navItems } from '@/data/navigation'
import { profile } from '@/data/profile'
import { aboutData } from '@/data/about'

export function Footer() {
  const year = new Date().getFullYear()
  const marqueeItems = [...aboutData.interests, ...aboutData.interests]

  return (
    <footer className="border-t border-border" role="contentinfo">

      {/* Infinite ticker — interests, straight from the resume */}
      <div className="overflow-hidden border-b border-border py-4" aria-hidden="true">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {marqueeItems.map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-label text-muted/40">
              {item}
              <span className="text-accent/60">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 px-[var(--spacing-site-x)] py-8 md:flex-row md:items-center md:justify-between">

        {/* Name + copyright */}
        <div className="flex flex-col gap-0.5">
          <p className="text-label text-foreground/70">{profile.name}</p>
          <p className="text-label text-muted/35">© {year}</p>
        </div>

        {/* Page links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-6 list-none" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-label text-muted/55 hover:text-foreground"
                  style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social links */}
        {(profile.socials.github || profile.socials.linkedin) && (
          <nav aria-label="Social links">
            <ul className="flex items-center gap-6 list-none" role="list">
              {profile.socials.github && (
                <li>
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label text-muted/55 hover:text-foreground"
                    style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}
                  >
                    GitHub
                  </a>
                </li>
              )}
              {profile.socials.linkedin && (
                <li>
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label text-muted/55 hover:text-foreground"
                    style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </nav>
        )}

      </div>
    </footer>
  )
}
