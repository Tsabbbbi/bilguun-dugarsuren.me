import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <PageContainer>
      <Section size="lg">
        <p className="text-label text-muted mb-8">About — placeholder</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Bio */}
          <div className="flex min-h-48 items-center justify-center border border-dashed border-border md:col-span-2">
            <span className="text-label text-muted">bio — placeholder</span>
          </div>

          {/* Photo */}
          <div className="flex aspect-[3/4] items-center justify-center border border-dashed border-border">
            <span className="text-label text-muted">photo — placeholder</span>
          </div>

          {/* Skills */}
          <div className="flex min-h-32 items-center justify-center border border-dashed border-border">
            <span className="text-label text-muted">skills — placeholder</span>
          </div>

          {/* Location / details */}
          <div className="flex min-h-32 items-center justify-center border border-dashed border-border">
            <span className="text-label text-muted">details — placeholder</span>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}
