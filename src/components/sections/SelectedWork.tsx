// Cards shown here = projects with featured: true. Edit in src/data/projects.ts.

import Link from 'next/link'
import { projects } from '@/data/projects'
import { Reveal } from '@/components/system/Reveal'

const featured = projects.filter((p) => p.featured)

export function SelectedWork() {
  return (
    <section
      className="border-t border-border px-[var(--spacing-site-x)] py-20"
      aria-labelledby="selected-work-heading"
    >
      <Reveal>
        <h2 id="selected-work-heading" className="text-label text-muted mb-12">
          SELECTED WORK
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08} className="h-full">
            <Link
              href="/work"
              className="group flex aspect-[4/3] flex-col bg-background"
            >
              <div className="flex h-full w-full flex-col justify-between bg-surface border border-border m-px p-6 transition-colors duration-300 group-hover:border-accent/60 group-hover:bg-subtle/40">
                <div className="flex flex-col gap-1">
                  <span className="text-label text-foreground">{item.title}</span>
                  <span className="text-label text-muted/60">{item.category.replace('-', ' ')} · {item.year}</span>
                </div>
                <p className="text-label text-muted/70 leading-relaxed">{item.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-label text-muted/40">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
