/**
 * Homepage sample content — Phase 1 placeholder data.
 *
 * Edit everything in this file freely.
 * Components import from here; nothing is hardcoded inside the JSX.
 */

import type { WorkItem, UpdateEntry, ContactData, HeroPanel } from '@/types'

// ── Selected Work ─────────────────────────────────────────────────────────────
// Add / remove / reorder items here. Each appears as one card in the grid.

export const selectedWork: WorkItem[] = [
  {
    id: 'project-a',
    title: 'Project A',
    category: 'Design',
    year: 2025,
    href: undefined,
  },
  {
    id: 'project-b',
    title: 'Project B',
    category: 'Programming',
    year: 2024,
    href: undefined,
  },
  {
    id: 'project-c',
    title: 'Project C',
    category: 'AI Research',
    year: 2024,
    href: undefined,
  },
]

// ── Latest Updates ────────────────────────────────────────────────────────────
// Rows in reverse-chronological order. date is a display string, not ISO.

export const latestUpdates: UpdateEntry[] = [
  {
    id: 'update-1',
    date: '06 / 26',
    title: 'Started building the new portfolio',
    tag: 'Dev',
  },
  {
    id: 'update-2',
    date: '06 / 15',
    title: 'Completed intro animation prototype',
    tag: 'Design',
  },
  {
    id: 'update-3',
    date: '05 / 30',
    title: 'Explored editorial layout references',
    tag: 'Research',
  },
  {
    id: 'update-4',
    date: '05 / 12',
    title: 'Initial concept — dark editorial direction',
    tag: 'Concept',
  },
]

// ── Contact ───────────────────────────────────────────────────────────────────

export const contactData: ContactData = {
  headline: "Let's work together",
  subline: 'Open to freelance, collaboration, and interesting problems.',
  ctaLabel: 'Get in touch',
  ctaHref: 'mailto:hello@example.com',  // ← replace with your email
}

// ── Hero Editorial Panels ─────────────────────────────────────────────────────
// Each panel = one stop in the horizontal slideshow.
// Keep the array length in sync if you add / remove panels (Hero.tsx reads it).

export const heroPanels: HeroPanel[] = [
  { id: 'work',    label: 'WORK',    title: 'Selected Work' },
  { id: 'journey', label: 'JOURNEY', title: 'Journey' },
  { id: 'billy',   label: 'BILLY',   title: 'Billy' },
  { id: 'about',   label: 'ABOUT',   title: 'About' },
  { id: 'contact', label: 'CONTACT', title: 'Contact' },
]
