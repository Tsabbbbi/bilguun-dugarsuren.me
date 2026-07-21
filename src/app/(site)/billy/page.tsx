import type { Metadata } from 'next'
import { DiagonalScroll } from '@/components/system/DiagonalScroll'
import { Reveal } from '@/components/system/Reveal'
import { BillyTerminal } from '@/components/billy/BillyTerminal'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = { title: 'Billy' }

const X  = 'px-[var(--spacing-site-x)]'
const PT = 'pt-28'

export default function BillyPage() {
  return (
    <DiagonalScroll>

      {/* ── Panel 0: Terminal + Footer ─────────────────────────────────────── */}
      <div className={`w-full min-h-full bg-background ${X} ${PT} pb-0 flex flex-col justify-between`}>
        <div className="pb-16">
          <Reveal>
            <p className="text-label text-muted mb-2">BILLY</p>
            <p className="text-h2 text-foreground mb-4">A terminal, not a chatbot.</p>
            <p className="text-body text-muted mb-10 max-w-lg">
              No API, no backend — just a scripted shell that knows my resume. Type{' '}
              <span className="text-mono text-accent">help</span> to get started.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <BillyTerminal />
          </Reveal>
        </div>

        <Footer />
      </div>

    </DiagonalScroll>
  )
}
