// Edit content in src/data/about.ts, src/data/profile.ts, src/data/journey.ts.

import type { Metadata } from 'next'
import Link from 'next/link'
import { DiagonalScroll } from '@/components/system/DiagonalScroll'
import { Reveal } from '@/components/system/Reveal'
import { Magnetic } from '@/components/system/Magnetic'
import { WindowCard } from '@/components/ui/WindowCard'
import { Footer } from '@/components/layout/Footer'
import { aboutData } from '@/data/about'
import { profile } from '@/data/profile'
import { skills } from '@/data/skills'
import { journeyEntries } from '@/data/journey'
import type { SkillCategory, JourneyType } from '@/types'

export const metadata: Metadata = { title: 'About' }

const SKILL_LABELS: Record<SkillCategory, string> = {
  languages:  'Languages',
  frameworks: 'Frameworks & Libraries',
  tools:      'Tools',
  design:     'Design',
  other:      'Other',
}
const SKILL_CATS: SkillCategory[] = ['languages', 'frameworks', 'tools', 'design', 'other']

const JOURNEY_LABELS: Record<JourneyType, string> = {
  accomplishment: 'Accomplishments',
  learning:       'Learning',
  certification:  'Certifications',
  note:           'Notes',
}
const JOURNEY_GROUPS: JourneyType[] = ['accomplishment', 'learning', 'certification', 'note']

function shortDate(d: string) { return d.length >= 7 ? d.slice(0, 7) : d }

const X = 'px-[var(--spacing-site-x)]'
const PT = 'pt-28'

const PAPER_BODY = '#3A3A2A'
const PAPER_MUTED = '#5A4A3A'
const PAPER_ACCENT = '#4C6A73'
const PAPER_GREEN = '#1F3D2E'

