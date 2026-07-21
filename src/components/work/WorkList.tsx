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
                  'text-label border rounded-full px-3 py-1 transition-colors',
                  active
                    ? 'border-[#E6E8E2] bg-[#E6E8E2] text-[#0B1E1E]'
                    : 'border-border text-muted/60 hover:text-[#E6E8E2] hover:border-[#E6E8E2]/50'
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
              whileHover={project.href ? { x: 5 } : undefined}
              whileTap={project.href ? { x: 2 } : undefined}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="flex flex-col gap-1.5 min-w-0">
                <span className="text-h3 text-foreground group-hover:text-accent"
                  style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}>
                  {project.title}{project.href ? ' ↗' : ''}
                </span>
                <p className="text-body text-muted/65 leading-relaxed max-w-[52ch]">{project.description}</p>
                <div className="flex gap-3 flex-wrap mt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-label text-mono text-muted/40">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-4 mt-1 sm:mt-0">
                <span className="text-label text-mono text-muted/35 tabular-nums">{project.year}</span>
                <span className="text-label text-muted/55 border border-border rounded-full px-2.5 py-0.5">
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
