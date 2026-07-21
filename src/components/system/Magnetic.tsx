'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticProps {
  children: React.ReactNode
  className?: string
  /** How far the element travels toward the cursor, 0–1. */
  strength?: number
}

/**
 * Wraps interactive elements (buttons, links) with a magnetic hover pull.
 * No-ops on touch devices and when prefers-reduced-motion is set.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={cn('inline-block will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
