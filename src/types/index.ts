/* ─── Navigation ────────────────────────────────────────────────────────────── */

export interface NavItem {
  label: string
  href: string
}

/* ─── Profile ───────────────────────────────────────────────────────────────── */

export interface Profile {
  name: string
  initials: string
  title: string
  bio: string
  email: string
  location: string
  socials: {
    github: string
    linkedin: string
    [key: string]: string
  }
}

/* ─── Projects ──────────────────────────────────────────────────────────────── */

export type ProjectCategory =
  | 'programming'
  | 'ai-research'
  | 'photography'
  | 'design'
  | 'archive'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  year: number
  description: string
  tags: string[]
  href?: string         // external or internal link
  image?: string        // path relative to /public
  featured?: boolean
}

/* ─── Skills ────────────────────────────────────────────────────────────────── */

export type SkillCategory =
  | 'languages'
  | 'frameworks'
  | 'tools'
  | 'design'
  | 'other'

export interface Skill {
  name: string
  category: SkillCategory
}

/* ─── Homepage sections ─────────────────────────────────────────────────────── */

export interface UpdateEntry {
  id: string
  date: string   // display string, e.g. "06 / 26"
  title: string
  tag: string    // category: "Building" | "Learning" | "Research" | "Recently Finished"
}

export interface ContactData {
  headline: string
  subline: string
  ctaLabel: string
  ctaHref: string
}

export interface HeroPanel {
  id: string
  label: string
  title: string
  description: string
  cta: { label: string; href: string }
}

/* ─── About ──────────────────────────────────────────────────────────────────── */

export interface Language {
  name: string
  level: string  // e.g. "Native" | "Fluent" | "Conversational"
}

export interface Experience {
  id: string
  role: string
  org: string
  period: string       // e.g. "2023 – Present"
  description: string
  bullets?: string[]
}

export interface EducationEntry {
  id: string
  school: string
  degree: string
  period: string
}

export interface AwardEntry {
  id: string
  title: string
  org?: string
  date: string          // "YYYY" or "YYYY-MM"
}

export interface AboutData {
  bio: string[]        // array of paragraphs
  location: string
  resumeHref: string   // path to PDF in /public, e.g. "/resume.pdf"
  languages: Language[]
  experience: Experience[]
  education: EducationEntry[]
  awards: AwardEntry[]
  interests: string[]
}

/* ─── Journey ───────────────────────────────────────────────────────────────── */

export type JourneyType =
  | 'learning'
  | 'certification'
  | 'accomplishment'
  | 'note'

export interface JourneyEntry {
  id: string
  type: JourneyType
  title: string
  date: string           // ISO 8601 — YYYY-MM-DD
  institution?: string
  body?: string
  href?: string
}
