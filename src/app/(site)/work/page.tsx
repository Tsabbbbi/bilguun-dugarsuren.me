// Edit projects in src/data/projects.ts.

import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/system/Reveal'
import { WorkList } from '@/components/work/WorkList'

export const metadata: Metadata = { title: 'Work' }

export default function WorkPage() {
  return (
    <PageContainer>
      <Section size="lg" aria-label="Work">
        <Reveal>
          <p className="text-label text-muted mb-2">WORK</p>
          <p className="text-h2 text-foreground mb-12">Projects</p>
        </Reveal>

        <WorkList />
      </Section>
    </PageContainer>
  )
}
