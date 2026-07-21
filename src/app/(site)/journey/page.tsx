// Edit entries in src/data/journey.ts.

import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/system/Reveal'
import { journeyEntries } from '@/data/journey'
import type { JourneyType } from '@/types'

export const metadata: Metadata = { title: 'Journey' }

const TYPE_LABELS: Record<JourneyType, string> = {
  learning:       'Learning',
  certification:  'Certification',
  accomplishment: 'Accomplishment',
  note:           'Note',
}

// Group entries by type, preserving source order within each group
const GROUPS: JourneyType[] = ['accomplishment', 'learning', 'certification', 'note']

/** "2026-07-08" → "2026-07" · "2025" → "2025" · anything shorter is left as-is. */
function shortDate(date: string): string {
  return date.length >= 7 ? date.slice(0, 7) : date
}

export default function JourneyPage() {
  return (
    <PageContainer>
      <Section size="lg" aria-label="Journey">

        <Reveal>
          <p className="text-label text-muted mb-2">JOURNEY</p>
          <p className="text-h2 text-foreground mb-12">Milestones</p>
        </Reveal>

        <div className="flex flex-col gap-16">
          {GROUPS.map((type) => {
            const entries = journeyEntries.filter((e) => e.type === type)
            if (entries.length === 0) return null
            return (
              <div key={type}>
                <Reveal>
                  <p className="text-label text-muted mb-6 border-b border-border pb-4">
                    {TYPE_LABELS[type]}
                  </p>
                </Reveal>
                <div className="flex flex-col gap-px bg-border">
                  {entries.map((entry, i) => (
                    <Reveal key={entry.id} delay={Math.min(i, 4) * 0.05}>
                      <div className="flex flex-col gap-1 bg-background py-6 sm:flex-row sm:gap-12">
                        <span className="text-label text-mono text-accent tabular-nums shrink-0 w-24">
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

      </Section>
    </PageContainer>
  )
}
