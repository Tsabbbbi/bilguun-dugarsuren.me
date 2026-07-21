'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Stagger delay in seconds. */
  delay?: number
  /** Pixels the content travels in from. */
  y?: number
}

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Fades + slides content up as it enters the viewport.
 * Runs once. Collapses to a simple opacity fade if reduced motion is set.
 */
export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants: Variants = {
    hidden:  { opacity: 0, y: prefersReducedMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.3 : 0.7, ease: EASE, delay },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
