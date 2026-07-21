'use client'

import { motion } from 'framer-motion'

/** Small looping motif per hero panel — replaces the old placeholder boxes. */
export function PanelArt({ id }: { id: string }) {
  switch (id) {
    case 'work':
      return (
        <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.span
              key={i}
              className="h-3 w-3 border border-accent"
              animate={{ opacity: [0.15, 1, 0.15] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: (i % 3) * 0.2 + Math.floor(i / 3) * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )

    case 'journey':
      return (
        <svg width="140" height="24" viewBox="0 0 140 24" aria-hidden="true">
          <line x1="4" y1="12" x2="136" y2="12" stroke="var(--color-border)" strokeWidth="1" />
          {[4, 46, 90, 136].map((x, i) => (
            <motion.circle
              key={x}
              cx={x}
              cy="12"
              r="4"
              fill="var(--color-accent)"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            />
          ))}
        </svg>
      )

    case 'billy':
      return (
        <div className="text-mono text-h3 text-accent flex items-center gap-1" aria-hidden="true">
          <span>{'>'}</span>
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.51, 1] }}
          >
            _
          </motion.span>
        </div>
      )

    case 'about':
      return (
        <div className="relative h-16 w-16" aria-hidden="true">
          <motion.span
            className="absolute inset-0 rounded-full border border-border"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ borderTopColor: 'var(--color-accent)' }}
          />
          <motion.span
            className="absolute inset-3 rounded-full border border-border"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{ borderBottomColor: 'var(--color-accent)' }}
          />
        </div>
      )

    case 'contact':
      return (
        <motion.svg
          width="64"
          height="24"
          viewBox="0 0 64 24"
          aria-hidden="true"
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <line x1="0" y1="12" x2="52" y2="12" stroke="var(--color-accent)" strokeWidth="1.5" />
          <path d="M46 5 L54 12 L46 19" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
        </motion.svg>
      )

    default:
      return null
  }
}
