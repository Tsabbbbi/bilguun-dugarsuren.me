'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { navItems } from '@/data/navigation'
import { profile } from '@/data/profile'
import { Magnetic } from '@/components/system/Magnetic'

interface NavProps {
  /** Homepage variant — no solid background, gradient scrim over hero art instead. */
  transparent?: boolean
}

export function Nav({ transparent = false }: NavProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 h-[var(--nav-height)]',
        transparent
          ? 'border-b border-transparent bg-gradient-to-b from-background/90 via-background/50 to-transparent'
          : 'border-b border-border bg-background/80 backdrop-blur-md'
      )}
      role="banner"
    >
      <div className="flex h-full items-center justify-between px-[var(--spacing-site-x)]">

        {/* Wordmark */}
        <Magnetic strength={0.5}>
          <Link
            href="/"
            aria-label={`${profile.name} — home`}
            className="text-label text-foreground hover:text-accent transition-colors"
          >
            {profile.initials}
          </Link>
        </Magnetic>

        {/* Desktop navigation */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-8 list-none" role="list">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'text-label relative pb-1 transition-colors',
                      active ? 'text-foreground' : 'text-muted hover:text-foreground'
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="absolute left-0 right-0 -bottom-[1px] h-[1.5px] bg-accent"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
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
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border bg-background md:hidden"
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col list-none" role="list">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    className="border-t border-border"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
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
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
