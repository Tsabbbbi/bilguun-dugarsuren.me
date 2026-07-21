import type { Metadata } from 'next'
import { IntroAnimation } from '@/components/home/IntroAnimation'
import { Hero } from '@/components/home/Hero'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { SkillsMarquee } from '@/components/sections/SkillsMarquee'
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { ContactPreview } from '@/components/sections/ContactPreview'
import { Footer } from '@/components/layout/Footer'
import { DiagonalScroll } from '@/components/system/DiagonalScroll'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: profile.name,
  description: profile.bio,
}

/**
 * Homepage — four full-screen diagonal-scroll panels.
 * Nav is rendered in app/layout.tsx (fixed, always above).
 * IntroAnimation overlays everything at z-100 until dismissed.
 */
export default function HomePage() {
  return (
    <IntroAnimation>
      <DiagonalScroll>

        {/* ── Panel 0: Hero ───────────────────────────────────────────────── */}
        <div className="relative w-full h-full bg-background">
          <Hero />
        </div>

        {/* ── Panel 1: Selected Work ──────────────────────────────────────── */}
        <div className="relative w-full h-full bg-background flex flex-col justify-center">
          <SelectedWork />
        </div>

        {/* ── Panel 2: Skills + About ─────────────────────────────────────── */}
        <div className="relative w-full h-full bg-background flex flex-col justify-center">
          <SkillsMarquee />
          <AboutTeaser />
        </div>

        {/* ── Panel 3: Contact + Footer ───────────────────────────────────── */}
        <div className="relative w-full h-full bg-background flex flex-col justify-between">
          <ContactPreview />
          <Footer />
        </div>

      </DiagonalScroll>
    </IntroAnimation>
  )
}