export default function AboutPage() {
  return (
    <DiagonalScroll>

      {/* ── Panel 0: Bio + Stats ────────────────────────────────────────────── */}
      <div className={`w-full min-h-full bg-background ${X} ${PT} pb-16`}>
        <Reveal>
          <p className="text-h1 text-foreground mb-3">{profile.name}</p>
          <p className="text-body text-muted/65 mb-14 max-w-lg">{profile.title}</p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

          {/* Bio paragraphs — each in a WindowCard */}
          <div className="flex flex-col gap-4">
            {aboutData.bio.map((para, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <WindowCard
                  title={i === 0 ? 'Bio' : `Bio — continued`}
                  subtitle={`Note ${i + 1} of ${aboutData.bio.length}`}
                  defaultState="open"
                >
                  <p className="text-body leading-relaxed" style={{ color: PAPER_BODY }}>
                    {para}
                  </p>
                </WindowCard>
              </Reveal>
            ))}
            {aboutData.resumeHref && (
              <Reveal delay={0.18}>
                <Magnetic strength={0.2}>
                  <a
                    href={aboutData.resumeHref}
                    className="inline-block mt-2 text-label text-accent hover:text-foreground underline underline-offset-4"
                    style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Resume ↗
                  </a>
                </Magnetic>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 border-l border-border pl-8 lg:pl-10">
            <Reveal delay={0.06}>
              <p className="text-overline text-muted/40 mb-2">Location</p>
              <p className="text-body text-foreground">{aboutData.location}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-overline text-muted/40 mb-4">Languages</p>
              <div className="flex flex-col gap-3">
                {aboutData.languages.map((l) => (
                  <div key={l.name} className="flex justify-between items-baseline gap-4">
                    <span className="text-body text-foreground">{l.name}</span>
                    <span className="text-label text-muted/45 tabular-nums">{l.level}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="text-overline text-muted/40 mb-4">Awards</p>
              <div className="flex flex-col gap-4">
                {aboutData.awards.map((a) => (
                  <div key={a.id} className="flex flex-col gap-0.5">
                    <span className="text-body text-foreground leading-snug">{a.title}</span>
                    <span className="text-label text-mono text-muted/45">{a.org ? `${a.org} · ` : ''}{a.date}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="text-overline text-muted/40 mb-4">Interests</p>
              <div className="flex flex-wrap gap-2">
                {aboutData.interests.map((i) => (
                  <span key={i} className="text-label text-muted/55 border border-border rounded-full px-2.5 py-0.5">{i}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Panel 1: Experience + Education + Skills ────────────────────────── */}
      <div className={`w-full min-h-full bg-background ${X} ${PT} pb-16`}>
        <div className="grid gap-14 lg:grid-cols-[2fr_1fr]">

          {/* Experience — each entry in a WindowCard */}
          <div>
            <Reveal>
              <p className="text-h2 text-foreground mb-8">Experience</p>
            </Reveal>
            <div className="flex flex-col gap-4">
              {aboutData.experience.map((exp, i) => (
                <Reveal key={exp.id} delay={i * 0.05}>
                  <WindowCard
                    title={exp.role}
                    subtitle={exp.period}
                    defaultState="open"
                  >
                    <div className="flex flex-col gap-3">
                      <p className="text-label font-medium" style={{ color: PAPER_ACCENT }}>
                        {exp.org}
                      </p>
                      {exp.description && (
                        <p className="text-body leading-relaxed" style={{ color: PAPER_BODY }}>
                          {exp.description}
                        </p>
                      )}
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="flex flex-col gap-1.5 list-none mt-1">
                          {exp.bullets.map((b, j) => (
                            <li key={j} className="text-label flex gap-2" style={{ color: PAPER_MUTED }}>
                              <span style={{ color: PAPER_ACCENT, opacity: 0.6 }}>—</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </WindowCard>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Education + Skills */}
          <div className="flex flex-col gap-12">
            <div>
              <Reveal>
                <p className="text-h2 text-foreground mb-6">Education</p>
              </Reveal>
              <div className="flex flex-col gap-4">
                {aboutData.education.map((edu) => (
                  <WindowCard key={edu.id} title={edu.school} subtitle={edu.period} defaultState="open">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-body font-medium" style={{ color: PAPER_GREEN }}>{edu.school}</p>
                      <p className="text-body" style={{ color: PAPER_BODY, opacity: 0.75 }}>{edu.degree}</p>
                      <p className="text-label text-mono tabular-nums" style={{ color: PAPER_MUTED, opacity: 0.7 }}>{edu.period}</p>
                    </div>
                  </WindowCard>
                ))}
              </div>
            </div>

            <Reveal delay={0.06}>
              <p className="text-h2 text-foreground mb-6">Skills</p>
              <div className="flex flex-col gap-5">
                {SKILL_CATS.map((cat) => {
                  const catSkills = skills.filter((s) => s.category === cat)
                  if (!catSkills.length) return null
                  return (
                    <div key={cat}>
                      <p className="text-overline text-muted/35 mb-2">{SKILL_LABELS[cat]}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                        {catSkills.map((s) => (
                          <span key={s.name} className="text-body text-foreground/80">{s.name}</span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Panel 2: Journey + Footer ────────────────────────────────────────── */}
      <div className={`w-full min-h-full bg-background ${X} ${PT} pb-0 flex flex-col justify-between`}>
        <div className="pb-16">
          <Reveal>
            <p className="text-h1 text-foreground mb-14">Milestones</p>
          </Reveal>

          <div className="flex flex-col gap-14">
            {JOURNEY_GROUPS.map((type) => {
              const entries = journeyEntries.filter((e) => e.type === type)
              if (!entries.length) return null
              return (
                <div key={type}>
                  <Reveal>
                    <p className="text-h2 text-foreground mb-6 pb-3 border-b border-border">
                      {JOURNEY_LABELS[type]}
                    </p>
                  </Reveal>
                  <div className="flex flex-col gap-3">
                    {entries.map((entry, i) => (
                      <Reveal key={entry.id} delay={Math.min(i, 3) * 0.05}>
                        <WindowCard
                          title={entry.title}
                          subtitle={shortDate(entry.date)}
                          defaultState="open"
                        >
                          <div className="flex flex-col gap-1.5">
                            <p className="text-body font-medium leading-snug" style={{ color: PAPER_GREEN }}>{entry.title}</p>
                            {entry.institution && (
                              <p className="text-body" style={{ color: PAPER_BODY, opacity: 0.7 }}>{entry.institution}</p>
                            )}
                            {entry.body && (
                              <p className="text-label leading-relaxed mt-0.5" style={{ color: PAPER_MUTED, opacity: 0.85 }}>{entry.body}</p>
                            )}
                          </div>
                        </WindowCard>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 pt-8 border-t border-border">
              <Magnetic strength={0.2}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-body text-muted hover:text-foreground"
                  style={{ transition: 'color 200ms cubic-bezier(0.23,1,0.32,1)' }}
                >
                  <span>Get in touch</span>
                  <span
                    className="inline-block group-hover:translate-x-1.5"
                    style={{ transition: 'transform 200ms cubic-bezier(0.23,1,0.32,1)' }}
                  >→</span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Footer />
      </div>

    </DiagonalScroll>
  )
}
