import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'

export const metadata: Metadata = { title: 'Journey' }

// Future sub-sections: Learning · Certifications · Accomplishments · Notes

export default function JourneyPage() {
  return (
    <PageContainer>
      <Section size="lg">
        <p className="text-label text-muted mb-8">Journey — placeholder</p>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Tab / filter bar */}
          <div className="flex min-h-16 items-center justify-center border border-dashed border-border md:col-span-2">
            <span className="text-label text-muted">
              tabs — Learning · Certifications · Accomplishments · Notes
            </span>
          </div>

          {/* Timeline / list */}
          <div className="flex min-h-96 items-center justify-center border border-dashed border-border md:col-span-2">
            <span className="text-label text-muted">timeline — placeholder</span>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}
