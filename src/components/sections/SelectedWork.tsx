// Cards shown here = projects with featured: true. Edit in src/data/projects.ts.

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { Reveal } from '@/components/system/Reveal'

const featured = projects.filter((p) => p.featured)

const ease = [0.23, 1, 0.32, 1] as const
const hoverSpring = { type: 'spring' as const, stiffness: 320, damping: 28, mass: 0.7 }

export function SelectedWork() {
  return (
    <section
      className="border-t border-border px-[var(--spacing-site-x)] py-20"
      aria-labelledby="selected-work-heading"
    >

      {/* Section header — editorial weight, not a reflexive eyebrow */}
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

      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
        {featured.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
            transition={{ duration: 0.48, ease, delay: i * 0.08 }}
            whileHover={{ y: -2, transition: hoverSpring }}
            whileTap={{ scale: 0.99, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
            className="h-full"
            style={{ willChange: 'transform' }}
          >
            <Link
              href="/work"
              className="group relative flex flex-col h-full bg-background p-8 overflow-hidden"
              style={{
                transition: 'background-color 240ms cubic-bezier(0.23,1,0.32,1)',
              }}
            >
              {/* Card number — decorative but anchors the sequence */}
              <span
                className="text-overline text-muted/20 mb-6 tabular-nums"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Category + year */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-label text-accent/80">
                  {item.category.replace('-', ' ')}
                </span>
                <span className="text-label text-muted/30 tabular-nums">{item.year}</span>
              </div>

              {/* Title — proper heading weight */}
              <h3 className="text-h2 text-foreground mb-3 leading-tight group-hover:text-foreground">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-body text-muted/65 leading-relaxed mb-6 max-w-[42ch]">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mt-auto">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-label text-muted/50 border border-border rounded-full px-2.5 py-0.5 group-hover:border-accent/30 group-hover:text-accent/70"
                    style={{ transition: 'color 200ms ease, border-color 200ms ease' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow — slides in on hover */}
              <span
                className="absolute top-8 right-8 text-accent text-label opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0"
                style={{
                  transition: 'opacity 200ms cubic-bezier(0.23,1,0.32,1), transform 200ms cubic-bezier(0.23,1,0.32,1)',
                }}
                aria-hidden="true"
              >
                ↗
              </span>

              {/* Bottom border highlight on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px bg-accent/0 group-hover:bg-accent/25"
                style={{ transition: 'background-color 300ms cubic-bezier(0.23,1,0.32,1)' }}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
