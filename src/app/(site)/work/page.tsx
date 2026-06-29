import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'

export const metadata: Metadata = { title: 'Work' }

// Future sub-sections: Programming · AI & Research · Photography · Design · Archive

export default function WorkPage() {
  return (
    <PageContainer>
      <Section size="lg">
        <p className="text-label text-muted mb-8">Work — placeholder</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Category navigation */}
          <div className="flex min-h-48 items-center justify-center border border-dashed border-border lg:col-span-3">
            <span className="text-label text-muted">
              category nav — Programming · AI &amp; Research · Photography · Design · Archive
            </span>
          </div>

          {/* Project list */}
          <div className="flex min-h-64 items-center justify-center border border-dashed border-border lg:col-span-2">
            <span className="text-label text-muted">project list — placeholder</span>
          </div>

          {/* Filters / sidebar */}
          <div className="flex min-h-64 items-center justify-center border border-dashed border-border">
            <span className="text-label text-muted">filters — placeholder</span>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}
