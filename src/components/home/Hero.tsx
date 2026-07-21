'use client'

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion'
import { HeroFigure } from './HeroFigure'
import { PanelArt } from './PanelArt'
import { Magnetic } from '@/components/system/Magnetic'
import { heroPanels } from '@/data/homepage'
import { cn } from '@/lib/utils'

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
  const [activeIndex, setActiveIndex] = useState(0)

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
    setActiveIndex(Math.round(progress * (PANEL_COUNT - 1)))
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

        {/* Left 35% — generative figure */}
        <div className="w-[35%] shrink-0 border-r border-border">
          <HeroFigure />
        </div>

        {/* Right 65% — panels translate horizontally as x changes */}
        <div ref={slideshowRef} className="relative w-[65%] overflow-hidden">
          <motion.div style={{ x }} className="flex h-full">
            {PANELS.map((panel, i) => (
              <DesktopPanel key={panel.id} panel={panel} index={i} active={i === activeIndex} />
            ))}
          </motion.div>

          <PanelCounter sectionRef={sectionRef} activeIndex={activeIndex} />
        </div>

      </div>
    </div>
  )
}

function DesktopPanel({
  panel,
  index,
  active,
}: {
  panel: (typeof PANELS)[number]
  index: number
  active: boolean
}) {
  return (
    // min-w-full makes each panel exactly as wide as the 65% container
    <div className="relative flex h-full min-w-full shrink-0 flex-col items-center justify-center border-r border-border px-10">
      <span className="text-label text-muted absolute top-8 left-8 text-mono">
        {String(index + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(PANEL_COUNT).padStart(2, '0')}
      </span>
      <span className="text-label text-accent mb-6">{panel.label}</span>

      <motion.div
        animate={{ opacity: active ? 1 : 0.4, y: active ? 0 : 6 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-56 w-full max-w-sm flex-col items-center justify-center gap-6 border border-border"
      >
        <span className="text-h3 text-foreground">{panel.title}</span>
        <PanelArt id={panel.id} />
      </motion.div>

      <p className="mt-6 text-label text-muted text-center max-w-xs">{panel.description}</p>
      <Magnetic strength={0.25}>
        <a
          href={panel.cta.href}
          className="mt-4 inline-block text-label text-muted/60 hover:text-foreground underline underline-offset-4 transition-colors"
        >
          {panel.cta.label}
        </a>
      </Magnetic>
    </div>
  )
}

// Dot navigation — lets users jump directly to a panel
function PanelCounter({
  sectionRef,
  activeIndex,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>
  activeIndex: number
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
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
      {PANELS.map((panel, i) => (
        <button
          key={panel.id}
          className={cn(
            'h-1 w-6 rounded-full transition-colors focus-visible:outline-accent',
            i === activeIndex ? 'bg-accent' : 'bg-border hover:bg-muted'
          )}
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
        <HeroFigure />
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
      <span className="text-label text-muted absolute top-5 left-5 text-mono">
        {String(index + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(PANEL_COUNT).padStart(2, '0')}
      </span>
      <span className="text-label text-accent mb-4">{panel.label}</span>
      <div className="flex h-40 w-full max-w-[260px] flex-col items-center justify-center gap-4 border border-border">
        <span className="text-h3 text-foreground">{panel.title}</span>
        <PanelArt id={panel.id} />
      </div>
      <p className="mt-4 text-label text-muted text-center max-w-[260px]">{panel.description}</p>
      <a
        href={panel.cta.href}
        className="mt-3 text-label text-muted/60 hover:text-foreground underline underline-offset-4 transition-colors"
      >
        {panel.cta.label}
      </a>
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
