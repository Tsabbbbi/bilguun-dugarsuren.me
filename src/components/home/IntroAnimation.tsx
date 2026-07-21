'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Aurora } from '@/components/system/Aurora'

type Phase = 'hold' | 'showing' | 'fading'

interface Props {
  children: React.ReactNode
}

const CHARS = ['h', 'e', 'l', 'l', 'o', '.']

export function IntroAnimation({ children }: Props) {
  const prefersReducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('hold')
  const [visible, setVisible] = useState(true)
  const didSkip = useRef(false)

  const skip = useCallback(() => {
    if (didSkip.current) return
    didSkip.current = true
    setPhase('fading')
    setTimeout(() => setVisible(false), 900)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(false)
      return
    }

    const timers = [
      setTimeout(() => setPhase('showing'), 500),
      setTimeout(() => setPhase('fading'),  2800),
      setTimeout(() => setVisible(false),   3700),
    ]

    return () => timers.forEach(clearTimeout)
  }, [prefersReducedMotion])

  useEffect(() => {
    const onKey = () => skip()
    window.addEventListener('keydown', onKey, { once: true })
    return () => window.removeEventListener('keydown', onKey)
  }, [skip])

  return (
    <>
      {children}

      <AnimatePresence initial={false}>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-hidden cursor-pointer"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 'fading' ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            onClick={skip}
            aria-hidden="true"
          >
            {/* Deep forest base */}
            <div className="absolute inset-0" style={{ backgroundColor: '#051F20' }} />

            {/* Aurora — fills the entire screen as animated background */}
            <div className="absolute inset-0">
              <Aurora
                colorStops={['#163832', '#8EB69B', '#DAF1DE']}
                amplitude={1.1}
                blend={0.55}
                speed={0.35}
              />
            </div>

            {/* Darkening vignette so the text stays readable */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(5,31,32,0.55) 100%)',
              }}
            />

            {/* "hello." — letters slide up one by one */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <div className="flex items-baseline" aria-label="hello">
                {CHARS.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: phase === 'showing' ? 1 : 0,
                      y:       phase === 'showing' ? 0 : 20,
                    }}
                    transition={{
                      duration: 0.7,
                      delay:    phase === 'showing' ? i * 0.07 : 0,
                      ease:     [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      display:       'inline-block',
                      fontFamily:    'var(--font-space-grotesk), system-ui, sans-serif',
                      fontSize:      'clamp(3.5rem, 9vw, 7.5rem)',
                      fontWeight:    300,
                      fontStyle:     'italic',
                      letterSpacing: '-0.02em',
                      color:         '#DAF1DE',
                      lineHeight:    1,
                      textShadow:    '0 0 40px rgba(218,241,222,0.25)',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Skip hint */}
            <motion.span
              className="absolute bottom-8 right-[var(--spacing-site-x)] font-mono text-xs tracking-widest uppercase"
              style={{ color: '#8EB69B' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'showing' ? 0.5 : 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              click to skip
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
