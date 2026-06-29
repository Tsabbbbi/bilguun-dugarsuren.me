// Edit projects in src/data/projects.ts.

import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'
import { projects } from '@/data/projects'
import type { ProjectCategory } from '@/types'

export const metadata: Metadata = { title: 'Work' }

const CATEGORIES: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all',          label: 'All'          },
  { value: 'programming',  label: 'Programming'  },
  { value: 'ai-research',  label: 'AI & Research' },
  { value: 'photography',  label: 'Photography'  },
  { value: 'design',       label: 'Design'       },
  { value: 'archive',      label: 'Archive'      },
]

export default function WorkPage() {
  return (
    <PageContainer>
      <Section size="lg" aria-label="Work">

        <p className="text-label text-muted mb-2">WORK</p>
        <p className="text-h2 text-foreground mb-12">Projects</p>

        {/* Category labels — static display, no filtering in Phase 1 */}
        <div className="flex flex-wrap gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <span key={cat.value} className="text-label text-muted/60 border border-dashed border-border px-3 py-1">
              {cat.label}
            </span>
          ))}
        </div>

        {/* Project list */}
        <div className="flex flex-col gap-px bg-border">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-2 bg-background py-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-body text-foreground">{project.title}</span>
                <p className="text-label text-muted">{project.description}</p>
                <div className="flex gap-3 flex-wrap mt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-label text-muted/40">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-6">
                <span className="text-label text-muted/40 tabular-nums">{project.year}</span>
                <span className="text-label text-muted/60 border border-dashed border-border px-2 py-0.5">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </Section>
    </PageContainer>
  )
}
