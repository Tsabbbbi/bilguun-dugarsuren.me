// Phase 1 placeholder — edit entries in src/data/homepage.ts → latestUpdates.

import { latestUpdates } from '@/data/homepage'

export function LatestUpdates() {
  return (
    <section
      className="border-t border-border px-[var(--spacing-site-x)] py-20"
      aria-labelledby="latest-updates-heading"
    >
      <h2 id="latest-updates-heading" className="text-label text-muted mb-12">
        LATEST UPDATES
      </h2>

      <div className="flex flex-col gap-px bg-border">
        {latestUpdates.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between bg-background py-6 gap-8"
          >
            <div className="flex items-center gap-6">
              <span className="text-label text-muted/40 tabular-nums w-16 shrink-0">
                {entry.date}
              </span>
              <span className="text-label text-foreground">{entry.title}</span>
            </div>
            <span className="text-label text-muted/60 shrink-0">{entry.tag}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
