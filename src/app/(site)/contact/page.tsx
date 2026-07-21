// Edit content in src/data/profile.ts and src/data/homepage.ts → contactData.

import type { Metadata } from 'next'
import Link from 'next/link'
import { DiagonalScroll } from '@/components/system/DiagonalScroll'
import { Reveal } from '@/components/system/Reveal'
import { Magnetic } from '@/components/system/Magnetic'
import { Footer } from '@/components/layout/Footer'
import { profile } from '@/data/profile'
import { contactData } from '@/data/homepage'

export const metadata: Metadata = { title: 'Contact' }

const X  = 'px-[var(--spacing-site-x)]'
const PT = 'pt-28'

export default function ContactPage() {
  return (
    <DiagonalScroll>

      {/* ── Panel 0: Contact + Footer ──────────────────────────────────────── */}
      <div className={`w-full min-h-full bg-background ${X} ${PT} pb-0 flex flex-col justify-between`}>
        <div className="pb-16">
          <Reveal>
            {/* Headline at section-hero weight — this page is all CTA */}
            <h1 className="text-section-hero text-foreground mb-4 max-w-[20ch]">
              {contactData.headline}
            </h1>
            <p className="text-body text-muted/65 mb-16 max-w-lg leading-relaxed">
              {contactData.subline}
            </p>
          </Reveal>

          <div className="grid gap-12 md:grid-cols-2">

            {/* Primary CTA — email gets proper display treatment */}
            <Reveal>
              <div className="flex flex-col gap-5">
                <p className="text-overline text-muted/40">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-h2 text-foreground hover:text-accent break-all leading-tight"
                  style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}
                >
                  {profile.email}
                </a>
                <Magnetic strength={0.25}>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-4 flex h-12 w-48 items-center justify-center border border-[#DCC9A3]/25 rounded-full text-label text-muted hover:text-foreground hover:border-accent/60"
                    style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1), border-color 200ms cubic-bezier(0.23,1,0.32,1)' }}
                  >
                    {contactData.ctaLabel}
                  </a>
                </Magnetic>
              </div>
            </Reveal>

            {/* Links */}
            <Reveal delay={0.08}>
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-overline text-muted/40 mb-2">Location</p>
                  <p className="text-body text-foreground">{profile.location}</p>
                </div>

                {(profile.socials.github || profile.socials.linkedin) && (
                  <div>
                    <p className="text-overline text-muted/40 mb-3">Links</p>
                    <div className="flex flex-col gap-2">
                      {profile.socials.github && (
                        <a
                          href={profile.socials.github}
                          className="text-body text-muted/70 hover:text-foreground underline underline-offset-4"
                          style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub ↗
                        </a>
                      )}
                      {profile.socials.linkedin && (
                        <a
                          href={profile.socials.linkedin}
                          className="text-body text-muted/70 hover:text-foreground underline underline-offset-4"
                          style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-overline text-muted/40 mb-3">Explore</p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/about"
                      className="text-body text-muted/70 hover:text-foreground underline underline-offset-4"
                      style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}
                    >
                      About & Journey
                    </Link>
                    <Link
                      href="/work"
                      className="text-body text-muted/70 hover:text-foreground underline underline-offset-4"
                      style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}
                    >
                      Projects
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Footer />
      </div>

    </DiagonalScroll>
  )
}
