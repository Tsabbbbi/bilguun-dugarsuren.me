import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <PageContainer>
      <Section size="lg">
        <p className="text-label text-muted mb-8">Contact — placeholder</p>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Heading / intro */}
          <div className="flex min-h-48 items-center justify-center border border-dashed border-border">
            <span className="text-label text-muted">headline — placeholder</span>
          </div>

          {/* CTA / form / email */}
          <div className="flex min-h-48 items-center justify-center border border-dashed border-border">
            <span className="text-label text-muted">cta / form — placeholder</span>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}
