'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { Reveal } from '@/components/system/Reveal'
import { cn } from '@/lib/utils'
import type { ProjectCategory } from '@/types'

const CATEGORIES: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all',         label: 'All'          },
  { value: 'programming', label: 'Programming'  },
  { value: 'ai-research', label: 'AI & Research' },
  { value: 'design',      label: 'Design'        },
]

export function WorkList() {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      {/* Category filter */}
      <Reveal>
        <div className="flex flex-wrap gap-3 mb-12" role="group" aria-label="Filter projects by category">
          {CATEGORIES.map((cat) => {
            const active = filter === cat.value
            return (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                aria-pressed={active}
                className={cn(
                  'text-label border px-3 py-1 transition-colors',
                  active
                    ? 'border-accent text-foreground'
                    : 'border-border text-muted/60 hover:text-foreground hover:border-foreground'
                )}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* Project list */}
      <div className="flex flex-col gap-px bg-border">
        {visible.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i, 4) * 0.05}>
            <motion.a
              href={project.href ?? undefined}
              target={project.href ? '_blank' : undefined}
              rel={project.href ? 'noopener noreferrer' : undefined}
              className={cn(
                'group flex flex-col gap-2 bg-background py-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12',
                project.href ? 'cursor-pointer' : 'cursor-default'
              )}
              whileHover={project.href ? { x: 4 } : undefined}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-body text-foreground group-hover:text-accent transition-colors">
                  {project.title}{project.href ? ' ↗' : ''}
                </span>
                <p className="text-label text-muted">{project.description}</p>
                <div className="flex gap-3 flex-wrap mt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-label text-mono text-muted/40">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-6">
                <span className="text-label text-mono text-muted/40 tabular-nums">{project.year}</span>
                <span className="text-label text-muted/60 border border-border px-2 py-0.5">
                  {project.category.replace('-', ' ')}
                </span>
              </div>
            </motion.a>
          </Reveal>
        ))}

        {visible.length === 0 && (
          <p className="text-label text-muted/50 py-12 text-center">No projects in this category yet.</p>
        )}
      </div>
    </>
  )
}
