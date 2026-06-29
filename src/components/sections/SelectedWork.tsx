// Phase 1 placeholder — edit projects in src/data/projects.ts.
// Cards shown here = projects with featured: true.

import { projects } from '@/data/projects'

const featured = projects.filter((p) => p.featured)

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
        {featured.map((item) => (
          <div
            key={item.id}
            className="flex aspect-[4/3] flex-col bg-background"
          >
            <div className="flex h-full w-full flex-col justify-between border border-dashed border-border m-px p-6">
              <div className="flex flex-col gap-1">
                <span className="text-label text-foreground">{item.title}</span>
                <span className="text-label text-muted">{item.category} · {item.year}</span>
              </div>
              <p className="text-label text-muted/60">{item.description}</p>
              <div className="flex gap-2 flex-wrap">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-label text-muted/40">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
