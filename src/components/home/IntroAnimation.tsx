'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Phase = 'black' | 'flashlight' | 'name-first' | 'name-full' | 'fading'

interface Props {
  children: React.ReactNode
}

export function IntroAnimation({ children }: Props) {
  const prefersReducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('black')
  const [visible, setVisible] = useState(true)
  const didSkip = useRef(false)

  const skip = useCallback(() => {
    if (didSkip.current) return
    didSkip.current = true
    setVisible(false)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      skip()
      return
    }

    const timers = [
      setTimeout(() => setPhase('flashlight'), 2000),
      setTimeout(() => setPhase('name-first'), 2500),
      setTimeout(() => setPhase('name-full'), 3000),
      setTimeout(() => setPhase('fading'), 4200),
      setTimeout(() => setVisible(false), 5000),
    ]

    return () => timers.forEach(clearTimeout)
  }, [prefersReducedMotion, skip])

  // Any key skips
  useEffect(() => {
    const onKey = () => skip()
    window.addEventListener('keydown', onKey, { once: true })
    return () => window.removeEventListener('keydown', onKey)
  }, [skip])

  const showFlashlight = phase !== 'black'
  const showFirst = phase === 'name-first' || phase === 'name-full'
  const showLast = phase === 'name-full'

  return (
    <>
      {/* Homepage renders underneath — becomes visible as overlay fades */}
      {children}

      {/* initial={false} prevents AnimatePresence from animating the overlay in on
          first mount — without it, framer-motion infers opacity:0 as the entry
          start state (matching the exit), causing the one-frame content flash. */}
      <AnimatePresence initial={false}>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-hidden cursor-pointer"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 'fading' ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: phase === 'fading' ? 0.8 : 0, ease: 'easeInOut' }}
            onClick={skip}
            aria-hidden="true"
          >
            {/* Black base */}
            <div className="absolute inset-0 bg-black" />

            {/* Flashlight aimed toward camera — elliptical radial gradient */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: showFlashlight ? 1 : 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                background:
                  'radial-gradient(ellipse 45% 60% at 50% 40%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)',
              }}
            />

            {/* Name — centered */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none px-[var(--spacing-site-x)]">
              <motion.span
                className="text-display text-foreground block"
                animate={{
                  opacity: showFirst ? 1 : 0,
                  y: showFirst ? 0 : 16,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                BILGUUN
              </motion.span>
              <motion.span
                className="text-display text-foreground block"
                animate={{
                  opacity: showLast ? 1 : 0,
                  y: showLast ? 0 : 16,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                DUGARSUREN
              </motion.span>
            </div>

            {/* Skip button — appears after 1.5s */}
            <motion.button
              className="absolute bottom-8 right-[var(--spacing-site-x)] text-label text-muted hover:text-foreground transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              onClick={(e) => { e.stopPropagation(); skip() }}
              aria-label="Skip intro"
            >
              SKIP
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
