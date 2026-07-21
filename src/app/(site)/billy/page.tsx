import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/system/Reveal'
import { BillyTerminal } from '@/components/billy/BillyTerminal'

export const metadata: Metadata = { title: 'Billy' }

export default function BillyPage() {
  return (
    <PageContainer>
      <Section size="lg" aria-label="Billy">
        <Reveal>
          <p className="text-label text-muted mb-2">BILLY</p>
          <p className="text-h2 text-foreground mb-4">A terminal, not a chatbot.</p>
          <p className="text-body text-muted mb-10 max-w-lg">
            No API, no backend — just a scripted shell that knows my resume. Type{' '}
            <span className="text-mono text-accent">help</span> to get started.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <BillyTerminal />
        </Reveal>
      </Section>
    </PageContainer>
  )
}
