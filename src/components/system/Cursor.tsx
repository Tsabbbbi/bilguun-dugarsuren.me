'use client'

import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'

/**
 * Custom cursor — a small dot with a lagging, hover-reactive ring.
 * Disabled on touch devices, imprecise pointers, and prefers-reduced-motion.
 * Adds `.has-custom-cursor` to <html> so globals.css can hide the native cursor.
 */
export function Cursor() {
  const prefersReducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 280, damping: 26, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 280, damping: 26, mass: 0.4 })

  const scale = useMotionValue(1)
  const ringScale = useSpring(scale, { stiffness: 300, damping: 20 })

  useEffect(() => {
    scale.set(hovering ? 1.9 : 1)
  }, [hovering, scale])

  const dotTransform = useMotionTemplate`translate(${x}px, ${y}px) translate(-50%, -50%)`
  const ringTransform = useMotionTemplate`translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${ringScale})`

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mql.matches && !prefersReducedMotion)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [prefersReducedMotion])

  useEffect(() => {
    document.documentElement.classList.toggle('has-custom-cursor', enabled)
    return () => document.documentElement.classList.remove('has-custom-cursor')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [role="button"], input, textarea'))
    }
    const onLeave = () => {
      x.set(-100)
      y.set(-100)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] h-[6px] w-[6px] rounded-full bg-foreground"
        style={{ transform: dotTransform }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[199] h-7 w-7 rounded-full border border-foreground mix-blend-difference"
        style={{ transform: ringTransform }}
      />
    </>
  )
}
