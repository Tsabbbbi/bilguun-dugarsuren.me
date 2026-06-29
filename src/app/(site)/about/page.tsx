// Edit content in src/data/about.ts, src/data/profile.ts, src/data/skills.ts.

import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'
import { aboutData } from '@/data/about'
import { profile } from '@/data/profile'
import { skills } from '@/data/skills'
import type { SkillCategory } from '@/types'

export const metadata: Metadata = { title: 'About' }

const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  languages:  'Languages',
  frameworks: 'Frameworks & Libraries',
  tools:      'Tools',
  design:     'Design',
  other:      'Other',
}

const SKILL_CATEGORIES: SkillCategory[] = ['languages', 'frameworks', 'tools', 'design', 'other']

export default function AboutPage() {
  return (
    <PageContainer>
      <Section size="lg" aria-label="About">

        <p className="text-label text-muted mb-2">ABOUT</p>
        <p className="text-h2 text-foreground mb-12">{profile.name}</p>

        <div className="grid gap-16 lg:grid-cols-3">

          {/* Left column — bio + languages */}
          <div className="lg:col-span-2 flex flex-col gap-12">

            {/* Biography */}
            <div>
              <p className="text-label text-muted mb-4">Biography</p>
              <div className="flex flex-col gap-4">
                {aboutData.bio.map((para, i) => (
                  <p key={i} className="text-body text-foreground leading-relaxed">{para}</p>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <p className="text-label text-muted mb-4">Experience</p>
              <div className="flex flex-col gap-px bg-border">
                {aboutData.experience.map((exp) => (
                  <div key={exp.id} className="flex flex-col gap-1 bg-background py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <span className="text-body text-foreground">{exp.role}</span>
                      <span className="text-label text-muted/40 tabular-nums">{exp.period}</span>
                    </div>
                    <span className="text-label text-muted">{exp.org}</span>
                    <p className="text-label text-muted/60 mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume */}
            {aboutData.resumeHref && (
              <div>
                <p className="text-label text-muted mb-4">Resume</p>
                <a
                  href={aboutData.resumeHref}
                  className="text-label text-muted hover:text-foreground underline underline-offset-4 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download PDF ↗
                </a>
              </div>
            )}
          </div>

          {/* Right column — details */}
          <div className="flex flex-col gap-10">

            {/* Location */}
            <div>
              <p className="text-label text-muted mb-2">Location</p>
              <p className="text-body text-foreground">{aboutData.location}</p>
            </div>

            {/* Languages */}
            <div>
              <p className="text-label text-muted mb-4">Languages</p>
              <div className="flex flex-col gap-2">
                {aboutData.languages.map((lang) => (
                  <div key={lang.name} className="flex justify-between">
                    <span className="text-label text-foreground">{lang.name}</span>
                    <span className="text-label text-muted/60">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
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
            </div>

          </div>
        </div>

      </Section>
    </PageContainer>
  )
}
