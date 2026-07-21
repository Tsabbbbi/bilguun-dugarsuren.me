// Edit projects in src/data/projects.ts.

import type { Metadata } from 'next'
import { DiagonalScroll } from '@/components/system/DiagonalScroll'
import { Reveal } from '@/components/system/Reveal'
import { WorkList } from '@/components/work/WorkList'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = { title: 'Work' }

const X  = 'px-[var(--spacing-site-x)]'
const PT = 'pt-28'

export default function WorkPage() {
  return (
    <DiagonalScroll>

      {/* ── Panel 0: Projects list ────────────────────────────────────────── */}
      <div className={`w-full min-h-full bg-background ${X} ${PT} pb-0 flex flex-col justify-between`}>
        <div className="pb-16">
          <Reveal>
            <p className="text-h1 text-foreground mb-12">Projects</p>
          </Reveal>
          <WorkList />
        </div>
        <Footer />
      </div>

    </DiagonalScroll>
  )
}
