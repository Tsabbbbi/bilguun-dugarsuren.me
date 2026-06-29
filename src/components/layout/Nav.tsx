'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navItems } from '@/data/navigation'
import { profile } from '@/data/profile'

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 h-[var(--nav-height)] border-b border-border bg-background"
      role="banner"
    >
      <div className="flex h-full items-center justify-between px-[var(--spacing-site-x)]">

        {/* Wordmark */}
        <Link
          href="/"
          aria-label={`${profile.name} — home`}
          className="text-label text-foreground hover:text-muted transition-colors"
        >
          {profile.initials}
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-8 list-none" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'text-label transition-colors',
                    isActive(item.href)
                      ? 'text-foreground'
                      : 'text-muted hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileOpen((v) => !v)}
          className="text-label text-muted hover:text-foreground transition-colors md:hidden"
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile navigation panel */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-[var(--nav-height)] border-b border-border bg-background md:hidden"
        >
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col list-none" role="list">
              {navItems.map((item) => (
                <li key={item.href} className="border-t border-border">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex w-full items-center px-[var(--spacing-site-x)] py-4 text-label transition-colors',
                      isActive(item.href)
                        ? 'text-foreground'
                        : 'text-muted hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
