import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bilguun Dugarsuren',
}

/**
 * Home page lives outside (site)/ intentionally.
 * It has full control over its own layout — no forced nav, no footer.
 * The cinematic hero and navigation arm will be self-contained here.
 */
export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">

      {/* ── Nav placeholder ───────────────────────────────────────────────
          Future: custom homepage nav (transparent, arm-style, or overlay).
          Will NOT use the shared <Nav> component from (site)/layout.tsx.   */}
      <div className="flex h-[var(--nav-height)] w-full items-center justify-between px-[var(--spacing-site-x)]">
        <div className="flex h-6 w-16 items-center justify-center border border-dashed border-border">
          <span className="text-label text-muted">mark</span>
        </div>
        <div className="flex h-6 w-32 items-center justify-center border border-dashed border-border">
          <span className="text-label text-muted">nav arm</span>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────
          Future: cinematic full-viewport hero.                              */}
      <section className="flex flex-1 flex-col items-center justify-center px-[var(--spacing-site-x)]">

        {/* Figure — hero visual, animation, or cinematic element */}
        <div className="mb-12 flex h-48 w-full max-w-2xl items-center justify-center border border-dashed border-border md:h-72">
          <span className="text-label text-muted">figure — placeholder</span>
        </div>

        {/* Headline */}
        <div className="text-center">
          <p className="text-label text-muted">name · tagline · call to action</p>
        </div>

      </section>

    </div>
  )
}
