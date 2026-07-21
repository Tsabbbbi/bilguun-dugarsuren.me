'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  life: number
}

/**
 * Canvas flow-field sketch — a nod to the Processing (Java) computational-art
 * work in the Journey page. Pauses off-screen and when reduced motion is set.
 */
export function GenerativeFigure() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let raf = 0
    let visible = true

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, width, height)
    }
    resize()

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      life: 60 + Math.random() * 200,
    })

    if (prefersReducedMotion) {
      return () => {}
    }

    const particles: Particle[] = Array.from({ length: 110 }, spawn)
    const field = (x: number, y: number, t: number) =>
      Math.sin(x * 0.008 + t) + Math.cos(y * 0.006 - t * 0.8) + Math.sin((x + y) * 0.004 + t * 0.5)

    let t = 0
    const draw = () => {
      if (!visible) return
      t += 0.0032

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, width, height)

      for (const p of particles) {
        const angle = field(p.x, p.y, t) * Math.PI
        p.x += Math.cos(angle) * 0.7
        p.y += Math.sin(angle) * 0.7
        p.life -= 1

        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height || p.life <= 0) {
          Object.assign(p, spawn())
        }

        ctx.fillStyle = 'rgba(227, 27, 35, 0.65)'
        ctx.fillRect(p.x, p.y, 1.5, 1.5)
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) raf = requestAnimationFrame(draw)
      else cancelAnimationFrame(raf)
    })
    observer.observe(canvas)

    return () => {
      visible = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [prefersReducedMotion])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
