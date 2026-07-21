'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Stagger delay in seconds. */
  delay?: number
  /** Pixels the content travels in from (y-axis). */
  y?: number
  /** Enable diagonal entrance (x+y simultaneously). */
  diagonal?: boolean
}

// Fast expo ease-out — starts immediately, settles crisply
const EASE = [0.23, 1, 0.32, 1] as const

/**
 * Fades + slides content up (or diagonally) as it enters the viewport.
 * Runs once. Collapses to a simple opacity fade if reduced motion is set.
 *
 * Duration is 480ms — fast enough to feel responsive, long enough to read.
 * The uniform-reflex trap (same 700ms on everything) is avoided by keeping
 * this tight and letting callers vary `delay` for stagger.
 */
export function Reveal({ children, className, delay = 0, y = 16, diagonal = false }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()

  const xOffset = diagonal ? 12 : 0

  const variants: Variants = {
    hidden:  { opacity: 0, x: prefersReducedMotion ? 0 : xOffset, y: prefersReducedMotion ? 0 : y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.2 : 0.48, ease: EASE, delay },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

interface DiagonalRevealProps {
  children: React.ReactNode
  className?: string
}

const SPRING = { stiffness: 60, damping: 20, mass: 0.8 }

/**
 * Scroll-driven diagonal parallax. Section enters from bottom-right,
 * exits toward top-left — creating a cinematic "escalator" feel.
 * GPU-accelerated (transform only). Respects prefers-reduced-motion.
 */
export function DiagonalReveal({ children, className }: DiagonalRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Always compute transforms — conditionally apply them below (no conditional hooks)
  const rawY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [48, 0, 0, -48])
  const rawX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [20, 0, 0, -20])
  const rawO = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0])
  const springY = useSpring(rawY, SPRING)
  const springX = useSpring(rawX, SPRING)

  return (
    <motion.div
      ref={ref}
      className={className}
      style={prefersReducedMotion
        ? { opacity: rawO, willChange: 'opacity' }
        : { x: springX, y: springY, opacity: rawO, willChange: 'transform, opacity' }
      }
    >
      {children}
    </motion.div>
  )
}
