'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Aurora } from '@/components/system/Aurora'

type Phase = 'hold' | 'showing' | 'fading'

interface Props {
  children: React.ReactNode
}

const CHARS = ['B', 'I', 'L', 'G', 'U', 'U', 'N']

// Beam sweep: starts at -20% and travels to 120% of container width
// Each letter gets its "lamp on" moment as the beam passes over it
const BEAM_START_MS  = 600
const BEAM_SWEEP_MS  = 1200  // total beam travel duration
const LETTER_STAGGER = BEAM_SWEEP_MS / CHARS.length  // ~171ms per letter

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
            {/* Deep dark base */}
            <div className="absolute inset-0" style={{ backgroundColor: '#0B1E1E' }} />

            {/* Aurora — fills the entire screen as animated background */}
            <div className="absolute inset-0">
              <Aurora
                colorStops={['#2C5B37', '#C09B53', '#E6E8E2']}
                amplitude={1.1}
                blend={0.5}
                speed={0.3}
              />
            </div>

            {/* Darkening vignette so the text stays readable */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(11,30,30,0.7) 100%)',
              }}
            />

            {/* BILGUUN — traveling glow beam, lamp-on per letter */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <div className="relative flex items-baseline" aria-label="Bilguun">

                {/* Traveling beam overlay — sweeps left to right */}
                {phase === 'showing' && (
                  <motion.div
                    className="absolute inset-y-0 pointer-events-none"
                    style={{
                      width: '30%',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(192,155,83,0.18) 30%, rgba(230,232,226,0.30) 50%, rgba(192,155,83,0.18) 70%, transparent 100%)',
                      filter: 'blur(12px)',
                      zIndex: 1,
                    }}
                    initial={{ left: '-30%' }}
                    animate={{ left: '120%' }}
                    transition={{
                      delay: BEAM_START_MS / 1000,
                      duration: BEAM_SWEEP_MS / 1000,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  />
                )}

                {CHARS.map((char, i) => {
                  // Each letter's "lamp on" delay: when the beam center passes over it
                  const lampDelay = (BEAM_START_MS + i * LETTER_STAGGER) / 1000

                  return (
                    <motion.span
                      key={i}
                      initial={{
                        opacity: 0.05,
                        filter: 'drop-shadow(0 0 0px rgba(230,232,226,0)) drop-shadow(0 0 0px rgba(192,155,83,0))',
                      }}
                      animate={phase === 'showing' ? {
                        opacity:  [0.05, 1.0, 0.92],
                        filter: [
                          'drop-shadow(0 0 0px rgba(230,232,226,0)) drop-shadow(0 0 0px rgba(192,155,83,0))',
                          'drop-shadow(0 0 32px rgba(230,232,226,0.85)) drop-shadow(0 0 60px rgba(192,155,83,0.55))',
                          'drop-shadow(0 0 12px rgba(230,232,226,0.22)) drop-shadow(0 0 24px rgba(192,155,83,0.18))',
                        ],
                      } : {
                        opacity: 0,
                        filter: 'drop-shadow(0 0 0px rgba(230,232,226,0))',
                      }}
                      transition={phase === 'showing' ? {
                        delay:    lampDelay,
                        duration: 0.55,
                        times:    [0, 0.3, 1],
                        ease:     'easeOut',
                      } : {
                        duration: 0.3,
                        ease: 'easeIn',
                      }}
                      style={{
                        display:       'inline-block',
                        fontFamily:    'var(--font-space-grotesk), system-ui, sans-serif',
                        fontSize:      'clamp(3.5rem, 10vw, 9rem)',
                        fontWeight:    700,
                        letterSpacing: '-0.03em',
                        textTransform: 'uppercase',
                        lineHeight:    1,
                        // Gold-to-cream gradient with glass sheen
                        background:    'linear-gradient(160deg, #E6E8E2 0%, #C09B53 45%, rgba(108,194,177,0.7) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor:  'transparent',
                        backgroundClip: 'text',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      {char}
                    </motion.span>
                  )
                })}
              </div>
            </div>

            {/* Skip hint */}
            <motion.span
              className="absolute bottom-8 right-[var(--spacing-site-x)] font-mono text-xs tracking-widest uppercase"
              style={{ color: '#6CC2B1' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'showing' ? 0.45 : 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              click to skip
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
