// Edit content in src/data/profile.ts and src/data/homepage.ts → contactData.

import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/system/Reveal'
import { Magnetic } from '@/components/system/Magnetic'
import { profile } from '@/data/profile'
import { contactData } from '@/data/homepage'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <PageContainer>
      <Section size="lg" aria-label="Contact">

        <Reveal>
          <p className="text-label text-muted mb-2">CONTACT</p>
          <p className="text-h2 text-foreground mb-4">{contactData.headline}</p>
          <p className="text-body text-muted mb-16 max-w-lg">{contactData.subline}</p>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-2">

          {/* Primary CTA */}
          <Reveal>
            <div className="flex flex-col gap-6">
              <p className="text-label text-muted">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="text-h3 text-foreground hover:text-accent transition-colors break-all"
              >
                {profile.email}
              </a>
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-4 flex h-12 w-48 items-center justify-center border border-border text-label text-muted hover:text-foreground hover:border-accent transition-colors"
                >
                  {contactData.ctaLabel}
                </a>
              </Magnetic>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-label text-muted mb-2">Location</p>
                <p className="text-body text-foreground">{profile.location}</p>
              </div>

              {(profile.socials.github || profile.socials.linkedin) && (
                <div>
                  <p className="text-label text-muted mb-3">Links</p>
                  <div className="flex flex-col gap-2">
                    {profile.socials.github && (
                      <a
                        href={profile.socials.github}
                        className="text-label text-muted hover:text-foreground underline underline-offset-4 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {profile.socials.linkedin && (
                      <a
                        href={profile.socials.linkedin}
                        className="text-label text-muted hover:text-foreground underline underline-offset-4 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn ↗
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Reveal>

        </div>
      </Section>
    </PageContainer>
  )
}
