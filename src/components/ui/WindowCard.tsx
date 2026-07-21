'use client'

/**
 * WindowCard — macOS-style document window with interactive traffic-light buttons.
 *
 * States:
 *  open      — full content visible (default)
 *  closed    — only the 40px title bar remains; click bar or red to reopen
 *  minimized — title bar + truncated 72px content preview with fade mask
 *
 * Buttons:
 *  Red    — toggle closed ↔ open
 *  Yellow — toggle minimized ↔ open
 *  Green  — always restores to open
 */

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type WindowState = 'open' | 'closed' | 'minimized'

export interface WindowCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  defaultState?: WindowState
  className?: string
  contentClassName?: string
}

// Paper background for the card interior
const PAPER   = '#F2EEE6'
const TITLEBAR = '#E8E3D8'
const DIVIDER  = '#D8D2C4'
const INK      = '#1F3D2E'
const INK_MUTED = '#5A4A3A'

const ease = [0.23, 1, 0.32, 1] as const

export function WindowCard({
  title,
  subtitle,
  children,
  defaultState = 'open',
  className = '',
  contentClassName = '',
}: WindowCardProps) {
  const [state, setState] = useState<WindowState>(defaultState)
  const reduced = useReducedMotion() ?? false

  const isClosed    = state === 'closed'
  const isMinimized = state === 'minimized'
  const isOpen      = state === 'open'

  const contentHeight: number | 'auto' = isClosed ? 0 : isMinimized ? 72 : 'auto'
  const duration = reduced ? 0 : 0.32

  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
      style={{
        background: PAPER,
        boxShadow:
          '0 8px 48px rgba(31,61,46,0.38), 0 1px 4px rgba(31,61,46,0.18)',
      }}
    >
      {/* ── Title bar ──────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 select-none"
        style={{
          height: 40,
          background: TITLEBAR,
          borderBottom: !isClosed ? `1px solid ${DIVIDER}` : 'none',
          cursor: isClosed ? 'pointer' : 'default',
        }}
        onClick={isClosed ? () => setState('open') : undefined}
        role={isClosed ? 'button' : undefined}
        tabIndex={isClosed ? 0 : undefined}
        aria-label={isClosed ? `Open ${title}` : undefined}
        onKeyDown={isClosed ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') setState('open')
        } : undefined}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 group flex-shrink-0">

          {/* Red — collapse / restore */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setState(s => s === 'closed' ? 'open' : 'closed')
            }}
            className="w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: '#FF5F57' }}
            title={isClosed ? 'Restore' : 'Close'}
            aria-label={isClosed ? 'Restore window' : 'Close window'}
          >
            <span
              className="opacity-0 group-hover:opacity-100 leading-none"
              style={{ color: '#7A1914', fontSize: '8px', fontWeight: 900 }}
              aria-hidden="true"
            >×</span>
          </button>

          {/* Yellow — minimize / restore */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setState(s => s === 'minimized' ? 'open' : 'minimized')
            }}
            className="w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: '#FEBC2E' }}
            title={isMinimized ? 'Restore' : 'Minimize'}
            aria-label={isMinimized ? 'Restore window' : 'Minimize window'}
          >
            <span
              className="opacity-0 group-hover:opacity-100 leading-none"
              style={{ color: '#7A5800', fontSize: '9px', fontWeight: 900, lineHeight: 1 }}
              aria-hidden="true"
            >−</span>
          </button>

          {/* Green — zoom (always restores to open) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setState('open')
            }}
            className="w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: '#28C840' }}
            title="Zoom"
            aria-label="Expand window"
          >
            <span
              className="opacity-0 group-hover:opacity-100 leading-none"
              style={{ color: '#0A5918', fontSize: '7px', fontWeight: 900 }}
              aria-hidden="true"
            >↗</span>
          </button>
        </div>

        {/* Window title — centred, monospace */}
        <div className="flex-1 text-center min-w-0 px-2">
          <p
            className="truncate"
            style={{
              fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: INK_MUTED,
              opacity: 0.6,
            }}
          >
            {title}
          </p>
        </div>

        {/* Optional right-side metadata */}
        {subtitle && (
          <p
            className="flex-shrink-0 hidden sm:block"
            style={{
              fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
              fontSize: '0.625rem',
              letterSpacing: '0.06em',
              color: INK_MUTED,
              opacity: 0.35,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <motion.div
        animate={{ height: contentHeight }}
        initial={false}
        transition={{ duration, ease }}
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        <div
          className={`p-6 ${contentClassName}`}
          style={{ color: INK }}
        >
          {children}
        </div>

        {/* Minimized state — gradient mask */}
        {isMinimized && (
          <div
            className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, ${PAPER})`,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
