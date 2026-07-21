// Edit content in src/data/about.ts, src/data/profile.ts, src/data/skills.ts, src/data/journey.ts.

import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/system/Reveal'
import { Magnetic } from '@/components/system/Magnetic'
import { aboutData } from '@/data/about'
import { profile } from '@/data/profile'
import { skills } from '@/data/skills'
import { journeyEntries } from '@/data/journey'
import type { SkillCategory, JourneyType } from '@/types'

export const metadata: Metadata = { title: 'About' }

const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  languages:  'Languages',
  frameworks: 'Frameworks & Libraries',
  tools:      'Tools',
  design:     'Design',
  other:      'Other',
}

const SKILL_CATEGORIES: SkillCategory[] = ['languages', 'frameworks', 'tools', 'design', 'other']

const JOURNEY_TYPE_LABELS: Record<JourneyType, string> = {
  accomplishment: 'Accomplishments',
  learning:       'Learning',
  certification:  'Certifications',
  note:           'Notes',
}

const JOURNEY_GROUPS: JourneyType[] = ['accomplishment', 'learning', 'certification', 'note']

function shortDate(date: string): string {
  return date.length >= 7 ? date.slice(0, 7) : date
}

export default function AboutPage() {
  return (
    <PageContainer>

      {/* ── Bio header ──────────────────────────────────────────────────────── */}
      <Section size="lg" aria-label="About">

        <Reveal>
          <p className="text-label text-muted mb-2">ABOUT</p>
          <p className="text-h2 text-foreground mb-4">{profile.name}</p>
          <p className="text-body text-muted mb-12 max-w-xl">{profile.title} — {profile.bio}</p>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-3">

          {/* Left column — bio, experience, education, resume */}
          <div className="lg:col-span-2 flex flex-col gap-12">

            {/* Biography */}
            <Reveal>
              <p className="text-label text-muted mb-4">Biography</p>
              <div className="flex flex-col gap-4">
                {aboutData.bio.map((para, i) => (
                  <p key={i} className="text-body text-foreground leading-relaxed">{para}</p>
                ))}
              </div>
            </Reveal>

            {/* Experience */}
            <Reveal>
              <p className="text-label text-muted mb-4">Experience</p>
              <div className="flex flex-col gap-px bg-border">
                {aboutData.experience.map((exp) => (
                  <div key={exp.id} className="flex flex-col gap-2 bg-background py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <span className="text-body text-foreground">{exp.role}</span>
                      <span className="text-label text-mono text-muted/40 tabular-nums">{exp.period}</span>
                    </div>
                    <span className="text-label text-accent">{exp.org}</span>
                    <p className="text-label text-muted/60 mt-1">{exp.description}</p>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-2 flex flex-col gap-1.5 list-none">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className="text-label text-muted/50 flex gap-2">
                            <span className="text-accent/60 shrink-0">—</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Education */}
            <Reveal>
              <p className="text-label text-muted mb-4">Education</p>
              <div className="flex flex-col gap-px bg-border">
                {aboutData.education.map((edu) => (
                  <div key={edu.id} className="flex flex-col gap-1 bg-background py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-body text-foreground">{edu.school}</span>
                      <span className="text-label text-muted">{edu.degree}</span>
                    </div>
                    <span className="text-label text-mono text-muted/40 tabular-nums shrink-0">{edu.period}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Resume */}
            {aboutData.resumeHref && (
              <Reveal>
                <p className="text-label text-muted mb-4">Resume</p>
                <Magnetic strength={0.2}>
                  <a
                    href={aboutData.resumeHref}
                    className="inline-block text-label text-muted hover:text-foreground underline underline-offset-4 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF ↗
                  </a>
                </Magnetic>
              </Reveal>
            )}
          </div>

          {/* Right column — details */}
          <div className="flex flex-col gap-10">

            {/* Location */}
            <Reveal>
              <p className="text-label text-muted mb-2">Location</p>
              <p className="text-body text-foreground">{aboutData.location}</p>
            </Reveal>

            {/* Languages */}
            <Reveal delay={0.05}>
              <p className="text-label text-muted mb-4">Languages</p>
              <div className="flex flex-col gap-2">
                {aboutData.languages.map((lang) => (
                  <div key={lang.name} className="flex justify-between">
                    <span className="text-label text-foreground">{lang.name}</span>
                    <span className="text-label text-muted/60">{lang.level}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Awards */}
            <Reveal delay={0.1}>
              <p className="text-label text-muted mb-4">Awards</p>
              <div className="flex flex-col gap-3">
                {aboutData.awards.map((award) => (
                  <div key={award.id} className="flex flex-col gap-0.5">
                    <span className="text-label text-foreground">{award.title}</span>
                    <span className="text-label text-muted/50 text-mono">
                      {award.org ? `${award.org} · ` : ''}{award.date}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Skills */}
            <Reveal delay={0.15}>
              <p className="text-label text-muted mb-4">Skills</p>
              <div className="flex flex-col gap-6">
                {SKILL_CATEGORIES.map((cat) => {
                  const catSkills = skills.filter((s) => s.category === cat)
                  if (catSkills.length === 0) return null
                  return (
                    <div key={cat}>
                      <p className="text-label text-muted/40 mb-2">{SKILL_CATEGORY_LABELS[cat]}</p>
                      <div className="flex flex-col gap-1">
                        {catSkills.map((skill) => (
                          <span key={skill.name} className="text-label text-foreground">{skill.name}</span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>

            {/* Interests */}
            <Reveal delay={0.2}>
              <p className="text-label text-muted mb-4">Interests</p>
              <div className="flex flex-wrap gap-2">
                {aboutData.interests.map((interest) => (
                  <span key={interest} className="text-label text-muted/60 border border-border px-2 py-1">
                    {interest}
                  </span>
                ))}
              </div>
            </Reveal>

          </div>
        </div>

      </Section>

      {/* ── Journey timeline (merged from /journey) ─────────────────────────── */}
      <Section size="lg" divided aria-label="Journey">

        <Reveal>
          <p className="text-label text-muted mb-2">JOURNEY</p>
          <p className="text-h2 text-foreground mb-12">Milestones</p>
        </Reveal>

        <div className="flex flex-col gap-16">
          {JOURNEY_GROUPS.map((type) => {
            const entries = journeyEntries.filter((e) => e.type === type)
            if (entries.length === 0) return null
            return (
              <div key={type}>
                <Reveal>
                  <p className="text-label text-muted mb-6 border-b border-border pb-4">
                    {JOURNEY_TYPE_LABELS[type]}
                  </p>
                </Reveal>
                <div className="flex flex-col gap-px bg-border">
                  {entries.map((entry, i) => (
                    <Reveal key={entry.id} delay={Math.min(i, 4) * 0.05}>
                      <div className="flex flex-col gap-1 bg-background py-6 sm:flex-row sm:gap-12">
                        <span className="text-label text-mono text-accent tabular-nums shrink-0 w-24">
                          {shortDate(entry.date)}
                        </span>
                        <div className="flex flex-col gap-1">
                          <span className="text-body text-foreground">{entry.title}</span>
                          {entry.institution && (
                            <span className="text-label text-muted">{entry.institution}</span>
                          )}
                          {entry.body && (
                            <p className="text-label text-muted/60 mt-1">{entry.body}</p>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </Section>

    </PageContainer>
  )
}
