/**
 * Homepage content.
 *
 * Edit everything in this file freely.
 * Components import from here; nothing is hardcoded inside JSX.
 *
 * Selected Work cards → edit src/data/projects.ts (set featured: true)
 */

import type { UpdateEntry, ContactData, HeroPanel } from '@/types'

// ── Hero Editorial Panels ─────────────────────────────────────────────────────
// Each panel = one stop in the horizontal slideshow.
// Add/remove panels — Hero.tsx reads PANEL_COUNT from this array automatically.

export const heroPanels: HeroPanel[] = [
  {
    id:          'work',
    label:       'WORK',
    title:       'Selected Work',
    description: 'Programming, AI research, and computational design.',
    cta:         { label: 'View all work', href: '/work' },
  },
  {
    id:          'journey',
    label:       'JOURNEY',
    title:       'Journey',
    description: 'Learning, awards, and milestones along the way.',
    cta:         { label: 'See the journey', href: '/journey' },
  },
  {
    id:          'billy',
    label:       'BILLY',
    title:       'Billy',
    description: 'A terminal, not a chatbot. Try a few commands.',
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
    description: 'Open to research, freelance, and interesting problems.',
    cta:         { label: 'Get in touch', href: '/contact' },
  },
]

// ── Latest Updates ────────────────────────────────────────────────────────────
// tag values: "Building" | "Learning" | "Research" | "Recently Finished"
// Sorted newest first by convention.

export const latestUpdates: UpdateEntry[] = [
  {
    id:    'update-1',
    date:  '07 / 26',
    title: 'Redesigned the portfolio — generative hero, terminal Billy page',
    tag:   'Building',
  },
  {
    id:    'update-2',
    date:  '06 / 26',
    title: 'Accepted into the Duke–DKU Presence Lab (Bass Connections)',
    tag:   'Research',
  },
  {
    id:    'update-3',
    date:  '11 / 25',
    title: 'Took 1st place at the DKU Vibe Coding Marathon',
    tag:   'Recently Finished',
  },
  {
    id:    'update-4',
    date:  '04 / 25',
    title: 'Shipped Radikal — an AI-powered Mandarin learning app',
    tag:   'Recently Finished',
  },
]

// ── Contact Preview (homepage strip) ─────────────────────────────────────────

export const contactData: ContactData = {
  headline: "Let's work together",
  subline:  'Open to research, freelance, and interesting problems.',
  ctaLabel: 'Get in touch',
  ctaHref:  '/contact',
}
