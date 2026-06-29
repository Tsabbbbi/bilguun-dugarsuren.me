import type { Metadata } from 'next'
import { IntroAnimation } from '@/components/home/IntroAnimation'
import { Hero } from '@/components/home/Hero'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { LatestUpdates } from '@/components/sections/LatestUpdates'
import { ContactPreview } from '@/components/sections/ContactPreview'

export const metadata: Metadata = {
  title: 'Bilguun Dugarsuren',
}

/**
 * Homepage lives outside (site)/ intentionally — full layout control.
 * Phase 1: interaction architecture prototype. No final artwork or content.
 */
export default function HomePage() {
  return (
    <IntroAnimation>
      <div className="bg-background">

        {/* ── Nav placeholder ─────────────────────────────────────────────────
            Future: transparent overlay nav with mark + arm navigation.
            Will NOT use the shared <Nav> from (site)/layout.tsx.            */}
        <div className="absolute top-0 left-0 right-0 z-10 flex h-[var(--nav-height)] items-center justify-between px-[var(--spacing-site-x)] pointer-events-none">
          <div className="flex h-6 w-14 items-center justify-center border border-dashed border-border">
            <span className="text-label text-muted">mark</span>
          </div>
          <div className="flex h-6 w-28 items-center justify-center border border-dashed border-border">
            <span className="text-label text-muted">nav arm</span>
          </div>
        </div>

        {/* ── Hero + Editorial Slideshow ───────────────────────────────────── */}
        <Hero />

        {/* ── Placeholder content sections ────────────────────────────────── */}
        <SelectedWork />
        <LatestUpdates />
        <ContactPreview />

      </div>
    </IntroAnimation>
  )
}
