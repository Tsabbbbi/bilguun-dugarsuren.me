// Phase 1 placeholder — edit content in src/data/homepage.ts → contactData.

import { contactData } from '@/data/homepage'

export function ContactPreview() {
  return (
    <section
      className="border-t border-border px-[var(--spacing-site-x)] py-20"
      aria-labelledby="contact-preview-heading"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2
            id="contact-preview-heading"
            className="text-label text-muted mb-6"
          >
            CONTACT
          </h2>
          <div className="flex flex-col gap-2">
            <p className="text-h3 text-foreground">{contactData.headline}</p>
            <p className="text-body text-muted">{contactData.subline}</p>
          </div>
        </div>

        <a
          href={contactData.ctaHref}
          className="flex h-12 w-48 items-center justify-center border border-border text-label text-muted hover:text-foreground hover:border-foreground transition-colors"
        >
          {contactData.ctaLabel}
        </a>
      </div>
    </section>
  )
}
