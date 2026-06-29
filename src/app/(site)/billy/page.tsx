import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'

export const metadata: Metadata = { title: 'Billy' }

/**
 * Implementation options — choose one before building:
 *
 * A — AI chatbot (Claude API, streaming, system prompt = your bio + projects)
 * B — Animated digital persona (character, quotes, mood — no backend)
 * C — Terminal / typewriter interface (keyboard-driven easter egg)
 */

export default function BillyPage() {
  return (
    <PageContainer>
      <Section size="lg">
        <p className="text-label text-muted mb-8">Billy — placeholder</p>

        <div className="flex min-h-[60vh] items-center justify-center border border-dashed border-border">
          <span className="text-label text-muted">
            Billy — implementation TBD (A: chatbot · B: persona · C: terminal)
          </span>
        </div>
      </Section>
    </PageContainer>
  )
}
