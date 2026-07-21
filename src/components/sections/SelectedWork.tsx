// Cards shown here = projects with featured: true. Edit in src/data/projects.ts.

'use client'

import { Reveal } from '@/components/system/Reveal'
import { WindowCard } from '@/components/ui/WindowCard'
import { projects } from '@/data/projects'
import Link from 'next/link'

const featured = projects.filter((p) => p.featured)

export function SelectedWork() {
  return (
    <section
      className="border-t border-border px-[var(--spacing-site-x)] py-20"
      aria-labelledby="selected-work-heading"
    >
      <Reveal>
        <div className="flex flex-col gap-3 mb-16 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="selected-work-heading" className="text-h1 text-foreground">
            Work
          </h2>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-label text-muted hover:text-foreground shrink-0 mb-1"
            style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}
          >
            <span>All projects</span>
            <span
              className="inline-block group-hover:translate-x-1.5"
              style={{ transition: 'transform 200ms cubic-bezier(0.23,1,0.32,1)' }}
            >→</span>
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {featured.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.07}>
            <WindowCard
              title={item.title}
              subtitle={`${item.category.replace('-', ' ')} · ${item.year}`}
              defaultState="open"
            >
              {/* Card content on paper */}
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-body font-medium leading-snug mb-2" style={{ color: '#1F3D2E' }}>
                    {item.title}
                  </p>
                  <p className="text-body leading-relaxed" style={{ color: '#3A3A2A', opacity: 0.75 }}>
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-label rounded-full px-2.5 py-0.5"
                      style={{
                        color: '#4C6A73',
                        border: '1px solid rgba(76,106,115,0.3)',
                        background: 'rgba(76,106,115,0.06)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/work"
                  className="text-label inline-flex items-center gap-1.5"
                  style={{ color: '#6B7F4E', transition: 'color 150ms ease' }}
                >
                  View project →
                </Link>
              </div>
            </WindowCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
