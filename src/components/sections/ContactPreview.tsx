// Edit content in src/data/homepage.ts → contactData.

import { contactData } from '@/data/homepage'
import { Reveal } from '@/components/system/Reveal'
import { Magnetic } from '@/components/system/Magnetic'

export function ContactPreview() {
  return (
    <section
      className="border-t border-border px-[var(--spacing-site-x)] py-20"
      aria-labelledby="contact-preview-heading"
    >
      <Reveal>
        <div className="flex flex-col gap-14 lg:flex-row lg:items-end lg:justify-between">

          <div className="flex flex-col gap-6">
            {/* Headline — section-hero weight, this is the climax of the homepage */}
            <h2
              id="contact-preview-heading"
              className="text-section-hero text-foreground max-w-[18ch]"
            >
              {contactData.headline}
            </h2>
            <p className="text-body text-muted/65 max-w-[38ch] leading-relaxed">
              {contactData.subline}
            </p>
          </div>

          <Magnetic strength={0.3}>
            <a
              href={contactData.ctaHref}
              className="flex h-12 w-48 shrink-0 items-center justify-center rounded-full border border-[#E6E8E2]/25 text-label text-[#E6E8E2]/70 hover:bg-[#E6E8E2] hover:text-[#0B1E1E] hover:border-[#E6E8E2]"
              style={{
                transition: 'background-color 240ms cubic-bezier(0.23,1,0.32,1), color 200ms ease, border-color 200ms ease, transform 120ms cubic-bezier(0.23,1,0.32,1)',
              }}
            >
              {contactData.ctaLabel}
            </a>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  )
}
