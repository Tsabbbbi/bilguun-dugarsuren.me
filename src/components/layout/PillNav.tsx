'use client'

// Adapted from ReactBits PillNav — Next.js port (next/link + usePathname instead of react-router-dom)
// GSAP-powered pill hover animation with forest green design system theming.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import './PillNav.css'

interface PillNavItem {
  label: string
  href:  string
  ariaLabel?: string
}

interface PillNavProps {
  items:               PillNavItem[]
  className?:          string
  ease?:               string
  baseColor?:          string
  pillColor?:          string
  hoveredPillTextColor?: string
  pillTextColor?:      string
  initialLoadAnimation?: boolean
}

export function PillNav({
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#0B2B26',
  pillColor = '#163832',
  hoveredPillTextColor = '#E6E8E2',
  pillTextColor = '#8EB69B',
  initialLoadAnimation = true,
}: PillNavProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const circleRefs   = useRef<(HTMLSpanElement | null)[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tlRefs       = useRef<(gsap.core.Timeline | null)[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeTweens = useRef<(gsap.core.Tween | null)[]>([])
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const navItemsRef  = useRef<HTMLDivElement>(null)
  const logoRef      = useRef<HTMLAnchorElement>(null)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return

        const pill = circle.parentElement
        const rect = pill.getBoundingClientRect()
        const { width: w, height: h } = rect
        const R = ((w * w) / 4 + h * h) / (2 * h)
        const D = Math.ceil(2 * R) + 2
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
        const originY = D - delta

        circle.style.width  = `${D}px`
        circle.style.height = `${D}px`
        circle.style.bottom = `-${delta}px`

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        })

        const label = pill.querySelector('.pill-label')
        const white = pill.querySelector('.pill-label-hover')

        if (label) gsap.set(label, { y: 0 })
        if (white) gsap.set(white, { y: h + 12, opacity: 0 })

        tlRefs.current[index]?.kill()
        const tl = gsap.timeline({ paused: true })

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0)
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0)
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 })
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0)
        }

        tlRefs.current[index] = tl
      })
    }

    layout()

    window.addEventListener('resize', layout)
    document.fonts?.ready.then(layout).catch(() => {})

    const menu = mobileMenuRef.current
    if (menu) gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 })

    if (initialLoadAnimation) {
      const logo = logoRef.current
      const navItems = navItemsRef.current

      // scale(0) → nothing in the real world appears from nothing; start from 0.85
      if (logo) {
        gsap.set(logo, { scale: 0.85, opacity: 0 })
        gsap.to(logo, { scale: 1, opacity: 1, duration: 0.5, ease })
      }

      // width: 0 → auto animates a layout property (triggers full recalc every frame).
      // Use opacity + x-slide instead — transform-only, GPU-accelerated.
      if (navItems) {
        gsap.set(navItems, { opacity: 0, x: -10 })
        gsap.to(navItems, { opacity: 1, x: 0, duration: 0.5, ease, delay: 0.08 })
      }
    }

    return () => window.removeEventListener('resize', layout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, ease, initialLoadAnimation])

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweens.current[i]?.kill()
    activeTweens.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3, ease, overwrite: 'auto',
    }) as unknown as gsap.core.Tween
  }

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweens.current[i]?.kill()
    activeTweens.current[i] = tl.tweenTo(0, {
      duration: 0.2, ease, overwrite: 'auto',
    }) as unknown as gsap.core.Tween
  }

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen
    setIsMobileMenuOpen(next)

    const hamburger = hamburgerRef.current
    const menu = mobileMenuRef.current

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line')
      if (next) {
        gsap.to(lines[0], { rotation: 45,  y:  3, duration: 0.3, ease })
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease })
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease })
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease })
      }
    }

    if (menu) {
      if (next) {
        // Origin-aware scale: menu scales from its top edge (where the trigger is)
        gsap.set(menu, { visibility: 'visible', transformOrigin: 'top center' })
        gsap.fromTo(menu,
          { opacity: 0, y: -6, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.28, ease }
        )
      } else {
        // Exit is faster than enter — system responds, not drags
        gsap.to(menu, {
          opacity: 0, y: -4, scale: 0.97, duration: 0.18, ease,
          transformOrigin: 'top center',
          onComplete: () => gsap.set(menu, { visibility: 'hidden' }),
        })
      }
    }
  }

  const cssVars = {
    ['--base' as string]:       baseColor,
    ['--pill-bg' as string]:    pillColor,
    ['--hover-text' as string]: hoveredPillTextColor,
    ['--pill-text' as string]:  pillTextColor,
  }

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>

        {/* BD logo pill — home link */}
        <Link
          ref={logoRef}
          href="/"
          aria-label="Home"
          className="pill-logo"
        >
          BD
        </Link>

        {/* Desktop nav items */}
        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href} role="none">
                <Link
                  role="menuitem"
                  href={item.href}
                  className={`pill${isActive(item.href) ? ' is-active' : ''}`}
                  aria-label={item.ariaLabel ?? item.label}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={(el) => { circleRefs.current[i] = el }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">{item.label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="pill-mobile-nav"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        id="pill-mobile-nav"
        className="mobile-menu-popover mobile-only"
        ref={mobileMenuRef}
        style={cssVars}
      >
        <ul className="mobile-menu-list">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`mobile-menu-link${isActive(item.href) ? ' is-active' : ''}`}
                aria-current={isActive(item.href) ? 'page' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
