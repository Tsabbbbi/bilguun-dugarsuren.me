/**
 * Homepage sample content — Phase 1 placeholder data.
 *
 * Edit everything in this file freely.
 * Components import from here; nothing is hardcoded inside JSX.
 *
 * Selected Work cards → edit src/data/projects.ts (set featured: true)
 */

import type { UpdateEntry, ContactData, HeroPanel } from '@/types'

// ── Hero Editorial Panels ─────────────────────────────────────────────────────
// Each panel = one stop in the horizontal slideshow.
// Edit labels, titles, descriptions, and CTAs here.
// Add/remove panels — Hero.tsx reads PANEL_COUNT from this array automatically.

export const heroPanels: HeroPanel[] = [
  {
    id:          'work',
    label:       'WORK',
    title:       'Selected Work',
    description: 'Programming, design, AI research, and photography.',
    cta:         { label: 'View all work', href: '/work' },
  },
  {
    id:          'journey',
    label:       'JOURNEY',
    title:       'Journey',
    description: 'Learning, certifications, and milestones along the way.',
    cta:         { label: 'See the journey', href: '/journey' },
  },
  {
    id:          'billy',
    label:       'BILLY',
    title:       'Billy',
    description: 'An AI persona, a terminal, or something in between.',
    cta:         { label: 'Meet Billy', href: '/billy' },
  },
  {
    id:          'about',
    label:       'ABOUT',
    title:       'About',
    description: 'Background, skills, languages, and experience.',
    cta:         { label: 'About me', href: '/about' },
  },
  {
    id:          'contact',
    label:       'CONTACT',
    title:       'Contact',
    description: 'Open to freelance, collaboration, and interesting problems.',
    cta:         { label: 'Get in touch', href: '/contact' },
  },
]

// ── Latest Updates ────────────────────────────────────────────────────────────
// tag values: "Building" | "Learning" | "Research" | "Recently Finished"
// Sorted newest first by convention.

export const latestUpdates: UpdateEntry[] = [
  {
    id:    'update-1',
    date:  '06 / 26',
    title: 'Building the new portfolio — intro animation shipped',
    tag:   'Building',
  },
  {
    id:    'update-2',
    date:  '06 / 15',
    title: 'Researching editorial layout and typographic systems',
    tag:   'Research',
  },
  {
    id:    'update-3',
    date:  '05 / 30',
    title: 'Finished Next.js App Router deep-dive',
    tag:   'Recently Finished',
  },
  {
    id:    'update-4',
    date:  '05 / 12',
    title: 'Learning Framer Motion — advanced animation patterns',
    tag:   'Learning',
  },
]

// ── Contact Preview (homepage strip) ─────────────────────────────────────────

export const contactData: ContactData = {
  headline: "Let's work together",
  subline:  'Open to freelance, collaboration, and interesting problems.',
  ctaLabel: 'Get in touch',
  ctaHref:  '/contact',
}
