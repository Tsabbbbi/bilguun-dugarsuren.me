'use client'

/**
 * DiagonalScroll — Full-screen section hijacker.
 *
 * Replaces vertical scrolling with diagonal section transitions:
 * sections enter from bottom-right and exit toward top-left,
 * driven by spring physics for a cinematic, premium motion feel.
 *
 * Input handling:
 *  - Mouse wheel & trackpad: boundary-aware (panel scrolls first)
 *  - Touch swipe: boundary-aware
 *  - Keyboard: ArrowDown/Up, PageDown/Up, Space
 *  - Section dots: click navigation
 *
 * Accessibility: respects prefers-reduced-motion, aria-labels on dots.
 * Performance: GPU-accelerated transforms only, willChange.
 */

import React, { useEffect, useRef, useCallback, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'

// ─── Tuning ───────────────────────────────────────────────────────────────────

/** Horizontal shift per section, as a fraction of viewport width. */
const X_RATIO = 0.32

/** Wheel-delta accumulation threshold before advancing a section. */
const WHEEL_THRESHOLD = 55

/** Touch swipe distance (px) to advance a section. */
const SWIPE_THRESHOLD = 60

/** Ignore additional input for this many ms after a section change. */
const COOLDOWN_MS = 800

// Higher stiffness + lighter mass = sections land decisively without losing physics feel.
// Damping tuned to eliminate overshoot for full-page panels (no bounce here).
const SPRING_NORMAL  = { stiffness: 100, damping: 24, mass: 0.85 }
const SPRING_REDUCED = { stiffness: 300, damping: 40 }

// ─── Panel ────────────────────────────────────────────────────────────────────

interface PanelProps {
  index:    number
  spring:   MotionValue<number>
  reduced:  boolean
  setRef:   (el: HTMLDivElement | null) => void
  children: React.ReactNode
}

function Panel({ index, spring, reduced, setRef, children }: PanelProps) {
  const x = useTransform(spring, (p) => {
    if (reduced) return '0vw'
    return `${(index - p) * X_RATIO * 100}vw`
  })

  const y = useTransform(spring, (p) => {
    if (reduced) return '0vh'
    return `${(index - p) * 100}vh`
  })

  // Subtle scale: panels shrink ever so slightly as they move off-axis
  const scale = useTransform(spring, (p) => {
    if (reduced) return 1
    const d = Math.min(Math.abs(index - p), 1)
    return 1 - d * 0.038
  })

  // Fade panels that are two+ sections away
  const opacity = useTransform(spring, (p) => {
    const d = Math.abs(index - p)
    if (reduced) return d < 0.5 ? 1 : 0
    return Math.max(0, 1 - d * 0.7)
  })

  return (
    <motion.div
      ref={setRef}
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
        x, y, scale, opacity,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  )
}

// ─── Navigation Dots ──────────────────────────────────────────────────────────

interface DotsProps { n: number; active: number; goTo: (i: number) => void }

function Dots({ n, active, goTo }: DotsProps) {
  if (n <= 1) return null
  return (
    <nav
      aria-label="Page sections"
      style={{
        position: 'fixed',
        right: '1.25rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        zIndex: 49,
      }}
    >
      {Array.from({ length: n }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Go to section ${i + 1} of ${n}`}
          aria-current={i === active ? 'true' : undefined}
          style={{
            padding: 0,
            border: 'none',
            cursor: 'pointer',
            width: 4,
            height: i === active ? 22 : 4,
            borderRadius: 9999,
            background: i === active ? '#C09B53' : 'rgba(142,182,155,0.22)',
            transition: 'height 0.35s ease, background 0.35s ease',
          }}
        />
      ))}
    </nav>
  )
}

// ─── DiagonalScroll ───────────────────────────────────────────────────────────

export function DiagonalScroll({ children }: { children: React.ReactNode }) {
  const reduced  = useReducedMotion() ?? false
  const sections = React.Children.toArray(children)
  const N        = sections.length

  // Start at -0.35 so section 0 enters from the bottom-right on load
  const raw    = useMotionValue(reduced ? 0 : -0.35)
  const spring = useSpring(raw, reduced ? SPRING_REDUCED : SPRING_NORMAL)

  const [active, setActive]  = useState(0)
  const indexRef  = useRef(0)
  const coolRef   = useRef(false)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  // Animate to section 0 immediately — creates the diagonal entrance
  useEffect(() => {
    raw.set(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goTo = useCallback((i: number) => {
    if (coolRef.current) return
    const clamped = Math.max(0, Math.min(N - 1, i))
    if (clamped === indexRef.current) return

    coolRef.current = true
    indexRef.current = clamped
    setActive(clamped)
    raw.set(clamped)
    setTimeout(() => { coolRef.current = false }, COOLDOWN_MS)
  }, [N, raw])

  // ── Input Listeners ────────────────────────────────────────────────────────

  useEffect(() => {
    let accum = 0
    let accumTimer: ReturnType<typeof setTimeout>

    const el      = () => panelRefs.current[indexRef.current]
    const atTop   = () => { const e = el(); return !e || e.scrollTop <= 1 }
    const atBot   = () => { const e = el(); return !e || e.scrollTop + e.clientHeight >= e.scrollHeight - 2 }

    const onWheel = (e: WheelEvent) => {
      const down = e.deltaY > 0
      // Let the panel's own scroll handle movement while interior is scrollable
      if (down && !atBot()) return
      if (!down && !atTop()) return

      e.preventDefault()
      accum += e.deltaY
      clearTimeout(accumTimer)
      accumTimer = setTimeout(() => { accum = 0 }, 180)

      if (accum > WHEEL_THRESHOLD)  { accum = 0; goTo(indexRef.current + 1) }
      if (accum < -WHEEL_THRESHOLD) { accum = 0; goTo(indexRef.current - 1) }
    }

    let touchY = 0
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY }
    const onTouchEnd   = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY
      if (Math.abs(dy) < SWIPE_THRESHOLD) return
      if (dy > 0 && atBot()) goTo(indexRef.current + 1)
      if (dy < 0 && atTop()) goTo(indexRef.current - 1)
    }

    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key) && atBot()) {
        e.preventDefault(); goTo(indexRef.current + 1)
      }
      if (['ArrowUp', 'PageUp'].includes(e.key) && atTop()) {
        e.preventDefault(); goTo(indexRef.current - 1)
      }
    }

    window.addEventListener('wheel',      onWheel,      { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true  })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true  })
    window.addEventListener('keydown',    onKey)

    return () => {
      window.removeEventListener('wheel',      onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
      window.removeEventListener('keydown',    onKey)
    }
  }, [goTo])

  // ── Lock document scroll ───────────────────────────────────────────────────

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: '#0B1E1E' }}>
        {sections.map((child, i) => (
          <Panel
            key={i}
            index={i}
            spring={spring}
            reduced={reduced}
            setRef={(el) => { panelRefs.current[i] = el }}
          >
            {child}
          </Panel>
        ))}
      </div>
      <Dots n={N} active={active} goTo={goTo} />
    </>
  )
}
