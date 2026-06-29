'use client'

import { useRef, useEffect } from 'react'
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import { PlaceholderFigure } from './PlaceholderFigure'
import { heroPanels } from '@/data/homepage'

// Edit panels in src/data/homepage.ts → heroPanels.
const PANELS = heroPanels
const PANEL_COUNT = PANELS.length

// ── Desktop: sticky-scroll horizontal slideshow ───────────────────────────────

function DesktopHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const slideshowRef = useRef<HTMLDivElement>(null)

  const panelWidthMv = useMotionValue(0)
  const x = useMotionValue(0)
  const isSnapping = useRef(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Keep panelWidthMv synced to the container's rendered width
  useEffect(() => {
    const el = slideshowRef.current
    if (!el) return
    panelWidthMv.set(el.offsetWidth)
    const obs = new ResizeObserver(() => panelWidthMv.set(el.offsetWidth))
    obs.observe(el)
    return () => obs.disconnect()
  }, [panelWidthMv])

  // Drive x from scrollYProgress — reacts to both scroll and resize
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    x.set(-progress * (PANEL_COUNT - 1) * panelWidthMv.get())
  })
  useMotionValueEvent(panelWidthMv, 'change', (width) => {
    x.set(-scrollYProgress.get() * (PANEL_COUNT - 1) * width)
  })

  // Smooth snap to nearest panel when scroll comes to rest
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let timer: ReturnType<typeof setTimeout>

    const onScroll = () => {
      if (isSnapping.current) return
      clearTimeout(timer)
      timer = setTimeout(() => {
        const progress = scrollYProgress.get()
        if (progress <= 0.001 || progress >= 0.999) return

        const panelIndex = Math.round(progress * (PANEL_COUNT - 1))
        const targetProgress = panelIndex / (PANEL_COUNT - 1)
        if (Math.abs(progress - targetProgress) < 0.015) return

        const sectionTop =
          section.getBoundingClientRect().top + window.scrollY
        const scrollRange = section.scrollHeight - window.innerHeight
        const targetY = sectionTop + targetProgress * scrollRange

        isSnapping.current = true
        window.scrollTo({ top: targetY, behavior: 'smooth' })
        setTimeout(() => { isSnapping.current = false }, 700)
      }, 160)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [scrollYProgress])

  return (
    // Outer wrapper creates scroll space for all panels (5 × 100vh)
    <div ref={sectionRef} style={{ height: `${PANEL_COUNT * 100}vh` }}>
      {/* Sticky inner — holds position while user scrolls the outer wrapper */}
      <div className="sticky top-0 flex overflow-hidden" style={{ height: '100dvh' }}>

        {/* Left 35% — illustrated figure */}
        <div className="w-[35%] shrink-0 border-r border-border">
          <PlaceholderFigure />
        </div>

        {/* Right 65% — panels translate horizontally as x changes */}
        <div ref={slideshowRef} className="relative w-[65%] overflow-hidden">
          <motion.div style={{ x }} className="flex h-full">
            {PANELS.map((panel, i) => (
              <DesktopPanel key={panel.id} panel={panel} index={i} />
            ))}
          </motion.div>

          <PanelCounter scrollYProgress={scrollYProgress} sectionRef={sectionRef} />
        </div>

      </div>
    </div>
  )
}

function DesktopPanel({
  panel,
  index,
}: {
  panel: (typeof PANELS)[number]
  index: number
}) {
  return (
    // min-w-full makes each panel exactly as wide as the 65% container
    <div className="relative flex h-full min-w-full shrink-0 flex-col items-center justify-center border-r border-border px-10">
      <span className="text-label text-muted absolute top-8 left-8">
        {String(index + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(PANEL_COUNT).padStart(2, '0')}
      </span>
      <span className="text-label text-accent mb-6">{panel.label}</span>
      <div className="flex h-56 w-full max-w-sm flex-col items-center justify-center border border-dashed border-border">
        <span className="text-h3 text-muted">{panel.title}</span>
        <span className="text-label text-muted/40 mt-2">artwork</span>
      </div>
      <div className="mt-6 flex h-10 w-28 items-center justify-center border border-dashed border-border">
        <span className="text-label text-muted/30">animation</span>
      </div>
    </div>
  )
}

// Dot navigation — lets users jump directly to a panel
function PanelCounter({
  scrollYProgress,
  sectionRef,
}: {
  scrollYProgress: MotionValue<number>
  sectionRef: React.RefObject<HTMLDivElement | null>
}) {
  const jumpTo = (panelIndex: number) => {
    const section = sectionRef.current
    if (!section) return
    const targetProgress = panelIndex / (PANEL_COUNT - 1)
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    const scrollRange = section.scrollHeight - window.innerHeight
    window.scrollTo({
      top: sectionTop + targetProgress * scrollRange,
      behavior: 'smooth',
    })
  }

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2" aria-hidden="true">
      {PANELS.map((panel, i) => (
        <button
          key={panel.id}
          className="h-1 w-6 rounded-full bg-border hover:bg-muted transition-colors focus-visible:outline-accent"
          onClick={() => jumpTo(i)}
          aria-label={`Jump to ${panel.label}`}
        />
      ))}
    </div>
  )
}

// ── Mobile: CSS scroll-snap horizontal panels ─────────────────────────────────

function MobileHero() {
  return (
    <div className="flex h-dvh flex-col">
      {/* Figure — compact top strip */}
      <div className="relative h-[32%] shrink-0 border-b border-border overflow-hidden">
        <PlaceholderFigure />
      </div>

      {/* Panels — native horizontal CSS scroll-snap */}
      <div
        className="flex flex-1 overflow-x-auto overscroll-x-contain snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {PANELS.map((panel, i) => (
          <MobilePanel key={panel.id} panel={panel} index={i} />
        ))}
      </div>
    </div>
  )
}

function MobilePanel({
  panel,
  index,
}: {
  panel: (typeof PANELS)[number]
  index: number
}) {
  return (
    <div className="relative flex h-full min-w-full shrink-0 flex-col items-center justify-center border-r border-border px-6 snap-center">
      <span className="text-label text-muted absolute top-5 left-5">
        {String(index + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(PANEL_COUNT).padStart(2, '0')}
      </span>
      <span className="text-label text-accent mb-4">{panel.label}</span>
      <div className="flex h-40 w-full max-w-[260px] flex-col items-center justify-center border border-dashed border-border">
        <span className="text-h3 text-muted">{panel.title}</span>
        <span className="text-label text-muted/40 mt-1">artwork</span>
      </div>
    </div>
  )
}

// ── Hero — switches between layouts at the lg breakpoint ─────────────────────

export function Hero() {
  return (
    <>
      <div className="lg:hidden" aria-label="Hero — mobile">
        <MobileHero />
      </div>
      <div className="hidden lg:block" aria-label="Hero — desktop">
        <DesktopHero />
      </div>
    </>
  )
}
