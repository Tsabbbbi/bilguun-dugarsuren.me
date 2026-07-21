'use client'

/**
 * ClickSpark — canvas-based spark burst on every click.
 * Ported from ReactBits to TypeScript; canvas is position:fixed so it overlays
 * the full viewport regardless of where in the tree this component is mounted.
 */

import { useRef, useEffect, useCallback, type ReactNode } from 'react'

interface Spark {
  x: number
  y: number
  angle: number
  startTime: number
}

interface ClickSparkProps {
  sparkColor?:  string
  sparkSize?:   number
  sparkRadius?: number
  sparkCount?:  number
  duration?:    number
  easing?:      'ease-out' | 'ease-in' | 'ease-in-out' | 'linear'
  extraScale?:  number
  children?:    ReactNode
}

export function ClickSpark({
  sparkColor  = '#fff',
  sparkSize   = 10,
  sparkRadius = 15,
  sparkCount  = 8,
  duration    = 400,
  easing      = 'ease-out',
  extraScale  = 1.0,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Spark[]>([])

  // Keep canvas sized to the viewport (fixed overlay)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const sync = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  const ease = useCallback((t: number): number => {
    switch (easing) {
      case 'linear':       return t
      case 'ease-in':      return t * t
      case 'ease-in-out':  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      default:             return t * (2 - t)   // ease-out
    }
  }, [easing])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime
        if (elapsed >= duration) return false

        const progress = elapsed / duration
        const eased    = ease(progress)
        const distance = eased * sparkRadius * extraScale
        const lineLen  = sparkSize * (1 - eased)

        const x1 = spark.x + distance * Math.cos(spark.angle)
        const y1 = spark.y + distance * Math.sin(spark.angle)
        const x2 = spark.x + (distance + lineLen) * Math.cos(spark.angle)
        const y2 = spark.y + (distance + lineLen) * Math.sin(spark.angle)

        ctx.strokeStyle = sparkColor
        ctx.lineWidth   = 2
        ctx.globalAlpha = 1 - eased   // fade out as they travel
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.globalAlpha = 1

        return true
      })

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [sparkColor, sparkSize, sparkRadius, duration, ease, extraScale])

  const handleClick = useCallback((e: MouseEvent) => {
    const now = performance.now()
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x:         e.clientX,
      y:         e.clientY,
      angle:     (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }))
    sparksRef.current.push(...newSparks)
  }, [sparkCount])

  useEffect(() => {
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [handleClick])

  return (
    <>
      {/* Fixed canvas sits above everything, pointer-events disabled so it never blocks interaction */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          inset:         0,
          pointerEvents: 'none',
          zIndex:        9999,
          display:       'block',
        }}
      />
      {children}
    </>
  )
}
