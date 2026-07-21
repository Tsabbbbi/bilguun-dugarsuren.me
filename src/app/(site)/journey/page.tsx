// Edit entries in src/data/journey.ts.
// Note: Journey content is also shown in the About page (/about — panel 2).

import type { Metadata } from 'next'
import { DiagonalScroll } from '@/components/system/DiagonalScroll'
import { Reveal } from '@/components/system/Reveal'
import { Footer } from '@/components/layout/Footer'
import { journeyEntries } from '@/data/journey'
import type { JourneyType } from '@/types'

export const metadata: Metadata = { title: 'Journey' }

const TYPE_LABELS: Record<JourneyType, string> = {
  learning:       'Learning',
  certification:  'Certification',
  accomplishment: 'Accomplishment',
  note:           'Note',
}

const GROUPS: JourneyType[] = ['accomplishment', 'learning', 'certification', 'note']

function shortDate(date: string): string {
  return date.length >= 7 ? date.slice(0, 7) : date
}

const X  = 'px-[var(--spacing-site-x)]'
const PT = 'pt-28'

export default function JourneyPage() {
  return (
    <DiagonalScroll>

      {/* ── Panel 0: Timeline + Footer ─────────────────────────────────────── */}
      <div className={`w-full min-h-full bg-background ${X} ${PT} pb-0 flex flex-col justify-between`}>
        <div className="pb-16">
          <Reveal>
            <p className="text-label text-muted mb-2">JOURNEY</p>
            <p className="text-h2 text-foreground mb-12">Milestones</p>
          </Reveal>

          <div className="flex flex-col gap-14">
            {GROUPS.map((type) => {
              const entries = journeyEntries.filter((e) => e.type === type)
              if (!entries.length) return null
              return (
                <div key={type}>
                  <Reveal>
                    <p className="text-label text-muted mb-5 border-b border-border pb-3">
                      {TYPE_LABELS[type]}
                    </p>
                  </Reveal>
                  <div className="flex flex-col gap-px bg-border">
                    {entries.map((entry, i) => (
                      <Reveal key={entry.id} delay={Math.min(i, 4) * 0.05}>
                        <div className="flex flex-col gap-1 bg-background py-5 sm:flex-row sm:gap-12">
                          <span className="text-label text-mono text-accent tabular-nums shrink-0 w-20">
                            {shortDate(entry.date)}
                          </span>
                          <div className="flex flex-col gap-1">
                            <span className="text-body text-foreground">{entry.title}</span>
                            {entry.institution && (
                              <span className="text-label text-muted">{entry.institution}</span>
                            )}
                            {entry.body && (
                              <p className="text-label text-muted/60 mt-1">{entry.body}</p>
                            )}
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <Footer />
      </div>

    </DiagonalScroll>
  )
}
