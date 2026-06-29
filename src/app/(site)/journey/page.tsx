// Edit entries in src/data/journey.ts.

import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'
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

export default function JourneyPage() {
  return (
    <PageContainer>
      <Section size="lg" aria-label="Journey">

        <p className="text-label text-muted mb-2">JOURNEY</p>
        <p className="text-h2 text-foreground mb-12">Milestones</p>

        <div className="flex flex-col gap-16">
          {GROUPS.map((type) => {
            const entries = journeyEntries.filter((e) => e.type === type)
            if (entries.length === 0) return null
            return (
              <div key={type}>
                <p className="text-label text-muted mb-6 border-b border-border pb-4">
                  {TYPE_LABELS[type]}
                </p>
                <div className="flex flex-col gap-px bg-border">
                  {entries.map((entry) => (
                    <div key={entry.id} className="flex flex-col gap-1 bg-background py-6 sm:flex-row sm:gap-12">
                      <span className="text-label text-muted/40 tabular-nums shrink-0 w-24">
                        {entry.date.slice(0, 7)}
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
