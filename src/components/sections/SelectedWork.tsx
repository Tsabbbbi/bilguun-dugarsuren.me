// Phase 1 placeholder — edit items in src/data/homepage.ts → selectedWork.

import { selectedWork } from '@/data/homepage'

export function SelectedWork() {
  return (
    <section
      className="border-t border-border px-[var(--spacing-site-x)] py-20"
      aria-labelledby="selected-work-heading"
    >
      <h2 id="selected-work-heading" className="text-label text-muted mb-12">
        SELECTED WORK
      </h2>

      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {selectedWork.map((item) => (
          <div
            key={item.id}
            className="flex aspect-[4/3] flex-col items-center justify-center bg-background"
          >
            <div className="flex h-full w-full flex-col items-center justify-center border border-dashed border-border m-px gap-1">
              <span className="text-label text-foreground">{item.title}</span>
              <span className="text-label text-muted">{item.category}</span>
              <span className="text-label text-muted/40">{item.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
