import Link from 'next/link'
import { navItems } from '@/data/navigation'
import { profile } from '@/data/profile'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border" role="contentinfo">
      <div className="flex flex-col gap-6 px-[var(--spacing-site-x)] py-8 md:flex-row md:items-center md:justify-between">

        {/* Copyright */}
        <p className="text-label text-muted">
          © {year} {profile.name}
        </p>

        {/* Page links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-6 list-none" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-label text-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social links — only rendered when values are present */}
        {(profile.socials.github || profile.socials.linkedin) && (
          <nav aria-label="Social links">
            <ul className="flex items-center gap-6 list-none" role="list">
              {profile.socials.github && (
                <li>
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label text-muted hover:text-foreground transition-colors"
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
                    className="text-label text-muted hover:text-foreground transition-colors"
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
